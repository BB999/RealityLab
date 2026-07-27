import * as THREE from 'three';

// THREE.Sprite に対する交差判定には camera が必要。
// 生成コードが Sprite を使うと、未設定のまま raycast して例外になるため保持しておく。
let sceneCamera = null;

export function setRaycastCamera(camera) {
  sceneCamera = camera;
}

// 毎フレーム何度も呼ばれるので使い回す。
// レイを構えてから交差を取るまでの間に他の raycast は挟まらない
const _raycaster = new THREE.Raycaster();
const _origin = new THREE.Vector3();
const _direction = new THREE.Vector3();
const _orientation = new THREE.Quaternion();

const RAY_RANGE = 10;

/**
 * inputSource の指す向きにレイを構える
 * @returns {THREE.Raycaster|null} 姿勢が取れなければ null
 */
function aim(inputSource, frame, referenceSpace) {
  if (!inputSource || !inputSource.targetRaySpace || !frame || !referenceSpace) return null;

  const rayPose = frame.getPose(inputSource.targetRaySpace, referenceSpace);
  if (!rayPose) return null;

  const position = rayPose.transform.position;
  const orientation = rayPose.transform.orientation;

  _origin.set(position.x, position.y, position.z);
  _orientation.set(orientation.x, orientation.y, orientation.z, orientation.w);
  _direction.set(0, 0, -1).applyQuaternion(_orientation);

  _raycaster.set(_origin, _direction);
  _raycaster.near = 0;
  _raycaster.far = RAY_RANGE;
  _raycaster.camera = sceneCamera;

  return _raycaster;
}

const _hitBox = new THREE.Box3();
const _hitPoint = new THREE.Vector3();
const _boundsCenter = new THREE.Vector3();
const _boundsHalf = new THREE.Vector3();

/**
 * レーザーでモジュールにヒットしているかチェック
 *
 * 手で掴む判定と同じ AABB を使う。実メッシュで判定すると、星屑や花火のような
 * 中身のまばらなモジュールは、表示されている枠の中を狙っても素通りしてしまう
 * @param {number} minHalfSize - つかみ判定の最小半径（掴み側と同じ値を渡すこと）
 */
export function raycastModules(inputSource, frame, referenceSpace, moduleManager, minHalfSize = 0.15) {
  const raycaster = aim(inputSource, frame, referenceSpace);
  if (!raycaster) return null;

  // 全モジュールをチェックし、一番手前のものを返す。
  // 最初にヒットしたもので打ち切ると Map の登録順で決まってしまい、
  // 奥にある大きなモジュールが手前の小さなモジュールを奪ってしまう
  let nearest = null;

  for (const module of moduleManager.modules.values()) {
    if (!moduleManager.getGrabBounds(module, minHalfSize, _boundsCenter, _boundsHalf)) continue;

    _hitBox.min.copy(_boundsCenter).sub(_boundsHalf);
    _hitBox.max.copy(_boundsCenter).add(_boundsHalf);

    // レイの起点が箱の中にあるときは起点自身が返る（距離 0）
    if (!raycaster.ray.intersectBox(_hitBox, _hitPoint)) continue;

    const distance = raycaster.ray.origin.distanceTo(_hitPoint);
    if (distance > raycaster.far) continue;
    if (nearest && distance >= nearest.distance) continue;

    nearest = {
      module: module,
      distance: distance,
      point: _hitPoint.clone()
    };
  }

  return nearest;
}

// レーザーでテキストパネルにヒットしているかチェック
export function raycastTextPanel(inputSource, frame, referenceSpace, textPanel) {
  if (!textPanel || !textPanel.visible) return null;

  const raycaster = aim(inputSource, frame, referenceSpace);
  if (!raycaster) return null;

  // Groupの場合も子オブジェクトを検索するためにtrue
  const intersects = raycaster.intersectObject(textPanel, true);
  if (intersects.length === 0) return null;

  return {
    distance: intersects[0].distance,
    point: intersects[0].point
  };
}

// レーザーで画像パネルにヒットしているかチェック
export function raycastImagePanel(inputSource, frame, referenceSpace, imagePanel) {
  if (!imagePanel) return null;

  const raycaster = aim(inputSource, frame, referenceSpace);
  if (!raycaster) return null;

  const intersects = raycaster.intersectObject(imagePanel);
  if (intersects.length === 0) return null;

  return {
    distance: intersects[0].distance,
    point: intersects[0].point
  };
}

/**
 * 複数の対象のうち、最初に当たるものまでの距離。
 * レーザーをそこで打ち切るために使う
 * @param {Array<THREE.Object3D>} objects
 * @returns {number|null} 何にも当たらなければ null
 */
export function raycastReach(inputSource, frame, referenceSpace, objects) {
  if (!objects || objects.length === 0) return null;

  const raycaster = aim(inputSource, frame, referenceSpace);
  if (!raycaster) return null;

  const intersects = raycaster.intersectObjects(objects, true);
  return intersects.length > 0 ? intersects[0].distance : null;
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
