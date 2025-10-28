import * as THREE from 'three';

// 惑星データ（相対的なサイズと軌道）
const planetData = {
  sun: {
    name: '太陽',
    radius: 2,
    distance: 0,
    speed: 0,
    color: 0xFDB813,
    emissive: 0xFDB813,
    emissiveIntensity: 2,
  },
  mercury: {
    name: '水星',
    radius: 0.2,
    distance: 5,
    speed: 4.15,
    color: 0x8C7853,
    bumpScale: 0.05,
  },
  venus: {
    name: '金星',
    radius: 0.35,
    distance: 7,
    speed: 1.62,
    color: 0xFFC649,
    bumpScale: 0.03,
  },
  earth: {
    name: '地球',
    radius: 0.4,
    distance: 10,
    speed: 1,
    color: 0x2233FF,
    bumpScale: 0.08,
  },
  mars: {
    name: '火星',
    radius: 0.3,
    distance: 13,
    speed: 0.53,
    color: 0xCD5C5C,
    bumpScale: 0.1,
  },
  jupiter: {
    name: '木星',
    radius: 1.2,
    distance: 20,
    speed: 0.08,
    color: 0xDAA520,
    bumpScale: 0.02,
  },
  saturn: {
    name: '土星',
    radius: 1.0,
    distance: 28,
    speed: 0.03,
    color: 0xF4E7C1,
    bumpScale: 0.02,
    hasRing: true,
  },
  uranus: {
    name: '天王星',
    radius: 0.6,
    distance: 35,
    speed: 0.01,
    color: 0x4FD0E7,
    bumpScale: 0.03,
  },
  neptune: {
    name: '海王星',
    radius: 0.55,
    distance: 40,
    speed: 0.006,
    color: 0x4169E1,
    bumpScale: 0.03,
  }
};

// パーリンノイズ風の関数
function noise2D(x, y) {
  const n = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453123;
  return n - Math.floor(n);
}

// 詳細な惑星マテリアルの生成
function createPlanetMaterial(data) {
  if (data.name === '太陽') {
    // 太陽は発光する特殊なマテリアル
    const canvas = document.createElement('canvas');
    canvas.width = 2048;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d');

    // 太陽の表面のテクスチャ
    const imageData = ctx.createImageData(canvas.width, canvas.height);
    const pixels = imageData.data;

    for (let y = 0; y < canvas.height; y++) {
      for (let x = 0; x < canvas.width; x++) {
        const i = (y * canvas.width + x) * 4;
        const n = noise2D(x * 0.01, y * 0.01) * 0.3 + 0.7;
        pixels[i] = 253 * n;
        pixels[i + 1] = 184 * n;
        pixels[i + 2] = 19 * n;
        pixels[i + 3] = 255;
      }
    }

    ctx.putImageData(imageData, 0, 0);
    const texture = new THREE.CanvasTexture(canvas);

    const material = new THREE.MeshBasicMaterial({
      map: texture,
    });
    return material;
  }

  const canvas = document.createElement('canvas');
  canvas.width = 2048;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');

  // 惑星ごとのテクスチャ生成
  switch(data.name) {
    case '水星':
      createMercuryTexture(ctx, canvas.width, canvas.height);
      break;
    case '金星':
      createVenusTexture(ctx, canvas.width, canvas.height);
      break;
    case '地球':
      createEarthTexture(ctx, canvas.width, canvas.height);
      break;
    case '火星':
      createMarsTexture(ctx, canvas.width, canvas.height);
      break;
    case '木星':
      createJupiterTexture(ctx, canvas.width, canvas.height);
      break;
    case '土星':
      createSaturnTexture(ctx, canvas.width, canvas.height);
      break;
    case '天王星':
      createUranusTexture(ctx, canvas.width, canvas.height);
      break;
    case '海王星':
      createNeptuneTexture(ctx, canvas.width, canvas.height);
      break;
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;

  const material = new THREE.MeshStandardMaterial({
    map: texture,
    roughness: data.name === '地球' ? 0.6 : 0.9,
    metalness: 0.1,
  });

  return material;
}

// 水星のテクスチャ（灰色でクレーターだらけ）
function createMercuryTexture(ctx, width, height) {
  const imageData = ctx.createImageData(width, height);
  const pixels = imageData.data;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * 4;
      const n = noise2D(x * 0.02, y * 0.02);
      const gray = 100 + n * 60;
      pixels[i] = gray;
      pixels[i + 1] = gray * 0.9;
      pixels[i + 2] = gray * 0.8;
      pixels[i + 3] = 255;
    }
  }

  ctx.putImageData(imageData, 0, 0);

  // クレーターを追加
  for (let i = 0; i < 200; i++) {
    const x = Math.random() * width;
    const y = Math.random() * height;
    const radius = 5 + Math.random() * 40;
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
    gradient.addColorStop(0, 'rgba(40, 40, 40, 0.8)');
    gradient.addColorStop(0.6, 'rgba(60, 60, 60, 0.4)');
    gradient.addColorStop(1, 'rgba(80, 80, 80, 0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(x - radius, y - radius, radius * 2, radius * 2);
  }
}

