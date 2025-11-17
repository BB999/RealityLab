import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

let scene, camera, renderer, drone;
let xrSession = null;
let rightController = null;
let dronePositioned = false;
let propellers = [];
let gamepad = null;
let audioListener = null;
let droneSound = null;
let hoverTime = 0; // 浮遊アニメーション用タイマー

// 物理演算用パラメータ
let velocity = new THREE.Vector3(0, 0, 0); // 速度ベクトル
let angularVelocity = 0; // 角速度（Y軸回転）
const acceleration = 0.0014; // 加速度
const maxSpeed = 0.4; // 最大速度
const friction = 0.9; // 摩擦係数（慣性の減衰）
const angularAcceleration = 0.0030; // 角加速度
const maxAngularSpeed = 0.06; // 最大角速度
const angularFriction = 0.90; // 角速度の減衰
const tiltAmount = 0.6; // 移動方向への傾き量（速度に対する係数）
const tiltSmoothing = 0.05; // 傾きの補間速度（0.0-1.0、大きいほど速く傾く/戻る）

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

  // オーディオリスナー作成
  audioListener = new THREE.AudioListener();
  camera.add(audioListener);

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

      // ドローン音声の設定
      setupDroneSound();

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

// ドローン音声の設定
function setupDroneSound() {
  if (!drone || !audioListener) {
    console.error('ドローンまたはオーディオリスナーが未初期化');
    return;
  }

  // PositionalAudio作成（距離に応じて音量が変わる3D音響）
  droneSound = new THREE.PositionalAudio(audioListener);

  // オーディオローダーで音声ファイル読み込み
  const audioLoader = new THREE.AudioLoader();
  audioLoader.load(
    '/oto.ogg',
    (buffer) => {
      droneSound.setBuffer(buffer);
      droneSound.setLoop(true); // ループ再生
      droneSound.setVolume(1.0); // 基本音量
      droneSound.setRefDistance(0.5); // 基準距離（この距離で最大音量）
      droneSound.setRolloffFactor(2); // 距離減衰率（大きいほど急激に減衰）
      droneSound.setMaxDistance(10); // 最大聴取距離

      console.log('ドローン音声読み込み完了');
      updateInfo('ドローン音声準備完了');
    },
    (progress) => {
      console.log('音声読み込み中:', (progress.loaded / progress.total * 100) + '%');
    },
    (error) => {
      console.error('音声ファイルの読み込みエラー:', error);
      updateInfo('エラー: 音声ファイルを読み込めませんでした');
    }
  );

  // ドローンに音声を追加
  drone.add(droneSound);
  console.log('ドローンに音声を追加');
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

  // ドローンの浮遊感アニメーション
  if (drone && dronePositioned) {
    hoverTime += 0.016; // 約60FPSでの経過時間（秒）

    // 基準位置を保存（初回のみ）
    if (!drone.userData.basePosition) {
      drone.userData.basePosition = drone.position.clone();
    }

    // サイン波を使った滑らかな上下揺れ（振幅0.003m = 3mm）
    const hoverY = Math.sin(hoverTime * 2) * 0.003;

    // コサイン波を使った前後揺れ（振幅0.002m = 2mm）
    const hoverZ = Math.cos(hoverTime * 1.5) * 0.002;

    // 少しずつ異なる周期で左右揺れ（振幅0.002m = 2mm）
    const hoverX = Math.sin(hoverTime * 1.3) * 0.002;

    // 微妙な傾き（ロール・ピッチ）- 浮遊感用の小さな揺れ
    const hoverTiltX = Math.sin(hoverTime * 1.2) * 0.005; // 約0.3度
    const hoverTiltZ = Math.cos(hoverTime * 1.4) * 0.005; // 約0.3度

    // 浮遊アニメーションを基準位置に加算
    const basePos = drone.userData.basePosition;
    drone.position.x = basePos.x + hoverX;
    drone.position.y = basePos.y + hoverY;
    drone.position.z = basePos.z + hoverZ;

    // 傾きを設定（物理的な傾き + 浮遊感の揺れ）
    if (!drone.userData.physicsTilt) {
      drone.userData.physicsTilt = { x: 0, z: 0 };
    }

    // オイラー角をYXZの順序で適用（ヨー→ピッチ→ロール）
    // これにより、ピッチとロールが常に機体のローカル軸に対して適用される
    drone.rotation.order = 'YXZ';
    // Y軸回転（ヨー）は別で管理されている
    // X軸回転（ピッチ）とZ軸回転（ロール）は物理的な傾き + 浮遊感
    drone.rotation.x = drone.userData.physicsTilt.x + hoverTiltX;
    drone.rotation.z = drone.userData.physicsTilt.z + hoverTiltZ;
  }

  // ゲームパッド入力でドローンを操作（物理演算）
  if (xrSession && drone && dronePositioned) {
    const inputSources = xrSession.inputSources;
    let inputX = 0, inputY = 0, inputZ = 0; // 入力値
    let inputRotation = 0;
    let rawInputX = 0, rawInputZ = 0; // 生の入力値（傾き計算用）

    for (const source of inputSources) {
      if (source.gamepad) {
        const gp = source.gamepad;
        const axes = gp.axes;

        // 右コントローラー（handedness: 'right'）
        // axes[2]: 右スティック左右 → 左右移動
        // axes[3]: 右スティック上下 → 上昇・下降
        if (source.handedness === 'right' && axes.length >= 4) {
          if (Math.abs(axes[2]) > 0.3) {
            inputX = axes[2];
            rawInputX = axes[2];
          }
          if (Math.abs(axes[3]) > 0.3) {
            inputY = -axes[3]; // 上下反転
          }
        }

        // 左コントローラー（handedness: 'left'）
        // axes[2]: 左スティック左右 → 旋回
        // axes[3]: 左スティック上下 → 前後移動
        if (source.handedness === 'left' && axes.length >= 4) {
          if (Math.abs(axes[2]) > 0.3) {
            inputRotation = -axes[2];
          }
          if (Math.abs(axes[3]) > 0.3) {
            inputZ = axes[3];
            rawInputZ = axes[3];
          }
        }
      }
    }

    // 上昇・下降（絶対座標）
    velocity.y += inputY * acceleration;

    // Y軸周りの回転のみを適用（傾きを無視）
    const yRotationOnly = new THREE.Quaternion();
    yRotationOnly.setFromAxisAngle(new THREE.Vector3(0, 1, 0), drone.rotation.y);

    // 前後移動はドローンのY軸回転のみに従う（水平方向のみ）
    const forward = new THREE.Vector3(0, 0, -1);
    forward.applyQuaternion(yRotationOnly);
    forward.y = 0; // Y成分を0にして水平移動のみにする
    forward.normalize();
    forward.multiplyScalar(inputZ * acceleration);
    velocity.add(forward);

    // 左右移動も機体の向きに対して相対的に
    const right = new THREE.Vector3(-1, 0, 0); // 左右を反転
    right.applyQuaternion(yRotationOnly);
    right.y = 0; // Y成分を0にして水平移動のみにする
    right.normalize();
    right.multiplyScalar(inputX * acceleration);
    velocity.add(right);

    // 速度制限
    if (velocity.length() > maxSpeed) {
      velocity.normalize().multiplyScalar(maxSpeed);
    }

    // 摩擦による減衰
    velocity.multiplyScalar(friction);

    // 速度を位置に反映
    drone.userData.basePosition.add(velocity);

    // 角速度の更新
    angularVelocity += inputRotation * angularAcceleration;
    angularVelocity = Math.max(-maxAngularSpeed, Math.min(maxAngularSpeed, angularVelocity));
    angularVelocity *= angularFriction;

    // 角速度を回転に反映
    drone.rotation.y += angularVelocity;

    // 移動方向への傾き（ピッチ・ロール）
    // 入力値に基づいて傾きを計算（機体の向きに関係なく、操作に対して傾く）
    const targetTiltX = -rawInputZ * tiltAmount; // 前後移動：前進で前に傾く、後退で後ろに傾く
    const targetTiltZ = rawInputX * tiltAmount; // 左右移動：右移動で右に傾く、左移動で左に傾く

    // 傾きを滑らかに補間
    if (!drone.userData.physicsTilt) {
      drone.userData.physicsTilt = { x: 0, z: 0 };
    }
    drone.userData.physicsTilt.x += (targetTiltX - drone.userData.physicsTilt.x) * tiltSmoothing;
    drone.userData.physicsTilt.z += (targetTiltZ - drone.userData.physicsTilt.z) * tiltSmoothing;
  }

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

    // ドローン音声を再生開始
    if (droneSound && !droneSound.isPlaying) {
      droneSound.play();
      console.log('ドローン音声再生開始');
    }

    // ボタンを非表示
    const button = document.getElementById('start-button');
    if (button) {
      button.style.display = 'none';
    }

    updateInfo('MRセッション開始');

    xrSession.addEventListener('end', () => {
      xrSession = null;

      // ドローン音声を停止
      if (droneSound && droneSound.isPlaying) {
        droneSound.stop();
        console.log('ドローン音声停止');
      }

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
