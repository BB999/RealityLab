import * as THREE from 'three';

// スティックの値を取得 (x: 左右, y: 上下)
export function getStickValues(inputSource) {
  if (!inputSource || !inputSource.gamepad) return { x: 0, y: 0 };

  const axes = inputSource.gamepad.axes;
  // axes[2]: X軸 (左右), axes[3]: Y軸 (上下)
  if (axes && axes.length >= 4) {
    return { x: axes[2], y: axes[3] };
  }
  return { x: 0, y: 0 };
}

// スティック押し込みの状態を取得
export function isStickPressed(inputSource) {
  if (!inputSource || !inputSource.gamepad) return false;

  const buttons = inputSource.gamepad.buttons;
  // buttons[3]: スティック押し込み
  if (buttons && buttons.length > 3) {
    return buttons[3].pressed;
  }
  return false;
}

// グリップボタンの状態を取得
let gripLogged = false;
export function isGripPressed(inputSource) {
  if (!inputSource || !inputSource.gamepad) return false;

  const gamepad = inputSource.gamepad;
  const buttons = gamepad.buttons;

  // デバッグ用：ボタンの状態をログ出力（初回のみ）
  if (!gripLogged) {
    console.log('Gamepad buttons:', buttons.length);
    for (let i = 0; i < buttons.length; i++) {
      console.log(`Button ${i}: pressed=${buttons[i].pressed}, value=${buttons[i].value}`);
    }
    gripLogged = true;
  }

  // Meta Quest: グリップはbuttons[1]
  // 他のコントローラー: buttons[2]の場合もある
  if (buttons && buttons.length > 1) {
    // buttons[1]がグリップ（Squeeze）
    return buttons[1].pressed || buttons[1].value > 0.5;
  }
  return false;
}

// 手を握る位置の基準になる space。
// gripSpace はハンドトラッキングでは提供されないことがあるので手首で代用する
export function getGripSpace(inputSource) {
  if (!inputSource) return null;
  if (inputSource.gripSpace) return inputSource.gripSpace;
  if (inputSource.hand) return inputSource.hand.get('wrist') || null;
  return null;
}

// inputSourceからグリップの位置を取得
export function getGripPosition(inputSource, frame, referenceSpace) {
  const space = getGripSpace(inputSource);
  if (!space || !frame || !referenceSpace) return null;

  const gripPose = frame.getPose(space, referenceSpace);
  if (gripPose) {
    return new THREE.Vector3(
      gripPose.transform.position.x,
      gripPose.transform.position.y,
      gripPose.transform.position.z
    );
  }
  return null;
}

// inputSourceからグリップの回転を取得
export function getGripQuaternion(inputSource, frame, referenceSpace) {
  const space = getGripSpace(inputSource);
  if (!space || !frame || !referenceSpace) return null;

  const gripPose = frame.getPose(space, referenceSpace);
  if (gripPose) {
    return new THREE.Quaternion(
      gripPose.transform.orientation.x,
      gripPose.transform.orientation.y,
      gripPose.transform.orientation.z,
      gripPose.transform.orientation.w
    );
  }
  return null;
}

// コントローラーの位置を取得
export function getControllerPosition(controller) {
  if (!controller) return null;
  const position = new THREE.Vector3();
  controller.getWorldPosition(position);
  return position;
}

// 手の回転差分からオブジェクトの回転を計算
export function applyGripRotation(targetQuaternion, currentGripQuat, initialGripQuaternion, initialModuleQuaternion) {
  // グリップの回転差分を計算（ワールド座標系）
  // deltaRotation = currentGrip * inverse(initialGrip)
  const invInitialGrip = initialGripQuaternion.clone().invert();
  const deltaRotation = currentGripQuat.clone().multiply(invInitialGrip);

  // オブジェクトに回転差分を適用（ワールド座標系で回転）
  // newRotation = deltaRotation * initialModuleRotation
  targetQuaternion.copy(deltaRotation.multiply(initialModuleQuaternion));
}
