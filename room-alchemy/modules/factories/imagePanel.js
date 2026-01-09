import * as THREE from 'three';

/**
 * ImagePanel モジュール
 * 画像を3D空間に表示するパネル
 *
 * params:
 *   imageUrl: string - 画像URL (required)
 *   width: number - パネル幅 (default: 0.3)
 *   height: number - パネル高さ (default: 0.3)
 *   doubleSided: boolean - 両面表示 (default: true)
 */
export function createImagePanel(group, params = {}) {
  const {
    imageUrl = '',
    width = 0.3,
    height = 0.3,
    doubleSided = true
  } = params;

  // プレースホルダージオメトリ
  const geometry = new THREE.PlaneGeometry(width, height);

  // ローディング中のマテリアル
  const loadingMaterial = new THREE.MeshBasicMaterial({
    color: 0x333333,
    side: doubleSided ? THREE.DoubleSide : THREE.FrontSide,
    transparent: true,
    opacity: 0.8
  });

  const mesh = new THREE.Mesh(geometry, loadingMaterial);
  group.add(mesh);

  // テクスチャをロード
  let texture = null;
  let material = loadingMaterial;

  if (imageUrl) {
    const textureLoader = new THREE.TextureLoader();
    textureLoader.crossOrigin = 'anonymous';

    textureLoader.load(
      imageUrl,
      (loadedTexture) => {
        texture = loadedTexture;
        material = new THREE.MeshBasicMaterial({
          map: texture,
          side: doubleSided ? THREE.DoubleSide : THREE.FrontSide,
          transparent: true
        });
        mesh.material = material;
        loadingMaterial.dispose();
        console.log('ImagePanel texture loaded:', imageUrl);
      },
      undefined,
      (error) => {
        console.error('ImagePanel texture load error:', error);
        // エラー時は赤色に
        loadingMaterial.color.set(0xff0000);
      }
    );
  }

  // インスタンスを返す
  return {
    mesh,
    geometry,

    update(deltaTime) {
      // 画像パネルは特に更新処理なし
    },

    dispose() {
      geometry.dispose();
      if (material) material.dispose();
      if (texture) texture.dispose();
      loadingMaterial.dispose();
    },

    // 画像を変更
    setImage(newImageUrl) {
      const textureLoader = new THREE.TextureLoader();
      textureLoader.crossOrigin = 'anonymous';

      textureLoader.load(
        newImageUrl,
        (loadedTexture) => {
          if (texture) texture.dispose();
          texture = loadedTexture;

          if (material && material !== loadingMaterial) {
            material.map = texture;
            material.needsUpdate = true;
          } else {
            material = new THREE.MeshBasicMaterial({
              map: texture,
              side: doubleSided ? THREE.DoubleSide : THREE.FrontSide,
              transparent: true
            });
            mesh.material = material;
          }
        }
      );
    },

    // サイズを変更
    setSize(newWidth, newHeight) {
      geometry.dispose();
      const newGeometry = new THREE.PlaneGeometry(newWidth, newHeight);
      mesh.geometry = newGeometry;
    }
  };
}
