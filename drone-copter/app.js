import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

let scene, camera, renderer, drone;
let xrSession = null;
let rightController = null;
let leftController = null;
let dronePositioned = false;
let propellers = [];
let gamepad = null;
let audioListener = null;
let droneSound = null;
let hoverTime = 0; // 浮遊アニメーション用タイマー
let isSoundMuted = false; // 音声のミュート状態
let leftStickButtonPressed = false; // 左スティックボタンの押下状態（トグル用）
let droneBoundingBox = null; // ドローンのバウンディングボックス
let droneCollisionRadius = { horizontal: 0.15, vertical: 0.05 }; // デフォルト値

// 衝突エフェクト用変数
let collisionParticles = [];
let lastCollisionTime = 0;

// 自動帰還モード用変数
let isAutoReturning = false; // 自動帰還中か
let autoReturnTarget = new THREE.Vector3(); // 帰還先の位置
let autoReturnSpeed = 0.02; // 帰還速度
let autoReturnPhase = 'horizontal'; // 'horizontal' または 'vertical'
let rightAButtonPressed = false; // 右Aボタンの押下状態
let autoReturnText = null; // 自動帰還中のテキスト表示

// 深度センサー用変数
let depthDataTexture = null;
let depthMesh = null;
let showDepthVisualization = false;

// plane-detection用変数
let detectedPlanes = new Map(); // 検出された平面を格納

// VR用背景とグリッド
let vrBackground = null;
let gridHelper = null;

// ハンドトラッキングとグリップ機能用変数
let hand1 = null;
let hand2 = null;
let isGrabbedByController = false; // コントローラーで掴んでいるか
let isGrabbedByHand = false; // 手で掴んでいるか
let grabbingController = null; // 掴んでいるコントローラー
let grabbingInputSource = null; // 掴んでいるinputSource
let grabbingHand = null; // 掴んでいる手
let grabOffset = new THREE.Vector3(); // 掴んだ時のオフセット
let grabRotationOffset = new THREE.Quaternion(); // 掴んだ時の回転オフセット
let rightGripPressed = false; // 右グリップボタンの状態
let leftGripPressed = false; // 左グリップボタンの状態
let smoothedHandPosition = new THREE.Vector3(); // スムージングされた手の位置
let smoothedHandRotation = new THREE.Quaternion(); // スムージングされた手の回転
const handSmoothingFactor = 0.3; // スムージング係数（0.0-1.0、大きいほど速く追従）
let smoothedControllerPosition = new THREE.Vector3(); // スムージングされたコントローラーの位置
let smoothedControllerRotation = new THREE.Quaternion(); // スムージングされたコントローラーの回転
const controllerSmoothingFactor = 0.3; // コントローラーのスムージング係数

// 離した時のアニメーション用変数
let isReturningToHover = false; // ホバー状態に戻る途中か
let returnStartPosition = new THREE.Vector3(); // 戻る開始位置
let returnStartRotation = new THREE.Quaternion(); // 戻る開始回転
let returnTargetRotation = new THREE.Quaternion(); // 戻る目標回転（水平）
let returnProgress = 0; // 戻るアニメーションの進行度（0.0-1.0）
const returnDuration = 1.0; // 戻るアニメーションの時間（秒）
const returnSpeed = 1.0 / returnDuration; // 戻る速度（秒あたりの進行度）

// 物理演算用パラメータ
let velocity = new THREE.Vector3(0, 0, 0); // 速度ベクトル
let angularVelocity = 0; // 角速度（Y軸回転）
const acceleration = 0.0014; // 加速度
const maxSpeed = 0.015; // 最大速度
const friction = 0.965; // 摩擦係数（慣性の減衰）
const angularAcceleration = 0.0030; // 角加速度
const maxAngularSpeed = 0.06; // 最大角速度
const angularFriction = 0.965; // 角速度の減衰
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

      // ドローンのバウンディングボックスを計算
      calculateDroneBoundingBox();

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

// ドローンのバウンディングボックスを計算して当たり判定の半径を設定
function calculateDroneBoundingBox() {
  if (!drone) return;

  // バウンディングボックスを計算
  const box = new THREE.Box3().setFromObject(drone);
  droneBoundingBox = box;

  // ボックスのサイズを取得
  const size = new THREE.Vector3();
  box.getSize(size);

  // 水平方向の半径（XとZの最大値）
  droneCollisionRadius.horizontal = Math.max(size.x, size.z) / 2;

  // 垂直方向の半径（Yの半分）を10%増し
  droneCollisionRadius.vertical = (size.y / 2) * 1.1;

  console.log('ドローンのサイズ:', size);
  console.log('当たり判定 - 水平:', (droneCollisionRadius.horizontal * 100).toFixed(1) + 'cm');
  console.log('当たり判定 - 垂直:', (droneCollisionRadius.vertical * 100).toFixed(1) + 'cm');
}

