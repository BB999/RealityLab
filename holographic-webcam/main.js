import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { FaceDetection } from '@mediapipe/face_detection';
import { Camera } from '@mediapipe/camera_utils';

// DOM要素
const video = document.getElementById('webcam');
const canvas = document.getElementById('three-canvas');
const faceStatus = document.getElementById('face-status');
const glbInput = document.getElementById('glb-input');
const sensitivityInput = document.getElementById('sensitivity');
const sensitivityValue = document.getElementById('sensitivity-value');
const scaleInput = document.getElementById('scale');
const scaleValueDisplay = document.getElementById('scale-value');

// 設定
let sensitivity = 3;
let modelScale = 1;
let baseScale = 1;
let facePosition = { x: 0, y: 0, z: 2 };
let targetFacePosition = { x: 0, y: 0, z: 2 };

// Three.js セットアップ
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);

const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 5);

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// ライト
const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

const pointLight = new THREE.PointLight(0x00ffff, 1, 100);
pointLight.position.set(0, 0, 3);
scene.add(pointLight);

// グリッドマテリアル
function createGridMaterial(color) {
  return new THREE.ShaderMaterial({
    uniforms: {
      color: { value: new THREE.Color(color) },
      opacity: { value: 0.5 }
    },
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform vec3 color;
      uniform float opacity;
      varying vec2 vUv;

      void main() {
        vec2 grid = abs(fract(vUv * 10.0 - 0.5) - 0.5) / fwidth(vUv * 10.0);
        float line = min(grid.x, grid.y);
        float alpha = 1.0 - min(line, 1.0);
        if (alpha < 0.1) discard;
        gl_FragColor = vec4(color, alpha * opacity);
      }
    `,
    transparent: true,
    side: THREE.DoubleSide
  });
}

// グリッド（壁・天井・地面）を作成 - 立方体の部屋
const roomSize = 10;
const halfRoom = roomSize / 2;

// 地面
const floorGeometry = new THREE.PlaneGeometry(roomSize, roomSize);
const floor = new THREE.Mesh(floorGeometry, createGridMaterial(0x00ffff));
floor.rotation.x = -Math.PI / 2;
floor.position.y = -halfRoom;
scene.add(floor);

// 天井
const ceilingGeometry = new THREE.PlaneGeometry(roomSize, roomSize);
const ceiling = new THREE.Mesh(ceilingGeometry, createGridMaterial(0x00ffff));
ceiling.rotation.x = Math.PI / 2;
ceiling.position.y = halfRoom;
scene.add(ceiling);

// 後ろの壁
const backWallGeometry = new THREE.PlaneGeometry(roomSize, roomSize);
const backWall = new THREE.Mesh(backWallGeometry, createGridMaterial(0x0088ff));
backWall.position.z = -halfRoom;
scene.add(backWall);

// 左の壁
const leftWallGeometry = new THREE.PlaneGeometry(roomSize, roomSize);
const leftWall = new THREE.Mesh(leftWallGeometry, createGridMaterial(0x00ff88));
leftWall.rotation.y = Math.PI / 2;
leftWall.position.x = -halfRoom;
scene.add(leftWall);

// 右の壁
const rightWallGeometry = new THREE.PlaneGeometry(roomSize, roomSize);
const rightWall = new THREE.Mesh(rightWallGeometry, createGridMaterial(0x00ff88));
rightWall.rotation.y = -Math.PI / 2;
rightWall.position.x = halfRoom;
scene.add(rightWall);

// GLBモデル
let currentModel = null;
const loader = new GLTFLoader();

// デフォルトのキューブを追加
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
const cubeMaterial = new THREE.MeshPhongMaterial({
  color: 0x00ffff,
  emissive: 0x003333,
  transparent: true,
  opacity: 0.8,
  wireframe: false
});
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
scene.add(cube);
currentModel = cube;

// ワイヤーフレームを追加
const wireframe = new THREE.LineSegments(
  new THREE.EdgesGeometry(cubeGeometry),
  new THREE.LineBasicMaterial({ color: 0x00ffff })
);
cube.add(wireframe);

// GLBファイル読み込み
glbInput.addEventListener('change', (event) => {
  const file = event.target.files[0];
  if (!file) return;

  const url = URL.createObjectURL(file);
  loader.load(url, (gltf) => {
    if (currentModel) {
      scene.remove(currentModel);
    }
    currentModel = gltf.scene;

    // モデルのサイズを調整
    const box = new THREE.Box3().setFromObject(currentModel);
    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);
    baseScale = 2 / maxDim;
    currentModel.scale.setScalar(baseScale * modelScale);

    // 中心に配置
    const center = box.getCenter(new THREE.Vector3());
    currentModel.position.sub(center.multiplyScalar(baseScale * modelScale));

    scene.add(currentModel);
    URL.revokeObjectURL(url);
  });
});

// 感度調整
sensitivityInput.addEventListener('input', (event) => {
  sensitivity = parseFloat(event.target.value);
  sensitivityValue.textContent = sensitivity.toFixed(1);
});

// スケール調整
scaleInput.addEventListener('input', (event) => {
  modelScale = parseFloat(event.target.value);
  scaleValueDisplay.textContent = modelScale.toFixed(1);
  if (currentModel) {
    currentModel.scale.setScalar(baseScale * modelScale);
  }
});

// MediaPipe Face Detection セットアップ
const faceDetection = new FaceDetection({
  locateFile: (file) => {
    return `https://cdn.jsdelivr.net/npm/@mediapipe/face_detection/${file}`;
  }
});

