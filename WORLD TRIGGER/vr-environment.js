import * as THREE from 'three';

// 深度センサー用変数
let depthDataTexture = null;
let depthMesh = null;
let showDepthVisualization = false;

// VR用背景とグリッド
let vrBackground = null;
let gridHelper = null;

// プレーンメッシュ
let planeMeshes = [];

// レイキャスト用
let raycaster = new THREE.Raycaster();
let beamMaxLength = 10; // 最大ビーム長

// 再利用可能なベクトル（GC回避）
const _cameraPosition = new THREE.Vector3();
const _cameraQuaternion = new THREE.Quaternion();
const _forward = new THREE.Vector3();

// 深度テクスチャを直接更新するための参照
let depthTextureData = null;

// オクルージョン用深度テクスチャ
let occlusionDepthTexture = null;
let occlusionRawValueToMeters = 0;
let occlusionWidth = 0;
let occlusionHeight = 0;
let occlusionDepthData = null;
let occlusionNormDepthBufferFromNormView = null; // 座標変換マトリックス

// オクルージョン深度情報を取得
export function getOcclusionDepthInfo() {
  return {
    texture: occlusionDepthTexture,
    rawValueToMeters: occlusionRawValueToMeters,
    width: occlusionWidth,
    height: occlusionHeight,
    uvTransform: occlusionNormDepthBufferFromNormView
  };
}

