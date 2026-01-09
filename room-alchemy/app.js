import * as THREE from 'three';
import { ModuleManager } from './modules/ModuleManager.js';
import { createImagePanel } from './modules/factories/imagePanel.js';
import { createDynamicThreejs } from './modules/factories/dynamicThreejs.js';
import { analyzePrompt, generateThreejsCode } from './modules/PromptAnalyzer.js';

let scene, camera, renderer;
let moduleManager = null;
let xrSession = null;
let rightController = null;
let leftController = null;

// 深度センサー用変数
let depthDataTexture = null;
let depthMesh = null;
let showDepthVisualization = false;


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

// 画像生成用変数
let generatedImagePanel = null;
let isGenerating = false;

// ローディングインジケーター用変数
let loadingIndicator = null;
let loadingDots = [];
let loadingAnimationTime = 0;

// モジュールドラッグ用変数
let draggingModule = null;
let initialModuleQuaternion = new THREE.Quaternion();
let initialGripQuaternion = new THREE.Quaternion();
let isLaserDragging = false;  // レーザーでドラッグ中か
let laserDragDistance = 0;    // レーザードラッグ時の距離
let laserHitOffset = new THREE.Vector3();  // レーザーヒット点からモジュール中心へのオフセット

// パネルのレーザードラッグ用変数
let isPanelLaserDragging = false;  // テキストパネルをレーザーでドラッグ中か
let panelLaserDragDistance = 0;    // テキストパネルのレーザードラッグ距離
let isImagePanelLaserDragging = false;  // 画像パネルをレーザーでドラッグ中か
let imagePanelLaserDragDistance = 0;    // 画像パネルのレーザードラッグ距離

// 両手スケーリング用変数
let isTwoHandScaling = false;
let initialGripDistance = 0;
let initialModuleScale = 1;
let leftGripInputSource = null;
let rightGripInputSource = null;

// 手の回転差分からオブジェクトの回転を計算
function applyGripRotation(targetQuaternion, currentGripQuat) {
  // グリップの回転差分を計算（ワールド座標系）
  // deltaRotation = currentGrip * inverse(initialGrip)
  const invInitialGrip = initialGripQuaternion.clone().invert();
  const deltaRotation = currentGripQuat.clone().multiply(invInitialGrip);

  // オブジェクトに回転差分を適用（ワールド座標系で回転）
  // newRotation = deltaRotation * initialModuleRotation
  targetQuaternion.copy(deltaRotation.multiply(initialModuleQuaternion));
}

// APIキー（環境変数から読み込み）
const FAL_API_KEY = import.meta.env.VITE_FAL_API_KEY;
const ANTHROPIC_API_KEY = import.meta.env.VITE_ANTHROPIC_API_KEY;

// 生成ボタン用変数
let generateButton = null;
let generateButtonCanvas = null;
let generateButtonContext = null;
let generateButtonTexture = null;
let isButtonPressed = false;
let buttonPressTime = 0;

// パネルドラッグ用変数
let isDraggingPanel = false;
let isDraggingImagePanel = false;
let draggingInputSource = null;
let dragOffset = new THREE.Vector3();
let panelInitialized = false;
let wasGripPressed = { left: false, right: false };

// レーザーポインター用変数
let rightLaser = null;
let leftLaser = null;
let laserShowTime = { left: 0, right: 0 };
let wasTriggerPressed = { left: false, right: false };
const LASER_DISPLAY_DURATION = 10000; // 10秒

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
  // 非XRモード用の背景色（XRセッション開始時に変更される）
  scene.background = new THREE.Color(0x1a1a2e);

  // カメラ作成
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  // 非XRモード用のカメラ位置
  camera.position.set(0, 1.6, 0);
  camera.lookAt(0, 1.0, -1.0);

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

  // モジュールマネージャーを初期化
  moduleManager = new ModuleManager(scene);
  moduleManager.registerFactory('imagePanel', createImagePanel);
  moduleManager.registerFactory('threejs', createDynamicThreejs);

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

// ローディングインジケーターを作成
function createLoadingIndicator() {
  if (loadingIndicator) {
    scene.remove(loadingIndicator);
  }

  loadingIndicator = new THREE.Group();
  loadingDots = [];

  // 5つのドットを作成
  const dotCount = 5;
  const dotRadius = 0.015;
  const spacing = 0.05;

  for (let i = 0; i < dotCount; i++) {
    const geometry = new THREE.SphereGeometry(dotRadius, 12, 12);
    const material = new THREE.MeshBasicMaterial({
      color: 0x4CAF50,
      transparent: true,
      opacity: 0.3
    });
    const dot = new THREE.Mesh(geometry, material);
    dot.position.x = (i - (dotCount - 1) / 2) * spacing;
    loadingIndicator.add(dot);
    loadingDots.push(dot);
  }

  loadingIndicator.visible = false;
  scene.add(loadingIndicator);
}

// ローディングインジケーターを表示
function showLoadingIndicator() {
  if (!loadingIndicator) {
    createLoadingIndicator();
  }

  if (textPanel) {
    loadingIndicator.position.copy(textPanel.position);
    loadingIndicator.position.y -= 0.08;
    loadingIndicator.quaternion.copy(textPanel.quaternion);
  }

  loadingIndicator.visible = true;
  loadingAnimationTime = 0;
}

// ローディングインジケーターを非表示
function hideLoadingIndicator() {
  if (loadingIndicator) {
    loadingIndicator.visible = false;
  }
}

