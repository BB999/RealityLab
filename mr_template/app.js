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
let shieldRadius = 0.5625; // 手の前に表示（2.25倍サイズ）
let impactTime = -10;
let impactPoint = new THREE.Vector3();

// ゾルトラーク用変数
let isRightHandOpen = false;
let zoltraakGroup = null;
let magicCircleGroup = null;
let beamGroup = null;
let isCharging = false;
let isFiring = false;
let chargeProgress = 0;
let fireProgress = 0;
let zoltraakTime = 0;

// 魔法陣の要素
let allMagicCircleElements = {};
let hexagramGroup = null;
let arcsGroup1 = null;
let arcsGroup2 = null;
let innerRuneGroup = null;

// ビーム関連
let beamElements = {};
let beamParticles = null;
let beamMaterial = null;
let beamVelocities = [];
let beamParticleCount = 500;

// レイキャスト用（壁・テーブル衝突判定）
let raycaster = new THREE.Raycaster();
let planeMeshes = [];
let beamMaxLength = 10; // 最大ビーム長
let currentBeamHitDistance = null; // 衝突点までの距離

// チャージパーティクル
let chargeParticles = null;
let chargeParticleMaterial = null;
let chargeParticleOriginalPositions = [];

// コア
let core = null;
let coreMaterial = null;
let coreGlow = null;
let glowMaterial = null;

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


  // シールドを作成
  createShield();

  // ゾルトラークエフェクトを作成
  createZoltraak();

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

    // シールドの中心をZ方向にオフセットして手のひらに近づける
    const zOffset = new THREE.Vector3(0, 0, -shieldRadius * 0.7);
    hexagons.push({
      center: vertex.clone().multiplyScalar(radius).add(zOffset),
      vertices: centers.map(c => c.clone().multiplyScalar(radius).add(zOffset)),
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
        float pulse = 0.35 + 0.1 * sin(time * 1.5 + pulseOffset);

        vec3 viewDir = normalize(cameraPosition - vWorldPosition);
        float fresnel = 1.0 - abs(dot(viewDir, vNormal));
        fresnel = pow(fresnel, 2.0) * 0.5;

        float impactAge = time - impactTime;
        float impactDist = distance(vWorldPosition, impactPoint);
        float impactWave = sin(impactDist * 12.0 - impactAge * 18.0) * 0.5 + 0.5;
        float impactFade = exp(-impactAge * 2.5) * exp(-impactDist * 1.5);
        float impact = impactWave * impactFade * step(0.0, impactAge) * step(impactAge, 3.0);

        float alpha = (pulse + fresnel + impact * 0.9) * shieldProgress;
        vec3 color = baseColor + vec3(0.4, 0.6, 0.2) * impact;

        gl_FragColor = vec4(color, alpha);
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
        float brightness = 0.9 + 0.1 * sin(time * 1.5 + pulseOffset);

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

  // パーティクル（ハニカムと同じZオフセットを適用）
  const particleCount = 30;
  particleGeometry = new THREE.BufferGeometry();
  const particlePositions = new Float32Array(particleCount * 3);
  particleSpeeds = [];
  const particleZOffset = -shieldRadius * 0.7;

  for (let i = 0; i < particleCount; i++) {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(1 - Math.random() * 0.15);
    const r = shieldRadius + (Math.random() - 0.5) * 0.015;

    particlePositions[i * 3] = Math.sin(phi) * Math.cos(theta) * r;
    particlePositions[i * 3 + 1] = Math.sin(phi) * Math.sin(theta) * r;
    particlePositions[i * 3 + 2] = Math.cos(phi) * r + particleZOffset;

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

// ========== ゾルトラークエフェクト ==========

// リングを作成
function createRing(innerRadius, outerRadius, color, opacity = 0) {
  const geometry = new THREE.RingGeometry(innerRadius, outerRadius, 128);
  const material = new THREE.MeshBasicMaterial({
    color: color,
    transparent: true,
    opacity: opacity,
    side: THREE.DoubleSide,
    depthWrite: false,
    blending: THREE.AdditiveBlending
  });
  return new THREE.Mesh(geometry, material);
}

// 線の円を作成
function createLineCircle(radius, segments, color) {
  const points = [];
  for (let i = 0; i <= segments; i++) {
    const angle = (i / segments) * Math.PI * 2;
    points.push(new THREE.Vector3(
      Math.cos(angle) * radius,
      Math.sin(angle) * radius,
      0
    ));
  }
  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  const material = new THREE.LineBasicMaterial({
    color: color,
    transparent: true,
    opacity: 0,
    blending: THREE.AdditiveBlending
  });
  return new THREE.Line(geometry, material);
}

// 三角形を作成
function createTriangle(radius, rotation) {
  const points = [];
  for (let i = 0; i <= 3; i++) {
    const angle = (i / 3) * Math.PI * 2 + rotation;
    points.push(new THREE.Vector3(
      Math.cos(angle) * radius,
      Math.sin(angle) * radius,
      0
    ));
  }
  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  const material = new THREE.LineBasicMaterial({
    color: 0x88aaff,
    transparent: true,
    opacity: 0,
    blending: THREE.AdditiveBlending
  });
  return new THREE.Line(geometry, material);
}

// アークを作成
function createArc(radius, startAngle, endAngle, color) {
  const points = [];
  const segments = 32;
  for (let i = 0; i <= segments; i++) {
    const angle = startAngle + (i / segments) * (endAngle - startAngle);
    points.push(new THREE.Vector3(
      Math.cos(angle) * radius,
      Math.sin(angle) * radius,
      0
    ));
  }
  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  const material = new THREE.LineBasicMaterial({
    color: color,
    transparent: true,
    opacity: 0,
    linewidth: 2,
    blending: THREE.AdditiveBlending
  });
  return new THREE.Line(geometry, material);
}

// ルーン文字を作成
function createRune(type) {
  const group = new THREE.Group();
  const material = new THREE.LineBasicMaterial({
    color: 0xaaccff,
    transparent: true,
    opacity: 0,
    blending: THREE.AdditiveBlending
  });

  let points = [];
  switch(type) {
    case 0: // Arrow up
      points = [
        [-0.1, -0.2], [0, 0.2], [0.1, -0.2],
        [null], [0, 0.2], [0, -0.15]
      ];
      break;
    case 1: // Diamond
      points = [
        [0, 0.2], [0.15, 0], [0, -0.2], [-0.15, 0], [0, 0.2],
        [null], [-0.08, 0], [0.08, 0]
      ];
      break;
    case 2: // Cross variant
      points = [
        [-0.1, 0.2], [0.1, -0.2],
        [null], [0.1, 0.2], [-0.1, -0.2],
        [null], [0, 0.15], [0, -0.15]
      ];
      break;
    case 3: // Triangle with line
      points = [
        [-0.12, -0.15], [0, 0.18], [0.12, -0.15], [-0.12, -0.15],
        [null], [0, 0], [0, -0.15]
      ];
      break;
    case 4: // Zigzag
      points = [
        [-0.1, 0.2], [0.1, 0.05], [-0.1, -0.05], [0.1, -0.2]
      ];
      break;
    case 5: // Circle with cross
      points = [
        [-0.1, 0], [0.1, 0],
        [null], [0, -0.15], [0, 0.15]
      ];
      break;
  }

  let currentPoints = [];
  points.forEach(p => {
    if (p[0] === null) {
      if (currentPoints.length > 0) {
        const geom = new THREE.BufferGeometry().setFromPoints(
          currentPoints.map(cp => new THREE.Vector3(cp[0], cp[1], 0))
        );
        group.add(new THREE.Line(geom, material.clone()));
      }
      currentPoints = [];
    } else {
      currentPoints.push(p);
    }
  });
  if (currentPoints.length > 0) {
    const geom = new THREE.BufferGeometry().setFromPoints(
      currentPoints.map(cp => new THREE.Vector3(cp[0], cp[1], 0))
    );
    group.add(new THREE.Line(geom, material.clone()));
  }

  // ルーンの周りの小さな円
  const circlePoints = [];
  for (let i = 0; i <= 32; i++) {
    const angle = (i / 32) * Math.PI * 2;
    circlePoints.push(new THREE.Vector3(
      Math.cos(angle) * 0.25,
      Math.sin(angle) * 0.25,
      0
    ));
  }
  const circleGeom = new THREE.BufferGeometry().setFromPoints(circlePoints);
  group.add(new THREE.Line(circleGeom, material.clone()));

  return group;
}

// 五芒星を作成
function createPentagram(radius) {
  const points = [];
  const order = [0, 2, 4, 1, 3, 0];
  order.forEach(i => {
    const angle = (i / 5) * Math.PI * 2 - Math.PI / 2;
    points.push(new THREE.Vector3(
      Math.cos(angle) * radius,
      Math.sin(angle) * radius,
      0
    ));
  });
  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  const material = new THREE.LineBasicMaterial({
    color: 0xaaccff,
    transparent: true,
    opacity: 0,
    blending: THREE.AdditiveBlending
  });
  return new THREE.Line(geometry, material);
}

// ゾルトラークエフェクトを作成
function createZoltraak() {
  // スケールファクター（手のひらサイズに合わせる）
  const scale = 0.06;

  zoltraakGroup = new THREE.Group();
  zoltraakGroup.visible = false;
  scene.add(zoltraakGroup);

  // 魔法陣グループ
  magicCircleGroup = new THREE.Group();
  magicCircleGroup.scale.setScalar(0);
  zoltraakGroup.add(magicCircleGroup);

  // 外側のリング
  const outerRing1 = createRing(3.8 * scale, 4.0 * scale, 0x4466cc);
  const outerRing2 = createRing(3.5 * scale, 3.55 * scale, 0x6688ff);
  const outerRing3 = createRing(3.2 * scale, 3.25 * scale, 0x88aaff);
  magicCircleGroup.add(outerRing1, outerRing2, outerRing3);

  // 中間のリング
  const middleRing1 = createRing(2.4 * scale, 2.5 * scale, 0x6688ff);
  const middleRing2 = createRing(2.1 * scale, 2.15 * scale, 0x88aaff);
  magicCircleGroup.add(middleRing1, middleRing2);

  // 内側のリング
  const innerRing1 = createRing(1.2 * scale, 1.3 * scale, 0x88aaff);
  const innerRing2 = createRing(0.8 * scale, 0.85 * scale, 0xaaccff);
  magicCircleGroup.add(innerRing1, innerRing2);

  // 線の円
  const lineCircles = [];
  [3.7, 3.0, 2.3, 1.5, 1.0].forEach(radius => {
    const circle = createLineCircle(radius * scale, 64, 0x88aaff);
    lineCircles.push(circle);
    magicCircleGroup.add(circle);
  });

  // 六芒星
  hexagramGroup = new THREE.Group();
  const triangle1 = createTriangle(3.0 * scale, Math.PI / 2);
  const triangle2 = createTriangle(3.0 * scale, -Math.PI / 2);
  hexagramGroup.add(triangle1, triangle2);
  const triangle3 = createTriangle(1.8 * scale, Math.PI / 2);
  const triangle4 = createTriangle(1.8 * scale, -Math.PI / 2);
  hexagramGroup.add(triangle3, triangle4);
  magicCircleGroup.add(hexagramGroup);

  // 放射線
  const radialLinesGroup = new THREE.Group();
  for (let i = 0; i < 12; i++) {
    const angle = (i / 12) * Math.PI * 2;
    const points = [
      new THREE.Vector3(Math.cos(angle) * 1.4 * scale, Math.sin(angle) * 1.4 * scale, 0),
      new THREE.Vector3(Math.cos(angle) * 2.3 * scale, Math.sin(angle) * 2.3 * scale, 0)
    ];
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({
      color: 0x6688ff,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending
    });
    const line = new THREE.Line(geometry, material);
    radialLinesGroup.add(line);
  }
  for (let i = 0; i < 24; i++) {
    const angle = (i / 24) * Math.PI * 2;
    const points = [
      new THREE.Vector3(Math.cos(angle) * 3.3 * scale, Math.sin(angle) * 3.3 * scale, 0),
      new THREE.Vector3(Math.cos(angle) * 3.7 * scale, Math.sin(angle) * 3.7 * scale, 0)
    ];
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({
      color: 0x4466aa,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending
    });
    const line = new THREE.Line(geometry, material);
    radialLinesGroup.add(line);
  }
  magicCircleGroup.add(radialLinesGroup);

  // ルーン文字
  const runeGroup = new THREE.Group();
  for (let i = 0; i < 6; i++) {
    const angle = (i / 6) * Math.PI * 2 + Math.PI / 6;
    const rune = createRune(i);
    rune.position.x = Math.cos(angle) * 2.7 * scale;
    rune.position.y = Math.sin(angle) * 2.7 * scale;
    rune.scale.setScalar(1.2 * scale);
    runeGroup.add(rune);
  }
  magicCircleGroup.add(runeGroup);

  // 内側のルーン
  innerRuneGroup = new THREE.Group();
  for (let i = 0; i < 6; i++) {
    const angle = (i / 6) * Math.PI * 2;
    const rune = createRune((i + 3) % 6);
    rune.position.x = Math.cos(angle) * 1.6 * scale;
    rune.position.y = Math.sin(angle) * 1.6 * scale;
    rune.scale.setScalar(0.8 * scale);
    innerRuneGroup.add(rune);
  }
  magicCircleGroup.add(innerRuneGroup);

  // 装飾ドット
  const dotsGroup = new THREE.Group();
  for (let i = 0; i < 36; i++) {
    const angle = (i / 36) * Math.PI * 2;
    const dotGeometry = new THREE.CircleGeometry(0.04 * scale, 16);
    const dotMaterial = new THREE.MeshBasicMaterial({
      color: 0x88aaff,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending
    });
    const dot = new THREE.Mesh(dotGeometry, dotMaterial);
    dot.position.x = Math.cos(angle) * 3.45 * scale;
    dot.position.y = Math.sin(angle) * 3.45 * scale;
    dotsGroup.add(dot);
  }
  for (let i = 0; i < 18; i++) {
    const angle = (i / 18) * Math.PI * 2;
    const dotGeometry = new THREE.CircleGeometry(0.05 * scale, 16);
    const dotMaterial = new THREE.MeshBasicMaterial({
      color: 0xaaccff,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending
    });
    const dot = new THREE.Mesh(dotGeometry, dotMaterial);
    dot.position.x = Math.cos(angle) * 2.25 * scale;
    dot.position.y = Math.sin(angle) * 2.25 * scale;
    dotsGroup.add(dot);
  }
  magicCircleGroup.add(dotsGroup);

  // 回転アーク
  arcsGroup1 = new THREE.Group();
  for (let i = 0; i < 3; i++) {
    const startAngle = (i / 3) * Math.PI * 2;
    const arc = createArc(3.6 * scale, startAngle, startAngle + Math.PI / 4, 0x88aaff);
    arcsGroup1.add(arc);
  }
  magicCircleGroup.add(arcsGroup1);

  arcsGroup2 = new THREE.Group();
  for (let i = 0; i < 4; i++) {
    const startAngle = (i / 4) * Math.PI * 2;
    const arc = createArc(2.6 * scale, startAngle, startAngle + Math.PI / 6, 0x6688ff);
    arcsGroup2.add(arc);
  }
  magicCircleGroup.add(arcsGroup2);

  // 波紋エフェクト
  const waves = [];
  for (let i = 0; i < 3; i++) {
    const wave = createLineCircle(0.5 * scale, 64, 0xaaccff);
    wave.userData = { baseRadius: 0.5 * scale, phase: i * (Math.PI * 2 / 3) };
    waves.push(wave);
    magicCircleGroup.add(wave);
  }

  // 五芒星
  const pentagram = createPentagram(0.6 * scale);
  magicCircleGroup.add(pentagram);

  // グロー層
  const glowLayers = new THREE.Group();
  const glowRing1 = createRing(3.5 * scale, 4.2 * scale, 0x4466ff);
  glowRing1.material.opacity = 0;
  glowRing1.scale.setScalar(1.05);
  glowLayers.add(glowRing1);

  const glowRing2 = createRing(2.0 * scale, 3.0 * scale, 0x6688ff);
  glowRing2.material.opacity = 0;
  glowLayers.add(glowRing2);

  const glowRing3 = createRing(0.5 * scale, 1.5 * scale, 0x88aaff);
  glowRing3.material.opacity = 0;
  glowLayers.add(glowRing3);

  magicCircleGroup.add(glowLayers);

  // エネルギースパーク
  const sparkCount = 50;
  const sparkGeometry = new THREE.BufferGeometry();
  const sparkPositions = new Float32Array(sparkCount * 3);
  const sparkData = [];

  for (let i = 0; i < sparkCount; i++) {
    const angle = Math.random() * Math.PI * 2;
    const radius = (2 + Math.random() * 2) * scale;
    sparkPositions[i * 3] = Math.cos(angle) * radius;
    sparkPositions[i * 3 + 1] = Math.sin(angle) * radius;
    sparkPositions[i * 3 + 2] = 0;
    sparkData.push({
      angle: angle,
      radius: radius,
      speed: 0.5 + Math.random() * 1,
      phase: Math.random() * Math.PI * 2
    });
  }

  sparkGeometry.setAttribute('position', new THREE.BufferAttribute(sparkPositions, 3));

  const sparkMaterial = new THREE.PointsMaterial({
    color: 0xaaccff,
    size: 0.01,
    transparent: true,
    opacity: 0,
    blending: THREE.AdditiveBlending
  });

  const sparks = new THREE.Points(sparkGeometry, sparkMaterial);
  magicCircleGroup.add(sparks);

  // 魔法陣要素を保存
  allMagicCircleElements = {
    rings: [outerRing1, outerRing2, outerRing3, middleRing1, middleRing2, innerRing1, innerRing2],
    lineCircles: lineCircles,
    hexagram: [triangle1, triangle2, triangle3, triangle4],
    radialLines: radialLinesGroup.children,
    runes: [...runeGroup.children, ...innerRuneGroup.children],
    dots: dotsGroup.children,
    arcs1: arcsGroup1.children,
    arcs2: arcsGroup2.children,
    waves: waves,
    pentagram: pentagram,
    glowLayers: [glowRing1, glowRing2, glowRing3],
    sparks: { mesh: sparks, data: sparkData },
    scale: scale
  };

  // コア（エネルギー球）
  const coreGeometry = new THREE.SphereGeometry(0.02, 32, 32);
  coreMaterial = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0
  });
  core = new THREE.Mesh(coreGeometry, coreMaterial);
  zoltraakGroup.add(core);

  // コアのグロー
  const glowGeometry = new THREE.SphereGeometry(0.03, 32, 32);
  glowMaterial = new THREE.MeshBasicMaterial({
    color: 0x88aaff,
    transparent: true,
    opacity: 0
  });
  coreGlow = new THREE.Mesh(glowGeometry, glowMaterial);
  zoltraakGroup.add(coreGlow);

  // チャージパーティクル
  const chargeParticleCount = 200;
  const chargeGeometry = new THREE.BufferGeometry();
  const chargePositions = new Float32Array(chargeParticleCount * 3);
  chargeParticleOriginalPositions = [];

  for (let i = 0; i < chargeParticleCount; i++) {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    const radius = 0.1 + Math.random() * 0.2;

    const x = radius * Math.sin(phi) * Math.cos(theta);
    const y = radius * Math.sin(phi) * Math.sin(theta);
    const z = radius * Math.cos(phi);

    chargePositions[i * 3] = x;
    chargePositions[i * 3 + 1] = y;
    chargePositions[i * 3 + 2] = z;

    chargeParticleOriginalPositions.push({ x, y, z });
  }

  chargeGeometry.setAttribute('position', new THREE.BufferAttribute(chargePositions, 3));

  chargeParticleMaterial = new THREE.PointsMaterial({
    color: 0x88aaff,
    size: 0.005,
    transparent: true,
    opacity: 0,
    blending: THREE.AdditiveBlending
  });

  chargeParticles = new THREE.Points(chargeGeometry, chargeParticleMaterial);
  zoltraakGroup.add(chargeParticles);

  // ビームグループ
  beamGroup = new THREE.Group();
  zoltraakGroup.add(beamGroup);

  // コアビーム
  const coreBeamGeometry = new THREE.CylinderGeometry(0.015, 0.015, 0.01, 16, 1, true);
  const coreBeamMaterial = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0,
    side: THREE.DoubleSide,
    depthWrite: false,
    blending: THREE.AdditiveBlending
  });
  const coreBeam = new THREE.Mesh(coreBeamGeometry, coreBeamMaterial);
  coreBeam.rotation.x = Math.PI / 2;
  beamGroup.add(coreBeam);

  // 内側ビーム
  const innerBeamGeometry = new THREE.CylinderGeometry(0.025, 0.03, 0.01, 16, 1, true);
  const innerBeamMaterial = new THREE.MeshBasicMaterial({
    color: 0xaaccff,
    transparent: true,
    opacity: 0,
    side: THREE.DoubleSide,
    depthWrite: false,
    blending: THREE.AdditiveBlending
  });
  const innerBeam = new THREE.Mesh(innerBeamGeometry, innerBeamMaterial);
  innerBeam.rotation.x = Math.PI / 2;
  beamGroup.add(innerBeam);

  // 外側ビーム
  const outerBeamGeometry = new THREE.CylinderGeometry(0.04, 0.06, 0.01, 16, 1, true);
  const outerBeamMaterial = new THREE.MeshBasicMaterial({
    color: 0x6688ff,
    transparent: true,
    opacity: 0,
    side: THREE.DoubleSide,
    depthWrite: false,
    blending: THREE.AdditiveBlending
  });
  const outerBeam = new THREE.Mesh(outerBeamGeometry, outerBeamMaterial);
  outerBeam.rotation.x = Math.PI / 2;
  beamGroup.add(outerBeam);

  // グロービーム
  const glowBeamGeometry = new THREE.CylinderGeometry(0.06, 0.1, 0.01, 16, 1, true);
  const glowBeamMaterial = new THREE.MeshBasicMaterial({
    color: 0x4466aa,
    transparent: true,
    opacity: 0,
    side: THREE.DoubleSide,
    depthWrite: false,
    blending: THREE.AdditiveBlending
  });
  const glowBeam = new THREE.Mesh(glowBeamGeometry, glowBeamMaterial);
  glowBeam.rotation.x = Math.PI / 2;
  beamGroup.add(glowBeam);

  // スパイラルリング
  const spiralRings = [];
  for (let i = 0; i < 8; i++) {
    const ringGeometry = new THREE.TorusGeometry(0.05 + i * 0.01, 0.004, 8, 32);
    const ringMaterial = new THREE.MeshBasicMaterial({
      color: 0x88aaff,
      transparent: true,
      opacity: 0,
      side: THREE.DoubleSide,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    });
    const ring = new THREE.Mesh(ringGeometry, ringMaterial);
    ring.userData = { offset: i * 5, speed: 1 + i * 0.1 };
    spiralRings.push(ring);
    beamGroup.add(ring);
  }

  // ビームヘッド
  const beamHeadGeometry = new THREE.SphereGeometry(0.05, 32, 32);
  const beamHeadMaterial = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0,
    side: THREE.DoubleSide,
    depthWrite: false,
    blending: THREE.AdditiveBlending
  });
  const beamHead = new THREE.Mesh(beamHeadGeometry, beamHeadMaterial);
  beamGroup.add(beamHead);

  // ビームヘッドグロー
  const beamHeadGlowGeometry = new THREE.SphereGeometry(0.08, 32, 32);
  const beamHeadGlowMaterial = new THREE.MeshBasicMaterial({
    color: 0x88aaff,
    transparent: true,
    opacity: 0,
    side: THREE.DoubleSide,
    depthWrite: false,
    blending: THREE.AdditiveBlending
  });
  const beamHeadGlow = new THREE.Mesh(beamHeadGlowGeometry, beamHeadGlowMaterial);
  beamGroup.add(beamHeadGlow);

  // ショックウェーブ
  const shockwaves = [];
  for (let i = 0; i < 3; i++) {
    const shockGeometry = new THREE.RingGeometry(0.02, 0.04, 64);
    const shockMaterial = new THREE.MeshBasicMaterial({
      color: 0xaaccff,
      transparent: true,
      opacity: 0,
      side: THREE.DoubleSide,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    });
    const shockwave = new THREE.Mesh(shockGeometry, shockMaterial);
    shockwave.userData = { delay: i * 0.15, active: false };
    shockwaves.push(shockwave);
    zoltraakGroup.add(shockwave);
  }

  // スパークトレイル
  const sparkTrailCount = 150;
  const sparkTrailGeometry = new THREE.BufferGeometry();
  const sparkTrailPositions = new Float32Array(sparkTrailCount * 3);
  const sparkTrailData = [];

  for (let i = 0; i < sparkTrailCount; i++) {
    sparkTrailPositions[i * 3] = 0;
    sparkTrailPositions[i * 3 + 1] = 0;
    sparkTrailPositions[i * 3 + 2] = 0;
    sparkTrailData.push({
      angle: Math.random() * Math.PI * 2,
      radius: 0.03 + Math.random() * 0.07,
      zSpeed: 0.5 + Math.random() * 1,
      rotSpeed: (Math.random() - 0.5) * 5,
      z: 0,
      active: false
    });
  }

  sparkTrailGeometry.setAttribute('position', new THREE.BufferAttribute(sparkTrailPositions, 3));

  const sparkTrailMaterial = new THREE.PointsMaterial({
    color: 0xccddff,
    size: 0.008,
    transparent: true,
    opacity: 0,
    blending: THREE.AdditiveBlending
  });

  const sparkTrail = new THREE.Points(sparkTrailGeometry, sparkTrailMaterial);
  zoltraakGroup.add(sparkTrail);

  // ビームパーティクル
  const beamGeometry = new THREE.BufferGeometry();
  const beamPositions = new Float32Array(beamParticleCount * 3);
  beamVelocities = [];

  for (let i = 0; i < beamParticleCount; i++) {
    beamPositions[i * 3] = 0;
    beamPositions[i * 3 + 1] = 0;
    beamPositions[i * 3 + 2] = 0;
    beamVelocities.push({
      x: (Math.random() - 0.5) * 0.03,
      y: (Math.random() - 0.5) * 0.03,
      z: Math.random() * 0.2 + 0.15,
      life: Math.random()
    });
  }

  beamGeometry.setAttribute('position', new THREE.BufferAttribute(beamPositions, 3));

  beamMaterial = new THREE.PointsMaterial({
    color: 0xaaccff,
    size: 0.015,
    transparent: true,
    opacity: 0,
    blending: THREE.AdditiveBlending
  });

  beamParticles = new THREE.Points(beamGeometry, beamMaterial);
  zoltraakGroup.add(beamParticles);

  // ビーム要素を保存
  beamElements = {
    coreBeam, innerBeam, outerBeam, glowBeam,
    spiralRings, beamHead, beamHeadGlow,
    shockwaves, sparkTrail, sparkTrailData,
    sparkTrailPositions
  };
}