function createDepthVisualizationMesh(scene) {
  // 解像度を大幅に下げて高速化（128x128 → 32x32）
  const geometry = new THREE.PlaneGeometry(2, 2, 32, 32);
  const material = new THREE.ShaderMaterial({
    uniforms: {
      depthTexture: { value: null },
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
      precision lowp float;
      uniform sampler2D depthTexture;
      uniform float rawValueToMeters;
      uniform float maxDistance;
      varying vec2 vUv;

      void main() {
        vec4 depthData = texture2D(depthTexture, vUv);
        float rawDepth = depthData.r + depthData.g * 256.0;
        float d = rawDepth * rawValueToMeters;
        float n = clamp(d / maxDistance, 0.0, 1.0);

        // 単純な色計算（分岐削減）
        vec3 color = vec3(1.0 - n, n < 0.5 ? n * 2.0 : 2.0 - n * 2.0, n);
        float alpha = step(0.001, d) * step(d, maxDistance) * 0.7 + 0.1;

        gl_FragColor = vec4(color, alpha);
      }
    `,
    transparent: true,
    side: THREE.DoubleSide,
    depthWrite: false
  });

  depthMesh = new THREE.Mesh(geometry, material);
  depthMesh.position.set(0, 1.5, -2);
  depthMesh.visible = showDepthVisualization;
  depthMesh.frustumCulled = false; // カリング計算をスキップ
  scene.add(depthMesh);
}

export function updateDepthInfo(frame, referenceSpace, timestamp, scene, camera) {
  const viewerPose = frame.getViewerPose(referenceSpace);
  if (!viewerPose || !viewerPose.views[0]) return;

  const view = viewerPose.views[0];
  if (!view.camera) return;

  const depthInfo = frame.getDepthInformation(view);
  if (!depthInfo) return;

  const w = depthInfo.width;
  const h = depthInfo.height;

  // オクルージョン用深度テクスチャを更新
  if (!occlusionDepthTexture || occlusionWidth !== w || occlusionHeight !== h) {
    occlusionWidth = w;
    occlusionHeight = h;
    occlusionDepthData = new Uint8Array(w * h * 2);
    occlusionDepthTexture = new THREE.DataTexture(
      occlusionDepthData,
      w, h,
      THREE.LuminanceAlphaFormat,
      THREE.UnsignedByteType
    );
    occlusionDepthTexture.minFilter = THREE.NearestFilter;
    occlusionDepthTexture.magFilter = THREE.NearestFilter;
    occlusionDepthTexture.generateMipmaps = false;
  }

  occlusionDepthData.set(new Uint8Array(depthInfo.data));
  occlusionDepthTexture.needsUpdate = true;
  occlusionRawValueToMeters = depthInfo.rawValueToMeters;

  // UV変換マトリックスを保存
  if (depthInfo.normDepthBufferFromNormView) {
    occlusionNormDepthBufferFromNormView = depthInfo.normDepthBufferFromNormView;
  }

  // デバッグ表示用
  if (!showDepthVisualization) {
    if (depthMesh) depthMesh.visible = false;
    return;
  }

  if (!depthMesh) {
    createDepthVisualizationMesh(scene);
  }

  // テクスチャが未作成または解像度変更時のみ再作成
  if (!depthDataTexture || depthDataTexture.image.width !== w || depthDataTexture.image.height !== h) {
    depthTextureData = new Uint8Array(w * h * 2);
    depthDataTexture = new THREE.DataTexture(
      depthTextureData,
      w, h,
      THREE.LuminanceAlphaFormat,
      THREE.UnsignedByteType
    );
    depthDataTexture.minFilter = THREE.NearestFilter;
    depthDataTexture.magFilter = THREE.NearestFilter;
    depthDataTexture.generateMipmaps = false;
    depthMesh.material.uniforms.depthTexture.value = depthDataTexture;
  }

  // 直接データをコピー（最速）
  depthTextureData.set(new Uint8Array(depthInfo.data));
  depthDataTexture.needsUpdate = true;

  // uniform更新（rawValueToMetersのみ）
  depthMesh.material.uniforms.rawValueToMeters.value = depthInfo.rawValueToMeters;

  // カメラ追従
  camera.getWorldPosition(_cameraPosition);
  camera.getWorldQuaternion(_cameraQuaternion);
  _forward.set(0, 0, -1.5).applyQuaternion(_cameraQuaternion);
  depthMesh.position.copy(_cameraPosition).add(_forward);
  depthMesh.quaternion.copy(_cameraQuaternion);

  depthMesh.visible = true;
}

// VR環境を作成
export function createVREnvironment(scene) {
  // 黒い背景
  vrBackground = new THREE.Color(0x000000);
  scene.background = vrBackground;

  // 黒基調のグリッド（トリオンカラーのライン）
  gridHelper = new THREE.GridHelper(20, 20, 0x88ffcc, 0x225544);
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

// 検出されたプレーン（壁・テーブル）からメッシュを更新
export function updatePlaneMeshes(frame, referenceSpace, scene) {
  if (!frame.detectedPlanes) return;

  const detectedPlanes = frame.detectedPlanes;
  const existingPlaneIds = new Set();

  for (const plane of detectedPlanes) {
    existingPlaneIds.add(plane);

    // 既存のメッシュを探す
    let existingMesh = planeMeshes.find(m => m.userData.plane === plane);

    if (!existingMesh) {
      // 新しいプレーンのメッシュを作成（透明で見えない）
      const geometry = new THREE.BufferGeometry();
      const material = new THREE.MeshBasicMaterial({
        transparent: true,
        opacity: 0,
        side: THREE.DoubleSide
      });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.userData.plane = plane;
      mesh.userData.lastUpdated = 0;
      scene.add(mesh);
      planeMeshes.push(mesh);
      existingMesh = mesh;
    }

    // プレーンのポーズを取得
    const planePose = frame.getPose(plane.planeSpace, referenceSpace);
    if (planePose) {
      existingMesh.position.set(
        planePose.transform.position.x,
        planePose.transform.position.y,
        planePose.transform.position.z
      );
      existingMesh.quaternion.set(
        planePose.transform.orientation.x,
        planePose.transform.orientation.y,
        planePose.transform.orientation.z,
        planePose.transform.orientation.w
      );

      // ポリゴンの頂点からジオメトリを更新
      const polygon = plane.polygon;
      if (polygon && polygon.length >= 3) {
        const vertices = [];
        const indices = [];

        // 頂点を追加
        for (const point of polygon) {
          vertices.push(point.x, 0, point.z);
        }

        // 三角形化（ファンメソッド）
        for (let i = 1; i < polygon.length - 1; i++) {
          indices.push(0, i, i + 1);
        }

        existingMesh.geometry.dispose();
        existingMesh.geometry = new THREE.BufferGeometry();
        existingMesh.geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
        existingMesh.geometry.setIndex(indices);
        existingMesh.geometry.computeVertexNormals();
      }
    }
  }

  // 削除されたプレーンのメッシュを削除
  planeMeshes = planeMeshes.filter(mesh => {
    if (!existingPlaneIds.has(mesh.userData.plane)) {
      scene.remove(mesh);
      mesh.geometry.dispose();
      mesh.material.dispose();
      return false;
    }
    return true;
  });
}

// ビームのレイキャストで壁・テーブル・シールドとの衝突を検出
export function getBeamHitDistance(beamOrigin, beamDirection, shieldCollisionMesh, shieldGroup, isLeftHandOpen, shieldProgress, setIsBeamHittingShield, setImpactPoint) {
  raycaster.set(beamOrigin, beamDirection);
  raycaster.far = beamMaxLength;

  let closestDistance = beamMaxLength;
  let hitType = null;
  let hitPoint = null;

  // 壁・テーブルとの衝突をチェック
  if (planeMeshes.length > 0) {
    const planeIntersects = raycaster.intersectObjects(planeMeshes, false);
    if (planeIntersects.length > 0 && planeIntersects[0].distance < closestDistance) {
      closestDistance = planeIntersects[0].distance;
      hitType = 'plane';
      hitPoint = planeIntersects[0].point.clone();
    }
  }

  // シールドとの衝突をチェック（左手が開いてシールドが展開中の場合）
  if (shieldCollisionMesh && shieldGroup && shieldGroup.visible && isLeftHandOpen && shieldProgress > 0.3) {
    // ワールド座標でレイキャスト
    shieldCollisionMesh.updateMatrixWorld(true);
    const shieldIntersects = raycaster.intersectObject(shieldCollisionMesh, false);
    if (shieldIntersects.length > 0 && shieldIntersects[0].distance < closestDistance) {
      closestDistance = shieldIntersects[0].distance;
      hitType = 'shield';
      hitPoint = shieldIntersects[0].point.clone();
    }
  }

  // シールドに当たっている場合のフラグと衝撃点を更新
  setIsBeamHittingShield(hitType === 'shield');
  if (hitType === 'shield' && hitPoint) {
    // 衝撃点をシールドのローカル座標に変換して保存
    const localHitPoint = hitPoint.clone();
    shieldGroup.worldToLocal(localHitPoint);
    setImpactPoint(hitPoint);
  }

  return closestDistance;
}

// 深度表示の切り替え
export function toggleDepthVisualization() {
  showDepthVisualization = !showDepthVisualization;
  return showDepthVisualization;
}

// 深度表示の状態を取得
export function getShowDepthVisualization() {
  return showDepthVisualization;
}

// 深度表示の状態を設定
export function setShowDepthVisualization(value) {
  showDepthVisualization = value;
}

// クリーンアップ
export function cleanupDepth(scene) {
  if (depthMesh) {
    scene.remove(depthMesh);
    depthMesh = null;
  }
  depthDataTexture = null;
  depthTextureData = null;
  occlusionDepthTexture = null;
  occlusionDepthData = null;
}

// オクルージョン対応シェーダーマテリアルを作成
export function createOcclusionMaterial(baseColor, emissiveColor, opacity, isAdditive = true) {
  return new THREE.ShaderMaterial({
    uniforms: {
      baseColor: { value: new THREE.Color(baseColor) },
      emissiveColor: { value: new THREE.Color(emissiveColor || 0x000000) },
      opacity: { value: opacity },
      depthTexture: { value: null },
      rawValueToMeters: { value: 0 },
      maxOcclusionDistance: { value: 1.0 }, // 1m以上はオクルージョン無効
      uvTransform: { value: new THREE.Matrix4() }
    },
    vertexShader: `
      varying vec4 vClipPos;
      varying float vViewZ;
      void main() {
        vec4 viewPos = modelViewMatrix * vec4(position, 1.0);
        vViewZ = -viewPos.z;
        vec4 clipPos = projectionMatrix * viewPos;
        vClipPos = clipPos;
        gl_Position = clipPos;
      }
    `,
    fragmentShader: `
      uniform vec3 baseColor;
      uniform vec3 emissiveColor;
      uniform float opacity;
      uniform sampler2D depthTexture;
      uniform float rawValueToMeters;
      uniform float maxOcclusionDistance;
      uniform mat4 uvTransform;
      varying vec4 vClipPos;
      varying float vViewZ;

      void main() {
        // スクリーンUV座標を計算（0〜1の範囲）
        vec2 screenUV = (vClipPos.xy / vClipPos.w) * 0.5 + 0.5;
        // UV変換を適用
        vec4 uvCoord = uvTransform * vec4(screenUV, 0.0, 1.0);
        vec2 depthUV = uvCoord.xy;

        // 深度テクスチャから深度を取得
        vec4 depthData = texture2D(depthTexture, depthUV);
        float rawDepth = depthData.r + depthData.g * 256.0;
        float realWorldDepth = rawDepth * rawValueToMeters;

        // 手だけオクルージョン：0.15m〜0.8mの範囲のみ
        float minHandDistance = 0.15;
        float maxHandDistance = 0.8;

        float occlusionAlpha = 1.0;
        if (rawValueToMeters > 0.0 && realWorldDepth > minHandDistance && realWorldDepth < maxHandDistance) {
          if (vViewZ > realWorldDepth + 0.02) {
            occlusionAlpha = 0.0;
          }
        }

        vec3 color = baseColor + emissiveColor;
        gl_FragColor = vec4(color, opacity * occlusionAlpha);
      }
    `,
    transparent: true,
    side: THREE.DoubleSide,
    depthWrite: false,
    blending: isAdditive ? THREE.AdditiveBlending : THREE.NormalBlending
  });
}

// マテリアルの深度テクスチャを更新
export function updateMaterialDepth(material) {
  if (material && material.uniforms && occlusionDepthTexture) {
    material.uniforms.depthTexture.value = occlusionDepthTexture;
    material.uniforms.rawValueToMeters.value = occlusionRawValueToMeters;
    if (material.uniforms.uvTransform && occlusionNormDepthBufferFromNormView) {
      const m = occlusionNormDepthBufferFromNormView.matrix;
      material.uniforms.uvTransform.value.set(
        m[0], m[4], m[8], m[12],
        m[1], m[5], m[9], m[13],
        m[2], m[6], m[10], m[14],
        m[3], m[7], m[11], m[15]
      );
    }
  }
}
