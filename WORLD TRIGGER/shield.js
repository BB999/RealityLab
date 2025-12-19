import * as THREE from 'three';
import * as BufferGeometryUtils from 'three/addons/utils/BufferGeometryUtils.js';
import {
  getAudioLoader,
  isAudioInitialized,
  playPositionalSound
} from './audio-manager.js';

// 左右シールド用オブジェクト
const shields = {
  left: null,
  right: null
};

// オーディオ関連
let shieldBuffer = null;       // 通常シールド音
let fixedShieldBuffer = null;  // 固定シールド音
let hitBuffer = null;          // シールドヒット音
let audioLoaded = false;

// シールドのサイズ（手のひらサイズに合わせる）
const SHIELD_RADIUS = 0.12;
const SHIELD_THICKNESS = 0.005;

// 固定シールド用変数
let fixedShieldGroup = null;
let fixedShieldMesh = null;
let fixedShieldMaterial = null;
let fixedShieldBorder = null;
let fixedShieldProgress = 0;
let targetFixedShieldProgress = 0;
let fixedShieldImpacts = []; // 衝撃点の配列
let fixedShieldSoundPlayed = false; // 固定シールドの音を鳴らしたかどうか

// 固定シールドのサイズ
const FIXED_SHIELD_RADIUS = 1.2;
const FIXED_SHIELD_BODY_HEIGHT = 2.33; // 3.5 * (2/3)
const FIXED_SHIELD_TOP_HEIGHT = 0.8;
const FIXED_SHIELD_BOTTOM_HEIGHT = 1.2;

// シーン参照
let sceneRef = null;

// オーディオを初期化
export function initShieldAudio() {
  if (audioLoaded || !isAudioInitialized()) return;

  const audioLoader = getAudioLoader();
  if (!audioLoader) {
    console.error('シールド: audioLoaderが取得できない');
    return;
  }

  console.log('シールドオーディオ初期化開始');

  // 通常シールド音をロード
  audioLoader.load('/shield.mp3', (buffer) => {
    shieldBuffer = buffer;
    console.log('シールド音をロード完了');
  }, undefined, (err) => {
    console.error('シールド音のロードエラー:', err);
  });

  // 固定シールド音をロード
  audioLoader.load('/fixed-shield.mp3', (buffer) => {
    fixedShieldBuffer = buffer;
    console.log('固定シールド音をロード完了');
  }, undefined, (err) => {
    console.error('固定シールド音のロードエラー:', err);
  });

  // ヒット音をロード
  audioLoader.load('/hit.mp3', (buffer) => {
    hitBuffer = buffer;
    console.log('シールドヒット音をロード完了');
  }, undefined, (err) => {
    console.error('シールドヒット音のロードエラー:', err);
  });

  audioLoaded = true;
}

// 単一シールドを作成
function createSingleShield() {
  const group = new THREE.Group();

  // シールドのジオメトリ（薄い六角形）
  const geometry = new THREE.CylinderGeometry(SHIELD_RADIUS, SHIELD_RADIUS, SHIELD_THICKNESS, 6);

  // シンプルなシールドマテリアル（オクルージョンなし）
  const material = new THREE.MeshBasicMaterial({
    color: 0x88ffcc,
    transparent: true,
    opacity: 0,
    side: THREE.DoubleSide,
    depthWrite: false,
    blending: THREE.AdditiveBlending
  });

  const mesh = new THREE.Mesh(geometry, material);
  mesh.rotation.x = Math.PI / 2;
  group.add(mesh);

  // 輪郭線
  const edges = new THREE.EdgesGeometry(geometry);
  const lineMaterial = new THREE.LineBasicMaterial({
    color: 0xccffee,
    linewidth: 2,
    transparent: true,
    opacity: 0
  });
  const border = new THREE.LineSegments(edges, lineMaterial);
  border.rotation.x = Math.PI / 2;
  group.add(border);

  group.visible = false;

  return {
    group: group,
    mesh: mesh,
    material: material,
    border: border,
    lineMaterial: lineMaterial,
    progress: 0,
    targetProgress: 0,
    soundPlayed: false  // 音を鳴らしたかどうか
  };
}

// シールドを作成
export function createShield(scene) {
  sceneRef = scene;

  // 左右のシールドを作成
  shields.left = createSingleShield();
  shields.right = createSingleShield();

  scene.add(shields.left.group);
  scene.add(shields.right.group);

  // 固定シールドを作成
  createFixedShield(scene);
}

