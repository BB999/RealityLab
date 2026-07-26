import * as THREE from 'three';

// レーザーポインター用変数
let rightLaser = null;
let leftLaser = null;
let laserShowTime = { left: 0, right: 0 };
let wasTriggerPressed = { left: false, right: false };
const LASER_DISPLAY_DURATION = 10000; // 10秒

const LASER_LENGTH = 3;
const LASER_COLOR = new THREE.Vector3(0.04, 0.52, 1.0); // Apple blue (#0A84FF)

/**
 * ガラスの筒として描く光線。
 * 単色の LineBasicMaterial だと linewidth が効かず 1px の線になるので、
 * テーパーの付いたシリンダーに置き換えている。フレネルで輪郭だけが強く光り、
 * 中を透かして向こう側の壁が見える＝ガラス棒に見える、という組み立て。
 */
const BEAM_VERT = /* glsl */ `
  varying vec2 vUvw;
  varying vec3 vNormalView;
  varying vec3 vViewDir;

  void main() {
    vUvw = uv;
    vNormalView = normalize(normalMatrix * normal);
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vViewDir = normalize(-mv.xyz);
    gl_Position = projectionMatrix * mv;
  }
`;

const BEAM_FRAG = /* glsl */ `
  precision highp float;

  uniform vec3  uColor;
  uniform float uTime;
  uniform float uOpacity;

  varying vec2 vUvw;
  varying vec3 vNormalView;
  varying vec3 vViewDir;

  void main() {
    // 筒のシルエット側ほど厚みを通って見えるので、そこだけ強く光らせる
    float fres = pow(1.0 - abs(dot(normalize(vNormalView), normalize(vViewDir))), 2.2);

    // 根元は少し詰めて、先端に向かって溶けるように消す
    float fadeIn  = smoothstep(0.0, 0.03, vUvw.y);
    float fadeOut = 1.0 - smoothstep(0.18, 1.0, vUvw.y);
    float fade = fadeIn * fadeOut;

    // 進行方向に流れる微かなきらめき
    float flow = 0.5 + 0.5 * sin(vUvw.y * 30.0 - uTime * 6.5);

    vec3 col = mix(uColor, vec3(1.0), fres * 0.65 + flow * 0.08);
    float a = (0.07 + fres * 0.62 + flow * 0.04) * fade * uOpacity;

    if (a < 0.004) discard;
    gl_FragColor = vec4(col, a);
  }
`;

const CORE_VERT = /* glsl */ `
  varying vec2 vUvw;
  void main() {
    vUvw = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const CORE_FRAG = /* glsl */ `
  precision highp float;

  uniform vec3  uColor;
  uniform float uTime;

  varying vec2 vUvw;

  void main() {
    float fadeIn  = smoothstep(0.0, 0.02, vUvw.y);
    float fadeOut = pow(1.0 - smoothstep(0.02, 0.7, vUvw.y), 1.6);
    float pulse = 0.75 + 0.25 * sin(vUvw.y * 22.0 - uTime * 6.5);
    float a = fadeIn * fadeOut * pulse * 0.85;
    gl_FragColor = vec4(mix(uColor, vec3(1.0), 0.7), a);
  }
`;

// 根元のビーズ（ビームが湧き出す一点）
const BEAD_FRAG = /* glsl */ `
  precision highp float;

  uniform vec3  uColor;
  uniform float uTime;

  varying vec2 vUvw;

  void main() {
    float d = length(vUvw - 0.5) * 2.0;
    float core = pow(max(1.0 - d, 0.0), 2.2);
    float halo = pow(max(1.0 - d, 0.0), 0.7) * 0.35;
    float breathe = 0.85 + 0.15 * sin(uTime * 3.0);
    float a = (core + halo) * breathe;
    if (a < 0.004) discard;
    gl_FragColor = vec4(mix(uColor, vec3(1.0), core * 0.85), a);
  }
