import * as THREE from 'three';

let scene, camera, renderer, box;
let xrSession = null;
let rightController = null;
let leftController = null;
let boxPositioned = false;

// 深度センサー用変数
let depthDataTexture = null;
let depthMesh = null;
let showDepthVisualization = false;

// VR用背景とグリッド
let vrBackground = null;
let gridHelper = null;

// ハンドトラッキング用変数
let hand1 = null;
let hand2 = null;

// シールド用変数
let shieldGroup = null;
let hexagonMeshes = [];
let shieldParticles = null;
let particleGeometry = null;
let particleMaterial = null;
let particleSpeeds = [];
let shieldProgress = 0;
let targetShieldProgress = 0;
let isLeftHandOpen = false;
let shieldRadius = 0.25; // 手の前に表示するので小さめに
let impactTime = -10;
let impactPoint = new THREE.Vector3();

// シーンの初期化
function init() {
  // シーン作成
  scene = new THREE.Scene();

  // カメラ作成
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  // レンダラー作成
  renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.xr.enabled = true;

  const appDiv = document.getElementById('app');
  appDiv.appendChild(renderer.domElement);

  // ライト設定
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
  directionalLight.position.set(1, 1, 1);
  scene.add(directionalLight);

  // ボックスを作成
  createBox();

  // シールドを作成
  createShield();

  // リサイズ対応
  window.addEventListener('resize', onWindowResize);

  // アニメーションループ
  renderer.setAnimationLoop(animate);
}

// ボックスを作成
function createBox() {
  const geometry = new THREE.BoxGeometry(0.15, 0.15, 0.15);
  const material = new THREE.MeshStandardMaterial({
    color: 0x4CAF50,
    metalness: 0.3,
    roughness: 0.7
  });
  box = new THREE.Mesh(geometry, material);
  box.position.set(0, 0, -2);
  scene.add(box);
}

// ========== シールドエフェクト ==========

