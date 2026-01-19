import * as THREE from 'three';

// VR用背景とグリッド
let vrBackground = null;
let gridHelper = null;

// VR環境を作成
export function createVREnvironment(scene) {
  // 背景色を設定
  vrBackground = new THREE.Color(0x1a1a2e);
  scene.background = vrBackground;

  // グリッドヘルパーを追加
  gridHelper = new THREE.GridHelper(20, 20, 0x444444, 0x222222);
  gridHelper.position.y = 0;
  scene.add(gridHelper);
}

// VR環境を削除
export function removeVREnvironment(scene) {
  scene.background = null;
  if (gridHelper) {
    scene.remove(gridHelper);
    gridHelper = null;
  }
  vrBackground = null;
}
