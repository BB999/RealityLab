import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import {
  getAudioLoader,
  isAudioInitialized,
  playPositionalSound
} from './audio-manager.js';

// オーディオ関連
let playerHitBuffer = null;  // プレイヤーヒット音バッファ
let replicaHitBuffer = null; // レプリカヒット音バッファ
let spawnBuffer = null;      // 展開音バッファ
let splitBuffer = null;      // 分割音バッファ
let fireBuffer = null;       // 発射音バッファ
let audioLoaded = false;

// オーディオを初期化
export function initReplicaAudio() {
  if (audioLoaded || !isAudioInitialized()) return;

  const audioLoader = getAudioLoader();
  if (!audioLoader) return;

  // プレイヤーヒット音をロード
  audioLoader.load('/playerhit.mp3', (buffer) => {
    playerHitBuffer = buffer;
    console.log('プレイヤーヒット音をロード完了');
  }, undefined, (err) => {
    console.error('プレイヤーヒット音のロードエラー:', err);
  });

  // レプリカヒット音をロード
  audioLoader.load('/tekihit.mp3', (buffer) => {
    replicaHitBuffer = buffer;
    console.log('レプリカヒット音をロード完了');
  }, undefined, (err) => {
    console.error('レプリカヒット音のロードエラー:', err);
  });

  // 展開音をロード
  audioLoader.load('/%E5%B1%95%E9%96%8B1.mp3', (buffer) => {
    spawnBuffer = buffer;
    console.log('レプリカ展開音をロード完了');
  }, undefined, (err) => {
    console.error('レプリカ展開音のロードエラー:', err);
  });

  // 分割音をロード
  audioLoader.load('/%E5%88%86%E5%89%B22.mp3', (buffer) => {
    splitBuffer = buffer;
    console.log('レプリカ分割音をロード完了');
  }, undefined, (err) => {
    console.error('レプリカ分割音のロードエラー:', err);
  });

  // 発射音をロード
  audioLoader.load('/%E7%99%BA%E5%B0%843.mp3', (buffer) => {
    fireBuffer = buffer;
    console.log('レプリカ発射音をロード完了');
  }, undefined, (err) => {
    console.error('レプリカ発射音のロードエラー:', err);
  });

  audioLoaded = true;
}

// プレイヤーヒット音を再生
function playPlayerHitSound(position) {
  playPositionalSound(playerHitBuffer, position, 0.2);
}

// レプリカヒット音を再生
function playReplicaHitSound(position) {
  playPositionalSound(replicaHitBuffer, position, 0.8);
}

// レプリカモデル
let replicaModel = null;
let replicaPositioned = false;
let replicaFloatTime = 0;
let replicaWaitFrames = 0;
let replicaBasePosition = null;
let replicaTargetPosition = null;
let replicaMoveSpeed = 0.5;
let replicaIsMoving = true;
let replicaStopTimer = 0;
let replicaStopDuration = 0;

// レプリカのアステロイド攻撃
let replicaAsteroidGroup = null;
let replicaBigCube = null;
let replicaBigCubeFaceMaterial = null;
let replicaBigCubeLineMaterial = null;
let replicaAsteroidState = 'idle';
let replicaChargeProgress = 0;
let replicaAttackTimer = 0;
let replicaAttackInterval = 5;
let replicaBullets = [];
let replicaFiredBullets = [];
let replicaFireSoundCount = 0;  // 発射音カウント
const REPLICA_CUBE_SIZE = 0.15;
const REPLICA_TRION_COLOR = 0x88ffcc;

// レプリカのヒットエフェクト用
let replicaHitFlashTimer = 0;
let hitParticles = [];

// レプリカのHP
let replicaHP = 100;
const REPLICA_MAX_HP = 100;
let hpBarGroup = null;
let hpBarFill = null;
let hpText = null;

// 爆発・落下・ゲーム終了用
let isReplicaDefeated = false;
let explosionParticles = [];
let replicaVelocityY = 0;
let replicaOnGround = false;
let bounceCount = 0;
const GRAVITY = -9.8;
const BOUNCE_DAMPING = 0.4;
const MAX_BOUNCES = 3;
const GROUND_Y = 0;

// ゲーム終了UI
let gameEndUIGroup = null;
let returnButtonMesh = null;
let buttonHovered = false;
let buttonNormalTexture = null;
let buttonHoverTexture = null;

// 外部参照
let sceneRef = null;
let cameraRef = null;
let isVRModeRef = false;

// コールバック
let onHitCallback = null;
let checkShieldCollisionCallback = null;
let spawnAutoShieldCallback = null;
let onGameEndCallback = null;