// Geodesic dome用の六角形を作成
function createGeodesicHexagons(radius, subdivisions) {
  const hexagons = [];

  const t = (1 + Math.sqrt(5)) / 2;

  const icoVertices = [
    [-1, t, 0], [1, t, 0], [-1, -t, 0], [1, -t, 0],
    [0, -1, t], [0, 1, t], [0, -1, -t], [0, 1, -t],
    [t, 0, -1], [t, 0, 1], [-t, 0, -1], [-t, 0, 1]
  ].map(v => new THREE.Vector3(...v).normalize());

  const icoFaces = [
    [0, 11, 5], [0, 5, 1], [0, 1, 7], [0, 7, 10], [0, 10, 11],
    [1, 5, 9], [5, 11, 4], [11, 10, 2], [10, 7, 6], [7, 1, 8],
    [3, 9, 4], [3, 4, 2], [3, 2, 6], [3, 6, 8], [3, 8, 9],
    [4, 9, 5], [2, 4, 11], [6, 2, 10], [8, 6, 7], [9, 8, 1]
  ];

  function subdivideFace(v1, v2, v3, depth) {
    if (depth === 0) {
      return [[v1.clone(), v2.clone(), v3.clone()]];
    }

    const v12 = new THREE.Vector3().addVectors(v1, v2).normalize();
    const v23 = new THREE.Vector3().addVectors(v2, v3).normalize();
    const v31 = new THREE.Vector3().addVectors(v3, v1).normalize();

    return [
      ...subdivideFace(v1, v12, v31, depth - 1),
      ...subdivideFace(v12, v2, v23, depth - 1),
      ...subdivideFace(v31, v23, v3, depth - 1),
      ...subdivideFace(v12, v23, v31, depth - 1)
    ];
  }

  let triangles = [];
  for (const face of icoFaces) {
    triangles.push(...subdivideFace(icoVertices[face[0]], icoVertices[face[1]], icoVertices[face[2]], subdivisions));
  }

  const vertexMap = new Map();
  const vertices = [];
  const precision = 10000;

  function getVertexKey(v) {
    return `${Math.round(v.x * precision)},${Math.round(v.y * precision)},${Math.round(v.z * precision)}`;
  }

  function getOrCreateVertex(v) {
    const key = getVertexKey(v);
    if (vertexMap.has(key)) return vertexMap.get(key);
    const index = vertices.length;
    vertices.push(v.clone());
    vertexMap.set(key, index);
    return index;
  }

  const vertexTriangles = [];
  for (let i = 0; i < 10000; i++) vertexTriangles.push([]);

  const indexedTriangles = triangles.map((tri, triIndex) => {
    const indices = tri.map(v => getOrCreateVertex(v));
    indices.forEach(vIndex => vertexTriangles[vIndex].push(triIndex));
    return { vertices: tri, indices };
  });

  vertices.forEach((vertex, vIndex) => {
    const surroundingTris = vertexTriangles[vIndex];
    if (!surroundingTris || surroundingTris.length < 5) return;

    if (vertex.z < 0.85) return;

    const centers = surroundingTris.map(triIndex => {
      const tri = indexedTriangles[triIndex].vertices;
      return new THREE.Vector3().add(tri[0]).add(tri[1]).add(tri[2]).divideScalar(3).normalize();
    });

    const normal = vertex.clone();
    let tangent = new THREE.Vector3(1, 0, 0);
    if (Math.abs(normal.dot(tangent)) > 0.9) tangent.set(0, 1, 0);
    const bitangent = new THREE.Vector3().crossVectors(normal, tangent).normalize();
    tangent.crossVectors(bitangent, normal).normalize();

    centers.sort((a, b) => {
      const aLocal = a.clone().sub(vertex);
      const bLocal = b.clone().sub(vertex);
      return Math.atan2(aLocal.dot(bitangent), aLocal.dot(tangent)) - Math.atan2(bLocal.dot(bitangent), bLocal.dot(tangent));
    });

    const randomDelay = Math.random();
    const pulseOffset = Math.random() * Math.PI * 2;

    hexagons.push({
      center: vertex.clone().multiplyScalar(radius),
      vertices: centers.map(c => c.clone().multiplyScalar(radius)),
      normal: vertex.clone(),
      randomDelay: randomDelay,
      pulseOffset: pulseOffset
    });
  });

  return hexagons;
}

function createPolygonMesh(polyData, fillMaterial, lineMaterial) {
  const { center, vertices, normal } = polyData;

  const fillGeom = new THREE.BufferGeometry();
  const positions = [];
  const indices = [];

  positions.push(center.x, center.y, center.z);
  vertices.forEach(v => positions.push(v.x, v.y, v.z));

  for (let i = 0; i < vertices.length; i++) {
    indices.push(0, i + 1, ((i + 1) % vertices.length) + 1);
  }

  fillGeom.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  fillGeom.setIndex(indices);
  fillGeom.computeVertexNormals();

  const fillMesh = new THREE.Mesh(fillGeom, fillMaterial.clone());

  const outlinePoints = [...vertices, vertices[0]];
  const lineGeom = new THREE.BufferGeometry().setFromPoints(outlinePoints);
  const lineMesh = new THREE.Line(lineGeom, lineMaterial.clone());

  return { fill: fillMesh, line: lineMesh, center, normal };
}

