import * as THREE from 'three';

export class DepthVisualization {
  constructor(scene) {
    this.scene = scene;
    this.mesh = null;
    this.dataTexture = null;
    this.showVisualization = false;
  }

  createMesh() {
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

    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.position.set(0, 1.5, -2);
    this.mesh.visible = this.showVisualization;
    this.scene.add(this.mesh);
  }

  update(frame, referenceSpace, camera) {
    if (!this.showVisualization) {
      if (this.mesh) {
        this.mesh.visible = false;
      }
      return;
    }

    const viewerPose = frame.getViewerPose(referenceSpace);
    if (!viewerPose) return;

    for (const view of viewerPose.views) {
      if (view.camera) {
        const depthInfo = frame.getDepthInformation(view);
        if (depthInfo) {
          if (!this.mesh) {
            this.createMesh();
          }

          // 深度データをテクスチャに変換
          const depthData = new Uint8Array(depthInfo.data);
          if (!this.dataTexture ||
              this.dataTexture.image.width !== depthInfo.width ||
              this.dataTexture.image.height !== depthInfo.height) {
            this.dataTexture = new THREE.DataTexture(
              depthData,
              depthInfo.width,
              depthInfo.height,
              THREE.LuminanceAlphaFormat,
              THREE.UnsignedByteType
            );
          } else {
            this.dataTexture.image.data.set(depthData);
          }
          this.dataTexture.needsUpdate = true;

          // シェーダーのuniformを更新
          this.mesh.material.uniforms.depthTexture.value = this.dataTexture;
          this.mesh.material.uniforms.depthWidth.value = depthInfo.width;
          this.mesh.material.uniforms.depthHeight.value = depthInfo.height;
          this.mesh.material.uniforms.rawValueToMeters.value = depthInfo.rawValueToMeters;

          // 深度メッシュをカメラの前に配置
          const cameraPosition = new THREE.Vector3();
          const cameraQuaternion = new THREE.Quaternion();
          camera.getWorldPosition(cameraPosition);
          camera.getWorldQuaternion(cameraQuaternion);

          const forward = new THREE.Vector3(0, 0, -1.5);
          forward.applyQuaternion(cameraQuaternion);
          this.mesh.position.copy(cameraPosition).add(forward);
          this.mesh.quaternion.copy(cameraQuaternion);

          this.mesh.visible = true;
          break;
        }
      }
    }
  }

  toggle() {
    this.showVisualization = !this.showVisualization;
    return this.showVisualization;
  }

  isEnabled() {
    return this.showVisualization;
  }

  setEnabled(enabled) {
    this.showVisualization = enabled;
  }

  dispose() {
    if (this.mesh) {
      this.scene.remove(this.mesh);
      this.mesh.geometry.dispose();
      this.mesh.material.dispose();
      this.mesh = null;
    }
    if (this.dataTexture) {
      this.dataTexture.dispose();
      this.dataTexture = null;
    }
  }
}