// ゾルトラーク発動
function castZoltraak() {
  if (isCharging || isFiring) return;

  isCharging = true;
  chargeProgress = 0;

  // 魔法陣のスケールをリセット
  magicCircleGroup.scale.setScalar(0);

  // チャージパーティクルをリセット
  if (chargeParticles) {
    const positions = chargeParticles.geometry.attributes.position.array;
    for (let i = 0; i < chargeParticleOriginalPositions.length; i++) {
      positions[i * 3] = chargeParticleOriginalPositions[i].x;
      positions[i * 3 + 1] = chargeParticleOriginalPositions[i].y;
      positions[i * 3 + 2] = chargeParticleOriginalPositions[i].z;
    }
    chargeParticles.geometry.attributes.position.needsUpdate = true;
  }
}

// ゾルトラークのアニメーション更新
function updateZoltraak(time) {
  if (!zoltraakGroup) return;

  zoltraakTime = time;
  const scale = allMagicCircleElements.scale || 0.06;

  // 魔法陣の回転
  if (magicCircleGroup) {
    magicCircleGroup.rotation.z = time * 0.3;
  }
  if (hexagramGroup) {
    hexagramGroup.rotation.z = -time * 0.5;
  }
  if (arcsGroup1) {
    arcsGroup1.rotation.z = time * 1.5;
  }
  if (arcsGroup2) {
    arcsGroup2.rotation.z = -time * 1.2;
  }
  if (innerRuneGroup) {
    innerRuneGroup.rotation.z = time * 0.6;
  }

  if (isCharging) {
    chargeProgress += 0.012;

    const fadeIn = Math.min(chargeProgress * 2, 1);
    const fadeInSlow = Math.min(chargeProgress * 1.5, 1);
    const fadeInFast = Math.min(chargeProgress * 3, 1);

    // 魔法陣をスケールアップ
    const scaleProgress = Math.min(chargeProgress * 2.5, 1);
    const easeOutScale = 1 - Math.pow(1 - scaleProgress, 3);
    magicCircleGroup.scale.setScalar(easeOutScale);

    // リングのアニメーション
    allMagicCircleElements.rings.forEach((ring, i) => {
      ring.material.opacity = fadeInSlow * (0.4 + i * 0.05);
    });

    // 線の円
    allMagicCircleElements.lineCircles.forEach((circle, i) => {
      const stagger = Math.max(0, chargeProgress - i * 0.05) * 2;
      circle.material.opacity = Math.min(stagger, 0.7);
    });

    // 六芒星
    allMagicCircleElements.hexagram.forEach((tri) => {
      tri.material.opacity = fadeIn * 0.9;
    });

    // 放射線
    allMagicCircleElements.radialLines.forEach((line, i) => {
      const pulse = Math.sin(time * 5 + i * 0.3) * 0.2 + 0.8;
      line.material.opacity = fadeIn * 0.6 * pulse;
    });

    // ルーン
    allMagicCircleElements.runes.forEach((rune, i) => {
      const stagger = Math.max(0, chargeProgress - i * 0.03) * 2.5;
      const pulse = Math.sin(time * 4 + i) * 0.3 + 0.7;
      rune.children.forEach(child => {
        if (child.material) {
          child.material.opacity = Math.min(stagger, 1) * pulse;
        }
      });
    });

    // ドット
    allMagicCircleElements.dots.forEach((dot, i) => {
      const pulse = Math.sin(time * 6 + i * 0.2) * 0.5 + 0.5;
      dot.material.opacity = fadeInFast * pulse * 0.8;
    });

    // アーク
    allMagicCircleElements.arcs1.forEach((arc) => {
      arc.material.opacity = fadeIn * 0.8;
    });
    allMagicCircleElements.arcs2.forEach((arc) => {
      arc.material.opacity = fadeIn * 0.6;
    });

    // 波紋
    allMagicCircleElements.waves.forEach((wave) => {
      const waveProgress = (time * 0.5 + wave.userData.phase) % 1;
      const radius = wave.userData.baseRadius + waveProgress * 3.5 * scale;
      const opacity = (1 - waveProgress) * fadeIn * 0.5;

      const points = [];
      for (let j = 0; j <= 64; j++) {
        const angle = (j / 64) * Math.PI * 2;
        points.push(new THREE.Vector3(
          Math.cos(angle) * radius,
          Math.sin(angle) * radius,
          0
        ));
      }
      wave.geometry.setFromPoints(points);
      wave.material.opacity = opacity;
    });

    // 五芒星
    const pentaPulse = Math.sin(time * 8) * 0.3 + 0.7;
    allMagicCircleElements.pentagram.material.opacity = fadeInFast * pentaPulse;
    allMagicCircleElements.pentagram.rotation.z = time * 0.5;

    // グロー層
    allMagicCircleElements.glowLayers.forEach((glow, i) => {
      const pulse = Math.sin(time * 4 + i) * 0.2 + 0.3;
      glow.material.opacity = fadeIn * pulse;
    });

    // スパーク
    const sparkPositions = allMagicCircleElements.sparks.mesh.geometry.attributes.position.array;
    allMagicCircleElements.sparks.data.forEach((spark, i) => {
      spark.angle += spark.speed * 0.02;
      const wobble = Math.sin(time * spark.speed * 2 + spark.phase) * 0.02;
      sparkPositions[i * 3] = Math.cos(spark.angle) * (spark.radius + wobble);
      sparkPositions[i * 3 + 1] = Math.sin(spark.angle) * (spark.radius + wobble);
    });
    allMagicCircleElements.sparks.mesh.geometry.attributes.position.needsUpdate = true;
    allMagicCircleElements.sparks.mesh.material.opacity = fadeIn * 0.8;

    // チャージパーティクルの収束
    chargeParticleMaterial.opacity = Math.min(chargeProgress * 2, 0.8);
    const positions = chargeParticles.geometry.attributes.position.array;

    for (let i = 0; i < chargeParticleOriginalPositions.length; i++) {
      const currentX = positions[i * 3];
      const currentY = positions[i * 3 + 1];
      const currentZ = positions[i * 3 + 2];

      const speed = 0.02 + chargeProgress * 0.03;

      positions[i * 3] += (0 - currentX) * speed;
      positions[i * 3 + 1] += (0 - currentY) * speed;
      positions[i * 3 + 2] += (0 - currentZ) * speed;

      // スパイラル効果
      const dist = Math.sqrt(currentX * currentX + currentY * currentY);
      if (dist > 0.01) {
        const angle = Math.atan2(currentY, currentX) + 0.05;
        positions[i * 3] = currentX * 0.99 + Math.cos(angle) * 0.001;
        positions[i * 3 + 1] = currentY * 0.99 + Math.sin(angle) * 0.001;
      }
    }
    chargeParticles.geometry.attributes.position.needsUpdate = true;

    // コアの成長
    const coreScale = chargeProgress * 2;
    core.scale.setScalar(coreScale);
    coreMaterial.opacity = Math.min(chargeProgress * 2, 1);

    coreGlow.scale.setScalar(coreScale * 1.5 + Math.sin(time * 10) * 0.1);
    glowMaterial.opacity = Math.min(chargeProgress * 1.5, 0.5);

    // パルス効果
    core.scale.multiplyScalar(1 + Math.sin(time * 15) * 0.05);

    if (chargeProgress >= 1) {
      isCharging = false;
      isFiring = true;
      fireProgress = 0;
    }
  }

  if (isFiring) {
    fireProgress += 0.015;

    // ビームの理想的な長さを計算
    const idealBeamLength = Math.max(fireProgress * 10, 0.01);

    // 壁・テーブルとの衝突判定
    let beamLength = idealBeamLength;
    if (zoltraakGroup && zoltraakGroup.visible) {
      // ビームの起点と方向をワールド座標で取得
      const beamOrigin = new THREE.Vector3();
      const beamDirection = new THREE.Vector3(0, 0, 1); // ローカルのZ方向
      zoltraakGroup.getWorldPosition(beamOrigin);
      beamDirection.applyQuaternion(zoltraakGroup.quaternion);
      beamDirection.normalize();

      // レイキャストで衝突距離を取得
      const hitDistance = getBeamHitDistance(beamOrigin, beamDirection);
      currentBeamHitDistance = hitDistance;

      // 衝突点でビームの長さを制限
      beamLength = Math.min(idealBeamLength, hitDistance);
    }

    const beamHeadZ = beamLength;

    const beamPulse = Math.sin(time * 30) * 0.2 + 0.8;
    const beamFlicker = Math.sin(time * 50) * 0.1 + 0.9;

    // ビームの更新
    if (beamLength > 0.02) {
      [beamElements.coreBeam, beamElements.innerBeam,
       beamElements.outerBeam, beamElements.glowBeam].forEach((beam, i) => {
        beam.geometry.dispose();
        const radius1 = [0.015, 0.03, 0.06, 0.1][i];
        const radius2 = [0.015, 0.035, 0.09, 0.15][i];
        beam.geometry = new THREE.CylinderGeometry(radius1, radius2, beamLength, 32, 1, true);
        beam.position.z = beamLength / 2;
        beam.material.opacity = [0.95, 0.7, 0.4, 0.2][i] * beamPulse * beamFlicker;
      });
    }

    // ビームヘッド
    beamElements.beamHead.position.z = beamHeadZ;
    beamElements.beamHead.material.opacity = 0.95 * beamPulse;
    beamElements.beamHead.scale.setScalar(1.5 + Math.sin(time * 25) * 0.2);

    beamElements.beamHeadGlow.position.z = beamHeadZ;
    beamElements.beamHeadGlow.material.opacity = 0.5 * beamPulse;
    beamElements.beamHeadGlow.scale.setScalar(2 + Math.sin(time * 20) * 0.3);

    // スパイラルリング
    if (beamLength > 0.1) {
      beamElements.spiralRings.forEach((ring, i) => {
        const zPos = (time * 2 * ring.userData.speed + ring.userData.offset * 0.1) % beamLength;
        ring.position.z = zPos;
        ring.rotation.x = time * 5;
        ring.rotation.y = time * 3 + i;
        ring.scale.setScalar(1.5 + Math.sin(time * 10 + i) * 0.3);
        ring.material.opacity = 0.6 * beamPulse * (1 - zPos / beamLength);
      });
    }

    // ショックウェーブ
    const shockCycleTime = 0.4;
    beamElements.shockwaves.forEach((shock, i) => {
      const cycleProgress = ((time * 0.5) + i * (shockCycleTime / 3)) % shockCycleTime;
      const normalizedProgress = cycleProgress / shockCycleTime;

      const shockScale = 1 + normalizedProgress * 8;
      shock.scale.setScalar(shockScale);
      shock.material.opacity = (1 - normalizedProgress) * 0.7;
      shock.position.z = -0.02;
    });

    // スパークトレイル
    if (beamLength > 0.1) {
      const sparkPos = beamElements.sparkTrail.geometry.attributes.position.array;
      beamElements.sparkTrailData.forEach((spark, i) => {
        if (fireProgress > 0.1) {
          spark.z += spark.zSpeed * 0.016;
          spark.angle += spark.rotSpeed * 0.02;

          if (spark.z > beamLength || spark.z < 0) {
            spark.z = Math.random() * beamLength * 0.3;
            spark.angle = Math.random() * Math.PI * 2;
          }

          const wobble = Math.sin(time * 10 + i) * 0.02;
          const radius = spark.radius + wobble;
          sparkPos[i * 3] = Math.cos(spark.angle) * radius;
          sparkPos[i * 3 + 1] = Math.sin(spark.angle) * radius;
          sparkPos[i * 3 + 2] = spark.z;
        }
      });
      beamElements.sparkTrail.geometry.attributes.position.needsUpdate = true;
      beamElements.sparkTrail.material.opacity = 0.7 * beamPulse;
    }

    // ビームパーティクル
    beamMaterial.opacity = 0.8 * beamPulse;
    const beamPos = beamParticles.geometry.attributes.position.array;

    for (let i = 0; i < beamParticleCount; i++) {
      beamPos[i * 3] += beamVelocities[i].x;
      beamPos[i * 3 + 1] += beamVelocities[i].y;
      beamPos[i * 3 + 2] += beamVelocities[i].z;

      // スパイラル運動
      const angle = Math.atan2(beamPos[i * 3 + 1], beamPos[i * 3]) + 0.1;
      const dist = Math.sqrt(beamPos[i * 3] ** 2 + beamPos[i * 3 + 1] ** 2);
      beamPos[i * 3] = Math.cos(angle) * dist;
      beamPos[i * 3 + 1] = Math.sin(angle) * dist;

      // リセット
      if (beamPos[i * 3 + 2] > beamLength) {
        beamPos[i * 3] = (Math.random() - 0.5) * 0.08;
        beamPos[i * 3 + 1] = (Math.random() - 0.5) * 0.08;
        beamPos[i * 3 + 2] = 0;
      }
    }
    beamParticles.geometry.attributes.position.needsUpdate = true;

    // チャージパーティクルのフェードアウト
    chargeParticleMaterial.opacity = Math.max(0.8 - fireProgress * 2, 0);

    // 魔法陣のアニメーション継続
    const firePulse = Math.sin(time * 15) * 0.3 + 0.7;
    const fireIntensity = 1 + Math.sin(time * 20) * 0.2;

    allMagicCircleElements.rings.forEach((ring, i) => {
      ring.material.opacity = (0.5 + i * 0.05) * firePulse;
    });

    allMagicCircleElements.lineCircles.forEach((circle) => {
      circle.material.opacity = 0.7 * firePulse;
    });

    allMagicCircleElements.hexagram.forEach(tri => {
      tri.material.opacity = 0.9 * fireIntensity;
    });

    allMagicCircleElements.radialLines.forEach((line, i) => {
      const pulse = Math.sin(time * 10 + i * 0.5) * 0.3 + 0.7;
      line.material.opacity = 0.7 * pulse;
    });

    allMagicCircleElements.runes.forEach((rune, i) => {
      const pulse = Math.sin(time * 8 + i) * 0.4 + 0.6;
      rune.children.forEach(child => {
        if (child.material) child.material.opacity = pulse * fireIntensity;
      });
    });

    allMagicCircleElements.dots.forEach((dot, i) => {
      const sparkle = Math.sin(time * 12 + i * 0.3) * 0.5 + 0.5;
      dot.material.opacity = sparkle * firePulse;
    });

    allMagicCircleElements.arcs1.forEach(arc => {
      arc.material.opacity = 0.8 * firePulse;
    });
    allMagicCircleElements.arcs2.forEach(arc => {
      arc.material.opacity = 0.6 * firePulse;
    });

    allMagicCircleElements.waves.forEach((wave) => {
      const waveProgress = (time * 0.8 + wave.userData.phase) % 1;
      const radius = wave.userData.baseRadius + waveProgress * 3.5 * scale;
      const opacity = (1 - waveProgress) * 0.6;

      const points = [];
      for (let j = 0; j <= 64; j++) {
        const angle = (j / 64) * Math.PI * 2;
        points.push(new THREE.Vector3(
          Math.cos(angle) * radius,
          Math.sin(angle) * radius,
          0
        ));
      }
      wave.geometry.setFromPoints(points);
      wave.material.opacity = opacity;
    });

    allMagicCircleElements.pentagram.material.opacity = fireIntensity;
    allMagicCircleElements.pentagram.rotation.z = time * 2;

    allMagicCircleElements.glowLayers.forEach((glow, i) => {
      const pulse = Math.sin(time * 6 + i) * 0.3 + 0.5;
      glow.material.opacity = pulse * fireIntensity;
    });

    const sparkPositions = allMagicCircleElements.sparks.mesh.geometry.attributes.position.array;
    allMagicCircleElements.sparks.data.forEach((spark, i) => {
      spark.angle += spark.speed * 0.05;
      const wobble = Math.sin(time * spark.speed * 3 + spark.phase) * 0.03;
      sparkPositions[i * 3] = Math.cos(spark.angle) * (spark.radius + wobble);
      sparkPositions[i * 3 + 1] = Math.sin(spark.angle) * (spark.radius + wobble);
    });
    allMagicCircleElements.sparks.mesh.geometry.attributes.position.needsUpdate = true;
    allMagicCircleElements.sparks.mesh.material.opacity = 0.9 * firePulse;

    // フェードアウト
    if (fireProgress > 2) {
      const fadeOut = Math.max(1 - (fireProgress - 2) * 2, 0);

      allMagicCircleElements.rings.forEach(ring => {
        ring.material.opacity *= fadeOut;
      });
      allMagicCircleElements.lineCircles.forEach(circle => {
        circle.material.opacity *= fadeOut;
      });
      allMagicCircleElements.hexagram.forEach(tri => {
        tri.material.opacity *= fadeOut;
      });
      allMagicCircleElements.radialLines.forEach(line => {
        line.material.opacity *= fadeOut;
      });
      allMagicCircleElements.runes.forEach(rune => {
        rune.children.forEach(child => {
          if (child.material) child.material.opacity *= fadeOut;
        });
      });
      allMagicCircleElements.dots.forEach(dot => {
        dot.material.opacity *= fadeOut;
      });
      allMagicCircleElements.arcs1.forEach(arc => {
        arc.material.opacity *= fadeOut;
      });
      allMagicCircleElements.arcs2.forEach(arc => {
        arc.material.opacity *= fadeOut;
      });
      allMagicCircleElements.waves.forEach(wave => {
        wave.material.opacity *= fadeOut;
      });
      allMagicCircleElements.pentagram.material.opacity *= fadeOut;
      allMagicCircleElements.glowLayers.forEach(glow => {
        glow.material.opacity *= fadeOut;
      });
      allMagicCircleElements.sparks.mesh.material.opacity *= fadeOut;

      magicCircleGroup.scale.setScalar(fadeOut);

      // ビームのフェードアウト
      beamElements.coreBeam.material.opacity *= fadeOut;
      beamElements.innerBeam.material.opacity *= fadeOut;
      beamElements.outerBeam.material.opacity *= fadeOut;
      beamElements.glowBeam.material.opacity *= fadeOut;
      beamElements.beamHead.material.opacity *= fadeOut;
      beamElements.beamHeadGlow.material.opacity *= fadeOut;
      beamElements.spiralRings.forEach(ring => ring.material.opacity *= fadeOut);
      beamElements.shockwaves.forEach(shock => shock.material.opacity *= fadeOut);
      beamElements.sparkTrail.material.opacity *= fadeOut;
      beamMaterial.opacity *= fadeOut;

      coreMaterial.opacity *= fadeOut;
      glowMaterial.opacity *= fadeOut;
    }

    if (fireProgress >= 2.5) {
      isFiring = false;
      resetZoltraak();
    }
  }
}

