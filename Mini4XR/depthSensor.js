import * as THREE from 'three';

// 深度センサー用変数
let depthDataTexture = null;
let depthMesh = null;
let showDepthVisualization = false;

// 深度可視化用のメッシュを作成
export function createDepthVisualizationMesh(scene) {
  const geometry = new THREE.PlaneGeometry(2, 2, 128, 128);
  const material = new THREE.ShaderMaterial({
    uniforms: {
      depthTexture: { value: null },
      depthWidth: { value: 0 },
      depthHeight: { value: 0 },
      rawValueToMeters: { value: 0 },
      maxDistance: { value: 5.0 }
    },
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform sampler2D depthTexture;
      uniform float rawValueToMeters;
      uniform float maxDistance;
      varying vec2 vUv;

      vec3 depthToColor(float depth) {
        float normalizedDepth = clamp(depth / maxDistance, 0.0, 1.0);
        vec3 nearColor = vec3(1.0, 0.0, 0.0);
        vec3 midColor = vec3(1.0, 1.0, 0.0);
        vec3 farColor = vec3(0.0, 0.0, 1.0);

        if (normalizedDepth < 0.5) {
          return mix(nearColor, midColor, normalizedDepth * 2.0);
        } else {
          return mix(midColor, farColor, (normalizedDepth - 0.5) * 2.0);
        }
      }

      void main() {
        vec4 depthData = texture2D(depthTexture, vUv);
        float rawDepth = depthData.r + depthData.g * 256.0;
        float depthInMeters = rawDepth * rawValueToMeters;

        if (depthInMeters <= 0.0 || depthInMeters > maxDistance) {
          gl_FragColor = vec4(0.0, 0.0, 0.0, 0.3);
        } else {
          vec3 color = depthToColor(depthInMeters);
          gl_FragColor = vec4(color, 0.7);
        }
      }
    `,
    transparent: true,
    side: THREE.DoubleSide
  });

  depthMesh = new THREE.Mesh(geometry, material);
  depthMesh.position.set(0, 1.5, -2);
  depthMesh.visible = showDepthVisualization;
  scene.add(depthMesh);
}

// 深度情報を更新
export function updateDepthInfo(frame, referenceSpace, scene, camera) {
  if (!showDepthVisualization) {
    if (depthMesh) {
      depthMesh.visible = false;
    }
    return;
  }

  const viewerPose = frame.getViewerPose(referenceSpace);
  if (!viewerPose) return;

  for (const view of viewerPose.views) {
    if (view.camera) {
      const depthInfo = frame.getDepthInformation(view);
      if (depthInfo) {
        if (!depthMesh) {
          createDepthVisualizationMesh(scene);
        }

        // 深度データをテクスチャに変換
        const depthData = new Uint8Array(depthInfo.data);
        if (!depthDataTexture ||
            depthDataTexture.image.width !== depthInfo.width ||
            depthDataTexture.image.height !== depthInfo.height) {
          depthDataTexture = new THREE.DataTexture(
            depthData,
            depthInfo.width,
            depthInfo.height,
            THREE.LuminanceAlphaFormat,
            THREE.UnsignedByteType
          );
        } else {
          depthDataTexture.image.data.set(depthData);
        }
        depthDataTexture.needsUpdate = true;

        // シェーダーのuniformを更新
        depthMesh.material.uniforms.depthTexture.value = depthDataTexture;
        depthMesh.material.uniforms.depthWidth.value = depthInfo.width;
        depthMesh.material.uniforms.depthHeight.value = depthInfo.height;
        depthMesh.material.uniforms.rawValueToMeters.value = depthInfo.rawValueToMeters;

        // 深度メッシュをカメラの前に配置
        const cameraPosition = new THREE.Vector3();
        const cameraQuaternion = new THREE.Quaternion();
        camera.getWorldPosition(cameraPosition);
        camera.getWorldQuaternion(cameraQuaternion);

        const forward = new THREE.Vector3(0, 0, -1.5);
        forward.applyQuaternion(cameraQuaternion);
        depthMesh.position.copy(cameraPosition).add(forward);
        depthMesh.quaternion.copy(cameraQuaternion);

        depthMesh.visible = true;
        break;
      }
    }
  }
}

// 深度表示のON/OFF切り替え
export function toggleDepthVisualization() {
  showDepthVisualization = !showDepthVisualization;
  return showDepthVisualization;
}

// 深度表示状態を取得
export function getDepthVisualizationState() {
  return showDepthVisualization;
}

// 深度表示をリセット
export function resetDepthVisualization() {
  showDepthVisualization = false;
}

// 深度関連のリソースをクリーンアップ
export function cleanupDepth(scene) {
  if (depthMesh) {
    scene.remove(depthMesh);
    depthMesh = null;
  }
  depthDataTexture = null;
}
