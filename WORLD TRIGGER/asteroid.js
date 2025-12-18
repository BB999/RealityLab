import * as THREE from 'three';

// アステロイド用変数
let asteroidGroup = null;
let isCharging = false;
let isCharged = false; // チャージ完了状態
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
let bigCubeFaceMaterial = null;
let bigCubeLineMaterial = null;
let bigCubeFaceMesh = null;
let bigCubeEdgeMesh = null;
let bigCubeWorldRotation = { x: 0, y: 0, z: 0 }; // ワールド座標での回転を保持

// 分割された弾丸（待機中）
let bullets = [];
// 発射済み弾丸（独立して飛行中）
let firedBullets = [];

// シーンとカメラへの参照
let sceneRef = null;

// 発射時の位置（分割弾丸用）
let firingWorldPosition = null;
let firingWorldQuaternion = null;
let firingPalmNormal = null; // 手のひらの法線方向

// ターゲット位置を取得する関数
let getTargetPositionFunc = null;

// ヒット時のコールバック関数
let onHitTargetFunc = null;

// アステロイドエフェクトを作成
export function createAsteroid(scene) {
  sceneRef = scene;
  asteroidGroup = new THREE.Group();
  asteroidGroup.visible = false;
  scene.add(asteroidGroup);

  // 大キューブを作成（グループとして）
  bigCube = new THREE.Group();

  const geometry = new THREE.BoxGeometry(BIG_CUBE_SIZE, BIG_CUBE_SIZE, BIG_CUBE_SIZE);

  // 面のマテリアル（緑色）
  bigCubeFaceMaterial = new THREE.MeshBasicMaterial({
    color: TRION_COLOR,
    transparent: true,
    opacity: 0
  });
  bigCubeFaceMesh = new THREE.Mesh(geometry, bigCubeFaceMaterial);
  bigCube.add(bigCubeFaceMesh);

  // 輪郭線（白）
  const edges = new THREE.EdgesGeometry(geometry);
  bigCubeLineMaterial = new THREE.LineBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0,
    linewidth: 2
  });
  bigCubeEdgeMesh = new THREE.LineSegments(edges, bigCubeLineMaterial);
  bigCube.add(bigCubeEdgeMesh);

  bigCube.userData.rotAxis = new THREE.Vector3(
    Math.random() - 0.5,
    Math.random() - 0.5,
    Math.random() - 0.5
  ).normalize();
  asteroidGroup.add(bigCube);
}

// アステロイド発動
export function castAsteroid() {
  // チャージ中またはチャージ完了なら何もしない（発射中でも新しくチャージ可能）
  if (isCharging || isCharged) return;

  isCharging = true;
  chargeProgress = 0;

  // 大キューブをリセット
  bigCube.scale.set(0, 0, 0);
  bigCubeFaceMaterial.opacity = 0;
  bigCubeLineMaterial.opacity = 0;
  bigCube.visible = true;

  // ワールド回転をリセット
  bigCubeWorldRotation = { x: 0, y: 0, z: 0 };
}