// 固定シールド（ドーム型クリスタル）を作成
function createFixedShield(scene) {
  fixedShieldGroup = new THREE.Group();

  // 固定シールド.htmlと同じ形状を作成
  // A. 中央の柱（上下の蓋なし）
  const bodyGeo = new THREE.CylinderGeometry(FIXED_SHIELD_RADIUS, FIXED_SHIELD_RADIUS, FIXED_SHIELD_BODY_HEIGHT, 6, 1, true);

  // B. 上の三角（底面の蓋なし）
  const topGeo = new THREE.CylinderGeometry(0, FIXED_SHIELD_RADIUS, FIXED_SHIELD_TOP_HEIGHT, 6, 1, true);
  topGeo.translate(0, FIXED_SHIELD_BODY_HEIGHT / 2 + FIXED_SHIELD_TOP_HEIGHT / 2, 0);

  // C. 下の三角（上面の蓋なし）
  const bottomGeo = new THREE.CylinderGeometry(FIXED_SHIELD_RADIUS, 0, FIXED_SHIELD_BOTTOM_HEIGHT, 6, 1, true);
  bottomGeo.translate(0, -(FIXED_SHIELD_BODY_HEIGHT / 2 + FIXED_SHIELD_BOTTOM_HEIGHT / 2), 0);

  // 結合
  const combinedGeo = BufferGeometryUtils.mergeGeometries([bodyGeo, topGeo, bottomGeo]);
  const smoothGeo = BufferGeometryUtils.mergeVertices(combinedGeo);

  // 衝撃波対応シェーダーマテリアル（オクルージョンなし）
  fixedShieldMaterial = new THREE.ShaderMaterial({
    uniforms: {
      time: { value: 0 },
      baseColor: { value: new THREE.Color(0x00ff88) },
      emissiveColor: { value: new THREE.Color(0x003322) },
      impactColor: { value: new THREE.Color(0xffffff) },
      opacity: { value: 0 },
      impactPoints: { value: [
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(0, 0, 0)
      ]},
      impactProgresses: { value: [-1, -1, -1, -1] }
    },
    vertexShader: `
      varying vec3 vPosition;
      varying vec3 vNormal;
      void main() {
        vPosition = position;
        vNormal = normalize(normalMatrix * normal);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float time;
      uniform vec3 baseColor;
      uniform vec3 emissiveColor;
      uniform vec3 impactColor;
      uniform float opacity;
      uniform vec3 impactPoints[4];
      uniform float impactProgresses[4];
      varying vec3 vPosition;
      varying vec3 vNormal;

      void main() {
        // 基本色
        vec3 color = baseColor + emissiveColor;

        // フレネル効果（エッジが明るくなる）
        float fresnel = pow(1.0 - abs(dot(vNormal, vec3(0.0, 0.0, 1.0))), 2.0);
        color += vec3(0.3, 0.6, 0.5) * fresnel;

        // 衝撃波エフェクト
        for (int i = 0; i < 4; i++) {
          float progress = impactProgresses[i];
          if (progress < 0.0) continue;

          vec3 impactPoint = impactPoints[i];
          float dist = distance(vPosition, impactPoint);

          // 波の幅（輪っかの太さ）
          float waveWidth = 0.12;

          // 3つの波を生成
          for (int j = 0; j < 3; j++) {
            float delay = float(j) * 0.35;
            // 波の広がる速度と範囲（最大6m）
            float wavePos = progress * 4.0 - delay;
            if (wavePos > 0.0 && wavePos < 6.0) {
              float waveDist = abs(dist - wavePos);
              if (waveDist < waveWidth) {
                // 波の強度（輪っかの中心が最も明るい）
                float intensity = 1.0 - (waveDist / waveWidth);
                // エッジをシャープに
                intensity = pow(intensity, 1.5);
                // 波が遠くなるほど弱くなる（ゆっくり減衰）
                intensity *= max(0.0, 1.0 - wavePos * 0.1);
                // 波の色（白＋シアン）
                vec3 waveColor = vec3(0.8, 1.0, 1.0);
                color = mix(color, waveColor, intensity * 0.9);
                // 波の中心を特に明るく
                if (waveDist < waveWidth * 0.4) {
                  color += vec3(1.0, 1.0, 1.0) * intensity * 0.4;
                }
              }
            }
          }

          // 衝撃時の局所的な明るさ（フラッシュ）
          float flashIntensity = max(0.0, 1.0 - progress * 2.5) * max(0.0, 1.0 - dist * 0.6);
          color += vec3(1.0, 1.0, 0.9) * flashIntensity * 0.5;
        }

        gl_FragColor = vec4(color, opacity);
      }
    `,
    transparent: true,
    side: THREE.DoubleSide,
    depthWrite: false,
    blending: THREE.AdditiveBlending
  });

  fixedShieldMesh = new THREE.Mesh(smoothGeo, fixedShieldMaterial);
  fixedShieldGroup.add(fixedShieldMesh);

  // 輪郭線
  const edges = new THREE.EdgesGeometry(smoothGeo);
  const lineMaterial = new THREE.LineBasicMaterial({
    color: 0xccffee,
    linewidth: 2,
    transparent: true,
    opacity: 0
  });
  fixedShieldBorder = new THREE.LineSegments(edges, lineMaterial);
  fixedShieldGroup.add(fixedShieldBorder);

  fixedShieldGroup.visible = false;
  scene.add(fixedShieldGroup);
}