// 初期化
export function initReplica(scene, camera, callbacks = {}) {
  sceneRef = scene;
  cameraRef = camera;
  onHitCallback = callbacks.onHit || null;
  checkShieldCollisionCallback = callbacks.checkShieldCollision || null;
  spawnAutoShieldCallback = callbacks.spawnAutoShield || null;
  onGameEndCallback = callbacks.onGameEnd || null;
}

// VRモード設定
export function setReplicaVRMode(isVR) {
  isVRModeRef = isVR;
}


// レプリカモデルを読み込んで配置
export function loadReplicaModel() {
  const loader = new GLTFLoader();
  loader.load(
    './repurika.glb',
    (gltf) => {
      replicaModel = gltf.scene;
      replicaModel.visible = false;
      sceneRef.add(replicaModel);
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
export function positionReplicaModel() {
  if (!replicaModel || replicaPositioned) return;

  replicaWaitFrames++;
  if (replicaWaitFrames < 60) return;

  const cameraPosition = new THREE.Vector3();
  const cameraDirection = new THREE.Vector3();
  cameraRef.getWorldPosition(cameraPosition);
  cameraRef.getWorldDirection(cameraDirection);

  if (Math.abs(cameraPosition.y) < 0.1) return;

  cameraDirection.y = 0;
  cameraDirection.normalize();
  const targetPosition = cameraPosition.clone().add(cameraDirection.multiplyScalar(5));
  targetPosition.y = cameraPosition.y;

  replicaModel.position.copy(targetPosition);
  replicaModel.lookAt(cameraPosition);
  replicaModel.visible = true;
  replicaPositioned = true;

  replicaModel.userData.baseY = targetPosition.y;
  replicaBasePosition = targetPosition.clone();
  replicaTargetPosition = targetPosition.clone();

  console.log('レプリカモデルを配置しました:', targetPosition, 'カメラ高さ:', cameraPosition.y);

  // HPバーを作成
  createHPBar();
}

// HPバーを作成
function createHPBar() {
  if (hpBarGroup) return;

  hpBarGroup = new THREE.Group();

  // HPテキスト（スプライト）
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 48px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('HP', 64, 32);

  const texture = new THREE.CanvasTexture(canvas);
  const spriteMaterial = new THREE.SpriteMaterial({
    map: texture,
    transparent: true
  });
  hpText = new THREE.Sprite(spriteMaterial);
  hpText.scale.set(0.3, 0.15, 1);
  hpText.position.set(0, 0.15, 0);
  hpBarGroup.add(hpText);

  // HPバー背景
  const bgGeometry = new THREE.PlaneGeometry(0.5, 0.08);
  const bgMaterial = new THREE.MeshBasicMaterial({
    color: 0x333333,
    transparent: true,
    opacity: 0.8,
    side: THREE.DoubleSide
  });
  const bgMesh = new THREE.Mesh(bgGeometry, bgMaterial);
  hpBarGroup.add(bgMesh);

  // HPバー本体（緑）
  const fillGeometry = new THREE.PlaneGeometry(0.48, 0.06);
  const fillMaterial = new THREE.MeshBasicMaterial({
    color: 0x00ff00,
    transparent: true,
    opacity: 0.9,
    side: THREE.DoubleSide
  });
  hpBarFill = new THREE.Mesh(fillGeometry, fillMaterial);
  hpBarFill.position.z = 0.001;
  hpBarGroup.add(hpBarFill);

  sceneRef.add(hpBarGroup);
}

// HPバーを更新
function updateHPBar() {
  if (!hpBarGroup || !replicaModel || !replicaPositioned) return;

  // レプリカの上に配置
  const replicaPos = replicaModel.position.clone();
  replicaPos.y += 0.8;
  hpBarGroup.position.copy(replicaPos);

  // カメラの方を向く
  const cameraPos = new THREE.Vector3();
  cameraRef.getWorldPosition(cameraPos);
  hpBarGroup.lookAt(cameraPos);

  // HP割合に応じてバーを縮小
  const hpRatio = replicaHP / REPLICA_MAX_HP;
  hpBarFill.scale.x = hpRatio;
  hpBarFill.position.x = -0.24 * (1 - hpRatio);

  // HPに応じて色を変更
  if (hpRatio > 0.5) {
    hpBarFill.material.color.setHex(0x00ff00); // 緑
  } else if (hpRatio > 0.25) {
    hpBarFill.material.color.setHex(0xffff00); // 黄
  } else {
    hpBarFill.material.color.setHex(0xff0000); // 赤
  }
}

// ランダムな移動先を設定
function setRandomReplicaTarget() {
  if (!replicaBasePosition) return;

  const angle = Math.random() * Math.PI * 2;
  const distance = Math.random() * 5;
  replicaTargetPosition = new THREE.Vector3(
    replicaBasePosition.x + Math.cos(angle) * distance,
    replicaBasePosition.y,
    replicaBasePosition.z + Math.sin(angle) * distance
  );
}

// レプリカモデルの浮遊アニメーション
export function updateReplicaFloat(deltaTime) {
  if (!replicaModel || !replicaPositioned) return;

  replicaFloatTime += deltaTime;

  const floatY = Math.sin(replicaFloatTime * Math.PI) * 0.1;

  if (isVRModeRef && replicaTargetPosition) {
    if (!replicaIsMoving) {
      replicaStopTimer += deltaTime;
      if (replicaStopTimer >= replicaStopDuration) {
        replicaStopTimer = 0;
        if (Math.random() < 0.7) {
          setRandomReplicaTarget();
          replicaIsMoving = true;
        } else {
          replicaStopDuration = 1 + Math.random() * 3;
        }
      }
    } else {
      const currentPos = new THREE.Vector3(
        replicaModel.position.x,
        replicaModel.userData.baseY,
        replicaModel.position.z
      );
      const direction = new THREE.Vector3().subVectors(replicaTargetPosition, currentPos);
      const distance = direction.length();

      if (distance < 0.1) {
        if (Math.random() < 0.5) {
          replicaIsMoving = false;
          replicaStopTimer = 0;
          replicaStopDuration = 1 + Math.random() * 3;
        } else {
          setRandomReplicaTarget();
        }
      } else {
        direction.normalize();
        const moveDistance = Math.min(replicaMoveSpeed * deltaTime, distance);
        replicaModel.position.x += direction.x * moveDistance;
        replicaModel.position.z += direction.z * moveDistance;

        const targetAngle = Math.atan2(direction.x, direction.z);
        let currentAngle = replicaModel.rotation.y;

        let angleDiff = targetAngle - currentAngle;
        while (angleDiff > Math.PI) angleDiff -= Math.PI * 2;
        while (angleDiff < -Math.PI) angleDiff += Math.PI * 2;

        const rotationSpeed = 1.5 * deltaTime;
        replicaModel.rotation.y += angleDiff * rotationSpeed;
      }
    }
  }

  if (replicaModel.userData.baseY !== undefined) {
    replicaModel.position.y = replicaModel.userData.baseY + floatY;
  }

  replicaModel.rotation.z += Math.sin(replicaFloatTime * Math.PI * 0.5) * 0.001;
  replicaModel.rotation.x += Math.sin(replicaFloatTime * Math.PI * 0.3) * 0.001;

  // HPバーを更新
  updateHPBar();
}

// レプリカのアステロイドを作成
function createReplicaAsteroid() {
  if (replicaAsteroidGroup) return;

  replicaAsteroidGroup = new THREE.Group();
  replicaAsteroidGroup.visible = false;
  sceneRef.add(replicaAsteroidGroup);

  replicaBigCube = new THREE.Group();

  const geometry = new THREE.BoxGeometry(REPLICA_CUBE_SIZE, REPLICA_CUBE_SIZE, REPLICA_CUBE_SIZE);

  replicaBigCubeFaceMaterial = new THREE.MeshBasicMaterial({
    color: REPLICA_TRION_COLOR,
    transparent: true,
    opacity: 0
  });
  const faceMesh = new THREE.Mesh(geometry, replicaBigCubeFaceMaterial);
  replicaBigCube.add(faceMesh);

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
export function updateReplicaAsteroid(deltaTime, shieldState = {}) {
  if (!replicaModel || !replicaPositioned || !isVRModeRef) return;
  if (isReplicaDefeated) return; // 撃破済みなら攻撃しない
  if (!replicaAsteroidGroup) {
    createReplicaAsteroid();
  }

  replicaAttackTimer += deltaTime;

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

      // 展開音を再生
      if (spawnBuffer) {
        const abovePos = replicaModel.position.clone();
        abovePos.y += 0.5;
        playPositionalSound(spawnBuffer, abovePos, 0.8);
      }
    }
  }

  if (replicaAsteroidState === 'charging') {
    replicaChargeProgress += 0.02;

    const abovePos = replicaModel.position.clone();
    abovePos.y += 0.5;
    replicaAsteroidGroup.position.copy(abovePos);

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

    replicaBigCube.rotateOnAxis(replicaBigCube.userData.rotAxis, 0.02);

    if (replicaChargeProgress >= 1) {
      replicaAsteroidState = 'charged';
    }
  }

  if (replicaAsteroidState === 'charged') {
    replicaAttackTimer += deltaTime;

    const abovePos = replicaModel.position.clone();
    abovePos.y += 0.5;
    replicaAsteroidGroup.position.copy(abovePos);

    replicaBigCube.rotateOnAxis(replicaBigCube.userData.rotAxis, 0.02);

    if (replicaAttackTimer >= 0.5) {
      replicaAsteroidState = 'firing';
      replicaAttackTimer = 0;
      spawnReplicaBullets();
      replicaBigCube.visible = false;
    }
  }

  if (replicaAsteroidState === 'firing') {
    updateReplicaBullets(deltaTime, shieldState);
  }
}

// レプリカの弾丸を生成
function spawnReplicaBullets() {
  const smallSize = REPLICA_CUBE_SIZE / 3;
  const firingPos = replicaAsteroidGroup.position.clone();

  // 分割音を再生
  if (splitBuffer) {
    playPositionalSound(splitBuffer, firingPos, 1.2);
  }

  const cameraPos = new THREE.Vector3();
  cameraRef.getWorldPosition(cameraPos);

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

        const startPos = new THREE.Vector3(
          (x - 1) * smallSize,
          (y - 1) * smallSize,
          (z - 1) * smallSize
        );
        bulletMesh.position.copy(firingPos).add(startPos);
        bulletMesh.scale.set(smallSize, smallSize, smallSize);

        sceneRef.add(bulletMesh);

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
function updateReplicaBullets(deltaTime, shieldState) {
  const cameraPos = new THREE.Vector3();
  cameraRef.getWorldPosition(cameraPos);

  let allDone = true;

  replicaBullets.forEach(bullet => {
    if (!bullet.active) return;
    allDone = false;

    bullet.timer++;

    if (bullet.timer <= bullet.shootDelay) {
      const t = Math.min(bullet.timer / 25, 1);
      bullet.mesh.position.lerpVectors(bullet.startPos, bullet.splitPos, t);
      bullet.mesh.rotation.x += 0.05;
      bullet.mesh.rotation.y += 0.05;
    }
    else if (!bullet.fired) {
      bullet.fired = true;

      // 発射音を再生（5個おきに再生、アステロイドの発射位置から音を出す）
      if (fireBuffer) {
        replicaFireSoundCount++;
        if (replicaFireSoundCount % 5 === 1) {
          playPositionalSound(fireBuffer, replicaAsteroidGroup.position.clone(), 0.6);
        }
      }

      const direction = new THREE.Vector3().subVectors(cameraPos, bullet.mesh.position).normalize();

      const spread = 0.08;
      direction.x += (Math.random() - 0.5) * spread;
      direction.y += (Math.random() - 0.5) * spread;
      direction.z += (Math.random() - 0.5) * spread;
      direction.normalize();

      bullet.velocity = direction.multiplyScalar(bullet.speed);

      const lookTarget = bullet.mesh.position.clone().add(direction);
      bullet.mesh.lookAt(lookTarget);
      bullet.mesh.scale.set(0.01, 0.01, 0.3);

      replicaFiredBullets.push(bullet);
    }
  });

  // 発射済み弾丸の移動とヒット判定
  replicaFiredBullets.forEach(bullet => {
    if (!bullet.active) return;

    bullet.mesh.position.add(bullet.velocity);

    const distToCamera = bullet.mesh.position.distanceTo(cameraPos);

    // 固定シールドとの衝突判定
    if (shieldState.isFixedShieldActive && shieldState.checkFixedShieldCollision) {
      if (shieldState.checkFixedShieldCollision(bullet.mesh.position)) {
        if (shieldState.addFixedShieldImpact) {
          shieldState.addFixedShieldImpact(bullet.mesh.position.clone());
        }
        sceneRef.remove(bullet.mesh);
        bullet.active = false;
        console.log('固定シールドで弾丸を防いだ！');
        return;
      }
    }

    // 自動シールドとの衝突判定
    const isShieldActive = shieldState.isLeftShieldMode || shieldState.isRightShieldMode;
    if (isShieldActive && !shieldState.isFixedShieldActive) {
      if (checkShieldCollisionCallback) {
        const existingShield = checkShieldCollisionCallback(bullet.mesh.position);
        if (existingShield) {
          sceneRef.remove(bullet.mesh);
          bullet.active = false;
          return;
        }
      }

      let maxHandDistance = 0;
      if (shieldState.isLeftShieldMode && shieldState.leftHandPosition) {
        maxHandDistance = Math.max(maxHandDistance, shieldState.leftHandPosition.distanceTo(cameraPos));
      }
      if (shieldState.isRightShieldMode && shieldState.rightHandPosition) {
        maxHandDistance = Math.max(maxHandDistance, shieldState.rightHandPosition.distanceTo(cameraPos));
      }

      const shieldActivationDistance = maxHandDistance + 0.1;

      if (distToCamera < shieldActivationDistance && distToCamera > 0.3) {
        if (spawnAutoShieldCallback) {
          spawnAutoShieldCallback(bullet.mesh.position.clone(), bullet.mesh.position.clone());
        }
        sceneRef.remove(bullet.mesh);
        bullet.active = false;
        return;
      }
    }

    // ヒット判定
    if (distToCamera < 0.3) {
      // プレイヤーヒット音を再生
      playPlayerHitSound(bullet.mesh.position.clone());
      if (onHitCallback) {
        onHitCallback();
      }
      sceneRef.remove(bullet.mesh);
      bullet.active = false;
      return;
    }

    // 一定距離で消滅
    if (bullet.mesh.position.distanceTo(bullet.startPos) > 15) {
      sceneRef.remove(bullet.mesh);
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
      replicaAttackInterval = 3 + Math.random() * 4;
      replicaFireSoundCount = 0;  // 発射音カウントをリセット
    }
  }
}

// ヒットパーティクルを生成
function spawnHitParticles(position) {
  const particleCount = 12;

  for (let i = 0; i < particleCount; i++) {
    const geometry = new THREE.BoxGeometry(0.02, 0.02, 0.02);
    const material = new THREE.MeshBasicMaterial({
      color: REPLICA_TRION_COLOR,
      transparent: true,
      opacity: 1.0
    });
    const particle = new THREE.Mesh(geometry, material);
    particle.position.copy(position);

    // ランダムな方向に飛び散る
    const velocity = new THREE.Vector3(
      (Math.random() - 0.5) * 0.08,
      (Math.random() - 0.5) * 0.08,
      (Math.random() - 0.5) * 0.08
    );

    sceneRef.add(particle);

    hitParticles.push({
      mesh: particle,
      velocity: velocity,
      life: 0.5,
      maxLife: 0.5
    });
  }
}

// ヒットパーティクルを更新
export function updateHitParticles(deltaTime) {
  hitParticles.forEach(particle => {
    if (particle.life <= 0) return;

    particle.life -= deltaTime;

    // 移動
    particle.mesh.position.add(particle.velocity);

    // 減速
    particle.velocity.multiplyScalar(0.95);

    // フェードアウト
    const lifeRatio = particle.life / particle.maxLife;
    particle.mesh.material.opacity = lifeRatio;

    // スケールダウン
    const scale = lifeRatio * 0.8 + 0.2;
    particle.mesh.scale.set(scale, scale, scale);

    // 回転
    particle.mesh.rotation.x += 0.1;
    particle.mesh.rotation.y += 0.1;

    // 寿命が尽きたら削除
    if (particle.life <= 0) {
      sceneRef.remove(particle.mesh);
      particle.mesh.geometry.dispose();
      particle.mesh.material.dispose();
    }
  });

  // 死んだパーティクルを除去
  hitParticles = hitParticles.filter(p => p.life > 0);
}

// レプリカにヒットしたときのフラッシュをトリガー
export function triggerReplicaHitFlash(damage = 1, hitPosition = null) {
  if (isReplicaDefeated) return; // 撃破済みなら何もしない

  replicaHitFlashTimer = 0.3;
  // HPを減らす
  replicaHP = Math.max(0, replicaHP - damage);
  // レプリカヒット音を再生
  if (replicaModel && replicaPositioned) {
    playReplicaHitSound(replicaModel.position.clone());
    // ヒットパーティクルを生成
    const particlePos = hitPosition || replicaModel.position.clone();
    spawnHitParticles(particlePos);
  }
  console.log('レプリカにヒット！ HP:', replicaHP);

  // HP0で撃破
  if (replicaHP <= 0) {
    triggerReplicaDefeat();
  }
}

// レプリカのヒットフラッシュを更新
export function updateReplicaHitFlash(deltaTime) {
  if (replicaHitFlashTimer > 0) {
    replicaHitFlashTimer -= deltaTime;

    const blinkPhase = Math.floor(replicaHitFlashTimer / 0.03) % 2;
    if (replicaModel && replicaPositioned) {
      replicaModel.visible = (blinkPhase === 0);
    }

    if (replicaHitFlashTimer <= 0) {
      if (replicaModel && replicaPositioned) {
        replicaModel.visible = true;
      }
    }
  }
}

// レプリカモデルを削除
export function removeReplicaModel() {
  if (replicaModel) {
    replicaModel.visible = false;
    replicaPositioned = false;
    replicaFloatTime = 0;
    replicaWaitFrames = 0;
    replicaBasePosition = null;
    replicaTargetPosition = null;
    replicaIsMoving = true;
    replicaStopTimer = 0;
    replicaStopDuration = 0;
  }

  // HPバーを削除
  if (hpBarGroup) {
    sceneRef.remove(hpBarGroup);
    hpBarGroup = null;
    hpBarFill = null;
    hpText = null;
  }
  replicaHP = REPLICA_MAX_HP;  // HPをリセット

  if (replicaAsteroidGroup) {
    replicaAsteroidGroup.visible = false;
  }
  replicaAsteroidState = 'idle';
  replicaChargeProgress = 0;
  replicaAttackTimer = 0;

  replicaBullets.forEach(b => {
    if (b.mesh) sceneRef.remove(b.mesh);
  });
  replicaFiredBullets.forEach(b => {
    if (b.mesh) sceneRef.remove(b.mesh);
  });
  replicaBullets = [];
  replicaFiredBullets = [];
}

// レプリカの状態取得
export function getReplicaModel() {
  return replicaModel;
}

export function isReplicaPositioned() {
  return replicaPositioned;
}

export function getReplicaPosition() {
  if (replicaModel && replicaPositioned) {
    return replicaModel.position.clone();
  }
  return null;
}

// レプリカのHP取得
export function getReplicaHP() {
  return replicaHP;
}

export function getReplicaMaxHP() {
  return REPLICA_MAX_HP;
}

// レプリカ撃破状態を取得
export function isReplicaDefeatedState() {
  return isReplicaDefeated;
}

// 大爆発エフェクトを生成
function spawnExplosion(position) {
  const particleCount = 50;

  for (let i = 0; i < particleCount; i++) {
    const size = 0.03 + Math.random() * 0.05;
    const geometry = new THREE.BoxGeometry(size, size, size);
    const material = new THREE.MeshBasicMaterial({
      color: REPLICA_TRION_COLOR,
      transparent: true,
      opacity: 1.0
    });
    const particle = new THREE.Mesh(geometry, material);
    particle.position.copy(position);

    // 全方向にランダムに飛び散る
    const speed = 0.1 + Math.random() * 0.2;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.random() * Math.PI;
    const velocity = new THREE.Vector3(
      Math.sin(phi) * Math.cos(theta) * speed,
      Math.sin(phi) * Math.sin(theta) * speed,
      Math.cos(phi) * speed
    );

    sceneRef.add(particle);

    explosionParticles.push({
      mesh: particle,
      velocity: velocity,
      life: 1.5 + Math.random() * 0.5,
      maxLife: 2.0
    });
  }
}

// 爆発パーティクルを更新
export function updateExplosionParticles(deltaTime) {
  explosionParticles.forEach(particle => {
    if (particle.life <= 0) return;

    particle.life -= deltaTime;

    // 移動
    particle.mesh.position.add(particle.velocity);

    // 重力
    particle.velocity.y -= 0.5 * deltaTime;

    // 減速
    particle.velocity.multiplyScalar(0.98);

    // フェードアウト
    const lifeRatio = particle.life / particle.maxLife;
    particle.mesh.material.opacity = lifeRatio;

    // 回転
    particle.mesh.rotation.x += 0.1;
    particle.mesh.rotation.y += 0.1;

    // 寿命が尽きたら削除
    if (particle.life <= 0) {
      sceneRef.remove(particle.mesh);
      particle.mesh.geometry.dispose();
      particle.mesh.material.dispose();
    }
  });

  // 死んだパーティクルを除去
  explosionParticles = explosionParticles.filter(p => p.life > 0);
}

// レプリカの落下を更新
export function updateReplicaFall(deltaTime) {
  if (!isReplicaDefeated || !replicaModel || replicaOnGround) return;

  // 重力を適用
  replicaVelocityY += GRAVITY * deltaTime;
  replicaModel.position.y += replicaVelocityY * deltaTime;

  // 回転しながら落下
  replicaModel.rotation.x += deltaTime * 2;
  replicaModel.rotation.z += deltaTime * 1.5;

  // 地面に到達
  if (replicaModel.position.y <= GROUND_Y) {
    replicaModel.position.y = GROUND_Y;

    // 完全に停止（バウンドなし）
    replicaOnGround = true;
    replicaVelocityY = 0;
    console.log('レプリカが地面に落下しました');

    // ゲーム終了UIを表示
    createGameEndUI();
  }
}

// ゲーム終了UIを作成
function createGameEndUI() {
  if (gameEndUIGroup) return;

  gameEndUIGroup = new THREE.Group();

  // カメラの前に配置（近くに）
  const cameraPos = new THREE.Vector3();
  const cameraDir = new THREE.Vector3();
  cameraRef.getWorldPosition(cameraPos);
  cameraRef.getWorldDirection(cameraDir);

  const uiDistance = 0.8;
  const uiPosition = cameraPos.clone().add(cameraDir.multiplyScalar(uiDistance));
  uiPosition.y = cameraPos.y;

  gameEndUIGroup.position.copy(uiPosition);
  gameEndUIGroup.lookAt(cameraPos);

  // 「戦闘訓練終了」のテキスト
  const titleCanvas = document.createElement('canvas');
  titleCanvas.width = 512;
  titleCanvas.height = 128;
  const titleCtx = titleCanvas.getContext('2d');

  // 背景をクリア（透明）
  titleCtx.clearRect(0, 0, titleCanvas.width, titleCanvas.height);

  // テキストスタイル（メインページと同じデザイン）
  titleCtx.font = 'bold 64px "Noto Sans JP", sans-serif';
  titleCtx.textAlign = 'center';
  titleCtx.textBaseline = 'middle';

  // グロー効果
  titleCtx.shadowColor = 'rgba(136, 255, 204, 0.8)';
  titleCtx.shadowBlur = 20;

  // アウトライン
  titleCtx.strokeStyle = '#88ffcc';
  titleCtx.lineWidth = 4;
  titleCtx.strokeText('戦闘訓練終了', titleCanvas.width / 2, titleCanvas.height / 2);

  // 塗りつぶし
  titleCtx.fillStyle = '#000000';
  titleCtx.fillText('戦闘訓練終了', titleCanvas.width / 2, titleCanvas.height / 2);

  const titleTexture = new THREE.CanvasTexture(titleCanvas);
  const titleMaterial = new THREE.MeshBasicMaterial({
    map: titleTexture,
    transparent: true,
    side: THREE.DoubleSide,
    depthWrite: false
  });
  const titleGeometry = new THREE.PlaneGeometry(0.5, 0.125);
  const titleMesh = new THREE.Mesh(titleGeometry, titleMaterial);
  titleMesh.position.set(0, 0.1, 0);
  gameEndUIGroup.add(titleMesh);

  // 「タイトルに戻る」ボタン（通常状態）
  const buttonCanvas = document.createElement('canvas');
  buttonCanvas.width = 256;
  buttonCanvas.height = 64;
  const buttonCtx = buttonCanvas.getContext('2d');

  // ボタン背景
  buttonCtx.fillStyle = 'rgba(0, 0, 0, 0.8)';
  buttonCtx.fillRect(0, 0, buttonCanvas.width, buttonCanvas.height);

  // ボタン枠線
  buttonCtx.strokeStyle = '#88ffcc';
  buttonCtx.lineWidth = 3;
  buttonCtx.strokeRect(2, 2, buttonCanvas.width - 4, buttonCanvas.height - 4);

  // ボタンテキスト
  buttonCtx.font = 'bold 28px "Noto Sans JP", sans-serif';
  buttonCtx.textAlign = 'center';
  buttonCtx.textBaseline = 'middle';
  buttonCtx.fillStyle = '#88ffcc';
  buttonCtx.shadowColor = 'rgba(136, 255, 204, 0.8)';
  buttonCtx.shadowBlur = 10;
  buttonCtx.fillText('タイトルに戻る', buttonCanvas.width / 2, buttonCanvas.height / 2);

  buttonNormalTexture = new THREE.CanvasTexture(buttonCanvas);

  // ホバー状態のボタン
  const hoverCanvas = document.createElement('canvas');
  hoverCanvas.width = 256;
  hoverCanvas.height = 64;
  const hoverCtx = hoverCanvas.getContext('2d');

  // ホバー時は背景を明るく
  hoverCtx.fillStyle = 'rgba(136, 255, 204, 0.3)';
  hoverCtx.fillRect(0, 0, hoverCanvas.width, hoverCanvas.height);

  // ボタン枠線（より太く）
  hoverCtx.strokeStyle = '#88ffcc';
  hoverCtx.lineWidth = 5;
  hoverCtx.strokeRect(2, 2, hoverCanvas.width - 4, hoverCanvas.height - 4);

  // ボタンテキスト
  hoverCtx.font = 'bold 28px "Noto Sans JP", sans-serif';
  hoverCtx.textAlign = 'center';
  hoverCtx.textBaseline = 'middle';
  hoverCtx.fillStyle = '#ffffff';
  hoverCtx.shadowColor = 'rgba(136, 255, 204, 1.0)';
  hoverCtx.shadowBlur = 20;
  hoverCtx.fillText('タイトルに戻る', hoverCanvas.width / 2, hoverCanvas.height / 2);

  buttonHoverTexture = new THREE.CanvasTexture(hoverCanvas);

  const buttonMaterial = new THREE.MeshBasicMaterial({
    map: buttonNormalTexture,
    transparent: true,
    side: THREE.DoubleSide
  });
  const buttonGeometry = new THREE.PlaneGeometry(0.3, 0.08);
  returnButtonMesh = new THREE.Mesh(buttonGeometry, buttonMaterial);
  returnButtonMesh.position.set(0, -0.05, 0);
  returnButtonMesh.userData.isButton = true;
  gameEndUIGroup.add(returnButtonMesh);

  sceneRef.add(gameEndUIGroup);
  console.log('ゲーム終了UI表示');
}

// ゲーム終了UIを更新（常にカメラの前に）
export function updateGameEndUI() {
  if (!gameEndUIGroup) return;

  const cameraPos = new THREE.Vector3();
  cameraRef.getWorldPosition(cameraPos);

  gameEndUIGroup.lookAt(cameraPos);
}

// ボタンのホバー状態を設定
export function setButtonHover(isHovered) {
  if (!returnButtonMesh) return;

  if (isHovered !== buttonHovered) {
    buttonHovered = isHovered;
    returnButtonMesh.material.map = isHovered ? buttonHoverTexture : buttonNormalTexture;
    returnButtonMesh.material.needsUpdate = true;

    // ホバー時は少し大きくする
    const scale = isHovered ? 1.1 : 1.0;
    returnButtonMesh.scale.set(scale, scale, 1);
  }
}

// ボタンがクリックされたかチェック
export function checkReturnButtonClick(raycaster) {
  if (!returnButtonMesh) return false;

  const intersects = raycaster.intersectObject(returnButtonMesh);
  if (intersects.length > 0) {
    console.log('タイトルに戻るボタンがクリックされました');
    return true;
  }
  return false;
}

// タイトルに戻る処理
export function returnToTitle() {
  // XRセッションを終了
  if (onGameEndCallback) {
    onGameEndCallback();
  }
  // ページをリロード
  window.location.reload();
}

// レプリカ撃破時の処理
export function triggerReplicaDefeat() {
  if (isReplicaDefeated) return;

  isReplicaDefeated = true;
  console.log('レプリカ撃破！');

  // HPバーを非表示
  if (hpBarGroup) {
    hpBarGroup.visible = false;
  }

  // アステロイドを非表示
  if (replicaAsteroidGroup) {
    replicaAsteroidGroup.visible = false;
  }

  // 弾丸を削除
  replicaBullets.forEach(b => {
    if (b.mesh) sceneRef.remove(b.mesh);
  });
  replicaFiredBullets.forEach(b => {
    if (b.mesh) sceneRef.remove(b.mesh);
  });
  replicaBullets = [];
  replicaFiredBullets = [];

  // 大爆発エフェクト
  if (replicaModel && replicaPositioned) {
    spawnExplosion(replicaModel.position.clone());
  }

  // 落下開始
  replicaVelocityY = 0; // そのまま落下
  replicaOnGround = false;
}

// ゲーム終了UIをクリーンアップ
export function cleanupGameEndUI() {
  if (gameEndUIGroup) {
    sceneRef.remove(gameEndUIGroup);
    gameEndUIGroup = null;
    returnButtonMesh = null;
  }

  // 爆発パーティクルをクリーンアップ
  explosionParticles.forEach(p => {
    if (p.mesh) {
      sceneRef.remove(p.mesh);
      p.mesh.geometry.dispose();
      p.mesh.material.dispose();
    }
  });
  explosionParticles = [];

  // 状態をリセット
  isReplicaDefeated = false;
  replicaVelocityY = 0;
  replicaOnGround = false;
  bounceCount = 0;
}

// ボタンメッシュを取得
export function getReturnButtonMesh() {
  return returnButtonMesh;
}
