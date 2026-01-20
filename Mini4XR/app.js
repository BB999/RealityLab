import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { updateDepthInfo, toggleDepthVisualization, resetDepthVisualization } from './depthSensor.js';
import {
  checkControllerButtons,
  moveCarToController,
  updateWheelSpeed,
  rotateWheels,
  positionCarAtController,
  updateGrabPosition,
  getGrabbingState,
  getGrabbedObject,
  getWheelSpeed,
  setResetCallback,
  setSpawnCallback,
  setSpawnCaveCallback,
  setOnGrabEndCallback,
  addGrabbableObject
} from './controllers.js';
import { startXR, startVR } from './xrSession.js';
import {
  initPhysics,
  createCarBody,
  createDebugMeshes,
  addCarDebugMesh,
  updatePhysics,
  syncMeshToBody,
  updateDebugMeshes,
  setCarKinematic,
  updateCarBodyPosition,
  toggleDebugVisibility,
  isDebugVisible,
  updateCollisionColor,
  applyDriveForce,
  stabilizeCar,
  resetCarPosition,
  createSpawnedObjectColliders,
  updateSpawnedObjectColliders
} from './physics.js';

let scene, camera, renderer, mini4car;
let wheels = []; // タイヤオブジェクトを格納
let xrSession = null;
let rightController = null;
let leftController = null;
let mini4carPositioned = false;

// 物理関連
let physicsInitialized = false;
let lastTime = 0;
let wasGrabbing = false;

// スポーンされたオブジェクト
let spawnedObjects = [];
let spawnModelLoaded = null; // 事前読み込みしたモデル（laen_strait）
let caveModelLoaded = null; // 事前読み込みしたモデル（cave1）

// シーンの初期化
function init() {
  // シーン作成
  scene = new THREE.Scene();

  // カメラ作成
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  // レンダラー作成
  renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.xr.enabled = true;

  const appDiv = document.getElementById('app');
  appDiv.appendChild(renderer.domElement);

  // ライト設定（明るめに）
  const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
  directionalLight.position.set(1, 1, 1);
  scene.add(directionalLight);

  const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.8);
  directionalLight2.position.set(-1, 0.5, -1);
  scene.add(directionalLight2);

  // 物理エンジンを初期化
  initPhysics();

  // デバッグメッシュを作成（当たり判定可視化）
  createDebugMeshes(scene);

  // ミニ四駆モデルを読み込み
  loadMini4Car();

  // スポーン用モデルを事前読み込み
  loadSpawnModel();
  loadCaveModel();

  // リサイズ対応
  window.addEventListener('resize', onWindowResize);

  // アニメーションループ
  renderer.setAnimationLoop(animate);
}

// ミニ四駆モデルを読み込み
function loadMini4Car() {
  const loader = new GLTFLoader();
  loader.load(
    '/mini4car1.glb',
    (gltf) => {
      mini4car = gltf.scene;
      mini4car.scale.set(0.167, 0.167, 0.167);
      mini4car.position.set(0, 1, -2); // 少し高い位置から落下
      scene.add(mini4car);
      console.log('ミニ四駆モデルを読み込みました');

      // タイヤオブジェクトを探して中心を設定
      wheels = [];
      mini4car.traverse((child) => {
        // taiya_mae と yaiya_usiro を探す
        if (child.name === 'taiya_mae' || child.name === 'yaiya_usiro') {
          // タイヤのジオメトリの中心を計算
          if (child.isMesh && child.geometry) {
            child.geometry.computeBoundingBox();
            const box = child.geometry.boundingBox;
            const center = new THREE.Vector3();
            box.getCenter(center);

            // ジオメトリを中心に移動
            child.geometry.translate(-center.x, -center.y, -center.z);
            // メッシュの位置を調整
            child.position.add(center);
          }
          wheels.push(child);
          console.log('タイヤ発見:', child.name);
        }
      });

      // 物理ボディを作成
      createCarBody(mini4car);
      addCarDebugMesh(mini4car);
      physicsInitialized = true;

      // ミニ四駆をグラブ可能オブジェクトに登録
      addGrabbableObject(mini4car);

      console.log('物理エンジン初期化完了');
    },
    (progress) => {
      console.log('読み込み中...', (progress.loaded / progress.total * 100) + '%');
    },
    (error) => {
      console.error('モデル読み込みエラー:', error);
    }
  );
}

// スポーン用モデルを事前読み込み（laen_strait）
function loadSpawnModel() {
  const loader = new GLTFLoader();
  loader.load(
    '/laen_strait.glb',
    (gltf) => {
      spawnModelLoaded = gltf.scene;
      console.log('スポーン用モデル（laen_strait）を読み込みました');
    },
    (progress) => {
      console.log('スポーンモデル読み込み中...', (progress.loaded / progress.total * 100) + '%');
    },
    (error) => {
      console.error('スポーンモデル読み込みエラー:', error);
    }
  );
}

