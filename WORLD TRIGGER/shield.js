import * as THREE from 'three';

// シールド用変数
let shieldGroup = null;
let hexagonMeshes = [];
let shieldParticles = null;
let particleGeometry = null;
let particleMaterial = null;
let particleSpeeds = [];
let shieldProgress = 0;
let targetShieldProgress = 0;
let shieldRadius = 0.5625; // 手の前に表示（2.25倍サイズ）
let impactTime = -10;
let impactPoint = new THREE.Vector3();
let shieldCollisionMesh = null; // 衝突判定用の不可視メッシュ
let isBeamHittingShield = false; // ビームがシールドに当たっているか
let lastShieldImpactTime = 0; // 最後に衝撃波を発生させた時間
let shieldImpactInterval = 0.15; // 衝撃波の発生間隔（秒）

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

        // 衝撃波エフェクト - 衝撃点から外側に広がる波紋
        float impactAge = time - impactTime;
        float impactDist = distance(vWorldPosition, impactPoint);

        // 波の速度と幅
        float waveSpeed = 2.5;
        float waveWidth = 0.08;
        float waveRadius = impactAge * waveSpeed;

        // リング状の波紋（距離が波の半径に近いほど明るい）
        float ringDist = abs(impactDist - waveRadius);
        float ring = smoothstep(waveWidth, 0.0, ringDist);

        // 波の減衰（時間と共に薄くなる）
        float waveFade = exp(-impactAge * 3.0);

        // 2つ目の波（少し遅れて追従）
        float waveRadius2 = max(0.0, impactAge * waveSpeed - 0.15);
        float ringDist2 = abs(impactDist - waveRadius2);
        float ring2 = smoothstep(waveWidth * 0.7, 0.0, ringDist2) * 0.6;

        float impact = (ring + ring2) * waveFade * step(0.0, impactAge) * step(impactAge, 1.5);

        float alpha = (pulse + fresnel + impact * 1.5) * shieldProgress;
        vec3 color = baseColor + vec3(0.5, 0.7, 0.3) * impact;

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

        // 衝撃波エフェクト - 衝撃点から外側に広がる波紋
        float impactAge = time - impactTime;
        float impactDist = distance(vWorldPosition, impactPoint);

        // 波の速度と幅
        float waveSpeed = 2.5;
        float waveWidth = 0.08;
        float waveRadius = impactAge * waveSpeed;

        // リング状の波紋
        float ringDist = abs(impactDist - waveRadius);
        float ring = smoothstep(waveWidth, 0.0, ringDist);

        // 波の減衰
        float waveFade = exp(-impactAge * 3.0);

        // 2つ目の波
        float waveRadius2 = max(0.0, impactAge * waveSpeed - 0.15);
        float ringDist2 = abs(impactDist - waveRadius2);
        float ring2 = smoothstep(waveWidth * 0.7, 0.0, ringDist2) * 0.6;

        float impact = (ring + ring2) * waveFade * step(0.0, impactAge) * step(impactAge, 1.5);

        float alpha = (brightness + impact * 3.0) * shieldProgress;
        vec3 color = baseColor + vec3(0.6, 0.5, 0.1) * impact;

        gl_FragColor = vec4(color, alpha);
      }
    `,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending
  });
}

// シールドを作成
export function createShield(scene) {
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
  const particleSizes = new Float32Array(particleCount);
  particleSpeeds = [];
  const particleZOffset = -shieldRadius * 0.7;

  for (let i = 0; i < particleCount; i++) {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(1 - Math.random() * 0.15);
    const r = shieldRadius + (Math.random() - 0.5) * 0.015;

    particlePositions[i * 3] = Math.sin(phi) * Math.cos(theta) * r;
    particlePositions[i * 3 + 1] = Math.sin(phi) * Math.sin(theta) * r;
    particlePositions[i * 3 + 2] = Math.cos(phi) * r + particleZOffset;

    particleSizes[i] = 0.003 + Math.random() * 0.006;
    particleSpeeds.push({ theta: (Math.random() - 0.5) * 0.012 });
  }

  particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
  particleGeometry.setAttribute('size', new THREE.BufferAttribute(particleSizes, 1));

  particleMaterial = new THREE.ShaderMaterial({
    uniforms: {
      color: { value: new THREE.Color(0x88ddff) },
      opacity: { value: 0.4 }
    },
    vertexShader: `
      attribute float size;
      varying float vOpacity;
      void main() {
        vOpacity = 1.0;
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        gl_PointSize = size * (500.0 / -mvPosition.z);
        gl_Position = projectionMatrix * mvPosition;
      }
    `,
    fragmentShader: `
      uniform vec3 color;
      uniform float opacity;
      varying float vOpacity;
      void main() {
        float dist = length(gl_PointCoord - vec2(0.5));
        if (dist > 0.5) discard;
        float alpha = 1.0 - smoothstep(0.3, 0.5, dist);
        gl_FragColor = vec4(color, opacity * alpha * vOpacity);
      }
    `,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  });

  shieldParticles = new THREE.Points(particleGeometry, particleMaterial);
  shieldGroup.add(shieldParticles);

  // 衝突判定用の不可視メッシュ（半球）
  const collisionGeometry = new THREE.SphereGeometry(shieldRadius, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2);
  const collisionMaterial = new THREE.MeshBasicMaterial({
    visible: false,
    side: THREE.DoubleSide
  });
  shieldCollisionMesh = new THREE.Mesh(collisionGeometry, collisionMaterial);
  shieldCollisionMesh.position.z = -shieldRadius * 0.7; // シールドと同じZオフセット
  shieldCollisionMesh.rotation.x = Math.PI / 2; // 前方を向くように回転
  shieldGroup.add(shieldCollisionMesh);

  shieldGroup.visible = false;
  scene.add(shieldGroup);
}

// シールドのアニメーションを更新
export function updateShield(time, isFiring) {
  if (!shieldGroup) return;

  // プログレスをスムーズに変化
  shieldProgress += (targetShieldProgress - shieldProgress) * 0.08;

  // シールドの表示/非表示
  shieldGroup.visible = shieldProgress > 0.01;

  // ビームがシールドに当たっている場合、断続的に衝撃波を発生
  if (isBeamHittingShield && isFiring && shieldProgress > 0.3) {
    if (time - lastShieldImpactTime > shieldImpactInterval) {
      lastShieldImpactTime = time;
      impactTime = time;
      // 衝撃波の発生間隔をランダムに変化させる
      shieldImpactInterval = 0.08 + Math.random() * 0.12;
    }
  }

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
    hex.fill.material.uniforms.impactTime.value = impactTime;
    hex.fill.material.uniforms.impactPoint.value.copy(impactPoint);
    hex.line.material.uniforms.time.value = time;
    hex.line.material.uniforms.shieldProgress.value = localProgress;
    hex.line.material.uniforms.impactTime.value = impactTime;
    hex.line.material.uniforms.impactPoint.value.copy(impactPoint);

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
    particleMaterial.uniforms.opacity.value = 0.4 * shieldProgress;
  }
}

// シールドのターゲットプログレスを設定
export function setTargetShieldProgress(progress) {
  targetShieldProgress = progress;
}

// シールドのランダムディレイをリセット
export function resetShieldRandomDelays() {
  hexagonMeshes.forEach(hex => {
    const newDelay = Math.random();
    hex.fill.userData.randomDelay = newDelay;
    hex.line.userData.randomDelay = newDelay;
  });
}

// シールドグループを取得
export function getShieldGroup() {
  return shieldGroup;
}

// シールド衝突メッシュを取得
export function getShieldCollisionMesh() {
  return shieldCollisionMesh;
}

// シールドプログレスを取得
export function getShieldProgress() {
  return shieldProgress;
}

// ビームがシールドに当たっているかを設定
export function setIsBeamHittingShield(value) {
  isBeamHittingShield = value;
}

// 衝撃点を設定
export function setImpactPoint(point) {
  impactPoint.copy(point);
}
