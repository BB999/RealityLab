import * as THREE from 'three';
import { XRHandModelFactory } from 'three/addons/webxr/XRHandModelFactory.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// モジュールのインポート
import {
  createShield,
  updateShield,
  setTargetShieldProgress,
  resetShieldRandomDelays,
  getShieldGroup,
  setTargetFixedShieldProgress,
  setFixedShieldPosition,
  addFixedShieldImpact,
  checkFixedShieldCollision,
  isFixedShieldActive
} from './shield.js';

import {
  createAsteroid,
  updateAsteroid,
  castAsteroid,
  fireAsteroid,
  getAsteroidGroup,
  getAsteroidState
} from './asteroid.js';

import {
  getRightHandTransform,
  getLeftHandTransform,
  isHandOpen,
  isPalmFacingForward
} from './hand-tracking.js';

import {
  updateDepthInfo,
  createVREnvironment,
  removeVREnvironment,
  updatePlaneMeshes,
  toggleDepthVisualization,
  setShowDepthVisualization,
  cleanupDepth
} from './vr-environment.js';

// グローバル変数
let scene, camera, renderer, box;
let xrSession = null;
let rightController = null;
let leftController = null;
let boxPositioned = false;

// ハンドトラッキング用変数
let hand1 = null;
let hand2 = null;
let handModelFactory = null;
let handModel1 = null;
let handModel2 = null;

// 手の状態
let isLeftHandOpen = false;
let isRightHandOpen = false;

// レプリカモデル
let replicaModel = null;
let replicaPositioned = false;
let replicaFloatTime = 0;
let replicaWaitFrames = 0; // 配置前の待機フレーム数
let replicaBasePosition = null; // 初期配置位置（中心）
let replicaTargetPosition = null; // 移動先
let replicaMoveSpeed = 0.5; // 移動速度（m/s）
let isVRMode = false; // VRモードかどうか
let replicaIsMoving = true; // 移動中かどうか
let replicaStopTimer = 0; // 停止タイマー
let replicaStopDuration = 0; // 停止時間

// レプリカのアステロイド攻撃
let replicaAsteroidGroup = null;
let replicaBigCube = null;
let replicaBigCubeFaceMaterial = null;
let replicaBigCubeLineMaterial = null;
let replicaAsteroidState = 'idle'; // idle, charging, charged, firing
let replicaChargeProgress = 0;
let replicaAttackTimer = 0;
let replicaAttackInterval = 5; // 5秒ごとに攻撃
let replicaBullets = [];
let replicaFiredBullets = [];
const REPLICA_CUBE_SIZE = 0.15;
const REPLICA_TRION_COLOR = 0x88ffcc;

// ヒットエフェクト用
let hitOverlay = null;
let hitFlashIntensity = 0;

// レプリカのヒットエフェクト用
let replicaHitFlashTimer = 0;

// 自動シールド用
let autoShields = []; // { group, faceMaterial, lineMaterial, timer, impactRings }
const AUTO_SHIELD_DISTANCE = 0.15; // シールドが発動する距離（手からの距離）
const AUTO_SHIELD_DURATION = 2.0; // シールド表示時間
const AUTO_SHIELD_RADIUS = 0.1; // 自動シールドの半径
const AUTO_SHIELD_KICKBACK_DISTANCE = 0.05; // キックバック距離
const AUTO_SHIELD_KICKBACK_SPEED = 2; // キックバック速度（戻る速度）
let leftHandPosition = null; // 左手の位置を保存
let rightHandPosition = null; // 右手の位置を保存

// 両手のシールドモード
let isLeftShieldMode = false; // 左手がシールドモードか
let isRightShieldMode = false; // 右手がシールドモードか

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

  // シールドを作成
  createShield(scene);

  // アステロイドエフェクトを作成
  createAsteroid(scene);

  // レプリカモデルを読み込み
  loadReplicaModel();

  // リサイズ対応
  window.addEventListener('resize', onWindowResize);

  // アニメーションループ
  renderer.setAnimationLoop(animate);
}

// ボックスを作成
function createBox() {
  const geometry = new THREE.BoxGeometry(0.15, 0.15, 0.15);
  const material = new THREE.MeshStandardMaterial({
    color: 0x4CAF50,
    metalness: 0.3,
    roughness: 0.7
  });
  box = new THREE.Mesh(geometry, material);
  box.position.set(0, 0, -2);
  scene.add(box);
}

// レプリカモデルを読み込んで配置
function loadReplicaModel() {
  const loader = new GLTFLoader();
  loader.load(
    './repurika.glb',
    (gltf) => {
      replicaModel = gltf.scene;
      replicaModel.visible = false;
      scene.add(replicaModel);
      console.log('レプリカモデルを読み込みました');
    },
    (progress) => {
      console.log('読み込み中:', (progress.loaded / progress.total * 100) + '%');
    },
    (error) => {
      console.error('レプリカモデルの読み込みエラー:', error);
    }
  );
}

// レプリカモデルをカメラの前に配置
function positionReplicaModel() {
  if (!replicaModel || replicaPositioned) return;

  // カメラの位置が安定するまで60フレーム待つ
  replicaWaitFrames++;
  if (replicaWaitFrames < 60) return;

  const cameraPosition = new THREE.Vector3();
  const cameraDirection = new THREE.Vector3();
  camera.getWorldPosition(cameraPosition);
  camera.getWorldDirection(cameraDirection);

  // カメラの高さが0に近い場合はまだ待つ（トラッキングが安定していない）
  if (Math.abs(cameraPosition.y) < 0.1) return;

  // カメラの水平方向5m前に配置（カメラと同じ高さ）
  cameraDirection.y = 0; // 水平方向のみ
  cameraDirection.normalize();
  const targetPosition = cameraPosition.clone().add(cameraDirection.multiplyScalar(5));
  targetPosition.y = cameraPosition.y;

  replicaModel.position.copy(targetPosition);
  // カメラの方を向く
  replicaModel.lookAt(cameraPosition);
  replicaModel.visible = true;
  replicaPositioned = true;

  // 基準位置を保存
  replicaModel.userData.baseY = targetPosition.y;
  replicaBasePosition = targetPosition.clone();
  replicaTargetPosition = targetPosition.clone();

  console.log('レプリカモデルを配置しました:', targetPosition, 'カメラ高さ:', cameraPosition.y);
}

// VRモード用：ランダムな移動先を設定
function setRandomReplicaTarget() {
  if (!replicaBasePosition) return;

  // 5m範囲内のランダムな位置
  const angle = Math.random() * Math.PI * 2;
  const distance = Math.random() * 5;
  replicaTargetPosition = new THREE.Vector3(
    replicaBasePosition.x + Math.cos(angle) * distance,
    replicaBasePosition.y,
    replicaBasePosition.z + Math.sin(angle) * distance
  );
}

