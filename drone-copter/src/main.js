import * as THREE from 'three';
import * as state from './state.js';
import { updateInfo } from './utils.js';
import { loadDroneModel, updateMaxSpeed } from './drone.js';
import { updateDroneSoundPitch } from './sound.js';
import {
  updateAutoReturnText, updateSpeedText, updateVolumeText, updateCollisionText,
  updateTrackingLostText, updateSequenceStatusText,
  updateDroneLocationArrow, createTrackingLostText, removeTrackingLostText,
  removeSequenceStatusText, updateControllerGuideMenu, updateSettingsMenu
} from './ui.js';
import { checkPlaneCollision, updatePreStartupPhysics, updateHoverAnimation, updateReturnToHover } from './physics.js';
import { createVREnvironment, removeVREnvironment, processDepthInformation, updatePlanes, createDepthVisualization, positionDrone } from './vr.js';
import {
  updateAutoReturn, handleSpeedChange, handleRightControllerButtons,
  handleStartupSequence, handleSizeChange, handleControllerGrab, handleHandGrab,
  handleLeftControllerButtons
} from './controls.js';

// シーンの初期化
function init() {
  // シーン作成
  const scene = new THREE.Scene();
  state.setScene(scene);

  // カメラ作成
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  state.setCamera(camera);

  // オーディオリスナー作成
  const audioListener = new THREE.AudioListener();
  camera.add(audioListener);
  state.setAudioListener(audioListener);

  // レンダラー作成
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.xr.enabled = true;
  state.setRenderer(renderer);

  const appDiv = document.getElementById('app');
  appDiv.appendChild(renderer.domElement);

  // ライト設定
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
  directionalLight.position.set(1, 1, 1);
  scene.add(directionalLight);

  // ドローンモデルの読み込み
  loadDroneModel();

  // ウィンドウリサイズ対応
  window.addEventListener('resize', onWindowResize);

  // アニメーションループ
  renderer.setAnimationLoop(render);
}

// メインレンダーループ
function render() {
  // UI更新
  updateAutoReturnText();
  updateSpeedText();
  updateVolumeText();
  updateCollisionText();
  updateTrackingLostText();
  updateSequenceStatusText();
  updateControllerGuideMenu();
  updateSettingsMenu();

  // ドローンがカメラ外にいる時の方向ガイド（常に更新）
  updateDroneLocationArrow();

  // XRセッション中の処理
  if (state.xrSession) {
    const frame = state.renderer.xr.getFrame();
    const referenceSpace = state.renderer.xr.getReferenceSpace();
    if (frame && referenceSpace) {
      processDepthInformation(frame, referenceSpace);
      updatePlanes(frame, referenceSpace);
    }

    // 深度視覚化メッシュの作成と更新
    if (state.depthDataTexture && !state.depthMesh) {
      createDepthVisualization();
    }
    if (state.depthMesh) {
      state.depthMesh.visible = state.showDepthVisualization;
    }

    // コントローラーのトラッキング状態を監視
    const inputSources = state.xrSession.inputSources;
    let leftFound = false;
    let rightFound = false;

    for (const source of inputSources) {
      if (source.handedness === 'left' && source.gripSpace) {
        leftFound = true;
      } else if (source.handedness === 'right' && source.gripSpace) {
        rightFound = true;
      }
    }

    const prevLeftTracked = state.isLeftControllerTracked;
    const prevRightTracked = state.isRightControllerTracked;

    state.setIsLeftControllerTracked(leftFound);
    state.setIsRightControllerTracked(rightFound);

    if (prevLeftTracked !== state.isLeftControllerTracked || prevRightTracked !== state.isRightControllerTracked) {
      if (!state.isLeftControllerTracked || !state.isRightControllerTracked) {
        createTrackingLostText();
      } else {
        removeTrackingLostText();
      }
    }
  }

  // ドローン配置
  positionDrone();

  // プロペラ回転
  state.propellers.forEach((propeller) => {
    if (state.isStartupComplete && !state.isShuttingDown) {
      propeller.rotation.y += 0.5;
    } else {
      propeller.rotation.y += 0.5 * state.propellerSpeedMultiplier;
    }
  });

  // 物理演算とアニメーション
  updateReturnToHover();
  updateLiftSequence();
  updatePreStartupPhysics();
  updateHoverAnimation();

  // コントローラー入力処理
  handleSizeChange();
  handleControllerGrab();
  updateAutoReturn();
  handleSpeedChange();
  handleRightControllerButtons();
  handleLeftControllerButtons();
  handleStartupSequence();
  updateDecelerationSequence();
  updateGamepadMovement();
  handleHandGrab();

  // ドローンの速度を計算して音のピッチを更新
  if (state.drone && state.dronePositioned) {
    const currentPos = state.drone.position.clone();

    if (state.previousDronePosition.length() > 0) {
      const displacement = currentPos.distanceTo(state.previousDronePosition);
      state.setDroneVelocity(displacement / 0.016);
      updateDroneSoundPitch();
    }

    state.previousDronePosition.copy(currentPos);
  }

  // 次フレームの速度計算のために現在位置を保存
  if (state.drone) {
    state.dronePreviousPosition.copy(state.drone.position);
  }

  state.renderer.render(state.scene, state.camera);
}

