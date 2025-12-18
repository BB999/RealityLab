import * as THREE from 'three';

// アステロイド用変数
let asteroidGroup = null;
let isCharging = false;
let isFiring = false;
let isCancelling = false;
let cancelProgress = 0;
let chargeProgress = 0;

// 定数
const TRION_COLOR = 0x88ffcc; // 白っぽいグリーン（シールドと同じ）
const BIG_CUBE_SIZE = 0.15; // 手のひらサイズに合わせた大きさ
const SPLIT_COUNT = 3;

// 大キューブ
let bigCube = null;
let bigCubeMaterial = null;

// 分割された弾丸
let bullets = [];

// シーンとカメラへの参照
let sceneRef = null;

// アステロイドエフェクトを作成
export function createAsteroid(scene) {
  sceneRef = scene;
  asteroidGroup = new THREE.Group();
  asteroidGroup.visible = false;
  scene.add(asteroidGroup);

  // 大キューブのマテリアル
  bigCubeMaterial = new THREE.MeshBasicMaterial({
    color: TRION_COLOR,
    transparent: true,
    opacity: 0,
    depthWrite: false,
    blending: THREE.AdditiveBlending
  });

  // 大キューブを作成
  const geometry = new THREE.BoxGeometry(BIG_CUBE_SIZE, BIG_CUBE_SIZE, BIG_CUBE_SIZE);
  bigCube = new THREE.Mesh(geometry, bigCubeMaterial);
  bigCube.userData.rotAxis = new THREE.Vector3(
    Math.random() - 0.5,
    Math.random() - 0.5,
    Math.random() - 0.5
  ).normalize();
  asteroidGroup.add(bigCube);
}

// アステロイド発動
export function castAsteroid() {
  if (isCharging || isFiring) return;

  isCharging = true;
  chargeProgress = 0;

  // 大キューブをリセット
  bigCube.scale.set(0, 0, 0);
  bigCubeMaterial.opacity = 0;
  bigCube.visible = true;

  // 弾丸をクリア
  bullets.forEach(bullet => {
    if (bullet.mesh) {
      asteroidGroup.remove(bullet.mesh);
      bullet.geometry.dispose();
    }
  });
  bullets = [];

  // 回転軸をリセット
  bigCube.userData.rotAxis = new THREE.Vector3(
    Math.random() - 0.5,
    Math.random() - 0.5,
    Math.random() - 0.5
  ).normalize();
}

// 弾丸を生成
function spawnBullets() {
  const smallSize = BIG_CUBE_SIZE / SPLIT_COUNT;
  const packedSpacing = smallSize;
  const spreadSpacing = smallSize * 1.8;

  let totalCount = SPLIT_COUNT * SPLIT_COUNT * SPLIT_COUNT;
  let order = [];
  for (let i = 0; i < totalCount; i++) order.push(i);
  order.sort(() => Math.random() - 0.5);

  let counter = 0;

  for (let z = 0; z < SPLIT_COUNT; z++) {
    for (let y = 0; y < SPLIT_COUNT; y++) {
      for (let x = 0; x < SPLIT_COUNT; x++) {
        const xIdx = x - (SPLIT_COUNT - 1) / 2;
        const yIdx = y - (SPLIT_COUNT - 1) / 2;
        const zIdx = z - (SPLIT_COUNT - 1) / 2;

        // 密集位置
        const packedOffset = new THREE.Vector3(
          xIdx * packedSpacing,
          yIdx * packedSpacing,
          zIdx * packedSpacing
        );

        // 展開位置（ランダムなズレを加算）
        const jitterAmount = smallSize * 0.8;
        const randomOffset = new THREE.Vector3(
          (Math.random() - 0.5) * jitterAmount,
          (Math.random() - 0.5) * jitterAmount,
          (Math.random() - 0.5) * jitterAmount
        );

        const spreadOffset = new THREE.Vector3(
          xIdx * spreadSpacing,
          yIdx * spreadSpacing,
          zIdx * spreadSpacing
        ).add(randomOffset);

        const startPos = packedOffset.clone();
        const finalPos = spreadOffset.clone();

        const baseWait = 30;
        const interval = 3;
        const shootDelay = baseWait + (order[counter] * interval);

        // 弾丸を作成
        const bulletGeometry = new THREE.BoxGeometry(1, 1, 1);
        const bulletMaterial = new THREE.MeshBasicMaterial({
          color: TRION_COLOR,
          transparent: true,
          opacity: 1,
          depthWrite: false,
          blending: THREE.AdditiveBlending
        });
        const bulletMesh = new THREE.Mesh(bulletGeometry, bulletMaterial);
        bulletMesh.position.copy(startPos);
        bulletMesh.scale.set(smallSize, smallSize, smallSize);
        asteroidGroup.add(bulletMesh);

        bullets.push({
          mesh: bulletMesh,
          geometry: bulletGeometry,
          material: bulletMaterial,
          startPos: startPos.clone(),
          finalPos: finalPos.clone(),
          timer: 0,
          spreadDuration: 25,
          shootDelay: shootDelay,
          velocity: new THREE.Vector3(),
          speed: 0.15,
          rotSpeed: {
            x: (Math.random() - 0.5) * 0.08,
            y: (Math.random() - 0.5) * 0.08,
            z: (Math.random() - 0.5) * 0.08
          },
          fired: false,
          active: true
        });

        counter++;
      }
    }
  }
}

