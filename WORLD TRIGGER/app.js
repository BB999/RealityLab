import * as THREE from 'three';
import { XRHandModelFactory } from 'three/addons/webxr/XRHandModelFactory.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// モジュールのインポート
import {
  createShield,
  updateShield,
  setTargetShieldProgress,
  resetShieldRandomDelays,
  getShieldGroup
} from './shield.js';

import {
  createAsteroid,
  updateAsteroid,
  castAsteroid,
  fireAsteroid,
  getAsteroidGroup,
  getAsteroidState
} from './asteroid.js';

import {
  getRightHandTransform,
  getLeftHandTransform,
  isHandOpen
} from './hand-tracking.js';

import {
  updateDepthInfo,
  createVREnvironment,
  removeVREnvironment,
  updatePlaneMeshes,
  toggleDepthVisualization,
  setShowDepthVisualization,
  cleanupDepth
} from './vr-environment.js';

// グローバル変数
let scene, camera, renderer, box;
let xrSession = null;
let rightController = null;
let leftController = null;
let boxPositioned = false;

// ハンドトラッキング用変数
let hand1 = null;
let hand2 = null;
let handModelFactory = null;
let handModel1 = null;
let handModel2 = null;

// 手の状態
let isLeftHandOpen = false;
let isRightHandOpen = false;

// レプリカモデル
let replicaModel = null;
let replicaPositioned = false;
let replicaFloatTime = 0;
let replicaWaitFrames = 0; // 配置前の待機フレーム数
let replicaBasePosition = null; // 初期配置位置（中心）
let replicaTargetPosition = null; // 移動先
let replicaMoveSpeed = 0.5; // 移動速度（m/s）
let isVRMode = false; // VRモードかどうか
let replicaIsMoving = true; // 移動中かどうか
let replicaStopTimer = 0; // 停止タイマー
let replicaStopDuration = 0; // 停止時間

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

  // ライト設定
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
  directionalLight.position.set(1, 1, 1);
  scene.add(directionalLight);

  // シールドを作成
  createShield(scene);

  // アステロイドエフェクトを作成
  createAsteroid(scene);

  // レプリカモデルを読み込み
  loadReplicaModel();

  // リサイズ対応
  window.addEventListener('resize', onWindowResize);

  // アニメーションループ
  renderer.setAnimationLoop(animate);
}

// ボックスを作成
function createBox() {
  const geometry = new THREE.BoxGeometry(0.15, 0.15, 0.15);
  const material = new THREE.MeshStandardMaterial({
    color: 0x4CAF50,
    metalness: 0.3,
    roughness: 0.7
  });
  box = new THREE.Mesh(geometry, material);
  box.position.set(0, 0, -2);
  scene.add(box);
}

// レプリカモデルを読み込んで配置
function loadReplicaModel() {
  const loader = new GLTFLoader();
  loader.load(
    './repurika.glb',
    (gltf) => {
      replicaModel = gltf.scene;
      replicaModel.visible = false;
      scene.add(replicaModel);
      console.log('レプリカモデルを読み込みました');
    },
    (progress) => {
      console.log('読み込み中:', (progress.loaded / progress.total * 100) + '%');
    },
    (error) => {
      console.error('レプリカモデルの読み込みエラー:', error);
    }
  );
}

// レプリカモデルをカメラの前に配置
function positionReplicaModel() {
  if (!replicaModel || replicaPositioned) return;

  // カメラの位置が安定するまで60フレーム待つ
  replicaWaitFrames++;
  if (replicaWaitFrames < 60) return;

  const cameraPosition = new THREE.Vector3();
  const cameraDirection = new THREE.Vector3();
  camera.getWorldPosition(cameraPosition);
  camera.getWorldDirection(cameraDirection);

  // カメラの高さが0に近い場合はまだ待つ（トラッキングが安定していない）
  if (Math.abs(cameraPosition.y) < 0.1) return;

  // カメラの水平方向5m前に配置（カメラと同じ高さ）
  cameraDirection.y = 0; // 水平方向のみ
  cameraDirection.normalize();
  const targetPosition = cameraPosition.clone().add(cameraDirection.multiplyScalar(5));
  targetPosition.y = cameraPosition.y;

  replicaModel.position.copy(targetPosition);
  // カメラの方を向く
  replicaModel.lookAt(cameraPosition);
  replicaModel.visible = true;
  replicaPositioned = true;

  // 基準位置を保存
  replicaModel.userData.baseY = targetPosition.y;
  replicaBasePosition = targetPosition.clone();
  replicaTargetPosition = targetPosition.clone();

  console.log('レプリカモデルを配置しました:', targetPosition, 'カメラ高さ:', cameraPosition.y);
}