// 上昇シーケンスの処理
function updateLiftSequence() {
  if (state.liftStartTime === null || !state.drone || !state.dronePositioned) return;

  // 初回のみ右コントローラーの位置を取得
  if (state.liftStartPos === null && state.xrSession) {
    const frame = state.renderer.xr.getFrame();
    const referenceSpace = state.renderer.xr.getReferenceSpace();

    if (frame && referenceSpace) {
      for (const src of state.xrSession.inputSources) {
        if (src.handedness === 'right' && src.gripSpace) {
          const gripPose = frame.getPose(src.gripSpace, referenceSpace);
          if (gripPose) {
            const targetPos = new THREE.Vector3().setFromMatrixPosition(
              new THREE.Matrix4().fromArray(gripPose.transform.matrix)
            );

            state.setLiftStartPos(state.drone.position.clone());
            if (state.drone.position.y >= targetPos.y) {
              state.setLiftTargetHeight(state.drone.position.y + 0.1);
              console.log('上昇開始 - 現在位置:', state.liftStartPos.y.toFixed(3), '目標高さ:', state.liftTargetHeight.toFixed(3), '(コントローラーより高いため10cm上昇)');
            } else {
              state.setLiftTargetHeight(targetPos.y);
              console.log('上昇開始 - 現在位置:', state.liftStartPos.y.toFixed(3), '目標高さ:', state.liftTargetHeight.toFixed(3), '(コントローラーの高さまで)');
            }
            break;
          }
        }
      }

      if (state.liftStartPos === null) {
        console.log('右コントローラーが見つからないため上昇を中止');
        state.setLiftStartTime(null);
      }
    }
  }
}

// 減速シーケンスの処理
function updateDecelerationSequence() {
  if (state.decelerationStartTime === null || !state.drone || !state.dronePositioned) return;

  const elapsed = Date.now() - state.decelerationStartTime;
  const decelerationDuration = 2000;
  const progress = Math.min(elapsed / decelerationDuration, 1.0);

  state.setPropellerSpeedMultiplier(1.0 - progress);
  console.log('減速中 - progress:', progress.toFixed(2), 'propellerSpeed:', state.propellerSpeedMultiplier.toFixed(2));

  if (state.droneSound && state.droneSound.isPlaying) {
    const normalPitch = Math.pow(0.3 / state.currentDroneScale, 0.5);
    const clampedNormalPitch = Math.max(0.2, Math.min(2.7, normalPitch));
    const endPitch = Math.max(clampedNormalPitch / 2.0, 0.2);

    const currentPitch = clampedNormalPitch - (clampedNormalPitch - endPitch) * progress;
    state.droneSound.setPlaybackRate(currentPitch);

    if (!state.isSoundMuted) {
      state.droneSound.setVolume(0.7 * (1.0 - progress));
    }
  }

  if (progress >= 1.0) {
    state.setDecelerationStartTime(null);
    state.setLandingHeight(null);
    state.setIsShuttingDown(false);
    state.setPropellerSpeedMultiplier(0);
    state.setHasLanded(true);

    if (state.droneSound && state.droneSound.isPlaying) {
      state.droneSound.stop();
    }

    console.log('終了シーケンス完了');
    updateInfo('ドローン停止 - Xボタンで再起動');
    removeSequenceStatusText();
  }
}

