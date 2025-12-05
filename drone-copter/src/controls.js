import * as THREE from 'three';
import * as state from './state.js';
import { updateInfo } from './utils.js';
import { updateDroneScale, updateMaxSpeed } from './drone.js';
import { updateDroneSoundPitch, playButtonSound, playCursorSound } from './sound.js';
import {
  createAutoReturnText, createAutoReturnRightControllerText, removeAutoReturnText,
  createSpeedText, createVolumeText, createCollisionText, createTrackingLostText,
  createSequenceStatusText, removeSequenceStatusText, toggleControllerGuideMenu,
  toggleSettingsMenu, removeWelcomeWindow, createTutorial2Window, removeTutorial2Window,
  createTutorial3Window, removeTutorial3Window, removeTutorial4Window, t
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
  // 設定メニュー表示中は無効（レーザー操作用にトリガーを使うため）
  if (state.isSettingsMenuVisible) return;

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
          playButtonSound();
        } else {
          createSpeedText();
          updateInfo(`速度レベル: ${state.speedLevel} (最小)`);
          playButtonSound();
        }
        state.setLeftTriggerPressed(true);
      } else if (source.handedness === 'left' && !isTriggerPressed) {
        state.setLeftTriggerPressed(false);
      }

      if (source.handedness === 'right' && isTriggerPressed && !state.rightTriggerPressed) {
        if (state.speedLevel < 30) {
          state.setSpeedLevel(state.speedLevel + 1);
          updateMaxSpeed();
          createSpeedText();
          updateInfo(`速度レベル: ${state.speedLevel}`);
          playButtonSound();
        } else {
          createSpeedText();
          updateInfo(`速度レベル: ${state.speedLevel} (最大)`);
          playButtonSound();
        }
        state.setRightTriggerPressed(true);
      } else if (source.handedness === 'right' && !isTriggerPressed) {
        state.setRightTriggerPressed(false);
      }
    }
  }
}

// 右コントローラーのボタン処理（自動帰還、音量オンオフ、コントローラーガイド）
export function handleRightControllerButtons() {
  if (!state.xrSession || !state.drone || !state.dronePositioned) return;

  // コントローラーガイドは常に利用可能（開始シーケンス前でも）
  const inputSources = state.xrSession.inputSources;
  for (const source of inputSources) {
    if (source.handedness === 'right' && source.gamepad) {
      const buttons = source.gamepad.buttons;

      // Aボタンでコントローラーガイドメニュー（常に利用可能）
      // チュートリアル中は段階的に進む: 1→2→ガイド→3→完了
      const aButton = buttons[4];
      const isAPressed = aButton && aButton.pressed;

      if (isAPressed && !state.rightAButtonPressedForGuide && !state.rightAButtonPressedForWelcome) {
        if (state.isWelcomeWindowVisible && state.tutorialStep === 1) {
          // チュートリアル1を閉じてチュートリアル2を開く
          removeWelcomeWindow();
          state.setTutorialStep(2);
          // 少し遅延してチュートリアル2を表示
          setTimeout(() => {
            createTutorial2Window();
          }, 300);
          console.log('チュートリアル1を閉じ、チュートリアル2を表示');
          state.setRightAButtonPressedForWelcome(true);
        } else if (state.isTutorial2Visible && state.tutorialStep === 2) {
          // チュートリアル2を閉じてコントローラーガイドを開く
          removeTutorial2Window();
          state.setTutorialStep(3); // 次はチュートリアル3（ガイドを閉じた後）
          // 少し遅延してコントローラーガイドを表示
          setTimeout(() => {
            toggleControllerGuideMenu();
          }, 300);
          console.log('チュートリアル2を閉じ、コントローラーガイドを表示');
          state.setRightAButtonPressedForWelcome(true);
        } else if (state.isControllerGuideVisible && state.tutorialStep === 3) {
          // チュートリアル中にコントローラーガイドを閉じる→チュートリアル3を表示
          toggleControllerGuideMenu();
          // 少し遅延してチュートリアル3を表示
          setTimeout(() => {
            createTutorial3Window();
          }, 300);
          console.log('コントローラーガイドを閉じ、チュートリアル3を表示');
          state.setRightAButtonPressedForWelcome(true);
        } else if (!state.isWelcomeWindowVisible && !state.isTutorial2Visible && !state.isTutorial3Visible) {
          toggleControllerGuideMenu();
          console.log('コントローラーガイドメニュー:', state.isControllerGuideVisible ? '表示' : '非表示');
        }
      }

      if (!isAPressed) {
        state.setRightAButtonPressedForWelcome(false);
      }
      state.setRightAButtonPressedForGuide(isAPressed);
    }
  }

  // 以下は起動完了後のみ
  if (!state.isStartupComplete || state.isGrabbedByController || state.isGrabbedByHand || state.bothGripsPressed) return;

  for (const source of inputSources) {
    if (source.handedness === 'right' && source.gamepad) {
      const buttons = source.gamepad.buttons;

      // Bボタンで自動帰還（FPVモード中は無効）
      const bButton = buttons[5];
      const isBPressed = bButton && bButton.pressed;

      if (isBPressed && !state.rightBButtonPressed) {
        if (state.isFpvMode) {
          // FPVモード中は自動帰還を使用不可
          updateInfo('FPVモード中は自動帰還を使用できません');
          playButtonSound();
        } else if (!state.isAutoReturning) {
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
              playButtonSound();
            }
          }
        } else {
          state.setIsAutoReturning(false);
          state.setAutoReturnPhase('horizontal');
          removeAutoReturnText();
          updateInfo('自動帰還モードをキャンセル');
          console.log('自動帰還キャンセル');
          playButtonSound();
        }
      }

      state.setRightBButtonPressed(isBPressed);

      // 右スティック押し込みで音量オンオフ
      const rightStickButton = buttons[3];
      const isRightStickPressed = rightStickButton && rightStickButton.pressed;

      if (isRightStickPressed && !state.rightStickButtonPressed) {
        state.setIsSoundMuted(!state.isSoundMuted);

        if (state.isSoundMuted) {
          if (state.droneSound) state.droneSound.setVolume(0);
          console.log('ドローン音声: ミュート');
          updateInfo('ドローン音声: ミュート');
          createVolumeText(false);
        } else {
          updateDroneSoundPitch();
          console.log('ドローン音声: オン');
          updateInfo('ドローン音声: オン');
          createVolumeText(true);
        }
        playButtonSound();
      }

      state.setRightStickButtonPressed(isRightStickPressed);
    }
  }
}