// レプリカモデルの浮遊アニメーション
function updateReplicaFloat(deltaTime) {
  if (!replicaModel || !replicaPositioned) return;

  replicaFloatTime += deltaTime;

  // 上下に浮遊（振幅0.1m、周期2秒）
  const floatY = Math.sin(replicaFloatTime * Math.PI) * 0.1;

  // VRモード：ランダム移動と停止
  if (isVRMode && replicaTargetPosition) {
    // 停止中の場合
    if (!replicaIsMoving) {
      replicaStopTimer += deltaTime;
      if (replicaStopTimer >= replicaStopDuration) {
        // 停止終了、次の行動を決定
        replicaStopTimer = 0;
        if (Math.random() < 0.7) {
          // 70%の確率で移動開始
          setRandomReplicaTarget();
          replicaIsMoving = true;
        } else {
          // 30%の確率でまた停止
          replicaStopDuration = 1 + Math.random() * 3;
        }
      }
    } else {
      // 移動中
      const currentPos = new THREE.Vector3(
        replicaModel.position.x,
        replicaModel.userData.baseY,
        replicaModel.position.z
      );
      const direction = new THREE.Vector3().subVectors(replicaTargetPosition, currentPos);
      const distance = direction.length();

      if (distance < 0.1) {
        // 目標に到達したら次の行動を決定
        if (Math.random() < 0.5) {
          // 50%の確率で停止
          replicaIsMoving = false;
          replicaStopTimer = 0;
          replicaStopDuration = 1 + Math.random() * 3;
        } else {
          // 50%の確率ですぐ次の移動先へ
          setRandomReplicaTarget();
        }
      } else {
        // 目標に向かって移動
        direction.normalize();
        const moveDistance = Math.min(replicaMoveSpeed * deltaTime, distance);
        replicaModel.position.x += direction.x * moveDistance;
        replicaModel.position.z += direction.z * moveDistance;

        // 進行方向を向く（滑らかに補間）
        const targetAngle = Math.atan2(direction.x, direction.z);
        let currentAngle = replicaModel.rotation.y;

        // 角度の差を-π〜πの範囲に正規化
        let angleDiff = targetAngle - currentAngle;
        while (angleDiff > Math.PI) angleDiff -= Math.PI * 2;
        while (angleDiff < -Math.PI) angleDiff += Math.PI * 2;

        // 滑らかに補間（1秒で約90度回転）
        const rotationSpeed = 1.5 * deltaTime;
        replicaModel.rotation.y += angleDiff * rotationSpeed;
      }
    }
  }

  // 浮遊（Y座標）
  if (replicaModel.userData.baseY !== undefined) {
    replicaModel.position.y = replicaModel.userData.baseY + floatY;
  }

  // 少し傾きも加える（VRモードでは移動方向に加算）
  replicaModel.rotation.z += Math.sin(replicaFloatTime * Math.PI * 0.5) * 0.001;
  replicaModel.rotation.x += Math.sin(replicaFloatTime * Math.PI * 0.3) * 0.001;
}

// レプリカのアステロイドを作成
function createReplicaAsteroid() {
  if (replicaAsteroidGroup) return;

  replicaAsteroidGroup = new THREE.Group();
  replicaAsteroidGroup.visible = false;
  scene.add(replicaAsteroidGroup);

  // 大キューブを作成
  replicaBigCube = new THREE.Group();

  const geometry = new THREE.BoxGeometry(REPLICA_CUBE_SIZE, REPLICA_CUBE_SIZE, REPLICA_CUBE_SIZE);

  // 面のマテリアル
  replicaBigCubeFaceMaterial = new THREE.MeshBasicMaterial({
    color: REPLICA_TRION_COLOR,
    transparent: true,
    opacity: 0
  });
  const faceMesh = new THREE.Mesh(geometry, replicaBigCubeFaceMaterial);
  replicaBigCube.add(faceMesh);

  // 輪郭線
  const edges = new THREE.EdgesGeometry(geometry);
  replicaBigCubeLineMaterial = new THREE.LineBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0,
    linewidth: 2
  });
  const edgeMesh = new THREE.LineSegments(edges, replicaBigCubeLineMaterial);
  replicaBigCube.add(edgeMesh);

  replicaBigCube.userData.rotAxis = new THREE.Vector3(
    Math.random() - 0.5,
    Math.random() - 0.5,
    Math.random() - 0.5
  ).normalize();

  replicaAsteroidGroup.add(replicaBigCube);
}

// レプリカのアステロイド攻撃を更新
function updateReplicaAsteroid(deltaTime) {
  if (!replicaModel || !replicaPositioned || !isVRMode) return;
  if (!replicaAsteroidGroup) {
    createReplicaAsteroid();
  }

  // 攻撃タイマー
  replicaAttackTimer += deltaTime;

  // アイドル状態：一定間隔でチャージ開始
  if (replicaAsteroidState === 'idle') {
    if (replicaAttackTimer >= replicaAttackInterval) {
      replicaAsteroidState = 'charging';
      replicaChargeProgress = 0;
      replicaAttackTimer = 0;
      replicaAsteroidGroup.visible = true;
      replicaBigCube.scale.set(0, 0, 0);
      replicaBigCubeFaceMaterial.opacity = 0;
      replicaBigCubeLineMaterial.opacity = 0;
      replicaBigCube.visible = true;
    }
  }

  // チャージ中
  if (replicaAsteroidState === 'charging') {
    replicaChargeProgress += 0.02;

    // レプリカの上にキューブを配置
    const abovePos = replicaModel.position.clone();
    abovePos.y += 0.5; // レプリカの0.5m上
    replicaAsteroidGroup.position.copy(abovePos);

    // スケールアップ
    if (replicaChargeProgress < 0.5) {
      const s = replicaChargeProgress / 0.5;
      const ease = s * (2 - s);
      replicaBigCube.scale.set(ease, ease, ease);
      const opacity = Math.min(replicaChargeProgress * 2, 1);
      replicaBigCubeFaceMaterial.opacity = opacity;
      replicaBigCubeLineMaterial.opacity = opacity;
    } else {
      replicaBigCube.scale.set(1, 1, 1);
      replicaBigCubeFaceMaterial.opacity = 1;
      replicaBigCubeLineMaterial.opacity = 1;
    }

    // 回転
    replicaBigCube.rotateOnAxis(replicaBigCube.userData.rotAxis, 0.02);

    // チャージ完了
    if (replicaChargeProgress >= 1) {
      replicaAsteroidState = 'charged';
    }
  }

  // チャージ完了：少し待ってから発射
  if (replicaAsteroidState === 'charged') {
    replicaAttackTimer += deltaTime;

    // レプリカの上に追従
    const abovePos = replicaModel.position.clone();
    abovePos.y += 0.5;
    replicaAsteroidGroup.position.copy(abovePos);

    // 回転継続
    replicaBigCube.rotateOnAxis(replicaBigCube.userData.rotAxis, 0.02);

    if (replicaAttackTimer >= 0.5) {
      // 発射
      replicaAsteroidState = 'firing';
      replicaAttackTimer = 0;
      spawnReplicaBullets();
      replicaBigCube.visible = false;
    }
  }

  // 発射中：弾丸を更新
  if (replicaAsteroidState === 'firing') {
    updateReplicaBullets(deltaTime);
  }
}

