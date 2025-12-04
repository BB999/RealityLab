import * as THREE from 'three';
import * as state from './state.js';
import { updateInfo } from './utils.js';
import { updateDroneScale, updateMaxSpeed } from './drone.js';
import { updateDroneSoundPitch } from './sound.js';
import {
  createAutoReturnText, createAutoReturnRightControllerText, removeAutoReturnText,
  createSpeedText, createVolumeText, createCollisionText, createTrackingLostText,
  createSequenceStatusText, removeSequenceStatusText,
  createHUDModeText, createDirectionArrow
} from './ui.js';

// 自動帰還モードの処理
export function updateAutoReturn() {
  if (!state.isAutoReturning || !state.drone || !state.dronePositioned) return;

  if (state.autoReturnPhase === 'horizontal') {
    const horizontalTarget = new THREE.Vector3(state.autoReturnTarget.x, state.drone.position.y, state.autoReturnTarget.z);
    const direction = new THREE.Vector3().subVectors(horizontalTarget, state.drone.position);
    const distance = direction.length();

    if (distance < 0.05) {
      state.setAutoReturnPhase('vertical');
      updateInfo('水平位置到達 - 高度調整中');
      console.log('水平移動完了、高度調整開始');
    } else {
      direction.normalize();
      const moveSpeed = Math.min(state.autoReturnSpeed, distance);
      state.drone.position.x += direction.x * moveSpeed;
      state.drone.position.z += direction.z * moveSpeed;
      state.drone.userData.basePosition.copy(state.drone.position);

      const targetAngle = Math.atan2(direction.x, direction.z);
      const currentAngle = state.drone.rotation.y;
      let angleDiff = targetAngle - currentAngle;

      while (angleDiff > Math.PI) angleDiff -= Math.PI * 2;
      while (angleDiff < -Math.PI) angleDiff += Math.PI * 2;

      state.drone.rotation.y += angleDiff * 0.1;
    }
  } else if (state.autoReturnPhase === 'vertical') {
    const verticalDistance = Math.abs(state.autoReturnTarget.y - state.drone.position.y);

    if (verticalDistance < 0.05) {
      state.setAutoReturnPhase('rotation');
      updateInfo('高度到達 - 向き調整中');
      console.log('高度調整完了、向き調整開始');
    } else {
      const direction = Math.sign(state.autoReturnTarget.y - state.drone.position.y);
      const moveSpeed = Math.min(state.autoReturnSpeed, verticalDistance);
      state.drone.position.y += direction * moveSpeed;
      state.drone.userData.basePosition.copy(state.drone.position);
    }
  } else if (state.autoReturnPhase === 'rotation') {
    const cameraPos = new THREE.Vector3();
    state.camera.getWorldPosition(cameraPos);

    const cameraDirection = new THREE.Vector3(0, 0, -1);
    cameraDirection.applyQuaternion(state.camera.quaternion);
    cameraDirection.y = 0;
    cameraDirection.normalize();

    const targetAngle = Math.atan2(cameraDirection.x, cameraDirection.z);
    const currentAngle = state.drone.rotation.y;

    let angleDiff = targetAngle - currentAngle;

    while (angleDiff > Math.PI) angleDiff -= Math.PI * 2;
    while (angleDiff < -Math.PI) angleDiff += Math.PI * 2;

    if (Math.abs(angleDiff) < 0.05) {
      state.drone.rotation.y = targetAngle;
      state.setIsAutoReturning(false);
      state.setAutoReturnPhase('horizontal');
      removeAutoReturnText();
      state.drone.userData.basePosition.copy(state.drone.position);
      state.velocity.set(0, 0, 0);
      state.setAngularVelocity(0);
      updateInfo('自動帰還完了');
      console.log('自動帰還完了');
    } else {
      state.drone.rotation.y += angleDiff * 0.1;
    }
  }
}