// 左コントローラーの設定メニュー処理
export function handleLeftControllerButtons() {
  if (!state.xrSession || !state.drone || !state.dronePositioned) return;

  // 設定メニューは常に利用可能（開始シーケンス前でも）
  const inputSources = state.xrSession.inputSources;
  for (const source of inputSources) {
    if (source.handedness === 'left' && source.gamepad) {
      const buttons = source.gamepad.buttons;

      // Xボタン(buttons[4])の処理
      const xButton = buttons[4];
      const isXPressed = xButton && xButton.pressed;

      if (isXPressed && !state.leftXButtonPressedForTutorial3) {
        if (state.isTutorial3Visible && state.tutorialStep === 3) {
          // チュートリアル3を閉じて設定ウィンドウを開く
          removeTutorial3Window();
          state.setTutorialStep(4); // チュートリアル4へ（設定ウィンドウを閉じた後に表示）
          // 少し遅延して設定メニューを表示
          setTimeout(() => {
            toggleSettingsMenu();
          }, 300);
          console.log('チュートリアル3を閉じ、設定ウィンドウを表示');
          state.setLeftXButtonPressedForTutorial3(true);
        } else if (state.isSettingsMenuVisible && state.tutorialStep === 4) {
          // チュートリアル中に設定ウィンドウを閉じる（チュートリアル4表示へ）
          toggleSettingsMenu();
          console.log('設定ウィンドウを閉じる（チュートリアル4へ）');
          state.setLeftXButtonPressedForTutorial3(true);
        } else if (!state.isTutorial3Visible && state.tutorialStep !== 4) {
          // 通常時：設定メニューをトグル
          toggleSettingsMenu();
          console.log('設定メニュー:', state.isSettingsMenuVisible ? '表示' : '非表示');
          state.setLeftXButtonPressedForTutorial3(true);
        }
      }
      if (!isXPressed) {
        state.setLeftXButtonPressedForTutorial3(false);
      }
    }
  }
}

// 左コントローラーの起動/終了シーケンス処理
export function handleStartupSequence() {
  if (!state.xrSession || !state.droneSound) return;

  // チュートリアル1-3の間は起動/終了を無効に（設定ウィンドウが開いている場合も含む）
  if (state.isWelcomeWindowVisible || state.isTutorial2Visible || state.isTutorial3Visible) return;
  if (state.tutorialStep >= 1 && state.tutorialStep <= 3) return;
  if (state.tutorialStep === 4 && state.isSettingsMenuVisible) return;

  // チュートリアル4表示中にYボタン(buttons[5])を押したら、チュートリアル4を閉じてから起動
  if (state.isTutorial4Visible && state.tutorialStep === 4) {
    const inputSources = state.xrSession.inputSources;
    for (const source of inputSources) {
      if (source.handedness === 'left' && source.gamepad) {
        const buttons = source.gamepad.buttons;
        const yButton = buttons[5]; // 起動ボタン
        const isYPressed = yButton && yButton.pressed;
        if (isYPressed && !state.leftXButtonPressed) {
          removeTutorial4Window();
          state.setTutorialStep(0); // チュートリアル完了
          state.setTutorialCompleted(true);
          localStorage.setItem('tutorialCompleted', 'true');
          console.log('チュートリアル4を閉じ、チュートリアル完了');
          // 起動シーケンスは次のフレームで実行されるようにreturn
        }
      }
    }
    return;
  }

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
        state.setHasLanded(false);
        console.log('起動シーケンス開始');
        updateInfo('Drone Starting...');
        createSequenceStatusText(t('status', 'startingUp'));
        playButtonSound();

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
        createSequenceStatusText(t('status', 'shuttingDown'));
        playButtonSound();
      }

      state.setLeftXButtonPressed(isXPressed);

      // 起動完了後のみ他のボタンを受け付ける
      if (state.isStartupComplete && !state.isShuttingDown) {
        // 左スティック押し込みで当たり判定オンオフ
        const leftStickButton = buttons[3];
        const isLeftStickPressed = leftStickButton && leftStickButton.pressed;

        if (isLeftStickPressed && !state.leftStickButtonPressed) {
          state.setIsCollisionEnabled(!state.isCollisionEnabled);
          createCollisionText(state.isCollisionEnabled);
          updateInfo(state.isCollisionEnabled ? '当たり判定オン' : '当たり判定オフ');
          console.log(state.isCollisionEnabled ? '当たり判定オン' : '当たり判定オフ');
          playButtonSound();
        }

        state.setLeftStickButtonPressed(isLeftStickPressed);
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
                state.setHasLanded(false);

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
                state.setHasLanded(false);

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
        state.setHasLanded(false);

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