// レプリカの弾丸を生成
function spawnReplicaBullets() {
  const smallSize = REPLICA_CUBE_SIZE / 3;
  const firingPos = replicaAsteroidGroup.position.clone();

  // カメラの位置を取得（ターゲット）
  const cameraPos = new THREE.Vector3();
  camera.getWorldPosition(cameraPos);

  for (let x = 0; x < 3; x++) {
    for (let y = 0; y < 3; y++) {
      for (let z = 0; z < 3; z++) {
        const bulletGeometry = new THREE.BoxGeometry(1, 1, 1);

        const faceMaterial = new THREE.MeshBasicMaterial({
          color: REPLICA_TRION_COLOR
        });
        const faceMesh = new THREE.Mesh(bulletGeometry, faceMaterial);

        const edges = new THREE.EdgesGeometry(bulletGeometry);
        const lineMaterial = new THREE.LineBasicMaterial({
          color: 0xffffff,
          linewidth: 2
        });
        const edgeMesh = new THREE.LineSegments(edges, lineMaterial);

        const bulletMesh = new THREE.Group();
        bulletMesh.add(faceMesh);
        bulletMesh.add(edgeMesh);

        // 開始位置（グリッド状）
        const startPos = new THREE.Vector3(
          (x - 1) * smallSize,
          (y - 1) * smallSize,
          (z - 1) * smallSize
        );
        bulletMesh.position.copy(firingPos).add(startPos);
        bulletMesh.scale.set(smallSize, smallSize, smallSize);

        scene.add(bulletMesh);

        // 発射ディレイ
        const index = x * 9 + y * 3 + z;
        const shootDelay = 12 + Math.floor(Math.random() * 108);

        replicaBullets.push({
          mesh: bulletMesh,
          startPos: bulletMesh.position.clone(),
          splitPos: bulletMesh.position.clone().add(startPos.clone().multiplyScalar(0.3)),
          timer: 0,
          shootDelay: shootDelay,
          speed: 0.06,
          fired: false,
          active: true
        });
      }
    }
  }
}

// レプリカの弾丸を更新
function updateReplicaBullets(deltaTime) {
  const cameraPos = new THREE.Vector3();
  camera.getWorldPosition(cameraPos);

  let allDone = true;

  replicaBullets.forEach(bullet => {
    if (!bullet.active) return;
    allDone = false;

    bullet.timer++;

    // 発射前：展開アニメーション
    if (bullet.timer <= bullet.shootDelay) {
      const t = Math.min(bullet.timer / 25, 1);
      bullet.mesh.position.lerpVectors(bullet.startPos, bullet.splitPos, t);
      bullet.mesh.rotation.x += 0.05;
      bullet.mesh.rotation.y += 0.05;
    }
    // 発射
    else if (!bullet.fired) {
      bullet.fired = true;
      // カメラに向かう方向
      const direction = new THREE.Vector3().subVectors(cameraPos, bullet.mesh.position).normalize();

      // 発射方向にランダムなばらつきを追加（±5度程度）
      const spread = 0.08;
      direction.x += (Math.random() - 0.5) * spread;
      direction.y += (Math.random() - 0.5) * spread;
      direction.z += (Math.random() - 0.5) * spread;
      direction.normalize();

      bullet.velocity = direction.multiplyScalar(bullet.speed);

      // 弾丸を細長く（ばらつき後の方向を向く）
      const lookTarget = bullet.mesh.position.clone().add(direction);
      bullet.mesh.lookAt(lookTarget);
      bullet.mesh.scale.set(0.01, 0.01, 0.3);

      replicaFiredBullets.push(bullet);
    }
  });

  // 発射済み弾丸の移動とカメラへのヒット判定
  replicaFiredBullets.forEach(bullet => {
    if (!bullet.active) return;

    bullet.mesh.position.add(bullet.velocity);

    // カメラとの距離をチェック
    const distToCamera = bullet.mesh.position.distanceTo(cameraPos);

    // 固定シールドとの衝突判定（両手シールドモード時）
    if (isFixedShieldActive()) {
      if (checkFixedShieldCollision(bullet.mesh.position)) {
        // 固定シールドに衝撃波を追加
        addFixedShieldImpact(bullet.mesh.position.clone());
        scene.remove(bullet.mesh);
        bullet.active = false;
        console.log('固定シールドで弾丸を防いだ！');
        return;
      }
    }

    // シールド発動中の場合（左手または右手がシールドモード）
    const isShieldActive = (isLeftShieldMode && leftHandPosition) || (isRightShieldMode && rightHandPosition);
    if (isShieldActive && !isFixedShieldActive()) {
      // まず既存のシールドとの衝突をチェック
      const existingShield = checkAutoShieldCollision(bullet.mesh.position);
      if (existingShield) {
        // 既存のシールドに衝撃を追加
        addImpactToShield(existingShield, bullet.mesh.position.clone());
        scene.remove(bullet.mesh);
        bullet.active = false;
        return;
      }

      // 両手の中で最も前に出ている手の距離でシールド発動
      let maxHandDistance = 0;
      if (isLeftShieldMode && leftHandPosition) {
        maxHandDistance = Math.max(maxHandDistance, leftHandPosition.distanceTo(cameraPos));
      }
      if (isRightShieldMode && rightHandPosition) {
        maxHandDistance = Math.max(maxHandDistance, rightHandPosition.distanceTo(cameraPos));
      }

      // シールド発動距離 = 手とカメラの距離 + 少しの余裕
      const shieldActivationDistance = maxHandDistance + 0.1;

      // カメラからの距離がシールド発動距離に近づいたら発動
      if (distToCamera < shieldActivationDistance && distToCamera > 0.3) {
        // 弾丸の位置にシールドを生成（衝撃位置も渡す）
        spawnAutoShield(bullet.mesh.position.clone(), bullet.mesh.position.clone());
        scene.remove(bullet.mesh);
        bullet.active = false;
        return;
      }
    }

    // ヒット判定（シールド距離より近い）
    if (distToCamera < 0.3) {
      // ヒット！
      triggerHitFlash();
      scene.remove(bullet.mesh);
      bullet.active = false;
      return;
    }

    // 一定距離で消滅
    if (bullet.mesh.position.distanceTo(bullet.startPos) > 15) {
      scene.remove(bullet.mesh);
      bullet.active = false;
    }
  });

  // 全弾丸完了
  if (allDone && replicaBullets.length > 0) {
    replicaBullets = replicaBullets.filter(b => b.active);
    replicaFiredBullets = replicaFiredBullets.filter(b => b.active);

    if (replicaBullets.length === 0 && replicaFiredBullets.length === 0) {
      replicaAsteroidState = 'idle';
      replicaAsteroidGroup.visible = false;
      replicaAttackInterval = 3 + Math.random() * 4; // 次の攻撃は3〜7秒後
    }
  }
}

