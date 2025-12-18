import * as THREE from 'three';

// 右手の位置と向きを取得
export function getRightHandTransform(hand, frame, referenceSpace) {
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

  // エフェクトを手のひらの前に配置（少し離す）
  const offset = adjustedNormal.clone().multiplyScalar(0.15);
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

// 左手の位置と向きを取得
export function getLeftHandTransform(hand, frame, referenceSpace) {
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
  // 左手の場合、手のひらの法線は-Y方向（ローカル座標）で手のひら側を向く
  const palmNormal = new THREE.Vector3(0, -1, 0);
  palmNormal.applyQuaternion(quaternion);

  // 上向きに角度を調整（palmNormalに上方向を加える）
  const adjustedNormal = palmNormal.clone();
  adjustedNormal.y += 0.4; // 上向きに調整
  adjustedNormal.normalize();

  // シールドを手のひらの前に配置（調整した法線方向に少しオフセット）
  const offset = adjustedNormal.clone().multiplyScalar(0.001);
  const shieldPosition = palmCenter.clone().add(offset);

  // シールドが手のひらを向くように回転を計算
  // 調整した法線方向を向くクォータニオンを計算
  const shieldQuaternion = new THREE.Quaternion();
  const up = new THREE.Vector3(0, 1, 0);
  const lookMatrix = new THREE.Matrix4();
  const lookTarget = shieldPosition.clone().sub(adjustedNormal);
  lookMatrix.lookAt(shieldPosition, lookTarget, up);
  shieldQuaternion.setFromRotationMatrix(lookMatrix);

  return {
    position: shieldPosition,
    quaternion: shieldQuaternion
  };
}