// VRモード用：ランダムな移動先を設定
function setRandomReplicaTarget() {
  if (!replicaBasePosition) return;

  // 5m範囲内のランダムな位置
  const angle = Math.random() * Math.PI * 2;
  const distance = Math.random() * 5;
  replicaTargetPosition = new THREE.Vector3(
    replicaBasePosition.x + Math.cos(angle) * distance,
    replicaBasePosition.y,
    replicaBasePosition.z + Math.sin(angle) * distance
  );
}

// レプリカモデルの浮遊アニメーション
function updateReplicaFloat(deltaTime) {
  if (!replicaModel || !replicaModel.visible) return;

  replicaFloatTime += deltaTime;

  // 上下に浮遊（振幅0.1m、周期2秒）
  const floatY = Math.sin(replicaFloatTime * Math.PI) * 0.1;

  // VRモード：ランダム移動と停止
  if (isVRMode && replicaTargetPosition) {
    // 停止中の場合
    if (!replicaIsMoving) {
      replicaStopTimer += deltaTime;
      if (replicaStopTimer >= replicaStopDuration) {
        // 停止終了、次の行動を決定
        replicaStopTimer = 0;
        if (Math.random() < 0.7) {
          // 70%の確率で移動開始
          setRandomReplicaTarget();
          replicaIsMoving = true;
        } else {
          // 30%の確率でまた停止
          replicaStopDuration = 1 + Math.random() * 3;
        }
      }
    } else {
      // 移動中
      const currentPos = new THREE.Vector3(
        replicaModel.position.x,
        replicaModel.userData.baseY,
        replicaModel.position.z
      );
      const direction = new THREE.Vector3().subVectors(replicaTargetPosition, currentPos);
      const distance = direction.length();

      if (distance < 0.1) {
        // 目標に到達したら次の行動を決定
        if (Math.random() < 0.5) {
          // 50%の確率で停止
          replicaIsMoving = false;
          replicaStopTimer = 0;
          replicaStopDuration = 1 + Math.random() * 3;
        } else {
          // 50%の確率ですぐ次の移動先へ
          setRandomReplicaTarget();
        }
      } else {
        // 目標に向かって移動
        direction.normalize();
        const moveDistance = Math.min(replicaMoveSpeed * deltaTime, distance);
        replicaModel.position.x += direction.x * moveDistance;
        replicaModel.position.z += direction.z * moveDistance;

        // 進行方向を向く（滑らかに補間）
        const targetAngle = Math.atan2(direction.x, direction.z);
        let currentAngle = replicaModel.rotation.y;

        // 角度の差を-π〜πの範囲に正規化
        let angleDiff = targetAngle - currentAngle;
        while (angleDiff > Math.PI) angleDiff -= Math.PI * 2;
        while (angleDiff < -Math.PI) angleDiff += Math.PI * 2;

        // 滑らかに補間（1秒で約90度回転）
        const rotationSpeed = 1.5 * deltaTime;
        replicaModel.rotation.y += angleDiff * rotationSpeed;
      }
    }
  }

  // 浮遊（Y座標）
  if (replicaModel.userData.baseY !== undefined) {
    replicaModel.position.y = replicaModel.userData.baseY + floatY;
  }

  // 少し傾きも加える（VRモードでは移動方向に加算）
  replicaModel.rotation.z += Math.sin(replicaFloatTime * Math.PI * 0.5) * 0.001;
  replicaModel.rotation.x += Math.sin(replicaFloatTime * Math.PI * 0.3) * 0.001;
}