// シールドのシェーダーマテリアル
function createHexFillMaterial() {
  return new THREE.ShaderMaterial({
    uniforms: {
      time: { value: 0 },
      shieldProgress: { value: 1 },
      impactTime: { value: -10 },
      impactPoint: { value: new THREE.Vector3() },
      baseColor: { value: new THREE.Color(0x4488ff) },
      pulseOffset: { value: 0 }
    },
    vertexShader: `
      varying vec3 vPosition;
      varying vec3 vWorldPosition;
      varying vec3 vNormal;
      void main() {
        vPosition = position;
        vNormal = normalize(normalMatrix * normal);
        vec4 worldPos = modelMatrix * vec4(position, 1.0);
        vWorldPosition = worldPos.xyz;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float time;
      uniform float shieldProgress;
      uniform float impactTime;
      uniform vec3 impactPoint;
      uniform vec3 baseColor;
      uniform float pulseOffset;
      varying vec3 vPosition;
      varying vec3 vWorldPosition;
      varying vec3 vNormal;

      void main() {
        float pulse = 0.12 + 0.03 * sin(time * 1.5 + pulseOffset);

        vec3 viewDir = normalize(cameraPosition - vWorldPosition);
        float fresnel = 1.0 - abs(dot(viewDir, vNormal));
        fresnel = pow(fresnel, 2.5) * 0.35;

        float impactAge = time - impactTime;
        float impactDist = distance(vWorldPosition, impactPoint);
        float impactWave = sin(impactDist * 12.0 - impactAge * 18.0) * 0.5 + 0.5;
        float impactFade = exp(-impactAge * 2.5) * exp(-impactDist * 1.5);
        float impact = impactWave * impactFade * step(0.0, impactAge) * step(impactAge, 3.0);

        float alpha = (pulse + fresnel + impact * 0.9) * shieldProgress;
        vec3 color = baseColor + vec3(0.4, 0.6, 0.2) * impact;

        gl_FragColor = vec4(color, alpha * 0.7);
      }
    `,
    transparent: true,
    side: THREE.DoubleSide,
    depthWrite: false,
    blending: THREE.AdditiveBlending
  });
}

function createHexLineMaterial() {
  return new THREE.ShaderMaterial({
    uniforms: {
      time: { value: 0 },
      shieldProgress: { value: 1 },
      impactTime: { value: -10 },
      impactPoint: { value: new THREE.Vector3() },
      baseColor: { value: new THREE.Color(0x88ccff) },
      pulseOffset: { value: 0 }
    },
    vertexShader: `
      varying vec3 vWorldPosition;
      void main() {
        vec4 worldPos = modelMatrix * vec4(position, 1.0);
        vWorldPosition = worldPos.xyz;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float time;
      uniform float shieldProgress;
      uniform float impactTime;
      uniform vec3 impactPoint;
      uniform vec3 baseColor;
      uniform float pulseOffset;
      varying vec3 vWorldPosition;

      void main() {
        float brightness = 0.7 + 0.15 * sin(time * 1.5 + pulseOffset);

        float impactAge = time - impactTime;
        float impactDist = distance(vWorldPosition, impactPoint);
        float impactWave = sin(impactDist * 12.0 - impactAge * 18.0) * 0.5 + 0.5;
        float impactFade = exp(-impactAge * 2.5) * exp(-impactDist * 1.2);
        float impact = impactWave * impactFade * step(0.0, impactAge) * step(impactAge, 3.0);

        float alpha = (brightness + impact * 2.5) * shieldProgress;
        vec3 color = baseColor + vec3(0.6, 0.4, 0.0) * impact;

        gl_FragColor = vec4(color, alpha);
      }
    `,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending
  });
}

// シールドを作成
function createShield() {
  shieldGroup = new THREE.Group();
  hexagonMeshes = [];

  const hexFillMaterial = createHexFillMaterial();
  const hexLineMaterial = createHexLineMaterial();

  const hexagonData = createGeodesicHexagons(shieldRadius, 3);

  hexagonData.forEach((hexData) => {
    const meshes = createPolygonMesh(hexData, hexFillMaterial, hexLineMaterial);

    const originalPositions = meshes.fill.geometry.attributes.position.array.slice();
    const originalLinePositions = meshes.line.geometry.attributes.position.array.slice();

    meshes.fill.material.uniforms.pulseOffset.value = hexData.pulseOffset;
    meshes.line.material.uniforms.pulseOffset.value = hexData.pulseOffset;

    meshes.fill.userData = {
      originalPositions: originalPositions,
      center: hexData.center.clone(),
      normal: hexData.normal.clone(),
      randomDelay: hexData.randomDelay
    };
    meshes.line.userData = {
      originalPositions: originalLinePositions,
      center: hexData.center.clone(),
      normal: hexData.normal.clone(),
      randomDelay: hexData.randomDelay
    };

    shieldGroup.add(meshes.fill);
    shieldGroup.add(meshes.line);
    hexagonMeshes.push(meshes);
  });

  // パーティクル
  const particleCount = 30;
  particleGeometry = new THREE.BufferGeometry();
  const particlePositions = new Float32Array(particleCount * 3);
  particleSpeeds = [];

  for (let i = 0; i < particleCount; i++) {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(1 - Math.random() * 0.15);
    const r = shieldRadius + (Math.random() - 0.5) * 0.015;

    particlePositions[i * 3] = Math.sin(phi) * Math.cos(theta) * r;
    particlePositions[i * 3 + 1] = Math.sin(phi) * Math.sin(theta) * r;
    particlePositions[i * 3 + 2] = Math.cos(phi) * r;

    particleSpeeds.push({ theta: (Math.random() - 0.5) * 0.012 });
  }

  particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

  particleMaterial = new THREE.PointsMaterial({
    color: 0x88ddff,
    size: 0.005,
    transparent: true,
    opacity: 0.4,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  });

  shieldParticles = new THREE.Points(particleGeometry, particleMaterial);
  shieldGroup.add(shieldParticles);

  shieldGroup.visible = false;
  scene.add(shieldGroup);
}