// ヒットオーバーレイを作成
function createHitOverlay() {
  if (hitOverlay) return;

  // カメラの前に赤い半透明の球体を配置（視界全体を覆う）
  const geometry = new THREE.SphereGeometry(0.3, 16, 16);
  const material = new THREE.MeshBasicMaterial({
    color: 0xff0000,
    transparent: true,
    opacity: 0,
    side: THREE.BackSide, // 内側から見る
    depthWrite: false,
    depthTest: false
  });
  hitOverlay = new THREE.Mesh(geometry, material);
  hitOverlay.renderOrder = 999;
  hitOverlay.frustumCulled = false;
  scene.add(hitOverlay);
}

// ヒットフラッシュをトリガー
function triggerHitFlash() {
  hitFlashIntensity = 0.6; // 赤の強さ（0〜1）
  console.log('ヒット！');
}

// ヒットフラッシュを更新
function updateHitFlash(deltaTime) {
  if (!hitOverlay) {
    createHitOverlay();
  }

  // オーバーレイをカメラの位置に追従
  const cameraPos = new THREE.Vector3();
  camera.getWorldPosition(cameraPos);
  hitOverlay.position.copy(cameraPos);

  // フラッシュを徐々に減衰
  if (hitFlashIntensity > 0) {
    hitFlashIntensity -= deltaTime * 2; // 0.5秒で消える
    if (hitFlashIntensity < 0) hitFlashIntensity = 0;
  }

  hitOverlay.material.opacity = hitFlashIntensity;
}

// レプリカにヒットしたときのフラッシュをトリガー
function triggerReplicaHitFlash() {
  replicaHitFlashTimer = 0.3; // 0.3秒間点滅
  console.log('レプリカにヒット！');
}

// レプリカのヒットフラッシュを更新（点滅）
function updateReplicaHitFlash(deltaTime) {
  if (replicaHitFlashTimer > 0) {
    replicaHitFlashTimer -= deltaTime;

    // 点滅（0.03秒ごとに切り替え）
    const blinkPhase = Math.floor(replicaHitFlashTimer / 0.03) % 2;
    if (replicaModel && replicaPositioned) {
      replicaModel.visible = (blinkPhase === 0);
    }

    // 点滅終了後は表示
    if (replicaHitFlashTimer <= 0) {
      if (replicaModel && replicaPositioned) {
        replicaModel.visible = true;
      }
    }
  }
}

// 六角形の内部判定
function isInsideHexagon(localX, localY, radius) {
  // 六角形の頂点は30度回転した状態（CircleGeometryのデフォルト）
  // 六角形の内部判定：各辺までの距離をチェック
  const ax = Math.abs(localX);
  const ay = Math.abs(localY);

  // 六角形の判定式（フラットトップ六角形）
  // 横幅 = radius, 縦幅 = radius * sqrt(3) / 2
  const hexHeight = radius * Math.sqrt(3) / 2;

  // 六角形の3つの条件
  if (ay > hexHeight) return false;
  if (ax > radius) return false;
  // 斜め辺の判定
  if (ax + ay / Math.sqrt(3) > radius) return false;

  return true;
}

// 既存のシールドとの衝突判定（六角形の形状を考慮）
function checkAutoShieldCollision(bulletPosition) {
  for (const shield of autoShields) {
    // 弾丸の位置をシールドのローカル座標に変換
    const localPos = bulletPosition.clone();
    shield.group.worldToLocal(localPos);

    // Z方向（シールドの厚み方向）の距離をチェック
    const zDist = Math.abs(localPos.z);
    if (zDist > 0.1) continue; // シールドの前後0.1mの範囲のみ

    // 六角形の内部判定
    if (isInsideHexagon(localPos.x, localPos.y, AUTO_SHIELD_RADIUS)) {
      return shield;
    }
  }
  return null;
}

// シールドに衝撃を追加
function addImpactToShield(shield, impactWorldPos) {
  // 衝撃位置をシールドのローカル座標に変換
  const localPos = impactWorldPos.clone();
  shield.group.worldToLocal(localPos);

  // 正規化した位置（-1〜1の範囲）
  const normalizedX = localPos.x / AUTO_SHIELD_RADIUS;
  const normalizedY = localPos.y / AUTO_SHIELD_RADIUS;

  // 新しい衝撃を追加
  const impactIndex = shield.impacts.length % 4; // 最大4つの衝撃
  shield.impacts[impactIndex] = {
    x: normalizedX,
    y: normalizedY,
    progress: 0
  };

  // シェーダーのuniformを更新
  shield.faceMaterial.uniforms.impactPoints.value[impactIndex].set(normalizedX, normalizedY);
  shield.faceMaterial.uniforms.impactProgresses.value[impactIndex] = 0;

  // タイマーをリセット（シールドを延長）
  shield.timer = Math.max(shield.timer, AUTO_SHIELD_DURATION);

  // キックバックを追加
  shield.kickbackOffset = AUTO_SHIELD_KICKBACK_DISTANCE;

  console.log('シールドに衝撃追加！');
}

