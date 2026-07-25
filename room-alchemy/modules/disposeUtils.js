/**
 * Three.js のリソース破棄ユーティリティ
 *
 * material.dispose() はマテリアルが参照しているテクスチャを解放しない。
 * 生成コードは CanvasTexture や画像テクスチャを大量に作るため、
 * これを取りこぼすと GPU メモリが解放されないまま積み上がる。
 */

/**
 * マテリアルと、それが参照している全テクスチャを破棄する
 * @param {THREE.Material} material
 */
export function disposeMaterial(material) {
  if (!material) return;

  // map, normalMap, alphaMap, emissiveMap ... プロパティ名は多数あるため
  // isTexture を持つ値を総なめして解放する
  for (const key of Object.keys(material)) {
    const value = material[key];
    if (value && value.isTexture) {
      value.dispose();
    }
  }

  material.dispose();
}

/**
 * オブジェクト配下の geometry / material / texture をすべて破棄する
 * @param {THREE.Object3D} root
 */
export function disposeObject3D(root) {
  if (!root) return;

  root.traverse((child) => {
    if (child.geometry) child.geometry.dispose();

    if (child.material) {
      if (Array.isArray(child.material)) {
        child.material.forEach(m => disposeMaterial(m));
      } else {
        disposeMaterial(child.material);
      }
    }

    // Sprite など material 以外にテクスチャを持つ場合の保険
    if (child.texture && child.texture.isTexture) {
      child.texture.dispose();
    }
  });
}