// 速度レベル変更処理
export function handleSpeedChange() {
  if (!state.xrSession || !state.drone || !state.dronePositioned) return;
  if (!state.isStartupComplete || state.bothGripsPressed) return;

  const inputSources = state.xrSession.inputSources;

  for (const source of inputSources) {
    if (source.gamepad) {
      const buttons = source.gamepad.buttons;
      const triggerButton = buttons[0];
      const isTriggerPressed = triggerButton && triggerButton.pressed;

      if (source.handedness === 'left' && isTriggerPressed && !state.leftTriggerPressed) {
        if (state.speedLevel > 1) {
          state.setSpeedLevel(state.speedLevel - 1);
          updateMaxSpeed();
          createSpeedText();
          updateInfo(`速度レベル: ${state.speedLevel}`);
        } else {
          createSpeedText();
          updateInfo(`速度レベル: ${state.speedLevel} (最小)`);
        }
        state.setLeftTriggerPressed(true);
      } else if (source.handedness === 'left' && !isTriggerPressed) {
        state.setLeftTriggerPressed(false);
      }

      if (source.handedness === 'right' && isTriggerPressed && !state.rightTriggerPressed) {
        if (state.speedLevel < 20) {
          state.setSpeedLevel(state.speedLevel + 1);
          updateMaxSpeed();
          createSpeedText();
          updateInfo(`速度レベル: ${state.speedLevel}`);
        } else {
          createSpeedText();
          updateInfo(`速度レベル: ${state.speedLevel} (最大)`);
        }
        state.setRightTriggerPressed(true);
      } else if (source.handedness === 'right' && !isTriggerPressed) {
        state.setRightTriggerPressed(false);
      }
    }
  }
}

// 右コントローラーのボタン処理（自動帰還、HUDモード、当たり判定）
export function handleRightControllerButtons() {
  if (!state.xrSession || !state.drone || !state.dronePositioned) return;
  if (!state.isStartupComplete || state.isGrabbedByController || state.isGrabbedByHand || state.bothGripsPressed) return;

  const inputSources = state.xrSession.inputSources;

  for (const source of inputSources) {
    if (source.handedness === 'right' && source.gamepad) {
      const buttons = source.gamepad.buttons;

      // Bボタンで自動帰還
      const bButton = buttons[5];
      const isBPressed = bButton && bButton.pressed;

      if (isBPressed && !state.rightBButtonPressed) {
        if (!state.isAutoReturning) {
          const frame = state.renderer.xr.getFrame();
          const referenceSpace = state.renderer.xr.getReferenceSpace();
          if (frame && referenceSpace && source.gripSpace) {
            const gripPose = frame.getPose(source.gripSpace, referenceSpace);
            if (gripPose) {
              const controllerPos = new THREE.Vector3().setFromMatrixPosition(
                new THREE.Matrix4().fromArray(gripPose.transform.matrix)
              );

              state.setIsAutoReturning(true);
              state.setAutoReturnPhase('horizontal');
              state.autoReturnTarget.copy(controllerPos);
              state.setAutoReturnSpeed(state.maxSpeed * 1.5);
              createAutoReturnText();
              createAutoReturnRightControllerText();
              updateInfo('自動帰還モード開始 - 水平移動中');
              console.log('自動帰還開始:', state.autoReturnTarget, 'speed:', state.autoReturnSpeed);
            }
          }
        } else {
          state.setIsAutoReturning(false);
          state.setAutoReturnPhase('horizontal');
          removeAutoReturnText();
          updateInfo('自動帰還モードをキャンセル');
          console.log('自動帰還キャンセル');
        }
      }

      state.setRightBButtonPressed(isBPressed);

      // 右スティック押し込みでHUDモードトグル
      const rightStickButton = buttons[3];
      const isRightStickPressed = rightStickButton && rightStickButton.pressed;

      if (isRightStickPressed && !state.rightAButtonPressed) {
        state.setIsHUDMode(!state.isHUDMode);

        if (state.isHUDMode) {
          createHUDModeText();
          createDirectionArrow();
          createSpeedText();
          createVolumeText(!state.isSoundMuted);
          createCollisionText(state.isCollisionEnabled);
          if (!state.isLeftControllerTracked || !state.isRightControllerTracked) {
            createTrackingLostText();
          }
          updateInfo('HUDモード開始');
          console.log('HUDモード開始');
        } else {
          // HUDモード解除時のクリーンアップ
          if (state.hudModeText) {
            state.scene.remove(state.hudModeText);
            state.hudModeText.geometry.dispose();
            state.hudModeText.material.dispose();
            state.hudModeText.material.map.dispose();
            state.setHudModeText(null);
          }
          if (state.hudDirectionArrow) {
            state.scene.remove(state.hudDirectionArrow);
            state.hudDirectionArrow.geometry.dispose();
            state.hudDirectionArrow.material.dispose();
            state.setHudDirectionArrow(null);
          }
          if (state.hudDroneLocationArrow) {
            state.scene.remove(state.hudDroneLocationArrow);
            state.hudDroneLocationArrow.geometry.dispose();
            state.hudDroneLocationArrow.material.dispose();
            state.setHudDroneLocationArrow(null);
          }
          if (state.speedText) {
            state.scene.remove(state.speedText);
            state.speedText.geometry.dispose();
            state.speedText.material.dispose();
            state.speedText.material.map.dispose();
            state.setSpeedText(null);
          }
          if (state.speedRightControllerText) {
            state.scene.remove(state.speedRightControllerText);
            state.speedRightControllerText.geometry.dispose();
            state.speedRightControllerText.material.dispose();
            state.speedRightControllerText.material.map.dispose();
            state.setSpeedRightControllerText(null);
          }
          if (state.volumeText) {
            state.scene.remove(state.volumeText);
            state.volumeText.geometry.dispose();
            state.volumeText.material.dispose();
            state.volumeText.material.map.dispose();
            state.setVolumeText(null);
          }
          if (state.collisionText) {
            state.scene.remove(state.collisionText);
            state.collisionText.geometry.dispose();
            state.collisionText.material.dispose();
            state.collisionText.material.map.dispose();
            state.setCollisionText(null);
          }
          updateInfo('HUDモード解除');
          console.log('HUDモード解除');
        }
      }

      state.setRightAButtonPressed(isRightStickPressed);

      // Aボタンで当たり判定オンオフ
      const aButton = buttons[4];
      const isAPressed = aButton && aButton.pressed;

      if (isAPressed && !state.rightAButtonPressedForCollision) {
        state.setIsCollisionEnabled(!state.isCollisionEnabled);
        createCollisionText(state.isCollisionEnabled);
        updateInfo(state.isCollisionEnabled ? '当たり判定オン' : '当たり判定オフ');
        console.log(state.isCollisionEnabled ? '当たり判定オン' : '当たり判定オフ');
      }

      state.setRightAButtonPressedForCollision(isAPressed);
    }
  }
}

