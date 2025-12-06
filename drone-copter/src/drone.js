import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import * as state from './state.js';
import { setupDroneSound, setupButtonSound, setupWindowSound, setupCursorSound, setupCrashSound, setupTutorialBGM, updateDroneSoundPitch } from './sound.js';
import { updateInfo } from './utils.js';

// 前方向を示す青い光るボックスを作成
function createDirectionIndicator() {
  const geometry = new THREE.BoxGeometry(0.1, 0.04, 0.01);
  const material = new THREE.MeshStandardMaterial({
    color: 0x0088ff,
    emissive: 0x0088ff,
    emissiveIntensity: 2,
  });
  const indicator = new THREE.Mesh(geometry, material);
  // ドローンの前方（Z軸プラス方向）に配置
  indicator.position.set(0, 0.04, 0.22);

  // 点滅パターン: 0.15秒表示→0.15秒消灯→0.15秒表示→1.5秒消灯→ループ
  let blinkState = 0;
  const blinkPattern = [
    { visible: true, duration: 150 },
    { visible: false, duration: 150 },
    { visible: true, duration: 150 },
    { visible: false, duration: 1000 },
  ];

  function blink() {
    // 起動シーケンス開始前（isStartingUpがfalseでisStartupCompleteもfalse、プロペラも止まっている）はずっと点灯
    if (!state.isStartingUp && !state.isStartupComplete && state.propellerSpeedMultiplier === 0) {
      indicator.visible = true;
      setTimeout(blink, 100);
      return;
    }

    // それ以外は点滅
    indicator.visible = blinkPattern[blinkState].visible;
    setTimeout(() => {
      blinkState = (blinkState + 1) % blinkPattern.length;
      blink();
    }, blinkPattern[blinkState].duration);
  }
  blink();

  return indicator;
}

// ドローンのバウンディングボックスを計算して当たり判定の半径を設定
export function calculateDroneBoundingBox() {
  if (!state.drone) return;

  // バウンディングボックスを計算
  const box = new THREE.Box3().setFromObject(state.drone);
  state.setDroneBoundingBox(box);

  // ボックスのサイズを取得
  const size = new THREE.Vector3();
  box.getSize(size);

  // 水平方向の半径（XとZの最大値）
  const horizontal = Math.max(size.x, size.z) / 2;
  // 垂直方向の半径（Yの半分）を10%増し
  const vertical = (size.y / 2) * 1.1;

  state.setDroneCollisionRadius({ horizontal, vertical });

  console.log('ドローンのサイズ:', size);
  console.log('当たり判定 - 水平:', (horizontal * 100).toFixed(1) + 'cm');
  console.log('当たり判定 - 垂直:', (vertical * 100).toFixed(1) + 'cm');
}

// ドローンのスケールを変更
export function updateDroneScale(newScale) {
  if (!state.drone) return;

  // 最小値のみ設定（極端に小さくなりすぎないように）
  if (newScale < 0.01) {
    newScale = 0.01;
  }

  // ドローンのスケールを更新
  state.drone.scale.set(newScale, newScale, newScale);
  state.setCurrentDroneScale(newScale);

  // 当たり判定を再計算
  calculateDroneBoundingBox();

  // 速度と加速度を更新（サイズに応じて）
  updateMaxSpeed();

  // 音のピッチと音量を更新
  updateDroneSoundPitch();

  console.log('ドローンのスケール変更:', newScale.toFixed(2));
}

// 速度レベルとサイズに応じてmaxSpeedと加速度を更新
export function updateMaxSpeed() {
  // speedLevel 1 = 5%, 30 = 400%
  const speedMultiplier = 0.05 + (state.speedLevel - 1) * (4.0 - 0.05) / 29; // 0.05 ~ 4.0

  // サイズに応じた速度倍率（大きいほど速く、小さいほど遅く）
  // スケール0.3で1.0倍、スケール1.0で1.73倍、スケール0.1で0.58倍
  const sizeMultiplier = Math.pow(state.currentDroneScale / 0.3, 0.5);
  // サイズ倍率は0.5〜2.0に制限
  const clampedSizeMultiplier = Math.max(0.5, Math.min(2.0, sizeMultiplier));

  // 最終的な最大速度と加速度
  const newMaxSpeed = state.baseMaxSpeed * speedMultiplier * clampedSizeMultiplier;
  const newAcceleration = state.baseAcceleration * speedMultiplier * clampedSizeMultiplier;
  state.setMaxSpeed(newMaxSpeed);
  state.setAcceleration(newAcceleration);

  // サイズに応じた摩擦係数（大きいほど慣性が大きい）
  const frictionAdjustment = (clampedSizeMultiplier - 1.0) * 0.04;
  let newFriction = state.baseFriction + frictionAdjustment;
  newFriction = Math.max(0.90, Math.min(0.98, newFriction));
  state.setFriction(newFriction);

  let newAngularFriction = state.baseAngularFriction + frictionAdjustment;
  newAngularFriction = Math.max(0.90, Math.min(0.98, newAngularFriction));
  state.setAngularFriction(newAngularFriction);

  // 自動帰還中の場合は、autoReturnSpeedも更新
  if (state.isAutoReturning) {
    state.setAutoReturnSpeed(newMaxSpeed * 1.5);
    console.log(`速度レベル: ${state.speedLevel}, サイズ倍率: ${clampedSizeMultiplier.toFixed(2)}, maxSpeed: ${newMaxSpeed.toFixed(4)}, autoReturnSpeed: ${state.autoReturnSpeed.toFixed(4)}, 摩擦: ${newFriction.toFixed(3)}`);
  } else {
    console.log(`速度レベル: ${state.speedLevel}, サイズ倍率: ${clampedSizeMultiplier.toFixed(2)}, maxSpeed: ${newMaxSpeed.toFixed(4)}, 加速度: ${newAcceleration.toFixed(6)}, 摩擦: ${newFriction.toFixed(3)}`);
  }
}

// ドローンモデルの読み込み
export function loadDroneModel() {
  const loader = new GLTFLoader();
  loader.load(
    './doron.glb',
    (gltf) => {
      const drone = gltf.scene;
      drone.scale.set(0.3, 0.3, 0.3);
      drone.position.set(0, 0, -2);
      state.scene.add(drone);
      state.setDrone(drone);

      // プロペラを検索
      const propellersList = [];
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

          propellersList.push(child);
        }
      });
      state.setPropellers(propellersList);

      console.log('ドローンモデル読み込み完了');
      console.log('プロペラ数:', propellersList.length);

      // ドローンのバウンディングボックスを計算
      calculateDroneBoundingBox();

      // 初期速度を設定
      updateMaxSpeed();

      // 前方向を示す青い光るボックスを追加
      const directionIndicator = createDirectionIndicator();
      drone.add(directionIndicator);

      // ドローン音声の設定
      setupDroneSound();
      setupButtonSound();
      setupWindowSound();
      setupCursorSound();
      setupCrashSound();
      setupTutorialBGM();

      // 配置されるまで非表示
      drone.visible = false;

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
}