// シールドのアニメーションを更新
function updateShield(time) {
  if (!shieldGroup) return;

  // プログレスをスムーズに変化
  shieldProgress += (targetShieldProgress - shieldProgress) * 0.08;

  // シールドの表示/非表示
  shieldGroup.visible = shieldProgress > 0.01;

  hexagonMeshes.forEach((hex) => {
    const randomDelay = hex.fill.userData.randomDelay;

    let localProgress;
    if (targetShieldProgress > 0.5) {
      localProgress = Math.max(0, Math.min(1, (shieldProgress - randomDelay * 0.6) * 2.5));
    } else {
      localProgress = Math.max(0, Math.min(1, (shieldProgress - (1 - randomDelay) * 0.4) * 2.5));
    }

    const scale = localProgress;

    const fillPositions = hex.fill.geometry.attributes.position.array;
    const origFill = hex.fill.userData.originalPositions;
    const center = hex.fill.userData.center;

    for (let i = 0; i < fillPositions.length; i += 3) {
      fillPositions[i] = center.x + (origFill[i] - center.x) * scale;
      fillPositions[i + 1] = center.y + (origFill[i + 1] - center.y) * scale;
      fillPositions[i + 2] = center.z + (origFill[i + 2] - center.z) * scale;
    }
    hex.fill.geometry.attributes.position.needsUpdate = true;

    const linePositions = hex.line.geometry.attributes.position.array;
    const origLine = hex.line.userData.originalPositions;

    for (let i = 0; i < linePositions.length; i += 3) {
      linePositions[i] = center.x + (origLine[i] - center.x) * scale;
      linePositions[i + 1] = center.y + (origLine[i + 1] - center.y) * scale;
      linePositions[i + 2] = center.z + (origLine[i + 2] - center.z) * scale;
    }
    hex.line.geometry.attributes.position.needsUpdate = true;

    hex.fill.material.uniforms.time.value = time;
    hex.fill.material.uniforms.shieldProgress.value = localProgress;
    hex.line.material.uniforms.time.value = time;
    hex.line.material.uniforms.shieldProgress.value = localProgress;

    hex.fill.visible = localProgress > 0.01;
    hex.line.visible = localProgress > 0.01;
  });

  // パーティクル
  if (particleGeometry) {
    const positions = particleGeometry.attributes.position.array;
    for (let i = 0; i < particleSpeeds.length; i++) {
      const angle = particleSpeeds[i].theta;
      const x = positions[i * 3];
      const y = positions[i * 3 + 1];
      positions[i * 3] = x * Math.cos(angle) - y * Math.sin(angle);
      positions[i * 3 + 1] = x * Math.sin(angle) + y * Math.cos(angle);
    }
    particleGeometry.attributes.position.needsUpdate = true;
    particleMaterial.opacity = 0.4 * shieldProgress;
  }
}

