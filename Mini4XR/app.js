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
  getGrabbingState
} from './controllers.js';
import { startXR, startVR } from './xrSession.js';

let scene, camera, renderer, mini4car;
let wheels = []; // タイヤオブジェクトを格納
let xrSession = null;
let rightController = null;
let leftController = null;
let mini4carPositioned = false;

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

  // ミニ四駆モデルを読み込み
  loadMini4Car();

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
      mini4car.position.set(0, 0, -2);
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
    },
    (progress) => {
      console.log('読み込み中...', (progress.loaded / progress.total * 100) + '%');
    },
    (error) => {
      console.error('モデル読み込みエラー:', error);
    }
  );
}

// アニメーションループ
function animate(timestamp, frame) {
  // XRセッション中の処理
  if (frame && xrSession) {
    const referenceSpace = renderer.xr.getReferenceSpace();

    // 深度情報を更新
    updateDepthInfo(frame, referenceSpace, scene, camera);

    // ミニ四駆を右コントローラーの前に配置
    if (!mini4carPositioned && mini4car && rightController) {
      if (positionCarAtController(mini4car, rightController)) {
        mini4carPositioned = true;
      }
    }

    // グラブ中はコントローラーに追従（位置と回転）
    if (getGrabbingState() && mini4car && rightController) {
      updateGrabPosition(mini4car, rightController);
    }
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