// シールドのアニメーションを更新
export function updateShield(time, isFiring) {
  // 左シールドの更新
  updateSingleShield(shields.left, time);

  // 右シールドの更新
  updateSingleShield(shields.right, time);

  // 固定シールドの更新
  updateFixedShield(time);
}

// 単一シールドの更新
function updateSingleShield(shield, time) {
  if (!shield) return;

  // プログレスをスムーズに変化（少し遅めに）
  shield.progress += (shield.targetProgress - shield.progress) * 0.15;

  // シールドの表示/非表示（ヒステリシスを追加）
  // 表示開始は0.1以上、非表示は0.05以下
  if (shield.progress > 0.1) {
    shield.group.visible = true;
    // シールド発生時に音を鳴らす
    if (!shield.soundPlayed && shieldBuffer) {
      shield.soundPlayed = true;
      const position = new THREE.Vector3();
      shield.group.getWorldPosition(position);
      playPositionalSound(shieldBuffer, position, 0.5);
    }
  } else if (shield.progress < 0.05) {
    shield.group.visible = false;
    shield.soundPlayed = false;  // シールドが消えたらリセット
  }

  // シールドのスケールとオパシティをプログレスに連動
  const scale = shield.progress;
  shield.mesh.scale.set(scale, 1, scale);
  shield.border.scale.set(scale, 1, scale);

  // オパシティ
  shield.material.opacity = 0.6 * shield.progress;
  shield.lineMaterial.opacity = 0.8 * shield.progress;

  // 微妙なパルス効果
  const pulse = 1 + Math.sin(time * 3) * 0.02;
  shield.mesh.scale.multiplyScalar(pulse);
}

// 固定シールドの更新
function updateFixedShield(time) {
  if (!fixedShieldGroup) return;

  // プログレスをスムーズに変化（少し遅めに）
  fixedShieldProgress += (targetFixedShieldProgress - fixedShieldProgress) * 0.15;

  // 表示/非表示（ヒステリシスを追加）
  if (fixedShieldProgress > 0.1) {
    fixedShieldGroup.visible = true;
    // 固定シールド発生時に音を鳴らす
    if (!fixedShieldSoundPlayed && fixedShieldBuffer) {
      fixedShieldSoundPlayed = true;
      const position = new THREE.Vector3();
      fixedShieldGroup.getWorldPosition(position);
      playPositionalSound(fixedShieldBuffer, position, 0.5);
    }
  } else if (fixedShieldProgress < 0.05) {
    fixedShieldGroup.visible = false;
    fixedShieldSoundPlayed = false;  // シールドが消えたらリセット
  }

  // スケールとオパシティ
  const scale = fixedShieldProgress;
  fixedShieldMesh.scale.set(scale, scale, scale);
  fixedShieldBorder.scale.set(scale, scale, scale);

  // シェーダーのuniformを更新
  fixedShieldMaterial.uniforms.opacity.value = 0.7 * fixedShieldProgress;
  fixedShieldMaterial.uniforms.time.value = time;
  fixedShieldBorder.material.opacity = 0.5 * fixedShieldProgress;

  // パルス効果
  const pulse = 1 + Math.sin(time * 0.5) * 0.02;
  fixedShieldMesh.scale.multiplyScalar(pulse);

  // 緩やかな回転
  fixedShieldGroup.rotation.y = time * 0.3;

  // 衝撃波の進行を更新（より長く広がる）
  for (let i = 0; i < fixedShieldImpacts.length; i++) {
    const impact = fixedShieldImpacts[i];
    if (impact.progress >= 0 && impact.progress < 3.0) {
      // 進行速度を遅くして長く見えるように
      impact.progress += 0.015;
      fixedShieldMaterial.uniforms.impactProgresses.value[i] = impact.progress;
    }
  }
}