// 左手がパー（開いている）かどうかを判定
function isHandOpen(hand, frame, referenceSpace) {
  if (!hand || !frame || !referenceSpace) return false;

  const dominated = [];
  const joints = [
    'thumb-tip', 'index-finger-tip', 'middle-finger-tip', 'ring-finger-tip', 'pinky-finger-tip',
    'wrist'
  ];

  // 各関節の位置を取得
  const jointPositions = {};
  for (const jointName of joints) {
    const jointSpace = hand.get(jointName);
    if (jointSpace) {
      const jointPose = frame.getJointPose(jointSpace, referenceSpace);
      if (jointPose) {
        jointPositions[jointName] = new THREE.Vector3(
          jointPose.transform.position.x,
          jointPose.transform.position.y,
          jointPose.transform.position.z
        );
      }
    }
  }

  // 手首の位置が取得できない場合は判定不能
  if (!jointPositions['wrist']) return false;

  const wrist = jointPositions['wrist'];
  const fingerTips = ['index-finger-tip', 'middle-finger-tip', 'ring-finger-tip', 'pinky-finger-tip'];

  let extendedCount = 0;
  let totalDistance = 0;

  for (const tip of fingerTips) {
    if (jointPositions[tip]) {
      const distance = jointPositions[tip].distanceTo(wrist);
      totalDistance += distance;
      // 手首から指先までの距離が一定以上なら伸びていると判定
      if (distance > 0.1) {
        extendedCount++;
      }
    }
  }

  // 4本中3本以上の指が伸びていればパーと判定
  return extendedCount >= 3;
}

// 左手の位置と向きを取得
function getLeftHandTransform(hand, frame, referenceSpace) {
  if (!hand || !frame || !referenceSpace) return null;

  // 手のひらの中心（wrist）の位置を取得
  const wristSpace = hand.get('wrist');
  const middleMetacarpal = hand.get('middle-finger-metacarpal');

  if (!wristSpace) return null;

  const wristPose = frame.getJointPose(wristSpace, referenceSpace);
  if (!wristPose) return null;

  const position = new THREE.Vector3(
    wristPose.transform.position.x,
    wristPose.transform.position.y,
    wristPose.transform.position.z
  );

  const quaternion = new THREE.Quaternion(
    wristPose.transform.orientation.x,
    wristPose.transform.orientation.y,
    wristPose.transform.orientation.z,
    wristPose.transform.orientation.w
  );

  // 手の前方向（手のひらの向き）
  const forward = new THREE.Vector3(0, 0, -0.15);
  forward.applyQuaternion(quaternion);

  return {
    position: position.add(forward),
    quaternion: quaternion
  };
}

// ========== 深度可視化 ==========

