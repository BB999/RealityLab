import * as THREE from 'three';
import { HalfFloatType } from 'three';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';

// --- 設定定数 ---
const PARTICLE_COUNT = 5300;  // 8000の2/3
const SHAPE_COUNT = 400;      // 600の2/3

// --- 歌詞データ ---
const lyricsJson = {
  "segments": [
    { "id": 0, "start": 0.0, "end": 2.7, "text": "Ah Ah Ah Ah Ah" },
    { "id": 1, "start": 8.03, "end": 15.65, "text": "Ah Ah Ah Ah Ah" },
    { "id": 2, "start": 15.65, "end": 19.10, "text": "夜空に浮かぶ光の粒" },
    { "id": 3, "start": 19.10, "end": 23.15, "text": "消えそうで消えない奇跡のループ" },
    { "id": 4, "start": 23.15, "end": 28.23, "text": "手を伸ばして掴みたいのに" },
    { "id": 5, "start": 28.23, "end": 33.41, "text": "届かない胸の中ざわめく鼓動" },
    { "id": 6, "start": 33.41, "end": 37.31, "text": "まるで星座のパズル模様" },
    { "id": 7, "start": 38.24, "end": 44.15, "text": "ひとひとつ繋いでゆく" },
    { "id": 8, "start": 45.27, "end": 48.22, "text": "Shining star 輝いて" },
    { "id": 9, "start": 48.91, "end": 52.02, "text": "僕らの夢を照らして" },
    { "id": 10, "start": 52.02, "end": 55.24, "text": "何度も迷っても" },
    { "id": 11, "start": 55.24, "end": 60.02, "text": "君となら行けるよ" },
    { "id": 12, "start": 60.02, "end": 62.84, "text": "Shining star 夜を越えて" },
    { "id": 13, "start": 63.15, "end": 66.59, "text": "無限の未来を描いて" },
    { "id": 14, "start": 66.72, "end": 70.22, "text": "キラキラの空へ" },
    { "id": 15, "start": 70.22, "end": 72.5, "text": "飛び込むよ" },
    { "id": 16, "start": 74.22, "end": 77.95, "text": "瞬きする間に過ぎる時間" },
    { "id": 17, "start": 77.95, "end": 81.51, "text": "止められない運命のライン" },
    { "id": 18, "start": 81.51, "end": 88.12, "text": "それでも僕らは走り続ける" },
    { "start": 88.12, "end": 91.77, "text": "風に乗せた願いごと" },
    { "start": 91.77, "end": 95.33, "text": "届くかなあの星の下" },
    { "start": 95.33, "end": 98.69, "text": "光の中" },
    { "start": 99.51, "end": 103.36, "text": "消えないで" },
    { "start": 103.36, "end": 106.44, "text": "Shining star 輝いて" },
    { "start": 107.51, "end": 110.19, "text": "僕らの夢を照らして" },
    { "start": 110.19, "end": 113.41, "text": "何度も迷っても" },
    { "start": 113.41, "end": 118.13, "text": "君となら行けるよ" },
    { "start": 118.13, "end": 121.01, "text": "Shining star 夜を越えて" },
    { "start": 121.41, "end": 124.83, "text": "無限の未来を描いて" },
    { "start": 125.04, "end": 128.44, "text": "キラキラの空へ" },
    { "start": 128.44, "end": 130.32, "text": "飛び込むよ" }
  ]
};

// --- 動作モード定義 ---
const FORMATION = {
  IDLE: 'idle',
  GALAXY: 'galaxy',
  BIG_HEART: 'heart',
  BIG_STAR: 'star',
  RAIN: 'rain',
  TUNNEL: 'tunnel',
  CUBE: 'cube',
  SPIRAL: 'spiral',
  WAVE: 'wave',
  FIREWORK: 'firework',
  RING: 'ring',
  SPHERE: 'sphere',
  GRID: 'grid',
  VORTEX: 'vortex',
  WARP: 'warp'
};

const DECOR = {
  NONE: 'none',
  STAR: 'star',
  HEART: 'heart',
  ALL: 'all'
};

