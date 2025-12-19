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
  resetAsteroid,
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
  cleanupDepth,
  setOcclusionEnabled
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
  updateHitParticles,
  updateExplosionParticles,
  updateReplicaFall,
  updateGameEndUI,
  isReplicaDefeatedState,
  getReturnButtonMesh,
  setButtonHover,
  returnToTitle,
  cleanupGameEndUI,
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

// プレイヤーのステータス
let playerHP = 100;
let playerTrion = 100;
const PLAYER_MAX_HP = 100;
const PLAYER_MAX_TRION = 100;

// プレイヤーUIグループ（左手首に表示）
let playerUIGroup = null;
let playerHPBarFill = null;
let playerTrionBarFill = null;

// TRION切れ警告表示
let trionWarningLeft = null;
let trionWarningRight = null;
let trionWarningTimer = 0;

// TRION回復タイマー
let trionRecoveryTimer = 0;

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
    onHit: () => {
      triggerHitFlash();
      damagePlayer(2);  // プレイヤーにダメージ -2
    },
    checkShieldCollision: (pos) => {
      const shield = checkAutoShieldCollision(pos);
      if (shield) {
        addImpactToShield(shield, pos);
        return shield;
      }
      return null;
    },
    spawnAutoShield: (pos, impactPos) => {
      if (!hasEnoughTrion(1)) {
        showTrionWarning();
        return;  // シールドを発動しない
      }
      spawnAutoShield(pos, impactPos);
      consumeTrion(1);  // 自動シールド発動でTRION-1
    }
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

  // オクリュージョン設定チェックボックス
  setupOcclusionCheckbox();

  // プレイヤーUIを作成
  createPlayerUI();

  // TRION切れ警告を作成
  createTrionWarning();
}