// cave1モデルを事前読み込み
function loadCaveModel() {
  const loader = new GLTFLoader();
  loader.load(
    '/cave1.glb',
    (gltf) => {
      caveModelLoaded = gltf.scene;
      console.log('cave1モデルを読み込みました');
    },
    (progress) => {
      console.log('cave1モデル読み込み中...', (progress.loaded / progress.total * 100) + '%');
    },
    (error) => {
      console.error('cave1モデル読み込みエラー:', error);
    }
  );
}

// 左コントローラーの前にオブジェクトをスポーン
function spawnObjectAtLeftController() {
  if (!spawnModelLoaded || !leftController) {
    console.log('スポーンできません: モデルまたはコントローラーが未準備');
    return;
  }

  const controllerPosition = new THREE.Vector3();
  const controllerQuaternion = new THREE.Quaternion();
  leftController.getWorldPosition(controllerPosition);
  leftController.getWorldQuaternion(controllerQuaternion);

  // コントローラーの前方0.3mに配置
  const forward = new THREE.Vector3(0, 0, -0.3);
  forward.applyQuaternion(controllerQuaternion);

  // モデルをクローン
  const spawnedObject = spawnModelLoaded.clone();
  spawnedObject.position.set(
    controllerPosition.x + forward.x,
    controllerPosition.y + forward.y,
    controllerPosition.z + forward.z
  );
  spawnedObject.quaternion.copy(controllerQuaternion);
  spawnedObject.scale.set(0.18, 0.18, 0.18); // 0.2倍大きく（0.15 * 1.2）

  scene.add(spawnedObject);
  spawnedObjects.push(spawnedObject);

  // グラブ可能オブジェクトに登録
  addGrabbableObject(spawnedObject);

  // 当たり判定を追加（floor, laen_left, laen_rightごと）
  createSpawnedObjectColliders(spawnedObject);

  console.log('オブジェクトをスポーンしました (合計:', spawnedObjects.length, '個)');
}

// 左コントローラーの前にcave1をスポーン（Yボタン用）
function spawnCaveAtLeftController() {
  if (!caveModelLoaded || !leftController) {
    console.log('cave1スポーンできません: モデルまたはコントローラーが未準備');
    return;
  }

  const controllerPosition = new THREE.Vector3();
  const controllerQuaternion = new THREE.Quaternion();
  leftController.getWorldPosition(controllerPosition);
  leftController.getWorldQuaternion(controllerQuaternion);

  // コントローラーの前方0.3mに配置
  const forward = new THREE.Vector3(0, 0, -0.3);
  forward.applyQuaternion(controllerQuaternion);

  // モデルをクローン
  const spawnedObject = caveModelLoaded.clone();
  spawnedObject.position.set(
    controllerPosition.x + forward.x,
    controllerPosition.y + forward.y,
    controllerPosition.z + forward.z
  );
  spawnedObject.quaternion.copy(controllerQuaternion);
  spawnedObject.scale.set(0.18, 0.18, 0.18); // laen_straitと同じスケール

  scene.add(spawnedObject);
  spawnedObjects.push(spawnedObject);

  // グラブ可能オブジェクトに登録
  addGrabbableObject(spawnedObject);

  // 当たり判定を追加（Xボタンと同じ処理）
  createSpawnedObjectColliders(spawnedObject);

  console.log('cave1をスポーンしました (合計:', spawnedObjects.length, '個)');
}