`;

// レーザーポインターを作成
export function createLaser() {
  const group = new THREE.Group();
  // isLaserVisibleForController がこの印を見て判定する
  group.userData.isLaser = true;

  const timeUniform = { value: 0 };

  // --- ガラスの鞘 ---------------------------------------------------------
  const beamGeometry = new THREE.CylinderGeometry(0.0014, 0.0044, LASER_LENGTH, 18, 1, true);
  beamGeometry.rotateX(-Math.PI / 2);           // +Y を -Z へ向ける
  beamGeometry.translate(0, 0, -LASER_LENGTH / 2);

  const beamMaterial = new THREE.ShaderMaterial({
    uniforms: {
      uColor: { value: LASER_COLOR.clone() },
      uTime: timeUniform,
      uOpacity: { value: 1 }
    },
    vertexShader: BEAM_VERT,
    fragmentShader: BEAM_FRAG,
    transparent: true,
    depthWrite: false,
    // 手前と奥の壁を両方通すことで筒の厚みが出る
    side: THREE.DoubleSide
  });
  const beam = new THREE.Mesh(beamGeometry, beamMaterial);
  beam.renderOrder = 20;
  beam.raycast = () => {};
  group.add(beam);

  // --- 発光するコア -------------------------------------------------------
  const coreGeometry = new THREE.CylinderGeometry(0.0004, 0.0013, LASER_LENGTH, 10, 1, true);
  coreGeometry.rotateX(-Math.PI / 2);
  coreGeometry.translate(0, 0, -LASER_LENGTH / 2);

  const coreMaterial = new THREE.ShaderMaterial({
    uniforms: {
      uColor: { value: LASER_COLOR.clone() },
      uTime: timeUniform
    },
    vertexShader: CORE_VERT,
    fragmentShader: CORE_FRAG,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    side: THREE.DoubleSide
  });
  const core = new THREE.Mesh(coreGeometry, coreMaterial);
  core.renderOrder = 21;
  core.raycast = () => {};
  group.add(core);

  // --- 根元のビーズ -------------------------------------------------------
  const beadMaterial = new THREE.ShaderMaterial({
    uniforms: {
      uColor: { value: LASER_COLOR.clone() },
      uTime: timeUniform
    },
    vertexShader: CORE_VERT,
    fragmentShader: BEAD_FRAG,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    side: THREE.DoubleSide
  });
  const bead = new THREE.Mesh(new THREE.PlaneGeometry(0.016, 0.016), beadMaterial);
  bead.position.z = -0.006;
  bead.renderOrder = 22;
  bead.raycast = () => {};
  // 平面の法線は +Z。コントローラーは -Z 方向を指しているので、
  // 何もしなくてもビーズは常に使用者の方を向く（ビルボード処理は不要）
  group.add(bead);

  // 3つのシェーダーで同じ時間を共有する
  beam.onBeforeRender = () => {
    timeUniform.value = performance.now() * 0.001;
  };

  group.visible = false; // 初期状態は非表示
  return group;
}

// トリガーボタンの状態を取得
export function isTriggerPressed(inputSource) {
  if (!inputSource || !inputSource.gamepad) return false;

  const buttons = inputSource.gamepad.buttons;
  // トリガーはbuttons[0]
  if (buttons && buttons.length > 0) {
    return buttons[0].pressed || buttons[0].value > 0.5;
  }
  return false;
}

// レーザーの表示状態を更新
export function updateLaserVisibility(xrSession) {
  if (!xrSession) return;

  const inputSources = xrSession.inputSources;
  if (!inputSources) return;

  const now = Date.now();

  for (const inputSource of inputSources) {
    if (inputSource.targetRayMode !== 'tracked-pointer') continue;

    const triggerPressed = isTriggerPressed(inputSource);
    const handedness = inputSource.handedness;
    if (!handedness) continue;

    // トリガーを押した瞬間にタイマーをセット
    if (triggerPressed && !wasTriggerPressed[handedness]) {
      laserShowTime[handedness] = now;
    }
    wasTriggerPressed[handedness] = triggerPressed;
  }

  // 5秒以内なら表示
  // 左右逆に修正（コントローラーの割り当てが逆のため）
  if (leftLaser) {
    leftLaser.visible = (now - laserShowTime.right) < LASER_DISPLAY_DURATION;
  }
  if (rightLaser) {
    rightLaser.visible = (now - laserShowTime.left) < LASER_DISPLAY_DURATION;
  }
}

// レーザーを設定
export function setLasers(left, right) {
  leftLaser = left;
  rightLaser = right;
}

// レーザーを取得
export function getLasers() {
  return { leftLaser, rightLaser };
}

// どちらかのレーザーが表示されているか
export function isAnyLaserVisible() {
  return (leftLaser && leftLaser.visible) || (rightLaser && rightLaser.visible);
}

// 指定したコントローラーのレーザーが表示されているか
export function isLaserVisibleForController(controller) {
  if (!controller) return false;
  // コントローラーの子要素にレーザーがあるかチェック
  let laserVisible = false;
  controller.traverse((child) => {
    if (child.userData && child.userData.isLaser && child.visible) {
      laserVisible = true;
    }
  });
  return laserVisible;
}

// inputSourceのhandednessでレーザーが表示されているか判定
export function isLaserVisibleForHandedness(handedness) {
  if (!handedness) return false;
  // 左右逆（コントローラーの割り当てが逆のため）
  if (handedness === 'left') {
    return rightLaser && rightLaser.visible;
  } else if (handedness === 'right') {
    return leftLaser && leftLaser.visible;
  }
  return false;
}
