import * as THREE from 'three';

// 右手の位置と向きを取得（isHound: ハウンドモードの場合は手から離す）
export function getRightHandTransform(hand, frame, referenceSpace, isHound = false) {
  if (!hand || !frame || !referenceSpace) return null;

  const wristSpace = hand.get('wrist');
  const middleTip = hand.get('middle-finger-tip');

  if (!wristSpace || !middleTip) return null;

  const wristPose = frame.getJointPose(wristSpace, referenceSpace);
  const middleTipPose = frame.getJointPose(middleTip, referenceSpace);
  if (!wristPose || !middleTipPose) return null;

  const wristPosition = new THREE.Vector3(
    wristPose.transform.position.x,
    wristPose.transform.position.y,
    wristPose.transform.position.z
  );

  const middleTipPosition = new THREE.Vector3(
    middleTipPose.transform.position.x,
    middleTipPose.transform.position.y,
    middleTipPose.transform.position.z
  );

  // 手のひらの中心を計算
  const palmCenter = new THREE.Vector3().addVectors(wristPosition, middleTipPosition).multiplyScalar(0.5);

  const quaternion = new THREE.Quaternion(
    wristPose.transform.orientation.x,
    wristPose.transform.orientation.y,
    wristPose.transform.orientation.z,
    wristPose.transform.orientation.w
  );

  // 右手の場合、手のひらの法線は-Y方向（ローカル座標）で手のひら側を向く
  const palmNormal = new THREE.Vector3(0, -1, 0);
  palmNormal.applyQuaternion(quaternion);

  // 上向きに角度を調整（palmNormalに上方向を加える）
  const adjustedNormal = palmNormal.clone();
  adjustedNormal.y += 0.4; // 上向きに調整
  adjustedNormal.normalize();

  // エフェクトを手のひらの前に配置（ハウンドモードは手から離す）
  const offsetDistance = isHound ? 0.30 : 0.15;
  const offset = adjustedNormal.clone().multiplyScalar(offsetDistance);
  const effectPosition = palmCenter.clone().add(offset);

  // エフェクトが手のひらから外向きに出るように回転（逆方向を向く）
  const effectQuaternion = new THREE.Quaternion();
  const up = new THREE.Vector3(0, 1, 0);
  const lookMatrix = new THREE.Matrix4();
  // ビームが手のひらから離れる方向に飛ぶよう、adjustedNormalの逆方向からlookAt
  const lookFrom = effectPosition.clone().add(adjustedNormal);
  lookMatrix.lookAt(lookFrom, effectPosition, up);
  effectQuaternion.setFromRotationMatrix(lookMatrix);

  return {
    position: effectPosition,
    quaternion: effectQuaternion,
    palmNormal: palmNormal
  };
}

// 左手がパー（開いている）かどうかを判定
export function isHandOpen(hand, frame, referenceSpace) {
  if (!hand || !frame || !referenceSpace) return false;

  const joints = [
    'thumb-tip', 'index-finger-tip', 'middle-finger-tip', 'ring-finger-tip', 'pinky-finger-tip',
    'wrist'
  ];

  // 各関節の位置を取得
  const jointPositions = {};
  for (const jointName of joints) {
    const jointSpace = hand.get(jointName);
    if (jointSpace) {
      const jointPose = frame.getJointPose(jointSpace, referenceSpace);
      if (jointPose) {
        jointPositions[jointName] = new THREE.Vector3(
          jointPose.transform.position.x,
          jointPose.transform.position.y,
          jointPose.transform.position.z
        );
      }
    }
  }

  // 手首の位置が取得できない場合は判定不能
  if (!jointPositions['wrist']) return false;

  const wrist = jointPositions['wrist'];
  const fingerTips = ['index-finger-tip', 'middle-finger-tip', 'ring-finger-tip', 'pinky-finger-tip'];

  let extendedCount = 0;

  for (const tip of fingerTips) {
    if (jointPositions[tip]) {
      const distance = jointPositions[tip].distanceTo(wrist);
      // 手首から指先までの距離が一定以上なら伸びていると判定
      if (distance > 0.1) {
        extendedCount++;
      }
    }
  }

  // 4本中3本以上の指が伸びていればパーと判定
  return extendedCount >= 3;
}

// シールドモードの状態を保持（ヒステリシス用）
let leftShieldModeState = false;
let rightShieldModeState = false;

