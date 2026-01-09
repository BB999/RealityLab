import * as THREE from 'three';

let scene, camera, renderer;
let xrSession = null;
let rightController = null;
let leftController = null;

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

// 3Dテキストボックス用変数
let textPanel = null;
let textCanvas = null;
let textContext = null;
let textTexture = null;
let promptText = '';
let cursorVisible = true;
let cursorBlinkInterval = null;
let isTextInputActive = false;

// 生成ボタン用変数
let generateButton = null;
let generateButtonCanvas = null;
let generateButtonContext = null;
let generateButtonTexture = null;
let isButtonPressed = false;
let buttonPressTime = 0;

// パネルドラッグ用変数
let isDraggingPanel = false;
let draggingInputSource = null;
let dragOffset = new THREE.Vector3();
let panelInitialized = false;
let wasGripPressed = { left: false, right: false };

// レーザーポインター用変数
let rightLaser = null;
let leftLaser = null;
let laserShowTime = { left: 0, right: 0 };
let wasTriggerPressed = { left: false, right: false };
const LASER_DISPLAY_DURATION = 5000; // 5秒

// レーザーポインターを作成
function createLaser() {
  const geometry = new THREE.BufferGeometry().setFromPoints([
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(0, 0, -3)
  ]);
  const material = new THREE.LineBasicMaterial({
    color: 0x00ffff,
    linewidth: 2,
    transparent: true,
    opacity: 0.8
  });
  const laser = new THREE.Line(geometry, material);
  laser.visible = false; // 初期状態は非表示
  return laser;
}

// トリガーボタンの状態を取得
function isTriggerPressed(inputSource) {
  if (!inputSource || !inputSource.gamepad) return false;

  const buttons = inputSource.gamepad.buttons;
  // トリガーはbuttons[0]
  if (buttons && buttons.length > 0) {
    return buttons[0].pressed || buttons[0].value > 0.5;
  }
  return false;
}

// レーザーの表示状態を更新
function updateLaserVisibility() {
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

  // ボックスを作成
  createBox();

  // テキストパネルを作成
  createTextPanel();

  // キーボードイベントを設定
  setupKeyboardEvents();

  // リサイズ対応
  window.addEventListener('resize', onWindowResize);

  // アニメーションループ
  renderer.setAnimationLoop(animate);
}

// ボックスを作成（無効化）
function createBox() {
  // キューブは削除したので何もしない
}

// 3Dテキストパネルを作成
function createTextPanel() {
  // キャンバスを作成（テキスト描画用）
  textCanvas = document.createElement('canvas');
  textCanvas.width = 512;
  textCanvas.height = 64;
  textContext = textCanvas.getContext('2d');

  // テクスチャを作成
  textTexture = new THREE.CanvasTexture(textCanvas);
  textTexture.minFilter = THREE.LinearFilter;
  textTexture.magFilter = THREE.LinearFilter;

  // パネルのジオメトリとマテリアル
  const panelGeometry = new THREE.PlaneGeometry(0.4, 0.05);
  const panelMaterial = new THREE.MeshBasicMaterial({
    map: textTexture,
    transparent: true,
    side: THREE.DoubleSide
  });

  textPanel = new THREE.Mesh(panelGeometry, panelMaterial);
  textPanel.position.set(0, 1.2, -0.5);
  textPanel.visible = false;
  scene.add(textPanel);

  // 生成ボタンを作成
  createGenerateButton();

  // 初期描画
  updateTextCanvas();

  // カーソル点滅
  cursorBlinkInterval = setInterval(() => {
    if (isTextInputActive) {
      cursorVisible = !cursorVisible;
      updateTextCanvas();
    }
  }, 500);
}

// 生成ボタンを作成
function createGenerateButton() {
  // キャンバスを作成
  generateButtonCanvas = document.createElement('canvas');
  generateButtonCanvas.width = 128;
  generateButtonCanvas.height = 64;
  generateButtonContext = generateButtonCanvas.getContext('2d');

  // テクスチャを作成
  generateButtonTexture = new THREE.CanvasTexture(generateButtonCanvas);
  generateButtonTexture.minFilter = THREE.LinearFilter;
  generateButtonTexture.magFilter = THREE.LinearFilter;

  // ボタンのジオメトリとマテリアル
  const buttonGeometry = new THREE.PlaneGeometry(0.1, 0.05);
  const buttonMaterial = new THREE.MeshBasicMaterial({
    map: generateButtonTexture,
    transparent: true,
    side: THREE.DoubleSide
  });

  generateButton = new THREE.Mesh(buttonGeometry, buttonMaterial);
  generateButton.visible = false;
  scene.add(generateButton);

  // 初期描画
  updateGenerateButton();
}