// 金星のテクスチャ（黄白色で雲に覆われている）
function createVenusTexture(ctx, width, height) {
  const imageData = ctx.createImageData(width, height);
  const pixels = imageData.data;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * 4;
      const n1 = noise2D(x * 0.015, y * 0.015);
      const n2 = noise2D(x * 0.03 + 100, y * 0.03);
      const brightness = 0.7 + n1 * 0.2 + n2 * 0.1;
      pixels[i] = 255 * brightness;
      pixels[i + 1] = 220 * brightness;
      pixels[i + 2] = 150 * brightness;
      pixels[i + 3] = 255;
    }
  }

  ctx.putImageData(imageData, 0, 0);
}

// 地球のテクスチャ（青い海と緑の大陸）
function createEarthTexture(ctx, width, height) {
  const imageData = ctx.createImageData(width, height);
  const pixels = imageData.data;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * 4;
      const n1 = noise2D(x * 0.02, y * 0.02);
      const n2 = noise2D(x * 0.01 + 50, y * 0.01 + 50);

      // 海と陸の判定
      if (n1 > 0.3) {
        // 陸地（緑と茶色）
        const landType = n2;
        if (landType > 0.6) {
          // 森林（緑）
          pixels[i] = 50 + n1 * 50;
          pixels[i + 1] = 120 + n1 * 60;
          pixels[i + 2] = 50 + n1 * 30;
        } else if (landType > 0.3) {
          // 平原（黄緑）
          pixels[i] = 130 + n1 * 50;
          pixels[i + 1] = 160 + n1 * 40;
          pixels[i + 2] = 70 + n1 * 30;
        } else {
          // 砂漠（茶色）
          pixels[i] = 180 + n1 * 40;
          pixels[i + 1] = 150 + n1 * 40;
          pixels[i + 2] = 100 + n1 * 40;
        }
      } else {
        // 海（青）
        const depth = n1 * 2;
        pixels[i] = 30 + depth * 50;
        pixels[i + 1] = 80 + depth * 80;
        pixels[i + 2] = 180 + depth * 50;
      }
      pixels[i + 3] = 255;
    }
  }

  ctx.putImageData(imageData, 0, 0);

  // 雲を追加
  for (let i = 0; i < 100; i++) {
    const x = Math.random() * width;
    const y = Math.random() * height;
    const radius = 20 + Math.random() * 80;
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 0.7)');
    gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.4)');
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(x - radius, y - radius, radius * 2, radius * 2);
  }
}

