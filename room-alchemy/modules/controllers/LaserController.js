import * as THREE from 'three';

// レーザーポインター用変数
let rightLaser = null;
let leftLaser = null;
let laserShowTime = { left: 0, right: 0 };
let wasTriggerPressed = { left: false, right: false };
const LASER_DISPLAY_DURATION = 10000; // 10秒

// レーザーポインターを作成
export function createLaser() {
  const geometry = new THREE.BufferGeometry().setFromPoints([
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(0, 0, -3)
  ]);
  const material = new THREE.LineBasicMaterial({
    color: 0x00ffff,
    linewidth: 2,
    transparent: true,
    opacity: 0.8
  });
  const laser = new THREE.Line(geometry, material);
  laser.visible = false; // 初期状態は非表示
  return laser;
}

// トリガーボタンの状態を取得
export function isTriggerPressed(inputSource) {
  if (!inputSource || !inputSource.gamepad) return false;

  const buttons = inputSource.gamepad.buttons;
  // トリガーはbuttons[0]
  if (buttons && buttons.length > 0) {
    return buttons[0].pressed || buttons[0].value > 0.5;
  }
  return false;
}

// レーザーの表示状態を更新
export function updateLaserVisibility(xrSession) {
  if (!xrSession) return;

  const inputSources = xrSession.inputSources;
  if (!inputSources) return;

  const now = Date.now();

  for (const inputSource of inputSources) {
    if (inputSource.targetRayMode !== 'tracked-pointer') continue;

    const triggerPressed = isTriggerPressed(inputSource);
    const handedness = inputSource.handedness;
    if (!handedness) continue;

    // トリガーを押した瞬間にタイマーをセット
    if (triggerPressed && !wasTriggerPressed[handedness]) {
      laserShowTime[handedness] = now;
    }
    wasTriggerPressed[handedness] = triggerPressed;
  }

  // 5秒以内なら表示
  // 左右逆に修正（コントローラーの割り当てが逆のため）
  if (leftLaser) {
    leftLaser.visible = (now - laserShowTime.right) < LASER_DISPLAY_DURATION;
  }
  if (rightLaser) {
    rightLaser.visible = (now - laserShowTime.left) < LASER_DISPLAY_DURATION;
  }
}

// レーザーを設定
export function setLasers(left, right) {
  leftLaser = left;
  rightLaser = right;
}

// レーザーを取得
export function getLasers() {
  return { leftLaser, rightLaser };
}

// どちらかのレーザーが表示されているか
export function isAnyLaserVisible() {
  return (leftLaser && leftLaser.visible) || (rightLaser && rightLaser.visible);
}

// 指定したコントローラーのレーザーが表示されているか
export function isLaserVisibleForController(controller) {
  if (!controller) return false;
  // コントローラーの子要素にレーザーがあるかチェック
  let laserVisible = false;
  controller.traverse((child) => {
    if (child.isLine && child.visible) {
      laserVisible = true;
    }
  });
  return laserVisible;
}

// inputSourceのhandednessでレーザーが表示されているか判定
export function isLaserVisibleForHandedness(handedness) {
  if (!handedness) return false;
  // 左右逆（コントローラーの割り当てが逆のため）
  if (handedness === 'left') {
    return rightLaser && rightLaser.visible;
  } else if (handedness === 'right') {
    return leftLaser && leftLaser.visible;
  }
  return false;
}