// シールドのターゲットプログレスを設定
export function setTargetShieldProgress(progress, hand = 'left') {
  if (hand === 'left' && shields.left) {
    shields.left.targetProgress = progress;
  } else if (hand === 'right' && shields.right) {
    shields.right.targetProgress = progress;
  }
}

// 固定シールドのターゲットプログレスを設定
export function setTargetFixedShieldProgress(progress) {
  targetFixedShieldProgress = progress;
}

// シールドのランダムディレイをリセット（互換性のため残す）
export function resetShieldRandomDelays() {
  // シンプルなシールドなので何もしない
}

// シールドグループを取得
export function getShieldGroup(hand = 'left') {
  if (hand === 'left') {
    return shields.left ? shields.left.group : null;
  } else if (hand === 'right') {
    return shields.right ? shields.right.group : null;
  }
  return null;
}

// 固定シールドグループを取得
export function getFixedShieldGroup() {
  return fixedShieldGroup;
}

// 固定シールドの位置を設定
export function setFixedShieldPosition(position) {
  if (fixedShieldGroup) {
    fixedShieldGroup.position.copy(position);
    // Y位置を少し下げて、プレイヤーが中心に来るようにする
    fixedShieldGroup.position.y -= 0.5;
  }
}

// 固定シールドに衝撃を追加
export function addFixedShieldImpact(worldPosition) {
  if (!fixedShieldGroup || fixedShieldProgress < 0.5) return;

  // ヒット音を再生
  playPositionalSound(hitBuffer, worldPosition, 0.7);

  // ワールド座標をローカル座標に変換
  const localPos = worldPosition.clone();
  fixedShieldGroup.worldToLocal(localPos);

  // 衝撃点を追加
  const impactIndex = fixedShieldImpacts.length % 4;
  fixedShieldImpacts[impactIndex] = {
    position: localPos.clone(),
    progress: 0
  };

  // シェーダーのuniformを更新
  fixedShieldMaterial.uniforms.impactPoints.value[impactIndex].copy(localPos);
  fixedShieldMaterial.uniforms.impactProgresses.value[impactIndex] = 0;

  console.log('固定シールドに衝撃追加！', localPos);
}

// 固定シールドとの衝突判定
export function checkFixedShieldCollision(bulletPosition) {
  if (!fixedShieldGroup || fixedShieldProgress < 0.5) return false;

  // 弾丸の位置をローカル座標に変換
  const localPos = bulletPosition.clone();
  fixedShieldGroup.worldToLocal(localPos);

  // 六角柱の形状を考慮した衝突判定
  const y = localPos.y;
  const scale = fixedShieldProgress;

  // Y座標による範囲チェック
  const topY = (FIXED_SHIELD_BODY_HEIGHT / 2 + FIXED_SHIELD_TOP_HEIGHT) * scale;
  const bottomY = -(FIXED_SHIELD_BODY_HEIGHT / 2 + FIXED_SHIELD_BOTTOM_HEIGHT) * scale;

  if (y > topY || y < bottomY) return false;

  // 水平方向の距離
  const horizontalDist = Math.sqrt(localPos.x * localPos.x + localPos.z * localPos.z);

  // 高さに応じて半径を計算
  let maxRadius;
  const bodyTop = (FIXED_SHIELD_BODY_HEIGHT / 2) * scale;
  const bodyBottom = -(FIXED_SHIELD_BODY_HEIGHT / 2) * scale;

  if (y > bodyTop) {
    // 上の円錐部分
    const t = (y - bodyTop) / (FIXED_SHIELD_TOP_HEIGHT * scale);
    maxRadius = FIXED_SHIELD_RADIUS * scale * (1 - t);
  } else if (y < bodyBottom) {
    // 下の円錐部分
    const t = (bodyBottom - y) / (FIXED_SHIELD_BOTTOM_HEIGHT * scale);
    maxRadius = FIXED_SHIELD_RADIUS * scale * (1 - t);
  } else {
    // 円柱部分
    maxRadius = FIXED_SHIELD_RADIUS * scale;
  }

  // シールドの表面付近（0.1mの厚み）に弾丸があるかチェック
  const innerRadius = maxRadius * 0.9;
  const outerRadius = maxRadius * 1.1;

  return horizontalDist >= innerRadius && horizontalDist <= outerRadius;
}

// 固定シールドが有効かどうか
export function isFixedShieldActive() {
  return fixedShieldProgress > 0.5;
}
