import * as THREE from 'three';

// ゾルトラーク用変数
let zoltraakGroup = null;
let magicCircleGroup = null;
let beamGroup = null;
let isCharging = false;
let isFiring = false;
let isCancelling = false;
let cancelProgress = 0;
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

// チャージパーティクル
let chargeParticles = null;
let chargeParticleMaterial = null;
let chargeParticleOriginalPositions = [];

// コア
let core = null;
let coreMaterial = null;
let coreGlow = null;
let glowMaterial = null;

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
export function createZoltraak(scene) {
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
  const sparkSizes = new Float32Array(sparkCount);
  const sparkData = [];

  for (let i = 0; i < sparkCount; i++) {
    const angle = Math.random() * Math.PI * 2;
    const radius = (2 + Math.random() * 2) * scale;
    sparkPositions[i * 3] = Math.cos(angle) * radius;
    sparkPositions[i * 3 + 1] = Math.sin(angle) * radius;
    sparkPositions[i * 3 + 2] = 0;
    sparkSizes[i] = 0.006 + Math.random() * 0.008;
    sparkData.push({
      angle: angle,
      radius: radius,
      speed: 0.5 + Math.random() * 1,
      phase: Math.random() * Math.PI * 2
    });
  }

  sparkGeometry.setAttribute('position', new THREE.BufferAttribute(sparkPositions, 3));
  sparkGeometry.setAttribute('size', new THREE.BufferAttribute(sparkSizes, 1));

  const sparkMaterial = new THREE.ShaderMaterial({
    uniforms: {
      color: { value: new THREE.Color(0xaaccff) },
      opacity: { value: 0 }
    },
    vertexShader: `
      attribute float size;
      void main() {
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        gl_PointSize = size * (500.0 / -mvPosition.z);
        gl_Position = projectionMatrix * mvPosition;
      }
    `,
    fragmentShader: `
      uniform vec3 color;
      uniform float opacity;
      void main() {
        float dist = length(gl_PointCoord - vec2(0.5));
        if (dist > 0.5) discard;
        float alpha = 1.0 - smoothstep(0.3, 0.5, dist);
        gl_FragColor = vec4(color, opacity * alpha);
      }
    `,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false
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
  const chargeSizes = new Float32Array(chargeParticleCount);
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

    chargeSizes[i] = 0.003 + Math.random() * 0.007;
    chargeParticleOriginalPositions.push({ x, y, z });
  }

  chargeGeometry.setAttribute('position', new THREE.BufferAttribute(chargePositions, 3));
  chargeGeometry.setAttribute('size', new THREE.BufferAttribute(chargeSizes, 1));

  chargeParticleMaterial = new THREE.ShaderMaterial({
    uniforms: {
      color: { value: new THREE.Color(0x88aaff) },
      opacity: { value: 0 }
    },
    vertexShader: `
      attribute float size;
      void main() {
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        gl_PointSize = size * (500.0 / -mvPosition.z);
        gl_Position = projectionMatrix * mvPosition;
      }
    `,
    fragmentShader: `
      uniform vec3 color;
      uniform float opacity;
      void main() {
        float dist = length(gl_PointCoord - vec2(0.5));
        if (dist > 0.5) discard;
        float alpha = 1.0 - smoothstep(0.3, 0.5, dist);
        gl_FragColor = vec4(color, opacity * alpha);
      }
    `,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false
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
  const sparkTrailSizes = new Float32Array(sparkTrailCount);
  const sparkTrailData = [];

  for (let i = 0; i < sparkTrailCount; i++) {
    sparkTrailPositions[i * 3] = 0;
    sparkTrailPositions[i * 3 + 1] = 0;
    sparkTrailPositions[i * 3 + 2] = 0;
    sparkTrailSizes[i] = 0.005 + Math.random() * 0.006;
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
  sparkTrailGeometry.setAttribute('size', new THREE.BufferAttribute(sparkTrailSizes, 1));

  const sparkTrailMaterial = new THREE.ShaderMaterial({
    uniforms: {
      color: { value: new THREE.Color(0xccddff) },
      opacity: { value: 0 }
    },
    vertexShader: `
      attribute float size;
      void main() {
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        gl_PointSize = size * (500.0 / -mvPosition.z);
        gl_Position = projectionMatrix * mvPosition;
      }
    `,
    fragmentShader: `
      uniform vec3 color;
      uniform float opacity;
      void main() {
        float dist = length(gl_PointCoord - vec2(0.5));
        if (dist > 0.5) discard;
        float alpha = 1.0 - smoothstep(0.3, 0.5, dist);
        gl_FragColor = vec4(color, opacity * alpha);
      }
    `,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  });

  const sparkTrail = new THREE.Points(sparkTrailGeometry, sparkTrailMaterial);
  zoltraakGroup.add(sparkTrail);

  // ビームパーティクル
  const beamGeometry = new THREE.BufferGeometry();
  const beamPositions = new Float32Array(beamParticleCount * 3);
  const beamSizes = new Float32Array(beamParticleCount);
  beamVelocities = [];

  for (let i = 0; i < beamParticleCount; i++) {
    beamPositions[i * 3] = 0;
    beamPositions[i * 3 + 1] = 0;
    beamPositions[i * 3 + 2] = 0;
    beamSizes[i] = 0.008 + Math.random() * 0.014;
    beamVelocities.push({
      x: (Math.random() - 0.5) * 0.03,
      y: (Math.random() - 0.5) * 0.03,
      z: Math.random() * 0.2 + 0.15,
      life: Math.random()
    });
  }

  beamGeometry.setAttribute('position', new THREE.BufferAttribute(beamPositions, 3));
  beamGeometry.setAttribute('size', new THREE.BufferAttribute(beamSizes, 1));

  beamMaterial = new THREE.ShaderMaterial({
    uniforms: {
      color: { value: new THREE.Color(0xaaccff) },
      opacity: { value: 0 }
    },
    vertexShader: `
      attribute float size;
      void main() {
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        gl_PointSize = size * (500.0 / -mvPosition.z);
        gl_Position = projectionMatrix * mvPosition;
      }
    `,
    fragmentShader: `
      uniform vec3 color;
      uniform float opacity;
      void main() {
        float dist = length(gl_PointCoord - vec2(0.5));
        if (dist > 0.5) discard;
        float alpha = 1.0 - smoothstep(0.3, 0.5, dist);
        gl_FragColor = vec4(color, opacity * alpha);
      }
    `,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false
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
export function castZoltraak() {
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
export function updateZoltraak(time, getBeamHitDistance) {
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
    allMagicCircleElements.sparks.mesh.material.uniforms.opacity.value = fadeIn * 0.8;

    // チャージパーティクルの収束
    chargeParticleMaterial.uniforms.opacity.value = Math.min(chargeProgress * 2, 0.8);
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
    if (zoltraakGroup && zoltraakGroup.visible && getBeamHitDistance) {
      // ビームの起点と方向をワールド座標で取得
      const beamOrigin = new THREE.Vector3();
      const beamDirection = new THREE.Vector3(0, 0, 1); // ローカルのZ方向
      zoltraakGroup.getWorldPosition(beamOrigin);
      beamDirection.applyQuaternion(zoltraakGroup.quaternion);
      beamDirection.normalize();

      // レイキャストで衝突距離を取得
      const hitDistance = getBeamHitDistance(beamOrigin, beamDirection);

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
      beamElements.sparkTrail.material.uniforms.opacity.value = 0.7 * beamPulse;
    }

    // ビームパーティクル
    beamMaterial.uniforms.opacity.value = 0.8 * beamPulse;
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
    chargeParticleMaterial.uniforms.opacity.value = Math.max(0.8 - fireProgress * 2, 0);

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
    allMagicCircleElements.sparks.mesh.material.uniforms.opacity.value = 0.9 * firePulse;

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
      allMagicCircleElements.sparks.mesh.material.uniforms.opacity.value *= fadeOut;

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
      beamElements.sparkTrail.material.uniforms.opacity.value *= fadeOut;
      beamMaterial.uniforms.opacity.value *= fadeOut;

      coreMaterial.opacity *= fadeOut;
      glowMaterial.opacity *= fadeOut;
    }

    if (fireProgress >= 2.5) {
      isFiring = false;
      resetZoltraak();
    }
  }

  // キャンセル中のフェードアウト処理
  if (isCancelling) {
    cancelProgress += 0.05; // フェードアウト速度

    const fadeOut = Math.max(1 - cancelProgress, 0);
    const currentMagicScale = magicCircleGroup.scale.x;
    const currentBeamScale = beamGroup.scale.x;

    // スケールを縮小（魔法陣とビーム両方）
    magicCircleGroup.scale.setScalar(currentMagicScale * fadeOut);
    beamGroup.scale.setScalar(currentBeamScale * fadeOut);

    // 全要素のopacityをフェードアウト
    coreMaterial.opacity *= fadeOut;
    glowMaterial.opacity *= fadeOut;
    chargeParticleMaterial.uniforms.opacity.value *= fadeOut;
    beamMaterial.uniforms.opacity.value *= fadeOut;

    beamElements.coreBeam.material.opacity *= fadeOut;
    beamElements.innerBeam.material.opacity *= fadeOut;
    beamElements.outerBeam.material.opacity *= fadeOut;
    beamElements.glowBeam.material.opacity *= fadeOut;
    beamElements.beamHead.material.opacity *= fadeOut;
    beamElements.beamHeadGlow.material.opacity *= fadeOut;
    beamElements.spiralRings.forEach(ring => ring.material.opacity *= fadeOut);
    beamElements.shockwaves.forEach(shock => shock.material.opacity *= fadeOut);
    beamElements.sparkTrail.material.uniforms.opacity.value *= fadeOut;

    // キャンセル完了
    if (cancelProgress >= 1) {
      resetZoltraak();
      zoltraakGroup.visible = false;
    }
  }
}

// ゾルトラークをキャンセル（フェードアウト開始）
export function cancelZoltraak() {
  isCharging = false;
  isFiring = false;
  isCancelling = true;
  cancelProgress = 0;
}

// ゾルトラークをリセット
export function resetZoltraak() {
  isCharging = false;
  isFiring = false;
  isCancelling = false;
  cancelProgress = 0;
  chargeProgress = 0;
  fireProgress = 0;

  // 全ての要素をリセット
  magicCircleGroup.scale.setScalar(0);
  beamGroup.scale.setScalar(1); // ビームグループのスケールを元に戻す

  coreMaterial.opacity = 0;
  glowMaterial.opacity = 0;
  chargeParticleMaterial.uniforms.opacity.value = 0;
  beamMaterial.uniforms.opacity.value = 0;

  beamElements.coreBeam.material.opacity = 0;
  beamElements.innerBeam.material.opacity = 0;
  beamElements.outerBeam.material.opacity = 0;
  beamElements.glowBeam.material.opacity = 0;
  beamElements.beamHead.material.opacity = 0;
  beamElements.beamHeadGlow.material.opacity = 0;
  beamElements.spiralRings.forEach(ring => ring.material.opacity = 0);
  beamElements.shockwaves.forEach(shock => shock.material.opacity = 0);
  beamElements.sparkTrail.material.uniforms.opacity.value = 0;

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

// ゾルトラークグループを取得
export function getZoltraakGroup() {
  return zoltraakGroup;
}

// 状態を取得
export function getZoltraakState() {
  return {
    isCharging,
    isFiring,
    isCancelling
  };
}