// ゲームパッド移動処理
function updateGamepadMovement() {
  if (!state.xrSession || !state.drone || !state.dronePositioned) return;
  if (!state.isStartupComplete && state.liftStartTime === null && state.descentStartTime === null) return;
  if (state.isGrabbedByController || state.isGrabbedByHand || state.isReturningToHover || state.isAutoReturning || state.bothGripsPressed) return;

  const inputSources = state.xrSession.inputSources;
  let inputX = 0, inputY = 0, inputZ = 0;
  let inputRotation = 0;
  let rawInputX = 0, rawInputZ = 0;

  // 上昇中は自動的に上昇入力をシミュレート
  if (state.liftStartTime !== null && state.liftStartPos !== null && state.liftTargetHeight !== null) {
    const currentY = state.drone.userData.basePosition ? state.drone.userData.basePosition.y : state.drone.position.y;

    // スタック検出
    let isStuck = false;
    if (state.isCollisionEnabled) {
      if (state.liftLastY === null) {
        state.setLiftLastY(currentY);
        state.setLiftStuckStartTime(Date.now());
      } else {
        const yDiff = Math.abs(currentY - state.liftLastY);
        if (yDiff < 0.005) {
          const stuckDuration = Date.now() - state.liftStuckStartTime;
          if (stuckDuration > 500) {
            isStuck = true;
            console.log('上昇中にスタック検出 - 0.5秒間動いていない');
          }
        } else {
          state.setLiftLastY(currentY);
          state.setLiftStuckStartTime(Date.now());
        }
      }
    }

    if (isStuck) {
      state.setLiftStartTime(null);
      state.setLiftStartPos(null);
      state.setLiftTargetHeight(null);
      state.setLiftLastY(null);
      state.setLiftStuckStartTime(null);
      state.setIsStartupComplete(true);
      state.setIsStartingUp(false);
      state.setPropellerSpeedMultiplier(1.0);

      if (state.drone.userData.basePosition) {
        state.drone.userData.basePosition = state.drone.position.clone();
      }
      state.setHoverTime(0);

      console.log('上昇中に衝突検出 - その場で起動完了');
      updateInfo('Collision Detected - Ready');
      removeSequenceStatusText();
    } else {
      const yDiff = state.liftTargetHeight - currentY;

      if (Math.abs(yDiff) > 0.02) {
        inputY = Math.min(Math.max(yDiff * 2.0, 0.3), 1.0);
      } else {
        state.setLiftStartTime(null);
        state.setLiftStartPos(null);
        state.setLiftTargetHeight(null);
        state.setLiftLastY(null);
        state.setLiftStuckStartTime(null);
        state.setIsStartupComplete(true);
        state.setIsStartingUp(false);
        state.setPropellerSpeedMultiplier(1.0);

        if (state.drone.userData.basePosition) {
          state.drone.userData.basePosition = state.drone.position.clone();
        }
        state.setHoverTime(0);

        console.log('起動シーケンス完了 - 最終高さ:', state.drone.position.y);
        updateInfo('Drone Ready');
        removeSequenceStatusText();
      }
    }
  }

  // 降下中は自動的に下降入力をシミュレート
  if (state.descentStartTime !== null && state.decelerationStartTime === null) {
    const floorHeight = 0;
    const currentY = state.drone.userData.basePosition ? state.drone.userData.basePosition.y : state.drone.position.y;

    // スタック検出
    let isStuck = false;
    if (state.isCollisionEnabled) {
      if (state.descentLastY === null) {
        state.setDescentLastY(currentY);
        state.setDescentStuckStartTime(Date.now());
      } else {
        const yDiff = Math.abs(currentY - state.descentLastY);
        if (yDiff < 0.005) {
          const stuckDuration = Date.now() - state.descentStuckStartTime;
          if (stuckDuration > 500) {
            isStuck = true;
            console.log('降下中にスタック検出 - 0.5秒間動いていない');
          }
        } else {
          state.setDescentLastY(currentY);
          state.setDescentStuckStartTime(Date.now());
        }
      }
    }

    if (isStuck) {
      state.setDescentStartTime(null);
      state.setDescentLastY(null);
      state.setDescentStuckStartTime(null);
      state.setDecelerationStartTime(Date.now());
      state.setLandingHeight(currentY);

      if (state.drone.userData.basePosition) {
        state.drone.userData.basePosition.copy(state.drone.position);
      }
      state.velocity.set(0, 0, 0);

      console.log('降下中に衝突検出 - その高さで減速シーケンス開始, 着地高さ:', state.landingHeight.toFixed(3));
      updateInfo('Collision Detected - Landing...');
    } else {
      const yDiff = currentY - floorHeight;

      state.setPropellerSpeedMultiplier(1.0);

      if (yDiff > 0.02) {
        inputY = -Math.min(Math.max(yDiff * 2.0, 0.3), 1.0);
      } else {
        state.setDescentStartTime(null);
        state.setDescentLastY(null);
        state.setDescentStuckStartTime(null);
        state.setDecelerationStartTime(Date.now());
        state.setLandingHeight(floorHeight);
        console.log('着地完了 - プロペラ減速開始');
        updateInfo('Landing...');
      }
    }
  }

  // スティック入力取得
  const deadzone = state.stickDeadzone;
  for (const source of inputSources) {
    if (source.gamepad) {
      const gp = source.gamepad;
      const axes = gp.axes;

      if (state.liftStartTime === null && state.descentStartTime === null && state.decelerationStartTime === null) {
        if (source.handedness === 'right' && axes.length >= 4) {
          if (Math.abs(axes[2]) > deadzone) {
            inputX = axes[2];
            rawInputX = axes[2];
          }
          if (Math.abs(axes[3]) > deadzone) {
            inputY = -axes[3];
          }
        }

        if (source.handedness === 'left' && axes.length >= 4) {
          if (Math.abs(axes[2]) > deadzone) {
            inputRotation = -axes[2];
          }
          if (Math.abs(axes[3]) > deadzone) {
            inputZ = axes[3];
            rawInputZ = axes[3];
          }
        }
      }
    }
  }

  // 上昇・下降（絶対座標）
  state.velocity.y += inputY * state.acceleration;

  // Y軸周りの回転のみを適用
  const yRotationOnly = new THREE.Quaternion();
  yRotationOnly.setFromAxisAngle(new THREE.Vector3(0, 1, 0), state.drone.rotation.y);

  // 前後移動
  const forward = new THREE.Vector3(0, 0, -1);
  forward.applyQuaternion(yRotationOnly);
  forward.y = 0;
  forward.normalize();
  forward.multiplyScalar(inputZ * state.acceleration);
  state.velocity.add(forward);

  // 左右移動
  const right = new THREE.Vector3(-1, 0, 0);
  right.applyQuaternion(yRotationOnly);
  right.y = 0;
  right.normalize();
  right.multiplyScalar(inputX * state.acceleration);
  state.velocity.add(right);

  // 速度制限
  if (state.velocity.length() > state.maxSpeed) {
    state.velocity.normalize().multiplyScalar(state.maxSpeed);
  }

  // 摩擦による減衰
  state.velocity.multiplyScalar(state.friction);

  // basePositionの初期化
  if (!state.drone.userData.basePosition) {
    state.drone.userData.basePosition = state.drone.position.clone();
  }

  // 速度を位置に反映
  if (state.decelerationStartTime !== null) {
    state.velocity.set(0, 0, 0);
    if (state.landingHeight !== null) {
      state.drone.position.y = state.landingHeight;
      if (state.drone.userData.basePosition) {
        state.drone.userData.basePosition.y = state.landingHeight;
      }
    } else {
      const floorHeight = 0;
      state.drone.position.y = floorHeight;
      if (state.drone.userData.basePosition) {
        state.drone.userData.basePosition.y = floorHeight;
      }
    }
  } else if (state.liftStartTime !== null || state.descentStartTime !== null) {
    state.drone.position.add(state.velocity);
    state.drone.userData.basePosition.copy(state.drone.position);
  } else {
    state.drone.userData.basePosition.add(state.velocity);
  }

  // 角速度の更新
  let angVel = state.angularVelocity;
  angVel += inputRotation * state.angularAcceleration;
  angVel = Math.max(-state.maxAngularSpeed, Math.min(state.maxAngularSpeed, angVel));
  angVel *= state.angularFriction;
  state.setAngularVelocity(angVel);

  // 角速度を回転に反映
  state.drone.rotation.y += state.angularVelocity;

  // 移動方向への傾き
  const targetTiltX = -rawInputZ * state.tiltAmount;
  const targetTiltZ = rawInputX * state.tiltAmount;

  if (!state.drone.userData.physicsTilt) {
    state.drone.userData.physicsTilt = { x: 0, z: 0 };
  }
  state.drone.userData.physicsTilt.x += (targetTiltX - state.drone.userData.physicsTilt.x) * state.tiltSmoothing;
  state.drone.userData.physicsTilt.z += (targetTiltZ - state.drone.userData.physicsTilt.z) * state.tiltSmoothing;

  // 平面との衝突判定
  if (state.isCollisionEnabled) {
    checkPlaneCollision();
  }
}