// 生成ボタンを更新
function updateGenerateButton() {
  if (!generateButtonContext) return;

  const ctx = generateButtonContext;
  const width = generateButtonCanvas.width;
  const height = generateButtonCanvas.height;

  // 背景をクリア
  ctx.clearRect(0, 0, width, height);

  // ボタンの色（押されているかどうかで変化）
  const scale = isButtonPressed ? 0.95 : 1.0;
  const bgColor = isButtonPressed ? '#45a049' : '#4CAF50';

  // 背景を描画
  ctx.fillStyle = bgColor;
  ctx.beginPath();
  ctx.roundRect(0, 0, width, height, 8);
  ctx.fill();

  // 枠線
  ctx.strokeStyle = '#2E7D32';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.roundRect(1, 1, width - 2, height - 2, 7);
  ctx.stroke();

  // テキスト
  ctx.font = 'bold 20px system-ui, sans-serif';
  ctx.fillStyle = '#ffffff';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('Generate', width / 2, height / 2);

  // テクスチャを更新
  if (generateButtonTexture) {
    generateButtonTexture.needsUpdate = true;
  }
}

// ボタンを押したアニメーション
function pressGenerateButton() {
  isButtonPressed = true;
  buttonPressTime = Date.now();
  updateGenerateButton();

  // ボタンを少し縮小
  if (generateButton) {
    generateButton.scale.set(0.9, 0.9, 1);
  }

  // 200ms後に元に戻す
  setTimeout(() => {
    isButtonPressed = false;
    updateGenerateButton();
    if (generateButton) {
      generateButton.scale.set(1, 1, 1);
    }
    // プロンプトを送信
    submitPrompt();
  }, 200);
}

// テキストキャンバスを更新
function updateTextCanvas() {
  if (!textContext) return;

  const ctx = textContext;
  const width = textCanvas.width;
  const height = textCanvas.height;

  // 背景をクリア
  ctx.clearRect(0, 0, width, height);

  // 背景を描画（不透明の濃いグレー - MRで見やすく）
  ctx.fillStyle = 'rgba(30, 30, 40, 0.95)';
  ctx.beginPath();
  ctx.roundRect(0, 0, width, height, 8);
  ctx.fill();

  // 枠線を描画（明るい色で目立つように）
  ctx.strokeStyle = isTextInputActive ? '#4CAF50' : '#AAAAAA';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.roundRect(1, 1, width - 2, height - 2, 7);
  ctx.stroke();

  // プレースホルダーまたはテキストを描画
  ctx.font = 'bold 24px system-ui, sans-serif';
  ctx.textBaseline = 'middle';

  if (promptText.length === 0 && !isTextInputActive) {
    ctx.fillStyle = '#888888';
    ctx.fillText('✨ プロンプトを入力...', 10, height / 2);
  } else {
    ctx.fillStyle = '#ffffff';
    const displayText = promptText + (cursorVisible && isTextInputActive ? '|' : '');

    // テキストが長すぎる場合は省略
    const maxWidth = width - 20;
    let text = displayText;
    while (ctx.measureText(text).width > maxWidth && text.length > 0) {
      text = text.substring(1);
    }
    ctx.fillText(text, 10, height / 2);
  }

  // テクスチャを更新
  if (textTexture) {
    textTexture.needsUpdate = true;
  }
}

// テキスト入力を開始
function startTextInput() {
  isTextInputActive = true;
  promptText = '';
  cursorVisible = true;
  updateTextCanvas();

  // テキストパネルを表示（初期化フラグをリセット）
  if (textPanel) {
    textPanel.visible = true;
    panelInitialized = false; // 次回表示時にカメラの前に再配置
    console.log('テキスト入力開始 - パネル表示:', textPanel.visible, 'panelInitialized:', panelInitialized);
  } else {
    console.error('textPanelが存在しません');
  }

  // 生成ボタンを表示
  if (generateButton) {
    generateButton.visible = true;
  }

  // ボタンの状態を更新
  const promptToggleButton = document.getElementById('prompt-toggle');
  if (promptToggleButton) {
    promptToggleButton.classList.add('active');
    promptToggleButton.textContent = '❌ 入力を閉じる';
  }
}

