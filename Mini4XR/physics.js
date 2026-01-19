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

  // 床の物理ボディを作成（少し下に配置して当たり判定を浮かせる）
  const floorShape = new CANNON.Plane();
  floorBody = new CANNON.Body({
    mass: 0, // 静的オブジェクト
    shape: floorShape,
    material: new CANNON.Material('floor')
  });
  floorBody.quaternion.setFromEuler(-Math.PI / 2, 0, 0);
  floorBody.position.y = 0; // 元に戻す
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
    mass: 0.05, // 50g（軽くして動きやすく）
    shape: carShape,
    material: new CANNON.Material('car'),
    linearDamping: 0.1, // 減衰を小さく
    angularDamping: 0.3
  });

  // 初期位置を設定（オフセットを考慮）
  carBody.position.set(
    mini4car.position.x + boxOffset.x,
    mini4car.position.y + boxOffset.y,
    mini4car.position.z + boxOffset.z
  );
  carBody.quaternion.copy(mini4car.quaternion);

  world.addBody(carBody);

  // 床との摩擦設定（反応を鈍くする）
  const contactMaterial = new CANNON.ContactMaterial(
    carBody.material,
    floorBody.material,
    {
      friction: 0.001,      // 摩擦をほぼゼロに
      restitution: 0.0,     // 弾性なし
      contactEquationStiffness: 1e3,  // 剛性をさらに下げる
      contactEquationRelaxation: 50   // リラクゼーションをさらに大きく
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

// タイヤの回転に応じて前進する力を加える
export function applyDriveForce(wheelSpeed, carQuaternion) {
  if (!carBody || wheelSpeed <= 0) return;

  // 床に接地している時のみ前進
  const onFloor = carBody.position.y <= boxSize.y / 2 + 0.05;
  if (!onFloor) {
    return;
  }

  // 物理ボディの向きを使用
  const bodyQuat = new THREE.Quaternion(
    carBody.quaternion.x,
    carBody.quaternion.y,
    carBody.quaternion.z,
    carBody.quaternion.w
  );

  // 前方向を計算（Z軸正方向）
  const forward = new THREE.Vector3(0, 0, 1);
  forward.applyQuaternion(bodyQuat);

  // 水平成分だけ使う
  forward.y = 0;
  forward.normalize();

  // タイヤ速度に応じた速度を設定
  const speed = wheelSpeed * 2.0;

  // 水平方向の速度を設定（Y軸は物理エンジンに任せる）
  carBody.velocity.x = forward.x * speed;
  carBody.velocity.z = forward.z * speed;
}

// 走行中の姿勢を安定させる（自然な物理挙動を維持）
export function stabilizeCar() {
  // 何もしない - 自然な物理挙動に任せる
}

// 床に接地しているか確認
export function isOnFloor() {
  if (!carBody) return false;
  return carBody.position.y <= boxSize.y / 2 + 0.02;
}

// ミニ四駆をリセット（コントローラーの前に戻す）
export function resetCarPosition(position, quaternion) {
  if (!carBody) return;

  // 速度をリセット
  carBody.velocity.set(0, 0, 0);
  carBody.angularVelocity.set(0, 0, 0);

  // 回転を考慮してオフセットを変換
  const rotatedOffset = boxOffset.clone().applyQuaternion(quaternion);

  // 位置を設定
  carBody.position.set(
    position.x + rotatedOffset.x,
    position.y + rotatedOffset.y,
    position.z + rotatedOffset.z
  );
  carBody.quaternion.copy(quaternion);
}
