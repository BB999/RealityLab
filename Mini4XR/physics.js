import * as CANNON from 'cannon-es';
import * as THREE from 'three';

// 物理ワールド
let world;
let carBody;
let floorBody;

// スポーンされたオブジェクトの物理ボディ
let spawnedBodies = [];

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

  // 衝突検出の設定（SAPBroadphaseで効率的に）
  world.broadphase = new CANNON.SAPBroadphase(world);
  world.solver.iterations = 20; // より正確な衝突解決
  world.solver.tolerance = 0.001;

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
    angularDamping: 0.3,
    ccdSpeedThreshold: 0.1, // CCD（連続衝突検出）を有効化
    ccdIterations: 10 // CCD反復回数
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

  // 物理シミュレーションを進める（固定タイムステップ、サブステップを増やして精度向上）
  world.step(1 / 120, deltaTime, 10);
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
  if (!carBody || !world || wheelSpeed <= 0) return;

  // 何かに接触している時のみ前進（ワールドの接触リストをチェック）
  let isGrounded = false;
  for (const contact of world.contacts) {
    if (contact.bi === carBody || contact.bj === carBody) {
      isGrounded = true;
      break;
    }
  }
  if (!isGrounded) {
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

// カーブメッシュを四角形（Quad）ごとにBoxコライダーを作成
function createCurveBoxColliders(child, partType, wallMaterial, bodies, meshData) {
  child.updateWorldMatrix(true, false);

  const geometry = child.geometry;
  const positionAttribute = geometry.getAttribute('position');
  const index = geometry.getIndex();

  // スケール、位置、回転を取得
  const scale = new THREE.Vector3();
  const position = new THREE.Vector3();
  const quaternion = new THREE.Quaternion();
  child.matrixWorld.decompose(position, quaternion, scale);

  const curveBoxes = [];

  // インデックスがある場合は三角形を取得、ない場合は頂点を直接使用
  if (index) {
    // インデックス付きジオメトリの場合
    // 2つの三角形で1つの四角形を構成していると仮定
    const triangleCount = index.count / 3;
    const processedQuads = new Set();

    for (let triIdx = 0; triIdx < triangleCount; triIdx += 2) {
      // 2つの三角形で1つのQuadを構成
      if (triIdx + 1 >= triangleCount) break;

      const quadKey = Math.floor(triIdx / 2);
      if (processedQuads.has(quadKey)) continue;
      processedQuads.add(quadKey);

      // 最初の三角形の3頂点
      const i0 = index.getX(triIdx * 3);
      const i1 = index.getX(triIdx * 3 + 1);
      const i2 = index.getX(triIdx * 3 + 2);

      // 2番目の三角形の3頂点
      const i3 = index.getX((triIdx + 1) * 3);
      const i4 = index.getX((triIdx + 1) * 3 + 1);
      const i5 = index.getX((triIdx + 1) * 3 + 2);

      // 6つの頂点インデックスからユニークな4頂点を取得
      const indices = [i0, i1, i2, i3, i4, i5];
      const uniqueIndices = [...new Set(indices)];

      // 最初の三角形の3頂点をワールド座標で取得
      const v0 = new THREE.Vector3(
        positionAttribute.getX(i0),
        positionAttribute.getY(i0),
        positionAttribute.getZ(i0)
      ).applyMatrix4(child.matrixWorld);
      const v1 = new THREE.Vector3(
        positionAttribute.getX(i1),
        positionAttribute.getY(i1),
        positionAttribute.getZ(i1)
      ).applyMatrix4(child.matrixWorld);
      const v2 = new THREE.Vector3(
        positionAttribute.getX(i2),
        positionAttribute.getY(i2),
        positionAttribute.getZ(i2)
      ).applyMatrix4(child.matrixWorld);

      // 4頂点をワールド座標で取得
      const quadVertices = uniqueIndices.map(idx => {
        return new THREE.Vector3(
          positionAttribute.getX(idx),
          positionAttribute.getY(idx),
          positionAttribute.getZ(idx)
        ).applyMatrix4(child.matrixWorld);
      });

      // 面の法線を計算（三角形から）
      const edge1 = new THREE.Vector3().subVectors(v1, v0);
      const edge2 = new THREE.Vector3().subVectors(v2, v0);
      const normal = new THREE.Vector3().crossVectors(edge1, edge2).normalize();

      // 面のローカル座標系を構築
      // tangent: 辺の方向（横方向）
      const tangent = edge1.clone().normalize();
      // bitangent: 法線と接線の外積（縦方向）
      const bitangent = new THREE.Vector3().crossVectors(normal, tangent).normalize();

      // 回転行列を作成
      const rotationMatrix = new THREE.Matrix4();
      rotationMatrix.makeBasis(tangent, bitangent, normal);
      const boxQuaternion = new THREE.Quaternion().setFromRotationMatrix(rotationMatrix);

      // 中心を計算
      const center = new THREE.Vector3();
      for (const v of quadVertices) {
        center.add(v);
      }
      center.divideScalar(quadVertices.length);

      // 頂点をローカル座標系に変換してサイズを計算
      const inverseRotation = boxQuaternion.clone().invert();
      let minLocal = new THREE.Vector3(Infinity, Infinity, Infinity);
      let maxLocal = new THREE.Vector3(-Infinity, -Infinity, -Infinity);

      for (const v of quadVertices) {
        const localV = v.clone().sub(center).applyQuaternion(inverseRotation);
        minLocal.min(localV);
        maxLocal.max(localV);
      }

      let sizeX = maxLocal.x - minLocal.x;
      let sizeY = maxLocal.y - minLocal.y;
      let sizeZ = maxLocal.z - minLocal.z;

      // コライダーサイズを80%に縮小
      const shrinkFactor = 1.0;
      sizeX *= shrinkFactor;
      sizeY *= shrinkFactor;
      sizeZ *= shrinkFactor;

      // 最小サイズを保証
      const minSize = 0.005;
      if (sizeX < minSize) sizeX = minSize;
      if (sizeY < minSize) sizeY = minSize;
      if (sizeZ < minSize) sizeZ = minSize;

      // 親オブジェクト基準のローカルオフセットを計算
      const localOffset = center.clone().sub(position);
      const inverseParentQuat = quaternion.clone().invert();
      localOffset.applyQuaternion(inverseParentQuat);

      // Boxシェイプを作成
      const halfExtents = new CANNON.Vec3(sizeX / 2, sizeY / 2, sizeZ / 2);
      const boxShape = new CANNON.Box(halfExtents);

      const body = new CANNON.Body({
        mass: 0,
        material: wallMaterial,
        type: CANNON.Body.STATIC
      });
      body.addShape(boxShape);
      body.position.set(center.x, center.y, center.z);
      body.quaternion.set(boxQuaternion.x, boxQuaternion.y, boxQuaternion.z, boxQuaternion.w);

      world.addBody(body);
      bodies.push(body);

      // デバッグメッシュを作成
      let debugMesh = null;
      if (debugGroup) {
        let debugColor = 0x00ffff;
        if (partType === 'wall_left') debugColor = 0x00ff00;
        else if (partType === 'wall_right') debugColor = 0xff00ff;

        const debugGeometry = new THREE.BoxGeometry(sizeX, sizeY, sizeZ);
        const debugMaterial = new THREE.MeshBasicMaterial({
          color: debugColor,
          wireframe: true,
          transparent: true,
          opacity: 0.5
        });
        debugMesh = new THREE.Mesh(debugGeometry, debugMaterial);
        debugMesh.position.copy(center);
        debugMesh.quaternion.copy(boxQuaternion);
        debugGroup.add(debugMesh);
        debugMeshes.push({ mesh: debugMesh, body: body, isFloor: false, isSpawned: true, sourceMesh: child, partType: partType, isCurveBox: true });
      }

      // ローカル回転を計算（親の回転を打ち消した後のBox回転）
      const localQuat = inverseParentQuat.clone().multiply(boxQuaternion);

      // Boxの情報を保存
      curveBoxes.push({
        body: body,
        localOffset: localOffset.clone(),
        localQuaternion: localQuat,
        size: new THREE.Vector3(sizeX, sizeY, sizeZ),
        debugMesh: debugMesh
      });
    }
  } else {
    // インデックスなしジオメトリの場合（3頂点ずつの三角形）
    const vertexCount = positionAttribute.count;
    const triangleCount = vertexCount / 3;

    for (let triIdx = 0; triIdx < triangleCount; triIdx += 2) {
      // 2つの三角形で1つのQuadを構成
      if (triIdx + 1 >= triangleCount) {
        // 最後の三角形が奇数個の場合、単独で処理
        const baseIdx = triIdx * 3;
        const quadVertices = [];
        for (let j = 0; j < 3; j++) {
          quadVertices.push(new THREE.Vector3(
            positionAttribute.getX(baseIdx + j),
            positionAttribute.getY(baseIdx + j),
            positionAttribute.getZ(baseIdx + j)
          ).applyMatrix4(child.matrixWorld));
        }

        createBoxFromVertices(quadVertices, position, quaternion, wallMaterial, partType, bodies, curveBoxes);
        continue;
      }

      // 6頂点（2三角形）をワールド座標で取得
      const baseIdx1 = triIdx * 3;
      const baseIdx2 = (triIdx + 1) * 3;
      const quadVertices = [];

      for (let j = 0; j < 3; j++) {
        quadVertices.push(new THREE.Vector3(
          positionAttribute.getX(baseIdx1 + j),
          positionAttribute.getY(baseIdx1 + j),
          positionAttribute.getZ(baseIdx1 + j)
        ).applyMatrix4(child.matrixWorld));
      }
      for (let j = 0; j < 3; j++) {
        quadVertices.push(new THREE.Vector3(
          positionAttribute.getX(baseIdx2 + j),
          positionAttribute.getY(baseIdx2 + j),
          positionAttribute.getZ(baseIdx2 + j)
        ).applyMatrix4(child.matrixWorld));
      }

      createBoxFromVertices(quadVertices, position, quaternion, wallMaterial, partType, bodies, curveBoxes);
    }
  }

  console.log(`カーブ壁 (${partType}): ${curveBoxes.length}個のQuadコライダーを作成`);
  meshData.push({ child, partType, useCurveBoxes: true, curveBoxes: curveBoxes });
}

// 頂点群からBoxコライダーを作成するヘルパー関数
function createBoxFromVertices(vertices, parentPosition, parentQuaternion, wallMaterial, partType, bodies, curveBoxes) {
  if (vertices.length < 3) return;

  // 最初の3頂点から面の向きを計算
  const v0 = vertices[0];
  const v1 = vertices[1];
  const v2 = vertices[2];

  // 面の法線を計算（三角形から）
  const edge1 = new THREE.Vector3().subVectors(v1, v0);
  const edge2 = new THREE.Vector3().subVectors(v2, v0);
  const normal = new THREE.Vector3().crossVectors(edge1, edge2).normalize();

  // 面のローカル座標系を構築
  // tangent: 辺の方向（横方向）
  const tangent = edge1.clone().normalize();
  // bitangent: 法線と接線の外積（縦方向）
  const bitangent = new THREE.Vector3().crossVectors(normal, tangent).normalize();

  // 回転行列を作成
  const rotationMatrix = new THREE.Matrix4();
  rotationMatrix.makeBasis(tangent, bitangent, normal);
  const boxQuaternion = new THREE.Quaternion().setFromRotationMatrix(rotationMatrix);

  // 中心を計算
  const center = new THREE.Vector3();
  for (const v of vertices) {
    center.add(v);
  }
  center.divideScalar(vertices.length);

  // 頂点をローカル座標系に変換してサイズを計算
  const inverseRotation = boxQuaternion.clone().invert();
  let minLocal = new THREE.Vector3(Infinity, Infinity, Infinity);
  let maxLocal = new THREE.Vector3(-Infinity, -Infinity, -Infinity);

  for (const v of vertices) {
    const localV = v.clone().sub(center).applyQuaternion(inverseRotation);
    minLocal.min(localV);
    maxLocal.max(localV);
  }

  let sizeX = maxLocal.x - minLocal.x;
  let sizeY = maxLocal.y - minLocal.y;
  let sizeZ = maxLocal.z - minLocal.z;

  // コライダーサイズを80%に縮小
  const shrinkFactor = 1.0;
  sizeX *= shrinkFactor;
  sizeY *= shrinkFactor;
  sizeZ *= shrinkFactor;

  // 最小サイズを保証
  const minSize = 0.005;
  if (sizeX < minSize) sizeX = minSize;
  if (sizeY < minSize) sizeY = minSize;
  if (sizeZ < minSize) sizeZ = minSize;

  // 親オブジェクト基準のローカルオフセットを計算
  const localOffset = center.clone().sub(parentPosition);
  const inverseParentQuat = parentQuaternion.clone().invert();
  localOffset.applyQuaternion(inverseParentQuat);

  // Boxシェイプを作成
  const halfExtents = new CANNON.Vec3(sizeX / 2, sizeY / 2, sizeZ / 2);
  const boxShape = new CANNON.Box(halfExtents);

  const body = new CANNON.Body({
    mass: 0,
    material: wallMaterial,
    type: CANNON.Body.STATIC
  });
  body.addShape(boxShape);
  body.position.set(center.x, center.y, center.z);
  body.quaternion.set(boxQuaternion.x, boxQuaternion.y, boxQuaternion.z, boxQuaternion.w);

  world.addBody(body);
  bodies.push(body);

  // デバッグメッシュを作成
  let debugMesh = null;
  if (debugGroup) {
    let debugColor = 0x00ffff;
    if (partType === 'wall_left') debugColor = 0x00ff00;
    else if (partType === 'wall_right') debugColor = 0xff00ff;

    const debugGeometry = new THREE.BoxGeometry(sizeX, sizeY, sizeZ);
    const debugMaterial = new THREE.MeshBasicMaterial({
      color: debugColor,
      wireframe: true,
      transparent: true,
      opacity: 0.5
    });
    debugMesh = new THREE.Mesh(debugGeometry, debugMaterial);
    debugMesh.position.copy(center);
    debugMesh.quaternion.copy(boxQuaternion);
    debugGroup.add(debugMesh);
    debugMeshes.push({ mesh: debugMesh, body: body, isFloor: false, isSpawned: true, partType: partType, isCurveBox: true });
  }

  // ローカル回転を計算（親の回転を打ち消した後のBox回転）
  const localQuat = inverseParentQuat.clone().multiply(boxQuaternion);

  // Boxの情報を保存
  curveBoxes.push({
    body: body,
    localOffset: localOffset.clone(),
    localQuaternion: localQuat,
    size: new THREE.Vector3(sizeX, sizeY, sizeZ),
    debugMesh: debugMesh
  });
}

// メッシュから実際の頂点範囲を計算してBoxコライダーを作成（レールのパーツ用）
function createBoxCollidersFromMesh(child, partType) {
  child.updateWorldMatrix(true, false);

  const geometry = child.geometry;
  const positionAttribute = geometry.getAttribute('position');

  // 実際の頂点からバウンディングボックスを手動で計算
  let minX = Infinity, maxX = -Infinity;
  let minY = Infinity, maxY = -Infinity;
  let minZ = Infinity, maxZ = -Infinity;

  for (let i = 0; i < positionAttribute.count; i++) {
    const x = positionAttribute.getX(i);
    const y = positionAttribute.getY(i);
    const z = positionAttribute.getZ(i);

    // wall_rightの場合、X座標が正の頂点だけを使用（モデルデータの問題を回避）
    if (partType === 'wall_right' && x < 0) {
      continue;
    }
    // wall_leftの場合、X座標が負の頂点だけを使用
    if (partType === 'wall_left' && x > 0) {
      continue;
    }

    minX = Math.min(minX, x);
    maxX = Math.max(maxX, x);
    minY = Math.min(minY, y);
    maxY = Math.max(maxY, y);
    minZ = Math.min(minZ, z);
    maxZ = Math.max(maxZ, z);
  }

  console.log(`${child.name} (${partType}) 頂点範囲: X[${minX.toFixed(3)}, ${maxX.toFixed(3)}], Y[${minY.toFixed(3)}, ${maxY.toFixed(3)}], Z[${minZ.toFixed(3)}, ${maxZ.toFixed(3)}]`);

  // ローカルサイズを計算
  const localSize = new THREE.Vector3(maxX - minX, maxY - minY, maxZ - minZ);

  // ローカル中心を計算
  const localCenter = new THREE.Vector3(
    (minX + maxX) / 2,
    (minY + maxY) / 2,
    (minZ + maxZ) / 2
  );

  // スケールを取得
  const scale = new THREE.Vector3();
  const position = new THREE.Vector3();
  const rotation = new THREE.Quaternion();
  child.matrixWorld.decompose(position, rotation, scale);

  // ワールドサイズを計算
  const worldSize = new THREE.Vector3(
    localSize.x * Math.abs(scale.x),
    localSize.y * Math.abs(scale.y),
    localSize.z * Math.abs(scale.z)
  );

  // ワールド変換を適用
  const worldCenter = localCenter.clone().applyMatrix4(child.matrixWorld);

  // パーツタイプに応じて薄いコライダーを作成
  // floor: 床は薄い板（Y方向を薄く）
  const thickness = 0.01; // 1cm厚

  if (partType === 'floor') {
    // 床: Y方向を薄くする
    worldSize.y = thickness;
    // 床の上面に配置
    worldCenter.y = minY * Math.abs(scale.y) + position.y + thickness / 2;
  }
  return { center: worldCenter, size: worldSize, rotation: rotation };
}

// スポーンされたオブジェクトに当たり判定を追加（Boxコライダーを使用）
export function createSpawnedObjectColliders(spawnedObject) {
  if (!world || !spawnedObject) return null;

  const bodies = [];
  const meshData = [];

  // 壁用のマテリアル（一度だけ作成）
  const wallMaterial = new CANNON.Material('wall');

  // ミニ四駆との摩擦設定（一度だけ作成）
  if (carBody) {
    const existingContact = world.contactmaterials.find(
      cm => (cm.materials[0] === carBody.material && cm.materials[1] === wallMaterial) ||
            (cm.materials[1] === carBody.material && cm.materials[0] === wallMaterial)
    );
    if (!existingContact) {
      const contactMaterial = new CANNON.ContactMaterial(
        carBody.material,
        wallMaterial,
        {
          friction: 0.001,
          restitution: 0.3,
          contactEquationStiffness: 1e8,
          contactEquationRelaxation: 3
        }
      );
      world.addContactMaterial(contactMaterial);
    }
  }

  // オブジェクト内のfloor, laen_left, laen_rightを探す
  spawnedObject.traverse((child) => {
    if (child.isMesh && child.geometry) {
      // メッシュ名、親ノード名、祖父母ノード名をチェック
      const meshName = child.name.toLowerCase();
      const parentName = child.parent ? child.parent.name.toLowerCase() : '';
      const grandParentName = child.parent?.parent ? child.parent.parent.name.toLowerCase() : '';

      console.log(`メッシュ探索: name=${child.name}, parent=${child.parent?.name}, grandParent=${child.parent?.parent?.name}`);

      // floor, laen_left, laen_rightに当たり判定をつける（どの階層でもマッチ）
      const allNames = meshName + ' ' + parentName + ' ' + grandParentName;

      // パーツタイプを判定
      let partType = null;
      let useTrimesh = false; // カーブ用にTrimeshを使うか

      if (allNames.includes('floor')) {
        partType = 'floor';
        // caveのfloorはカーブなのでTrimesh
        if (allNames.includes('cave')) {
          useTrimesh = true;
        }
      } else if (allNames.includes('laen_left')) {
        partType = 'wall_left';
      } else if (allNames.includes('laen_right')) {
        partType = 'wall_right';
      } else if (allNames.includes('cave_left')) {
        partType = 'wall_left';
        useTrimesh = true;
      } else if (allNames.includes('cave_right')) {
        partType = 'wall_right';
        useTrimesh = true;
      } else if (allNames.includes('laen')) {
        // laenだけの場合はX座標で判定
        const tempCenter = new THREE.Vector3();
        child.getWorldPosition(tempCenter);
        partType = tempCenter.x < 0 ? 'wall_left' : 'wall_right';
      } else if (allNames.includes('cave')) {
        // caveだけの場合はX座標で判定（Trimesh使用）
        const tempCenter = new THREE.Vector3();
        child.getWorldPosition(tempCenter);
        partType = tempCenter.x < 0 ? 'wall_left' : 'wall_right';
        useTrimesh = true;
      }

      if (partType) {
        let body;
        let debugMesh;

        if (useTrimesh) {
          // カーブ用に複数のBoxコライダーを作成
          console.log(`当たり判定作成 (${partType}, CurveBoxes): ${child.name}`);
          createCurveBoxColliders(child, partType, wallMaterial, bodies, meshData);
        } else {
          // Boxで当たり判定を作成（laen用）
          const boxData = createBoxCollidersFromMesh(child, partType);

          console.log(`当たり判定作成 (${partType}, Box): ${child.name}, サイズ: ${boxData.size.x.toFixed(3)}, ${boxData.size.y.toFixed(3)}, ${boxData.size.z.toFixed(3)}`);

          const halfExtents = new CANNON.Vec3(
            boxData.size.x / 2,
            boxData.size.y / 2,
            boxData.size.z / 2
          );
          const boxShape = new CANNON.Box(halfExtents);

          body = new CANNON.Body({
            mass: 0,
            material: wallMaterial,
            type: CANNON.Body.STATIC
          });
          body.addShape(boxShape);
          body.position.set(boxData.center.x, boxData.center.y, boxData.center.z);
          body.quaternion.set(boxData.rotation.x, boxData.rotation.y, boxData.rotation.z, boxData.rotation.w);

          world.addBody(body);
          bodies.push(body);

          // デバッグメッシュを作成（Boxで表示）
          if (debugGroup) {
            const debugGeometry = new THREE.BoxGeometry(boxData.size.x, boxData.size.y, boxData.size.z);
            let debugColor = 0x00ffff;
            if (partType === 'wall_left') debugColor = 0x00ff00;
            else if (partType === 'wall_right') debugColor = 0xff00ff;

            const debugMaterial = new THREE.MeshBasicMaterial({
              color: debugColor,
              wireframe: true,
              transparent: true,
              opacity: 0.7
            });
            debugMesh = new THREE.Mesh(debugGeometry, debugMaterial);
            debugMesh.position.copy(boxData.center);
            debugMesh.quaternion.copy(boxData.rotation);
            debugGroup.add(debugMesh);
            debugMeshes.push({ mesh: debugMesh, body: body, isFloor: false, isSpawned: true, sourceMesh: child, partType: partType, boxData: boxData });
          }

          meshData.push({ child, body, boxData, partType });
        }
      }
    }
  });

  // スポーンされたボディを保存
  spawnedBodies.push({ object: spawnedObject, bodies, meshData });

  console.log(`スポーンオブジェクトに${bodies.length}個のBox当たり判定を追加`);

  return bodies;
}

// スポーンされたオブジェクトの当たり判定を更新（移動時）
export function updateSpawnedObjectColliders(spawnedObject) {
  const spawnedData = spawnedBodies.find(item => item.object === spawnedObject);
  if (!spawnedData) return;

  // スポーンオブジェクト全体のマトリックスを更新
  spawnedObject.updateWorldMatrix(true, true);

  for (const data of spawnedData.meshData) {
    if (!data.child) continue;

    // メッシュのワールド座標を再計算
    data.child.updateWorldMatrix(true, false);

    if (data.useCurveBoxes && data.curveBoxes) {
      // カーブ用Boxの場合は各Boxを親の移動に合わせて更新
      const scale = new THREE.Vector3();
      const position = new THREE.Vector3();
      const quaternion = new THREE.Quaternion();
      data.child.matrixWorld.decompose(position, quaternion, scale);

      for (const box of data.curveBoxes) {
        if (!box.body) continue;

        // ローカルオフセットを現在の回転で変換してワールド座標を計算
        const worldOffset = box.localOffset.clone().applyQuaternion(quaternion);
        const newPos = position.clone().add(worldOffset);

        // ワールド回転を計算（親の回転 * ローカル回転）
        const worldQuat = box.localQuaternion ?
          quaternion.clone().multiply(box.localQuaternion) : quaternion;

        box.body.position.set(newPos.x, newPos.y, newPos.z);
        box.body.quaternion.set(worldQuat.x, worldQuat.y, worldQuat.z, worldQuat.w);
        box.body.aabbNeedsUpdate = true;

        // デバッグメッシュも更新（直接参照）
        if (box.debugMesh) {
          box.debugMesh.position.copy(newPos);
          box.debugMesh.quaternion.copy(worldQuat);
        }
      }
    } else if (!data.useCurveBoxes && data.body) {
      // Boxの位置と回転を再計算（partTypeを渡す）
      const boxData = createBoxCollidersFromMesh(data.child, data.partType);

      // 物理ボディの位置と回転を更新
      data.body.position.set(boxData.center.x, boxData.center.y, boxData.center.z);
      data.body.quaternion.set(boxData.rotation.x, boxData.rotation.y, boxData.rotation.z, boxData.rotation.w);
      data.body.aabbNeedsUpdate = true;

      // デバッグメッシュも更新
      const debugItem = debugMeshes.find(item => item.body === data.body);
      if (debugItem) {
        debugItem.mesh.position.copy(boxData.center);
        debugItem.mesh.quaternion.copy(boxData.rotation);
      }
    }
  }
}