faceDetection.setOptions({
  model: 'short',
  minDetectionConfidence: 0.5
});

faceDetection.onResults((results) => {
  if (results.detections.length > 0) {
    const detection = results.detections[0];
    const bbox = detection.boundingBox;

    // 顔の中心位置を計算（0-1の範囲を-1から1に変換、カメラが反転してるのでXを反転）
    const centerX = -(bbox.xCenter - 0.5) * 2;
    const centerY = -(bbox.yCenter - 0.5) * 2;

    // 顔のサイズから距離を推定
    const faceSize = bbox.width * bbox.height;
    const estimatedZ = 2 + (0.1 - faceSize) * 10;

    targetFacePosition = {
      x: centerX * sensitivity * 3,
      y: centerY * sensitivity * 2,
      z: Math.max(2, Math.min(8, estimatedZ))
    };

    const score = detection.score ? detection.score[0] : (detection.detection?.score?.[0] ?? 0.9);
    faceStatus.textContent = `顔検出: 検出中 (${(score * 100).toFixed(0)}%)`;
    faceStatus.style.color = '#0f0';
  } else {
    faceStatus.textContent = '顔検出: 未検出';
    faceStatus.style.color = '#ff0';
  }
});

// Webカメラ開始
async function startCamera() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { width: 640, height: 480, facingMode: 'user' }
    });
    video.srcObject = stream;

    const mpCamera = new Camera(video, {
      onFrame: async () => {
        await faceDetection.send({ image: video });
      },
      width: 640,
      height: 480
    });
    mpCamera.start();

    faceStatus.textContent = '顔検出: 開始';
  } catch (error) {
    console.error('カメラの起動に失敗:', error);
    faceStatus.textContent = 'カメラエラー';
    faceStatus.style.color = '#f00';
  }
}

// アニメーションループ
function animate() {
  requestAnimationFrame(animate);

  // 顔の位置を滑らかに補間
  facePosition.x += (targetFacePosition.x - facePosition.x) * 0.1;
  facePosition.y += (targetFacePosition.y - facePosition.y) * 0.1;
  facePosition.z += (targetFacePosition.z - facePosition.z) * 0.1;

  // カメラを顔の位置に合わせて移動（視差効果）
  const eyeX = facePosition.x;
  const eyeY = facePosition.y;
  const eyeZ = facePosition.z + 5;

  camera.position.set(eyeX, eyeY, eyeZ);

  // オフアクシス投影で自然なホログラム効果を実現
  const near = 0.1;
  const far = 100;
  const screenZ = 0; // 仮想スクリーン位置（オブジェクトがある場所）
  const distance = eyeZ - screenZ;

  const aspect = window.innerWidth / window.innerHeight;
  const fov = 60 * Math.PI / 180;
  const top = near * Math.tan(fov / 2);
  const bottom = -top;
  const right = top * aspect;
  const left = -right;

  // 視点のオフセットに基づいて視錐台をずらす
  const offsetX = -eyeX * near / distance;
  const offsetY = -eyeY * near / distance;

  camera.projectionMatrix.makePerspective(
    left + offsetX,
    right + offsetX,
    top + offsetY,
    bottom + offsetY,
    near,
    far
  );

  camera.lookAt(eyeX, eyeY, 0);

  renderer.render(scene, camera);
}

// リサイズ対応
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// 開始
startCamera();
animate();
