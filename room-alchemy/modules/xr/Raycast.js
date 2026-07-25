import * as THREE from 'three';

// THREE.Sprite に対する交差判定には camera が必要。
// 生成コードが Sprite を使うと、未設定のまま raycast して例外になるため保持しておく。
let sceneCamera = null;

export function setRaycastCamera(camera) {
  sceneCamera = camera;
}

// レーザーでモジュールにヒットしているかチェック
export function raycastModules(inputSource, frame, referenceSpace, moduleManager) {
  if (!inputSource || !inputSource.targetRaySpace || !frame || !referenceSpace) return null;

  const rayPose = frame.getPose(inputSource.targetRaySpace, referenceSpace);
  if (!rayPose) return null;

  const rayOrigin = new THREE.Vector3(
    rayPose.transform.position.x,
    rayPose.transform.position.y,
    rayPose.transform.position.z
  );
  const rayDirection = new THREE.Vector3(0, 0, -1);
  rayDirection.applyQuaternion(new THREE.Quaternion(
    rayPose.transform.orientation.x,
    rayPose.transform.orientation.y,
    rayPose.transform.orientation.z,
    rayPose.transform.orientation.w
  ));

  const raycaster = new THREE.Raycaster(rayOrigin, rayDirection, 0, 10);
  raycaster.camera = sceneCamera;

  // 全モジュールをチェック
  for (const module of moduleManager.modules.values()) {
    const intersects = raycaster.intersectObject(module.group, true);
    if (intersects.length > 0) {
      return {
        module: module,
        distance: intersects[0].distance,
        point: intersects[0].point
      };
    }
  }
  return null;
}

// レーザーでテキストパネルにヒットしているかチェック
export function raycastTextPanel(inputSource, frame, referenceSpace, textPanel) {
  if (!textPanel || !textPanel.visible) return null;
  if (!inputSource || !inputSource.targetRaySpace || !frame || !referenceSpace) return null;

  const rayPose = frame.getPose(inputSource.targetRaySpace, referenceSpace);
  if (!rayPose) return null;

  const rayOrigin = new THREE.Vector3(
    rayPose.transform.position.x,
    rayPose.transform.position.y,
    rayPose.transform.position.z
  );
  const rayDirection = new THREE.Vector3(0, 0, -1);
  rayDirection.applyQuaternion(new THREE.Quaternion(
    rayPose.transform.orientation.x,
    rayPose.transform.orientation.y,
    rayPose.transform.orientation.z,
    rayPose.transform.orientation.w
  ));

  const raycaster = new THREE.Raycaster(rayOrigin, rayDirection, 0, 10);
  raycaster.camera = sceneCamera;
  // Groupの場合も子オブジェクトを検索するためにtrue
  const intersects = raycaster.intersectObject(textPanel, true);
  if (intersects.length > 0) {
    return {
      distance: intersects[0].distance,
      point: intersects[0].point
    };
  }
  return null;
}

// レーザーで画像パネルにヒットしているかチェック
export function raycastImagePanel(inputSource, frame, referenceSpace, imagePanel) {
  if (!imagePanel) return null;
  if (!inputSource || !inputSource.targetRaySpace || !frame || !referenceSpace) return null;

  const rayPose = frame.getPose(inputSource.targetRaySpace, referenceSpace);
  if (!rayPose) return null;

  const rayOrigin = new THREE.Vector3(
    rayPose.transform.position.x,
    rayPose.transform.position.y,
    rayPose.transform.position.z
  );
  const rayDirection = new THREE.Vector3(0, 0, -1);
  rayDirection.applyQuaternion(new THREE.Quaternion(
    rayPose.transform.orientation.x,
    rayPose.transform.orientation.y,
    rayPose.transform.orientation.z,
    rayPose.transform.orientation.w
  ));

  const raycaster = new THREE.Raycaster(rayOrigin, rayDirection, 0, 10);
  raycaster.camera = sceneCamera;
  const intersects = raycaster.intersectObject(imagePanel);
  if (intersects.length > 0) {
    return {
      distance: intersects[0].distance,
      point: intersects[0].point
    };
  }
  return null;
}

// 画像パネルとの当たり判定（直接グリップ用）
export function checkImagePanelCollision(controllerPosition, imagePanel) {
  if (!imagePanel || !controllerPosition) return false;

  const COLLISION_SIZE = { x: 0.3, y: 0.3, z: 0.1 };

  const localPos = controllerPosition.clone();
  imagePanel.worldToLocal(localPos);

  const halfX = COLLISION_SIZE.x / 2;
  const halfY = COLLISION_SIZE.y / 2;
  const halfZ = COLLISION_SIZE.z / 2;

  return Math.abs(localPos.x) < halfX &&
         Math.abs(localPos.y) < halfY &&
         Math.abs(localPos.z) < halfZ;
}
