import * as THREE from 'three';

/**
 * Dynamic Three.js モジュール
 * Claude APIで生成されたコードを実行して3Dオブジェクトを作成
 */
export function createDynamicThreejs(group, params = {}) {
  const { code = '', prompt = '' } = params;

  console.log('Dynamic Three.js executing code for:', prompt);

  // 生成されたコードで使える変数・関数を用意
  const context = {
    THREE,
    group,
    meshes: [],
    animationCallbacks: []
  };

  try {
    // コードを実行（安全のためFunctionコンストラクタを使用）
    const executeCode = new Function(
      'THREE', 'group', 'meshes', 'animationCallbacks',
      code
    );
    executeCode(THREE, group, context.meshes, context.animationCallbacks);

    console.log('Dynamic Three.js code executed successfully, meshes:', context.meshes.length);
  } catch (error) {
    console.error('Dynamic Three.js code execution error:', error);

    // エラー時はフォールバックとして赤いボックスを表示
    const errorBox = new THREE.Mesh(
      new THREE.BoxGeometry(0.1, 0.1, 0.1),
      new THREE.MeshBasicMaterial({ color: 0xff0000 })
    );
    group.add(errorBox);
    context.meshes.push(errorBox);
  }

  let time = 0;

  return {
    update(deltaTime) {
      time += deltaTime;
      // 登録されたアニメーションコールバックを実行
      for (const callback of context.animationCallbacks) {
        try {
          callback(time, deltaTime);
        } catch (e) {
          console.error('Animation callback error:', e);
        }
      }
    },
    dispose() {
      for (const mesh of context.meshes) {
        if (mesh.geometry) mesh.geometry.dispose();
        if (mesh.material) {
          if (Array.isArray(mesh.material)) {
            mesh.material.forEach(m => m.dispose());
          } else {
            mesh.material.dispose();
          }
        }
      }
    }
  };
}