// ゾルトラークをリセット
function resetZoltraak() {
  isCharging = false;
  isFiring = false;
  chargeProgress = 0;
  fireProgress = 0;

  // 全ての要素をリセット
  magicCircleGroup.scale.setScalar(0);

  coreMaterial.opacity = 0;
  glowMaterial.opacity = 0;
  chargeParticleMaterial.opacity = 0;
  beamMaterial.opacity = 0;

  beamElements.coreBeam.material.opacity = 0;
  beamElements.innerBeam.material.opacity = 0;
  beamElements.outerBeam.material.opacity = 0;
  beamElements.glowBeam.material.opacity = 0;
  beamElements.beamHead.material.opacity = 0;
  beamElements.beamHeadGlow.material.opacity = 0;
  beamElements.spiralRings.forEach(ring => ring.material.opacity = 0);
  beamElements.shockwaves.forEach(shock => shock.material.opacity = 0);
  beamElements.sparkTrail.material.opacity = 0;

  // スパークトレイルのリセット
  beamElements.sparkTrailData.forEach((spark, i) => {
    spark.z = 0;
    const sparkPos = beamElements.sparkTrail.geometry.attributes.position.array;
    sparkPos[i * 3] = 0;
    sparkPos[i * 3 + 1] = 0;
    sparkPos[i * 3 + 2] = 0;
  });
  beamElements.sparkTrail.geometry.attributes.position.needsUpdate = true;

  // ビームパーティクルのリセット
  const beamPos = beamParticles.geometry.attributes.position.array;
  for (let i = 0; i < beamParticleCount; i++) {
    beamPos[i * 3] = 0;
    beamPos[i * 3 + 1] = 0;
    beamPos[i * 3 + 2] = 0;
  }
  beamParticles.geometry.attributes.position.needsUpdate = true;
}

