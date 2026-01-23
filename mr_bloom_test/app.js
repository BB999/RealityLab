import * as THREE from 'three';

let scene, camera, renderer, box, glowSprite;
let glowObjects = []; // 複数のグローオブジェクト
let xrSession = null;
let rightController = null;
let leftController = null;
let boxPositioned = false;

// グラブ関連
let isGrabbing = false;
let grabbingController = null;
let grabbedObject = null;
let grabOffset = new THREE.Vector3();

// 深度センサー用変数
let depthDataTexture = null;
let depthMesh = null;
let showDepthVisualization = false;

// VR用背景とグリッド
let vrBackground = null;
let gridHelper = null;

// ハンドトラッキング用変数
let hand1 = null;
let hand2 = null;

// グローテクスチャ
let glowTexture = null;

// グローテクスチャを生成（色指定可能）
function createGlowTexture(r = 0, g = 255, b = 136) {
  const size = 256;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');

  // ラジアルグラデーションでグロー効果
  const gradient = ctx.createRadialGradient(
    size / 2, size / 2, 0,
    size / 2, size / 2, size / 2
  );
  gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, 1)`);
  gradient.addColorStop(0.2, `rgba(${r}, ${g}, ${b}, 0.8)`);
  gradient.addColorStop(0.4, `rgba(${r}, ${g}, ${b}, 0.4)`);
  gradient.addColorStop(0.6, `rgba(${r}, ${g}, ${b}, 0.15)`);
  gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);

  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}

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
  camera.position.set(0, 0, 0);

  // レンダラー作成
  renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    powerPreference: 'high-performance'
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.xr.enabled = true;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.5;
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  const appDiv = document.getElementById('app');
  appDiv.appendChild(renderer.domElement);

  // グローテクスチャを作成
  glowTexture = createGlowTexture();

  // ライト設定
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.3);
  directionalLight.position.set(1, 1, 1);
  scene.add(directionalLight);

  // ボックスを作成
  createBox();

  // リサイズ対応
  window.addEventListener('resize', onWindowResize);

  // アニメーションループ
  renderer.setAnimationLoop(animate);
}

// グローを作成（色とサイズ、位置を指定）
function createGlow(color, r, g, b, position, baseScale = 0.4, pulseSpeed = 0.003) {
  const glowGroup = new THREE.Group();
  glowGroup.userData.pulseSpeed = pulseSpeed;
  glowGroup.userData.baseScale = baseScale;

  const texture = createGlowTexture(r, g, b);

  // グロースプライト（オーラ効果）
  const spriteMaterial = new THREE.SpriteMaterial({
    map: texture,
    color: color,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  });

  const sprite1 = new THREE.Sprite(spriteMaterial);
  sprite1.scale.set(baseScale, baseScale, baseScale);
  glowGroup.add(sprite1);

  // 追加のグロー層
  const sprite2 = new THREE.Sprite(spriteMaterial.clone());
  sprite2.material.opacity = 0.5;
  sprite2.scale.set(baseScale * 1.4, baseScale * 1.4, baseScale * 1.4);
  glowGroup.add(sprite2);

  const sprite3 = new THREE.Sprite(spriteMaterial.clone());
  sprite3.material.opacity = 0.3;
  sprite3.scale.set(baseScale * 1.8, baseScale * 1.8, baseScale * 1.8);
  glowGroup.add(sprite3);

  glowGroup.position.copy(position);
  scene.add(glowGroup);

  return glowGroup;
}

// 全てのグローを作成
function createBox() {
  // 緑（元のやつ）
  box = createGlow(0x00ff88, 0, 255, 136, new THREE.Vector3(0, 0, -2), 0.4, 0.003);
  glowObjects.push(box);

  // 青（パルス速め）
  const blueGlow = createGlow(0x00aaff, 0, 170, 255, new THREE.Vector3(-0.5, 0.3, -2), 0.35, 0.005);
  glowObjects.push(blueGlow);

  // ピンク（大きめ）
  const pinkGlow = createGlow(0xff66aa, 255, 102, 170, new THREE.Vector3(0.5, 0.2, -2), 0.5, 0.004);
  glowObjects.push(pinkGlow);

  // オレンジ（小さめ、速いパルス）
  const orangeGlow = createGlow(0xffaa00, 255, 170, 0, new THREE.Vector3(0, -0.3, -1.8), 0.3, 0.006);
  glowObjects.push(orangeGlow);
}

// 深度可視化用のメッシュを作成
function createDepthVisualizationMesh() {
  const geometry = new THREE.PlaneGeometry(2, 2, 128, 128);
  const material = new THREE.ShaderMaterial({
    uniforms: {
      depthTexture: { value: null },
      depthWidth: { value: 0 },
      depthHeight: { value: 0 },
      rawValueToMeters: { value: 0 },
      maxDistance: { value: 5.0 }
    },
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform sampler2D depthTexture;
      uniform float rawValueToMeters;
      uniform float maxDistance;
      varying vec2 vUv;

      vec3 depthToColor(float depth) {
        float normalizedDepth = clamp(depth / maxDistance, 0.0, 1.0);
        vec3 nearColor = vec3(1.0, 0.0, 0.0);
        vec3 midColor = vec3(1.0, 1.0, 0.0);
        vec3 farColor = vec3(0.0, 0.0, 1.0);

        if (normalizedDepth < 0.5) {
          return mix(nearColor, midColor, normalizedDepth * 2.0);
        } else {
          return mix(midColor, farColor, (normalizedDepth - 0.5) * 2.0);
        }
      }

      void main() {
        vec4 depthData = texture2D(depthTexture, vUv);
        float rawDepth = depthData.r + depthData.g * 256.0;
        float depthInMeters = rawDepth * rawValueToMeters;

        if (depthInMeters <= 0.0 || depthInMeters > maxDistance) {
          gl_FragColor = vec4(0.0, 0.0, 0.0, 0.3);
        } else {
          vec3 color = depthToColor(depthInMeters);
          gl_FragColor = vec4(color, 0.7);
        }
      }
    `,
    transparent: true,
    side: THREE.DoubleSide
  });

  depthMesh = new THREE.Mesh(geometry, material);
  depthMesh.position.set(0, 1.5, -2);
  depthMesh.visible = showDepthVisualization;
  scene.add(depthMesh);
}