// 左コントローラーの起動/終了シーケンス処理
export function handleStartupSequence() {
  if (!state.xrSession || !state.droneSound) return;

  const inputSources = state.xrSession.inputSources;

  for (const source of inputSources) {
    if (source.handedness === 'left' && source.gamepad) {
      const buttons = source.gamepad.buttons;

      // Xボタンで起動/終了シーケンス
      const xButton = buttons[5];
      const isXPressed = xButton && xButton.pressed;

      if (isXPressed && !state.leftXButtonPressed && !state.isStartupComplete && !state.isStartingUp && !state.isShuttingDown && state.dronePositioned) {
        // 起動シーケンスを開始
        state.setIsStartingUp(true);
        console.log('起動シーケンス開始');
        updateInfo('Drone Starting...');
        createSequenceStatusText('STARTING UP');

        // ドローン音を低ピッチで再生開始
        if (state.droneSound && state.droneSound.buffer && !state.droneSound.isPlaying) {
          let normalPitch = Math.pow(0.3 / state.currentDroneScale, 0.5);
          normalPitch = Math.max(0.2, Math.min(2.7, normalPitch));
          const startPitch = Math.max(normalPitch / 2.0, 0.2);

          state.droneSound.setVolume(0);
          state.droneSound.setPlaybackRate(startPitch);
          state.droneSound.play();
          console.log('ドローン音開始 - 開始ピッチ:', startPitch.toFixed(2), '目標ピッチ:', normalPitch.toFixed(2));
        }

        // プロペラを2秒かけてフル回転に加速
        const startTime = Date.now();
        const accelerationDuration = 2000;

        let normalPitch = Math.pow(0.3 / state.currentDroneScale, 0.5);
        normalPitch = Math.max(0.2, Math.min(2.7, normalPitch));
        const startPitch = Math.max(normalPitch / 2.0, 0.2);

        const accelerateInterval = setInterval(() => {
          const elapsed = Date.now() - startTime;
          const progress = Math.min(elapsed / accelerationDuration, 1.0);
          state.setPropellerSpeedMultiplier(progress);

          if (state.droneSound && state.droneSound.isPlaying) {
            if (!state.isSoundMuted) {
              state.droneSound.setVolume(0.7 * progress);
            }
            const currentPitch = startPitch + (normalPitch - startPitch) * progress;
            state.droneSound.setPlaybackRate(currentPitch);
          }

          if (progress >= 1.0) {
            clearInterval(accelerateInterval);
            console.log('プロペラ加速完了、音量・ピッチ通常到達');

            setTimeout(() => {
              console.log('=== 上昇準備完了 - 次のフレームで上昇開始 ===');
              state.setLiftStartTime(Date.now());
            }, 500);
          }
        }, 16);
      }

      // 起動完了後：Xボタンで終了シーケンス
      if (isXPressed && !state.leftXButtonPressed && state.isStartupComplete && !state.isShuttingDown) {
        state.setIsShuttingDown(true);
        state.setDescentStartTime(Date.now());
        state.setIsStartupComplete(false);
        console.log('=== 終了シーケンス開始 - 降下を開始 ===');
        updateInfo('Shutting Down...');
        createSequenceStatusText('SHUTTING DOWN');
      }

      state.setLeftXButtonPressed(isXPressed);

      // 起動完了後のみ他のボタンを受け付ける
      if (state.isStartupComplete && !state.isShuttingDown) {
        // Yボタンで音量オンオフ
        const yButton = buttons[4];
        const isYPressed = yButton && yButton.pressed;

        if (isYPressed && !state.leftYButtonPressed) {
          state.setIsSoundMuted(!state.isSoundMuted);

          if (state.isSoundMuted) {
            state.droneSound.setVolume(0);
            console.log('ドローン音声: ミュート');
            updateInfo('ドローン音声: ミュート');
            createVolumeText(false);
          } else {
            updateDroneSoundPitch();
            console.log('ドローン音声: オン');
            updateInfo('ドローン音声: オン');
            createVolumeText(true);
          }
        }

        state.setLeftYButtonPressed(isYPressed);
      }
    }
  }
}