// 弾丸を生成
function spawnBullets() {
  const smallSize = BIG_CUBE_SIZE / SPLIT_COUNT;
  const totalCount = SPLIT_COUNT * SPLIT_COUNT * SPLIT_COUNT;

  // 発射順序をランダムに
  let order = [];
  for (let i = 0; i < totalCount; i++) order.push(i);
  order.sort(() => Math.random() - 0.5);

  // 手のひらの方向（手のひらが向いている方向）を基準にする
  const baseDirection = firingPalmNormal ? firingPalmNormal.clone() : new THREE.Vector3(0, -1, 0);

  // 基準方向に垂直な2つの軸を計算
  const up = new THREE.Vector3(0, 1, 0);
  let tangent = new THREE.Vector3();
  if (Math.abs(baseDirection.dot(up)) > 0.9) {
    tangent.crossVectors(baseDirection, new THREE.Vector3(1, 0, 0)).normalize();
  } else {
    tangent.crossVectors(baseDirection, up).normalize();
  }
  const bitangent = new THREE.Vector3().crossVectors(baseDirection, tangent).normalize();

  // 四角い箱状に展開するためのサイズ
  const boxSize = 0.36; // 箱の一辺のサイズ（横幅・縦幅）3倍
  const boxDepth = 0.24; // 手のひら方向の深さ（奥行き）3倍

  // 大キューブのワールド回転を取得（ループ前に1回だけ）
  const bigCubeWorldQuaternion = new THREE.Quaternion();
  bigCube.getWorldQuaternion(bigCubeWorldQuaternion);

  let bulletIndex = 0;
  for (let x = 0; x < SPLIT_COUNT; x++) {
    for (let y = 0; y < SPLIT_COUNT; y++) {
      for (let z = 0; z < SPLIT_COUNT; z++) {
        const i = bulletIndex++;

        // 開始位置は大キューブの分割位置（3x3x3グリッド、間隔0）
        // 大キューブの回転を適用
        const startPos = new THREE.Vector3(
          (x - 1) * smallSize,
          (y - 1) * smallSize,
          (z - 1) * smallSize
        );
        startPos.applyQuaternion(bigCubeWorldQuaternion);

        // 分割後の位置（0.5cm間隔でズレた状態）
        // 大キューブの回転を適用
        const splitGap = 0.005; // 0.5cm
        const splitPos = new THREE.Vector3(
          (x - 1) * (smallSize + splitGap),
          (y - 1) * (smallSize + splitGap),
          (z - 1) * (smallSize + splitGap)
        );
        splitPos.applyQuaternion(bigCubeWorldQuaternion);

        // 展開位置は四角い箱状にランダム（中心が大キューブの中心と一致）
        const offsetTangent = (Math.random() - 0.5) * boxSize;
        const offsetBitangent = (Math.random() - 0.5) * boxSize;
        const offsetBase = (Math.random() - 0.5) * boxDepth; // 中心を基準に前後に広がる

    // 基準方向 + 接線方向と従接線方向の成分で箱状に配置
    const finalPos = new THREE.Vector3();
    finalPos.addScaledVector(baseDirection, offsetBase);
    finalPos.addScaledVector(tangent, offsetTangent);
    finalPos.addScaledVector(bitangent, offsetBitangent);

    const baseWait = 12;     // 0.2秒（12フレーム）
    const interval = 4.15;   // 約4.15フレーム/弾（2秒-0.2秒=1.8秒=108フレーム÷26）
    const shootDelay = baseWait + Math.floor(order[i] * interval);

    // 弾丸を作成（シーンに直接追加して位置を固定）
    const bulletGeometry = new THREE.BoxGeometry(1, 1, 1);

    // 面のマテリアル（緑色、不透明）
    const faceMaterial = new THREE.MeshBasicMaterial({
      color: TRION_COLOR
    });
    const faceMesh = new THREE.Mesh(bulletGeometry, faceMaterial);

    // 輪郭線（エッジ）を作成（白）
    const edges = new THREE.EdgesGeometry(bulletGeometry);
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0xffffff,
      linewidth: 2
    });
    const edgeMesh = new THREE.LineSegments(edges, lineMaterial);

    // グループにまとめる
    const bulletMesh = new THREE.Group();
    bulletMesh.add(faceMesh);
    bulletMesh.add(edgeMesh);

    // 発射時のワールド位置を基準にした位置を計算
    const worldStartPos = firingWorldPosition.clone().add(startPos);
    bulletMesh.position.copy(worldStartPos);
    bulletMesh.scale.set(smallSize, smallSize, smallSize);

    // 大キューブのワールド回転を引き継ぐ
    bulletMesh.quaternion.copy(bigCubeWorldQuaternion);

    sceneRef.add(bulletMesh);

    // ワールド座標での展開位置
    const worldFinalPos = firingWorldPosition.clone().add(finalPos);

    // 分割後のワールド位置（2cm間隔）
    const worldSplitPos = firingWorldPosition.clone().add(splitPos);

    bullets.push({
      mesh: bulletMesh,
      geometry: bulletGeometry,
      edges: edges,
      faceMaterial: faceMaterial,
      lineMaterial: lineMaterial,
      // ローカル位置（手からの相対位置）
      localStartPos: startPos.clone(),
      localSplitPos: splitPos.clone(),
      // ワールド位置（展開以降用）
      worldStartPos: worldStartPos.clone(),
      worldSplitPos: worldSplitPos.clone(),
      worldFinalPos: worldFinalPos.clone(),
      timer: 0,
      splitDuration: 15,       // 分割アニメーション時間
      splitWait: 12,           // 0.2秒待機（12フレーム）
      spreadDuration: 25,      // 展開アニメーション時間
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
      followHand: true  // 手に追従するフラグ
    });
      }
    }
  }
}

