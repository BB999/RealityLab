import * as CANNON from 'cannon-es';
import * as THREE from 'three';

// 物理ワールド
let world;
let carBody;
let floorBody;

// デバッグ用メッシュ
let debugMeshes = [];
let debugGroup;
let showDebug = true;

// バウンディングボックスのオフセット（モデル原点と中心のずれ）
let boxOffset = new THREE.Vector3();
let boxSize = new THREE.Vector3();

// 物理ワールドの初期化
export function initPhysics() {
  world = new CANNON.World();
  world.gravity.set(0, -9.82, 0);

  // 衝突検出の設定
  world.broadphase = new CANNON.NaiveBroadphase();
  world.solver.iterations = 10;

  // 床の物理ボディを作成
  const floorShape = new CANNON.Plane();
  floorBody = new CANNON.Body({
    mass: 0, // 静的オブジェクト
    shape: floorShape,
    material: new CANNON.Material('floor')
  });
  floorBody.quaternion.setFromEuler(-Math.PI / 2, 0, 0);
  world.addBody(floorBody);

  return world;
}

// ミニ四駆の物理ボディを作成
export function createCarBody(mini4car) {
  if (!mini4car) return null;

  // バウンディングボックスを計算
  const box = new THREE.Box3().setFromObject(mini4car);
  box.getSize(boxSize);

  // バウンディングボックスの中心を取得
  const center = new THREE.Vector3();
  box.getCenter(center);

  // モデルの位置からの相対オフセットを計算
  boxOffset.copy(center).sub(mini4car.position);

  console.log('ボックスサイズ:', boxSize);
  console.log('ボックス中心:', center);
  console.log('オフセット:', boxOffset);

  // Cannon.jsのボックス形状を作成
  const halfExtents = new CANNON.Vec3(boxSize.x / 2, boxSize.y / 2, boxSize.z / 2);
  const carShape = new CANNON.Box(halfExtents);

  // 物理ボディを作成（中心位置で）
  carBody = new CANNON.Body({
    mass: 0.1, // 100g
    shape: carShape,
    material: new CANNON.Material('car'),
    linearDamping: 0.3,
    angularDamping: 0.5
  });

  // 初期位置を設定（オフセットを考慮）
  carBody.position.set(
    mini4car.position.x + boxOffset.x,
    mini4car.position.y + boxOffset.y,
    mini4car.position.z + boxOffset.z
  );
  carBody.quaternion.copy(mini4car.quaternion);

  world.addBody(carBody);

  // 床との摩擦設定
  const contactMaterial = new CANNON.ContactMaterial(
    carBody.material,
    floorBody.material,
    {
      friction: 0.4,
      restitution: 0.3 // 弾性
    }
  );
  world.addContactMaterial(contactMaterial);

  return carBody;
}

// デバッグメッシュを作成（当たり判定の可視化）
export function createDebugMeshes(scene) {
  debugGroup = new THREE.Group();
  debugGroup.name = 'physicsDebug';
  scene.add(debugGroup);

  // 床のデバッグメッシュ（グリッド表示）
  const floorGeometry = new THREE.PlaneGeometry(10, 10);
  const floorMaterial = new THREE.MeshBasicMaterial({
    color: 0x00ff00,
    wireframe: true,
    transparent: true,
    opacity: 0.3
  });
  const floorMesh = new THREE.Mesh(floorGeometry, floorMaterial);
  floorMesh.rotation.x = -Math.PI / 2;
  floorMesh.position.y = 0.001;
  debugGroup.add(floorMesh);
  debugMeshes.push({ mesh: floorMesh, body: floorBody, isFloor: true });

  return debugGroup;
}

// ミニ四駆のデバッグメッシュを追加
export function addCarDebugMesh(mini4car) {
  if (!carBody || !debugGroup) return null;

  // ワイヤーフレームボックスを作成（保存済みのサイズを使用）
  const geometry = new THREE.BoxGeometry(boxSize.x, boxSize.y, boxSize.z);
  const material = new THREE.MeshBasicMaterial({
    color: 0xff0000,
    wireframe: true,
    transparent: true,
    opacity: 0.7
  });
  const carDebugMesh = new THREE.Mesh(geometry, material);
  debugGroup.add(carDebugMesh);
  debugMeshes.push({ mesh: carDebugMesh, body: carBody, isFloor: false });

  return carDebugMesh;
}

// 物理シミュレーションを更新
export function updatePhysics(deltaTime) {
  if (!world) return;

  // 物理シミュレーションを進める
  world.step(1 / 60, deltaTime, 3);
}

// Three.jsのオブジェクトを物理ボディに同期（オフセットを考慮）
export function syncMeshToBody(mesh) {
  if (!carBody || !mesh) return;

  // 物理ボディの位置からオフセットを引いてメッシュの位置を計算
  // 回転を考慮してオフセットを変換
  const rotatedOffset = boxOffset.clone().applyQuaternion(mesh.quaternion);

  mesh.position.set(
    carBody.position.x - rotatedOffset.x,
    carBody.position.y - rotatedOffset.y,
    carBody.position.z - rotatedOffset.z
  );
  mesh.quaternion.copy(carBody.quaternion);
}

// デバッグメッシュを更新
export function updateDebugMeshes() {
  if (!showDebug) return;

  for (const item of debugMeshes) {
    if (item.isFloor) continue;

    item.mesh.position.copy(item.body.position);
    item.mesh.quaternion.copy(item.body.quaternion);
  }
}

// グラブ時に物理ボディを停止
export function setCarKinematic(isKinematic) {
  if (!carBody) return;

  if (isKinematic) {
    carBody.type = CANNON.Body.KINEMATIC;
    carBody.velocity.set(0, 0, 0);
    carBody.angularVelocity.set(0, 0, 0);
  } else {
    carBody.type = CANNON.Body.DYNAMIC;
  }
}

// 物理ボディの位置を更新（グラブ中）- オフセットを考慮
export function updateCarBodyPosition(position, quaternion) {
  if (!carBody) return;

  // 回転を考慮してオフセットを変換
  const rotatedOffset = boxOffset.clone().applyQuaternion(quaternion);

  carBody.position.set(
    position.x + rotatedOffset.x,
    position.y + rotatedOffset.y,
    position.z + rotatedOffset.z
  );
  carBody.quaternion.copy(quaternion);
}

// デバッグ表示の切り替え
export function toggleDebugVisibility() {
  showDebug = !showDebug;
  if (debugGroup) {
    debugGroup.visible = showDebug;
  }
  return showDebug;
}

// デバッグ表示状態を取得
export function isDebugVisible() {
  return showDebug;
}

// 物理ボディを取得
export function getCarBody() {
  return carBody;
}

// ワールドを取得
export function getWorld() {
  return world;
}

// 衝突時の色変更
export function updateCollisionColor() {
  if (!carBody || debugMeshes.length === 0) return;

  const carMesh = debugMeshes.find(item => !item.isFloor);
  if (!carMesh) return;

  // 床に接触しているか確認（ボックスの半分の高さを考慮）
  const isOnFloor = carBody.position.y <= boxSize.y / 2 + 0.01;

  if (isOnFloor) {
    carMesh.mesh.material.color.setHex(0xffff00); // 黄色
  } else {
    carMesh.mesh.material.color.setHex(0xff0000); // 赤
  }
}
