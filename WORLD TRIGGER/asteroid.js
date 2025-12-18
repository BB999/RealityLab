import * as THREE from 'three';

// 定数
const TRION_COLOR = 0x88ffcc;
const BIG_CUBE_SIZE = 0.15;
const SPLIT_COUNT = 3;
const HOUND_SIZE_MULTIPLIER = 2.0; // ハウンドモード時のサイズ倍率
const HOUND_TURN_SPEED = 0.03; // ハウンドの旋回速度（ゆっくり曲がる）

// シーンへの参照
let sceneRef = null;

// 左右のアステロイド状態を管理
const asteroids = {
  left: null,
  right: null
};

// アステロイドインスタンスを作成
function createAsteroidInstance(scene) {
  const instance = {
    group: new THREE.Group(),
    isCharging: false,
    isCharged: false,
    isFiring: false,
    isCancelling: false,
    cancelProgress: 0,
    chargeProgress: 0,
    bigCube: null,
    bigCubeFaceMaterial: null,
    bigCubeLineMaterial: null,
    bigCubeWorldRotation: { x: 0, y: 0, z: 0 },
    bullets: [],
    firedBullets: [],
    firingWorldPosition: null,
    firingWorldQuaternion: null,
    firingPalmNormal: null,
    getTargetPositionFunc: null,
    onHitTargetFunc: null,
    isHoundMode: false // ハウンドモードかどうか
  };

  instance.group.visible = false;
  scene.add(instance.group);

  // 大キューブを作成
  instance.bigCube = new THREE.Group();
  const geometry = new THREE.BoxGeometry(BIG_CUBE_SIZE, BIG_CUBE_SIZE, BIG_CUBE_SIZE);

  instance.bigCubeFaceMaterial = new THREE.MeshBasicMaterial({
    color: TRION_COLOR,
    transparent: true,
    opacity: 0
  });
  const faceMesh = new THREE.Mesh(geometry, instance.bigCubeFaceMaterial);
  instance.bigCube.add(faceMesh);

  const edges = new THREE.EdgesGeometry(geometry);
  instance.bigCubeLineMaterial = new THREE.LineBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0,
    linewidth: 2
  });
  const edgeMesh = new THREE.LineSegments(edges, instance.bigCubeLineMaterial);
  instance.bigCube.add(edgeMesh);

  instance.bigCube.userData.rotAxis = new THREE.Vector3(
    Math.random() - 0.5,
    Math.random() - 0.5,
    Math.random() - 0.5
  ).normalize();
  instance.group.add(instance.bigCube);

  return instance;
}

// アステロイドエフェクトを作成（両手用）
export function createAsteroid(scene) {
  sceneRef = scene;
  asteroids.left = createAsteroidInstance(scene);
  asteroids.right = createAsteroidInstance(scene);
}

// アステロイド発動（hand: 'left' or 'right', isHound: ハウンドモードか）
export function castAsteroid(hand = 'right', isHound = false) {
  const asteroid = asteroids[hand];
  if (!asteroid) return;
  if (asteroid.isCharging || asteroid.isCharged) return;

  asteroid.isCharging = true;
  asteroid.chargeProgress = 0;
  asteroid.isHoundMode = isHound;
  asteroid.bigCube.scale.set(0, 0, 0);
  asteroid.bigCubeFaceMaterial.opacity = 0;
  asteroid.bigCubeLineMaterial.opacity = 0;
  asteroid.bigCube.visible = true;
  asteroid.bigCubeWorldRotation = { x: 0, y: 0, z: 0 };
}

