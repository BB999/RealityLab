import * as THREE from 'three';

// 美しい星空の生成
export function createStarField() {
  const starGroup = new THREE.Group();

  // 大量の星を生成
  const starCount = 15000;
  const positions = new Float32Array(starCount * 3);
  const colors = new Float32Array(starCount * 3);
  const sizes = new Float32Array(starCount);

  for (let i = 0; i < starCount; i++) {
    // ランダムな位置（球状に配置）
    const radius = 1000 + Math.random() * 4000;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);

    positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = radius * Math.cos(phi);

    // 星の色（白、青白、黄色、オレンジなど）
    const colorType = Math.random();
    if (colorType < 0.7) {
      // 白い星
      colors[i * 3] = 1;
      colors[i * 3 + 1] = 1;
      colors[i * 3 + 2] = 1;
    } else if (colorType < 0.85) {
      // 青白い星
      colors[i * 3] = 0.8;
      colors[i * 3 + 1] = 0.9;
      colors[i * 3 + 2] = 1;
    } else if (colorType < 0.95) {
      // 黄色い星
      colors[i * 3] = 1;
      colors[i * 3 + 1] = 0.95;
      colors[i * 3 + 2] = 0.7;
    } else {
      // オレンジ/赤い星
      colors[i * 3] = 1;
      colors[i * 3 + 1] = 0.7;
      colors[i * 3 + 2] = 0.5;
    }

    // 星のサイズ（ランダム、いくつかは大きく明るい）
    const sizeFactor = Math.random();
    if (sizeFactor > 0.95) {
      sizes[i] = 3 + Math.random() * 4; // 明るい星
    } else {
      sizes[i] = 0.5 + Math.random() * 2; // 通常の星
    }
  }

  const starGeometry = new THREE.BufferGeometry();
  starGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  starGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  starGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

  // カスタムシェーダーで美しい星を描画
  const starMaterial = new THREE.ShaderMaterial({
    uniforms: {
      time: { value: 0 },
    },
    vertexShader: `
      attribute float size;
      attribute vec3 color;
      varying vec3 vColor;

      void main() {
        vColor = color;
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        gl_PointSize = size * (300.0 / -mvPosition.z);
        gl_Position = projectionMatrix * mvPosition;
      }
    `,
    fragmentShader: `
      uniform float time;
      varying vec3 vColor;

      void main() {
        // 円形の星を描画
        vec2 center = gl_PointCoord - vec2(0.5);
        float dist = length(center);

        if (dist > 0.5) {
          discard;
        }

        // 中心が明るく、端に行くほど暗くなる
        float brightness = 1.0 - (dist * 2.0);
        brightness = pow(brightness, 2.0);

        // 時々きらめく効果
        float twinkle = sin(time * 2.0 + gl_FragCoord.x * 0.1 + gl_FragCoord.y * 0.1) * 0.2 + 0.8;
        brightness *= twinkle;

        gl_FragColor = vec4(vColor * brightness, brightness);
      }
    `,
    transparent: true,
    vertexColors: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });

  const stars = new THREE.Points(starGeometry, starMaterial);
  starGroup.add(stars);

  // 天の川風の明るい星の帯を追加
  const milkyWayCount = 5000;
  const milkyWayPositions = new Float32Array(milkyWayCount * 3);
  const milkyWayColors = new Float32Array(milkyWayCount * 3);
  const milkyWaySizes = new Float32Array(milkyWayCount);

  for (let i = 0; i < milkyWayCount; i++) {
    // 帯状に配置
    const angle = (Math.random() - 0.5) * Math.PI * 2;
    const spread = (Math.random() - 0.5) * 200;
    const radius = 2000 + Math.random() * 2000;

    milkyWayPositions[i * 3] = Math.cos(angle) * radius + spread;
    milkyWayPositions[i * 3 + 1] = (Math.random() - 0.5) * 100 + spread * 0.5;
    milkyWayPositions[i * 3 + 2] = Math.sin(angle) * radius + spread;

    // やや青白い色
    milkyWayColors[i * 3] = 0.9;
    milkyWayColors[i * 3 + 1] = 0.95;
    milkyWayColors[i * 3 + 2] = 1;

    milkyWaySizes[i] = 0.8 + Math.random() * 1.5;
  }

  const milkyWayGeometry = new THREE.BufferGeometry();
  milkyWayGeometry.setAttribute('position', new THREE.BufferAttribute(milkyWayPositions, 3));
  milkyWayGeometry.setAttribute('color', new THREE.BufferAttribute(milkyWayColors, 3));
  milkyWayGeometry.setAttribute('size', new THREE.BufferAttribute(milkyWaySizes, 1));

  const milkyWay = new THREE.Points(milkyWayGeometry, starMaterial);
  milkyWay.rotation.x = Math.PI / 6;
  starGroup.add(milkyWay);

  return starGroup;
}