// 自動シールドを生成
function spawnAutoShield(position, impactWorldPos) {
  // 六角形のシールドを作成（シェーダーで衝撃波エフェクト）
  const geometry = new THREE.CircleGeometry(AUTO_SHIELD_RADIUS, 6);

  // 衝撃位置をローカル座標で計算（生成時は中心からのオフセット）
  const cameraPos = new THREE.Vector3();
  camera.getWorldPosition(cameraPos);

  // シールドの向きを計算
  const shieldGroup = new THREE.Group();
  shieldGroup.position.copy(position);
  shieldGroup.lookAt(cameraPos);

  // 衝撃位置をローカル座標に変換
  const localImpact = impactWorldPos.clone();
  shieldGroup.worldToLocal(localImpact);
  const normalizedX = localImpact.x / AUTO_SHIELD_RADIUS;
  const normalizedY = localImpact.y / AUTO_SHIELD_RADIUS;

  // 衝撃波シェーダーマテリアル（複数の衝撃点対応）
  const material = new THREE.ShaderMaterial({
    uniforms: {
      time: { value: 0 },
      impactPoints: { value: [
        new THREE.Vector2(normalizedX, normalizedY),
        new THREE.Vector2(0, 0),
        new THREE.Vector2(0, 0),
        new THREE.Vector2(0, 0)
      ]},
      impactProgresses: { value: [0, -1, -1, -1] }, // -1は無効
      baseColor: { value: new THREE.Color(0x88ffcc) },
      impactColor: { value: new THREE.Color(0xffffff) }
    },
    vertexShader: `
      varying vec2 vUv;
      varying vec2 vPos;
      void main() {
        vUv = uv;
        vPos = position.xy / ${AUTO_SHIELD_RADIUS.toFixed(4)};
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float time;
      uniform vec2 impactPoints[4];
      uniform float impactProgresses[4];
      uniform vec3 baseColor;
      uniform vec3 impactColor;
      varying vec2 vUv;
      varying vec2 vPos;

      void main() {
        // 基本の色
        vec3 color = baseColor;
        float alpha = 0.6;

        // 各衝撃点からの波を計算
        for (int i = 0; i < 4; i++) {
          float progress = impactProgresses[i];
          if (progress < 0.0) continue; // 無効な衝撃点

          vec2 impactPoint = impactPoints[i];
          float distFromImpact = length(vPos - impactPoint);

          float waveWidth = 0.2;

          // 複数の波を生成
          for (int j = 0; j < 3; j++) {
            float delay = float(j) * 0.1;
            float wavePos = progress * 1.5 - delay;
            if (wavePos > 0.0 && wavePos < 2.0) {
              float dist = abs(distFromImpact - wavePos);
              if (dist < waveWidth) {
                float intensity = 1.0 - (dist / waveWidth);
                intensity *= intensity;
                intensity *= max(0.0, 1.0 - wavePos * 0.4);
                color = mix(color, impactColor, intensity * 0.8);
                alpha = max(alpha, 0.6 + intensity * 0.4);
              }
            }
          }

          // 衝撃時の局所的な明るさ
          float flashDist = length(vPos - impactPoint);
          float flashIntensity = max(0.0, 1.0 - progress * 3.0) * max(0.0, 1.0 - flashDist * 2.0);
          color += impactColor * flashIntensity * 0.5;
        }

        gl_FragColor = vec4(color, alpha);
      }
    `,
    transparent: true,
    side: THREE.DoubleSide,
    depthWrite: false,
    blending: THREE.AdditiveBlending
  });

  const shieldMesh = new THREE.Mesh(geometry, material);
  shieldGroup.add(shieldMesh);

  // 輪郭線も追加
  const edgeGeometry = new THREE.BufferGeometry();
  const edgeVertices = [];
  for (let i = 0; i <= 6; i++) {
    const angle = (i / 6) * Math.PI * 2;
    edgeVertices.push(
      Math.cos(angle) * AUTO_SHIELD_RADIUS,
      Math.sin(angle) * AUTO_SHIELD_RADIUS,
      0
    );
  }
  edgeGeometry.setAttribute('position', new THREE.Float32BufferAttribute(edgeVertices, 3));
  const lineMaterial = new THREE.LineBasicMaterial({
    color: 0xccffee,
    transparent: true,
    opacity: 0.9
  });
  const edgeMesh = new THREE.Line(edgeGeometry, lineMaterial);
  shieldGroup.add(edgeMesh);

  scene.add(shieldGroup);

  autoShields.push({
    group: shieldGroup,
    shieldMesh: shieldMesh,
    faceMaterial: material,
    lineMaterial: lineMaterial,
    edgeGeometry: edgeGeometry,
    timer: AUTO_SHIELD_DURATION,
    impacts: [{ x: normalizedX, y: normalizedY, progress: 0 }],
    kickbackOffset: AUTO_SHIELD_KICKBACK_DISTANCE, // 初回の衝撃でキックバック
    originalPosition: position.clone(), // 元の位置を保存
    fadeProgress: 1.0 // フェード用プログレス（1が完全表示、0が消滅）
  });

  console.log('自動シールド発動！');
}

// 自動シールドを更新
function updateAutoShields(deltaTime) {
  const cameraPos = new THREE.Vector3();
  camera.getWorldPosition(cameraPos);

  autoShields.forEach(shield => {
    shield.timer -= deltaTime;

    // 各衝撃点の進行を更新
    if (shield.impacts) {
      for (let i = 0; i < shield.impacts.length; i++) {
        const impact = shield.impacts[i];
        if (impact.progress < 2.0) {
          impact.progress += deltaTime * 2.5;
          shield.faceMaterial.uniforms.impactProgresses.value[i] = impact.progress;
        }
      }
    }

    // キックバックアニメーション
    if (shield.kickbackOffset > 0) {
      // キックバック（カメラから離れる方向に移動）
      const kickbackDirection = new THREE.Vector3()
        .subVectors(shield.originalPosition, cameraPos)
        .normalize();

      // シールドを後ろに移動
      shield.group.position.copy(shield.originalPosition)
        .add(kickbackDirection.multiplyScalar(shield.kickbackOffset));

      // キックバックを徐々に戻す
      shield.kickbackOffset -= deltaTime * AUTO_SHIELD_KICKBACK_SPEED * 0.1;
      if (shield.kickbackOffset < 0) {
        shield.kickbackOffset = 0;
        shield.group.position.copy(shield.originalPosition);
      }
    }

    // フェードアウト効果（残り0.5秒でフェード開始）
    if (shield.timer < 0.5) {
      // ターゲットプログレスを0に
      const targetProgress = 0;
      // スムーズに変化（左手シールドと同じ補間）
      shield.fadeProgress += (targetProgress - shield.fadeProgress) * 0.1;

      // スケール縮小（左手シールドと同じ）
      const scale = shield.fadeProgress;
      shield.shieldMesh.scale.set(scale, scale, 1);

      // オパシティ変化
      shield.faceMaterial.uniforms.baseColor.value.setRGB(
        0.53 * shield.fadeProgress, 1.0 * shield.fadeProgress, 0.8 * shield.fadeProgress
      );
      shield.lineMaterial.opacity = 0.9 * shield.fadeProgress;
    }

    // タイマー終了で削除
    if (shield.timer <= 0 || shield.fadeProgress < 0.01) {
      scene.remove(shield.group);
      shield.faceMaterial.dispose();
      shield.lineMaterial.dispose();
      if (shield.edgeGeometry) {
        shield.edgeGeometry.dispose();
      }
      if (shield.shieldMesh && shield.shieldMesh.geometry) {
        shield.shieldMesh.geometry.dispose();
      }
      shield.timer = 0; // 削除フラグ
    }
  });

  // 削除済みのシールドを配列から除去
  autoShields = autoShields.filter(shield => shield.timer > 0);
}