// 両グリップでのサイズ変更処理
export function handleSizeChange() {
  if (!state.xrSession || !state.drone || !state.dronePositioned) return;
  if (state.isGrabbedByController || state.isGrabbedByHand || state.isStartingUp || state.isShuttingDown) return;

  const inputSources = state.xrSession.inputSources;
  let rightGripCurrentlyPressed = false;
  let leftGripCurrentlyPressed = false;
  let rightControllerPos = null;
  let leftControllerPos = null;

  const frame = state.renderer.xr.getFrame();
  const referenceSpace = state.renderer.xr.getReferenceSpace();
  if (frame && referenceSpace) {
    for (const source of inputSources) {
      if (source.gamepad && source.gripSpace) {
        const buttons = source.gamepad.buttons;
        const gripButton = buttons[1];
        const isGripPressed = gripButton && gripButton.pressed;

        const gripPose = frame.getPose(source.gripSpace, referenceSpace);
        if (gripPose) {
          const controllerPos = new THREE.Vector3().setFromMatrixPosition(new THREE.Matrix4().fromArray(gripPose.transform.matrix));

          if (source.handedness === 'right') {
            rightGripCurrentlyPressed = isGripPressed;
            rightControllerPos = controllerPos;
          } else if (source.handedness === 'left') {
            leftGripCurrentlyPressed = isGripPressed;
            leftControllerPos = controllerPos;
          }
        }
      }
    }
  }

  if (rightGripCurrentlyPressed && leftGripCurrentlyPressed && rightControllerPos && leftControllerPos) {
    if (!state.bothGripsPressed) {
      state.setBothGripsPressed(true);
      state.setInitialControllerDistance(rightControllerPos.distanceTo(leftControllerPos));
      state.setInitialDroneScale(state.currentDroneScale);
      updateInfo('サイズ変更モード開始 (初期距離: ' + (state.initialControllerDistance * 100).toFixed(1) + 'cm)');
      console.log('サイズ変更モード開始:', state.initialControllerDistance, 'スケール:', state.initialDroneScale);
    } else {
      const currentDistance = rightControllerPos.distanceTo(leftControllerPos);
      const scaleRatio = currentDistance / state.initialControllerDistance;
      const newScale = state.initialDroneScale * scaleRatio;
      updateDroneScale(newScale);
    }
  } else {
    if (state.bothGripsPressed) {
      state.setBothGripsPressed(false);
      updateInfo('サイズ変更モード終了 (最終スケール: ' + state.currentDroneScale.toFixed(2) + ')');
      console.log('サイズ変更モード終了');
    }
  }
}