// テキスト入力を終了
function stopTextInput() {
  isTextInputActive = false;
  cursorVisible = false;
  updateTextCanvas();

  // 生成ボタンを非表示
  if (generateButton) {
    generateButton.visible = false;
  }

  // ボタンの状態を更新
  const promptToggleButton = document.getElementById('prompt-toggle');
  if (promptToggleButton) {
    promptToggleButton.classList.remove('active');
    promptToggleButton.textContent = '✨ プロンプト入力';
  }
}

// プロンプトを送信（エフェクト生成用 - 後で実装）
function submitPrompt() {
  if (promptText.trim().length === 0) return;

  console.log('プロンプト送信:', promptText);
  updateInfo('プロンプト: ' + promptText);

  // TODO: ここでAIにプロンプトを送信し、エフェクトを生成する

  stopTextInput();
}

// キーボードイベントを設定
function setupKeyboardEvents() {
  document.addEventListener('keydown', (event) => {
    // Tabキーでテキスト入力を開始/終了
    if (event.key === 'Tab') {
      event.preventDefault();
      if (isTextInputActive) {
        stopTextInput();
      } else {
        startTextInput();
      }
      return;
    }

    // テキスト入力がアクティブでない場合は無視
    if (!isTextInputActive) return;

    // Escapeでキャンセル
    if (event.key === 'Escape') {
      stopTextInput();
      return;
    }

    // Enterで送信
    if (event.key === 'Enter') {
      submitPrompt();
      return;
    }

    // Backspaceで1文字削除
    if (event.key === 'Backspace') {
      event.preventDefault();
      promptText = promptText.slice(0, -1);
      updateTextCanvas();
      return;
    }

    // 通常の文字入力
    if (event.key.length === 1 && !event.ctrlKey && !event.metaKey) {
      promptText += event.key;
      updateTextCanvas();
    }
  });

  // IME入力対応（日本語など）
  document.addEventListener('compositionend', (event) => {
    if (isTextInputActive && event.data) {
      promptText += event.data;
      updateTextCanvas();
    }
  });
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

        // 深度データをテクスチャに変換
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

        // シェーダーのuniformを更新
        depthMesh.material.uniforms.depthTexture.value = depthDataTexture;
        depthMesh.material.uniforms.depthWidth.value = depthInfo.width;
        depthMesh.material.uniforms.depthHeight.value = depthInfo.height;
        depthMesh.material.uniforms.rawValueToMeters.value = depthInfo.rawValueToMeters;

        // 深度メッシュをカメラの前に配置
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
  // 背景色を設定
  vrBackground = new THREE.Color(0x1a1a2e);
  scene.background = vrBackground;

  // グリッドヘルパーを追加
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

// テキストパネルを初期位置（カメラの前）に配置
function initializeTextPanelPosition(frame, referenceSpace) {
  if (!textPanel || panelInitialized) return;

  let cameraPosition = new THREE.Vector3();
  let cameraQuaternion = new THREE.Quaternion();

  if (xrSession && frame && referenceSpace) {
    // XRセッション中はviewerPoseから位置を取得
    const viewerPose = frame.getViewerPose(referenceSpace);
    if (viewerPose) {
      const transform = viewerPose.transform;
      cameraPosition.set(
        transform.position.x,
        transform.position.y,
        transform.position.z
      );
      cameraQuaternion.set(
        transform.orientation.x,
        transform.orientation.y,
        transform.orientation.z,
        transform.orientation.w
      );
    } else {
      // viewerPoseが取得できなければ次のフレームで再試行
      return;
    }
  } else {
    cameraPosition.copy(camera.position);
    cameraQuaternion.copy(camera.quaternion);
  }

  // カメラの前方0.5mにパネルを配置（少し下に）
  const forward = new THREE.Vector3(0, -0.1, -0.5);
  forward.applyQuaternion(cameraQuaternion);
  textPanel.position.copy(cameraPosition).add(forward);

  // パネルをカメラに向ける
  textPanel.quaternion.copy(cameraQuaternion);

  // 生成ボタンをパネルの右側に配置
  updateGenerateButtonPosition();

  console.log('テキストパネルを配置:', textPanel.position);
  panelInitialized = true;
}

// 生成ボタンの位置を更新（パネルの右側）
function updateGenerateButtonPosition() {
  if (!generateButton || !textPanel) return;

  // パネルの右側に配置（パネル幅0.4の半分 + ボタン幅0.1の半分 + 少し隙間）
  const offset = new THREE.Vector3(0.26, 0, 0);
  offset.applyQuaternion(textPanel.quaternion);

  generateButton.position.copy(textPanel.position).add(offset);
  generateButton.quaternion.copy(textPanel.quaternion);
}

// コントローラーの位置を取得
function getControllerPosition(controller) {
  if (!controller) return null;
  const position = new THREE.Vector3();
  controller.getWorldPosition(position);
  return position;
}

// 当たり判定のサイズ（パネルサイズに合わせる: 0.4 x 0.05）
const COLLISION_SIZE = { x: 0.5, y: 0.1, z: 0.1 };

// パネルとの当たり判定（ボックス）
function checkPanelCollision(controllerPosition) {
  if (!textPanel || !controllerPosition) return false;

  // パネルのローカル座標系に変換
  const localPos = controllerPosition.clone();
  textPanel.worldToLocal(localPos);

  // ボックス内かどうかチェック
  const halfX = COLLISION_SIZE.x / 2;
  const halfY = COLLISION_SIZE.y / 2;
  const halfZ = COLLISION_SIZE.z / 2;

  return Math.abs(localPos.x) < halfX &&
         Math.abs(localPos.y) < halfY &&
         Math.abs(localPos.z) < halfZ;
}

// グリップボタンの状態を取得
function isGripPressed(inputSource) {
  if (!inputSource || !inputSource.gamepad) return false;

  const gamepad = inputSource.gamepad;
  const buttons = gamepad.buttons;

  // デバッグ用：ボタンの状態をログ出力（初回のみ）
  if (!isGripPressed.logged) {
    console.log('Gamepad buttons:', buttons.length);
    for (let i = 0; i < buttons.length; i++) {
      console.log(`Button ${i}: pressed=${buttons[i].pressed}, value=${buttons[i].value}`);
    }
    isGripPressed.logged = true;
  }

  // Meta Quest: グリップはbuttons[1]
  // 他のコントローラー: buttons[2]の場合もある
  if (buttons && buttons.length > 1) {
    // buttons[1]がグリップ（Squeeze）
    return buttons[1].pressed || buttons[1].value > 0.5;
  }
  return false;
}

// inputSourceからグリップの位置を取得
function getGripPosition(inputSource, frame, referenceSpace) {
  if (!inputSource || !inputSource.gripSpace || !frame || !referenceSpace) return null;

  const gripPose = frame.getPose(inputSource.gripSpace, referenceSpace);
  if (gripPose) {
    return new THREE.Vector3(
      gripPose.transform.position.x,
      gripPose.transform.position.y,
      gripPose.transform.position.z
    );
  }
  return null;
}

// コントローラーによるパネル操作を更新
function updatePanelControllerInteraction(frame, referenceSpace) {
  if (!textPanel || !textPanel.visible || !xrSession) return;

  const inputSources = xrSession.inputSources;
  if (!inputSources) return;

  for (const inputSource of inputSources) {
    if (inputSource.targetRayMode !== 'tracked-pointer') continue;
    if (!inputSource.gripSpace) continue;

    const handedness = inputSource.handedness;
    if (!handedness) continue;

    const gripPosition = getGripPosition(inputSource, frame, referenceSpace);
    if (!gripPosition) continue;

    const gripPressed = isGripPressed(inputSource);

    // ドラッグ中の処理
    if (isDraggingPanel && draggingInputSource === inputSource) {
      if (gripPressed) {
        // グリップの位置にオフセットを加えてパネルを移動
        textPanel.position.copy(gripPosition).add(dragOffset);

        // パネルをカメラに向ける
        const viewerPose = frame.getViewerPose(referenceSpace);
        if (viewerPose) {
          const cameraPos = new THREE.Vector3(
            viewerPose.transform.position.x,
            viewerPose.transform.position.y,
            viewerPose.transform.position.z
          );
          textPanel.lookAt(cameraPos);
        }

        // 生成ボタンも一緒に移動
        updateGenerateButtonPosition();
      } else {
        // グリップを離したらドラッグ終了
        isDraggingPanel = false;
        draggingInputSource = null;
        console.log('パネルをドロップ');
      }
      wasGripPressed[handedness] = gripPressed;
      continue;
    }

    // グリップを押した瞬間にパネルをつかむ
    const isColliding = checkPanelCollision(gripPosition);

    if (gripPressed && !wasGripPressed[handedness]) {
      console.log('グリップ押下:', handedness, 'collision:', isColliding);

      if (isColliding) {
        isDraggingPanel = true;
        draggingInputSource = inputSource;
        dragOffset.copy(textPanel.position).sub(gripPosition);
        console.log('パネルをグリップ:', handedness);
      }
    }

    wasGripPressed[handedness] = gripPressed;
  }
}

// アニメーションループ
function animate(timestamp, frame) {
  // XRセッション中の処理
  if (frame && xrSession) {
    const referenceSpace = renderer.xr.getReferenceSpace();

    // テキストパネルの初期位置を設定（一度だけ）
    if (textPanel && textPanel.visible && !panelInitialized) {
      initializeTextPanelPosition(frame, referenceSpace);
    }

    // レーザーの表示状態を更新
    updateLaserVisibility();

    // コントローラーによるパネル操作
    updatePanelControllerInteraction(frame, referenceSpace);

    // 深度情報を更新
    updateDepthInfo(frame, referenceSpace);
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

    // immersive-ar モードをサポートしているか確認
    const supported = await navigator.xr.isSessionSupported('immersive-ar');

    if (!supported) {
      updateInfo('immersive-ARがサポートされていません');
      alert('このデバイスはAR機能をサポートしていません');
      return;
    }

    // XRセッション開始（深度センサー、平面検出、ハンドトラッキングを有効化）
    xrSession = await navigator.xr.requestSession('immersive-ar', {
      requiredFeatures: [],
      optionalFeatures: ['local-floor', 'bounded-floor', 'depth-sensing', 'plane-detection', 'hand-tracking'],
      depthSensing: {
        usagePreference: ['cpu-optimized', 'gpu-optimized'],
        dataFormatPreference: ['luminance-alpha', 'float32']
      }
    });

    await renderer.xr.setSession(xrSession);

    // コントローラーを取得
    rightController = renderer.xr.getController(0);
    leftController = renderer.xr.getController(1);
    scene.add(rightController);
    scene.add(leftController);

    // レーザーポインターを追加
    rightLaser = createLaser();
    leftLaser = createLaser();
    rightController.add(rightLaser);
    leftController.add(leftLaser);

    // コントローラーのselectイベント（トリガー）でパネルやボタンをタップ
    const hiddenInput = document.getElementById('hidden-input');
    const onSelect = (event) => {
      const controller = event.target;
      const raycaster = new THREE.Raycaster();
      const tempMatrix = new THREE.Matrix4();
      tempMatrix.identity().extractRotation(controller.matrixWorld);

      raycaster.ray.origin.setFromMatrixPosition(controller.matrixWorld);
      raycaster.ray.direction.set(0, 0, -1).applyMatrix4(tempMatrix);

      // 生成ボタンをタップしたかチェック
      if (generateButton && generateButton.visible) {
        const buttonIntersects = raycaster.intersectObject(generateButton);
        if (buttonIntersects.length > 0) {
          pressGenerateButton();
          console.log('生成ボタンをタップ');
          return;
        }
      }

      // レーザーがパネルに当たっているかチェック
      if (textPanel && textPanel.visible && hiddenInput) {
        const intersects = raycaster.intersectObject(textPanel);
        if (intersects.length > 0) {
          // 現在のテキストをinputに反映してからフォーカス
          hiddenInput.value = promptText;
          hiddenInput.focus();
          hiddenInput.click();
          console.log('パネルをタップ - キーボード呼び出し');
        }
      }
    };
    rightController.addEventListener('select', onSelect);
    leftController.addEventListener('select', onSelect);

    // ハンドトラッキングを取得
    hand1 = renderer.xr.getHand(0);
    hand2 = renderer.xr.getHand(1);
    scene.add(hand1);
    scene.add(hand2);

    // テキスト入力を開始（MR空間にテキストパネルを表示）
    startTextInput();

    // ボタンを非表示
    const button = document.getElementById('start-button');
    if (button) {
      button.style.display = 'none';
    }
    const vrButton = document.getElementById('vr-button');
    if (vrButton) {
      vrButton.style.display = 'none';
    }

    // セッション開始イベントを発火
    window.dispatchEvent(new Event('xr-session-start'));

    updateInfo('MRセッション開始 - Tabキーでテキスト入力');

    // セッション開始後に深度センサーの状態を確認
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

      // 深度関連のリソースをクリーンアップ
      if (depthMesh) {
        scene.remove(depthMesh);
        depthMesh = null;
      }
      depthDataTexture = null;

      // セッション終了イベントを発火
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

    // immersive-vr モードをサポートしているか確認
    const supported = await navigator.xr.isSessionSupported('immersive-vr');

    if (!supported) {
      updateInfo('immersive-VRがサポートされていません');
      alert('このデバイスはVR機能をサポートしていません');
      return;
    }

    // XRセッション開始（VRモード）
    xrSession = await navigator.xr.requestSession('immersive-vr', {
      requiredFeatures: [],
      optionalFeatures: ['local-floor', 'bounded-floor', 'hand-tracking']
    });

    await renderer.xr.setSession(xrSession);

    // VR環境（背景とグリッド）を作成
    createVREnvironment();

    // コントローラーを取得
    rightController = renderer.xr.getController(0);
    leftController = renderer.xr.getController(1);
    scene.add(rightController);
    scene.add(leftController);

    // レーザーポインターを追加
    rightLaser = createLaser();
    leftLaser = createLaser();
    rightController.add(rightLaser);
    leftController.add(leftLaser);

    // ハンドトラッキングを取得
    hand1 = renderer.xr.getHand(0);
    hand2 = renderer.xr.getHand(1);
    scene.add(hand1);
    scene.add(hand2);

    // テキスト入力を開始（VR空間にテキストパネルを表示）
    startTextInput();

    // ボタンを非表示
    const button = document.getElementById('start-button');
    if (button) {
      button.style.display = 'none';
    }
    const vrButton = document.getElementById('vr-button');
    if (vrButton) {
      vrButton.style.display = 'none';
    }

    // セッション開始イベントを発火
    window.dispatchEvent(new Event('xr-session-start'));

    updateInfo('VRセッション開始 - Tabキーでテキスト入力');

    xrSession.addEventListener('end', () => {
      xrSession = null;

      // VR環境を削除
      removeVREnvironment();

      // セッション終了イベントを発火
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
    showDepthVisualization = !showDepthVisualization;
    depthToggleButton.textContent = showDepthVisualization ? '深度表示 ON' : '深度表示 OFF';
    console.log('深度表示:', showDepthVisualization);
  });

  // MRセッション開始時にボタンを表示
  window.addEventListener('xr-session-start', () => {
    depthToggleButton.style.display = 'block';
  });

  // MRセッション終了時にボタンを非表示
  window.addEventListener('xr-session-end', () => {
    depthToggleButton.style.display = 'none';
    showDepthVisualization = false;
    depthToggleButton.textContent = '深度表示 OFF';
  });
}

// プロンプト入力ボタン
const promptToggleButton = document.getElementById('prompt-toggle');
if (promptToggleButton) {
  promptToggleButton.addEventListener('click', () => {
    if (isTextInputActive) {
      stopTextInput();
    } else {
      startTextInput();
    }
  });
}

// 隠し入力欄（キーボード入力用）
const hiddenInputElement = document.getElementById('hidden-input');

if (hiddenInputElement) {
  // 入力時にパネルのテキストを更新
  hiddenInputElement.addEventListener('input', (e) => {
    promptText = e.target.value;
    updateTextCanvas();
  });

  // Enterキーで送信
  hiddenInputElement.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      submitPrompt();
      hiddenInputElement.value = '';
      promptText = '';
      updateTextCanvas();
    }
  });
}
