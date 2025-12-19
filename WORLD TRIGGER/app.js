import * as THREE from 'three';

// オーディオマネージャー
import { initAudioManager } from './audio-manager.js';

// モジュールのインポート
import {
  createShield,
  updateShield,
  setTargetShieldProgress,
  resetShieldRandomDelays,
  getShieldGroup,
  setTargetFixedShieldProgress,
  setFixedShieldPosition,
  addFixedShieldImpact,
  checkFixedShieldCollision,
  isFixedShieldActive,
  initShieldAudio
} from './shield.js';

import {
  createAsteroid,
  updateAsteroid,
  castAsteroid,
  fireAsteroid,
  getAsteroidGroup,
  getAsteroidState,
  initAsteroidAudio
} from './asteroid.js';

import {
  getRightHandTransform,
  getLeftHandTransform,
  isHandOpen,
  isPalmFacingForward,
  isPalmFacingDown
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

import {
  initReplica,
  initReplicaAudio,
  setReplicaVRMode,
  loadReplicaModel,
  positionReplicaModel,
  updateReplicaFloat,
  updateReplicaAsteroid,
  triggerReplicaHitFlash,
  updateReplicaHitFlash,
  removeReplicaModel,
  getReplicaModel,
  isReplicaPositioned,
  getReplicaPosition
} from './replica.js';

import {
  initAutoShield,
  initAutoShieldAudio,
  checkAutoShieldCollision,
  addImpactToShield,
  spawnAutoShield,
  updateAutoShields,
  cleanupAutoShields
} from './auto-shield.js';

import {
  initHitEffect,
  triggerHitFlash,
  updateHitFlash,
  cleanupHitEffect
} from './hit-effect.js';

import {
  initXRSession,
  startXR,
  startVR,
  getXRSession,
  getRightController,
  getLeftController,
  setupXRButtons
} from './xr-session.js';

// グローバル変数
let scene, camera, renderer, box;
let boxPositioned = false;

// 手の状態
let isLeftHandOpen = false;
let isRightHandOpen = false;

// 両手のシールドモード
let isLeftShieldMode = false;
let isRightShieldMode = false;

// 両手シールドモード（固定シールド）の安定化用
let fixedShieldModeActive = false;
let fixedShieldModeTimer = 0;
const FIXED_SHIELD_ACTIVATE_DELAY = 0.15; // 両手シールド発動までの遅延（秒）
const FIXED_SHIELD_DEACTIVATE_DELAY = 0.1; // 両手シールド解除までの遅延（秒）

// 手の位置
let leftHandPosition = null;
let rightHandPosition = null;

// VRモード
let isVRMode = false;

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

  // モジュール初期化
  initReplica(scene, camera, {
    onHit: triggerHitFlash,
    checkShieldCollision: (pos) => {
      const shield = checkAutoShieldCollision(pos);
      if (shield) {
        addImpactToShield(shield, pos);
        return shield;
      }
      return null;
    },
    spawnAutoShield: spawnAutoShield
  });
  initAutoShield(scene, camera);
  initHitEffect(scene, camera);
  initXRSession(scene, renderer, {
    onSessionStart: (isVR) => {
      boxPositioned = false;
      // オーディオマネージャーを最初に初期化（共有AudioListener）
      initAudioManager(camera, scene);
      // 各モジュールのオーディオを初期化
      initAsteroidAudio();
      initShieldAudio();
      initAutoShieldAudio();
      initReplicaAudio();
      if (isVR) {
        isVRMode = true;
        setReplicaVRMode(true);
      }
    },
    onSessionEnd: (isVR) => {
      removeReplicaModel();
      cleanupAutoShields();
      if (isVR) {
        isVRMode = false;
        setReplicaVRMode(false);
      }
    },
    onVRModeChange: (isVR) => {
      isVRMode = isVR;
      setReplicaVRMode(isVR);
    }
  });

  // レプリカモデルを読み込み
  loadReplicaModel();

  // リサイズ対応
  window.addEventListener('resize', onWindowResize);

  // アニメーションループ
  renderer.setAnimationLoop(animate);

  // XRボタン設定
  setupXRButtons();

  // 深度表示切り替えボタン
  setupDepthToggleButton();
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
  const xrSession = getXRSession();
  const rightController = getRightController();

  // XRセッション中の処理
  if (frame && xrSession) {
    const referenceSpace = renderer.xr.getReferenceSpace();

    // レプリカモデルの初期配置
    positionReplicaModel();

    // レプリカモデルの浮遊アニメーション
    updateReplicaFloat(1 / 60);

    // レプリカのアステロイド攻撃
    updateReplicaAsteroid(1 / 60, {
      isFixedShieldActive: isFixedShieldActive(),
      checkFixedShieldCollision: checkFixedShieldCollision,
      addFixedShieldImpact: addFixedShieldImpact,
      isLeftShieldMode: isLeftShieldMode,
      isRightShieldMode: isRightShieldMode,
      leftHandPosition: leftHandPosition,
      rightHandPosition: rightHandPosition
    });

    // ヒットフラッシュを更新
    updateHitFlash(1 / 60);

    // レプリカのヒットフラッシュを更新
    updateReplicaHitFlash(1 / 60);

    // 自動シールドを更新
    updateAutoShields(1 / 60);

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
    let rightHand = null;
    const session = renderer.xr.getSession();
    if (session) {
      for (const inputSource of session.inputSources) {
        if (inputSource.hand) {
          if (inputSource.handedness === 'left') {
            leftHand = inputSource.hand;
          } else if (inputSource.handedness === 'right') {
            rightHand = inputSource.hand;
          }
        }
      }
    }

    // === 左手の処理 ===
    if (leftHand) {
      const handOpen = isHandOpen(leftHand, frame, referenceSpace);
      const palmForward = isPalmFacingForward(leftHand, frame, referenceSpace, camera, 'left');
      const leftHoundMode = isPalmFacingDown(leftHand, frame, referenceSpace);
      const handTransform = getLeftHandTransform(leftHand, frame, referenceSpace, leftHoundMode);

      if (handTransform) {
        leftHandPosition = handTransform.position.clone();
      }

      const newLeftShieldMode = handOpen && palmForward;
      const leftAsteroidMode = handOpen && !palmForward;

      if (newLeftShieldMode !== isLeftShieldMode) {
        isLeftShieldMode = newLeftShieldMode;
      }

      if (handOpen !== isLeftHandOpen) {
        const wasOpen = isLeftHandOpen;
        isLeftHandOpen = handOpen;

        const leftAsteroidGroup = getAsteroidGroup('left');
        const leftAsteroidState = getAsteroidState('left');

        if (handOpen && leftAsteroidMode && leftAsteroidGroup && !leftAsteroidState.isCharging) {
          leftAsteroidGroup.visible = true;
          castAsteroid('left', leftHoundMode);
        }
        else if (!handOpen && wasOpen && leftAsteroidGroup && leftAsteroidState.isCharging && !leftAsteroidState.isCancelling) {
          const palmNormal = handTransform ? new THREE.Vector3(0, 1, 0).applyQuaternion(
            new THREE.Quaternion(
              frame.getJointPose(leftHand.get('wrist'), referenceSpace).transform.orientation.x,
              frame.getJointPose(leftHand.get('wrist'), referenceSpace).transform.orientation.y,
              frame.getJointPose(leftHand.get('wrist'), referenceSpace).transform.orientation.z,
              frame.getJointPose(leftHand.get('wrist'), referenceSpace).transform.orientation.w
            )
          ).negate() : null;
          const getTargetPos = () => {
            if (isReplicaPositioned()) {
              return getReplicaPosition();
            }
            return null;
          };
          const onHitReplica = () => {
            triggerReplicaHitFlash();
          };
          fireAsteroid(palmNormal, getTargetPos, onHitReplica, 'left');
        }
      }

      const leftShieldGroup = getShieldGroup('left');
      if (leftShieldGroup && handTransform && isLeftShieldMode && !isRightShieldMode) {
        leftShieldGroup.position.copy(handTransform.position);
        leftShieldGroup.quaternion.copy(handTransform.quaternion);
      }

      const leftAsteroidGroup = getAsteroidGroup('left');
      const leftAsteroidState = getAsteroidState('left');
      if (leftAsteroidGroup && handTransform && leftAsteroidMode && (leftAsteroidState.isCharging || leftAsteroidState.isFiring || leftAsteroidState.isCancelling)) {
        const wristPose = frame.getJointPose(leftHand.get('wrist'), referenceSpace);
        const middleTipPose = frame.getJointPose(leftHand.get('middle-finger-tip'), referenceSpace);
        if (wristPose && middleTipPose) {
          const wristPos = new THREE.Vector3(wristPose.transform.position.x, wristPose.transform.position.y, wristPose.transform.position.z);
          const tipPos = new THREE.Vector3(middleTipPose.transform.position.x, middleTipPose.transform.position.y, middleTipPose.transform.position.z);
          const palmCenter = new THREE.Vector3().addVectors(wristPos, tipPos).multiplyScalar(0.5);

          const quaternion = new THREE.Quaternion(
            wristPose.transform.orientation.x,
            wristPose.transform.orientation.y,
            wristPose.transform.orientation.z,
            wristPose.transform.orientation.w
          );
          const palmNormal = new THREE.Vector3(0, 1, 0);
          palmNormal.applyQuaternion(quaternion);
          palmNormal.negate();

          const adjustedNormal = palmNormal.clone();
          adjustedNormal.y += 0.4;
          adjustedNormal.normalize();

          const offset = adjustedNormal.clone().multiplyScalar(0.15);
          const effectPosition = palmCenter.clone().add(offset);

          const effectQuaternion = new THREE.Quaternion();
          const up = new THREE.Vector3(0, 1, 0);
          const lookMatrix = new THREE.Matrix4();
          const lookFrom = effectPosition.clone().add(adjustedNormal);
          lookMatrix.lookAt(lookFrom, effectPosition, up);
          effectQuaternion.setFromRotationMatrix(lookMatrix);

          leftAsteroidGroup.position.copy(effectPosition);
          leftAsteroidGroup.quaternion.copy(effectQuaternion);
        }
      }

      if (leftAsteroidGroup && !leftAsteroidState.isCharging && !leftAsteroidState.isFiring && !leftAsteroidState.isCancelling && !leftAsteroidMode) {
        leftAsteroidGroup.visible = false;
      }
    } else {
      leftHandPosition = null;
      isLeftShieldMode = false;
    }

    // === 右手の処理 ===
    if (rightHand) {
      const handOpen = isHandOpen(rightHand, frame, referenceSpace);
      const palmForward = isPalmFacingForward(rightHand, frame, referenceSpace, camera, 'right');
      const rightHoundMode = isPalmFacingDown(rightHand, frame, referenceSpace);
      const handTransform = getRightHandTransform(rightHand, frame, referenceSpace, rightHoundMode);

      if (handTransform) {
        rightHandPosition = handTransform.position.clone();
      }

      const newRightShieldMode = handOpen && palmForward;
      const rightAsteroidMode = handOpen && !palmForward;

      if (newRightShieldMode !== isRightShieldMode) {
        isRightShieldMode = newRightShieldMode;
      }

      if (handOpen !== isRightHandOpen) {
        const wasOpen = isRightHandOpen;
        isRightHandOpen = handOpen;

        const rightAsteroidGroup = getAsteroidGroup('right');
        const rightAsteroidState = getAsteroidState('right');

        if (handOpen && rightAsteroidMode && rightAsteroidGroup && !rightAsteroidState.isCharging) {
          rightAsteroidGroup.visible = true;
          castAsteroid('right', rightHoundMode);
        }
        else if (!handOpen && wasOpen && rightAsteroidGroup && rightAsteroidState.isCharging && !rightAsteroidState.isCancelling) {
          const palmNormal = handTransform ? handTransform.palmNormal : null;
          const getTargetPos = () => {
            if (isReplicaPositioned()) {
              return getReplicaPosition();
            }
            return null;
          };
          const onHitReplica = () => {
            triggerReplicaHitFlash();
          };
          fireAsteroid(palmNormal, getTargetPos, onHitReplica, 'right');
        }
      }

      const rightShieldGroup = getShieldGroup('right');
      if (rightShieldGroup && isRightShieldMode && !isLeftShieldMode) {
        const wristPose = frame.getJointPose(rightHand.get('wrist'), referenceSpace);
        const middleTipPose = frame.getJointPose(rightHand.get('middle-finger-tip'), referenceSpace);
        if (wristPose && middleTipPose) {
          const wristPos = new THREE.Vector3(wristPose.transform.position.x, wristPose.transform.position.y, wristPose.transform.position.z);
          const tipPos = new THREE.Vector3(middleTipPose.transform.position.x, middleTipPose.transform.position.y, middleTipPose.transform.position.z);
          const palmCenter = new THREE.Vector3().addVectors(wristPos, tipPos).multiplyScalar(0.5);

          const quaternion = new THREE.Quaternion(
            wristPose.transform.orientation.x,
            wristPose.transform.orientation.y,
            wristPose.transform.orientation.z,
            wristPose.transform.orientation.w
          );

          const palmNormal = new THREE.Vector3(0, 1, 0);
          palmNormal.applyQuaternion(quaternion);

          const offset = palmNormal.clone().multiplyScalar(-0.08);
          const shieldPosition = palmCenter.clone().add(offset);

          const fingerDirection = new THREE.Vector3().subVectors(tipPos, wristPos).normalize();

          const tiltAngle = 20 * (Math.PI / 180);
          const adjustedNormal = palmNormal.clone();
          adjustedNormal.y -= Math.sin(tiltAngle);
          adjustedNormal.normalize();

          const shieldQuaternion = new THREE.Quaternion();
          const lookMatrix = new THREE.Matrix4();
          const lookTarget = shieldPosition.clone().add(adjustedNormal);
          lookMatrix.lookAt(shieldPosition, lookTarget, fingerDirection);
          shieldQuaternion.setFromRotationMatrix(lookMatrix);

          rightShieldGroup.position.copy(shieldPosition);
          rightShieldGroup.quaternion.copy(shieldQuaternion);
        }
      }

      const rightAsteroidGroup = getAsteroidGroup('right');
      const rightAsteroidState = getAsteroidState('right');
      if (rightAsteroidGroup && handTransform && rightAsteroidMode && (rightAsteroidState.isCharging || rightAsteroidState.isFiring || rightAsteroidState.isCancelling)) {
        rightAsteroidGroup.position.copy(handTransform.position);
        rightAsteroidGroup.quaternion.copy(handTransform.quaternion);
      }

      if (rightAsteroidGroup && !rightAsteroidState.isCharging && !rightAsteroidState.isFiring && !rightAsteroidState.isCancelling && !rightAsteroidMode) {
        rightAsteroidGroup.visible = false;
      }
    } else {
      rightHandPosition = null;
      isRightShieldMode = false;
    }

    // シールドのターゲット状態を更新（ヒステリシス付き）
    const deltaTime = 1 / 60;
    const bothHandsShieldMode = isLeftShieldMode && isRightShieldMode;

    // 両手シールドモードの判定（遅延を追加して安定化）
    if (bothHandsShieldMode && !fixedShieldModeActive) {
      // 両手がシールドモードだが、まだ固定シールドは無効
      fixedShieldModeTimer += deltaTime;
      if (fixedShieldModeTimer >= FIXED_SHIELD_ACTIVATE_DELAY) {
        fixedShieldModeActive = true;
        fixedShieldModeTimer = 0;
      }
    } else if (!bothHandsShieldMode && fixedShieldModeActive) {
      // 両手シールドモードが解除された
      fixedShieldModeTimer += deltaTime;
      if (fixedShieldModeTimer >= FIXED_SHIELD_DEACTIVATE_DELAY) {
        fixedShieldModeActive = false;
        fixedShieldModeTimer = 0;
      }
    } else {
      // 状態が安定している場合はタイマーをリセット
      fixedShieldModeTimer = 0;
    }

    // シールドのプログレスを設定
    if (fixedShieldModeActive) {
      // 固定シールドモード（両手）
      setTargetShieldProgress(0, 'left');
      setTargetShieldProgress(0, 'right');
      setTargetFixedShieldProgress(1);

      const cameraPos = new THREE.Vector3();
      camera.getWorldPosition(cameraPos);
      setFixedShieldPosition(cameraPos);
    } else if (isLeftShieldMode && !isRightShieldMode) {
      // 左手のみシールドモード
      setTargetShieldProgress(1, 'left');
      setTargetShieldProgress(0, 'right');
      setTargetFixedShieldProgress(0);
    } else if (isRightShieldMode && !isLeftShieldMode) {
      // 右手のみシールドモード
      setTargetShieldProgress(0, 'left');
      setTargetShieldProgress(1, 'right');
      setTargetFixedShieldProgress(0);
    } else {
      // どちらもシールドモードでない
      setTargetShieldProgress(0, 'left');
      setTargetShieldProgress(0, 'right');
      setTargetFixedShieldProgress(0);
    }
  }

  // シールドのアニメーションを更新
  const leftAsteroidState = getAsteroidState('left');
  const rightAsteroidState = getAsteroidState('right');
  updateShield(time, leftAsteroidState.isFiring || rightAsteroidState.isFiring);

  // アステロイドのアニメーションを更新
  updateAsteroid(time, camera);

  renderer.render(scene, camera);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function setupDepthToggleButton() {
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
}

// 初期化実行
init();