// コントローラーでドローンを掴む処理
export function handleControllerGrab() {
  if (!state.xrSession || !state.drone || !state.dronePositioned) return;
  if (state.isGrabbedByHand || state.bothGripsPressed || state.isStartingUp || state.isShuttingDown) return;

  const inputSources = state.xrSession.inputSources;

  for (const source of inputSources) {
    if (source.gamepad && source.gripSpace) {
      const gp = source.gamepad;
      const buttons = gp.buttons;
      const gripButton = buttons[1];
      const isGripPressed = gripButton && gripButton.pressed;

      // 右コントローラーのグリップ
      if (source.handedness === 'right') {
        if (isGripPressed && !state.rightGripPressed && source.gripSpace) {
          const dronePos = new THREE.Vector3();
          state.drone.getWorldPosition(dronePos);

          const frame = state.renderer.xr.getFrame();
          const referenceSpace = state.renderer.xr.getReferenceSpace();
          if (frame && referenceSpace) {
            const gripPose = frame.getPose(source.gripSpace, referenceSpace);
            if (gripPose) {
              const controllerPos = new THREE.Vector3().setFromMatrixPosition(new THREE.Matrix4().fromArray(gripPose.transform.matrix));

              const distance = dronePos.distanceTo(controllerPos);
              if (distance < 0.08) {
                state.setIsGrabbedByController(true);
                state.setGrabbingInputSource(source);

                state.smoothedControllerPosition.copy(controllerPos);

                const controllerQuat = new THREE.Quaternion().setFromRotationMatrix(new THREE.Matrix4().fromArray(gripPose.transform.matrix));
                state.smoothedControllerRotation.copy(controllerQuat);

                state.grabOffset.copy(dronePos).sub(state.smoothedControllerPosition);

                const droneQuat = new THREE.Quaternion();
                state.drone.getWorldQuaternion(droneQuat);
                state.grabRotationOffset.copy(state.smoothedControllerRotation).invert().multiply(droneQuat);

                updateInfo('右コントローラーでドローンを掴んだ (距離: ' + (distance * 100).toFixed(1) + 'cm)');
                console.log('右コントローラーでドローンを掴んだ');
              }
            }
          }
        } else if (!isGripPressed && state.rightGripPressed && state.isGrabbedByController && state.grabbingInputSource === source) {
          handleControllerRelease();
        }
        state.setRightGripPressed(isGripPressed);
      }

      // 左コントローラーのグリップ
      if (source.handedness === 'left') {
        if (isGripPressed && !state.leftGripPressed && source.gripSpace) {
          const dronePos = new THREE.Vector3();
          state.drone.getWorldPosition(dronePos);

          const frame = state.renderer.xr.getFrame();
          const referenceSpace = state.renderer.xr.getReferenceSpace();
          if (frame && referenceSpace) {
            const gripPose = frame.getPose(source.gripSpace, referenceSpace);
            if (gripPose) {
              const controllerPos = new THREE.Vector3().setFromMatrixPosition(new THREE.Matrix4().fromArray(gripPose.transform.matrix));

              const distance = dronePos.distanceTo(controllerPos);
              if (distance < 0.08) {
                state.setIsGrabbedByController(true);
                state.setGrabbingInputSource(source);

                state.smoothedControllerPosition.copy(controllerPos);

                const controllerQuat = new THREE.Quaternion().setFromRotationMatrix(new THREE.Matrix4().fromArray(gripPose.transform.matrix));
                state.smoothedControllerRotation.copy(controllerQuat);

                state.grabOffset.copy(dronePos).sub(state.smoothedControllerPosition);

                const droneQuat = new THREE.Quaternion();
                state.drone.getWorldQuaternion(droneQuat);
                state.grabRotationOffset.copy(state.smoothedControllerRotation).invert().multiply(droneQuat);

                updateInfo('左コントローラーでドローンを掴んだ (距離: ' + (distance * 100).toFixed(1) + 'cm)');
                console.log('左コントローラーでドローンを掴んだ');
              }
            }
          }
        } else if (!isGripPressed && state.leftGripPressed && state.isGrabbedByController && state.grabbingInputSource === source) {
          handleControllerRelease();
        }
        state.setLeftGripPressed(isGripPressed);
      }
    }
  }

  // コントローラーで掴んでいる場合、ドローンをコントローラーに追従させる
  if (state.isGrabbedByController && state.grabbingInputSource && state.grabbingInputSource.gripSpace) {
    const frame = state.renderer.xr.getFrame();
    const referenceSpace = state.renderer.xr.getReferenceSpace();
    if (frame && referenceSpace) {
      const gripPose = frame.getPose(state.grabbingInputSource.gripSpace, referenceSpace);
      if (gripPose) {
        const controllerPos = new THREE.Vector3().setFromMatrixPosition(new THREE.Matrix4().fromArray(gripPose.transform.matrix));

        state.smoothedControllerPosition.lerp(controllerPos, state.controllerSmoothingFactor);

        const newPos = state.smoothedControllerPosition.clone().add(state.grabOffset);
        state.drone.position.copy(newPos);
        if (state.drone.userData.basePosition) {
          state.drone.userData.basePosition.copy(newPos);
        }

        const controllerQuat = new THREE.Quaternion().setFromRotationMatrix(new THREE.Matrix4().fromArray(gripPose.transform.matrix));
        state.smoothedControllerRotation.slerp(controllerQuat, state.controllerSmoothingFactor);

        const targetQuat = state.smoothedControllerRotation.clone().multiply(state.grabRotationOffset);
        state.drone.quaternion.copy(targetQuat);

        state.velocity.set(0, 0, 0);
        state.setAngularVelocity(0);
      }
    }
  }
}