// VR用の背景とグリッドを作成
function createVREnvironment() {
  // 薄いグレーの背景色を設定
  scene.background = new THREE.Color(0xcccccc);

  // 床グリッドを作成（細かいグリッド）
  const gridSize = 50; // グリッドのサイズ（50m x 50m）
  const gridDivisions = 100; // 分割数（0.5m間隔）
  gridHelper = new THREE.GridHelper(gridSize, gridDivisions, 0x888888, 0x999999);
  gridHelper.position.y = 0; // 床の高さ
  scene.add(gridHelper);

  console.log('VR環境を作成しました');
}

// VR環境を削除
function removeVREnvironment() {
  // 背景色を透明に戻す
  scene.background = null;

  // グリッドを削除
  if (gridHelper) {
    scene.remove(gridHelper);
    gridHelper = null;
  }

  console.log('VR環境を削除しました');
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

// 自動帰還中のテキストを作成
function createAutoReturnText() {
  if (autoReturnText) return; // 既に存在する場合は作成しない

  // キャンバスを使ってテキストテクスチャを作成
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 128;
  const context = canvas.getContext('2d');

  // 背景を半透明の黒に
  context.fillStyle = 'rgba(0, 0, 0, 0.7)';
  context.fillRect(0, 0, canvas.width, canvas.height);

  // テキストを描画
  context.fillStyle = '#00ff00'; // 緑色
  context.font = 'bold 60px Arial';
  context.textAlign = 'center';
  context.textBaseline = 'middle';
  context.fillText('自動帰還中', canvas.width / 2, canvas.height / 2);

  // テクスチャを作成
  const texture = new THREE.CanvasTexture(canvas);

  // 平面ジオメトリを作成
  const geometry = new THREE.PlaneGeometry(0.3, 0.075);
  const material = new THREE.MeshBasicMaterial({
    map: texture,
    transparent: true,
    side: THREE.DoubleSide
  });

  autoReturnText = new THREE.Mesh(geometry, material);
  scene.add(autoReturnText);
}

// 自動帰還中のテキストを削除
function removeAutoReturnText() {
  if (autoReturnText) {
    scene.remove(autoReturnText);
    autoReturnText.geometry.dispose();
    autoReturnText.material.dispose();
    autoReturnText.material.map.dispose();
    autoReturnText = null;
  }
}

// 自動帰還中のテキスト位置を更新
function updateAutoReturnText() {
  if (autoReturnText && drone) {
    // ドローンの真上にテキストを配置
    const offset = new THREE.Vector3(0, 0.2, 0); // ドローンの真上20cm
    autoReturnText.position.copy(drone.position).add(offset);

    // テキストをカメラの方を向かせる
    autoReturnText.lookAt(camera.position);
  }
}

// 深度データの処理
function processDepthInformation(frame, referenceSpace) {
  const pose = frame.getViewerPose(referenceSpace);
  if (!pose) return;

  // WebGLバインディングを取得（GPU最適化モードの場合）
  const glBinding = frame.session.renderState.baseLayer;

  for (const view of pose.views) {
    // GPU最適化モードの場合はWebGLテクスチャとして取得
    if (glBinding && glBinding.getDepthInformation) {
      const depthInfo = glBinding.getDepthInformation(view);
      if (depthInfo) {
        // WebGLテクスチャとして深度データが利用可能
        const texture = depthInfo.texture;

        // Three.jsのWebGLTextureとして設定
        if (!depthDataTexture) {
          depthDataTexture = new THREE.Texture();
          // WebGLテクスチャを直接マッピング
          const properties = renderer.properties.get(depthDataTexture);
          properties.__webglTexture = texture;
          properties.__webglInit = true;
          depthDataTexture.needsUpdate = true;
        }

        // 深度情報をログ出力（デバッグ用・初回のみ）
        if (!depthDataTexture.userData.logged) {
          console.log('深度データ取得 (GPU):', {
            width: depthInfo.width,
            height: depthInfo.height,
            normDepthBufferFromNormView: depthInfo.normDepthBufferFromNormView
          });
          depthDataTexture.userData.logged = true;
        }
      }
    }
  }
}

// 深度メッシュの視覚化を作成
function createDepthVisualization() {
  if (depthMesh) return;

  const geometry = new THREE.PlaneGeometry(2, 2);
  const material = new THREE.MeshBasicMaterial({
    map: depthDataTexture,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.5
  });

  depthMesh = new THREE.Mesh(geometry, material);
  depthMesh.position.set(0, 1.5, -2);
  depthMesh.visible = showDepthVisualization;
  scene.add(depthMesh);
}

// plane-detectionで検出された平面を処理
function updatePlanes(frame, referenceSpace) {
  if (!frame.detectedPlanes) return;

  // 削除された平面を処理
  detectedPlanes.forEach((plane, xrPlane) => {
    if (!frame.detectedPlanes.has(xrPlane)) {
      // 平面が削除された
      detectedPlanes.delete(xrPlane);
    }
  });

  // 新しい平面または更新された平面を処理
  frame.detectedPlanes.forEach((xrPlane) => {
    const pose = frame.getPose(xrPlane.planeSpace, referenceSpace);
    if (!pose) return;

    // 平面の位置と向きを取得
    const position = new THREE.Vector3().setFromMatrixPosition(
      new THREE.Matrix4().fromArray(pose.transform.matrix)
    );
    const quaternion = new THREE.Quaternion().setFromRotationMatrix(
      new THREE.Matrix4().fromArray(pose.transform.matrix)
    );

    // 平面のポリゴンを取得
    const polygon = xrPlane.polygon;

    if (!detectedPlanes.has(xrPlane)) {
      // 新しい平面
      detectedPlanes.set(xrPlane, {
        position: position,
        quaternion: quaternion,
        polygon: polygon,
        orientation: xrPlane.orientation // 'horizontal' or 'vertical'
      });

      console.log('新しい平面を検出:', xrPlane.orientation);
    } else {
      // 既存の平面を更新
      const planeData = detectedPlanes.get(xrPlane);
      planeData.position = position;
      planeData.quaternion = quaternion;
      planeData.polygon = polygon;
    }
  });
}

// ドローンと平面の衝突判定
function checkPlaneCollision() {
  if (!drone || !dronePositioned) return;

  const dronePos = new THREE.Vector3();
  drone.getWorldPosition(dronePos);

  detectedPlanes.forEach((planeData, xrPlane) => {
    const { position, quaternion, polygon, orientation } = planeData;

    // ドローンから平面への距離を計算
    const planeNormal = new THREE.Vector3(0, 1, 0).applyQuaternion(quaternion);
    const planeToDrone = new THREE.Vector3().subVectors(dronePos, position);
    const distance = planeToDrone.dot(planeNormal);

    // 平面の向きに応じて異なる半径を使用
    // 平面が水平（床・天井）なら上下方向の半径を使用、垂直（壁）なら水平方向の半径を使用
    const effectiveRadius = (Math.abs(planeNormal.y) > 0.7)
      ? droneCollisionRadius.vertical
      : droneCollisionRadius.horizontal;

    // 平面に近い場合のみ詳細チェック
    if (Math.abs(distance) < effectiveRadius) {
      // ドローンの位置を平面のローカル座標系に変換
      const inverseQuaternion = quaternion.clone().invert();
      const localDronePos = dronePos.clone().sub(position).applyQuaternion(inverseQuaternion);

      // ポリゴン内部判定（2D）
      let inside = false;
      for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
        const xi = polygon[i].x, zi = polygon[i].z;
        const xj = polygon[j].x, zj = polygon[j].z;

        const intersect = ((zi > localDronePos.z) !== (zj > localDronePos.z))
          && (localDronePos.x < (xj - xi) * (localDronePos.z - zi) / (zj - zi) + xi);
        if (intersect) inside = !inside;
      }

      if (inside) {
        // 衝突！ドローンを平面の外側に押し出す
        const pushDistance = effectiveRadius - Math.abs(distance);
        const pushDirection = distance > 0 ? 1 : -1;
        const correction = planeNormal.clone().multiplyScalar(pushDistance * pushDirection);

        drone.position.add(correction);
        if (drone.userData.basePosition) {
          drone.userData.basePosition.add(correction);
        }

        // 平面方向の速度成分を0にする（反発させる）
        const velocityAlongNormal = velocity.dot(planeNormal);
        if (velocityAlongNormal < 0) {
          velocity.sub(planeNormal.clone().multiplyScalar(velocityAlongNormal * 1.5)); // 1.5倍で少し反発
        }
      }
    }
  });
}