// --- 各セグメントごとの個別スタイル定義 ---
const SEGMENT_STYLES = [
  { color: 0x88ccff, form: FORMATION.SPHERE, decor: DECOR.NONE, cam: 'sway' },
  { color: 0x4488ff, form: FORMATION.RING, decor: DECOR.NONE, cam: 'rotate' },
  { color: 0x2244aa, form: FORMATION.RAIN, decor: DECOR.STAR, cam: 'tilt' },
  { color: 0x8844ff, form: FORMATION.SPIRAL, decor: DECOR.STAR, cam: 'zoom' },
  { color: 0x00aaff, form: FORMATION.TUNNEL, decor: DECOR.NONE, cam: 'shake' },
  { color: 0xff55aa, form: FORMATION.IDLE, decor: DECOR.HEART, cam: 'beat' },
  { color: 0xcccc44, form: FORMATION.CUBE, decor: DECOR.STAR, cam: 'rotate' },
  { color: 0x44ffaa, form: FORMATION.GRID, decor: DECOR.NONE, cam: 'pan' },
  { color: 0xffdd44, form: FORMATION.BIG_STAR, decor: DECOR.ALL, cam: 'dynamic' },
  { color: 0xff88aa, form: FORMATION.BIG_HEART, decor: DECOR.HEART, cam: 'dynamic' },
  { color: 0xaa88ff, form: FORMATION.VORTEX, decor: DECOR.NONE, cam: 'rotate' },
  { color: 0xffaaaa, form: FORMATION.SPHERE, decor: DECOR.HEART, cam: 'close' },
  { color: 0xffaa00, form: FORMATION.GALAXY, decor: DECOR.STAR, cam: 'far' },
  { color: 0x00ffff, form: FORMATION.WAVE, decor: DECOR.NONE, cam: 'pan' },
  { color: 0xffff88, form: FORMATION.FIREWORK, decor: DECOR.ALL, cam: 'shake' },
  { color: 0xffffff, form: FORMATION.TUNNEL, decor: DECOR.STAR, cam: 'zoom' },
  { color: 0xffeeaa, form: FORMATION.IDLE, decor: DECOR.STAR, cam: 'still' },
  { color: 0xff4444, form: FORMATION.SPIRAL, decor: DECOR.NONE, cam: 'rotate' },
  { color: 0x00ff88, form: FORMATION.WARP, decor: DECOR.NONE, cam: 'dynamic' },
  { color: 0xccffcc, form: FORMATION.WAVE, decor: DECOR.NONE, cam: 'sway' },
  { color: 0x4444ff, form: FORMATION.RAIN, decor: DECOR.STAR, cam: 'tilt' },
  { color: 0xffffff, form: FORMATION.SPHERE, decor: DECOR.ALL, cam: 'rotate' },
  { color: 0x888888, form: FORMATION.IDLE, decor: DECOR.NONE, cam: 'still' },
  { color: 0xffd700, form: FORMATION.BIG_STAR, decor: DECOR.STAR, cam: 'dynamic' },
  { color: 0xff69b4, form: FORMATION.BIG_HEART, decor: DECOR.HEART, cam: 'beat' },
  { color: 0x9370db, form: FORMATION.GRID, decor: DECOR.NONE, cam: 'pan' },
  { color: 0xffb6c1, form: FORMATION.RING, decor: DECOR.HEART, cam: 'close' },
  { color: 0xffa500, form: FORMATION.GALAXY, decor: DECOR.ALL, cam: 'far' },
  { color: 0x00ced1, form: FORMATION.CUBE, decor: DECOR.NONE, cam: 'rotate' },
  { color: 0xffff00, form: FORMATION.FIREWORK, decor: DECOR.ALL, cam: 'shake' },
  { color: 0xffffff, form: FORMATION.TUNNEL, decor: DECOR.ALL, cam: 'zoom' }
];

let scene, camera, renderer, composer;
let particles, geometry, material;
let starMesh, heartMesh;
let targetPositions = [];
let initialPositions = [];
let musicPlayer = null;
let currentSegmentIndex = -1;
let xrSession = null;
let particleGroup = null;
let mrInitialPosition = null;  // MR起動時の位置を保存
let useOcclusion = false;  // オクルージョンのオンオフ

// 現在のスタイル状態
let currentStyle = {
  color: new THREE.Color(0xffffff),
  formation: FORMATION.IDLE,
  decor: DECOR.NONE,
  cam: 'sway'
};
let targetCameraZ = 80;

// MR用の位置オフセット（ユーザーの前方に配置）
const MR_OFFSET = new THREE.Vector3(0, 0, -3);

init();