function createDepthVisualizationMesh() {
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

function updateDepthInfo(frame, referenceSpace) {
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
          createDepthVisualizationMesh();
        }

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

        depthMesh.material.uniforms.depthTexture.value = depthDataTexture;
        depthMesh.material.uniforms.depthWidth.value = depthInfo.width;
        depthMesh.material.uniforms.depthHeight.value = depthInfo.height;
        depthMesh.material.uniforms.rawValueToMeters.value = depthInfo.rawValueToMeters;

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

// VR環境を作成
function createVREnvironment() {
  vrBackground = new THREE.Color(0x1a1a2e);
  scene.background = vrBackground;

  gridHelper = new THREE.GridHelper(20, 20, 0x444444, 0x222222);
  gridHelper.position.y = 0;
  scene.add(gridHelper);
}

// VR環境を削除
function removeVREnvironment() {
  scene.background = null;
  if (gridHelper) {
    scene.remove(gridHelper);
    gridHelper = null;
  }
  vrBackground = null;
}

// アニメーションループ
function animate(timestamp, frame) {
  const time = timestamp ? timestamp / 1000 : performance.now() / 1000;

  // XRセッション中の処理
  if (frame && xrSession) {
    const referenceSpace = renderer.xr.getReferenceSpace();

    // 深度情報を更新
    updateDepthInfo(frame, referenceSpace);

    // ボックスを右コントローラーの前に配置
    if (!boxPositioned && box && rightController) {
      const controllerPosition = new THREE.Vector3();
      const controllerQuaternion = new THREE.Quaternion();
      rightController.getWorldPosition(controllerPosition);
      rightController.getWorldQuaternion(controllerQuaternion);

      const forward = new THREE.Vector3(0, 0, -0.3);
      forward.applyQuaternion(controllerQuaternion);

      box.position.set(
        controllerPosition.x + forward.x,
        controllerPosition.y + forward.y,
        controllerPosition.z + forward.z
      );

      if (controllerPosition.lengthSq() > 0) {
        boxPositioned = true;
        console.log('ボックスを右コントローラーの前に配置しました');
      }
    }

    // ボックスをゆっくり回転させる
    if (box) {
      box.rotation.y += 0.01;
      box.rotation.x += 0.005;
    }

    // 左手のハンドトラッキングをチェック
    // hand2が左手（通常）
    let leftHand = null;
    const session = renderer.xr.getSession();
    if (session) {
      for (const inputSource of session.inputSources) {
        if (inputSource.hand && inputSource.handedness === 'left') {
          leftHand = inputSource.hand;
          break;
        }
      }
    }

    if (leftHand) {
      const handOpen = isHandOpen(leftHand, frame, referenceSpace);

      if (handOpen !== isLeftHandOpen) {
        isLeftHandOpen = handOpen;
        targetShieldProgress = handOpen ? 1 : 0;

        if (handOpen) {
          // シールド展開時にランダムディレイをリセット
          hexagonMeshes.forEach(hex => {
            const newDelay = Math.random();
            hex.fill.userData.randomDelay = newDelay;
            hex.line.userData.randomDelay = newDelay;
          });
        }
      }

      // シールドの位置を左手の前に更新
      if (shieldGroup && isLeftHandOpen) {
        const handTransform = getLeftHandTransform(leftHand, frame, referenceSpace);
        if (handTransform) {
          shieldGroup.position.copy(handTransform.position);
          shieldGroup.quaternion.copy(handTransform.quaternion);
        }
      }
    }
  }

  // シールドのアニメーションを更新
  updateShield(time);

  renderer.render(scene, camera);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function updateInfo(text) {
  const info = document.getElementById('info');
  if (info) {
    info.textContent = text;
  }
}

// MRセッション開始
async function startXR() {
  if (!navigator.xr) {
    updateInfo('WebXRがサポートされていません');
    alert('このデバイスはWebXRをサポートしていません');
    return;
  }

  try {
    updateInfo('MRセッションを開始中...');

    const supported = await navigator.xr.isSessionSupported('immersive-ar');

    if (!supported) {
      updateInfo('immersive-ARがサポートされていません');
      alert('このデバイスはAR機能をサポートしていません');
      return;
    }

    xrSession = await navigator.xr.requestSession('immersive-ar', {
      requiredFeatures: [],
      optionalFeatures: ['local-floor', 'bounded-floor', 'depth-sensing', 'plane-detection', 'hand-tracking'],
      depthSensing: {
        usagePreference: ['cpu-optimized', 'gpu-optimized'],
        dataFormatPreference: ['luminance-alpha', 'float32']
      }
    });

    await renderer.xr.setSession(xrSession);

    rightController = renderer.xr.getController(0);
    leftController = renderer.xr.getController(1);
    scene.add(rightController);
    scene.add(leftController);

    hand1 = renderer.xr.getHand(0);
    hand2 = renderer.xr.getHand(1);
    scene.add(hand1);
    scene.add(hand2);

    boxPositioned = false;

    const button = document.getElementById('start-button');
    if (button) {
      button.style.display = 'none';
    }
    const vrButton = document.getElementById('vr-button');
    if (vrButton) {
      vrButton.style.display = 'none';
    }

    window.dispatchEvent(new Event('xr-session-start'));

    updateInfo('MRセッション開始');

    if (xrSession.depthUsage) {
      console.log('深度センサー有効:', xrSession.depthUsage);
      console.log('深度データ形式:', xrSession.depthDataFormat);
      updateInfo('MRセッション開始 (深度センサー有効)');
    } else {
      console.log('深度センサー無効');
      updateInfo('MRセッション開始 (深度センサー無効)');
    }

    xrSession.addEventListener('end', () => {
      xrSession = null;

      if (depthMesh) {
        scene.remove(depthMesh);
        depthMesh = null;
      }
      depthDataTexture = null;

      window.dispatchEvent(new Event('xr-session-end'));

      updateInfo('MRセッション終了');
      if (button) {
        button.style.display = 'block';
      }
      if (vrButton) {
        vrButton.style.display = 'block';
      }
    });

  } catch (error) {
    console.error('XRセッション開始エラー:', error);
    console.error('エラー名:', error.name);
    console.error('エラーメッセージ:', error.message);
    console.error('エラー詳細:', JSON.stringify(error, null, 2));
    updateInfo('エラー: ' + (error.message || error.name || 'Unknown error'));
    alert('MRセッションを開始できませんでした: ' + (error.message || error.name || 'Unknown error'));
  }
}

// VRセッション開始
async function startVR() {
  if (!navigator.xr) {
    updateInfo('WebXRがサポートされていません');
    alert('このデバイスはWebXRをサポートしていません');
    return;
  }

  try {
    updateInfo('VRセッションを開始中...');

    const supported = await navigator.xr.isSessionSupported('immersive-vr');

    if (!supported) {
      updateInfo('immersive-VRがサポートされていません');
      alert('このデバイスはVR機能をサポートしていません');
      return;
    }

    xrSession = await navigator.xr.requestSession('immersive-vr', {
      requiredFeatures: [],
      optionalFeatures: ['local-floor', 'bounded-floor', 'hand-tracking']
    });

    await renderer.xr.setSession(xrSession);

    createVREnvironment();

    rightController = renderer.xr.getController(0);
    leftController = renderer.xr.getController(1);
    scene.add(rightController);
    scene.add(leftController);

    hand1 = renderer.xr.getHand(0);
    hand2 = renderer.xr.getHand(1);
    scene.add(hand1);
    scene.add(hand2);

    boxPositioned = false;

    const button = document.getElementById('start-button');
    if (button) {
      button.style.display = 'none';
    }
    const vrButton = document.getElementById('vr-button');
    if (vrButton) {
      vrButton.style.display = 'none';
    }

    window.dispatchEvent(new Event('xr-session-start'));

    updateInfo('VRセッション開始');

    xrSession.addEventListener('end', () => {
      xrSession = null;

      removeVREnvironment();

      window.dispatchEvent(new Event('xr-session-end'));

      updateInfo('VRセッション終了');
      if (button) {
        button.style.display = 'block';
      }
      if (vrButton) {
        vrButton.style.display = 'block';
      }
    });

  } catch (error) {
    console.error('VRセッション開始エラー:', error);
    console.error('エラー名:', error.name);
    console.error('エラーメッセージ:', error.message);
    console.error('エラー詳細:', JSON.stringify(error, null, 2));
    updateInfo('エラー: ' + (error.message || error.name || 'Unknown error'));
    alert('VRセッションを開始できませんでした: ' + (error.message || error.name || 'Unknown error'));
  }
}

// 初期化実行
init();

// ボタンのイベントリスナー
const startButton = document.getElementById('start-button');
if (startButton) {
  startButton.addEventListener('click', startXR);
}

const vrButton = document.getElementById('vr-button');
if (vrButton) {
  vrButton.addEventListener('click', startVR);
}

// 深度表示切り替えボタン
const depthToggleButton = document.getElementById('depth-toggle');
if (depthToggleButton) {
  depthToggleButton.addEventListener('click', () => {
    showDepthVisualization = !showDepthVisualization;
    depthToggleButton.textContent = showDepthVisualization ? '深度表示 ON' : '深度表示 OFF';
    console.log('深度表示:', showDepthVisualization);
  });

  window.addEventListener('xr-session-start', () => {
    depthToggleButton.style.display = 'block';
  });

  window.addEventListener('xr-session-end', () => {
    depthToggleButton.style.display = 'none';
    showDepthVisualization = false;
    depthToggleButton.textContent = '深度表示 OFF';
  });
}
