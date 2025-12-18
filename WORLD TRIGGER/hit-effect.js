import * as THREE from 'three';

// ヒットエフェクト用
let hitOverlay = null;
let hitFlashIntensity = 0;

// 外部参照
let sceneRef = null;
let cameraRef = null;

// 初期化
export function initHitEffect(scene, camera) {
  sceneRef = scene;
  cameraRef = camera;
}

// ヒットオーバーレイを作成
function createHitOverlay() {
  if (hitOverlay) return;

  const geometry = new THREE.SphereGeometry(0.3, 16, 16);
  const material = new THREE.MeshBasicMaterial({
    color: 0xff0000,
    transparent: true,
    opacity: 0,
    side: THREE.BackSide,
    depthWrite: false,
    depthTest: false
  });
  hitOverlay = new THREE.Mesh(geometry, material);
  hitOverlay.renderOrder = 999;
  hitOverlay.frustumCulled = false;
  sceneRef.add(hitOverlay);
}

// ヒットフラッシュをトリガー
export function triggerHitFlash() {
  hitFlashIntensity = 0.6;
  console.log('ヒット！');
}

// ヒットフラッシュを更新
export function updateHitFlash(deltaTime) {
  if (!hitOverlay) {
    createHitOverlay();
  }

  const cameraPos = new THREE.Vector3();
  cameraRef.getWorldPosition(cameraPos);
  hitOverlay.position.copy(cameraPos);

  if (hitFlashIntensity > 0) {
    hitFlashIntensity -= deltaTime * 2;
    if (hitFlashIntensity < 0) hitFlashIntensity = 0;
  }

  hitOverlay.material.opacity = hitFlashIntensity;
}

// クリーンアップ
export function cleanupHitEffect() {
  if (hitOverlay) {
    sceneRef.remove(hitOverlay);
    hitOverlay.geometry.dispose();
    hitOverlay.material.dispose();
    hitOverlay = null;
  }
  hitFlashIntensity = 0;
}