// プレイヤーUIを作成（左手首に表示）
function createPlayerUI() {
  if (playerUIGroup) return;

  playerUIGroup = new THREE.Group();
  playerUIGroup.visible = false;

  const barWidth = 0.08;
  const barHeight = 0.015;
  const spacing = 0.025;

  // HP ラベル（PlaneGeometryでグループと同じ角度に）
  const hpCanvas = document.createElement('canvas');
  hpCanvas.width = 64;
  hpCanvas.height = 32;
  const hpCtx = hpCanvas.getContext('2d');
  hpCtx.fillStyle = '#ffffff';
  hpCtx.font = 'bold 24px Arial';
  hpCtx.textAlign = 'center';
  hpCtx.textBaseline = 'middle';
  hpCtx.fillText('HP', 32, 16);
  const hpTexture = new THREE.CanvasTexture(hpCanvas);
  const hpLabelGeometry = new THREE.PlaneGeometry(0.03, 0.015);
  const hpLabelMaterial = new THREE.MeshBasicMaterial({
    map: hpTexture,
    transparent: true,
    side: THREE.DoubleSide
  });
  const hpLabel = new THREE.Mesh(hpLabelGeometry, hpLabelMaterial);
  hpLabel.position.set(-0.055, spacing, 0.001);
  playerUIGroup.add(hpLabel);

  // HP バー背景
  const hpBgGeometry = new THREE.PlaneGeometry(barWidth, barHeight);
  const hpBgMaterial = new THREE.MeshBasicMaterial({
    color: 0x333333,
    transparent: true,
    opacity: 0.8,
    side: THREE.DoubleSide
  });
  const hpBgMesh = new THREE.Mesh(hpBgGeometry, hpBgMaterial);
  hpBgMesh.position.set(0, spacing, 0);
  playerUIGroup.add(hpBgMesh);

  // HP バー本体（緑）
  const hpFillGeometry = new THREE.PlaneGeometry(barWidth - 0.004, barHeight - 0.004);
  const hpFillMaterial = new THREE.MeshBasicMaterial({
    color: 0x00ff00,
    transparent: true,
    opacity: 0.9,
    side: THREE.DoubleSide
  });
  playerHPBarFill = new THREE.Mesh(hpFillGeometry, hpFillMaterial);
  playerHPBarFill.position.set(0, spacing, 0.001);
  playerUIGroup.add(playerHPBarFill);

  // TRION ラベル（PlaneGeometryでグループと同じ角度に）
  const trionCanvas = document.createElement('canvas');
  trionCanvas.width = 80;
  trionCanvas.height = 24;
  const trionCtx = trionCanvas.getContext('2d');
  trionCtx.fillStyle = '#88ffcc';
  trionCtx.font = 'bold 20px Arial';
  trionCtx.textAlign = 'center';
  trionCtx.textBaseline = 'middle';
  trionCtx.fillText('TRION', 40, 12);
  const trionTexture = new THREE.CanvasTexture(trionCanvas);
  const trionLabelGeometry = new THREE.PlaneGeometry(0.032, 0.012);
  const trionLabelMaterial = new THREE.MeshBasicMaterial({
    map: trionTexture,
    transparent: true,
    side: THREE.DoubleSide
  });
  const trionLabel = new THREE.Mesh(trionLabelGeometry, trionLabelMaterial);
  trionLabel.position.set(-0.055, 0, 0.001);
  playerUIGroup.add(trionLabel);

  // TRION バー背景
  const trionBgGeometry = new THREE.PlaneGeometry(barWidth, barHeight);
  const trionBgMaterial = new THREE.MeshBasicMaterial({
    color: 0x333333,
    transparent: true,
    opacity: 0.8,
    side: THREE.DoubleSide
  });
  const trionBgMesh = new THREE.Mesh(trionBgGeometry, trionBgMaterial);
  trionBgMesh.position.set(0, 0, 0);
  playerUIGroup.add(trionBgMesh);

  // TRION バー本体（シアン）
  const trionFillGeometry = new THREE.PlaneGeometry(barWidth - 0.004, barHeight - 0.004);
  const trionFillMaterial = new THREE.MeshBasicMaterial({
    color: 0x88ffcc,
    transparent: true,
    opacity: 0.9,
    side: THREE.DoubleSide
  });
  playerTrionBarFill = new THREE.Mesh(trionFillGeometry, trionFillMaterial);
  playerTrionBarFill.position.set(0, 0, 0.001);
  playerUIGroup.add(playerTrionBarFill);

  scene.add(playerUIGroup);
}

// プレイヤーUIを更新
function updatePlayerUI() {
  if (!playerUIGroup) return;

  // XRセッション中のみ表示（VR/MR両方）
  // isVRModeのチェックを削除してMRでも表示

  // 左手の位置に配置
  if (leftHandPosition) {
    playerUIGroup.visible = true;
    const uiPos = leftHandPosition.clone();
    uiPos.y += 0.1; // 手首の少し上
    playerUIGroup.position.copy(uiPos);

    // カメラの方を向く
    const cameraPos = new THREE.Vector3();
    camera.getWorldPosition(cameraPos);
    playerUIGroup.lookAt(cameraPos);
  } else {
    playerUIGroup.visible = false;
  }

  // HP バー更新
  const hpRatio = playerHP / PLAYER_MAX_HP;
  playerHPBarFill.scale.x = Math.max(0.01, hpRatio);
  playerHPBarFill.position.x = -0.038 * (1 - hpRatio);

  if (hpRatio > 0.5) {
    playerHPBarFill.material.color.setHex(0x00ff00);
  } else if (hpRatio > 0.25) {
    playerHPBarFill.material.color.setHex(0xffff00);
  } else {
    playerHPBarFill.material.color.setHex(0xff0000);
  }

  // TRION バー更新
  const trionRatio = playerTrion / PLAYER_MAX_TRION;
  playerTrionBarFill.scale.x = Math.max(0.01, trionRatio);
  playerTrionBarFill.position.x = -0.038 * (1 - trionRatio);
}

// プレイヤーがダメージを受けた時
function damagePlayer(amount = 10) {
  playerHP = Math.max(0, playerHP - amount);
  console.log('プレイヤーHP:', playerHP);
}