function init() {
  // オーディオ要素を作成
  musicPlayer = document.createElement('audio');
  musicPlayer.id = 'music-player';
  musicPlayer.src = './shining_star.mp3';
  musicPlayer.volume = 0.8;  // 音量を80%に設定
  document.body.appendChild(musicPlayer);

  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 2000);
  camera.position.set(0, 0, 80);

  renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    outputBufferType: HalfFloatType  // setEffectsに必要
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.toneMapping = THREE.ReinhardToneMapping;
  renderer.xr.enabled = true;

  const appDiv = document.getElementById('app');
  appDiv.appendChild(renderer.domElement);

  // パーティクルグループを作成（MR時に位置を調整するため）
  particleGroup = new THREE.Group();
  scene.add(particleGroup);

  // r182のsetEffectsを使用（WebXR対応）
  const bloomPass = new UnrealBloomPass(
    new THREE.Vector2(window.innerWidth, window.innerHeight),
    1.5,  // strength
    0.4,  // radius
    0.85  // threshold
  );
  bloomPass.threshold = 0.5;
  bloomPass.strength = 0.8;
  bloomPass.radius = 0;

  renderer.setEffects([bloomPass]);

  createMainParticles();
  createShapeParticles();

  window.addEventListener('resize', onWindowResize);

  // XRセッション用のアニメーションループを設定
  renderer.setAnimationLoop(animate);
}

function createTexture(type) {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');
  const cx = 64, cy = 64;

  if (type === 'glow') {
    const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 64);
    grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
    grad.addColorStop(0.2, 'rgba(255, 255, 255, 0.8)');
    grad.addColorStop(0.5, 'rgba(255, 255, 255, 0.2)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 128, 128);
  } else if (type === 'star') {
    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    for (let i = 0; i < 5; i++) {
      ctx.lineTo(Math.cos((18 + i * 72) * Math.PI / 180) * 60 + cx, -Math.sin((18 + i * 72) * Math.PI / 180) * 60 + cy);
      ctx.lineTo(Math.cos((54 + i * 72) * Math.PI / 180) * 25 + cx, -Math.sin((54 + i * 72) * Math.PI / 180) * 25 + cy);
    }
    ctx.closePath();
    ctx.fill();
    ctx.shadowBlur = 20;
    ctx.shadowColor = "white";
    ctx.fill();
  } else if (type === 'heart') {
    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.moveTo(cx, cy + 20);
    ctx.bezierCurveTo(cx, cy + 14, cx - 30, cy - 20, cx - 30, cy - 30);
    ctx.bezierCurveTo(cx - 30, cy - 50, cx - 10, cy - 50, cx, cy - 30);
    ctx.bezierCurveTo(cx + 10, cy - 50, cx + 30, cy - 50, cx + 30, cy - 30);
    ctx.bezierCurveTo(cx + 30, cy - 20, cx, cy + 14, cx, cy + 20);
    ctx.fill();
    ctx.shadowBlur = 20;
    ctx.shadowColor = "white";
    ctx.fill();
  }
  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}

function createMainParticles() {
  geometry = new THREE.BufferGeometry();
  const positions = [];
  targetPositions = [];
  initialPositions = [];
  const randoms = [];

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const r = 100 + Math.random() * 50;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    const x = r * Math.sin(phi) * Math.cos(theta);
    const y = r * Math.sin(phi) * Math.sin(theta);
    const z = r * Math.cos(phi);

    positions.push(x, y, z);
    targetPositions.push(x, y, z);
    initialPositions.push({ x, y, z });
    randoms.push(Math.random());
  }

  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute('aRandom', new THREE.Float32BufferAttribute(randoms, 1));

  material = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 0.8,
    map: createTexture('glow'),
    transparent: true,
    opacity: 0.9,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  });

  particles = new THREE.Points(geometry, material);
  particleGroup.add(particles);
}

