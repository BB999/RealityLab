import * as THREE from 'three';

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
  cancelAsteroid,
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

// 手の状態
let isLeftHandOpen = false;
let isRightHandOpen = false;

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

// アニメーションループ
function animate(timestamp, frame) {
  const time = timestamp ? timestamp / 1000 : performance.now() / 1000;

  // XRセッション中の処理
  if (frame && xrSession) {
    const referenceSpace = renderer.xr.getReferenceSpace();

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

      if (handOpen !== isRightHandOpen) {
        isRightHandOpen = handOpen;

        if (handOpen && asteroidGroup) {
          // 右手がパーになったらアステロイド発動
          asteroidGroup.visible = true;
          castAsteroid();
        } else if (!handOpen && asteroidGroup && (asteroidState.isCharging || asteroidState.isFiring) && !asteroidState.isCancelling) {
          // 右手を閉じたら魔法をキャンセル（フェードアウト）
          cancelAsteroid();
        }
      }

      // アステロイドの位置を右手の前に更新
      const currentState = getAsteroidState();
      if (asteroidGroup && (currentState.isCharging || currentState.isFiring || currentState.isCancelling)) {
        const handTransform = getRightHandTransform(rightHand, frame, referenceSpace);
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

    updateInfo('VRセッション開始');

    xrSession.addEventListener('end', () => {
      xrSession = null;

      removeVREnvironment(scene);

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