// TRIONを消費
function consumeTrion(amount = 5) {
  playerTrion = Math.max(0, playerTrion - amount);
  console.log('TRION:', playerTrion);
}

// TRIONを回復
function recoverTrion(amount = 1) {
  playerTrion = Math.min(PLAYER_MAX_TRION, playerTrion + amount);
}

// TRIONが足りるかチェック
function hasEnoughTrion(amount) {
  return playerTrion >= amount;
}

// TRION切れ警告を作成
function createTrionWarning() {
  // 警告テキストのキャンバス
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#ff3333';
  ctx.font = 'bold 32px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('OUT OF TRION', 128, 32);

  const texture = new THREE.CanvasTexture(canvas);
  const material = new THREE.SpriteMaterial({
    map: texture,
    transparent: true
  });

  // 左腕用
  trionWarningLeft = new THREE.Sprite(material.clone());
  trionWarningLeft.scale.set(0.15, 0.04, 1);
  trionWarningLeft.visible = false;
  scene.add(trionWarningLeft);

  // 右腕用
  trionWarningRight = new THREE.Sprite(material.clone());
  trionWarningRight.scale.set(0.15, 0.04, 1);
  trionWarningRight.visible = false;
  scene.add(trionWarningRight);
}

// TRION切れ警告を表示
function showTrionWarning() {
  trionWarningTimer = 1.5;  // 1.5秒間表示
}