// 弾丸を生成
function spawnBullets(asteroid) {
  // ハウンドモード時は弾丸も1.5倍
  const sizeMultiplier = asteroid.isHoundMode ? HOUND_SIZE_MULTIPLIER : 1.0;
  const smallSize = (BIG_CUBE_SIZE / SPLIT_COUNT) * sizeMultiplier;
  const totalCount = SPLIT_COUNT * SPLIT_COUNT * SPLIT_COUNT;

  let order = [];
  for (let i = 0; i < totalCount; i++) order.push(i);
  order.sort(() => Math.random() - 0.5);

  const baseDirection = asteroid.firingPalmNormal ? asteroid.firingPalmNormal.clone() : new THREE.Vector3(0, -1, 0);

  const up = new THREE.Vector3(0, 1, 0);
  let tangent = new THREE.Vector3();
  if (Math.abs(baseDirection.dot(up)) > 0.9) {
    tangent.crossVectors(baseDirection, new THREE.Vector3(1, 0, 0)).normalize();
  } else {
    tangent.crossVectors(baseDirection, up).normalize();
  }
  const bitangent = new THREE.Vector3().crossVectors(baseDirection, tangent).normalize();

  const boxSize = 0.36;
  const boxDepth = 0.24;

  const bigCubeWorldQuaternion = new THREE.Quaternion();
  asteroid.bigCube.getWorldQuaternion(bigCubeWorldQuaternion);

  let bulletIndex = 0;
  for (let x = 0; x < SPLIT_COUNT; x++) {
    for (let y = 0; y < SPLIT_COUNT; y++) {
      for (let z = 0; z < SPLIT_COUNT; z++) {
        const i = bulletIndex++;

        const startPos = new THREE.Vector3(
          (x - 1) * smallSize,
          (y - 1) * smallSize,
          (z - 1) * smallSize
        );
        startPos.applyQuaternion(bigCubeWorldQuaternion);

        const splitGap = 0.005;
        const splitPos = new THREE.Vector3(
          (x - 1) * (smallSize + splitGap),
          (y - 1) * (smallSize + splitGap),
          (z - 1) * (smallSize + splitGap)
        );
        splitPos.applyQuaternion(bigCubeWorldQuaternion);

        const offsetTangent = (Math.random() - 0.5) * boxSize;
        const offsetBitangent = (Math.random() - 0.5) * boxSize;
        const offsetBase = (Math.random() - 0.5) * boxDepth;

        const finalPos = new THREE.Vector3();
        finalPos.addScaledVector(baseDirection, offsetBase);
        finalPos.addScaledVector(tangent, offsetTangent);
        finalPos.addScaledVector(bitangent, offsetBitangent);

        const baseWait = 12;
        const interval = 4.15;
        const shootDelay = baseWait + Math.floor(order[i] * interval);

        const bulletGeometry = new THREE.BoxGeometry(1, 1, 1);
        const faceMaterial = new THREE.MeshBasicMaterial({ color: TRION_COLOR });
        const faceMesh = new THREE.Mesh(bulletGeometry, faceMaterial);

        const edgesGeom = new THREE.EdgesGeometry(bulletGeometry);
        const lineMaterial = new THREE.LineBasicMaterial({ color: 0xffffff, linewidth: 2 });
        const edgeMesh = new THREE.LineSegments(edgesGeom, lineMaterial);

        const bulletMesh = new THREE.Group();
        bulletMesh.add(faceMesh);
        bulletMesh.add(edgeMesh);

        const worldStartPos = asteroid.firingWorldPosition.clone().add(startPos);
        bulletMesh.position.copy(worldStartPos);
        bulletMesh.scale.set(smallSize, smallSize, smallSize);
        bulletMesh.quaternion.copy(bigCubeWorldQuaternion);

        sceneRef.add(bulletMesh);

        const worldFinalPos = asteroid.firingWorldPosition.clone().add(finalPos);
        const worldSplitPos = asteroid.firingWorldPosition.clone().add(splitPos);

        asteroid.bullets.push({
          mesh: bulletMesh,
          geometry: bulletGeometry,
          edges: edgesGeom,
          faceMaterial: faceMaterial,
          lineMaterial: lineMaterial,
          localStartPos: startPos.clone(),
          localSplitPos: splitPos.clone(),
          worldStartPos: worldStartPos.clone(),
          worldSplitPos: worldSplitPos.clone(),
          worldFinalPos: worldFinalPos.clone(),
          timer: 0,
          splitDuration: 15,
          splitWait: 12,
          spreadDuration: 25,
          shootDelay: shootDelay,
          velocity: new THREE.Vector3(),
          speed: 0.08,
          rotSpeed: {
            x: (Math.random() - 0.5) * 0.08,
            y: (Math.random() - 0.5) * 0.08,
            z: (Math.random() - 0.5) * 0.08
          },
          fired: false,
          active: true,
          followHand: true,
          isHound: asteroid.isHoundMode, // ハウンドモードフラグ
          sizeMultiplier: sizeMultiplier // サイズ倍率を保存
        });
      }
    }
  }
}

