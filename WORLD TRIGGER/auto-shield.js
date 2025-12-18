import * as THREE from 'three';

// 自動シールド用
let autoShields = [];
const AUTO_SHIELD_DISTANCE = 0.15;
const AUTO_SHIELD_DURATION = 2.0;
const AUTO_SHIELD_RADIUS = 0.1;
const AUTO_SHIELD_KICKBACK_DISTANCE = 0.05;
const AUTO_SHIELD_KICKBACK_SPEED = 2;

// 外部参照
let sceneRef = null;
let cameraRef = null;

// 初期化
export function initAutoShield(scene, camera) {
  sceneRef = scene;
  cameraRef = camera;
}

// 六角形の内部判定
function isInsideHexagon(localX, localY, radius) {
  const ax = Math.abs(localX);
  const ay = Math.abs(localY);

  const hexHeight = radius * Math.sqrt(3) / 2;

  if (ay > hexHeight) return false;
  if (ax > radius) return false;
  if (ax + ay / Math.sqrt(3) > radius) return false;

  return true;
}

// 既存のシールドとの衝突判定
export function checkAutoShieldCollision(bulletPosition) {
  for (const shield of autoShields) {
    const localPos = bulletPosition.clone();
    shield.group.worldToLocal(localPos);

    const zDist = Math.abs(localPos.z);
    if (zDist > 0.1) continue;

    if (isInsideHexagon(localPos.x, localPos.y, AUTO_SHIELD_RADIUS)) {
      return shield;
    }
  }
  return null;
}

// シールドに衝撃を追加
export function addImpactToShield(shield, impactWorldPos) {
  const localPos = impactWorldPos.clone();
  shield.group.worldToLocal(localPos);

  const normalizedX = localPos.x / AUTO_SHIELD_RADIUS;
  const normalizedY = localPos.y / AUTO_SHIELD_RADIUS;

  const impactIndex = shield.impacts.length % 4;
  shield.impacts[impactIndex] = {
    x: normalizedX,
    y: normalizedY,
    progress: 0
  };

  shield.faceMaterial.uniforms.impactPoints.value[impactIndex].set(normalizedX, normalizedY);
  shield.faceMaterial.uniforms.impactProgresses.value[impactIndex] = 0;

  shield.timer = Math.max(shield.timer, AUTO_SHIELD_DURATION);

  shield.kickbackOffset = AUTO_SHIELD_KICKBACK_DISTANCE;

  console.log('シールドに衝撃追加！');
}

// 自動シールドを生成
export function spawnAutoShield(position, impactWorldPos) {
  const geometry = new THREE.CircleGeometry(AUTO_SHIELD_RADIUS, 6);

  const cameraPos = new THREE.Vector3();
  cameraRef.getWorldPosition(cameraPos);

  const shieldGroup = new THREE.Group();
  shieldGroup.position.copy(position);
  shieldGroup.lookAt(cameraPos);

  const localImpact = impactWorldPos.clone();
  shieldGroup.worldToLocal(localImpact);
  const normalizedX = localImpact.x / AUTO_SHIELD_RADIUS;
  const normalizedY = localImpact.y / AUTO_SHIELD_RADIUS;

  const material = new THREE.ShaderMaterial({
    uniforms: {
      time: { value: 0 },
      impactPoints: { value: [
        new THREE.Vector2(normalizedX, normalizedY),
        new THREE.Vector2(0, 0),
        new THREE.Vector2(0, 0),
        new THREE.Vector2(0, 0)
      ]},
      impactProgresses: { value: [0, -1, -1, -1] },
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
        vec3 color = baseColor;
        float alpha = 0.6;

        for (int i = 0; i < 4; i++) {
          float progress = impactProgresses[i];
          if (progress < 0.0) continue;

          vec2 impactPoint = impactPoints[i];
          float distFromImpact = length(vPos - impactPoint);

          float waveWidth = 0.2;

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

  sceneRef.add(shieldGroup);

  autoShields.push({
    group: shieldGroup,
    shieldMesh: shieldMesh,
    faceMaterial: material,
    lineMaterial: lineMaterial,
    edgeGeometry: edgeGeometry,
    timer: AUTO_SHIELD_DURATION,
    impacts: [{ x: normalizedX, y: normalizedY, progress: 0 }],
    kickbackOffset: AUTO_SHIELD_KICKBACK_DISTANCE,
    originalPosition: position.clone(),
    fadeProgress: 1.0
  });

  console.log('自動シールド発動！');
}

// 自動シールドを更新
export function updateAutoShields(deltaTime) {
  const cameraPos = new THREE.Vector3();
  cameraRef.getWorldPosition(cameraPos);

  autoShields.forEach(shield => {
    shield.timer -= deltaTime;

    if (shield.impacts) {
      for (let i = 0; i < shield.impacts.length; i++) {
        const impact = shield.impacts[i];
        if (impact.progress < 2.0) {
          impact.progress += deltaTime * 2.5;
          shield.faceMaterial.uniforms.impactProgresses.value[i] = impact.progress;
        }
      }
    }

    if (shield.kickbackOffset > 0) {
      const kickbackDirection = new THREE.Vector3()
        .subVectors(shield.originalPosition, cameraPos)
        .normalize();

      shield.group.position.copy(shield.originalPosition)
        .add(kickbackDirection.multiplyScalar(shield.kickbackOffset));

      shield.kickbackOffset -= deltaTime * AUTO_SHIELD_KICKBACK_SPEED * 0.1;
      if (shield.kickbackOffset < 0) {
        shield.kickbackOffset = 0;
        shield.group.position.copy(shield.originalPosition);
      }
    }

    if (shield.timer < 0.5) {
      const targetProgress = 0;
      shield.fadeProgress += (targetProgress - shield.fadeProgress) * 0.1;

      const scale = shield.fadeProgress;
      shield.shieldMesh.scale.set(scale, scale, 1);

      shield.faceMaterial.uniforms.baseColor.value.setRGB(
        0.53 * shield.fadeProgress, 1.0 * shield.fadeProgress, 0.8 * shield.fadeProgress
      );
      shield.lineMaterial.opacity = 0.9 * shield.fadeProgress;
    }

    if (shield.timer <= 0 || shield.fadeProgress < 0.01) {
      sceneRef.remove(shield.group);
      shield.faceMaterial.dispose();
      shield.lineMaterial.dispose();
      if (shield.edgeGeometry) {
        shield.edgeGeometry.dispose();
      }
      if (shield.shieldMesh && shield.shieldMesh.geometry) {
        shield.shieldMesh.geometry.dispose();
      }
      shield.timer = 0;
    }
  });

  autoShields = autoShields.filter(shield => shield.timer > 0);
}

// 自動シールドをクリーンアップ
export function cleanupAutoShields() {
  autoShields.forEach(shield => {
    sceneRef.remove(shield.group);
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

// 定数エクスポート
export { AUTO_SHIELD_DISTANCE, AUTO_SHIELD_DURATION, AUTO_SHIELD_RADIUS };