// コントローラーを離した時の処理
function handleControllerRelease() {
  const dt = 0.016;
  const releaseVelocity = state.drone.position.clone().sub(state.dronePreviousPosition).divideScalar(dt);

  state.setIsGrabbedByController(false);
  state.setGrabbingInputSource(null);

  if (state.isStartupComplete) {
    state.setIsReturningToHover(true);
    state.setReturnProgress(0);
    state.returnStartPosition.copy(state.drone.position);
    state.returnStartRotation.copy(state.drone.quaternion);
    state.returnTargetRotation.setFromAxisAngle(new THREE.Vector3(0, 1, 0), state.drone.rotation.y);
    updateInfo('ドローンを離した - ホバー位置に戻ります');
    console.log('ドローンを離した');
  } else {
    state.dronePhysicsVelocity.copy(releaseVelocity);
    state.droneAngularVelocity.set(
      (Math.random() - 0.5) * 3,
      (Math.random() - 0.5) * 3,
      (Math.random() - 0.5) * 3
    );
    updateInfo('ドローンを離した');
    console.log('ドローンを離した - 速度:', releaseVelocity.length().toFixed(2), 'm/s');
  }
}

// ハンドトラッキングでドローンを掴む処理
export function handleHandGrab() {
  if (!state.xrSession || !state.drone || !state.dronePositioned) return;
  if (state.isGrabbedByController || state.bothGripsPressed || state.isStartingUp || state.isShuttingDown) return;

  const frame = state.renderer.xr.getFrame();
  if (!frame) return;

  const hands = [state.hand1, state.hand2];

  for (let i = 0; i < hands.length; i++) {
    const hand = hands[i];
    if (!hand) continue;

    const indexTip = hand.joints['index-finger-tip'];
    const thumbTip = hand.joints['thumb-tip'];

    if (indexTip && thumbTip) {
      const indexPos = new THREE.Vector3();
      const thumbPos = new THREE.Vector3();
      indexTip.getWorldPosition(indexPos);
      thumbTip.getWorldPosition(thumbPos);

      const pinchDistance = indexPos.distanceTo(thumbPos);
      const isPinching = pinchDistance < 0.025;

      const dronePos = new THREE.Vector3();
      state.drone.getWorldPosition(dronePos);

      const handCenter = new THREE.Vector3().addVectors(indexPos, thumbPos).multiplyScalar(0.5);
      const distanceToDrone = handCenter.distanceTo(dronePos);

      if (isPinching && !state.isGrabbedByHand && distanceToDrone < 0.08) {
        state.setIsGrabbedByHand(true);
        state.setGrabbingHand(hand);

        state.grabOffset.copy(dronePos).sub(handCenter);
        state.smoothedHandPosition.copy(handCenter);

        const wrist = hand.joints['wrist'];
        if (wrist) {
          const wristQuat = new THREE.Quaternion();
          wrist.getWorldQuaternion(wristQuat);
          const droneQuat = new THREE.Quaternion();
          state.drone.getWorldQuaternion(droneQuat);
          state.grabRotationOffset.copy(wristQuat).invert().multiply(droneQuat);
          state.smoothedHandRotation.copy(wristQuat);
        } else {
          const handQuat = new THREE.Quaternion();
          hand.getWorldQuaternion(handQuat);
          const droneQuat = new THREE.Quaternion();
          state.drone.getWorldQuaternion(droneQuat);
          state.grabRotationOffset.copy(handQuat).invert().multiply(droneQuat);
          state.smoothedHandRotation.copy(handQuat);
        }

        updateInfo('手でドローンを掴んだ (距離: ' + (distanceToDrone * 100).toFixed(1) + 'cm)');
        console.log('手でドローンを掴んだ 距離:', distanceToDrone);
      } else if (!isPinching && state.isGrabbedByHand && state.grabbingHand === hand) {
        handleHandRelease();
      }

      // 掴んでいる場合、ドローンを手に追従させる
      if (state.isGrabbedByHand && state.grabbingHand === hand) {
        indexTip.getWorldPosition(indexPos);
        thumbTip.getWorldPosition(thumbPos);
        handCenter.addVectors(indexPos, thumbPos).multiplyScalar(0.5);

        state.smoothedHandPosition.lerp(handCenter, state.handSmoothingFactor);

        const newPos = state.smoothedHandPosition.clone().add(state.grabOffset);
        state.drone.position.copy(newPos);
        if (state.drone.userData.basePosition) {
          state.drone.userData.basePosition.copy(newPos);
        }

        const wrist = hand.joints['wrist'];
        if (wrist) {
          const wristQuat = new THREE.Quaternion();
          wrist.getWorldQuaternion(wristQuat);
          state.smoothedHandRotation.slerp(wristQuat, state.handSmoothingFactor);
          const targetQuat = state.smoothedHandRotation.clone().multiply(state.grabRotationOffset);
          state.drone.quaternion.copy(targetQuat);
        } else {
          const handQuat = new THREE.Quaternion();
          hand.getWorldQuaternion(handQuat);
          state.smoothedHandRotation.slerp(handQuat, state.handSmoothingFactor);
          const targetQuat = state.smoothedHandRotation.clone().multiply(state.grabRotationOffset);
          state.drone.quaternion.copy(targetQuat);
        }

        state.velocity.set(0, 0, 0);
        state.setAngularVelocity(0);
      }
    }
  }
}

// 手を離した時の処理
function handleHandRelease() {
  const dt = 0.016;
  const releaseVelocity = state.drone.position.clone().sub(state.dronePreviousPosition).divideScalar(dt);

  state.setIsGrabbedByHand(false);
  state.setGrabbingHand(null);

  if (state.isStartupComplete) {
    state.setIsReturningToHover(true);
    state.setReturnProgress(0);
    state.returnStartPosition.copy(state.drone.position);
    state.returnStartRotation.copy(state.drone.quaternion);
    state.returnTargetRotation.setFromAxisAngle(new THREE.Vector3(0, 1, 0), state.drone.rotation.y);
    updateInfo('ドローンを離した - ホバー位置に戻ります');
    console.log('手を離した');
  } else {
    state.dronePhysicsVelocity.copy(releaseVelocity);
    state.droneAngularVelocity.set(
      (Math.random() - 0.5) * 3,
      (Math.random() - 0.5) * 3,
      (Math.random() - 0.5) * 3
    );
    updateInfo('ドローンを離した');
    console.log('手を離した - 速度:', releaseVelocity.length().toFixed(2), 'm/s');
  }
}