// 単一アステロイドの更新
function updateSingleAsteroid(asteroid, camera) {
  if (!asteroid || !asteroid.group) return;

  // チャージ中
  if (asteroid.isCharging || asteroid.isCharged) {
    // ハウンドモード時は2倍のサイズ
    const sizeMultiplier = asteroid.isHoundMode ? HOUND_SIZE_MULTIPLIER : 1.0;

    if (asteroid.isCharging) {
      asteroid.chargeProgress += 0.02;

      if (asteroid.chargeProgress < 0.5) {
        const s = (asteroid.chargeProgress / 0.5);
        const ease = s * (2 - s);
        const scale = ease * sizeMultiplier;
        asteroid.bigCube.scale.set(scale, scale, scale);
        const opacity = Math.min(asteroid.chargeProgress * 2, 1);
        asteroid.bigCubeFaceMaterial.opacity = opacity;
        asteroid.bigCubeLineMaterial.opacity = opacity;
      } else {
        asteroid.bigCube.scale.set(sizeMultiplier, sizeMultiplier, sizeMultiplier);
        asteroid.bigCubeFaceMaterial.opacity = 1;
        asteroid.bigCubeLineMaterial.opacity = 1;
      }

      if (asteroid.chargeProgress >= 1) {
        asteroid.isCharging = false;
        asteroid.isCharged = true;
      }
    }

    asteroid.bigCubeWorldRotation.x += 0.01;
    asteroid.bigCubeWorldRotation.y += 0.015;
    asteroid.bigCubeWorldRotation.z += 0.008;

    const parentQuaternion = new THREE.Quaternion();
    asteroid.group.getWorldQuaternion(parentQuaternion);
    const inverseParentQuaternion = parentQuaternion.clone().invert();

    const worldRotationQuaternion = new THREE.Quaternion();
    const euler = new THREE.Euler(asteroid.bigCubeWorldRotation.x, asteroid.bigCubeWorldRotation.y, asteroid.bigCubeWorldRotation.z);
    worldRotationQuaternion.setFromEuler(euler);

    asteroid.bigCube.quaternion.copy(inverseParentQuaternion).multiply(worldRotationQuaternion);
  }

  // 発射中
  if (asteroid.isFiring) {
    let allFired = true;

    asteroid.bullets.forEach(bullet => {
      if (!bullet.active || bullet.fired) return;
      allFired = false;

      bullet.timer++;

      const phase1End = bullet.splitDuration;
      const phase2End = phase1End + bullet.splitWait;
      const phase3End = phase2End + bullet.spreadDuration;
      const totalEnd = phase3End + bullet.shootDelay;

      if (bullet.timer <= phase1End) {
        const t = bullet.timer / bullet.splitDuration;
        const ease = 1 - (1 - t) * (1 - t);
        const localPos = new THREE.Vector3().lerpVectors(bullet.localStartPos, bullet.localSplitPos, ease);
        const currentHandPos = new THREE.Vector3();
        asteroid.group.getWorldPosition(currentHandPos);
        bullet.mesh.position.copy(currentHandPos).add(localPos);
      } else if (bullet.timer <= phase2End) {
        const currentHandPos = new THREE.Vector3();
        asteroid.group.getWorldPosition(currentHandPos);
        bullet.mesh.position.copy(currentHandPos).add(bullet.localSplitPos);

        if (bullet.timer === phase2End) {
          bullet.worldSplitPos.copy(bullet.mesh.position);
          const finalOffset = bullet.worldFinalPos.clone().sub(asteroid.firingWorldPosition);
          bullet.worldFinalPos.copy(currentHandPos).add(finalOffset);
          bullet.followHand = false;
        }
      } else if (bullet.timer <= phase3End) {
        const t = (bullet.timer - phase2End) / bullet.spreadDuration;
        const c1 = 1.70158;
        const c3 = c1 + 1;
        const ease = 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);

        bullet.mesh.position.lerpVectors(bullet.worldSplitPos, bullet.worldFinalPos, ease);

        const smallSize = (BIG_CUBE_SIZE / SPLIT_COUNT) * bullet.sizeMultiplier;
        const s = smallSize * (1.0 - (0.3 * t));
        bullet.mesh.scale.set(s, s, s);

        bullet.mesh.rotation.x += bullet.rotSpeed.x;
        bullet.mesh.rotation.y += bullet.rotSpeed.y;
        bullet.mesh.rotation.z += bullet.rotSpeed.z;
      } else if (bullet.timer <= totalEnd) {
        bullet.mesh.position.copy(bullet.worldFinalPos);
        const smallSize = (BIG_CUBE_SIZE / SPLIT_COUNT) * bullet.sizeMultiplier;
        const s = smallSize * 0.7;
        bullet.mesh.scale.set(s, s, s);

        bullet.mesh.rotation.x += bullet.rotSpeed.x;
        bullet.mesh.rotation.y += bullet.rotSpeed.y;
        bullet.mesh.rotation.z += bullet.rotSpeed.z;
      } else {
        bullet.fired = true;

        const bulletWorldPos = bullet.mesh.position.clone();
        let fireDirection = new THREE.Vector3();
        const currentTargetPos = asteroid.getTargetPositionFunc ? asteroid.getTargetPositionFunc() : null;

        // ハウンドモードの場合はカメラの向きに発射（後で誘導される）
        if (bullet.isHound) {
          if (camera) {
            camera.getWorldDirection(fireDirection);
          } else {
            fireDirection.set(0, 0, -1);
          }
        } else if (currentTargetPos) {
          fireDirection.subVectors(currentTargetPos, bulletWorldPos).normalize();
        } else {
          if (camera) {
            camera.getWorldDirection(fireDirection);
          } else {
            fireDirection.set(0, 0, -1);
          }
        }

        const spread = 0.08;
        fireDirection.x += (Math.random() - 0.5) * spread;
        fireDirection.y += (Math.random() - 0.5) * spread;
        fireDirection.z += (Math.random() - 0.5) * spread;
        fireDirection.normalize();

        bullet.worldVelocity = fireDirection.clone().multiplyScalar(bullet.speed);

        const lookTarget = bulletWorldPos.clone().add(fireDirection);
        bullet.mesh.lookAt(lookTarget);
        const bulletScale = bullet.sizeMultiplier;
        bullet.mesh.scale.set(0.01 * bulletScale, 0.01 * bulletScale, 0.3 * bulletScale);

        bullet.worldPos = bulletWorldPos.clone();
        bullet.startWorldPos = bullet.worldPos.clone();

        asteroid.firedBullets.push(bullet);
      }
    });

    if (allFired && asteroid.bullets.length > 0) {
      asteroid.isFiring = false;
      asteroid.bullets = [];
    }
  }

  // 発射済み弾丸の更新
  asteroid.firedBullets.forEach(bullet => {
    if (!bullet.active) return;

    const currentTargetPos = asteroid.getTargetPositionFunc ? asteroid.getTargetPositionFunc() : null;

    // ハウンドモード：ターゲットに向かって曲がる（時間経過で曲がりが急になる）
    if (bullet.isHound && currentTargetPos) {
      // 飛行時間をカウント
      if (bullet.flightTime === undefined) bullet.flightTime = 0;
      bullet.flightTime++;

      // 時間経過で曲がりを急にする（最初は0.02、最大0.3まで上昇）
      const baseTurnSpeed = 0.02;
      const maxTurnSpeed = 0.3;
      const turnSpeedIncrease = bullet.flightTime * 0.002; // 毎フレーム0.002ずつ増加
      const turnSpeed = Math.min(baseTurnSpeed + turnSpeedIncrease, maxTurnSpeed);

      // 現在の速度方向
      const currentDir = bullet.worldVelocity.clone().normalize();
      // ターゲットへの方向
      const targetDir = new THREE.Vector3().subVectors(currentTargetPos, bullet.worldPos).normalize();
      // 曲がる（線形補間）
      const newDir = currentDir.lerp(targetDir, turnSpeed).normalize();
      // 新しい速度を設定
      bullet.worldVelocity.copy(newDir.multiplyScalar(bullet.speed));
    }

    bullet.worldPos.add(bullet.worldVelocity);
    bullet.mesh.position.copy(bullet.worldPos);

    const targetPos = bullet.worldPos.clone().add(bullet.worldVelocity);
    bullet.mesh.lookAt(targetPos);

    if (currentTargetPos) {
      const distToTarget = bullet.worldPos.distanceTo(currentTargetPos);
      if (distToTarget < 0.5) {
        if (asteroid.onHitTargetFunc) {
          asteroid.onHitTargetFunc();
        }
        bullet.active = false;
        bullet.mesh.visible = false;
        if (sceneRef) sceneRef.remove(bullet.mesh);
        bullet.geometry.dispose();
        if (bullet.edges) bullet.edges.dispose();
        if (bullet.faceMaterial) bullet.faceMaterial.dispose();
        if (bullet.lineMaterial) bullet.lineMaterial.dispose();
        return;
      }
    }

    const distanceTraveled = bullet.worldPos.distanceTo(bullet.startWorldPos);
    if (distanceTraveled > 15) {
      bullet.active = false;
      bullet.mesh.visible = false;
      if (sceneRef) sceneRef.remove(bullet.mesh);
      bullet.geometry.dispose();
      if (bullet.edges) bullet.edges.dispose();
      if (bullet.faceMaterial) bullet.faceMaterial.dispose();
      if (bullet.lineMaterial) bullet.lineMaterial.dispose();
    }
  });

  asteroid.firedBullets = asteroid.firedBullets.filter(bullet => bullet.active);

  // キャンセル処理
  if (asteroid.isCancelling) {
    asteroid.cancelProgress += 0.05;
    const fadeOut = Math.max(1 - asteroid.cancelProgress, 0);

    asteroid.bigCubeFaceMaterial.opacity *= fadeOut;
    asteroid.bigCubeLineMaterial.opacity *= fadeOut;
    asteroid.bigCube.scale.multiplyScalar(fadeOut);

    asteroid.bullets.forEach(bullet => {
      if (bullet.faceMaterial) bullet.faceMaterial.opacity *= fadeOut;
      if (bullet.lineMaterial) bullet.lineMaterial.opacity *= fadeOut;
      if (bullet.mesh) bullet.mesh.scale.multiplyScalar(fadeOut);
    });

    if (asteroid.cancelProgress >= 1) {
      resetSingleAsteroid(asteroid);
      asteroid.group.visible = false;
    }
  }
}