// ローディングアニメーションを更新
function updateLoadingAnimation(deltaTime) {
  if (!loadingIndicator || !loadingIndicator.visible) return;

  loadingAnimationTime += deltaTime * 3;

  for (let i = 0; i < loadingDots.length; i++) {
    const phase = loadingAnimationTime - i * 0.3;
    const wave = Math.sin(phase) * 0.5 + 0.5;
    loadingDots[i].material.opacity = 0.3 + wave * 0.7;
    loadingDots[i].scale.setScalar(0.8 + wave * 0.4);
  }

  // テキストパネルに追従
  if (textPanel) {
    loadingIndicator.position.copy(textPanel.position);
    loadingIndicator.position.y -= 0.08;
    loadingIndicator.quaternion.copy(textPanel.quaternion);
  }
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

// 生成した画像をMR空間に表示
function displayGeneratedImage(imageUrl) {
  // テクスチャローダーで画像を読み込み
  const textureLoader = new THREE.TextureLoader();

  // CORSを回避するため、crossOriginを設定
  textureLoader.crossOrigin = 'anonymous';

  textureLoader.load(
    imageUrl,
    (texture) => {
      // 既存の画像パネルがあれば削除
      if (generatedImagePanel) {
        scene.remove(generatedImagePanel);
        generatedImagePanel.geometry.dispose();
        generatedImagePanel.material.dispose();
      }

      // 画像パネルを作成（正方形、半分のサイズ）
      const panelGeometry = new THREE.PlaneGeometry(0.25, 0.25);
      const panelMaterial = new THREE.MeshBasicMaterial({
        map: texture,
        side: THREE.DoubleSide,
        transparent: true
      });

      generatedImagePanel = new THREE.Mesh(panelGeometry, panelMaterial);

      // テキストパネルの下に配置
      if (textPanel) {
        generatedImagePanel.position.copy(textPanel.position);
        generatedImagePanel.position.y -= 0.35; // パネルの下に配置
        generatedImagePanel.quaternion.copy(textPanel.quaternion);
      } else {
        generatedImagePanel.position.set(0, 0.8, -0.5);
      }

      scene.add(generatedImagePanel);
      console.log('画像を表示:', imageUrl);
      updateInfo('画像生成完了！');
      isGenerating = false;
    },
    undefined,
    (error) => {
      console.error('画像読み込みエラー:', error);
      updateInfo('画像読み込みエラー');
      isGenerating = false;
    }
  );
}

// Claude APIでプロンプトを強化
async function enhancePrompt(userPrompt) {
  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
        'anthropic-dangerous-direct-browser-access': 'true'
      },
      body: JSON.stringify({
        model: 'claude-3-5-haiku-20241022',
        max_tokens: 300,
        messages: [{
          role: 'user',
          content: `You are an expert at creating prompts for image generation AI. Convert the following user input into a detailed, high-quality English prompt for Nano Banana Pro (a text-to-image AI). Keep it concise but descriptive, focusing on visual details, style, lighting, and composition. Output ONLY the prompt, nothing else.

User input: ${userPrompt}`
        }]
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Claude API Error:', errorText);
      return userPrompt; // エラー時は元のプロンプトを使用
    }

    const data = await response.json();
    const enhancedPrompt = data.content[0].text.trim();
    console.log('Enhanced prompt:', enhancedPrompt);
    return enhancedPrompt;

  } catch (error) {
    console.error('プロンプト強化エラー:', error);
    return userPrompt; // エラー時は元のプロンプトを使用
  }
}

// fal.ai APIで画像を生成
async function generateImage(userPrompt) {
  if (isGenerating) {
    console.log('既に生成中です');
    return;
  }

  isGenerating = true;
  updateInfo('プロンプト強化中... 🧠');

  try {
    // Claude APIでプロンプトを強化
    const prompt = await enhancePrompt(userPrompt);
    updateInfo('画像生成中... ✨');

    // fal.ai Nano Banana Pro APIを呼び出し（キュー方式）
    const submitResponse = await fetch('https://queue.fal.run/fal-ai/nano-banana-pro', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Key ${FAL_API_KEY}`
      },
      body: JSON.stringify({
        prompt: prompt,
        aspect_ratio: '1:1',
        resolution: '1K',
        num_images: 1,
        output_format: 'png'
      })
    });

    if (!submitResponse.ok) {
      const errorText = await submitResponse.text();
      throw new Error(`Submit Error: ${submitResponse.status} - ${errorText}`);
    }

    const submitData = await submitResponse.json();
    console.log('Submit response:', submitData);

    const requestId = submitData.request_id;
    if (!requestId) {
      throw new Error('request_idが取得できませんでした');
    }

    // ポーリングでステータスを確認
    const maxAttempts = 30;
    for (let i = 0; i < maxAttempts; i++) {
      await new Promise(resolve => setTimeout(resolve, 1500));

      const statusResponse = await fetch(`https://queue.fal.run/fal-ai/nano-banana-pro/requests/${requestId}/status`, {
        method: 'GET',
        headers: {
          'Authorization': `Key ${FAL_API_KEY}`
        }
      });

      if (statusResponse.ok) {
        const statusData = await statusResponse.json();
        console.log('Status:', statusData);

        if (statusData.status === 'COMPLETED') {
          // 完了したら結果を取得
          const resultResponse = await fetch(`https://queue.fal.run/fal-ai/nano-banana-pro/requests/${requestId}`, {
            method: 'GET',
            headers: {
              'Authorization': `Key ${FAL_API_KEY}`
            }
          });

          if (resultResponse.ok) {
            const resultData = await resultResponse.json();
            console.log('Result:', resultData);

            if (resultData.images && resultData.images.length > 0) {
              const imageUrl = resultData.images[0].url;
              displayGeneratedImage(imageUrl);
              return;
            }
          }
          throw new Error('結果の取得に失敗しました');
        }
      }

      updateInfo(`画像生成中... (${i + 1}/${maxAttempts})`);
    }

    throw new Error('画像生成がタイムアウトしました');

  } catch (error) {
    console.error('画像生成エラー:', error);
    updateInfo('画像生成エラー: ' + error.message);
    isGenerating = false;
  }
}