// 深度情報を更新
function updateDepthInfo(frame, referenceSpace) {
  if (!showDepthVisualization) {
    if (depthMesh) {
      depthMesh.visible = false;
    }
    return;
  }

  const viewerPose = frame.getViewerPose(referenceSpace);
  if (!viewerPose) return;

  for (const view of viewerPose.views) {
    if (view.camera) {
      const depthInfo = frame.getDepthInformation(view);
      if (depthInfo) {
        if (!depthMesh) {
          createDepthVisualizationMesh();
        }

        const depthData = new Uint8Array(depthInfo.data);
        if (!depthDataTexture ||
            depthDataTexture.image.width !== depthInfo.width ||
            depthDataTexture.image.height !== depthInfo.height) {
          depthDataTexture = new THREE.DataTexture(
            depthData,
            depthInfo.width,
            depthInfo.height,
            THREE.LuminanceAlphaFormat,
            THREE.UnsignedByteType
          );
        } else {
          depthDataTexture.image.data.set(depthData);
        }
        depthDataTexture.needsUpdate = true;

        depthMesh.material.uniforms.depthTexture.value = depthDataTexture;
        depthMesh.material.uniforms.depthWidth.value = depthInfo.width;
        depthMesh.material.uniforms.depthHeight.value = depthInfo.height;
        depthMesh.material.uniforms.rawValueToMeters.value = depthInfo.rawValueToMeters;

        const cameraPosition = new THREE.Vector3();
        const cameraQuaternion = new THREE.Quaternion();
        camera.getWorldPosition(cameraPosition);
        camera.getWorldQuaternion(cameraQuaternion);

        const forward = new THREE.Vector3(0, 0, -1.5);
        forward.applyQuaternion(cameraQuaternion);
        depthMesh.position.copy(cameraPosition).add(forward);
        depthMesh.quaternion.copy(cameraQuaternion);

        depthMesh.visible = true;
        break;
      }
    }
  }
}