// アステロイドのアニメーション更新（両手）
export function updateAsteroid(time, camera) {
  updateSingleAsteroid(asteroids.left, camera);
  updateSingleAsteroid(asteroids.right, camera);
}

// アステロイドを発射（hand: 'left' or 'right'）
export function fireAsteroid(palmNormal, getTargetPosFn, onHitFn, hand = 'right') {
  const asteroid = asteroids[hand];
  if (!asteroid) return;
  if (!asteroid.isCharging && !asteroid.isCharged) return;

  asteroid.isCharging = false;
  asteroid.isCharged = false;
  asteroid.isFiring = true;

  asteroid.firingWorldPosition = new THREE.Vector3();
  asteroid.firingWorldQuaternion = new THREE.Quaternion();
  asteroid.group.getWorldPosition(asteroid.firingWorldPosition);
  asteroid.group.getWorldQuaternion(asteroid.firingWorldQuaternion);

  asteroid.getTargetPositionFunc = getTargetPosFn || null;
  asteroid.onHitTargetFunc = onHitFn || null;
  asteroid.firingPalmNormal = palmNormal ? palmNormal.clone() : new THREE.Vector3(0, 1, 0);

  asteroid.bigCube.updateMatrixWorld(true);
  asteroid.bigCube.visible = false;
  spawnBullets(asteroid);
}