// プロンプトを送信（モジュール生成）
async function submitPrompt() {
  if (promptText.trim().length === 0) return;

  console.log('プロンプト送信:', promptText);
  updateInfo('解析中... 🧠');

  const currentPrompt = promptText;
  // テキストをクリアするが、パネルは表示したまま
  promptText = '';
  updateTextCanvas();

  // ローディングインジケーターを表示
  showLoadingIndicator();

  try {
    // Claude APIでプロンプトを解析
    const moduleDef = await analyzePrompt(currentPrompt, ANTHROPIC_API_KEY);
    console.log('モジュール定義:', moduleDef);

    // スポーン位置を決定（テキストパネルの真上、既存モジュール数に応じて高さをずらす）
    const spawnPosition = new THREE.Vector3();
    const moduleCount = moduleManager.modules.size;
    const offsetY = 0.15 + (moduleCount * 0.25);  // 上に積み重ねる

    if (textPanel) {
      spawnPosition.copy(textPanel.position);
      spawnPosition.y += offsetY;
    } else {
      spawnPosition.set(0, 1.2 + offsetY, -0.5);
    }

    if (moduleDef.kind === 'imagePanel') {
      // 画像生成が必要な場合
      updateInfo('画像生成中... ✨');
      const imagePrompt = moduleDef.imagePrompt || currentPrompt;

      // 画像を生成
      const imageUrl = await generateImageForModule(imagePrompt);

      if (imageUrl) {
        // 画像パネルモジュールをスポーン
        moduleManager.spawn('imagePanel', spawnPosition, {
          imageUrl: imageUrl,
          width: moduleDef.params.width || 0.25,
          height: moduleDef.params.height || 0.25
        });
        hideLoadingIndicator();
        updateInfo('画像生成完了！');
      } else {
        hideLoadingIndicator();
      }
    } else if (moduleDef.kind === 'threejs') {
      // Three.jsコードを生成して実行
      updateInfo('3Dオブジェクト生成中... 🎨');
      const threejsPrompt = moduleDef.threejsPrompt || currentPrompt;

      // Claude APIでThree.jsコードを生成
      const code = await generateThreejsCode(threejsPrompt, ANTHROPIC_API_KEY);

      // 動的Three.jsモジュールをスポーン
      const moduleId = moduleManager.spawn('threejs', spawnPosition, {
        code: code,
        prompt: threejsPrompt
      });
      hideLoadingIndicator();
      console.log('生成されたモジュール:', moduleId, 'prompt:', threejsPrompt);
      updateInfo(`${moduleDef.label || 'Three.js'} を生成しました！`);
    }

  } catch (error) {
    console.error('モジュール生成エラー:', error);
    hideLoadingIndicator();
    updateInfo('エラー: ' + error.message);
  }
}

// モジュール用に画像を生成（URLを返す）
async function generateImageForModule(prompt) {
  try {
    // fal.ai Nano Banana Pro APIを呼び出し
    const submitResponse = await fetch('https://queue.fal.run/fal-ai/nano-banana-pro', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Key ${FAL_API_KEY}`
      },
      body: JSON.stringify({
        prompt: prompt,
        aspect_ratio: '1:1',
        resolution: '1K',
        num_images: 1,
        output_format: 'png'
      })
    });

    if (!submitResponse.ok) {
      throw new Error(`Submit Error: ${submitResponse.status}`);
    }

    const submitData = await submitResponse.json();
    const requestId = submitData.request_id;

    // ポーリングで結果を待つ
    const maxAttempts = 30;
    for (let i = 0; i < maxAttempts; i++) {
      await new Promise(resolve => setTimeout(resolve, 1500));

      const statusResponse = await fetch(`https://queue.fal.run/fal-ai/nano-banana-pro/requests/${requestId}/status`, {
        method: 'GET',
        headers: { 'Authorization': `Key ${FAL_API_KEY}` }
      });

      if (statusResponse.ok) {
        const statusData = await statusResponse.json();

        if (statusData.status === 'COMPLETED') {
          const resultResponse = await fetch(`https://queue.fal.run/fal-ai/nano-banana-pro/requests/${requestId}`, {
            method: 'GET',
            headers: { 'Authorization': `Key ${FAL_API_KEY}` }
          });

          if (resultResponse.ok) {
            const resultData = await resultResponse.json();
            if (resultData.images && resultData.images.length > 0) {
              return resultData.images[0].url;
            }
          }
        }
      }
      updateInfo(`画像生成中... (${i + 1}/${maxAttempts})`);
    }

    throw new Error('画像生成タイムアウト');
  } catch (error) {
    console.error('画像生成エラー:', error);
    return null;
  }
}