// 右手の位置と向きを取得
function getRightHandTransform(hand, frame, referenceSpace) {
  if (!hand || !frame || !referenceSpace) return null;

  const wristSpace = hand.get('wrist');
  const middleTip = hand.get('middle-finger-tip');

  if (!wristSpace || !middleTip) return null;

  const wristPose = frame.getJointPose(wristSpace, referenceSpace);
  const middleTipPose = frame.getJointPose(middleTip, referenceSpace);
  if (!wristPose || !middleTipPose) return null;

  const wristPosition = new THREE.Vector3(
    wristPose.transform.position.x,
    wristPose.transform.position.y,
    wristPose.transform.position.z
  );

  const middleTipPosition = new THREE.Vector3(
    middleTipPose.transform.position.x,
    middleTipPose.transform.position.y,
    middleTipPose.transform.position.z
  );

  // 手のひらの中心を計算
  const palmCenter = new THREE.Vector3().addVectors(wristPosition, middleTipPosition).multiplyScalar(0.5);

  const quaternion = new THREE.Quaternion(
    wristPose.transform.orientation.x,
    wristPose.transform.orientation.y,
    wristPose.transform.orientation.z,
    wristPose.transform.orientation.w
  );

  // 右手の場合、手のひらの法線は-Y方向（ローカル座標）で手のひら側を向く
  const palmNormal = new THREE.Vector3(0, -1, 0);
  palmNormal.applyQuaternion(quaternion);

  // 上向きに角度を調整（palmNormalに上方向を加える）
  const adjustedNormal = palmNormal.clone();
  adjustedNormal.y += 0.4; // 上向きに調整
  adjustedNormal.normalize();

  // エフェクトを手のひらの前に配置（少し離す）
  const offset = adjustedNormal.clone().multiplyScalar(0.15);
  const effectPosition = palmCenter.clone().add(offset);

  // エフェクトが手のひらから外向きに出るように回転（逆方向を向く）
  const effectQuaternion = new THREE.Quaternion();
  const up = new THREE.Vector3(0, 1, 0);
  const lookMatrix = new THREE.Matrix4();
  // ビームが手のひらから離れる方向に飛ぶよう、adjustedNormalの逆方向からlookAt
  const lookFrom = effectPosition.clone().add(adjustedNormal);
  lookMatrix.lookAt(lookFrom, effectPosition, up);
  effectQuaternion.setFromRotationMatrix(lookMatrix);

  return {
    position: effectPosition,
    quaternion: effectQuaternion,
    palmNormal: palmNormal
  };
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
  const middleTip = hand.get('middle-finger-tip');

  if (!wristSpace || !middleTip) return null;

  const wristPose = frame.getJointPose(wristSpace, referenceSpace);
  const middleTipPose = frame.getJointPose(middleTip, referenceSpace);
  if (!wristPose || !middleTipPose) return null;

  const wristPosition = new THREE.Vector3(
    wristPose.transform.position.x,
    wristPose.transform.position.y,
    wristPose.transform.position.z
  );

  const middleTipPosition = new THREE.Vector3(
    middleTipPose.transform.position.x,
    middleTipPose.transform.position.y,
    middleTipPose.transform.position.z
  );

  // 手のひらの中心を計算（手首と中指先端の中間点）
  const palmCenter = new THREE.Vector3().addVectors(wristPosition, middleTipPosition).multiplyScalar(0.5);

  const quaternion = new THREE.Quaternion(
    wristPose.transform.orientation.x,
    wristPose.transform.orientation.y,
    wristPose.transform.orientation.z,
    wristPose.transform.orientation.w
  );

  // 手のひらの法線方向（手のひらが向いている方向）を計算
  // 左手の場合、手のひらの法線は-Y方向（ローカル座標）で手のひら側を向く
  const palmNormal = new THREE.Vector3(0, -1, 0);
  palmNormal.applyQuaternion(quaternion);

  // 上向きに角度を調整（palmNormalに上方向を加える）
  const adjustedNormal = palmNormal.clone();
  adjustedNormal.y += 0.4; // 上向きに調整
  adjustedNormal.normalize();

  // シールドを手のひらの前に配置（調整した法線方向に少しオフセット）
  const offset = adjustedNormal.clone().multiplyScalar(0.001);
  const shieldPosition = palmCenter.clone().add(offset);

  // シールドが手のひらを向くように回転を計算
  // 調整した法線方向を向くクォータニオンを計算
  const shieldQuaternion = new THREE.Quaternion();
  const up = new THREE.Vector3(0, 1, 0);
  const lookMatrix = new THREE.Matrix4();
  const lookTarget = shieldPosition.clone().sub(adjustedNormal);
  lookMatrix.lookAt(shieldPosition, lookTarget, up);
  shieldQuaternion.setFromRotationMatrix(lookMatrix);

  return {
    position: shieldPosition,
    quaternion: shieldQuaternion
  };
}