function createShapeParticles() {
  // Star Group
  {
    const pos = [];
    const rnd = [];
    for (let i = 0; i < SHAPE_COUNT; i++) {
      pos.push((Math.random() - 0.5) * 300, (Math.random() - 0.5) * 200, (Math.random() - 0.5) * 200);
      rnd.push(Math.random());
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
    geo.setAttribute('aRandom', new THREE.Float32BufferAttribute(rnd, 1));
    starMesh = new THREE.Points(geo, new THREE.PointsMaterial({
      color: 0xffffaa, size: 2.5, map: createTexture('star'),
      transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false
    }));
    particleGroup.add(starMesh);
  }
  // Heart Group
  {
    const pos = [];
    const rnd = [];
    for (let i = 0; i < SHAPE_COUNT; i++) {
      pos.push((Math.random() - 0.5) * 200, -100 + Math.random() * 200, (Math.random() - 0.5) * 200);
      rnd.push(Math.random());
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
    geo.setAttribute('aRandom', new THREE.Float32BufferAttribute(rnd, 1));
    heartMesh = new THREE.Points(geo, new THREE.PointsMaterial({
      color: 0xff55aa, size: 3.0, map: createTexture('heart'),
      transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false
    }));
    particleGroup.add(heartMesh);
  }
}

function getPixelCoordinatesFromText(text) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const width = 800;
  const height = 400;
  canvas.width = width;
  canvas.height = height;

  ctx.fillStyle = "#FFFFFF";
  const fontSize = 100;
  ctx.font = `bold ${fontSize}px sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  const maxLineWidth = 650;
  let lines = [];
  const textMetrics = ctx.measureText(text);

  if (textMetrics.width > maxLineWidth) {
    if (text.includes(' ') && text.match(/[a-zA-Z]/)) {
      const words = text.split(' ');
      let currentLine = words[0];
      for (let i = 1; i < words.length; i++) {
        if (ctx.measureText(currentLine + " " + words[i]).width < maxLineWidth) {
          currentLine += " " + words[i];
        } else {
          lines.push(currentLine);
          currentLine = words[i];
        }
      }
      lines.push(currentLine);
    } else {
      const splitIndex = Math.ceil(text.length / 2);
      lines.push(text.slice(0, splitIndex));
      lines.push(text.slice(splitIndex));
    }
  } else {
    lines.push(text);
  }

  const lineHeight = fontSize * 1.2;
  const startY = height / 2 - ((lines.length - 1) * lineHeight) / 2;
  lines.forEach((line, i) => {
    ctx.fillText(line, width / 2, startY + i * lineHeight);
  });

  const imageData = ctx.getImageData(0, 0, width, height);
  const data = imageData.data;
  const coordinates = [];

  let minX = width, maxX = 0, minY = height, maxY = 0;
  let hasPixel = false;
  const step = 4;

  for (let y = 0; y < height; y += step) {
    for (let x = 0; x < width; x += step) {
      if (data[(y * width + x) * 4 + 3] > 0) {
        const posX = (x - width / 2) * 0.25;
        const posY = -(y - height / 2) * 0.25;
        coordinates.push(posX, posY, 0);
        if (posX < minX) minX = posX;
        if (posX > maxX) maxX = posX;
        if (posY < minY) minY = posY;
        if (posY > maxY) maxY = posY;
        hasPixel = true;
      }
    }
  }
  const w = hasPixel ? (maxX - minX) : 0;
  const h = hasPixel ? (maxY - minY) : 0;
  return { coordinates, width: w, height: h, lines };
}

function applySegmentStyle(index) {
  const style = SEGMENT_STYLES[index] || { color: 0xffffff, form: FORMATION.IDLE, decor: DECOR.NONE, cam: 'sway' };

  currentStyle.color.setHex(style.color);
  currentStyle.formation = style.form;
  currentStyle.decor = style.decor;
  currentStyle.cam = style.cam;
}

function updateTextTarget(text, index) {
  const result = getPixelCoordinatesFromText(text);
  const coords = result.coordinates;

  const textW = result.width;
  const textH = result.height;
  if (textW > 0 && textH > 0) {
    const fov = camera.fov * (Math.PI / 180);
    const aspect = camera.aspect;
    const distV = (textH / 2) / Math.tan(fov / 2);
    const distH = (textW / 2) / (aspect * Math.tan(fov / 2));
    targetCameraZ = Math.max(50, Math.min(Math.max(distV, distH) * 1.5, 180));
  } else {
    targetCameraZ = 80;
  }

  applySegmentStyle(index);

  const len = coords.length / 3;
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const i3 = i * 3;
    if (i < len) {
      targetPositions[i3] = coords[i * 3];
      targetPositions[i3 + 1] = coords[i * 3 + 1];
      targetPositions[i3 + 2] = coords[i * 3 + 2];
    } else {
      targetPositions[i3] = null;
    }
  }

  const displayText = result.lines.length > 1 ? result.lines.join('\n') : text;
  const textDisplay = document.getElementById('current-text');
  if (textDisplay) {
    textDisplay.innerText = displayText;
  }
}

function scatterParticles() {
  currentStyle.color.setHex(0x666666);
  currentStyle.formation = FORMATION.IDLE;
  currentStyle.decor = DECOR.NONE;
  currentStyle.cam = 'sway';
  targetCameraZ = 80;

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const i3 = i * 3;
    targetPositions[i3] = null;
  }
}

function animate(timestamp, frame) {
  const time = musicPlayer.currentTime;
  const isPlaying = !musicPlayer.paused;
  const sysTime = Date.now() * 0.001;

  // MRモード時のパーティクルグループ位置調整
  if (xrSession) {
    // MR起動時に一度だけカメラの向きで位置を決定
    if (!mrInitialPosition) {
      const xrCamera = renderer.xr.getCamera();
      const cameraPosition = new THREE.Vector3();
      const cameraDirection = new THREE.Vector3();
      xrCamera.getWorldPosition(cameraPosition);
      xrCamera.getWorldDirection(cameraDirection);

      // Y軸回転のみ使用（水平方向のみ）
      cameraDirection.y = 0;
      cameraDirection.normalize();

      // カメラの前方2mに配置
      mrInitialPosition = {
        position: cameraPosition.clone().add(cameraDirection.multiplyScalar(2)),
        lookAt: cameraPosition.clone()
      };
      mrInitialPosition.position.y = cameraPosition.y;
    }

    particleGroup.position.copy(mrInitialPosition.position);
    particleGroup.lookAt(mrInitialPosition.lookAt);
    particleGroup.scale.set(0.015, 0.015, 0.015);

    // MR時はパーティクル設定
    material.size = 0.05;
    material.opacity = 0.7;
    material.blending = THREE.AdditiveBlending;
    if (starMesh) {
      starMesh.material.size = 0.05;
      starMesh.material.opacity = 0.6;
      starMesh.material.blending = THREE.AdditiveBlending;
    }
    if (heartMesh) {
      heartMesh.material.size = 0.06;
      heartMesh.material.opacity = 0.6;
      heartMesh.material.blending = THREE.AdditiveBlending;
    }
  } else {
    particleGroup.scale.set(1, 1, 1);
    particleGroup.position.set(0, 0, 0);

    // デスクトップ時は元の設定に戻す
    material.size = 0.8;
    material.opacity = 0.9;
    material.blending = THREE.AdditiveBlending;
    if (starMesh) starMesh.material.blending = THREE.AdditiveBlending;
    if (heartMesh) heartMesh.material.blending = THREE.AdditiveBlending;
  }

  if (isPlaying) {
    let foundSegment = -1;
    for (let i = 0; i < lyricsJson.segments.length; i++) {
      const seg = lyricsJson.segments[i];
      if (time >= seg.start && time < seg.end) {
        foundSegment = i;
        break;
      }
    }

    if (foundSegment !== -1) {
      if (foundSegment !== currentSegmentIndex) {
        currentSegmentIndex = foundSegment;
        updateTextTarget(lyricsJson.segments[foundSegment].text, currentSegmentIndex);
      }
    } else {
      const textDisplay = document.getElementById('current-text');
      if (textDisplay) {
        textDisplay.innerText = "...";
      }
      if (currentSegmentIndex !== -1) {
        const lastEnd = lyricsJson.segments[currentSegmentIndex].end;
        if (time > lastEnd + 0.5) {
          currentSegmentIndex = -1;
          scatterParticles();
        }
      }
    }
  }

  material.color.lerp(currentStyle.color, 0.05);

  const positions = geometry.attributes.position.array;
  const randoms = geometry.attributes.aRandom.array;

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const i3 = i * 3;
    const rnd = randoms[i];

    if (targetPositions[i3] !== null && targetPositions[i3] !== undefined) {
      positions[i3] += (targetPositions[i3] - positions[i3]) * 0.1;
      positions[i3 + 1] += (targetPositions[i3 + 1] - positions[i3 + 1]) * 0.1;
      positions[i3 + 2] += (targetPositions[i3 + 2] - positions[i3 + 2]) * 0.1;
      positions[i3] += Math.sin(sysTime * 3 + rnd * 10) * 0.03;
      positions[i3 + 1] += Math.cos(sysTime * 2 + rnd * 10) * 0.03;
    } else {
      const ix = positions[i3];
      const iy = positions[i3 + 1];
      const iz = positions[i3 + 2];

      let tx = ix, ty = iy, tz = iz;
      const fm = currentStyle.formation;

      if (fm === FORMATION.CUBE) {
        const baseX = ((i % 10) - 5) * 12;
        const baseY = (((i / 10) | 0) % 10 - 5) * 12;
        const baseZ = (((i / 100) | 0) % 10 - 5) * 12;
        const rot = sysTime * 0.5;
        tx = baseX * Math.cos(rot) - baseZ * Math.sin(rot);
        ty = baseY + Math.sin(rot + i) * 5;
        tz = baseX * Math.sin(rot) + baseZ * Math.cos(rot);
        positions[i3] += (tx - ix) * 0.03;
        positions[i3 + 1] += (ty - iy) * 0.03;
        positions[i3 + 2] += (tz - iz) * 0.03;
      } else if (fm === FORMATION.SPIRAL) {
        const angle = (i * 0.02) + sysTime;
        const r = 40;
        const offset = (i % 2 === 0) ? 0 : Math.PI;
        tx = Math.cos(angle + offset) * r;
        tz = Math.sin(angle + offset) * r;
        positions[i3 + 1] += 0.5 + rnd;
        if (positions[i3 + 1] > 100) positions[i3 + 1] = -100;
        positions[i3] += (tx - ix) * 0.05;
        positions[i3 + 2] += (tz - iz) * 0.05;
      } else if (fm === FORMATION.WAVE) {
        const row = (i % 100) - 50;
        const col = ((i / 100) | 0) - 40;
        tx = row * 3;
        tz = col * 3;
        ty = -40 + Math.sin(tx * 0.05 + sysTime * 2) * 10 + Math.cos(tz * 0.05 + sysTime) * 10;
        positions[i3] += (tx - ix) * 0.05;
        positions[i3 + 1] += (ty - iy) * 0.05;
        positions[i3 + 2] += (tz - iz) * 0.05;
      } else if (fm === FORMATION.FIREWORK) {
        const vx = initialPositions[i].x * 0.01;
        const vy = initialPositions[i].y * 0.01;
        const vz = initialPositions[i].z * 0.01;
        positions[i3] += vx * (2 + rnd * 2);
        positions[i3 + 1] += vy * (2 + rnd * 2);
        positions[i3 + 2] += vz * (2 + rnd * 2);
        if (Math.abs(ix) > 200 || Math.abs(iy) > 200 || Math.abs(iz) > 200) {
          positions[i3] = 0;
          positions[i3 + 1] = 0;
          positions[i3 + 2] = 0;
        }
      } else if (fm === FORMATION.SPHERE) {
        const init = initialPositions[i];
        const rScale = 1.2;
        const rot = sysTime * 0.3;
        tx = (init.x * Math.cos(rot) - init.z * Math.sin(rot)) * rScale;
        ty = init.y * rScale;
        tz = (init.x * Math.sin(rot) + init.z * Math.cos(rot)) * rScale;
        positions[i3] += (tx - ix) * 0.03;
        positions[i3 + 1] += (ty - iy) * 0.03;
        positions[i3 + 2] += (tz - iz) * 0.03;
      } else if (fm === FORMATION.RING) {
        const angle = i * 0.01 + sysTime;
        const r = 50 + (i % 5) * 2;
        tx = Math.cos(angle) * r;
        tz = Math.sin(angle) * r;
        ty = Math.sin(i * 0.1) * 2;
        positions[i3] += (tx - ix) * 0.05;
        positions[i3 + 1] += (ty - iy) * 0.05;
        positions[i3 + 2] += (tz - iz) * 0.05;
      } else if (fm === FORMATION.GRID) {
        const spacing = 15;
        const cols = 20;
        tx = ((i % cols) - cols / 2) * spacing;
        ty = (((i / cols) | 0) % cols - cols / 2) * spacing;
        tz = -50 + Math.sin(tx * 0.1 + sysTime) * 10;
        positions[i3] += (tx - ix) * 0.05;
        positions[i3 + 1] += (ty - iy) * 0.05;
        positions[i3 + 2] += (tz - iz) * 0.05;
      } else if (fm === FORMATION.VORTEX) {
        const angle = i * 0.02 + sysTime * 2;
        const yPos = (i % 200) - 100;
        const r = 10 + Math.abs(yPos) * 0.5;
        tx = Math.cos(angle) * r;
        tz = Math.sin(angle) * r;
        ty = yPos;
        positions[i3] += (tx - ix) * 0.05;
        positions[i3 + 1] += (ty - iy) * 0.05;
        positions[i3 + 2] += (tz - iz) * 0.05;
      } else if (fm === FORMATION.BIG_HEART) {
        const t = (i * 0.01) + sysTime * 0.2;
        const scale = 3.5;
        tx = scale * 16 * Math.pow(Math.sin(t), 3);
        ty = scale * (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
        tz = Math.sin(i) * 30;
        positions[i3] += (tx - ix) * 0.03;
        positions[i3 + 1] += (ty - iy) * 0.03;
        positions[i3 + 2] += (tz - iz) * 0.03;
      } else if (fm === FORMATION.BIG_STAR) {
        const t = (i * 0.02) + sysTime * 0.5;
        const r = 60 + Math.sin(t * 5) * 10;
        tx = Math.cos(t) * r;
        ty = Math.sin(t) * r;
        tz = Math.cos(i * 0.1) * 20;
        positions[i3] += (tx - ix) * 0.03;
        positions[i3 + 1] += (ty - iy) * 0.03;
        positions[i3 + 2] += (tz - iz) * 0.03;
      } else if (fm === FORMATION.GALAXY) {
        const angle = i * 0.01 + sysTime * 0.2;
        const r = 20 + i * 0.02;
        tx = Math.cos(angle) * r * 2;
        ty = Math.sin(angle) * r * 0.5;
        tz = Math.sin(angle) * r * 2;
        if (rnd > 0.8) ty += (rnd - 0.5) * 40;
        positions[i3] += (tx - ix) * 0.02;
        positions[i3 + 1] += (ty - iy) * 0.02;
        positions[i3 + 2] += (tz - iz) * 0.02;
      } else if (fm === FORMATION.TUNNEL || fm === FORMATION.WARP) {
        positions[i3 + 2] += 2.5 + rnd * 2;
        if (positions[i3 + 2] > 100) positions[i3 + 2] = -200;
        const rad = Math.sqrt(ix * ix + iy * iy);
        if (rad < 30) {
          positions[i3] *= 1.05;
          positions[i3 + 1] *= 1.05;
        }
      } else if (fm === FORMATION.RAIN) {
        positions[i3 + 1] -= 0.5 + rnd;
        if (positions[i3 + 1] < -80) positions[i3 + 1] = 80;
        positions[i3] += Math.sin(sysTime + rnd * 100) * 0.1;
      } else {
        // IDLE
        const init = initialPositions[i];
        tx = init.x * 1.5 + Math.sin(sysTime * 0.5 + rnd * 10) * 10;
        ty = init.y * 1.5 + Math.cos(sysTime * 0.3 + rnd * 10) * 10;
        tz = init.z * 1.5 + Math.sin(sysTime * 0.4 + rnd * 10) * 10;
        positions[i3] += (tx - ix) * 0.02;
        positions[i3 + 1] += (ty - iy) * 0.02;
        positions[i3 + 2] += (tz - iz) * 0.02;
      }
    }
  }
  geometry.attributes.position.needsUpdate = true;

  // シェイプ更新
  updateDecorParticles(starMesh, DECOR.STAR, sysTime);
  updateDecorParticles(heartMesh, DECOR.HEART, sysTime);

  // 非XRモード時のみカメラワークを適用
  if (!xrSession) {
    camera.position.z += (targetCameraZ - camera.position.z) * 0.05;

    const camType = currentStyle.cam;
    if (camType === 'sway') {
      camera.position.x = Math.sin(sysTime * 0.2) * 5;
      camera.position.y = Math.cos(sysTime * 0.15) * 2;
    } else if (camType === 'rotate') {
      camera.position.x = Math.sin(sysTime * 0.5) * 20;
      camera.position.y = Math.cos(sysTime * 0.3) * 10;
    } else if (camType === 'beat') {
      const beat = isPlaying ? Math.sin(time * 8) * 1 : 0;
      camera.position.y = beat;
    } else if (camType === 'zoom') {
      camera.position.z += Math.sin(sysTime) * 0.2;
    } else if (camType === 'dynamic') {
      camera.position.x = Math.sin(sysTime) * 10;
      camera.position.y = Math.cos(sysTime) * 10;
      camera.rotation.z = Math.sin(sysTime * 0.5) * 0.1;
    }

    camera.lookAt(0, 0, 0);
  }

  // setEffectsを使っているので、renderer.renderでBloomが適用される
  renderer.render(scene, camera);
}

function updateDecorParticles(mesh, type, time) {
  const current = currentStyle.decor;
  const isVisible = (current === type || current === DECOR.ALL);
  const targetOpacity = isVisible ? 0.8 : 0;

  mesh.material.opacity += (targetOpacity - mesh.material.opacity) * 0.05;
  if (mesh.material.opacity < 0.01) return;

  const pos = mesh.geometry.attributes.position.array;
  const rnd = mesh.geometry.attributes.aRandom.array;
  const count = pos.length / 3;

  for (let i = 0; i < count; i++) {
    const i3 = i * 3;
    const r = rnd[i];

    pos[i3 + 1] += 0.2 + r * 0.2;
    if (pos[i3 + 1] > 100) pos[i3 + 1] = -100;
    pos[i3] += Math.sin(time + r * 10) * 0.1;

    const x = pos[i3];
    const z = pos[i3 + 2];
    const s = 0.01;
    pos[i3] = x * Math.cos(s) - z * Math.sin(s);
    pos[i3 + 2] = x * Math.sin(s) + z * Math.cos(s);
  }
  mesh.geometry.attributes.position.needsUpdate = true;
}

function onWindowResize() {
  // XRセッション中はリサイズしない
  if (xrSession) return;

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

    // オクルージョン設定を取得
    const occlusionToggle = document.getElementById('occlusion-toggle');
    useOcclusion = occlusionToggle ? occlusionToggle.checked : false;

    const sessionOptions = {
      requiredFeatures: [],
      optionalFeatures: ['local-floor', 'bounded-floor', 'hand-tracking']
    };

    // オクルージョンが有効な場合のみ追加
    if (useOcclusion) {
      sessionOptions.optionalFeatures.push('mesh-detection', 'plane-detection');
    }

    xrSession = await navigator.xr.requestSession('immersive-ar', sessionOptions);

    await renderer.xr.setSession(xrSession);

    // UIを非表示
    const button = document.getElementById('start-button');
    if (button) {
      button.style.display = 'none';
    }
    const playBtn = document.getElementById('play-button');
    if (playBtn) {
      playBtn.style.display = 'none';
    }
    const switchContainer = document.querySelector('.switch-container');
    if (switchContainer) {
      switchContainer.style.display = 'none';
    }
    const titleOverlay = document.querySelector('.title-overlay');
    if (titleOverlay) {
      titleOverlay.style.display = 'none';
    }

    // 音楽を再生
    musicPlayer.play().catch(err => {
      console.log('音楽の自動再生に失敗:', err);
    });

    // 曲が終わったらセッション終了
    musicPlayer.onended = () => {
      if (xrSession) {
        xrSession.end();
      }
    };

    // 歌詞表示を表示
    const textDisplay = document.getElementById('current-text');
    if (textDisplay) {
      textDisplay.style.opacity = '1';
    }

    updateInfo('MRセッション開始 - 音楽再生中');

    xrSession.addEventListener('end', () => {
      xrSession = null;
      mrInitialPosition = null;  // リセット
      musicPlayer.pause();
      musicPlayer.currentTime = 0;  // 最初に戻す

      updateInfo('MRセッション終了');
      if (button) {
        button.style.display = 'block';
      }
      const playBtn = document.getElementById('play-button');
      if (playBtn) {
        playBtn.style.display = 'block';
      }
      const switchContainer = document.querySelector('.switch-container');
      if (switchContainer) {
        switchContainer.style.display = 'flex';
      }
      const titleOverlay = document.querySelector('.title-overlay');
      if (titleOverlay) {
        titleOverlay.style.display = 'block';
      }
    });

  } catch (error) {
    console.error('XRセッション開始エラー:', error);
    updateInfo('エラー: ' + (error.message || error.name || 'Unknown error'));
    alert('MRセッションを開始できませんでした: ' + (error.message || error.name || 'Unknown error'));
  }
}

// デスクトップモードで再生
function startDesktop() {
  const uiContainer = document.getElementById('ui-container');
  if (uiContainer) {
    uiContainer.style.opacity = '0';
    uiContainer.style.visibility = 'hidden';
  }

  const textDisplay = document.getElementById('current-text');
  if (textDisplay) {
    textDisplay.style.opacity = '1';
  }

  musicPlayer.play().catch(err => {
    console.log('音楽の再生に失敗:', err);
    updateInfo('エラー: ' + err);
  });

  updateInfo('再生中...');
}

// ボタンのイベントリスナー
const startButton = document.getElementById('start-button');
if (startButton) {
  startButton.addEventListener('click', startXR);
}

const playButton = document.getElementById('play-button');
if (playButton) {
  playButton.addEventListener('click', startDesktop);
}