// キーボードイベントを設定
function setupKeyboardEvents() {
  document.addEventListener('keydown', (event) => {
    // Tキーでテストスポーン（デバッグ用）
    if (event.key === 't' || event.key === 'T') {
      if (!isTextInputActive) {
        const testPosition = new THREE.Vector3(0, 1.0, -1.0);
        console.log('テストスポーン位置:', testPosition);
        // テスト用のシンプルなコード
        const testCode = `
const geometry = new THREE.BoxGeometry(0.1, 0.1, 0.1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
group.add(cube);
meshes.push(cube);
animationCallbacks.push((time, deltaTime) => {
  cube.rotation.x = time;
  cube.rotation.y = time * 0.5;
});
`;
        const moduleId = moduleManager.spawn('threejs', testPosition, {
          code: testCode,
          prompt: 'test cube'
        });
        console.log('テストスポーン完了:', moduleId);
        updateInfo('テストスポーン完了');
        return;
      }
    }

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

  // パネルを水平に配置（Y軸回転のみ適用）
  const euler = new THREE.Euler().setFromQuaternion(cameraQuaternion, 'YXZ');
  euler.x = 0;  // X軸回転をリセット（水平に）
  euler.z = 0;  // Z軸回転をリセット
  textPanel.quaternion.setFromEuler(euler);

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

// 画像パネルとの当たり判定
const IMAGE_COLLISION_SIZE = { x: 0.3, y: 0.3, z: 0.1 };

function checkImagePanelCollision(controllerPosition) {
  if (!generatedImagePanel || !controllerPosition) return false;

  const localPos = controllerPosition.clone();
  generatedImagePanel.worldToLocal(localPos);

  const halfX = IMAGE_COLLISION_SIZE.x / 2;
  const halfY = IMAGE_COLLISION_SIZE.y / 2;
  const halfZ = IMAGE_COLLISION_SIZE.z / 2;

  return Math.abs(localPos.x) < halfX &&
         Math.abs(localPos.y) < halfY &&
         Math.abs(localPos.z) < halfZ;
}

// スティックの値を取得 (x: 左右, y: 上下)
function getStickValues(inputSource) {
  if (!inputSource || !inputSource.gamepad) return { x: 0, y: 0 };

  const axes = inputSource.gamepad.axes;
  // axes[2]: X軸 (左右), axes[3]: Y軸 (上下)
  if (axes && axes.length >= 4) {
    return { x: axes[2], y: axes[3] };
  }
  return { x: 0, y: 0 };
}

// スティック押し込みの状態を取得
function isStickPressed(inputSource) {
  if (!inputSource || !inputSource.gamepad) return false;

  const buttons = inputSource.gamepad.buttons;
  // buttons[3]: スティック押し込み
  if (buttons && buttons.length > 3) {
    return buttons[3].pressed;
  }
  return false;
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

// inputSourceからグリップの回転を取得
function getGripQuaternion(inputSource, frame, referenceSpace) {
  if (!inputSource || !inputSource.gripSpace || !frame || !referenceSpace) return null;

  const gripPose = frame.getPose(inputSource.gripSpace, referenceSpace);
  if (gripPose) {
    return new THREE.Quaternion(
      gripPose.transform.orientation.x,
      gripPose.transform.orientation.y,
      gripPose.transform.orientation.z,
      gripPose.transform.orientation.w
    );
  }
  return null;
}

// レーザーでモジュールにヒットしているかチェック
function raycastModules(inputSource, frame, referenceSpace) {
  if (!inputSource || !inputSource.targetRaySpace || !frame || !referenceSpace) return null;

  const rayPose = frame.getPose(inputSource.targetRaySpace, referenceSpace);
  if (!rayPose) return null;

  const rayOrigin = new THREE.Vector3(
    rayPose.transform.position.x,
    rayPose.transform.position.y,
    rayPose.transform.position.z
  );
  const rayDirection = new THREE.Vector3(0, 0, -1);
  rayDirection.applyQuaternion(new THREE.Quaternion(
    rayPose.transform.orientation.x,
    rayPose.transform.orientation.y,
    rayPose.transform.orientation.z,
    rayPose.transform.orientation.w
  ));

  const raycaster = new THREE.Raycaster(rayOrigin, rayDirection, 0, 10);

  // 全モジュールをチェック
  for (const module of moduleManager.modules.values()) {
    const intersects = raycaster.intersectObject(module.group, true);
    if (intersects.length > 0) {
      return {
        module: module,
        distance: intersects[0].distance,
        point: intersects[0].point
      };
    }
  }
  return null;
}

// レーザーでテキストパネルにヒットしているかチェック
function raycastTextPanel(inputSource, frame, referenceSpace) {
  if (!textPanel || !textPanel.visible) return null;
  if (!inputSource || !inputSource.targetRaySpace || !frame || !referenceSpace) return null;

  const rayPose = frame.getPose(inputSource.targetRaySpace, referenceSpace);
  if (!rayPose) return null;

  const rayOrigin = new THREE.Vector3(
    rayPose.transform.position.x,
    rayPose.transform.position.y,
    rayPose.transform.position.z
  );
  const rayDirection = new THREE.Vector3(0, 0, -1);
  rayDirection.applyQuaternion(new THREE.Quaternion(
    rayPose.transform.orientation.x,
    rayPose.transform.orientation.y,
    rayPose.transform.orientation.z,
    rayPose.transform.orientation.w
  ));

  const raycaster = new THREE.Raycaster(rayOrigin, rayDirection, 0, 10);
  const intersects = raycaster.intersectObject(textPanel);
  if (intersects.length > 0) {
    return {
      distance: intersects[0].distance,
      point: intersects[0].point
    };
  }
  return null;
}

// レーザーで画像パネルにヒットしているかチェック
function raycastImagePanel(inputSource, frame, referenceSpace) {
  if (!generatedImagePanel) return null;
  if (!inputSource || !inputSource.targetRaySpace || !frame || !referenceSpace) return null;

  const rayPose = frame.getPose(inputSource.targetRaySpace, referenceSpace);
  if (!rayPose) return null;

  const rayOrigin = new THREE.Vector3(
    rayPose.transform.position.x,
    rayPose.transform.position.y,
    rayPose.transform.position.z
  );
  const rayDirection = new THREE.Vector3(0, 0, -1);
  rayDirection.applyQuaternion(new THREE.Quaternion(
    rayPose.transform.orientation.x,
    rayPose.transform.orientation.y,
    rayPose.transform.orientation.z,
    rayPose.transform.orientation.w
  ));

  const raycaster = new THREE.Raycaster(rayOrigin, rayDirection, 0, 10);
  const intersects = raycaster.intersectObject(generatedImagePanel);
  if (intersects.length > 0) {
    return {
      distance: intersects[0].distance,
      point: intersects[0].point
    };
  }
  return null;
}

// コントローラーによるパネル操作を更新
function updatePanelControllerInteraction(frame, referenceSpace) {
  if (!xrSession) return;

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

    // テキストパネルのドラッグ中の処理
    if (isDraggingPanel && draggingInputSource === inputSource) {
      if (gripPressed) {
        // レーザードラッグか直接グリップかで位置計算を変える
        if (isPanelLaserDragging) {
          // レーザードラッグ：レーザーの先端位置にパネルを配置
          const rayPose = frame.getPose(inputSource.targetRaySpace, referenceSpace);
          if (rayPose) {
            const rayOrigin = new THREE.Vector3(
              rayPose.transform.position.x,
              rayPose.transform.position.y,
              rayPose.transform.position.z
            );
            const rayDirection = new THREE.Vector3(0, 0, -1);
            rayDirection.applyQuaternion(new THREE.Quaternion(
              rayPose.transform.orientation.x,
              rayPose.transform.orientation.y,
              rayPose.transform.orientation.z,
              rayPose.transform.orientation.w
            ));
            textPanel.position.copy(rayOrigin).add(rayDirection.multiplyScalar(panelLaserDragDistance)).add(dragOffset);
          }
        } else {
          // 直接グリップ
          textPanel.position.copy(gripPosition).add(dragOffset);
        }

        // スティック操作で距離と角度を調整
        const stick = getStickValues(inputSource);
        const stickPressed = isStickPressed(inputSource);

        // スティック上下で奥/手前に移動（上で奥、下で手前）
        if (Math.abs(stick.y) > 0.1) {
          if (isPanelLaserDragging) {
            // レーザードラッグ時は距離を変更
            panelLaserDragDistance -= stick.y * 0.02;
            panelLaserDragDistance = Math.max(0.3, Math.min(5.0, panelLaserDragDistance));
          } else {
            // 直接グリップ時はZ方向に移動
            const forward = new THREE.Vector3(0, 0, stick.y * 0.02);
            forward.applyQuaternion(initialGripQuaternion);
            textPanel.position.add(forward);
            dragOffset.add(forward);
          }
        }

        // スティック左右で角度変更（Y軸回転）
        if (Math.abs(stick.x) > 0.1) {
          textPanel.rotateY(stick.x * 0.03);
          // 回転後の状態を初期値として更新
          initialModuleQuaternion.copy(textPanel.quaternion);
          const currentGripQuat = getGripQuaternion(inputSource, frame, referenceSpace);
          if (currentGripQuat) {
            initialGripQuaternion.copy(currentGripQuat);
          }
        }

        // スティック押し込みで水平にリセット
        if (stickPressed) {
          const euler = new THREE.Euler().setFromQuaternion(textPanel.quaternion, 'YXZ');
          euler.x = 0;
          euler.z = 0;
          textPanel.quaternion.setFromEuler(euler);
          initialModuleQuaternion.copy(textPanel.quaternion);
          const currentGripQuat = getGripQuaternion(inputSource, frame, referenceSpace);
          if (currentGripQuat) {
            initialGripQuaternion.copy(currentGripQuat);
          }
        }

        // 手の回転の差分をパネルに適用（スティック左右操作がない場合のみ）
        if (Math.abs(stick.x) <= 0.1) {
          const currentGripQuat = getGripQuaternion(inputSource, frame, referenceSpace);
          if (currentGripQuat) {
            applyGripRotation(textPanel.quaternion, currentGripQuat);
          }
        }

        updateGenerateButtonPosition();
      } else {
        isDraggingPanel = false;
        isPanelLaserDragging = false;
        draggingInputSource = null;
        console.log('テキストパネルをドロップ');
      }
      wasGripPressed[handedness] = gripPressed;
      continue;
    }

    // 画像パネルのドラッグ中の処理
    if (isDraggingImagePanel && draggingInputSource === inputSource) {
      if (gripPressed) {
        // レーザードラッグか直接グリップかで位置計算を変える
        if (isImagePanelLaserDragging) {
          // レーザードラッグ：レーザーの先端位置にパネルを配置
          const rayPose = frame.getPose(inputSource.targetRaySpace, referenceSpace);
          if (rayPose) {
            const rayOrigin = new THREE.Vector3(
              rayPose.transform.position.x,
              rayPose.transform.position.y,
              rayPose.transform.position.z
            );
            const rayDirection = new THREE.Vector3(0, 0, -1);
            rayDirection.applyQuaternion(new THREE.Quaternion(
              rayPose.transform.orientation.x,
              rayPose.transform.orientation.y,
              rayPose.transform.orientation.z,
              rayPose.transform.orientation.w
            ));
            generatedImagePanel.position.copy(rayOrigin).add(rayDirection.multiplyScalar(imagePanelLaserDragDistance)).add(dragOffset);
          }
        } else {
          // 直接グリップ
          generatedImagePanel.position.copy(gripPosition).add(dragOffset);
        }

        // スティック操作で距離と角度を調整
        const stick = getStickValues(inputSource);
        const stickPressed = isStickPressed(inputSource);

        // スティック上下で奥/手前に移動（上で奥、下で手前）
        if (Math.abs(stick.y) > 0.1) {
          if (isImagePanelLaserDragging) {
            // レーザードラッグ時は距離を変更
            imagePanelLaserDragDistance -= stick.y * 0.02;
            imagePanelLaserDragDistance = Math.max(0.3, Math.min(5.0, imagePanelLaserDragDistance));
          } else {
            // 直接グリップ時はZ方向に移動
            const forward = new THREE.Vector3(0, 0, stick.y * 0.02);
            forward.applyQuaternion(initialGripQuaternion);
            generatedImagePanel.position.add(forward);
            dragOffset.add(forward);
          }
        }

        // スティック左右で角度変更（Y軸回転）
        if (Math.abs(stick.x) > 0.1) {
          generatedImagePanel.rotateY(stick.x * 0.03);
          // 回転後の状態を初期値として更新
          initialModuleQuaternion.copy(generatedImagePanel.quaternion);
          const currentGripQuat = getGripQuaternion(inputSource, frame, referenceSpace);
          if (currentGripQuat) {
            initialGripQuaternion.copy(currentGripQuat);
          }
        }

        // スティック押し込みで水平にリセット
        if (stickPressed) {
          const euler = new THREE.Euler().setFromQuaternion(generatedImagePanel.quaternion, 'YXZ');
          euler.x = 0;
          euler.z = 0;
          generatedImagePanel.quaternion.setFromEuler(euler);
          initialModuleQuaternion.copy(generatedImagePanel.quaternion);
          const currentGripQuat = getGripQuaternion(inputSource, frame, referenceSpace);
          if (currentGripQuat) {
            initialGripQuaternion.copy(currentGripQuat);
          }
        }

        // 手の回転の差分をパネルに適用（スティック左右操作がない場合のみ）
        if (Math.abs(stick.x) <= 0.1) {
          const currentGripQuat = getGripQuaternion(inputSource, frame, referenceSpace);
          if (currentGripQuat) {
            applyGripRotation(generatedImagePanel.quaternion, currentGripQuat);
          }
        }
      } else {
        isDraggingImagePanel = false;
        isImagePanelLaserDragging = false;
        draggingInputSource = null;
        console.log('画像パネルをドロップ');
      }
      wasGripPressed[handedness] = gripPressed;
      continue;
    }

    // グリップを押した瞬間にパネルをつかむ
    if (gripPressed && !wasGripPressed[handedness]) {
      const currentGripQuat = getGripQuaternion(inputSource, frame, referenceSpace);

      // まず画像パネルを直接グリップでチェック
      const isImageColliding = checkImagePanelCollision(gripPosition);
      if (isImageColliding) {
        isDraggingImagePanel = true;
        isImagePanelLaserDragging = false;
        draggingInputSource = inputSource;
        dragOffset.copy(generatedImagePanel.position).sub(gripPosition);
        // 初期回転を記録
        if (currentGripQuat) {
          initialGripQuaternion.copy(currentGripQuat);
          initialModuleQuaternion.copy(generatedImagePanel.quaternion);
        }
        console.log('画像パネルを直接グリップ:', handedness);
        wasGripPressed[handedness] = gripPressed;
        continue;
      }

      // 次にテキストパネルを直接グリップでチェック
      if (textPanel && textPanel.visible) {
        const isColliding = checkPanelCollision(gripPosition);
        if (isColliding) {
          isDraggingPanel = true;
          isPanelLaserDragging = false;
          draggingInputSource = inputSource;
          dragOffset.copy(textPanel.position).sub(gripPosition);
          // 初期回転を記録
          if (currentGripQuat) {
            initialGripQuaternion.copy(currentGripQuat);
            initialModuleQuaternion.copy(textPanel.quaternion);
          }
          console.log('テキストパネルを直接グリップ:', handedness);
          wasGripPressed[handedness] = gripPressed;
          continue;
        }
      }

      // 直接グリップできなければレーザーでチェック
      // 画像パネルをレーザーでチェック
      const imageHit = raycastImagePanel(inputSource, frame, referenceSpace);
      if (imageHit) {
        isDraggingImagePanel = true;
        isImagePanelLaserDragging = true;
        imagePanelLaserDragDistance = imageHit.distance;
        draggingInputSource = inputSource;
        // ヒット点からパネル中心へのオフセットを記録
        dragOffset.copy(generatedImagePanel.position).sub(imageHit.point);
        // 初期回転を記録
        if (currentGripQuat) {
          initialGripQuaternion.copy(currentGripQuat);
          initialModuleQuaternion.copy(generatedImagePanel.quaternion);
        }
        console.log('画像パネルをレーザーグリップ:', handedness, 'distance:', imageHit.distance);
        wasGripPressed[handedness] = gripPressed;
        continue;
      }

      // テキストパネルをレーザーでチェック
      const textHit = raycastTextPanel(inputSource, frame, referenceSpace);
      if (textHit) {
        isDraggingPanel = true;
        isPanelLaserDragging = true;
        panelLaserDragDistance = textHit.distance;
        draggingInputSource = inputSource;
        // ヒット点からパネル中心へのオフセットを記録
        dragOffset.copy(textPanel.position).sub(textHit.point);
        // 初期回転を記録
        if (currentGripQuat) {
          initialGripQuaternion.copy(currentGripQuat);
          initialModuleQuaternion.copy(textPanel.quaternion);
        }
        console.log('テキストパネルをレーザーグリップ:', handedness, 'distance:', textHit.distance);
        wasGripPressed[handedness] = gripPressed;
        continue;
      }
    }

    wasGripPressed[handedness] = gripPressed;
  }
}

// モジュールのコントローラー操作
function updateModuleControllerInteraction(frame, referenceSpace) {
  if (!moduleManager || !xrSession) return;

  const inputSources = xrSession.inputSources;
  if (!inputSources) return;

  // 左右のグリップ状態を収集
  let leftGripPos = null;
  let rightGripPos = null;
  let leftGripPressed = false;
  let rightGripPressed = false;
  let leftSource = null;
  let rightSource = null;

  for (const inputSource of inputSources) {
    if (inputSource.targetRayMode !== 'tracked-pointer') continue;
    if (!inputSource.gripSpace) continue;

    const handedness = inputSource.handedness;
    if (!handedness) continue;

    const gripPosition = getGripPosition(inputSource, frame, referenceSpace);
    const gripPressed = isGripPressed(inputSource);

    if (handedness === 'left') {
      leftGripPos = gripPosition;
      leftGripPressed = gripPressed;
      leftSource = inputSource;
    } else if (handedness === 'right') {
      rightGripPos = gripPosition;
      rightGripPressed = gripPressed;
      rightSource = inputSource;
    }
  }

  // 両手スケーリング処理
  if (isTwoHandScaling && draggingModule) {
    const module = moduleManager.modules.get(draggingModule);

    if (leftGripPressed && rightGripPressed && leftGripPos && rightGripPos && module) {
      // 両手の距離からスケールを計算
      const currentDistance = leftGripPos.distanceTo(rightGripPos);
      const scaleFactor = currentDistance / initialGripDistance;
      const newScale = Math.max(0.1, Math.min(5.0, initialModuleScale * scaleFactor));
      module.group.scale.setScalar(newScale);
      // 位置は変更しない
    } else {
      // どちらかの手を離したらスケーリング終了
      isTwoHandScaling = false;
      leftGripInputSource = null;
      rightGripInputSource = null;

      // スケーリング終了時はドラッグも終了（位置を維持）
      moduleManager.release(draggingModule);
      draggingModule = null;
      draggingInputSource = null;
      console.log('両手スケーリング終了、モジュールをドロップ');
    }
    return;
  }

  // 片手でドラッグ中に反対の手もグリップしたら両手スケーリング開始
  if (draggingModule && !isTwoHandScaling) {
    const module = moduleManager.modules.get(draggingModule);
    if (module && leftGripPressed && rightGripPressed && leftGripPos && rightGripPos) {
      isTwoHandScaling = true;
      initialGripDistance = leftGripPos.distanceTo(rightGripPos);
      initialModuleScale = module.group.scale.x;
      leftGripInputSource = leftSource;
      rightGripInputSource = rightSource;
      console.log('両手スケーリング開始、初期距離:', initialGripDistance.toFixed(2));
      return;
    }
  }

  // 通常の片手操作
  for (const inputSource of inputSources) {
    if (inputSource.targetRayMode !== 'tracked-pointer') continue;
    if (!inputSource.gripSpace) continue;

    const handedness = inputSource.handedness;
    if (!handedness) continue;

    const gripPosition = getGripPosition(inputSource, frame, referenceSpace);
    if (!gripPosition) continue;

    const gripPressed = isGripPressed(inputSource);

    // ドラッグ中のモジュール（直接グリップまたはレーザードラッグ）
    if (draggingModule && draggingInputSource === inputSource) {
      if (gripPressed) {
        const module = moduleManager.modules.get(draggingModule);

        if (isLaserDragging) {
          // レーザードラッグ：レーザーの先端位置 + オフセットに移動
          const rayPose = frame.getPose(inputSource.targetRaySpace, referenceSpace);
          if (rayPose && module) {
            const rayOrigin = new THREE.Vector3(
              rayPose.transform.position.x,
              rayPose.transform.position.y,
              rayPose.transform.position.z
            );
            const rayDirection = new THREE.Vector3(0, 0, -1);
            rayDirection.applyQuaternion(new THREE.Quaternion(
              rayPose.transform.orientation.x,
              rayPose.transform.orientation.y,
              rayPose.transform.orientation.z,
              rayPose.transform.orientation.w
            ));
            // 固定距離で移動 + オフセットを加算
            const hitPoint = rayOrigin.clone().add(rayDirection.multiplyScalar(laserDragDistance));
            const newPos = hitPoint.clone().add(laserHitOffset);
            module.group.position.copy(newPos);
          }
        } else {
          // 直接グリップ：グリップ位置に移動
          moduleManager.move(draggingModule, gripPosition);
        }

        // スティック操作で距離と角度を調整
        if (module) {
          const stick = getStickValues(inputSource);
          const stickPressed = isStickPressed(inputSource);

          // スティック上下で奥/手前に移動（上で奥、下で手前）
          if (Math.abs(stick.y) > 0.1) {
            if (isLaserDragging) {
              // レーザードラッグ時は距離を変更（符号反転）
              laserDragDistance -= stick.y * 0.02;
              laserDragDistance = Math.max(0.3, Math.min(5.0, laserDragDistance));
            } else {
              // 直接グリップ時はZ方向に移動（符号反転）
              const forward = new THREE.Vector3(0, 0, stick.y * 0.02);
              forward.applyQuaternion(initialGripQuaternion);
              module.group.position.add(forward);
            }
          }

          // スティック左右で角度変更（Y軸回転）- ボタン離した後も維持
          if (Math.abs(stick.x) > 0.1) {
            module.group.rotateY(stick.x * 0.03);
            // 回転後の状態を初期値として更新
            initialModuleQuaternion.copy(module.group.quaternion);
            const currentGripQuat = getGripQuaternion(inputSource, frame, referenceSpace);
            if (currentGripQuat) {
              initialGripQuaternion.copy(currentGripQuat);
            }
          }

          // スティック押し込みで水平にリセット
          if (stickPressed) {
            const euler = new THREE.Euler().setFromQuaternion(module.group.quaternion, 'YXZ');
            euler.x = 0;  // X軸回転をリセット
            euler.z = 0;  // Z軸回転をリセット
            module.group.quaternion.setFromEuler(euler);
            // 初期回転も更新
            initialModuleQuaternion.copy(module.group.quaternion);
            const currentGripQuat = getGripQuaternion(inputSource, frame, referenceSpace);
            if (currentGripQuat) {
              initialGripQuaternion.copy(currentGripQuat);
            }
          }
        }

        // 手の回転の差分をモジュールに適用（スティック左右操作がない場合のみ）
        if (module) {
          const stick = getStickValues(inputSource);
          if (Math.abs(stick.x) <= 0.1) {
            const currentGripQuat = getGripQuaternion(inputSource, frame, referenceSpace);
            if (currentGripQuat) {
              applyGripRotation(module.group.quaternion, currentGripQuat);
            }
          }
        }
      } else {
        moduleManager.release(draggingModule);
        draggingModule = null;
        draggingInputSource = null;
        isLaserDragging = false;
        console.log('モジュールをドロップ');
      }
      continue;
    }

    // グリップを押した瞬間にモジュールをつかむ
    if (gripPressed && !isDraggingPanel && !isDraggingImagePanel && !draggingModule) {
      // まず直接グリップをチェック
      let module = moduleManager.findModuleAtPosition(gripPosition, 0.2);
      let useLaser = false;

      // 直接グリップできなければレーザーでチェック
      if (!module) {
        const hit = raycastModules(inputSource, frame, referenceSpace);
        if (hit) {
          module = hit.module;
          laserDragDistance = hit.distance;
          // ヒット点からモジュール中心へのオフセットを記録
          laserHitOffset.copy(module.group.position).sub(hit.point);
          useLaser = true;
        }
      }

      if (module) {
        draggingModule = module.id;
        draggingInputSource = inputSource;
        isLaserDragging = useLaser;
        moduleManager.grab(module.id, gripPosition);
        // 初期回転を記録
        const currentGripQuat = getGripQuaternion(inputSource, frame, referenceSpace);
        if (currentGripQuat) {
          initialGripQuaternion.copy(currentGripQuat);
          initialModuleQuaternion.copy(module.group.quaternion);
        }
        console.log('モジュールをグリップ:', module.kind, handedness, useLaser ? '(レーザー)' : '(直接)');
      }
    }
  }
}

// 前回のタイムスタンプ（deltaTime計算用）
let lastTimestamp = 0;

// アニメーションループ
function animate(timestamp, frame) {
  // deltaTimeを計算（秒単位）
  const deltaTime = lastTimestamp ? (timestamp - lastTimestamp) / 1000 : 0.016;
  lastTimestamp = timestamp;

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

    // モジュールのコントローラー操作
    updateModuleControllerInteraction(frame, referenceSpace);

    // 深度情報を更新
    updateDepthInfo(frame, referenceSpace);
  }

  // モジュールを更新
  if (moduleManager) {
    moduleManager.update(deltaTime);
  }

  // ローディングアニメーションを更新
  updateLoadingAnimation(deltaTime);

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

  // 既にセッションがある場合は何もしない
  if (xrSession) {
    console.log('XRセッションは既に開始されています');
    return;
  }

  // ボタンを無効化（二重クリック防止）
  const button = document.getElementById('start-button');
  if (button) {
    button.disabled = true;
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

    // MRモードでは背景を透明に
    scene.background = null;

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
    rightController.addEventListener('selectstart', onSelect);
    leftController.addEventListener('selectstart', onSelect);

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
        button.disabled = false;
      }
    });

  } catch (error) {
    console.error('XRセッション開始エラー:', error);
    console.error('エラー名:', error.name);
    console.error('エラーメッセージ:', error.message);
    console.error('エラー詳細:', JSON.stringify(error, null, 2));
    updateInfo('エラー: ' + (error.message || error.name || 'Unknown error'));
    alert('MRセッションを開始できませんでした: ' + (error.message || error.name || 'Unknown error'));
    // エラー時もボタンを再度有効化
    if (button) {
      button.disabled = false;
    }
  }
}

// 初期化実行
init();

// ボタンのイベントリスナー
const startButton = document.getElementById('start-button');
if (startButton) {
  startButton.addEventListener('click', startXR);
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