// アステロイドのアニメーション更新
export function updateAsteroid(time, camera) {
  if (!asteroidGroup) return;

  // チャージ中
  if (isCharging) {
    chargeProgress += 0.02;

    // 大キューブのスケールアップ
    if (chargeProgress < 0.5) {
      const s = (chargeProgress / 0.5);
      const ease = s * (2 - s); // EaseOut
      bigCube.scale.set(ease, ease, ease);
      bigCubeMaterial.opacity = Math.min(chargeProgress * 2, 1);
    } else {
      bigCube.scale.set(1, 1, 1);
      bigCubeMaterial.opacity = 1;
    }

    // 回転
    bigCube.rotateOnAxis(bigCube.userData.rotAxis, 0.015);

    // チャージ完了 → 分割
    if (chargeProgress >= 1) {
      isCharging = false;
      isFiring = true;

      // 大キューブを非表示にして弾丸を生成
      bigCube.visible = false;
      spawnBullets();
    }
  }

  // 発射中
  if (isFiring) {
    let allInactive = true;

    bullets.forEach(bullet => {
      if (!bullet.active) return;
      allInactive = false;

      bullet.timer++;

      // 1. 拡散 & 待機
      if (bullet.timer < bullet.spreadDuration + bullet.shootDelay) {
        if (bullet.timer <= bullet.spreadDuration) {
          const t = bullet.timer / bullet.spreadDuration;
          // EaseOutBack
          const c1 = 1.70158;
          const c3 = c1 + 1;
          const ease = 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);

          bullet.mesh.position.lerpVectors(bullet.startPos, bullet.finalPos, ease);

          // サイズ調整
          const smallSize = BIG_CUBE_SIZE / SPLIT_COUNT;
          const s = smallSize * (1.0 - (0.3 * t));
          bullet.mesh.scale.set(s, s, s);
        } else {
          bullet.mesh.position.copy(bullet.finalPos);
          const smallSize = BIG_CUBE_SIZE / SPLIT_COUNT;
          const s = smallSize * 0.7;
          bullet.mesh.scale.set(s, s, s);
        }

        // 待機中の回転
        bullet.mesh.rotation.x += bullet.rotSpeed.x;
        bullet.mesh.rotation.y += bullet.rotSpeed.y;
        bullet.mesh.rotation.z += bullet.rotSpeed.z;
      }
      // 2. 発射
      else {
        if (!bullet.fired) {
          bullet.fired = true;

          // カメラの正面方向をワールド座標で取得
          const cameraDirection = new THREE.Vector3(0, 0, -1);
          if (camera) {
            camera.getWorldDirection(cameraDirection);
          }

          // 弾丸のワールド位置を取得
          const bulletWorldPos = new THREE.Vector3();
          bullet.mesh.getWorldPosition(bulletWorldPos);

          // 発射方向（カメラの正面方向）をワールド座標で設定
          bullet.worldVelocity = cameraDirection.clone().multiplyScalar(bullet.speed);

          // 弾丸をカメラの方向に向ける（細長く変形）
          const targetPos = bulletWorldPos.clone().add(cameraDirection);
          bullet.mesh.lookAt(targetPos);
          bullet.mesh.scale.set(0.01, 0.01, 0.3);

          // ワールド位置を保存
          bullet.worldPos = bulletWorldPos.clone();
        }

        // ワールド座標で移動
        bullet.worldPos.add(bullet.worldVelocity);

        // ワールド座標からローカル座標に変換してメッシュに適用
        const localPos = asteroidGroup.worldToLocal(bullet.worldPos.clone());
        bullet.mesh.position.copy(localPos);

        // 一定距離で非アクティブ化（ワールド座標で判定）
        const distanceTraveled = bullet.worldPos.distanceTo(new THREE.Vector3());
        if (distanceTraveled > 15) {
          bullet.active = false;
          bullet.mesh.visible = false;
        }
      }
    });

    // 全弾丸が非アクティブになったらリセット
    if (allInactive && bullets.length > 0) {
      isFiring = false;
      resetAsteroid();
    }
  }

  // キャンセル中のフェードアウト処理
  if (isCancelling) {
    cancelProgress += 0.05;

    const fadeOut = Math.max(1 - cancelProgress, 0);

    // 大キューブのフェードアウト
    bigCubeMaterial.opacity *= fadeOut;
    bigCube.scale.multiplyScalar(fadeOut);

    // 弾丸のフェードアウト
    bullets.forEach(bullet => {
      if (bullet.material) {
        bullet.material.opacity *= fadeOut;
      }
      if (bullet.mesh) {
        bullet.mesh.scale.multiplyScalar(fadeOut);
      }
    });

    // キャンセル完了
    if (cancelProgress >= 1) {
      resetAsteroid();
      asteroidGroup.visible = false;
    }
  }
}

// アステロイドをキャンセル
export function cancelAsteroid() {
  isCharging = false;
  isFiring = false;
  isCancelling = true;
  cancelProgress = 0;
}

// アステロイドをリセット
export function resetAsteroid() {
  isCharging = false;
  isFiring = false;
  isCancelling = false;
  cancelProgress = 0;
  chargeProgress = 0;

  // 大キューブをリセット
  bigCube.scale.set(0, 0, 0);
  bigCubeMaterial.opacity = 0;
  bigCube.visible = true;

  // 弾丸をクリア
  bullets.forEach(bullet => {
    if (bullet.mesh) {
      asteroidGroup.remove(bullet.mesh);
      bullet.geometry.dispose();
      bullet.material.dispose();
    }
  });
  bullets = [];
}

// アステロイドグループを取得
export function getAsteroidGroup() {
  return asteroidGroup;
}

// 状態を取得
export function getAsteroidState() {
  return {
    isCharging,
    isFiring,
    isCancelling
  };
}
