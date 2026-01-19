import * as THREE from 'three';

// グラブ用変数
let isGrabbing = false;
let grabbedObject = null; // 現在掴んでいるオブジェクト
let grabOffset = new THREE.Vector3();
let grabQuaternionOffset = new THREE.Quaternion();

// グラブ可能なオブジェクトのリスト
let grabbableObjects = [];

// タイヤ回転用変数
let isWheelSpinning = false;
let aButtonPreviouslyPressed = false;
let bButtonPreviouslyPressed = false;
let yButtonPreviouslyPressed = false;
let xButtonPreviouslyPressed = false;
let wheelSpeed = 0; // 現在の回転速度

// リセットコールバック
let resetCallback = null;
// スポーンコールバック（Xボタン）
let spawnCallback = null;
const wheelMaxSpeed = 0.8; // 最大回転速度
const wheelAcceleration = 0.02; // 加速度
const wheelDeceleration = 0.005; // 減速度（慣性）

// グラブ可能なオブジェクトを追加
export function addGrabbableObject(object) {
  if (!grabbableObjects.includes(object)) {
    grabbableObjects.push(object);
    console.log('グラブ可能オブジェクト追加 (合計:', grabbableObjects.length, '個)');
  }
}

// グラブ可能なオブジェクトを削除
export function removeGrabbableObject(object) {
  const index = grabbableObjects.indexOf(object);
  if (index > -1) {
    grabbableObjects.splice(index, 1);
  }
}

// グラブ開始
export function onSelectStart(mini4car, rightController) {
  const controllerPosition = new THREE.Vector3();
  const controllerQuaternion = new THREE.Quaternion();
  rightController.getWorldPosition(controllerPosition);
  rightController.getWorldQuaternion(controllerQuaternion);

  // 最も近いオブジェクトを探す
  let closestObject = null;
  let closestDistance = 0.5; // 最大距離0.5m

  // 全てのグラブ可能オブジェクトをチェック
  for (const obj of grabbableObjects) {
    if (!obj) continue;
    const objPosition = new THREE.Vector3();
    obj.getWorldPosition(objPosition);
    const distance = controllerPosition.distanceTo(objPosition);
    if (distance < closestDistance) {
      closestDistance = distance;
      closestObject = obj;
    }
  }

  if (closestObject) {
    isGrabbing = true;
    grabbedObject = closestObject;

    const objPosition = new THREE.Vector3();
    closestObject.getWorldPosition(objPosition);

    // 位置オフセットを保存（コントローラーのローカル座標系で）
    const inverseControllerQuat = controllerQuaternion.clone().invert();
    grabOffset.copy(objPosition).sub(controllerPosition).applyQuaternion(inverseControllerQuat);

    // 回転オフセットを保存
    grabQuaternionOffset.copy(inverseControllerQuat).multiply(closestObject.quaternion);

    console.log('オブジェクトを掴みました');
  }
}

// グラブ終了
export function onSelectEnd() {
  if (isGrabbing) {
    isGrabbing = false;
    grabbedObject = null;
    console.log('オブジェクトを離しました');
  }
}

// グラブ状態を取得
export function getGrabbingState() {
  return isGrabbing;
}

// 掴んでいるオブジェクトを取得
export function getGrabbedObject() {
  return grabbedObject;
}

// グラブ中の位置・回転更新
export function updateGrabPosition(mini4car, rightController) {
  if (!isGrabbing || !grabbedObject || !rightController) return;

  const controllerPosition = new THREE.Vector3();
  const controllerQuaternion = new THREE.Quaternion();
  rightController.getWorldPosition(controllerPosition);
  rightController.getWorldQuaternion(controllerQuaternion);

  // 位置を更新
  const rotatedOffset = grabOffset.clone().applyQuaternion(controllerQuaternion);
  grabbedObject.position.copy(controllerPosition).add(rotatedOffset);

  // 回転を更新
  grabbedObject.quaternion.copy(controllerQuaternion).multiply(grabQuaternionOffset);
}