// TRION切れ警告を更新
function updateTrionWarning(deltaTime) {
  if (trionWarningTimer > 0) {
    trionWarningTimer -= deltaTime;

    // 点滅効果
    const blink = Math.floor(trionWarningTimer * 6) % 2 === 0;

    if (trionWarningLeft && leftHandPosition) {
      trionWarningLeft.visible = blink;
      const pos = leftHandPosition.clone();
      pos.y += 0.15;
      trionWarningLeft.position.copy(pos);

      // カメラを向く
      const cameraPos = new THREE.Vector3();
      camera.getWorldPosition(cameraPos);
      trionWarningLeft.lookAt(cameraPos);
    }

    if (trionWarningRight && rightHandPosition) {
      trionWarningRight.visible = blink;
      const pos = rightHandPosition.clone();
      pos.y += 0.15;
      trionWarningRight.position.copy(pos);

      // カメラを向く
      const cameraPos = new THREE.Vector3();
      camera.getWorldPosition(cameraPos);
      trionWarningRight.lookAt(cameraPos);
    }
  } else {
    if (trionWarningLeft) trionWarningLeft.visible = false;
    if (trionWarningRight) trionWarningRight.visible = false;
  }
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

    // ヒットパーティクルを更新
    updateHitParticles(1 / 60);

    // 爆発パーティクルを更新
    updateExplosionParticles(1 / 60);

    // レプリカの落下を更新
    updateReplicaFall(1 / 60);

    // ゲーム終了UIを更新
    updateGameEndUI();

    // ボタンホバー状態をリセット（手がボタンに近づいていなければ）
    if (isReplicaDefeatedState()) {
      let isNearButton = false;
      const buttonMesh = getReturnButtonMesh();
      if (buttonMesh) {
        const buttonPos = new THREE.Vector3();
        buttonMesh.getWorldPosition(buttonPos);
        if (leftHandPosition && leftHandPosition.distanceTo(buttonPos) < 0.2) {
          isNearButton = true;
        }
        if (rightHandPosition && rightHandPosition.distanceTo(buttonPos) < 0.2) {
          isNearButton = true;
        }
      }
      if (!isNearButton) {
        setButtonHover(false);
      }
    }

    // 自動シールドを更新
    updateAutoShields(1 / 60);

    // プレイヤーUIを更新
    updatePlayerUI();

    // TRION切れ警告を更新
    updateTrionWarning(1 / 60);

    // TRION回復（1秒で2回復）
    trionRecoveryTimer += 1 / 60;
    if (trionRecoveryTimer >= 1.0) {
      trionRecoveryTimer = 0;
      recoverTrion(2);
    }

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

      // ゲーム終了時のボタン判定（左手）
      if (isReplicaDefeatedState()) {
        const indexTipPose = frame.getJointPose(leftHand.get('index-finger-tip'), referenceSpace);
        const thumbTipPose = frame.getJointPose(leftHand.get('thumb-tip'), referenceSpace);
        if (indexTipPose) {
          const fingerPos = new THREE.Vector3(
            indexTipPose.transform.position.x,
            indexTipPose.transform.position.y,
            indexTipPose.transform.position.z
          );
          const buttonMesh = getReturnButtonMesh();
          if (buttonMesh) {
            const buttonPos = new THREE.Vector3();
            buttonMesh.getWorldPosition(buttonPos);
            const dist = fingerPos.distanceTo(buttonPos);

            // ホバー判定（ボタンに近づいたらハイライト）
            if (dist < 0.2) {
              setButtonHover(true);

              // ピンチジェスチャー判定（人差し指と親指が近い）
              if (thumbTipPose && dist < 0.1) {
                const thumbPos = new THREE.Vector3(
                  thumbTipPose.transform.position.x,
                  thumbTipPose.transform.position.y,
                  thumbTipPose.transform.position.z
                );
                const pinchDist = fingerPos.distanceTo(thumbPos);
                if (pinchDist < 0.05) {
                  console.log('ボタンをピンチ！（左手）');
                  returnToTitle();
                }
              }
            }
          }
        }
      }

      // 撃破後はトリガー使用不可
      const canUseTrigger = !isReplicaDefeatedState();

      const leftAsteroidMode = handOpen && !palmForward && canUseTrigger;

      // シールドモード判定（TRION切れの時、または撃破後はシールド発動しない）
      let newLeftShieldMode = handOpen && palmForward && canUseTrigger;
      if (newLeftShieldMode && !isLeftShieldMode && !hasEnoughTrion(5)) {
        showTrionWarning();
        newLeftShieldMode = false;  // TRION切れの時はシールドモードにしない
      }

      if (newLeftShieldMode !== isLeftShieldMode) {
        isLeftShieldMode = newLeftShieldMode;
      }

      if (handOpen !== isLeftHandOpen) {
        const wasOpen = isLeftHandOpen;
        isLeftHandOpen = handOpen;

        const leftAsteroidGroup = getAsteroidGroup('left');
        const leftAsteroidState = getAsteroidState('left');

        if (handOpen && leftAsteroidMode && leftAsteroidGroup && !leftAsteroidState.isCharging && canUseTrigger) {
          const trionCost = leftHoundMode ? 20 : 10;
          if (!hasEnoughTrion(trionCost)) {
            showTrionWarning();
            // TRION切れの時はキューブを出さない
          } else {
            leftAsteroidGroup.visible = true;
            castAsteroid('left', leftHoundMode);
          }
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
          const onHitReplica = (hitPosition) => {
            triggerReplicaHitFlash(1, hitPosition);
          };
          fireAsteroid(palmNormal, getTargetPos, onHitReplica, 'left');
          // TRION消費（ハウンド-20、アステロイド-10）
          consumeTrion(leftHoundMode ? 20 : 10);
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

      // ゲーム終了時のボタン判定（右手）
      if (isReplicaDefeatedState()) {
        const indexTipPose = frame.getJointPose(rightHand.get('index-finger-tip'), referenceSpace);
        const thumbTipPose = frame.getJointPose(rightHand.get('thumb-tip'), referenceSpace);
        if (indexTipPose) {
          const fingerPos = new THREE.Vector3(
            indexTipPose.transform.position.x,
            indexTipPose.transform.position.y,
            indexTipPose.transform.position.z
          );
          const buttonMesh = getReturnButtonMesh();
          if (buttonMesh) {
            const buttonPos = new THREE.Vector3();
            buttonMesh.getWorldPosition(buttonPos);
            const dist = fingerPos.distanceTo(buttonPos);

            // ホバー判定（ボタンに近づいたらハイライト）
            if (dist < 0.2) {
              setButtonHover(true);

              // ピンチジェスチャー判定（人差し指と親指が近い）
              if (thumbTipPose && dist < 0.1) {
                const thumbPos = new THREE.Vector3(
                  thumbTipPose.transform.position.x,
                  thumbTipPose.transform.position.y,
                  thumbTipPose.transform.position.z
                );
                const pinchDist = fingerPos.distanceTo(thumbPos);
                if (pinchDist < 0.05) {
                  console.log('ボタンをピンチ！（右手）');
                  returnToTitle();
                }
              }
            }
          }
        }
      }

      // 撃破後はトリガー使用不可（右手）
      const canUseTriggerRight = !isReplicaDefeatedState();

      const rightAsteroidMode = handOpen && !palmForward && canUseTriggerRight;

      // シールドモード判定（TRION切れの時、または撃破後はシールド発動しない）
      let newRightShieldMode = handOpen && palmForward && canUseTriggerRight;
      if (newRightShieldMode && !isRightShieldMode && !hasEnoughTrion(5)) {
        showTrionWarning();
        newRightShieldMode = false;  // TRION切れの時はシールドモードにしない
      }

      if (newRightShieldMode !== isRightShieldMode) {
        isRightShieldMode = newRightShieldMode;
      }

      if (handOpen !== isRightHandOpen) {
        const wasOpen = isRightHandOpen;
        isRightHandOpen = handOpen;

        const rightAsteroidGroup = getAsteroidGroup('right');
        const rightAsteroidState = getAsteroidState('right');

        if (handOpen && rightAsteroidMode && rightAsteroidGroup && !rightAsteroidState.isCharging && canUseTriggerRight) {
          const trionCost = rightHoundMode ? 20 : 10;
          if (!hasEnoughTrion(trionCost)) {
            showTrionWarning();
            // TRION切れの時はキューブを出さない
          } else {
            rightAsteroidGroup.visible = true;
            castAsteroid('right', rightHoundMode);
          }
        }
        else if (!handOpen && wasOpen && rightAsteroidGroup && rightAsteroidState.isCharging && !rightAsteroidState.isCancelling) {
          const palmNormal = handTransform ? handTransform.palmNormal : null;
          const getTargetPos = () => {
            if (isReplicaPositioned()) {
              return getReplicaPosition();
            }
            return null;
          };
          const onHitReplica = (hitPosition) => {
            triggerReplicaHitFlash(1, hitPosition);
          };
          fireAsteroid(palmNormal, getTargetPos, onHitReplica, 'right');
          // TRION消費（ハウンド-20、アステロイド-10）
          consumeTrion(rightHoundMode ? 20 : 10);
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
    const bothHandsShieldMode = isLeftShieldMode && isRightShieldMode && !isReplicaDefeatedState();

    // 両手シールドモードの判定（遅延を追加して安定化、撃破後は無効）
    if (bothHandsShieldMode && !fixedShieldModeActive) {
      // 両手がシールドモードだが、まだ固定シールドは無効
      fixedShieldModeTimer += deltaTime;
      if (fixedShieldModeTimer >= FIXED_SHIELD_ACTIVATE_DELAY) {
        if (!hasEnoughTrion(30)) {
          showTrionWarning();
          fixedShieldModeTimer = 0;  // リセットして再試行可能に
        } else {
          fixedShieldModeActive = true;
          fixedShieldModeTimer = 0;
          consumeTrion(30);  // 固定シールド発動でTRION-30
        }
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

function setupOcclusionCheckbox() {
  const occlusionCheckbox = document.getElementById('occlusion-checkbox');
  if (occlusionCheckbox) {
    // 初期状態を反映
    setOcclusionEnabled(occlusionCheckbox.checked);

    // チェックボックス変更時
    occlusionCheckbox.addEventListener('change', () => {
      setOcclusionEnabled(occlusionCheckbox.checked);
      console.log('オクリュージョン:', occlusionCheckbox.checked ? 'ON' : 'OFF');
    });
  }
}

// 初期化実行
init();