function onWindowResize() {
  state.camera.aspect = window.innerWidth / window.innerHeight;
  state.camera.updateProjectionMatrix();
  state.renderer.setSize(window.innerWidth, window.innerHeight);
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

    const xrSession = await navigator.xr.requestSession('immersive-ar', {
      requiredFeatures: [],
      optionalFeatures: ['local-floor', 'bounded-floor', 'depth-sensing', 'plane-detection', 'hand-tracking'],
      depthSensing: {
        usagePreference: ['cpu-optimized', 'gpu-optimized'],
        dataFormatPreference: ['luminance-alpha', 'float32']
      }
    });

    state.setXrSession(xrSession);
    state.setIsMrMode(true);

    await state.renderer.xr.setSession(xrSession);

    const rightController = state.renderer.xr.getController(0);
    const leftController = state.renderer.xr.getController(1);
    state.scene.add(rightController);
    state.scene.add(leftController);
    state.setRightController(rightController);
    state.setLeftController(leftController);

    const hand1 = state.renderer.xr.getHand(0);
    const hand2 = state.renderer.xr.getHand(1);
    state.scene.add(hand1);
    state.scene.add(hand2);
    state.setHand1(hand1);
    state.setHand2(hand2);

    // フラグをリセット
    state.setDronePositioned(false);
    state.setIsStartupComplete(false);
    state.setIsStartingUp(false);
    state.setPropellerSpeedMultiplier(0);
    state.setLiftStartTime(null);
    state.setLiftStartPos(null);
    state.setLiftTargetHeight(null);
    state.dronePhysicsVelocity.set(0, 0, 0);
    state.droneAngularVelocity.set(0, 0, 0);
    state.dronePreviousPosition.set(0, 0, 0);

    if (state.droneSound && state.droneSound.isPlaying) {
      state.droneSound.stop();
      console.log('ドローン音声停止');
    }

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
      updateInfo('MRセッション開始 (深度センサー有効)');
    } else {
      console.log('深度センサー無効');
      updateInfo('MRセッション開始 (深度センサー無効)');
    }

    xrSession.addEventListener('end', () => {
      state.setXrSession(null);
      state.setIsMrMode(false);

      if (state.droneSound && state.droneSound.isPlaying) {
        state.droneSound.stop();
        console.log('ドローン音声停止');
      }

      if (state.depthMesh) {
        state.scene.remove(state.depthMesh);
        state.setDepthMesh(null);
      }
      state.setDepthDataTexture(null);

      state.detectedPlanes.clear();

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

    const xrSession = await navigator.xr.requestSession('immersive-vr', {
      requiredFeatures: [],
      optionalFeatures: ['local-floor', 'bounded-floor', 'hand-tracking']
    });

    state.setXrSession(xrSession);

    await state.renderer.xr.setSession(xrSession);

    createVREnvironment();

    const rightController = state.renderer.xr.getController(0);
    const leftController = state.renderer.xr.getController(1);
    state.scene.add(rightController);
    state.scene.add(leftController);
    state.setRightController(rightController);
    state.setLeftController(leftController);

    const hand1 = state.renderer.xr.getHand(0);
    const hand2 = state.renderer.xr.getHand(1);
    state.scene.add(hand1);
    state.scene.add(hand2);
    state.setHand1(hand1);
    state.setHand2(hand2);

    // フラグをリセット
    state.setDronePositioned(false);
    state.setIsStartupComplete(false);
    state.setIsStartingUp(false);
    state.setPropellerSpeedMultiplier(0);
    state.setLiftStartTime(null);
    state.setLiftStartPos(null);
    state.setLiftTargetHeight(null);
    state.dronePhysicsVelocity.set(0, 0, 0);
    state.droneAngularVelocity.set(0, 0, 0);
    state.dronePreviousPosition.set(0, 0, 0);

    if (state.droneSound && state.droneSound.isPlaying) {
      state.droneSound.stop();
      console.log('ドローン音声停止');
    }

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
      state.setXrSession(null);

      removeVREnvironment();

      if (state.droneSound && state.droneSound.isPlaying) {
        state.droneSound.stop();
        console.log('ドローン音声停止');
      }

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
    state.setShowDepthVisualization(!state.showDepthVisualization);
    depthToggleButton.textContent = state.showDepthVisualization ? '深度表示 ON' : '深度表示 OFF';
    console.log('深度表示:', state.showDepthVisualization);
  });

  window.addEventListener('xr-session-start', () => {
    depthToggleButton.style.display = 'block';
  });

  window.addEventListener('xr-session-end', () => {
    depthToggleButton.style.display = 'none';
    state.setShowDepthVisualization(false);
    depthToggleButton.textContent = '深度表示 OFF';
  });
}