// アステロイドのアニメーション更新
export function updateAsteroid(time, camera) {
  if (!asteroidGroup) return;

  // チャージ中
  if (isCharging || isCharged) {
    if (isCharging) {
      chargeProgress += 0.02;

      // 大キューブのスケールアップ
      if (chargeProgress < 0.5) {
        const s = (chargeProgress / 0.5);
        const ease = s * (2 - s); // EaseOut
        bigCube.scale.set(ease, ease, ease);
        const opacity = Math.min(chargeProgress * 2, 1);
        bigCubeFaceMaterial.opacity = opacity;
        bigCubeLineMaterial.opacity = opacity;
      } else {
        bigCube.scale.set(1, 1, 1);
        bigCubeFaceMaterial.opacity = 1;
        bigCubeLineMaterial.opacity = 1;
      }

      // チャージ完了 → 待機状態に移行（手を閉じるまで待つ）
      if (chargeProgress >= 1) {
        isCharging = false;
        isCharged = true;
      }
    }

    // 回転（ワールド座標で一定の回転、手の影響を受けない）
    bigCubeWorldRotation.x += 0.01;
    bigCubeWorldRotation.y += 0.015;
    bigCubeWorldRotation.z += 0.008;

    // 親（asteroidGroup）の回転を打ち消してワールド座標で回転
    const parentQuaternion = new THREE.Quaternion();
    asteroidGroup.getWorldQuaternion(parentQuaternion);
    const inverseParentQuaternion = parentQuaternion.clone().invert();

    // ワールド回転をクォータニオンに変換
    const worldRotationQuaternion = new THREE.Quaternion();
    const euler = new THREE.Euler(bigCubeWorldRotation.x, bigCubeWorldRotation.y, bigCubeWorldRotation.z);
    worldRotationQuaternion.setFromEuler(euler);

    // 親の回転を打ち消した後にワールド回転を適用
    bigCube.quaternion.copy(inverseParentQuaternion).multiply(worldRotationQuaternion);
  }

  // 発射中（拡散アニメーション）
  if (isFiring) {
    let allFired = true;

    bullets.forEach(bullet => {
      if (!bullet.active || bullet.fired) return;
      allFired = false;

      bullet.timer++;

      const phase1End = bullet.splitDuration; // 分割アニメーション終了
      const phase2End = phase1End + bullet.splitWait; // 待機終了
      const phase3End = phase2End + bullet.spreadDuration; // 展開アニメーション終了
      const totalEnd = phase3End + bullet.shootDelay; // 発射待機終了

      // 1. 分割アニメーション（開始位置 → 0.5cm間隔の分割位置）※回転なし、手に追従
      if (bullet.timer <= phase1End) {
        const t = bullet.timer / bullet.splitDuration;
        // EaseOutQuad
        const ease = 1 - (1 - t) * (1 - t);
        // ローカル位置を補間
        const localPos = new THREE.Vector3().lerpVectors(bullet.localStartPos, bullet.localSplitPos, ease);
        // 現在のasteroidGroupの位置を基準にワールド位置を計算
        const currentHandPos = new THREE.Vector3();
        asteroidGroup.getWorldPosition(currentHandPos);
        bullet.mesh.position.copy(currentHandPos).add(localPos);
      }
      // 2. 待機（分割位置で停止）※回転なし、手に追従
      else if (bullet.timer <= phase2End) {
        // 現在のasteroidGroupの位置を基準にワールド位置を計算
        const currentHandPos = new THREE.Vector3();
        asteroidGroup.getWorldPosition(currentHandPos);
        bullet.mesh.position.copy(currentHandPos).add(bullet.localSplitPos);

        // 待機終了時にワールド位置を固定（展開フェーズ用に更新）
        if (bullet.timer === phase2End) {
          bullet.worldSplitPos.copy(bullet.mesh.position);
          // worldFinalPosも現在の手の位置を基準に再計算
          const finalOffset = bullet.worldFinalPos.clone().sub(firingWorldPosition);
          bullet.worldFinalPos.copy(currentHandPos).add(finalOffset);
          bullet.followHand = false;
        }
      }
      // 3. 展開アニメーション（分割位置 → 展開位置）
      else if (bullet.timer <= phase3End) {
        const t = (bullet.timer - phase2End) / bullet.spreadDuration;
        // EaseOutBack
        const c1 = 1.70158;
        const c3 = c1 + 1;
        const ease = 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);

        bullet.mesh.position.lerpVectors(bullet.worldSplitPos, bullet.worldFinalPos, ease);

        // サイズ調整
        const smallSize = BIG_CUBE_SIZE / SPLIT_COUNT;
        const s = smallSize * (1.0 - (0.3 * t));
        bullet.mesh.scale.set(s, s, s);

        // 回転
        bullet.mesh.rotation.x += bullet.rotSpeed.x;
        bullet.mesh.rotation.y += bullet.rotSpeed.y;
        bullet.mesh.rotation.z += bullet.rotSpeed.z;
      }
      // 4. 発射待機（展開位置で停止）
      else if (bullet.timer <= totalEnd) {
        bullet.mesh.position.copy(bullet.worldFinalPos);
        const smallSize = BIG_CUBE_SIZE / SPLIT_COUNT;
        const s = smallSize * 0.7;
        bullet.mesh.scale.set(s, s, s);

        // 待機中の回転
        bullet.mesh.rotation.x += bullet.rotSpeed.x;
        bullet.mesh.rotation.y += bullet.rotSpeed.y;
        bullet.mesh.rotation.z += bullet.rotSpeed.z;
      }
      // 5. 発射 → firedBulletsに移動
      else {
        bullet.fired = true;

        // 弾丸の現在位置（すでにワールド座標）
        const bulletWorldPos = bullet.mesh.position.clone();

        // 発射方向を決定（発射時にターゲット位置を取得）
        let fireDirection = new THREE.Vector3();
        const currentTargetPos = getTargetPositionFunc ? getTargetPositionFunc() : null;

        if (currentTargetPos) {
          // ターゲット（レプリカ）の現在位置に向かって発射
          fireDirection.subVectors(currentTargetPos, bulletWorldPos).normalize();
        } else {
          // ターゲットがない場合はカメラの正面方向
          if (camera) {
            camera.getWorldDirection(fireDirection);
          } else {
            fireDirection.set(0, 0, -1);
          }
        }

        // 発射方向にランダムなばらつきを追加（±5度程度）
        const spread = 0.08; // ばらつきの強さ
        fireDirection.x += (Math.random() - 0.5) * spread;
        fireDirection.y += (Math.random() - 0.5) * spread;
        fireDirection.z += (Math.random() - 0.5) * spread;
        fireDirection.normalize();

        // 発射方向をワールド座標で設定
        bullet.worldVelocity = fireDirection.clone().multiplyScalar(bullet.speed);

        // 弾丸を発射方向に向ける（細長く変形）
        const lookTarget = bulletWorldPos.clone().add(fireDirection);
        bullet.mesh.lookAt(lookTarget);
        bullet.mesh.scale.set(0.01, 0.01, 0.3);

        // ワールド位置を保存
        bullet.worldPos = bulletWorldPos.clone();

        // 発射開始位置を記録
        bullet.startWorldPos = bullet.worldPos.clone();

        // firedBulletsに移動
        firedBullets.push(bullet);
      }
    });

    // 全弾丸が発射されたらisFiringをfalseにしてbulletsをクリア
    if (allFired && bullets.length > 0) {
      isFiring = false;
      bullets = [];
    }
  }

  // 発射済み弾丸の更新（常に実行）
  firedBullets.forEach(bullet => {
    if (!bullet.active) return;

    // ワールド座標で移動
    bullet.worldPos.add(bullet.worldVelocity);
    bullet.mesh.position.copy(bullet.worldPos);

    // 進行方向を向くように回転を更新
    const targetPos = bullet.worldPos.clone().add(bullet.worldVelocity);
    bullet.mesh.lookAt(targetPos);

    // ターゲットへのヒット判定
    const currentTargetPos = getTargetPositionFunc ? getTargetPositionFunc() : null;
    if (currentTargetPos) {
      const distToTarget = bullet.worldPos.distanceTo(currentTargetPos);
      if (distToTarget < 0.5) {
        // ヒット！
        if (onHitTargetFunc) {
          onHitTargetFunc();
        }
        bullet.active = false;
        bullet.mesh.visible = false;
        if (sceneRef) {
          sceneRef.remove(bullet.mesh);
        }
        bullet.geometry.dispose();
        if (bullet.edges) bullet.edges.dispose();
        if (bullet.faceMaterial) bullet.faceMaterial.dispose();
        if (bullet.lineMaterial) bullet.lineMaterial.dispose();
        return;
      }
    }

    // 発射開始位置からの距離で非アクティブ化
    const distanceTraveled = bullet.worldPos.distanceTo(bullet.startWorldPos);
    if (distanceTraveled > 15) {
      bullet.active = false;
      bullet.mesh.visible = false;
      // メッシュを削除
      if (sceneRef) {
        sceneRef.remove(bullet.mesh);
      }
      bullet.geometry.dispose();
      if (bullet.edges) bullet.edges.dispose();
      if (bullet.faceMaterial) bullet.faceMaterial.dispose();
      if (bullet.lineMaterial) bullet.lineMaterial.dispose();
    }
  });

  // 非アクティブな弾丸を配列から削除
  firedBullets = firedBullets.filter(bullet => bullet.active);

  // キャンセル中のフェードアウト処理
  if (isCancelling) {
    cancelProgress += 0.05;

    const fadeOut = Math.max(1 - cancelProgress, 0);

    // 大キューブのフェードアウト
    bigCubeFaceMaterial.opacity *= fadeOut;
    bigCubeLineMaterial.opacity *= fadeOut;
    bigCube.scale.multiplyScalar(fadeOut);

    // 弾丸のフェードアウト
    bullets.forEach(bullet => {
      if (bullet.faceMaterial) {
        bullet.faceMaterial.opacity *= fadeOut;
      }
      if (bullet.lineMaterial) {
        bullet.lineMaterial.opacity *= fadeOut;
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

// アステロイドを発射（手を閉じた時に呼ばれる）
export function fireAsteroid(palmNormal, getTargetPosFn, onHitFn) {
  if (!isCharging && !isCharged) return;

  isCharging = false;
  isCharged = false;
  isFiring = true;

  // 発射時のワールド位置と回転を保存（大キューブの中心位置）
  firingWorldPosition = new THREE.Vector3();
  firingWorldQuaternion = new THREE.Quaternion();
  asteroidGroup.getWorldPosition(firingWorldPosition);
  asteroidGroup.getWorldQuaternion(firingWorldQuaternion);

  // ターゲット位置を取得する関数を保存（発射時に毎回呼ばれる）
  getTargetPositionFunc = getTargetPosFn || null;

  // ヒット時のコールバック関数を保存
  onHitTargetFunc = onHitFn || null;

  // 手のひらの法線方向を保存（ターゲットがない場合のフォールバック）
  firingPalmNormal = palmNormal ? palmNormal.clone() : new THREE.Vector3(0, 1, 0);

  // 大キューブのワールド回転を保存
  bigCube.updateMatrixWorld(true);

  // 大キューブを非表示にして弾丸を生成
  bigCube.visible = false;
  spawnBullets();
}

// アステロイドをリセット
export function resetAsteroid() {
  isCharging = false;
  isCharged = false;
  isFiring = false;
  isCancelling = false;
  cancelProgress = 0;
  chargeProgress = 0;

  // 大キューブをリセット
  bigCube.scale.set(0, 0, 0);
  bigCubeFaceMaterial.opacity = 0;
  bigCubeLineMaterial.opacity = 0;
  bigCube.visible = true;

  // 待機中の弾丸をクリア
  bullets.forEach(bullet => {
    if (bullet.mesh) {
      if (sceneRef) {
        sceneRef.remove(bullet.mesh);
      }
      bullet.geometry.dispose();
      if (bullet.edges) bullet.edges.dispose();
      if (bullet.faceMaterial) bullet.faceMaterial.dispose();
      if (bullet.lineMaterial) bullet.lineMaterial.dispose();
    }
  });
  bullets = [];

  // 発射位置をリセット
  firingWorldPosition = null;
  firingWorldQuaternion = null;
}

// アステロイドグループを取得
export function getAsteroidGroup() {
  return asteroidGroup;
}

// 状態を取得
export function getAsteroidState() {
  return {
    isCharging: isCharging || isCharged, // チャージ中またはチャージ完了
    isFiring,
    isCancelling
  };
}