// 自動シールドをクリーンアップ
function cleanupAutoShields() {
  autoShields.forEach(shield => {
    scene.remove(shield.group);
    shield.faceMaterial.dispose();
    shield.lineMaterial.dispose();
    if (shield.edgeGeometry) {
      shield.edgeGeometry.dispose();
    }
    if (shield.shieldMesh && shield.shieldMesh.geometry) {
      shield.shieldMesh.geometry.dispose();
    }
  });
  autoShields = [];
}

// レプリカモデルを削除
function removeReplicaModel() {
  if (replicaModel) {
    replicaModel.visible = false;
    replicaPositioned = false;
    replicaFloatTime = 0;
    replicaWaitFrames = 0;
    replicaBasePosition = null;
    replicaTargetPosition = null;
    isVRMode = false;
    replicaIsMoving = true;
    replicaStopTimer = 0;
    replicaStopDuration = 0;
  }

  // レプリカのアステロイドをリセット
  if (replicaAsteroidGroup) {
    replicaAsteroidGroup.visible = false;
  }
  replicaAsteroidState = 'idle';
  replicaChargeProgress = 0;
  replicaAttackTimer = 0;

  // 弾丸を削除
  replicaBullets.forEach(b => {
    if (b.mesh) scene.remove(b.mesh);
  });
  replicaFiredBullets.forEach(b => {
    if (b.mesh) scene.remove(b.mesh);
  });
  replicaBullets = [];
  replicaFiredBullets = [];

  // 自動シールドをクリーンアップ
  cleanupAutoShields();
}