// VR環境を作成
function createVREnvironment() {
  vrBackground = new THREE.Color(0x1a1a2e);
  scene.background = vrBackground;

  gridHelper = new THREE.GridHelper(20, 20, 0x444444, 0x222222);
  gridHelper.position.y = 0;
  scene.add(gridHelper);
}

// VR環境を削除
function removeVREnvironment() {
  scene.background = null;
  if (gridHelper) {
    scene.remove(gridHelper);
    gridHelper = null;
  }
  vrBackground = null;
}

// コントローラーのグリップ設定
function setupControllerGrip(controller, index) {
  // squeezeイベント（グリップボタン）のみ使用
  controller.addEventListener('squeezestart', () => {
    if (!isGrabbing) {
      const controllerPos = new THREE.Vector3();
      controller.getWorldPosition(controllerPos);

      // 一番近いグローオブジェクトを探す
      let closestObj = null;
      let closestDist = 0.3; // 0.3m以内

      for (const obj of glowObjects) {
        const dist = controllerPos.distanceTo(obj.position);
        if (dist < closestDist) {
          closestDist = dist;
          closestObj = obj;
        }
      }

      if (closestObj) {
        isGrabbing = true;
        grabbingController = controller;
        grabbedObject = closestObj;
        grabOffset.copy(closestObj.position).sub(controllerPos);
      }
    }
  });

  controller.addEventListener('squeezeend', () => {
    if (isGrabbing && grabbingController === controller) {
      isGrabbing = false;
      grabbingController = null;
      grabbedObject = null;
    }
  });
}

