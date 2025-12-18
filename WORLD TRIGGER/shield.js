import * as THREE from 'three';

// シールド用変数
let shieldGroup = null;
let shieldMesh = null;
let shieldMaterial = null;
let borderMesh = null;
let shieldProgress = 0;
let targetShieldProgress = 0;

// シールドのサイズ（手のひらサイズに合わせる）
const SHIELD_RADIUS = 0.12;
const SHIELD_THICKNESS = 0.005;

// シールドを作成
export function createShield(scene) {
  shieldGroup = new THREE.Group();

  // シールドのジオメトリ（薄い六角形）
  const geometry = new THREE.CylinderGeometry(SHIELD_RADIUS, SHIELD_RADIUS, SHIELD_THICKNESS, 6);

  // シールドのマテリアル
  shieldMaterial = new THREE.MeshPhongMaterial({
    color: 0x88ffcc,       // 白っぽいグリーン
    emissive: 0x225544,    // 自己発光
    specular: 0xffffff,    // 反射光
    shininess: 90,         // 光沢

    transparent: true,
    opacity: 0,            // 初期状態は透明

    side: THREE.DoubleSide,
    depthWrite: false,
    blending: THREE.AdditiveBlending
  });

  shieldMesh = new THREE.Mesh(geometry, shieldMaterial);

  // 向きの調整（CylinderGeometryはY軸方向に伸びるので、X軸回転で前方を向かせる）
  // hand-tracking.jsでquaternionが設定されるので、ローカルでは前方(Z-)を向くようにする
  shieldMesh.rotation.x = Math.PI / 2;

  shieldGroup.add(shieldMesh);

  // 輪郭線
  const edges = new THREE.EdgesGeometry(geometry);
  const lineMaterial = new THREE.LineBasicMaterial({
    color: 0xccffee,
    linewidth: 2,
    transparent: true,
    opacity: 0
  });
  borderMesh = new THREE.LineSegments(edges, lineMaterial);
  borderMesh.rotation.x = Math.PI / 2;
  shieldGroup.add(borderMesh);

  shieldGroup.visible = false;
  scene.add(shieldGroup);
}

// シールドのアニメーションを更新
export function updateShield(time, isFiring) {
  if (!shieldGroup) return;

  // プログレスをスムーズに変化
  shieldProgress += (targetShieldProgress - shieldProgress) * 0.1;

  // シールドの表示/非表示
  shieldGroup.visible = shieldProgress > 0.01;

  // シールドのスケールとオパシティをプログレスに連動
  const scale = shieldProgress;
  shieldMesh.scale.set(scale, 1, scale);
  borderMesh.scale.set(scale, 1, scale);

  // オパシティ
  shieldMaterial.opacity = 0.6 * shieldProgress;
  borderMesh.material.opacity = 0.8 * shieldProgress;

  // 微妙なパルス効果
  const pulse = 1 + Math.sin(time * 3) * 0.02;
  shieldMesh.scale.multiplyScalar(pulse);
}

// シールドのターゲットプログレスを設定
export function setTargetShieldProgress(progress) {
  targetShieldProgress = progress;
}

// シールドのランダムディレイをリセット（互換性のため残す）
export function resetShieldRandomDelays() {
  // シンプルなシールドなので何もしない
}

// シールドグループを取得
export function getShieldGroup() {
  return shieldGroup;
}
