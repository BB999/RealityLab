import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

let scene, camera, renderer, drone;
let xrSession = null;
let rightController = null;
let dronePositioned = false;
let propellers = [];

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

  // ドローンモデルの読み込み
  const loader = new GLTFLoader();
  loader.load(
    '/doron.glb',
    (gltf) => {
      drone = gltf.scene;
      drone.scale.set(0.3, 0.3, 0.3);
      drone.position.set(0, 0, -2);
      scene.add(drone);

      // プロペラを検索
      propellers = [];
      drone.traverse((child) => {
        if (child.name === 'pera1' || child.name === 'pera2' ||
            child.name === 'pera3' || child.name === 'pera4') {

          // ジオメトリの中心を計算
          if (child.geometry) {
            child.geometry.computeBoundingBox();
            const center = new THREE.Vector3();
            child.geometry.boundingBox.getCenter(center);

            console.log('プロペラ発見:', child.name);
            console.log('  元の位置:', child.position.clone());
            console.log('  ジオメトリ中心:', center);

            // ジオメトリを中心に移動
            child.geometry.translate(-center.x, -center.y, -center.z);

            // オブジェクトの位置をジオメトリの元の中心に設定
            child.position.copy(center);

            console.log('  新しい位置:', child.position);
          }

          propellers.push(child);
        }
      });

      console.log('ドローンモデル読み込み完了');
      console.log('プロペラ数:', propellers.length);
      updateInfo('ドローンモデル読み込み完了');
    },
    (progress) => {
      console.log('Loading:', (progress.loaded / progress.total * 100) + '%');
    },
    (error) => {
      console.error('ドローンモデルの読み込みエラー:', error);
      updateInfo('エラー: ドローンモデルを読み込めませんでした');
    }
  );

  // ウィンドウリサイズ対応
  window.addEventListener('resize', onWindowResize);

  // アニメーションループ
  renderer.setAnimationLoop(render);
}

function render() {
  // 右コントローラーの位置を取得してドローンを配置
  if (rightController && drone && !dronePositioned) {
    // コントローラーの位置を取得
    const controllerPos = new THREE.Vector3();
    rightController.getWorldPosition(controllerPos);

    // コントローラーの前方向を取得
    const direction = new THREE.Vector3(0, 0, -1);
    direction.applyQuaternion(rightController.quaternion);

    // コントローラーの前方30cm（0.3m）にドローンを配置
    drone.position.copy(controllerPos).add(direction.multiplyScalar(0.3));

    dronePositioned = true;
    updateInfo('ドローンを右コントローラーの前に配置');
  }

  // プロペラをy軸回転
  propellers.forEach((propeller) => {
    propeller.rotation.y += 0.5;
  });

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

    // immersive-ar モードをサポートしているか確認
    const supported = await navigator.xr.isSessionSupported('immersive-ar');

    if (!supported) {
      updateInfo('immersive-ARがサポートされていません');
      alert('このデバイスはAR機能をサポートしていません');
      return;
    }

    // XRセッション開始
    xrSession = await navigator.xr.requestSession('immersive-ar', {
      requiredFeatures: [],
      optionalFeatures: ['local-floor', 'bounded-floor']
    });

    await renderer.xr.setSession(xrSession);

    // 右コントローラーを取得
    rightController = renderer.xr.getController(1); // 1 = 右コントローラー
    scene.add(rightController);

    // ドローン配置フラグをリセット
    dronePositioned = false;

    // ボタンを非表示
    const button = document.getElementById('start-button');
    if (button) {
      button.style.display = 'none';
    }

    updateInfo('MRセッション開始');

    xrSession.addEventListener('end', () => {
      xrSession = null;
      updateInfo('MRセッション終了');
      if (button) {
        button.style.display = 'block';
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

// 初期化実行
init();

// ボタンのイベントリスナー
const startButton = document.getElementById('start-button');
if (startButton) {
  startButton.addEventListener('click', startXR);
}