// アニメーションループ
function animate(timestamp, frame) {
  // デルタタイム計算
  const deltaTime = lastTime ? (timestamp - lastTime) / 1000 : 0.016;
  lastTime = timestamp;

  // XRセッション中の処理
  if (frame && xrSession) {
    const referenceSpace = renderer.xr.getReferenceSpace();

    // 深度情報を更新
    updateDepthInfo(frame, referenceSpace, scene, camera);

    // ミニ四駆を右コントローラーの前に配置
    if (!mini4carPositioned && mini4car && rightController) {
      if (positionCarAtController(mini4car, rightController)) {
        mini4carPositioned = true;
        // 物理ボディの位置も更新
        if (physicsInitialized) {
          updateCarBodyPosition(mini4car.position, mini4car.quaternion);
        }
      }
    }

    // グラブ中はコントローラーに追従（位置と回転）
    if (getGrabbingState() && rightController) {
      updateGrabPosition(null, rightController);

      // スポーンオブジェクトを掴んでいる場合、当たり判定も更新
      const grabbedObj = getGrabbedObject();
      if (grabbedObj && spawnedObjects.includes(grabbedObj)) {
        updateSpawnedObjectColliders(grabbedObj);
      }
    }
  }

  // グラブ状態の変化を検出（ミニ四駆を掴んでいる場合のみ物理処理）
  const isGrabbing = getGrabbingState();
  const grabbedObj = getGrabbedObject();
  const isGrabbingMini4car = isGrabbing && grabbedObj === mini4car;

  if (isGrabbingMini4car !== wasGrabbing) {
    if (physicsInitialized) {
      setCarKinematic(isGrabbingMini4car);
    }
    wasGrabbing = isGrabbingMini4car;
  }

  // 物理シミュレーション
  if (physicsInitialized && mini4car) {
    if (isGrabbingMini4car) {
      // グラブ中は物理ボディの位置を手動で更新
      updateCarBodyPosition(mini4car.position, mini4car.quaternion);
    } else {
      // タイヤの回転に応じて前進する力を加える
      const wheelSpeed = getWheelSpeed();
      if (wheelSpeed > 0) {
        applyDriveForce(wheelSpeed, mini4car.quaternion);
      }

      // 走行中の姿勢を安定させる
      stabilizeCar();

      // 物理シミュレーションを更新
      updatePhysics(deltaTime);
      // Three.jsのメッシュを物理ボディに同期
      syncMeshToBody(mini4car);
    }

    // デバッグメッシュを更新
    updateDebugMeshes();

    // 衝突時の色を更新
    updateCollisionColor();
  }

  // コントローラーボタンの状態をチェック
  checkControllerButtons(renderer, () => moveCarToController(mini4car, rightController));

  // タイヤの速度を更新（加速・減速）
  updateWheelSpeed();

  // タイヤを回転させる（X軸で回転）
  rotateWheels(wheels);

  renderer.render(scene, camera);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function updateInfo(text) {
  const info = document.getElementById('info');
  if (info) {
    info.textContent = text;
  }
}

// セッション開始時のコールバック
function onSessionStart() {
  mini4carPositioned = false;

  // Xボタンでスポーンするコールバックを設定（laen_strait）
  setSpawnCallback(() => {
    spawnObjectAtLeftController();
  });

  // Yボタンでcave1をスポーンするコールバックを設定
  setSpawnCaveCallback(() => {
    spawnCaveAtLeftController();
  });

  // グラブ終了時に当たり判定を更新
  setOnGrabEndCallback((releasedObject) => {
    if (spawnedObjects.includes(releasedObject)) {
      updateSpawnedObjectColliders(releasedObject);
      console.log('当たり判定を更新しました');
    }
  });

  // Bボタンでリセットするコールバックを設定
  setResetCallback(() => {
    if (mini4car && rightController) {
      const controllerPosition = new THREE.Vector3();
      const controllerQuaternion = new THREE.Quaternion();
      rightController.getWorldPosition(controllerPosition);
      rightController.getWorldQuaternion(controllerQuaternion);

      // コントローラーの前方0.3mに配置
      const forward = new THREE.Vector3(0, 0, -0.3);
      forward.applyQuaternion(controllerQuaternion);

      const newPosition = new THREE.Vector3(
        controllerPosition.x + forward.x,
        controllerPosition.y + forward.y,
        controllerPosition.z + forward.z
      );

      // メッシュの位置を更新
      mini4car.position.copy(newPosition);
      mini4car.quaternion.copy(controllerQuaternion);

      // 物理ボディをリセット
      resetCarPosition(newPosition, controllerQuaternion);

      console.log('ミニ四駆をリセットしました');
    }
  });
}

// セッション終了時のコールバック
function onSessionEnd() {
  xrSession = null;
  rightController = null;
  leftController = null;
}

// MRセッション開始ハンドラ
async function handleStartXR() {
  const result = await startXR(renderer, scene, mini4car, updateInfo, onSessionStart, onSessionEnd);
  if (result) {
    xrSession = result.xrSession;
    rightController = result.rightController;
    leftController = result.leftController;
  }
}

// VRセッション開始ハンドラ
async function handleStartVR() {
  const result = await startVR(renderer, scene, mini4car, updateInfo, onSessionStart, onSessionEnd);
  if (result) {
    xrSession = result.xrSession;
    rightController = result.rightController;
    leftController = result.leftController;
  }
}

// 初期化実行
init();

// ボタンのイベントリスナー
const startButton = document.getElementById('start-button');
if (startButton) {
  startButton.addEventListener('click', handleStartXR);
}

const vrButton = document.getElementById('vr-button');
if (vrButton) {
  vrButton.addEventListener('click', handleStartVR);
}

// 深度表示切り替えボタン
const depthToggleButton = document.getElementById('depth-toggle');
if (depthToggleButton) {
  depthToggleButton.addEventListener('click', () => {
    const isOn = toggleDepthVisualization();
    depthToggleButton.textContent = isOn ? '深度表示 ON' : '深度表示 OFF';
    console.log('深度表示:', isOn);
  });

  // MRセッション開始時にボタンを表示
  window.addEventListener('xr-session-start', () => {
    depthToggleButton.style.display = 'block';
  });

  // MRセッション終了時にボタンを非表示
  window.addEventListener('xr-session-end', () => {
    depthToggleButton.style.display = 'none';
    resetDepthVisualization();
    depthToggleButton.textContent = '深度表示 OFF';
  });
}

// 当たり判定可視化切り替えボタン
const physicsToggleButton = document.getElementById('physics-toggle');
if (physicsToggleButton) {
  physicsToggleButton.addEventListener('click', () => {
    const isOn = toggleDebugVisibility();
    physicsToggleButton.textContent = isOn ? '当たり判定 ON' : '当たり判定 OFF';
    console.log('当たり判定表示:', isOn);
  });
}