// アニメーションループ
function animate(timestamp, frame) {
  // 各グローオブジェクトのパルス効果
  for (const obj of glowObjects) {
    const pulseSpeed = obj.userData.pulseSpeed || 0.003;
    const baseScale = obj.userData.baseScale || 0.4;
    const pulse = Math.sin(timestamp * pulseSpeed) * 0.15 + 1.0;

    obj.children.forEach((child, i) => {
      if (child.isSprite) {
        const scale = baseScale * (1 + i * 0.4) * pulse;
        child.scale.setScalar(scale);
      }
    });
  }

  // XRセッション中の処理
  if (frame && xrSession) {
    const referenceSpace = renderer.xr.getReferenceSpace();

    updateDepthInfo(frame, referenceSpace);

    // グラブ中はコントローラーに追従（オフセット維持）
    if (isGrabbing && grabbingController && grabbedObject) {
      const controllerPosition = new THREE.Vector3();
      grabbingController.getWorldPosition(controllerPosition);
      grabbedObject.position.copy(controllerPosition).add(grabOffset);
    }

    // 初期配置（全てのグローをユーザーの前に配置）
    if (!boxPositioned && glowObjects.length > 0 && rightController) {
      const controllerPosition = new THREE.Vector3();
      const controllerQuaternion = new THREE.Quaternion();
      rightController.getWorldPosition(controllerPosition);
      rightController.getWorldQuaternion(controllerQuaternion);

      if (controllerPosition.lengthSq() > 0) {
        // 各グローを配置
        const offsets = [
          new THREE.Vector3(0, 0, -0.5),      // 緑：正面
          new THREE.Vector3(-0.3, 0.2, -0.5), // 青：左上
          new THREE.Vector3(0.3, 0.2, -0.5),  // ピンク：右上
          new THREE.Vector3(0, -0.2, -0.4)    // オレンジ：下手前
        ];

        glowObjects.forEach((obj, i) => {
          const offset = offsets[i] || new THREE.Vector3(0, 0, -0.5);
          const rotatedOffset = offset.clone().applyQuaternion(controllerQuaternion);
          obj.position.copy(controllerPosition).add(rotatedOffset);
        });

        boxPositioned = true;
        console.log('グローをコントローラーの前に配置しました');
      }
    }
  }

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
        usagePreference: ['cpu-optimized', 'gpu-optimized'],
        dataFormatPreference: ['luminance-alpha', 'float32']
      }
    });

    await renderer.xr.setSession(xrSession);

    rightController = renderer.xr.getController(0);
    leftController = renderer.xr.getController(1);
    scene.add(rightController);
    scene.add(leftController);

    // コントローラーのグリップイベント設定
    setupControllerGrip(rightController, 0);
    setupControllerGrip(leftController, 1);

    hand1 = renderer.xr.getHand(0);
    hand2 = renderer.xr.getHand(1);
    scene.add(hand1);
    scene.add(hand2);

    boxPositioned = false;

    const button = document.getElementById('start-button');
    if (button) button.style.display = 'none';
    const vrButton = document.getElementById('vr-button');
    if (vrButton) vrButton.style.display = 'none';

    window.dispatchEvent(new Event('xr-session-start'));

    updateInfo('MRセッション開始');

    if (xrSession.depthUsage) {
      console.log('深度センサー有効:', xrSession.depthUsage);
      updateInfo('MRセッション開始 (深度センサー有効)');
    } else {
      console.log('深度センサー無効');
      updateInfo('MRセッション開始 (深度センサー無効)');
    }

    xrSession.addEventListener('end', () => {
      xrSession = null;

      if (depthMesh) {
        scene.remove(depthMesh);
        depthMesh = null;
      }
      depthDataTexture = null;

      window.dispatchEvent(new Event('xr-session-end'));

      updateInfo('MRセッション終了');
      if (button) button.style.display = 'block';
      if (vrButton) vrButton.style.display = 'block';
    });

  } catch (error) {
    console.error('XRセッション開始エラー:', error);
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

    createVREnvironment();

    rightController = renderer.xr.getController(0);
    leftController = renderer.xr.getController(1);
    scene.add(rightController);
    scene.add(leftController);

    // コントローラーのグリップイベント設定
    setupControllerGrip(rightController, 0);
    setupControllerGrip(leftController, 1);

    hand1 = renderer.xr.getHand(0);
    hand2 = renderer.xr.getHand(1);
    scene.add(hand1);
    scene.add(hand2);

    boxPositioned = false;

    const button = document.getElementById('start-button');
    if (button) button.style.display = 'none';
    const vrButton = document.getElementById('vr-button');
    if (vrButton) vrButton.style.display = 'none';

    window.dispatchEvent(new Event('xr-session-start'));

    updateInfo('VRセッション開始');

    xrSession.addEventListener('end', () => {
      xrSession = null;

      removeVREnvironment();

      window.dispatchEvent(new Event('xr-session-end'));

      updateInfo('VRセッション終了');
      if (button) button.style.display = 'block';
      if (vrButton) vrButton.style.display = 'block';
    });

  } catch (error) {
    console.error('VRセッション開始エラー:', error);
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
    showDepthVisualization = !showDepthVisualization;
    depthToggleButton.textContent = showDepthVisualization ? '深度表示 ON' : '深度表示 OFF';
    console.log('深度表示:', showDepthVisualization);
  });

  window.addEventListener('xr-session-start', () => {
    depthToggleButton.style.display = 'block';
  });

  window.addEventListener('xr-session-end', () => {
    depthToggleButton.style.display = 'none';
    showDepthVisualization = false;
    depthToggleButton.textContent = '深度表示 OFF';
  });
}