// アニメーションループ
function animate(timestamp, frame) {
  const time = timestamp ? timestamp / 1000 : performance.now() / 1000;

  // XRセッション中の処理
  if (frame && xrSession) {
    const referenceSpace = renderer.xr.getReferenceSpace();

    // レプリカモデルの初期配置
    positionReplicaModel();

    // レプリカモデルの浮遊アニメーション
    updateReplicaFloat(1 / 60); // 約60fpsを想定

    // レプリカのアステロイド攻撃
    updateReplicaAsteroid(1 / 60);

    // ヒットフラッシュを更新
    updateHitFlash(1 / 60);

    // レプリカのヒットフラッシュを更新
    updateReplicaHitFlash(1 / 60);

    // 自動シールドを更新
    updateAutoShields(1 / 60);

    // 深度情報を更新
    updateDepthInfo(frame, referenceSpace, timestamp, scene, camera);

    // プレーンメッシュを更新（壁・テーブル検出）
    updatePlaneMeshes(frame, referenceSpace, scene);

    // ボックスを右コントローラーの前に配置
    if (!boxPositioned && box && rightController) {
      const controllerPosition = new THREE.Vector3();
      const controllerQuaternion = new THREE.Quaternion();
      rightController.getWorldPosition(controllerPosition);
      rightController.getWorldQuaternion(controllerQuaternion);

      const forward = new THREE.Vector3(0, 0, -0.3);
      forward.applyQuaternion(controllerQuaternion);

      box.position.set(
        controllerPosition.x + forward.x,
        controllerPosition.y + forward.y,
        controllerPosition.z + forward.z
      );

      if (controllerPosition.lengthSq() > 0) {
        boxPositioned = true;
        console.log('ボックスを右コントローラーの前に配置しました');
      }
    }

    // ボックスをゆっくり回転させる
    if (box) {
      box.rotation.y += 0.01;
      box.rotation.x += 0.005;
    }

    // 左手のハンドトラッキングをチェック
    let leftHand = null;
    const session = renderer.xr.getSession();
    if (session) {
      for (const inputSource of session.inputSources) {
        if (inputSource.hand && inputSource.handedness === 'left') {
          leftHand = inputSource.hand;
          break;
        }
      }
    }

    // 両手を取得
    let rightHand = null;
    const sessionForHands = renderer.xr.getSession();
    if (sessionForHands) {
      for (const inputSource of sessionForHands.inputSources) {
        if (inputSource.hand && inputSource.handedness === 'right') {
          rightHand = inputSource.hand;
        }
      }
    }

    // === 左手の処理 ===
    if (leftHand) {
      const handOpen = isHandOpen(leftHand, frame, referenceSpace);
      const palmForward = isPalmFacingForward(leftHand, frame, referenceSpace, camera, 'left');
      const handTransform = getLeftHandTransform(leftHand, frame, referenceSpace);

      // 左手の位置を保存
      if (handTransform) {
        leftHandPosition = handTransform.position.clone();
      }

      // シールドモード：パー + 手のひらが前向き
      const newLeftShieldMode = handOpen && palmForward;
      // アステロイドモード：パー + 手のひらが前向きでない
      const leftAsteroidMode = handOpen && !palmForward;

      // シールドモード変化
      if (newLeftShieldMode !== isLeftShieldMode) {
        isLeftShieldMode = newLeftShieldMode;
      }

      // 左手の状態変化（パー/グー）
      if (handOpen !== isLeftHandOpen) {
        const wasOpen = isLeftHandOpen;
        isLeftHandOpen = handOpen;

        const leftAsteroidGroup = getAsteroidGroup('left');
        const leftAsteroidState = getAsteroidState('left');

        // パーになった時
        if (handOpen && leftAsteroidMode && leftAsteroidGroup && !leftAsteroidState.isCharging) {
          // アステロイド発動
          leftAsteroidGroup.visible = true;
          castAsteroid('left');
        }
        // グーになった時（発射）
        else if (!handOpen && wasOpen && leftAsteroidGroup && leftAsteroidState.isCharging && !leftAsteroidState.isCancelling) {
          const palmNormal = handTransform ? new THREE.Vector3(0, 1, 0).applyQuaternion(
            new THREE.Quaternion(
              frame.getJointPose(leftHand.get('wrist'), referenceSpace).transform.orientation.x,
              frame.getJointPose(leftHand.get('wrist'), referenceSpace).transform.orientation.y,
              frame.getJointPose(leftHand.get('wrist'), referenceSpace).transform.orientation.z,
              frame.getJointPose(leftHand.get('wrist'), referenceSpace).transform.orientation.w
            )
          ).negate() : null;
          const getTargetPos = () => {
            // replicaPositionedでチェック（点滅中もvisibleはfalseになるため）
            if (replicaModel && replicaPositioned) {
              return replicaModel.position.clone();
            }
            return null;
          };
          const onHitReplica = () => {
            triggerReplicaHitFlash();
          };
          fireAsteroid(palmNormal, getTargetPos, onHitReplica, 'left');
        }
      }

      // シールドの位置を左手に更新（両手シールドモードでないときのみ）
      const leftShieldGroup = getShieldGroup('left');
      if (leftShieldGroup && handTransform && isLeftShieldMode && !isRightShieldMode) {
        leftShieldGroup.position.copy(handTransform.position);
        leftShieldGroup.quaternion.copy(handTransform.quaternion);
      }

      // 左手でアステロイドモードの時、アステロイドの位置を更新
      const leftAsteroidGroup = getAsteroidGroup('left');
      const leftAsteroidState = getAsteroidState('left');
      if (leftAsteroidGroup && handTransform && leftAsteroidMode && (leftAsteroidState.isCharging || leftAsteroidState.isFiring || leftAsteroidState.isCancelling)) {
        // 左手用にアステロイド位置を計算
        const wristPose = frame.getJointPose(leftHand.get('wrist'), referenceSpace);
        const middleTipPose = frame.getJointPose(leftHand.get('middle-finger-tip'), referenceSpace);
        if (wristPose && middleTipPose) {
          const wristPos = new THREE.Vector3(wristPose.transform.position.x, wristPose.transform.position.y, wristPose.transform.position.z);
          const tipPos = new THREE.Vector3(middleTipPose.transform.position.x, middleTipPose.transform.position.y, middleTipPose.transform.position.z);
          const palmCenter = new THREE.Vector3().addVectors(wristPos, tipPos).multiplyScalar(0.5);

          const quaternion = new THREE.Quaternion(
            wristPose.transform.orientation.x,
            wristPose.transform.orientation.y,
            wristPose.transform.orientation.z,
            wristPose.transform.orientation.w
          );
          const palmNormal = new THREE.Vector3(0, 1, 0);
          palmNormal.applyQuaternion(quaternion);
          palmNormal.negate();

          const adjustedNormal = palmNormal.clone();
          adjustedNormal.y += 0.4;
          adjustedNormal.normalize();

          const offset = adjustedNormal.clone().multiplyScalar(0.15);
          const effectPosition = palmCenter.clone().add(offset);

          const effectQuaternion = new THREE.Quaternion();
          const up = new THREE.Vector3(0, 1, 0);
          const lookMatrix = new THREE.Matrix4();
          const lookFrom = effectPosition.clone().add(adjustedNormal);
          lookMatrix.lookAt(lookFrom, effectPosition, up);
          effectQuaternion.setFromRotationMatrix(lookMatrix);

          leftAsteroidGroup.position.copy(effectPosition);
          leftAsteroidGroup.quaternion.copy(effectQuaternion);
        }
      }

      // 左手アステロイドが終了したら非表示
      if (leftAsteroidGroup && !leftAsteroidState.isCharging && !leftAsteroidState.isFiring && !leftAsteroidState.isCancelling && !leftAsteroidMode) {
        leftAsteroidGroup.visible = false;
      }
    } else {
      leftHandPosition = null;
      isLeftShieldMode = false;
    }

    // === 右手の処理 ===
    if (rightHand) {
      const handOpen = isHandOpen(rightHand, frame, referenceSpace);
      const palmForward = isPalmFacingForward(rightHand, frame, referenceSpace, camera, 'right');
      const handTransform = getRightHandTransform(rightHand, frame, referenceSpace);

      // 右手の位置を保存
      if (handTransform) {
        rightHandPosition = handTransform.position.clone();
      }

      // シールドモード：パー + 手のひらが前向き
      const newRightShieldMode = handOpen && palmForward;
      // アステロイドモード：パー + 手のひらが前向きでない
      const rightAsteroidMode = handOpen && !palmForward;

      // シールドモード変化
      if (newRightShieldMode !== isRightShieldMode) {
        isRightShieldMode = newRightShieldMode;
      }

      // 右手の状態変化（パー/グー）
      if (handOpen !== isRightHandOpen) {
        const wasOpen = isRightHandOpen;
        isRightHandOpen = handOpen;

        const rightAsteroidGroup = getAsteroidGroup('right');
        const rightAsteroidState = getAsteroidState('right');

        // パーになった時
        if (handOpen && rightAsteroidMode && rightAsteroidGroup && !rightAsteroidState.isCharging) {
          // アステロイド発動
          rightAsteroidGroup.visible = true;
          castAsteroid('right');
        }
        // グーになった時（発射）
        else if (!handOpen && wasOpen && rightAsteroidGroup && rightAsteroidState.isCharging && !rightAsteroidState.isCancelling) {
          const palmNormal = handTransform ? handTransform.palmNormal : null;
          const getTargetPos = () => {
            // replicaPositionedでチェック（点滅中もvisibleはfalseになるため）
            if (replicaModel && replicaPositioned) {
              return replicaModel.position.clone();
            }
            return null;
          };
          const onHitReplica = () => {
            triggerReplicaHitFlash();
          };
          fireAsteroid(palmNormal, getTargetPos, onHitReplica, 'right');
        }
      }

      // 右手でシールドモードの時、シールドの位置を右手に更新（両手シールドモードでないときのみ）
      const rightShieldGroup = getShieldGroup('right');
      if (rightShieldGroup && isRightShieldMode && !isLeftShieldMode) {
        // 右手用のシールド位置を計算（左手と完全に同じロジック）
        const wristPose = frame.getJointPose(rightHand.get('wrist'), referenceSpace);
        const middleTipPose = frame.getJointPose(rightHand.get('middle-finger-tip'), referenceSpace);
        if (wristPose && middleTipPose) {
          const wristPos = new THREE.Vector3(wristPose.transform.position.x, wristPose.transform.position.y, wristPose.transform.position.z);
          const tipPos = new THREE.Vector3(middleTipPose.transform.position.x, middleTipPose.transform.position.y, middleTipPose.transform.position.z);
          const palmCenter = new THREE.Vector3().addVectors(wristPos, tipPos).multiplyScalar(0.5);

          const quaternion = new THREE.Quaternion(
            wristPose.transform.orientation.x,
            wristPose.transform.orientation.y,
            wristPose.transform.orientation.z,
            wristPose.transform.orientation.w
          );

          // 左手と同じロジック：+Y方向が手の甲側
          const palmNormal = new THREE.Vector3(0, 1, 0);
          palmNormal.applyQuaternion(quaternion);

          // シールドを手のひらの前に配置（手の甲の反対側 = 手のひら側）
          const offset = palmNormal.clone().multiplyScalar(-0.08);
          const shieldPosition = palmCenter.clone().add(offset);

          // 手の指の方向を取得
          const fingerDirection = new THREE.Vector3().subVectors(tipPos, wristPos).normalize();

          // シールドの向きを20度上に傾ける（左手と同じ）
          const tiltAngle = 20 * (Math.PI / 180);
          const adjustedNormal = palmNormal.clone();
          adjustedNormal.y -= Math.sin(tiltAngle);
          adjustedNormal.normalize();

          const shieldQuaternion = new THREE.Quaternion();
          const lookMatrix = new THREE.Matrix4();
          const lookTarget = shieldPosition.clone().add(adjustedNormal);
          lookMatrix.lookAt(shieldPosition, lookTarget, fingerDirection);
          shieldQuaternion.setFromRotationMatrix(lookMatrix);

          rightShieldGroup.position.copy(shieldPosition);
          rightShieldGroup.quaternion.copy(shieldQuaternion);
        }
      }

      // 右手でアステロイドモードの時、アステロイドの位置を更新
      const rightAsteroidGroup = getAsteroidGroup('right');
      const rightAsteroidState = getAsteroidState('right');
      if (rightAsteroidGroup && handTransform && rightAsteroidMode && (rightAsteroidState.isCharging || rightAsteroidState.isFiring || rightAsteroidState.isCancelling)) {
        rightAsteroidGroup.position.copy(handTransform.position);
        rightAsteroidGroup.quaternion.copy(handTransform.quaternion);
      }

      // 右手アステロイドが終了したら非表示
      if (rightAsteroidGroup && !rightAsteroidState.isCharging && !rightAsteroidState.isFiring && !rightAsteroidState.isCancelling && !rightAsteroidMode) {
        rightAsteroidGroup.visible = false;
      }
    } else {
      rightHandPosition = null;
      isRightShieldMode = false;
    }

    // シールドのターゲット状態を更新（左右独立）
    // 左手シールド
    if (isLeftShieldMode && !isRightShieldMode) {
      // 左手のみシールドモード
      setTargetShieldProgress(1, 'left');
      setTargetShieldProgress(0, 'right');
      setTargetFixedShieldProgress(0);
    } else if (isRightShieldMode && !isLeftShieldMode) {
      // 右手のみシールドモード
      setTargetShieldProgress(0, 'left');
      setTargetShieldProgress(1, 'right');
      setTargetFixedShieldProgress(0);
    } else if (isLeftShieldMode && isRightShieldMode) {
      // 両手シールドモード：固定シールドを表示、個別シールドは非表示
      setTargetShieldProgress(0, 'left');
      setTargetShieldProgress(0, 'right');
      setTargetFixedShieldProgress(1);

      // 固定シールドの位置をカメラ位置に設定
      const cameraPos = new THREE.Vector3();
      camera.getWorldPosition(cameraPos);
      setFixedShieldPosition(cameraPos);
    } else {
      // どちらもシールドモードでない
      setTargetShieldProgress(0, 'left');
      setTargetShieldProgress(0, 'right');
      setTargetFixedShieldProgress(0);
    }
  }

  // シールドのアニメーションを更新
  const leftAsteroidState = getAsteroidState('left');
  const rightAsteroidState = getAsteroidState('right');
  updateShield(time, leftAsteroidState.isFiring || rightAsteroidState.isFiring);

  // アステロイドのアニメーションを更新
  updateAsteroid(time, camera);

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

    const supported = await navigator.xr.isSessionSupported('immersive-ar');

    if (!supported) {
      updateInfo('immersive-ARがサポートされていません');
      alert('このデバイスはAR機能をサポートしていません');
      return;
    }

    xrSession = await navigator.xr.requestSession('immersive-ar', {
      requiredFeatures: [],
      optionalFeatures: ['local-floor', 'bounded-floor', 'depth-sensing', 'plane-detection', 'hand-tracking'],
      depthSensing: {
        usagePreference: ['gpu-optimized', 'cpu-optimized'],
        dataFormatPreference: ['luminance-alpha', 'float32']
      }
    });

    await renderer.xr.setSession(xrSession);

    rightController = renderer.xr.getController(0);
    leftController = renderer.xr.getController(1);
    scene.add(rightController);
    scene.add(leftController);

    hand1 = renderer.xr.getHand(0);
    hand2 = renderer.xr.getHand(1);
    scene.add(hand1);
    scene.add(hand2);

    boxPositioned = false;

    const button = document.getElementById('start-button');
    if (button) {
      button.style.display = 'none';
    }
    const vrButton = document.getElementById('vr-button');
    if (vrButton) {
      vrButton.style.display = 'none';
    }

    window.dispatchEvent(new Event('xr-session-start'));

    updateInfo('MRセッション開始');

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

      cleanupDepth(scene);
      removeReplicaModel();

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

    const supported = await navigator.xr.isSessionSupported('immersive-vr');

    if (!supported) {
      updateInfo('immersive-VRがサポートされていません');
      alert('このデバイスはVR機能をサポートしていません');
      return;
    }

    xrSession = await navigator.xr.requestSession('immersive-vr', {
      requiredFeatures: [],
      optionalFeatures: ['local-floor', 'bounded-floor', 'hand-tracking']
    });

    await renderer.xr.setSession(xrSession);

    createVREnvironment(scene);
    isVRMode = true;

    rightController = renderer.xr.getController(0);
    leftController = renderer.xr.getController(1);
    scene.add(rightController);
    scene.add(leftController);

    hand1 = renderer.xr.getHand(0);
    hand2 = renderer.xr.getHand(1);
    scene.add(hand1);
    scene.add(hand2);

    // ハンドモデルを作成（VRモード用）
    handModelFactory = new XRHandModelFactory();
    handModel1 = handModelFactory.createHandModel(hand1, 'mesh');
    handModel2 = handModelFactory.createHandModel(hand2, 'mesh');
    hand1.add(handModel1);
    hand2.add(handModel2);

    boxPositioned = false;

    const button = document.getElementById('start-button');
    if (button) {
      button.style.display = 'none';
    }
    const vrButton = document.getElementById('vr-button');
    if (vrButton) {
      vrButton.style.display = 'none';
    }

    window.dispatchEvent(new Event('xr-session-start'));

    updateInfo('VRセッション開始');

    xrSession.addEventListener('end', () => {
      xrSession = null;

      removeVREnvironment(scene);
      removeReplicaModel();

      // ハンドモデルをクリーンアップ
      if (handModel1) {
        hand1.remove(handModel1);
        handModel1 = null;
      }
      if (handModel2) {
        hand2.remove(handModel2);
        handModel2 = null;
      }
      handModelFactory = null;

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
    const showDepth = toggleDepthVisualization();
    depthToggleButton.textContent = showDepth ? '深度表示 ON' : '深度表示 OFF';
    console.log('深度表示:', showDepth);
  });

  window.addEventListener('xr-session-start', () => {
    depthToggleButton.style.display = 'block';
  });

  window.addEventListener('xr-session-end', () => {
    depthToggleButton.style.display = 'none';
    setShowDepthVisualization(false);
    depthToggleButton.textContent = '深度表示 OFF';
  });
}