// 手のひらが前方（カメラから離れる方向）を向いているかを判定
export function isPalmFacingForward(hand, frame, referenceSpace, camera, handedness) {
  if (!hand || !frame || !referenceSpace || !camera) return false;

  const wristSpace = hand.get('wrist');
  if (!wristSpace) return false;

  const wristPose = frame.getJointPose(wristSpace, referenceSpace);
  if (!wristPose) return false;

  const quaternion = new THREE.Quaternion(
    wristPose.transform.orientation.x,
    wristPose.transform.orientation.y,
    wristPose.transform.orientation.z,
    wristPose.transform.orientation.w
  );

  // 手のひらの法線を取得（両手とも-Y方向が手のひら側）
  const palmNormal = new THREE.Vector3(0, -1, 0);
  palmNormal.applyQuaternion(quaternion);

  // 手のひらが下向きの場合はシールドモードにしない（ハウンド用）
  const downward = new THREE.Vector3(0, -1, 0);
  const dotDown = palmNormal.dot(downward);
  if (dotDown > 0.6) {
    // 下向きが明確なら即座にfalse
    if (handedness === 'left') leftShieldModeState = false;
    else rightShieldModeState = false;
    return false;
  }

  // カメラの前方方向（カメラが見ている方向）
  const cameraForward = new THREE.Vector3(0, 0, -1);
  const cameraQuaternion = new THREE.Quaternion();
  camera.getWorldQuaternion(cameraQuaternion);
  cameraForward.applyQuaternion(cameraQuaternion);

  // 手のひらの法線とカメラの前方方向の内積
  const dot = palmNormal.dot(cameraForward);

  // ヒステリシスを使用した判定
  // 現在の状態を取得
  const currentState = handedness === 'left' ? leftShieldModeState : rightShieldModeState;

  let newState;
  if (currentState) {
    // シールドモード中: 0.2以下で解除（より緩い条件）
    newState = dot > 0.2;
  } else {
    // シールドモードでない: 0.45以上で発動（より厳しい条件）
    newState = dot > 0.45;
  }

  // 状態を更新
  if (handedness === 'left') leftShieldModeState = newState;
  else rightShieldModeState = newState;

  return newState;
}

// 左手の位置と向きを取得（isHound: ハウンドモードの場合は手から離す）
export function getLeftHandTransform(hand, frame, referenceSpace, isHound = false) {
  if (!hand || !frame || !referenceSpace) return null;

  // 手のひらの中心（wrist）の位置を取得
  const wristSpace = hand.get('wrist');
  const middleTip = hand.get('middle-finger-tip');

  if (!wristSpace || !middleTip) return null;

  const wristPose = frame.getJointPose(wristSpace, referenceSpace);
  const middleTipPose = frame.getJointPose(middleTip, referenceSpace);
  if (!wristPose || !middleTipPose) return null;

  const wristPosition = new THREE.Vector3(
    wristPose.transform.position.x,
    wristPose.transform.position.y,
    wristPose.transform.position.z
  );

  const middleTipPosition = new THREE.Vector3(
    middleTipPose.transform.position.x,
    middleTipPose.transform.position.y,
    middleTipPose.transform.position.z
  );

  // 手のひらの中心を計算（手首と中指先端の中間点）
  const palmCenter = new THREE.Vector3().addVectors(wristPosition, middleTipPosition).multiplyScalar(0.5);

  const quaternion = new THREE.Quaternion(
    wristPose.transform.orientation.x,
    wristPose.transform.orientation.y,
    wristPose.transform.orientation.z,
    wristPose.transform.orientation.w
  );

  // 手のひらの法線方向（手のひらが向いている方向）を計算
  // 左手の場合、手のひらの法線は+Y方向（ローカル座標）で手の甲側を向く
  const palmNormal = new THREE.Vector3(0, 1, 0);
  palmNormal.applyQuaternion(quaternion);

  // シールドを手のひらの前に配置（ハウンドモードは手から離す）
  const offsetDistance = isHound ? -0.20 : -0.08;
  const offset = palmNormal.clone().multiplyScalar(offsetDistance);
  const shieldPosition = palmCenter.clone().add(offset);

  // 手の指の方向を取得（手首から中指先端への方向）
  const fingerDirection = new THREE.Vector3().subVectors(middleTipPosition, wristPosition).normalize();

  // シールドの向きを20度上に傾ける
  // 手のひらの法線に上方向成分を加える
  const tiltAngle = 20 * (Math.PI / 180); // 20度をラジアンに変換
  const adjustedNormal = palmNormal.clone();
  adjustedNormal.y -= Math.sin(tiltAngle); // 上方向に傾ける（符号反転）
  adjustedNormal.normalize();

  // シールドが手のひらと同じ向きになるようにクォータニオンを計算
  // シールドの法線が調整した法線方向を向くようにする
  const shieldQuaternion = new THREE.Quaternion();
  const lookMatrix = new THREE.Matrix4();
  // シールドの前面（-Z）が調整した法線方向を向くように
  const lookTarget = shieldPosition.clone().add(adjustedNormal);
  lookMatrix.lookAt(shieldPosition, lookTarget, fingerDirection);
  shieldQuaternion.setFromRotationMatrix(lookMatrix);

  return {
    position: shieldPosition,
    quaternion: shieldQuaternion
  };
}

// 手のひらが下向きかどうかを判定（ハウンドモード用）
export function isPalmFacingDown(hand, frame, referenceSpace) {
  if (!hand || !frame || !referenceSpace) return false;

  const wristSpace = hand.get('wrist');
  if (!wristSpace) return false;

  const wristPose = frame.getJointPose(wristSpace, referenceSpace);
  if (!wristPose) return false;

  const quaternion = new THREE.Quaternion(
    wristPose.transform.orientation.x,
    wristPose.transform.orientation.y,
    wristPose.transform.orientation.z,
    wristPose.transform.orientation.w
  );

  // 手のひらの法線を取得（-Y方向が手のひら側）
  const palmNormal = new THREE.Vector3(0, -1, 0);
  palmNormal.applyQuaternion(quaternion);

  // 下向きベクトル
  const downward = new THREE.Vector3(0, -1, 0);

  // 手のひらの法線と下向きベクトルの内積
  // 手のひらが下を向いている = 内積が正（同じ方向）
  const dot = palmNormal.dot(downward);

  // 内積が0.5以上なら手のひらが下を向いていると判定
  return dot > 0.5;
}