// レプリカモデルを削除
function removeReplicaModel() {
  if (replicaModel) {
    replicaModel.visible = false;
    replicaPositioned = false;
    replicaFloatTime = 0;
    replicaWaitFrames = 0;
    replicaBasePosition = null;
    replicaTargetPosition = null;
    isVRMode = false;
    replicaIsMoving = true;
    replicaStopTimer = 0;
    replicaStopDuration = 0;
  }
}

// アニメーションループ
function animate(timestamp, frame) {
  const time = timestamp ? timestamp / 1000 : performance.now() / 1000;

  // XRセッション中の処理
  if (frame && xrSession) {
    const referenceSpace = renderer.xr.getReferenceSpace();

    // レプリカモデルの初期配置
    positionReplicaModel();

    // レプリカモデルの浮遊アニメーション
    updateReplicaFloat(1 / 60); // 約60fpsを想定

    // 深度情報を更新
    updateDepthInfo(frame, referenceSpace, timestamp, scene, camera);

    // プレーンメッシュを更新（壁・テーブル検出）
    updatePlaneMeshes(frame, referenceSpace, scene);

    // ボックスを右コントローラーの前に配置
    if (!boxPositioned && box && rightController) {
      const controllerPosition = new THREE.Vector3();
      const controllerQuaternion = new THREE.Quaternion();
      rightController.getWorldPosition(controllerPosition);
      rightController.getWorldQuaternion(controllerQuaternion);

      const forward = new THREE.Vector3(0, 0, -0.3);
      forward.applyQuaternion(controllerQuaternion);

      box.position.set(
        controllerPosition.x + forward.x,
        controllerPosition.y + forward.y,
        controllerPosition.z + forward.z
      );

      if (controllerPosition.lengthSq() > 0) {
        boxPositioned = true;
        console.log('ボックスを右コントローラーの前に配置しました');
      }
    }

    // ボックスをゆっくり回転させる
    if (box) {
      box.rotation.y += 0.01;
      box.rotation.x += 0.005;
    }

    // 左手のハンドトラッキングをチェック
    let leftHand = null;
    const session = renderer.xr.getSession();
    if (session) {
      for (const inputSource of session.inputSources) {
        if (inputSource.hand && inputSource.handedness === 'left') {
          leftHand = inputSource.hand;
          break;
        }
      }
    }

    if (leftHand) {
      const handOpen = isHandOpen(leftHand, frame, referenceSpace);

      if (handOpen !== isLeftHandOpen) {
        isLeftHandOpen = handOpen;
        setTargetShieldProgress(handOpen ? 1 : 0);

        if (handOpen) {
          // シールド展開時にランダムディレイをリセット
          resetShieldRandomDelays();
        }
      }

      // シールドの位置を左手の前に更新
      const shieldGroup = getShieldGroup();
      if (shieldGroup && isLeftHandOpen) {
        const handTransform = getLeftHandTransform(leftHand, frame, referenceSpace);
        if (handTransform) {
          shieldGroup.position.copy(handTransform.position);
          shieldGroup.quaternion.copy(handTransform.quaternion);
        }
      }
    }

    // 右手のハンドトラッキングをチェック（アステロイド用）
    let rightHand = null;
    const sessionForRight = renderer.xr.getSession();
    if (sessionForRight) {
      for (const inputSource of sessionForRight.inputSources) {
        if (inputSource.hand && inputSource.handedness === 'right') {
          rightHand = inputSource.hand;
          break;
        }
      }
    }

    if (rightHand) {
      const handOpen = isHandOpen(rightHand, frame, referenceSpace);
      const asteroidGroup = getAsteroidGroup();
      const asteroidState = getAsteroidState();
      const handTransform = getRightHandTransform(rightHand, frame, referenceSpace);

      if (handOpen !== isRightHandOpen) {
        isRightHandOpen = handOpen;

        if (handOpen && asteroidGroup) {
          // 右手がパーになったらアステロイド発動（チャージ開始）
          asteroidGroup.visible = true;
          castAsteroid();
        } else if (!handOpen && asteroidGroup && asteroidState.isCharging && !asteroidState.isCancelling) {
          // 右手を閉じたら発射（手のひらの法線を渡す）
          const palmNormal = handTransform ? handTransform.palmNormal : null;
          fireAsteroid(palmNormal);
        }
      }

      // アステロイドの位置を右手の前に更新
      const currentState = getAsteroidState();
      if (asteroidGroup && (currentState.isCharging || currentState.isFiring || currentState.isCancelling)) {
        if (handTransform) {
          asteroidGroup.position.copy(handTransform.position);
          asteroidGroup.quaternion.copy(handTransform.quaternion);
        }
      }
    }

    // アステロイドが終了したら非表示に
    const asteroidGroup = getAsteroidGroup();
    const finalState = getAsteroidState();
    if (asteroidGroup && !finalState.isCharging && !finalState.isFiring && !finalState.isCancelling && !isRightHandOpen) {
      asteroidGroup.visible = false;
    }
  }

  // シールドのアニメーションを更新
  const asteroidState = getAsteroidState();
  updateShield(time, asteroidState.isFiring);

  // アステロイドのアニメーションを更新
  updateAsteroid(time, camera);

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

// MRセッション開始
async function startXR() {
  if (!navigator.xr) {
    updateInfo('WebXRがサポートされていません');
    alert('このデバイスはWebXRをサポートしていません');
    return;
  }

  try {
    updateInfo('MRセッションを開始中...');

    const supported = await navigator.xr.isSessionSupported('immersive-ar');

    if (!supported) {
      updateInfo('immersive-ARがサポートされていません');
      alert('このデバイスはAR機能をサポートしていません');
      return;
    }

    xrSession = await navigator.xr.requestSession('immersive-ar', {
      requiredFeatures: [],
      optionalFeatures: ['local-floor', 'bounded-floor', 'depth-sensing', 'plane-detection', 'hand-tracking'],
      depthSensing: {
        usagePreference: ['gpu-optimized', 'cpu-optimized'],
        dataFormatPreference: ['luminance-alpha', 'float32']
      }
    });

    await renderer.xr.setSession(xrSession);

    rightController = renderer.xr.getController(0);
    leftController = renderer.xr.getController(1);
    scene.add(rightController);
    scene.add(leftController);

    hand1 = renderer.xr.getHand(0);
    hand2 = renderer.xr.getHand(1);
    scene.add(hand1);
    scene.add(hand2);

    boxPositioned = false;

    const button = document.getElementById('start-button');
    if (button) {
      button.style.display = 'none';
    }
    const vrButton = document.getElementById('vr-button');
    if (vrButton) {
      vrButton.style.display = 'none';
    }

    window.dispatchEvent(new Event('xr-session-start'));

    updateInfo('MRセッション開始');

    if (xrSession.depthUsage) {
      console.log('深度センサー有効:', xrSession.depthUsage);
      console.log('深度データ形式:', xrSession.depthDataFormat);
      updateInfo('MRセッション開始 (深度センサー有効)');
    } else {
      console.log('深度センサー無効');
      updateInfo('MRセッション開始 (深度センサー無効)');
    }

    xrSession.addEventListener('end', () => {
      xrSession = null;

      cleanupDepth(scene);
      removeReplicaModel();

      window.dispatchEvent(new Event('xr-session-end'));

      updateInfo('MRセッション終了');
      if (button) {
        button.style.display = 'block';
      }
      if (vrButton) {
        vrButton.style.display = 'block';
      }
    });

  } catch (error) {
    console.error('XRセッション開始エラー:', error);
    console.error('エラー名:', error.name);
    console.error('エラーメッセージ:', error.message);
    console.error('エラー詳細:', JSON.stringify(error, null, 2));
    updateInfo('エラー: ' + (error.message || error.name || 'Unknown error'));
    alert('MRセッションを開始できませんでした: ' + (error.message || error.name || 'Unknown error'));
  }
}

// VRセッション開始
async function startVR() {
  if (!navigator.xr) {
    updateInfo('WebXRがサポートされていません');
    alert('このデバイスはWebXRをサポートしていません');
    return;
  }

  try {
    updateInfo('VRセッションを開始中...');

    const supported = await navigator.xr.isSessionSupported('immersive-vr');

    if (!supported) {
      updateInfo('immersive-VRがサポートされていません');
      alert('このデバイスはVR機能をサポートしていません');
      return;
    }

    xrSession = await navigator.xr.requestSession('immersive-vr', {
      requiredFeatures: [],
      optionalFeatures: ['local-floor', 'bounded-floor', 'hand-tracking']
    });

    await renderer.xr.setSession(xrSession);

    createVREnvironment(scene);
    isVRMode = true;

    rightController = renderer.xr.getController(0);
    leftController = renderer.xr.getController(1);
    scene.add(rightController);
    scene.add(leftController);

    hand1 = renderer.xr.getHand(0);
    hand2 = renderer.xr.getHand(1);
    scene.add(hand1);
    scene.add(hand2);

    // ハンドモデルを作成（VRモード用）
    handModelFactory = new XRHandModelFactory();
    handModel1 = handModelFactory.createHandModel(hand1, 'mesh');
    handModel2 = handModelFactory.createHandModel(hand2, 'mesh');
    hand1.add(handModel1);
    hand2.add(handModel2);

    boxPositioned = false;

    const button = document.getElementById('start-button');
    if (button) {
      button.style.display = 'none';
    }
    const vrButton = document.getElementById('vr-button');
    if (vrButton) {
      vrButton.style.display = 'none';
    }

    window.dispatchEvent(new Event('xr-session-start'));

    updateInfo('VRセッション開始');

    xrSession.addEventListener('end', () => {
      xrSession = null;

      removeVREnvironment(scene);
      removeReplicaModel();

      // ハンドモデルをクリーンアップ
      if (handModel1) {
        hand1.remove(handModel1);
        handModel1 = null;
      }
      if (handModel2) {
        hand2.remove(handModel2);
        handModel2 = null;
      }
      handModelFactory = null;

      window.dispatchEvent(new Event('xr-session-end'));

      updateInfo('VRセッション終了');
      if (button) {
        button.style.display = 'block';
      }
      if (vrButton) {
        vrButton.style.display = 'block';
      }
    });

  } catch (error) {
    console.error('VRセッション開始エラー:', error);
    console.error('エラー名:', error.name);
    console.error('エラーメッセージ:', error.message);
    console.error('エラー詳細:', JSON.stringify(error, null, 2));
    updateInfo('エラー: ' + (error.message || error.name || 'Unknown error'));
    alert('VRセッションを開始できませんでした: ' + (error.message || error.name || 'Unknown error'));
  }
}

// 初期化実行
init();

// ボタンのイベントリスナー
const startButton = document.getElementById('start-button');
if (startButton) {
  startButton.addEventListener('click', startXR);
}

const vrButton = document.getElementById('vr-button');
if (vrButton) {
  vrButton.addEventListener('click', startVR);
}

// 深度表示切り替えボタン
const depthToggleButton = document.getElementById('depth-toggle');
if (depthToggleButton) {
  depthToggleButton.addEventListener('click', () => {
    const showDepth = toggleDepthVisualization();
    depthToggleButton.textContent = showDepth ? '深度表示 ON' : '深度表示 OFF';
    console.log('深度表示:', showDepth);
  });

  window.addEventListener('xr-session-start', () => {
    depthToggleButton.style.display = 'block';
  });

  window.addEventListener('xr-session-end', () => {
    depthToggleButton.style.display = 'none';
    setShowDepthVisualization(false);
    depthToggleButton.textContent = '深度表示 OFF';
  });
}
