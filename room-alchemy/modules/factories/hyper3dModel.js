import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

/**
 * Hyper3D GLBモデルモジュールを作成
 * @param {THREE.Group} group - モジュールのグループ
 * @param {Object} params - パラメータ
 * @param {string} params.glbUrl - GLBファイルのURL
 * @param {number} params.scale - スケール（デフォルト: 0.3）
 * @param {Function} params.onLoad - ロード完了時のコールバック
 * @param {Function} params.onProgress - ロード進捗時のコールバック
 * @param {Function} params.onError - エラー時のコールバック
 * @returns {Object} モジュールインスタンス
 */
export function createHyper3DModel(group, params = {}) {
  const {
    glbUrl,
    scale = 0.3,
    onLoad,
    onProgress,
    onError
  } = params;

  const loader = new GLTFLoader();
  let model = null;
  const meshes = [];

  // GLBをロード
  if (glbUrl) {
    loader.load(
      glbUrl,
      (gltf) => {
        model = gltf.scene;

        // スケール調整
        model.scale.set(scale, scale, scale);

        // バウンディングボックスで中心を調整
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        model.position.sub(center);
        model.position.y += (box.max.y - box.min.y) * scale / 2;

        // メッシュを収集
        model.traverse((child) => {
          if (child.isMesh) {
            meshes.push(child);
            // MRでの表示のためにマテリアル調整
            if (child.material) {
              child.material.side = THREE.DoubleSide;
            }
          }
        });

        group.add(model);
        console.log('Hyper3D model loaded:', glbUrl);

        // ロード完了コールバック
        if (onLoad) {
          onLoad(model);
        }
      },
      (progress) => {
        const percent = (progress.loaded / progress.total * 100).toFixed(1);
        console.log('Loading progress:', percent + '%');

        // 進捗コールバック
        if (onProgress) {
          onProgress(progress.loaded, progress.total);
        }
      },
      (error) => {
        console.error('Failed to load GLB:', error);
        // フォールバック: プレースホルダーを表示
        createPlaceholder(group, meshes);

        // エラーコールバック
        if (onError) {
          onError(error);
        }
      }
    );
  } else {
    // URLがない場合はプレースホルダー
    createPlaceholder(group, meshes);
  }

  return {
    meshes,
    model,

    update(deltaTime) {
      // オプション: ゆっくり回転
      // if (model) {
      //   model.rotation.y += deltaTime * 0.5;
      // }
    },

    dispose() {
      meshes.forEach(mesh => {
        if (mesh.geometry) mesh.geometry.dispose();
        if (mesh.material) {
          if (Array.isArray(mesh.material)) {
            mesh.material.forEach(m => m.dispose());
          } else {
            mesh.material.dispose();
          }
        }
      });
    }
  };
}

/**
 * プレースホルダーを作成
 */
function createPlaceholder(group, meshes) {
  const geometry = new THREE.BoxGeometry(0.1, 0.1, 0.1);
  const material = new THREE.MeshBasicMaterial({
    color: 0x00ffff,
    wireframe: true
  });
  const placeholder = new THREE.Mesh(geometry, material);
  group.add(placeholder);
  meshes.push(placeholder);
}