// 火星のテクスチャ（赤茶色）
function createMarsTexture(ctx, width, height) {
  const imageData = ctx.createImageData(width, height);
  const pixels = imageData.data;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * 4;
      const n = noise2D(x * 0.02, y * 0.02);
      const brightness = 0.6 + n * 0.4;
      pixels[i] = 205 * brightness;
      pixels[i + 1] = 92 * brightness;
      pixels[i + 2] = 52 * brightness;
      pixels[i + 3] = 255;
    }
  }

  ctx.putImageData(imageData, 0, 0);

  // 極冠（白）
  const polarSize = height * 0.15;
  const northGradient = ctx.createRadialGradient(width / 2, 0, 0, width / 2, 0, polarSize);
  northGradient.addColorStop(0, 'rgba(255, 255, 255, 0.9)');
  northGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
  ctx.fillStyle = northGradient;
  ctx.fillRect(0, 0, width, polarSize);

  const southGradient = ctx.createRadialGradient(width / 2, height, 0, width / 2, height, polarSize);
  southGradient.addColorStop(0, 'rgba(255, 255, 255, 0.9)');
  southGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
  ctx.fillStyle = southGradient;
  ctx.fillRect(0, height - polarSize, width, polarSize);
}

// 木星のテクスチャ（縞模様と大赤斑）
function createJupiterTexture(ctx, width, height) {
  const imageData = ctx.createImageData(width, height);
  const pixels = imageData.data;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * 4;
      const bands = Math.sin(y * 0.03) * 0.5 + 0.5;
      const n = noise2D(x * 0.05, y * 0.05);

      if (bands > 0.5) {
        // 明るい帯（ベージュ/白）
        const brightness = 0.8 + n * 0.2;
        pixels[i] = 240 * brightness;
        pixels[i + 1] = 220 * brightness;
        pixels[i + 2] = 180 * brightness;
      } else {
        // 暗い帯（オレンジ/茶色）
        const brightness = 0.6 + n * 0.2;
        pixels[i] = 218 * brightness;
        pixels[i + 1] = 165 * brightness;
        pixels[i + 2] = 32 * brightness;
      }
      pixels[i + 3] = 255;
    }
  }

  ctx.putImageData(imageData, 0, 0);

  // 大赤斑
  const spotX = width * 0.6;
  const spotY = height * 0.45;
  const spotW = 200;
  const spotH = 100;

  ctx.save();
  ctx.translate(spotX, spotY);
  ctx.scale(1, 0.5);
  const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, spotW);
  gradient.addColorStop(0, 'rgba(200, 80, 60, 0.8)');
  gradient.addColorStop(0.5, 'rgba(180, 70, 50, 0.6)');
  gradient.addColorStop(1, 'rgba(160, 60, 40, 0)');
  ctx.fillStyle = gradient;
  ctx.fillRect(-spotW, -spotW, spotW * 2, spotW * 2);
  ctx.restore();
}

// 土星のテクスチャ（薄い黄色の縞模様）
function createSaturnTexture(ctx, width, height) {
  const imageData = ctx.createImageData(width, height);
  const pixels = imageData.data;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * 4;
      const bands = Math.sin(y * 0.025) * 0.3 + 0.7;
      const n = noise2D(x * 0.03, y * 0.03);
      const brightness = bands + n * 0.15;
      pixels[i] = 244 * brightness;
      pixels[i + 1] = 231 * brightness;
      pixels[i + 2] = 193 * brightness;
      pixels[i + 3] = 255;
    }
  }

  ctx.putImageData(imageData, 0, 0);
}

// 天王星のテクスチャ（青緑色）
function createUranusTexture(ctx, width, height) {
  const imageData = ctx.createImageData(width, height);
  const pixels = imageData.data;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * 4;
      const n = noise2D(x * 0.02, y * 0.02);
      const brightness = 0.85 + n * 0.15;
      pixels[i] = 79 * brightness;
      pixels[i + 1] = 208 * brightness;
      pixels[i + 2] = 231 * brightness;
      pixels[i + 3] = 255;
    }
  }

  ctx.putImageData(imageData, 0, 0);
}