// ========== 深度可視化 ==========

function createDepthVisualizationMesh() {
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

// 再利用可能なベクトル（GC回避）
const _cameraPosition = new THREE.Vector3();
const _cameraQuaternion = new THREE.Quaternion();
const _forward = new THREE.Vector3();

// 深度テクスチャを直接更新するための参照
let depthTextureData = null;

function updateDepthInfo(frame, referenceSpace, timestamp) {
  if (!showDepthVisualization) {
    if (depthMesh) depthMesh.visible = false;
    return;
  }

  const viewerPose = frame.getViewerPose(referenceSpace);
  if (!viewerPose || !viewerPose.views[0]) return;

  const view = viewerPose.views[0];
  if (!view.camera) return;

  const depthInfo = frame.getDepthInformation(view);
  if (!depthInfo) return;

  if (!depthMesh) {
    createDepthVisualizationMesh();
  }

  const w = depthInfo.width;
  const h = depthInfo.height;

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

// 検出されたプレーン（壁・テーブル）からメッシュを更新
function updatePlaneMeshes(frame, referenceSpace) {
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

// ビームのレイキャストで壁・テーブルとの衝突を検出
function getBeamHitDistance(beamOrigin, beamDirection) {
  if (planeMeshes.length === 0) {
    return beamMaxLength;
  }

  raycaster.set(beamOrigin, beamDirection);
  raycaster.far = beamMaxLength;

  const intersects = raycaster.intersectObjects(planeMeshes, false);

  if (intersects.length > 0) {
    return intersects[0].distance;
  }

  return beamMaxLength;
}

// アニメーションループ
function animate(timestamp, frame) {
  const time = timestamp ? timestamp / 1000 : performance.now() / 1000;

  // XRセッション中の処理
  if (frame && xrSession) {
    const referenceSpace = renderer.xr.getReferenceSpace();

    // 深度情報を更新
    updateDepthInfo(frame, referenceSpace, timestamp);

    // プレーンメッシュを更新（壁・テーブル検出）
    updatePlaneMeshes(frame, referenceSpace);

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

    // 右手のハンドトラッキングをチェック（ゾルトラーク用）
    let rightHand = null;
    const sessionForRight = renderer.xr.getSession();
    if (sessionForRight) {
      for (const inputSource of sessionForRight.inputSources) {
        if (inputSource.hand && inputSource.handedness === 'right') {
          rightHand = inputSource.hand;
          break;
        }
      }
    }

    if (rightHand) {
      const handOpen = isHandOpen(rightHand, frame, referenceSpace);

      if (handOpen !== isRightHandOpen) {
        isRightHandOpen = handOpen;

        if (handOpen && zoltraakGroup) {
          // 右手がパーになったらゾルトラーク発動
          zoltraakGroup.visible = true;
          castZoltraak();
        }
      }

      // ゾルトラークの位置を右手の前に更新
      if (zoltraakGroup && (isCharging || isFiring)) {
        const handTransform = getRightHandTransform(rightHand, frame, referenceSpace);
        if (handTransform) {
          zoltraakGroup.position.copy(handTransform.position);
          zoltraakGroup.quaternion.copy(handTransform.quaternion);
        }
      }
    }

    // ゾルトラークが終了したら非表示に
    if (zoltraakGroup && !isCharging && !isFiring && !isRightHandOpen) {
      zoltraakGroup.visible = false;
    }
  }

  // シールドのアニメーションを更新
  updateShield(time);

  // ゾルトラークのアニメーションを更新
  updateZoltraak(time);

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
        usagePreference: ['gpu-optimized', 'cpu-optimized'],
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
      depthTextureData = null;

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
