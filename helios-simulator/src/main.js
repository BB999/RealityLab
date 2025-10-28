import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { VRButton } from 'three/examples/jsm/webxr/VRButton.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { createSolarSystem } from './solarSystem.js';
import { createStarField } from './starField.js';
import { XRController } from './xrController.js';

// シーンの初期化
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);

// カメラの設定
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  10000
);
camera.position.set(0, 15, 35);

// レンダラーの設定
const renderer = new THREE.WebGLRenderer({
  antialias: true,
  powerPreference: "high-performance"
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.2;
renderer.xr.enabled = true;

document.getElementById('canvas-container').appendChild(renderer.domElement);

// VR/MRボタンの設定
const vrButton = document.getElementById('vr-button');
vrButton.addEventListener('click', async () => {
  if (navigator.xr) {
    try {
      const session = await navigator.xr.requestSession('immersive-ar', {
        requiredFeatures: ['local-floor'],
        optionalFeatures: ['hand-tracking', 'layers']
      });

      // XRコントローラの初期化
      if (!xrController) {
        xrController = new XRController(renderer, scene, solarSystem.group);
      }

      renderer.xr.setSession(session);
      console.log('MRモード開始');
    } catch (error) {
      console.log('MRモードは使用できません:', error);
      alert('お使いのデバイスはMRモードに対応していません');
    }
  } else {
    alert('WebXRがサポートされていません');
  }
});

// コントロールの設定
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.minDistance = 3;
controls.maxDistance = 150;

// 星空の追加
const starField = createStarField();
scene.add(starField);

// 太陽系の作成
const solarSystem = createSolarSystem();
// 太陽系をMRモードで操作できるように、初期位置を前方に配置
solarSystem.group.position.set(0, 1.5, -2);
solarSystem.group.scale.set(0.3, 0.3, 0.3); // MR用に小さくする
scene.add(solarSystem.group);

// XRコントローラの初期化
let xrController = null;

// 環境光の追加（惑星を見やすくするため）
const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
scene.add(ambientLight);

// ポストプロセッシング（ブルームエフェクト）
const composer = new EffectComposer(renderer);

const renderPass = new RenderPass(scene, camera);
composer.addPass(renderPass);

const bloomPass = new UnrealBloomPass(
  new THREE.Vector2(window.innerWidth, window.innerHeight),
  1.5,  // strength（強度）
  0.4,  // radius（半径）
  0.85  // threshold（閾値）
);
composer.addPass(bloomPass);

// ウィンドウリサイズ対応
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  composer.setSize(window.innerWidth, window.innerHeight);
});

// アニメーションループ
const clock = new THREE.Clock();

function animate() {
  const elapsedTime = clock.getElapsedTime();

  // コントロールの更新（XRモード以外）
  if (!renderer.xr.isPresenting) {
    controls.update();
  }

  // XRコントローラの更新
  if (xrController && renderer.xr.isPresenting) {
    xrController.update();
  }

  // 太陽系の更新
  solarSystem.update(elapsedTime);

  // レンダリング（XRモード時は通常レンダリング、それ以外はブルーム付き）
  if (renderer.xr.isPresenting) {
    renderer.render(scene, camera);
  } else {
    composer.render();
  }
}

// XRセッション対応のアニメーションループ
renderer.setAnimationLoop(animate);

console.log('Helios太陽系シミュレーター起動完了');