// 海王星のテクスチャ（濃い青）
function createNeptuneTexture(ctx, width, height) {
  const imageData = ctx.createImageData(width, height);
  const pixels = imageData.data;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * 4;
      const n = noise2D(x * 0.02, y * 0.02);
      const brightness = 0.8 + n * 0.2;
      pixels[i] = 65 * brightness;
      pixels[i + 1] = 105 * brightness;
      pixels[i + 2] = 225 * brightness;
      pixels[i + 3] = 255;
    }
  }

  ctx.putImageData(imageData, 0, 0);

  // 大暗斑
  const spotX = width * 0.4;
  const spotY = height * 0.4;
  const spotW = 150;

  ctx.save();
  ctx.translate(spotX, spotY);
  ctx.scale(1, 0.6);
  const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, spotW);
  gradient.addColorStop(0, 'rgba(30, 40, 100, 0.6)');
  gradient.addColorStop(0.5, 'rgba(40, 50, 120, 0.4)');
  gradient.addColorStop(1, 'rgba(50, 60, 140, 0)');
  ctx.fillStyle = gradient;
  ctx.fillRect(-spotW, -spotW, spotW * 2, spotW * 2);
  ctx.restore();
}

// 土星の輪の作成
function createRing() {
  const ringGeometry = new THREE.RingGeometry(1.5, 2.5, 64);
  const ringMaterial = new THREE.MeshStandardMaterial({
    color: 0xC7A575,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.8,
    roughness: 0.8,
  });
  const ring = new THREE.Mesh(ringGeometry, ringMaterial);
  ring.rotation.x = Math.PI / 2;
  return ring;
}

// 軌道線の作成
function createOrbit(radius) {
  const curve = new THREE.EllipseCurve(
    0, 0,
    radius, radius,
    0, 2 * Math.PI,
    false,
    0
  );

  const points = curve.getPoints(128);
  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  const material = new THREE.LineBasicMaterial({
    color: 0x444444,
    transparent: true,
    opacity: 0.3,
  });

  const orbit = new THREE.Line(geometry, material);
  orbit.rotation.x = Math.PI / 2;
  return orbit;
}

// 太陽系の作成
export function createSolarSystem() {
  const group = new THREE.Group();
  const planets = [];

  // 太陽の作成
  const sunGeometry = new THREE.SphereGeometry(planetData.sun.radius, 64, 64);
  const sunMaterial = createPlanetMaterial(planetData.sun);
  const sun = new THREE.Mesh(sunGeometry, sunMaterial);

  // 太陽の光源
  const sunLight = new THREE.PointLight(0xFDB813, 6, 300);
  sunLight.castShadow = true;
  sunLight.shadow.mapSize.width = 2048;
  sunLight.shadow.mapSize.height = 2048;
  sun.add(sunLight);

  // 太陽のグロー効果
  const glowGeometry = new THREE.SphereGeometry(planetData.sun.radius * 1.4, 32, 32);
  const glowMaterial = new THREE.MeshBasicMaterial({
    color: 0xFDB813,
    transparent: true,
    opacity: 0.5,
  });
  const glow = new THREE.Mesh(glowGeometry, glowMaterial);
  sun.add(glow);

  group.add(sun);

  // 各惑星の作成
  Object.keys(planetData).forEach((key) => {
    if (key === 'sun') return;

    const data = planetData[key];

    // 軌道の追加
    const orbit = createOrbit(data.distance);
    group.add(orbit);

    // 惑星の作成
    const geometry = new THREE.SphereGeometry(data.radius, 64, 64);
    const material = createPlanetMaterial(data);
    const planet = new THREE.Mesh(geometry, material);
    planet.castShadow = true;
    planet.receiveShadow = true;

    // 土星の輪
    if (data.hasRing) {
      const ring = createRing();
      planet.add(ring);
    }

    planets.push({
      mesh: planet,
      distance: data.distance,
      speed: data.speed,
      angle: Math.random() * Math.PI * 2, // ランダムな初期位置
    });

    group.add(planet);
  });

  // 更新関数
  function update(elapsedTime) {
    // 太陽のグロー効果のアニメーション
    const glowScale = 1 + Math.sin(elapsedTime * 2) * 0.05;
    glow.scale.set(glowScale, glowScale, glowScale);

    // 惑星の軌道運動
    planets.forEach((planet) => {
      planet.angle += planet.speed * 0.001;
      planet.mesh.position.x = Math.cos(planet.angle) * planet.distance;
      planet.mesh.position.z = Math.sin(planet.angle) * planet.distance;

      // 惑星の自転
      planet.mesh.rotation.y += 0.005;
    });
  }

  return { group, update };
}