function render() {
  // 自動帰還中のテキスト位置を更新
  updateAutoReturnText();

  // 深度情報と平面検出の処理
  if (xrSession) {
    const frame = renderer.xr.getFrame();
    const referenceSpace = renderer.xr.getReferenceSpace();
    if (frame && referenceSpace) {
      processDepthInformation(frame, referenceSpace);
      updatePlanes(frame, referenceSpace);
    }

    // 深度視覚化メッシュの作成と更新
    if (depthDataTexture && !depthMesh) {
      createDepthVisualization();
    }
    if (depthMesh) {
      depthMesh.visible = showDepthVisualization;
    }
  }

  // コントローラーの位置を取得してドローンを配置
  if (xrSession && drone && !dronePositioned) {
    const frame = renderer.xr.getFrame();
    const referenceSpace = renderer.xr.getReferenceSpace();

    if (frame && referenceSpace) {
      const inputSources = xrSession.inputSources;

      for (const source of inputSources) {
        // 右コントローラーを優先
        if (source.handedness === 'right' && source.gripSpace) {
          const gripPose = frame.getPose(source.gripSpace, referenceSpace);
          if (gripPose) {
            const controllerPos = new THREE.Vector3().setFromMatrixPosition(
              new THREE.Matrix4().fromArray(gripPose.transform.matrix)
            );

            console.log('右コントローラーの位置:', controllerPos);

            // コントローラーの位置が有効か確認（原点でない）
            if (controllerPos.length() > 0.01) {
              // ドローンを右コントローラーの位置に配置（高さも含めて）
              drone.position.copy(controllerPos);

              console.log('ドローン配置位置:', drone.position);

              // カメラ（ユーザー）の位置を取得
              const cameraPos = new THREE.Vector3();
              camera.getWorldPosition(cameraPos);

              // カメラの向き（ユーザーの正面方向）を取得
              const cameraDirection = new THREE.Vector3(0, 0, -1);
              cameraDirection.applyQuaternion(camera.quaternion);
              cameraDirection.y = 0; // 水平面のみ
              cameraDirection.normalize();

              // ドローンをカメラの正面方向（ユーザーが向いている方向）に設定
              const angle = Math.atan2(cameraDirection.x, cameraDirection.z);
              drone.rotation.y = angle;

              dronePositioned = true;
              updateInfo('ドローンを右コントローラーの位置に配置');
              break;
            }
          }
        }
      }
    }
  }

  // プロペラをy軸回転
  propellers.forEach((propeller) => {
    propeller.rotation.y += 0.5;
  });

  // 離した後のホバー位置への戻りアニメーション
  if (isReturningToHover && drone && dronePositioned) {
    // アニメーションの進行度を更新（約60FPSで0.016秒/フレーム）
    returnProgress += returnSpeed * 0.016;

    if (returnProgress >= 1.0) {
      // アニメーション完了
      returnProgress = 1.0;
      isReturningToHover = false;
      updateInfo('ホバー位置に戻りました');
    }

    // イージング関数（ease-out: 最初は速く、後半ゆっくり）
    const easeProgress = 1 - Math.pow(1 - returnProgress, 3);

    // 位置はそのまま（現在位置を維持）
    if (!drone.userData.basePosition) {
      drone.userData.basePosition = drone.position.clone();
    }
    drone.userData.basePosition.copy(drone.position);

    // 回転のみ水平に戻す（球面線形補間）
    const currentRotation = drone.quaternion.clone();
    drone.quaternion.slerpQuaternions(returnStartRotation, returnTargetRotation, easeProgress);

    // 速度と角速度をリセット
    velocity.set(0, 0, 0);
    angularVelocity = 0;
  }

  // ドローンの浮遊感アニメーション（掴んでいない時、かつ戻りアニメーション中でない時、自動帰還中でない時のみ）
  if (drone && dronePositioned && !isGrabbedByController && !isGrabbedByHand && !isReturningToHover && !isAutoReturning) {
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

  // コントローラーでドローンを掴む処理
  if (xrSession && drone && dronePositioned && !isGrabbedByHand) {
    const inputSources = xrSession.inputSources;

    for (const source of inputSources) {
      if (source.gamepad && source.gripSpace) {
        const gp = source.gamepad;
        const buttons = gp.buttons;

        // グリップボタン（通常buttons[1]）の状態を取得
        const gripButton = buttons[1];
        const isGripPressed = gripButton && gripButton.pressed;

        // 右コントローラーのグリップ
        if (source.handedness === 'right') {
          if (isGripPressed && !rightGripPressed && source.gripSpace) {
            // グリップボタンが押された瞬間
            const dronePos = new THREE.Vector3();
            drone.getWorldPosition(dronePos);

            // gripSpaceから直接位置を取得
            const frame = renderer.xr.getFrame();
            const referenceSpace = renderer.xr.getReferenceSpace();
            if (frame && referenceSpace) {
              const gripPose = frame.getPose(source.gripSpace, referenceSpace);
              if (gripPose) {
                const controllerPos = new THREE.Vector3().setFromMatrixPosition(new THREE.Matrix4().fromArray(gripPose.transform.matrix));

                // ドローンとコントローラーの距離をチェック（8cm以内なら掴める）
                const distance = dronePos.distanceTo(controllerPos);
                if (distance < 0.08) {
                  isGrabbedByController = true;
                  grabbingInputSource = source;

                  // スムージング用の初期位置・回転を先に設定
                  smoothedControllerPosition.copy(controllerPos);

                  const controllerQuat = new THREE.Quaternion().setFromRotationMatrix(new THREE.Matrix4().fromArray(gripPose.transform.matrix));
                  smoothedControllerRotation.copy(controllerQuat);

                  // オフセットを保存
                  grabOffset.copy(dronePos).sub(smoothedControllerPosition);

                  const droneQuat = new THREE.Quaternion();
                  drone.getWorldQuaternion(droneQuat);
                  grabRotationOffset.copy(smoothedControllerRotation).invert().multiply(droneQuat);

                  updateInfo('右コントローラーでドローンを掴んだ (距離: ' + (distance * 100).toFixed(1) + 'cm)');
                  console.log('右コントローラーでドローンを掴んだ');
                }
              }
            }
          } else if (!isGripPressed && rightGripPressed && isGrabbedByController && grabbingInputSource === source) {
            // グリップボタンが離された瞬間
            isGrabbedByController = false;
            grabbingInputSource = null;

            // 戻るアニメーションを開始
            isReturningToHover = true;
            returnProgress = 0;
            returnStartPosition.copy(drone.position);
            returnStartRotation.copy(drone.quaternion);
            returnTargetRotation.setFromAxisAngle(new THREE.Vector3(0, 1, 0), drone.rotation.y);

            updateInfo('ドローンを離した - ホバー位置に戻ります');
            console.log('ドローンを離した');
          }
          rightGripPressed = isGripPressed;
        }

        // 左コントローラーのグリップ
        if (source.handedness === 'left') {
          if (isGripPressed && !leftGripPressed && source.gripSpace) {
            // グリップボタンが押された瞬間
            const dronePos = new THREE.Vector3();
            drone.getWorldPosition(dronePos);

            // gripSpaceから直接位置を取得
            const frame = renderer.xr.getFrame();
            const referenceSpace = renderer.xr.getReferenceSpace();
            if (frame && referenceSpace) {
              const gripPose = frame.getPose(source.gripSpace, referenceSpace);
              if (gripPose) {
                const controllerPos = new THREE.Vector3().setFromMatrixPosition(new THREE.Matrix4().fromArray(gripPose.transform.matrix));

                // ドローンとコントローラーの距離をチェック（8cm以内なら掴める）
                const distance = dronePos.distanceTo(controllerPos);
                if (distance < 0.08) {
                  isGrabbedByController = true;
                  grabbingInputSource = source;

                  // スムージング用の初期位置・回転を先に設定
                  smoothedControllerPosition.copy(controllerPos);

                  const controllerQuat = new THREE.Quaternion().setFromRotationMatrix(new THREE.Matrix4().fromArray(gripPose.transform.matrix));
                  smoothedControllerRotation.copy(controllerQuat);

                  // オフセットを保存
                  grabOffset.copy(dronePos).sub(smoothedControllerPosition);

                  const droneQuat = new THREE.Quaternion();
                  drone.getWorldQuaternion(droneQuat);
                  grabRotationOffset.copy(smoothedControllerRotation).invert().multiply(droneQuat);

                  updateInfo('左コントローラーでドローンを掴んだ (距離: ' + (distance * 100).toFixed(1) + 'cm)');
                  console.log('左コントローラーでドローンを掴んだ');
                }
              }
            }
          } else if (!isGripPressed && leftGripPressed && isGrabbedByController && grabbingInputSource === source) {
            // グリップボタンが離された瞬間
            isGrabbedByController = false;
            grabbingInputSource = null;

            // 戻るアニメーションを開始
            isReturningToHover = true;
            returnProgress = 0;
            returnStartPosition.copy(drone.position);
            returnStartRotation.copy(drone.quaternion);
            returnTargetRotation.setFromAxisAngle(new THREE.Vector3(0, 1, 0), drone.rotation.y);

            updateInfo('ドローンを離した - ホバー位置に戻ります');
            console.log('ドローンを離した');
          }
          leftGripPressed = isGripPressed;
        }
      }
    }

    // コントローラーで掴んでいる場合、ドローンをコントローラーに追従させる
    if (isGrabbedByController && grabbingInputSource && grabbingInputSource.gripSpace) {
      const frame = renderer.xr.getFrame();
      const referenceSpace = renderer.xr.getReferenceSpace();
      if (frame && referenceSpace) {
        const gripPose = frame.getPose(grabbingInputSource.gripSpace, referenceSpace);
        if (gripPose) {
          const controllerPos = new THREE.Vector3().setFromMatrixPosition(new THREE.Matrix4().fromArray(gripPose.transform.matrix));

          // 位置のスムージング（線形補間）
          smoothedControllerPosition.lerp(controllerPos, controllerSmoothingFactor);

          // コントローラーの位置 + オフセットでドローンの位置を更新
          const newPos = smoothedControllerPosition.clone().add(grabOffset);
          drone.position.copy(newPos);
          // basePositionも同期
          if (drone.userData.basePosition) {
            drone.userData.basePosition.copy(newPos);
          }

          // コントローラーの回転に合わせてドローンを回転（スムージング付き）
          const controllerQuat = new THREE.Quaternion().setFromRotationMatrix(new THREE.Matrix4().fromArray(gripPose.transform.matrix));

          // 回転のスムージング（球面線形補間）
          smoothedControllerRotation.slerp(controllerQuat, controllerSmoothingFactor);

          const targetQuat = smoothedControllerRotation.clone().multiply(grabRotationOffset);
          drone.quaternion.copy(targetQuat);

          // 速度と角速度をリセット（掴んでいる間は物理演算を無効化）
          velocity.set(0, 0, 0);
          angularVelocity = 0;
        }
      }
    }
  }

  // 自動帰還モードの処理
  if (isAutoReturning && drone && dronePositioned) {
    if (autoReturnPhase === 'horizontal') {
      // フェーズ1: 水平方向（XZ平面）の移動
      const horizontalTarget = new THREE.Vector3(autoReturnTarget.x, drone.position.y, autoReturnTarget.z);
      const direction = new THREE.Vector3().subVectors(horizontalTarget, drone.position);
      const distance = direction.length();

      if (distance < 0.05) {
        // 水平方向の移動完了、高度調整フェーズへ
        autoReturnPhase = 'vertical';
        updateInfo('水平位置到達 - 高度調整中');
        console.log('水平移動完了、高度調整開始');
      } else {
        // 水平方向に移動
        direction.normalize();
        const moveSpeed = Math.min(autoReturnSpeed, distance);
        drone.position.x += direction.x * moveSpeed;
        drone.position.z += direction.z * moveSpeed;
        drone.userData.basePosition.copy(drone.position);

        // ドローンを進行方向に向ける（滑らかに）
        const targetAngle = Math.atan2(direction.x, direction.z);
        const currentAngle = drone.rotation.y;
        let angleDiff = targetAngle - currentAngle;

        // 角度差を-πからπの範囲に正規化
        while (angleDiff > Math.PI) angleDiff -= Math.PI * 2;
        while (angleDiff < -Math.PI) angleDiff += Math.PI * 2;

        drone.rotation.y += angleDiff * 0.1; // 滑らかに回転
      }
    } else if (autoReturnPhase === 'vertical') {
      // フェーズ2: 垂直方向（Y軸）の移動
      const verticalDistance = Math.abs(autoReturnTarget.y - drone.position.y);

      if (verticalDistance < 0.05) {
        // 高度調整完了、向き調整フェーズへ
        autoReturnPhase = 'rotation';
        updateInfo('高度到達 - 向き調整中');
        console.log('高度調整完了、向き調整開始');
      } else {
        // 垂直方向に移動
        const direction = Math.sign(autoReturnTarget.y - drone.position.y);
        const moveSpeed = Math.min(autoReturnSpeed, verticalDistance);
        drone.position.y += direction * moveSpeed;
        drone.userData.basePosition.copy(drone.position);
      }
    } else if (autoReturnPhase === 'rotation') {
      // フェーズ3: 向きの調整（初期向き = ユーザーの正面方向）
      const cameraPos = new THREE.Vector3();
      camera.getWorldPosition(cameraPos);

      // カメラの向き（ユーザーの正面方向）を取得
      const cameraDirection = new THREE.Vector3(0, 0, -1);
      cameraDirection.applyQuaternion(camera.quaternion);
      cameraDirection.y = 0; // 水平面のみ
      cameraDirection.normalize();

      // 目標角度
      const targetAngle = Math.atan2(cameraDirection.x, cameraDirection.z);
      const currentAngle = drone.rotation.y;

      // 角度差を計算
      let angleDiff = targetAngle - currentAngle;

      // 角度差を-πからπの範囲に正規化
      while (angleDiff > Math.PI) angleDiff -= Math.PI * 2;
      while (angleDiff < -Math.PI) angleDiff += Math.PI * 2;

      if (Math.abs(angleDiff) < 0.05) {
        // 向き調整完了、自動帰還終了
        drone.rotation.y = targetAngle; // 最終的な角度に設定
        isAutoReturning = false;
        autoReturnPhase = 'horizontal'; // 次回のためにリセット
        removeAutoReturnText(); // テキスト表示を削除
        drone.userData.basePosition.copy(drone.position);
        velocity.set(0, 0, 0);
        angularVelocity = 0;
        updateInfo('自動帰還完了');
        console.log('自動帰還完了');
      } else {
        // 滑らかに回転
        drone.rotation.y += angleDiff * 0.1;
      }
    }
  }

  // 右コントローラーのAボタンで自動帰還モード
  if (xrSession && drone && dronePositioned && !isGrabbedByController && !isGrabbedByHand) {
    const inputSources = xrSession.inputSources;

    for (const source of inputSources) {
      if (source.handedness === 'right' && source.gamepad) {
        const buttons = source.gamepad.buttons;
        // Aボタン（通常buttons[4]）
        const aButton = buttons[4];
        const isAPressed = aButton && aButton.pressed;

        if (isAPressed && !rightAButtonPressed && !isAutoReturning) {
          // Aボタンが押された瞬間（まだ自動帰還中でない場合のみ）
          const frame = renderer.xr.getFrame();
          const referenceSpace = renderer.xr.getReferenceSpace();
          if (frame && referenceSpace && source.gripSpace) {
            const gripPose = frame.getPose(source.gripSpace, referenceSpace);
            if (gripPose) {
              const controllerPos = new THREE.Vector3().setFromMatrixPosition(
                new THREE.Matrix4().fromArray(gripPose.transform.matrix)
              );

              // 自動帰還モードを開始
              isAutoReturning = true;
              autoReturnPhase = 'horizontal'; // 水平移動から開始
              autoReturnTarget.copy(controllerPos);
              createAutoReturnText(); // テキスト表示を作成
              updateInfo('自動帰還モード開始 - 水平移動中');
              console.log('自動帰還開始:', autoReturnTarget);
            }
          }
        }

        rightAButtonPressed = isAPressed;
      }
    }
  }

  // ゲームパッド入力でドローンを操作（物理演算）
  if (xrSession && drone && dronePositioned && !isGrabbedByController && !isGrabbedByHand && !isReturningToHover && !isAutoReturning) {
    const inputSources = xrSession.inputSources;
    let inputX = 0, inputY = 0, inputZ = 0; // 入力値
    let inputRotation = 0;
    let rawInputX = 0, rawInputZ = 0; // 生の入力値（傾き計算用）

    for (const source of inputSources) {
      if (source.gamepad) {
        const gp = source.gamepad;
        const axes = gp.axes;
        const buttons = gp.buttons;

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
        // buttons[3]: 左スティック押し込み → 音声オンオフ
        if (source.handedness === 'left' && axes.length >= 4) {
          if (Math.abs(axes[2]) > 0.3) {
            inputRotation = -axes[2];
          }
          if (Math.abs(axes[3]) > 0.3) {
            inputZ = axes[3];
            rawInputZ = axes[3];
          }

          // 左スティック押し込みで音声オンオフ（トグル）
          if (buttons.length > 3 && buttons[3].pressed) {
            if (!leftStickButtonPressed && droneSound) {
              // ボタンが押された瞬間のみ反応（トグル処理）
              isSoundMuted = !isSoundMuted;

              if (isSoundMuted) {
                droneSound.setVolume(0);
                console.log('ドローン音声: ミュート');
                updateInfo('ドローン音声: ミュート');
              } else {
                droneSound.setVolume(1.0);
                console.log('ドローン音声: オン');
                updateInfo('ドローン音声: オン');
              }

              leftStickButtonPressed = true;
            }
          } else {
            // ボタンが離されたらフラグをリセット
            leftStickButtonPressed = false;
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

    // デバッグ: 速度を表示
    if (velocity.length() > 0.001) {
      console.log('現在速度:', velocity.length().toFixed(4), 'maxSpeed:', maxSpeed);
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

    // 平面との衝突判定
    checkPlaneCollision();
  }

  // ハンドトラッキングでドローンを掴む処理
  if (xrSession && drone && dronePositioned && !isGrabbedByController) {
    const frame = renderer.xr.getFrame();
    if (frame) {
      const hands = [hand1, hand2];

      for (let i = 0; i < hands.length; i++) {
        const hand = hands[i];
        if (!hand) continue;

        // 手のジョイント（関節）情報を取得
        const indexTip = hand.joints['index-finger-tip'];
        const thumbTip = hand.joints['thumb-tip'];

        if (indexTip && thumbTip) {
          // ピンチジェスチャー判定（親指と人差し指の距離）
          const indexPos = new THREE.Vector3();
          const thumbPos = new THREE.Vector3();
          indexTip.getWorldPosition(indexPos);
          thumbTip.getWorldPosition(thumbPos);

          const pinchDistance = indexPos.distanceTo(thumbPos);
          const isPinching = pinchDistance < 0.025; // 2.5cm以内でピンチと判定（より厳密に）

          // ドローンの位置を取得
          const dronePos = new THREE.Vector3();
          drone.getWorldPosition(dronePos);

          // 手の中心位置（親指と人差し指の中点）
          const handCenter = new THREE.Vector3().addVectors(indexPos, thumbPos).multiplyScalar(0.5);

          // ドローンと手の距離
          const distanceToDrone = handCenter.distanceTo(dronePos);

          if (isPinching && !isGrabbedByHand && distanceToDrone < 0.08) {
            // ピンチして掴む（8cm以内に変更 - さらに縮小）
            isGrabbedByHand = true;
            grabbingHand = hand;

            // ドローンと手の位置の差分を保存（ワールド座標）
            grabOffset.copy(dronePos).sub(handCenter);

            // スムージング用の初期位置を設定
            smoothedHandPosition.copy(handCenter);

            // 手の手首の関節を取得して、手の向きを基準にする
            const wrist = hand.joints['wrist'];
            if (wrist) {
              // 手首の回転を基準にオフセットを計算
              const wristQuat = new THREE.Quaternion();
              wrist.getWorldQuaternion(wristQuat);
              const droneQuat = new THREE.Quaternion();
              drone.getWorldQuaternion(droneQuat);
              grabRotationOffset.copy(wristQuat).invert().multiply(droneQuat);
              // スムージング用の初期回転を設定
              smoothedHandRotation.copy(wristQuat);
            } else {
              // 手首が取れない場合はhand全体の回転を使用
              const handQuat = new THREE.Quaternion();
              hand.getWorldQuaternion(handQuat);
              const droneQuat = new THREE.Quaternion();
              drone.getWorldQuaternion(droneQuat);
              grabRotationOffset.copy(handQuat).invert().multiply(droneQuat);
              // スムージング用の初期回転を設定
              smoothedHandRotation.copy(handQuat);
            }

            updateInfo('手でドローンを掴んだ (距離: ' + (distanceToDrone * 100).toFixed(1) + 'cm)');
            console.log('手でドローンを掴んだ 距離:', distanceToDrone);
          } else if (!isPinching && isGrabbedByHand && grabbingHand === hand) {
            // ピンチを離して放す
            isGrabbedByHand = false;
            grabbingHand = null;

            // 戻るアニメーションを開始
            isReturningToHover = true;
            returnProgress = 0;
            returnStartPosition.copy(drone.position);
            returnStartRotation.copy(drone.quaternion);
            // 水平姿勢（Y軸回転のみ保持）
            returnTargetRotation.setFromAxisAngle(new THREE.Vector3(0, 1, 0), drone.rotation.y);

            updateInfo('ドローンを離した - ホバー位置に戻ります');
            console.log('ドローンを離した');
          }

          // 掴んでいる場合、ドローンを手に追従させる
          if (isGrabbedByHand && grabbingHand === hand) {
            // 手の中心位置を再計算
            indexTip.getWorldPosition(indexPos);
            thumbTip.getWorldPosition(thumbPos);
            handCenter.addVectors(indexPos, thumbPos).multiplyScalar(0.5);

            // 位置のスムージング（線形補間）
            smoothedHandPosition.lerp(handCenter, handSmoothingFactor);

            // 手の位置 + オフセットでドローンの位置を更新
            const newPos = smoothedHandPosition.clone().add(grabOffset);
            drone.position.copy(newPos);
            // basePositionも同期
            if (drone.userData.basePosition) {
              drone.userData.basePosition.copy(newPos);
            }

            // 手首の回転に合わせてドローンを回転（スムージング付き）
            const wrist = hand.joints['wrist'];
            if (wrist) {
              const wristQuat = new THREE.Quaternion();
              wrist.getWorldQuaternion(wristQuat);

              // 回転のスムージング（球面線形補間）
              smoothedHandRotation.slerp(wristQuat, handSmoothingFactor);

              const targetQuat = smoothedHandRotation.clone().multiply(grabRotationOffset);
              drone.quaternion.copy(targetQuat);
            } else {
              // 手首が取れない場合はhand全体の回転を使用
              const handQuat = new THREE.Quaternion();
              hand.getWorldQuaternion(handQuat);

              // 回転のスムージング（球面線形補間）
              smoothedHandRotation.slerp(handQuat, handSmoothingFactor);

              const targetQuat = smoothedHandRotation.clone().multiply(grabRotationOffset);
              drone.quaternion.copy(targetQuat);
            }

            // 速度と角速度をリセット（掴んでいる間は物理演算を無効化）
            velocity.set(0, 0, 0);
            angularVelocity = 0;
          }
        }
      }
    }
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

    // XRセッション開始（深度センサー、平面検出、ハンドトラッキングを有効化）
    xrSession = await navigator.xr.requestSession('immersive-ar', {
      requiredFeatures: [],
      optionalFeatures: ['local-floor', 'bounded-floor', 'depth-sensing', 'plane-detection', 'hand-tracking'],
      depthSensing: {
        usagePreference: ['cpu-optimized', 'gpu-optimized'],
        dataFormatPreference: ['luminance-alpha', 'float32']
      }
    });

    await renderer.xr.setSession(xrSession);

    // コントローラーを取得
    rightController = renderer.xr.getController(0);
    leftController = renderer.xr.getController(1);
    scene.add(rightController);
    scene.add(leftController);

    // ハンドトラッキングを取得
    hand1 = renderer.xr.getHand(0);
    hand2 = renderer.xr.getHand(1);
    scene.add(hand1);
    scene.add(hand2);

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
    const vrButton = document.getElementById('vr-button');
    if (vrButton) {
      vrButton.style.display = 'none';
    }

    // セッション開始イベントを発火
    window.dispatchEvent(new Event('xr-session-start'));

    updateInfo('MRセッション開始');

    // セッション開始後に深度センサーの状態を確認
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

      // ドローン音声を停止
      if (droneSound && droneSound.isPlaying) {
        droneSound.stop();
        console.log('ドローン音声停止');
      }

      // 深度関連のリソースをクリーンアップ
      if (depthMesh) {
        scene.remove(depthMesh);
        depthMesh = null;
      }
      depthDataTexture = null;

      // 平面検出関連のリソースをクリーンアップ
      detectedPlanes.clear();

      // セッション終了イベントを発火
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

    // immersive-vr モードをサポートしているか確認
    const supported = await navigator.xr.isSessionSupported('immersive-vr');

    if (!supported) {
      updateInfo('immersive-VRがサポートされていません');
      alert('このデバイスはVR機能をサポートしていません');
      return;
    }

    // XRセッション開始（VRモード）
    xrSession = await navigator.xr.requestSession('immersive-vr', {
      requiredFeatures: [],
      optionalFeatures: ['local-floor', 'bounded-floor', 'hand-tracking']
    });

    await renderer.xr.setSession(xrSession);

    // VR環境（背景とグリッド）を作成
    createVREnvironment();

    // コントローラーを取得
    rightController = renderer.xr.getController(0);
    leftController = renderer.xr.getController(1);
    scene.add(rightController);
    scene.add(leftController);

    // ハンドトラッキングを取得
    hand1 = renderer.xr.getHand(0);
    hand2 = renderer.xr.getHand(1);
    scene.add(hand1);
    scene.add(hand2);

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
    const vrButton = document.getElementById('vr-button');
    if (vrButton) {
      vrButton.style.display = 'none';
    }

    // セッション開始イベントを発火
    window.dispatchEvent(new Event('xr-session-start'));

    updateInfo('VRセッション開始');

    xrSession.addEventListener('end', () => {
      xrSession = null;

      // VR環境を削除
      removeVREnvironment();

      // ドローン音声を停止
      if (droneSound && droneSound.isPlaying) {
        droneSound.stop();
        console.log('ドローン音声停止');
      }

      // セッション終了イベントを発火
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

  // MRセッション開始時にボタンを表示
  window.addEventListener('xr-session-start', () => {
    depthToggleButton.style.display = 'block';
  });

  // MRセッション終了時にボタンを非表示
  window.addEventListener('xr-session-end', () => {
    depthToggleButton.style.display = 'none';
    showDepthVisualization = false;
    depthToggleButton.textContent = '深度表示 OFF';
  });
}