// 単一アステロイドをリセット
function resetSingleAsteroid(asteroid) {
  if (!asteroid) return;

  asteroid.isCharging = false;
  asteroid.isCharged = false;
  asteroid.isFiring = false;
  asteroid.isCancelling = false;
  asteroid.cancelProgress = 0;
  asteroid.chargeProgress = 0;

  asteroid.bigCube.scale.set(0, 0, 0);
  asteroid.bigCubeFaceMaterial.opacity = 0;
  asteroid.bigCubeLineMaterial.opacity = 0;
  asteroid.bigCube.visible = true;

  asteroid.bullets.forEach(bullet => {
    if (bullet.mesh) {
      if (sceneRef) sceneRef.remove(bullet.mesh);
      bullet.geometry.dispose();
      if (bullet.edges) bullet.edges.dispose();
      if (bullet.faceMaterial) bullet.faceMaterial.dispose();
      if (bullet.lineMaterial) bullet.lineMaterial.dispose();
    }
  });
  asteroid.bullets = [];

  asteroid.firingWorldPosition = null;
  asteroid.firingWorldQuaternion = null;
}

// アステロイドをリセット
export function resetAsteroid(hand = 'right') {
  resetSingleAsteroid(asteroids[hand]);
}

// アステロイドグループを取得（hand: 'left' or 'right'）
export function getAsteroidGroup(hand = 'right') {
  const asteroid = asteroids[hand];
  return asteroid ? asteroid.group : null;
}

// 状態を取得（hand: 'left' or 'right'）
export function getAsteroidState(hand = 'right') {
  const asteroid = asteroids[hand];
  if (!asteroid) {
    return { isCharging: false, isFiring: false, isCancelling: false };
  }
  return {
    isCharging: asteroid.isCharging || asteroid.isCharged,
    isFiring: asteroid.isFiring,
    isCancelling: asteroid.isCancelling
  };
}