// Aボタン（buttons[4]）とBボタン（buttons[5]）の状態をチェック
export function checkControllerButtons(renderer, moveCarCallback) {
  const session = renderer.xr.getSession();
  if (!session) return;

  for (const source of session.inputSources) {
    if (source.gamepad && source.handedness === 'right') {
      // Aボタン - タイヤ回転切り替え
      const aButton = source.gamepad.buttons[4];
      if (aButton && aButton.pressed && !aButtonPreviouslyPressed) {
        isWheelSpinning = !isWheelSpinning;
        console.log('タイヤ回転:', isWheelSpinning ? 'ON' : 'OFF');
      }
      aButtonPreviouslyPressed = aButton ? aButton.pressed : false;

      // Bボタン - ミニ四駆を右コントローラーの前に移動
      const bButton = source.gamepad.buttons[5];
      if (bButton && bButton.pressed && !bButtonPreviouslyPressed) {
        if (moveCarCallback) {
          moveCarCallback();
        }
        console.log('ミニ四駆をコントローラーの前に移動');
      }
      bButtonPreviouslyPressed = bButton ? bButton.pressed : false;
    }

    // 左コントローラーのボタン
    if (source.gamepad && source.handedness === 'left') {
      // Xボタン - オブジェクトをスポーン
      const xButton = source.gamepad.buttons[4]; // Xボタン
      if (xButton && xButton.pressed && !xButtonPreviouslyPressed) {
        console.log('Xボタン押下検出');
        if (spawnCallback) {
          spawnCallback();
          console.log('Xボタン: スポーン実行');
        }
      }
      xButtonPreviouslyPressed = xButton ? xButton.pressed : false;

      // Yボタン - リセット
      const yButton = source.gamepad.buttons[5]; // Yボタン
      if (yButton && yButton.pressed && !yButtonPreviouslyPressed) {
        console.log('Yボタン押下検出, resetCallback:', resetCallback ? '設定済み' : 'null');
        if (resetCallback) {
          resetCallback();
          console.log('Yボタン: リセット実行');
        }
      }
      yButtonPreviouslyPressed = yButton ? yButton.pressed : false;
    }
  }
}

// スポーンコールバックを設定
export function setSpawnCallback(callback) {
  spawnCallback = callback;
}

// リセットコールバックを設定
export function setResetCallback(callback) {
  resetCallback = callback;
}

// ミニ四駆を右コントローラーの前に移動
export function moveCarToController(mini4car, rightController) {
  if (!mini4car || !rightController) return;

  const controllerPosition = new THREE.Vector3();
  rightController.getWorldPosition(controllerPosition);

  // コントローラーの前方0.1mに配置（常に同じオフセット）
  mini4car.position.set(
    controllerPosition.x,
    controllerPosition.y,
    controllerPosition.z - 0.1
  );
}

// タイヤの速度を更新
export function updateWheelSpeed() {
  if (isWheelSpinning) {
    // 加速
    wheelSpeed = Math.min(wheelSpeed + wheelAcceleration, wheelMaxSpeed);
  } else {
    // 減速（慣性）
    wheelSpeed = Math.max(wheelSpeed - wheelDeceleration, 0);
  }
  return wheelSpeed;
}

// 現在のタイヤ速度を取得
export function getWheelSpeed() {
  return wheelSpeed;
}

// タイヤを回転
export function rotateWheels(wheels) {
  if (wheels.length > 0 && wheelSpeed > 0) {
    wheels.forEach((wheel) => {
      wheel.rotation.x += wheelSpeed;
    });
  }
}

// ミニ四駆を初期位置に配置
export function positionCarAtController(mini4car, rightController) {
  if (!mini4car || !rightController) return false;

  const controllerPosition = new THREE.Vector3();
  const controllerQuaternion = new THREE.Quaternion();
  rightController.getWorldPosition(controllerPosition);
  rightController.getWorldQuaternion(controllerQuaternion);

  // コントローラーの前方0.3mにミニ四駆を配置
  const forward = new THREE.Vector3(0, 0, -0.3);
  forward.applyQuaternion(controllerQuaternion);

  mini4car.position.set(
    controllerPosition.x + forward.x,
    controllerPosition.y + forward.y,
    controllerPosition.z + forward.z
  );

  // コントローラーの位置が有効な場合のみ配置完了とする
  if (controllerPosition.lengthSq() > 0) {
    console.log('ミニ四駆を右コントローラーの前に配置しました');
    return true;
  }
  return false;
}
