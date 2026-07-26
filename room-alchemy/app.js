import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { ModuleManager } from './modules/ModuleManager.js';
import { createImagePanel } from './modules/factories/imagePanel.js';
import { createDynamicThreejs } from './modules/factories/dynamicThreejs.js';
import { createHyper3DModel } from './modules/factories/hyper3dModel.js';
import { createMangaBook } from './modules/factories/mangaBook.js';
import { analyzePrompt, generateThreejsCode, regenerateThreejsCode } from './modules/PromptAnalyzer.js';

// コントローラー関連
import { createLaser, setLasers, updateLaserVisibility, isTriggerPressed, isAnyLaserVisible, isLaserVisibleForController, isLaserVisibleForHandedness } from './modules/controllers/LaserController.js';
import {
  getStickValues, isStickPressed, isGripPressed,
  getGripPosition, getGripQuaternion, applyGripRotation
} from './modules/controllers/InputController.js';

// UI関連
import { TextPanel } from './modules/ui/TextPanel.js';
import { LoadingIndicator } from './modules/ui/LoadingIndicator.js';
import { GenerateButton } from './modules/ui/GenerateButton.js';
import { DeleteButton } from './modules/ui/DeleteButton.js';
import { ConnectionLine } from './modules/ui/ConnectionLine.js';
import { PinButton } from './modules/ui/PinButton.js';
import { VoiceButton } from './modules/ui/VoiceButton.js';
import { ClearButton } from './modules/ui/ClearButton.js';

// サービス
import { ImageGenerator } from './modules/services/ImageGenerator.js';
import { Hyper3DService } from './modules/services/Hyper3DService.js';
import { MangaGenerator } from './modules/services/MangaGenerator.js';
import { RealtimeVoiceInput } from './modules/services/RealtimeVoiceInput.js';

// XR関連
import { DepthVisualization } from './modules/xr/DepthVisualization.js';
import { raycastModules, raycastTextPanel, raycastImagePanel, checkImagePanelCollision, setRaycastCamera } from './modules/xr/Raycast.js';
import { InteractionState } from './modules/xr/InteractionState.js';

// 基本変数
let scene, camera, renderer;
let moduleManager = null;
let xrSession = null;
let rightController = null;
let leftController = null;

// ハンドトラッキング用変数
let hand1 = null;
let hand2 = null;

// UIコンポーネント
let textPanel = null;
let loadingIndicator = null;
let generateButton = null;
let deleteButton = null;
let connectionLine = null;
let pinButton = null;
let voiceButton = null;
let clearButton = null;

// 画像生成サービス
let imageGenerator = null;
let hyper3DService = null;
let mangaGenerator = null;
let voiceInput = null;

// トリガー状態のトラッキング
let wasTriggerPressedState = { left: false, right: false };

// 深度可視化
let depthVisualization = null;

// 生成画像パネル
let generatedImagePanel = null;

// インタラクション状態
let interactionState = null;

// APIキーはすべてサーバー(server.js)側だけが持つ。
// import.meta.env 経由で受け取るとビルド時にバンドルへ埋め込まれ、dist を公開すると露出する

// 前回のタイムスタンプ
let lastTimestamp = 0;

// システムキーボードを使うか
// Oculus Browser 149.0.0.24.3 は VR セッション中に showOverlayKeyboard で
// IllegalStateException (Theme.AppCompat) を投げてブラウザごとクラッシュするため無効化。
// ブラウザ側が修正されたら true に戻せる。
const USE_SYSTEM_KEYBOARD = false;

// シーンの初期化
function init() {
  // シーン作成
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x1a1a2e);

  // カメラ作成
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, 1.6, 0);
  camera.lookAt(0, 1.0, -1.0);

  // レンダラー作成
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
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

  // モジュールマネージャーを初期化
  moduleManager = new ModuleManager(scene);
  moduleManager.registerFactory('imagePanel', createImagePanel);
  moduleManager.registerFactory('threejs', createDynamicThreejs);
  moduleManager.registerFactory('hyper3d', createHyper3DModel);
  moduleManager.registerFactory('mangaBook', createMangaBook);

  // UIコンポーネントを初期化
  textPanel = new TextPanel(scene);
  textPanel.create();

  loadingIndicator = new LoadingIndicator(scene);
  loadingIndicator.create();

  generateButton = new GenerateButton(scene);
  generateButton.create();
  generateButton.setOnPress(() => submitPrompt());

  // 削除ボタンを初期化
  deleteButton = new DeleteButton(scene);
  deleteButton.create();
  deleteButton.setOnPress(() => handleDelete());

  // 接続線を初期化
  connectionLine = new ConnectionLine(scene);
  connectionLine.create();

  // ピン留めボタンを初期化
  pinButton = new PinButton(scene);
  pinButton.create();
  pinButton.setOnPress((isPinned) => handlePinToggle(isPinned));

  // 音声入力ボタンを初期化
  // テキストパネルの左下に配置
  voiceButton = new VoiceButton(scene, {
    offset: new THREE.Vector3(-0.13, -0.05, 0)
  });
  voiceButton.create();
  voiceButton.setOnPress(() => handleVoiceToggle());

  // テキストパネルの右下に配置（Talk と左右対称）
  clearButton = new ClearButton(scene, {
    offset: new THREE.Vector3(0.13, -0.05, 0)
  });
  clearButton.create();
  clearButton.setOnPress(() => handleClearText());

  // サービスを初期化
  imageGenerator = new ImageGenerator();
  hyper3DService = new Hyper3DService();
  mangaGenerator = new MangaGenerator(imageGenerator);
  voiceInput = new RealtimeVoiceInput();

  // 深度可視化を初期化
  depthVisualization = new DepthVisualization(scene);

  // インタラクション状態を初期化
  interactionState = new InteractionState();

  // Sprite への交差判定に必要（生成コードが Sprite を使うことがある）
  setRaycastCamera(camera);

  // キーボードイベントを設定
  setupKeyboardEvents();

  // リサイズ対応
  window.addEventListener('resize', onWindowResize);

  // アニメーションループ
  renderer.setAnimationLoop(animate);
}

// テキスト入力を開始
function startTextInput() {
  textPanel.start();
  generateButton.show();
  generateButton.updatePosition(textPanel.getPanel());
  pinButton.show();
  pinButton.updatePosition(textPanel.getPanel());
  voiceButton.show();
  voiceButton.updatePosition(textPanel.getPanel());
  clearButton.show();
  clearButton.updatePosition(textPanel.getPanel());

  // 何を喋るか考えている間に接続を済ませておく（Talk 押下時の待ちを消す）
  voiceInput.prepare();
}

// テキスト入力を終了
function stopTextInput() {
  textPanel.stop();
  generateButton.hide();
  pinButton.hide();
  voiceButton.hide();
  clearButton.hide();
  if (voiceInput.isRecording()) {
    voiceInput.cancel();
    voiceButton.setRecording(false);
  }
}

// 入力中のプロンプトを消す
function handleClearText() {
  textPanel.clearPromptText();
  updateInfo('入力をクリアしました');
}

// 音声入力のトグル（録音開始 / 停止して文字起こし）
async function handleVoiceToggle() {
  if (voiceInput.isRecording()) {
    // 停止して文字起こし
    voiceButton.setRecording(false);
    voiceButton.setBusy(true);
    updateInfo('文字起こし中... 📝');
    try {
      const text = await voiceInput.stopAndTranscribe();
      if (text) {
        // 既存の入力に追記する（続けて喋れるように）
        const current = textPanel.getPromptText();
        textPanel.setPromptText(current ? `${current} ${text}` : text);
        updateInfo(`認識: ${text}`);
      } else {
        updateInfo('聞き取れませんでした');
      }
    } catch (error) {
      console.error('音声入力エラー:', error);
      updateInfo('文字起こしエラー: ' + error.message);
    } finally {
      voiceButton.setBusy(false);
      // 続けて喋る場合に備えて繋ぎ直しておく
      if (voiceButton.isVisible()) voiceInput.prepare();
    }
  } else {
    // 録音開始
    try {
      await voiceInput.start();
      voiceButton.setRecording(true);
      updateInfo('録音中... もう一度押すと確定 🎤');
    } catch (error) {
      console.error('録音開始エラー:', error);
      const hint = error.name === 'NotAllowedError'
        ? 'マイクの使用が許可されていません'
        : error.message;
      updateInfo('録音できません: ' + hint);
    }
  }
}

// ピン留めトグル処理
function handlePinToggle(isPinned) {
  textPanel.setPinned(isPinned);
  console.log('ピン留め状態:', isPinned ? 'ON' : 'OFF');
}

// プロンプトを送信（モジュール生成または再生成）
async function submitPrompt() {
  const promptText = textPanel.getPromptText();
  if (promptText.trim().length === 0) return;

  console.log('プロンプト送信:', promptText);

  // 再生成モードかどうかを確認
  const isRegenerate = interactionState.hasSelectedModule();

  if (isRegenerate) {
    await handleRegenerate(promptText);
  } else {
    await handleNewGeneration(promptText);
  }
}

// 新規生成処理
async function handleNewGeneration(promptText) {
  updateInfo('解析中... 🧠');
  textPanel.clearPromptText();

  // ボタンはローディング状態（press()内でsetLoading(true)が呼ばれている）

  let loadingId = null;

  try {
    // 漫画生成モードを検出
    if (promptText.toLowerCase().startsWith('manga:') || promptText.toLowerCase().startsWith('漫画:')) {
      const mangaTheme = promptText.replace(/^(manga:|漫画:)\s*/i, '').trim();
      if (!mangaTheme) {
        updateInfo('漫画のテーマを入力してください');
        generateButton.show();
        return;
      }
      await handleMangaGeneration(mangaTheme);
      return;
    }

    // Claude APIでプロンプトを解析
    const moduleDef = await analyzePrompt(promptText);
    console.log('モジュール定義:', moduleDef);

    // スポーン位置を決定（常にテキストボックスの上に固定）
    const spawnPosition = new THREE.Vector3();
    const offsetY = 0.2;

    if (textPanel.getPanel()) {
      spawnPosition.copy(textPanel.getPanel().position);
      spawnPosition.y += offsetY;
    } else {
      spawnPosition.set(0, 1.2 + offsetY, -0.5);
    }

    if (moduleDef.kind === 'imagePanel') {
      loadingId = loadingIndicator.show(textPanel.getPanel(), 'Creating Image', 'green');
      generateButton.setLoading(false); // ボタンのローディング状態を解除
      updateInfo('画像生成中... ✨');
      const imagePrompt = moduleDef.imagePrompt || promptText;
      const imageUrl = await imageGenerator.generate(imagePrompt, (current, max) => {
        updateInfo(`画像生成中... (${current}/${max})`);
      });

      if (imageUrl) {
        // 生成完了後にテキストパネルの現在位置を取得
        const currentSpawnPosition = new THREE.Vector3();
        if (textPanel.getPanel()) {
          currentSpawnPosition.copy(textPanel.getPanel().position);
          currentSpawnPosition.y += 0.2;
        } else {
          currentSpawnPosition.copy(spawnPosition);
        }

        const moduleId = moduleManager.spawn('imagePanel', currentSpawnPosition, {
          imageUrl: imageUrl,
          imagePrompt: imagePrompt,
          width: 0.25,
          height: 0.25
        });
        // カメラに向ける（水平方向のみ）
        lookAtCameraHorizontal(moduleId);
        loadingIndicator.hide(loadingId);
        generateButton.show();
        updateInfo('画像生成完了！');
      } else {
        loadingIndicator.hide(loadingId);
        generateButton.show();
      }
    } else if (moduleDef.kind === 'threejs') {
      loadingId = loadingIndicator.show(textPanel.getPanel(), 'Generate App', 'green');
      generateButton.setLoading(false); // ボタンのローディング状態を解除
      updateInfo('3Dオブジェクト生成中... 🎨');
      const code = await generateThreejsCode(promptText);

      // 生成完了後にテキストパネルの現在位置を取得
      const currentSpawnPosition = new THREE.Vector3();
      if (textPanel.getPanel()) {
        currentSpawnPosition.copy(textPanel.getPanel().position);
        currentSpawnPosition.y += 0.2;
      } else {
        currentSpawnPosition.copy(spawnPosition);
      }

      moduleManager.spawn('threejs', currentSpawnPosition, {
        code: code,
        prompt: promptText
      });
      loadingIndicator.hide(loadingId);
      generateButton.show();
      updateInfo(`${moduleDef.label || 'Three.js'} を生成しました！`);
    } else if (moduleDef.kind === 'hyper3d') {
      // Hyper3D 3Dモデル生成
      loadingId = loadingIndicator.show(textPanel.getPanel(), 'Creating 3D Model', 'green');
      generateButton.setLoading(false); // ボタンのローディング状態を解除

      // Step 1: 参照画像を生成
      updateInfo('参照画像を生成中... 📸');
      const imagePrompt = moduleDef.imagePrompt || promptText;
      const imageUrl = await imageGenerator.generate(imagePrompt, (current, max) => {
        updateInfo(`参照画像生成中... (${current}/${max})`);
      });

      if (!imageUrl) {
        loadingIndicator.hide(loadingId);
        generateButton.show();
        updateInfo('画像生成に失敗しました');
        return;
      }

      // Step 2: Hyper3D APIで3Dモデル生成
      updateInfo('3Dモデル生成中... 🎨');
      const glbUrl = await hyper3DService.generate(imageUrl, '', (current, max) => {
        updateInfo(`3Dモデル生成中... (${current}/${max})`);
      });

      if (!glbUrl) {
        loadingIndicator.hide(loadingId);
        generateButton.show();
        updateInfo('3Dモデル生成に失敗しました');
        return;
      }

      // 生成完了後にテキストパネルの現在位置を取得
      const currentSpawnPosition = new THREE.Vector3();
      if (textPanel.getPanel()) {
        currentSpawnPosition.copy(textPanel.getPanel().position);
        currentSpawnPosition.y += 0.2;
      } else {
        currentSpawnPosition.copy(spawnPosition);
      }

      // 3Dモデルをスポーン（ローディング完了まで表示を維持）
      updateInfo('3Dモデルをロード中...');
      moduleManager.spawn('hyper3d', currentSpawnPosition, {
        glbUrl: glbUrl,
        scale: 0.3,
        onProgress: (loaded, total) => {
          const percent = (loaded / total * 100).toFixed(0);
          updateInfo(`3Dモデルをロード中... ${percent}%`);
        },
        onLoad: () => {
          loadingIndicator.hide(loadingId);
          generateButton.show();
          updateInfo(`${moduleDef.label || '3Dモデル'} を生成しました！`);
        },
        onError: (error) => {
          loadingIndicator.hide(loadingId);
          generateButton.show();
          updateInfo('3Dモデルのロードに失敗しました');
        }
      });
    } else if (moduleDef.kind === 'manga') {
      // 漫画生成
      const mangaTheme = moduleDef.mangaPrompt || promptText;
      await handleMangaGeneration(mangaTheme);
      return; // handleMangaGenerationでloadingIndicatorを管理するので早期リターン
    }

  } catch (error) {
    console.error('モジュール生成エラー:', error);
    if (loadingId) loadingIndicator.hide(loadingId);
    generateButton.show();
    updateInfo('エラー: ' + error.message);
  }
}

// 漫画生成処理
async function handleMangaGeneration(theme) {
  let loadingId = null;

  try {
    loadingId = loadingIndicator.show(textPanel.getPanel(), 'Creating Manga', 'green');
    generateButton.setLoading(false);

    updateInfo(`漫画「${theme}」を生成開始...`);

    // 漫画を生成（表紙 + 6ページ + 裏表紙）
    const mangaResult = await mangaGenerator.generateManga(theme, (current, total, status) => {
      updateInfo(`${status} (${current}/${total})`);
      console.log(`漫画生成進捗: ${current}/${total} - ${status}`);
    });

    if (!mangaResult) {
      throw new Error('漫画生成に失敗しました');
    }

    console.log('漫画生成完了:', mangaResult);

    // スポーン位置を決定
    const spawnPosition = new THREE.Vector3();
    if (textPanel.getPanel()) {
      spawnPosition.copy(textPanel.getPanel().position);
      spawnPosition.y += 0.15;
    } else {
      spawnPosition.set(0, 1.2, -0.8);
    }

    // 漫画本をスポーン
    const moduleId = moduleManager.spawn('mangaBook', spawnPosition, {
      pages: mangaResult.pages,
      coverUrl: mangaResult.cover,
      backCoverUrl: mangaResult.backCover,
      width: 0.18,
      height: 0.25
    });

    // カメラに向ける
    lookAtCameraHorizontal(moduleId);

    loadingIndicator.hide(loadingId);
    generateButton.show();
    updateInfo(`漫画「${theme}」が完成しました！トリガーで開閉`);

  } catch (error) {
    console.error('漫画生成エラー:', error);
    if (loadingId) loadingIndicator.hide(loadingId);
    generateButton.show();
    updateInfo('漫画生成エラー: ' + error.message);
  }
}

// 再生成処理
async function handleRegenerate(promptText) {
  const { moduleId, kind, code, prompt } = interactionState.getSelectedModuleInfo();

  updateInfo('再生成中... 🔄');
  textPanel.clearPromptText();

  // ボタンはローディング状態（press()内でsetLoading(true)が呼ばれている）
  // 削除ボタンは非表示
  deleteButton.hide();

  let loadingId = null;

  try {
    if (kind === 'threejs') {
      loadingId = loadingIndicator.show(textPanel.getPanel(), 'Generate App', 'orange');
      generateButton.setLoading(false); // ボタンのローディング状態を解除
      deleteButton.show();
      // Three.jsモジュールの再生成
      const newCode = await regenerateThreejsCode(promptText, code, prompt);

      // 同じ位置・サイズで置き換え
      const newId = moduleManager.replaceModule(moduleId, 'threejs', {
        code: newCode,
        prompt: promptText
      });

      loadingIndicator.hide(loadingId);
      deselectModule();
      generateButton.show();
      updateInfo('再生成完了！');
      console.log('Three.js再生成完了:', newId);

    } else if (kind === 'imagePanel') {
      loadingId = loadingIndicator.show(textPanel.getPanel(), 'Regenerating Image', 'orange');
      generateButton.setLoading(false); // ボタンのローディング状態を解除
      deleteButton.show();
      // 画像パネルの再生成
      updateInfo('プロンプト作成中... 📝');

      // 元のプロンプトと変更指示を組み合わせて新しいプロンプトを作成
      const newImagePrompt = await imageGenerator.createRegeneratePrompt(prompt, promptText);

      updateInfo('画像再生成中... ✨');

      // 新しいプロンプトで画像を生成
      const imageUrl = await imageGenerator.generate(newImagePrompt, (current, max) => {
        updateInfo(`画像再生成中... (${current}/${max})`);
      });

      if (imageUrl) {
        // 同じ位置・サイズで置き換え
        const newId = moduleManager.replaceModule(moduleId, 'imagePanel', {
          imageUrl: imageUrl,
          imagePrompt: newImagePrompt,
          width: 0.25,
          height: 0.25
        });
        // カメラに向ける（水平方向のみ）
        lookAtCameraHorizontal(newId);

        loadingIndicator.hide(loadingId);
        deselectModule();
        generateButton.show();
        updateInfo('画像再生成完了！');
        console.log('画像再生成完了:', newId);
      } else {
        loadingIndicator.hide(loadingId);
        deselectModule();
        generateButton.show();
        updateInfo('画像生成に失敗しました');
      }
    }

  } catch (error) {
    console.error('再生成エラー:', error);
    if (loadingId) loadingIndicator.hide(loadingId);
    deselectModule();
    generateButton.show();
    updateInfo('エラー: ' + error.message);
  }
}

// モジュールを選択
function selectModule(moduleId) {
  const module = moduleManager.getModule(moduleId);
  if (!module) {
    console.log('モジュールが見つかりません');
    return;
  }

  const kind = module.kind;
  const code = module.params.code || '';
  const prompt = module.params.prompt || module.params.imagePrompt || '';
  const imageUrl = module.params.imageUrl || null;

  interactionState.selectModule(moduleId, kind, code, prompt, imageUrl);
  generateButton.setRegenerateMode(true);
  deleteButton.show();
  deleteButton.updatePosition(generateButton.getButton());
  connectionLine.show();

  console.log('モジュール選択:', moduleId, kind);
  updateInfo('再生成モード: プロンプトを入力してください');
}

// モジュール選択を解除
function deselectModule() {
  interactionState.deselectModule();
  generateButton.setRegenerateMode(false);
  deleteButton.hide();
  connectionLine.hide();

  console.log('モジュール選択解除');
}

// 選択中のモジュールを削除
function handleDelete() {
  if (!interactionState.hasSelectedModule()) return;

  const moduleId = interactionState.selectedModule;
  console.log('モジュール削除:', moduleId);

  // モジュールを削除
  moduleManager.despawn(moduleId);

  // 選択状態を解除
  deselectModule();
  updateInfo('削除しました');
}

// モジュールをカメラに向ける（水平方向のみ）
function lookAtCameraHorizontal(moduleId) {
  const module = moduleManager.getModule(moduleId);
  if (!module) return;

  // XRセッション中はviewerPoseからカメラ位置を取得
  let cameraPos = camera.position.clone();

  // モジュールの位置からカメラの方向を計算（Y軸回転のみ）
  const modulePos = module.group.position;
  const direction = new THREE.Vector3(
    cameraPos.x - modulePos.x,
    0, // Y成分を0にして水平方向のみ
    cameraPos.z - modulePos.z
  ).normalize();

  // 方向からY軸回転角度を計算
  const angle = Math.atan2(direction.x, direction.z);
  module.group.rotation.set(0, angle, 0);
}

// キーボードイベントを設定
function setupKeyboardEvents() {
  document.addEventListener('keydown', (event) => {
    // Tキーでテストスポーン（デバッグ用）
    if ((event.key === 't' || event.key === 'T') && !textPanel.isActive) {
      const testPosition = new THREE.Vector3(0, 1.0, -1.0);
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
      moduleManager.spawn('threejs', testPosition, { code: testCode, prompt: 'test cube' });
      updateInfo('テストスポーン完了');
      return;
    }

    // Mキーで漫画生成モードを開始（デバッグ用）
    if ((event.key === 'm' || event.key === 'M') && !textPanel.isActive) {
      // テキスト入力を開始して漫画生成モードに
      startTextInput();
      textPanel.setPromptText('manga: ');
      updateInfo('漫画テーマを入力してください（例: manga: プログラミング入門）');
      return;
    }

    // Tabキーでテキスト入力を開始/終了
    if (event.key === 'Tab') {
      event.preventDefault();
      if (textPanel.isActive) {
        stopTextInput();
      } else {
        startTextInput();
      }
      return;
    }

    if (!textPanel.isActive) return;

    if (event.key === 'Escape') {
      stopTextInput();
      return;
    }

    if (event.key === 'Enter') {
      submitPrompt();
      return;
    }

    if (event.key === 'Backspace') {
      event.preventDefault();
      const text = textPanel.getPromptText();
      textPanel.setPromptText(text.slice(0, -1));
      return;
    }

    if (event.key.length === 1 && !event.ctrlKey && !event.metaKey) {
      textPanel.setPromptText(textPanel.getPromptText() + event.key);
    }
  });

  // IME入力対応
  document.addEventListener('compositionend', (event) => {
    if (textPanel.isActive && event.data) {
      textPanel.setPromptText(textPanel.getPromptText() + event.data);
    }
  });
}

// コントローラーによるパネル操作
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
    if (interactionState.isDraggingPanel && interactionState.draggingInputSource === inputSource) {
      if (gripPressed) {
        handleTextPanelDrag(inputSource, frame, referenceSpace);
      } else {
        interactionState.stopTextPanelDrag();
        console.log('テキストパネルをドロップ');
      }
      interactionState.updateGripState(handedness, gripPressed);
      continue;
    }

    // 画像パネルのドラッグ中の処理
    if (interactionState.isDraggingImagePanel && interactionState.draggingInputSource === inputSource) {
      if (gripPressed) {
        handleImagePanelDrag(inputSource, frame, referenceSpace);
      } else {
        interactionState.stopImagePanelDrag();
        console.log('画像パネルをドロップ');
      }
      interactionState.updateGripState(handedness, gripPressed);
      continue;
    }

    // グリップを押した瞬間にパネルをつかむ
    if (gripPressed && !interactionState.wasGripPressedFor(handedness)) {
      const currentGripQuat = getGripQuaternion(inputSource, frame, referenceSpace);

      // 画像パネルをチェック
      if (generatedImagePanel) {
        const isImageColliding = checkImagePanelCollision(gripPosition, generatedImagePanel);
        if (isImageColliding) {
          const offset = new THREE.Vector3().copy(generatedImagePanel.position).sub(gripPosition);
          interactionState.startImagePanelDrag(inputSource, false, 0, offset);
          if (currentGripQuat) {
            interactionState.setInitialRotation(currentGripQuat, generatedImagePanel.quaternion);
          }
          console.log('画像パネルを直接グリップ:', handedness);
          interactionState.updateGripState(handedness, gripPressed);
          continue;
        }

        // レーザーでチェック
        const imageHit = raycastImagePanel(inputSource, frame, referenceSpace, generatedImagePanel);
        if (imageHit) {
          const offset = new THREE.Vector3().copy(generatedImagePanel.position).sub(imageHit.point);
          interactionState.startImagePanelDrag(inputSource, true, imageHit.distance, offset);
          if (currentGripQuat) {
            interactionState.setInitialRotation(currentGripQuat, generatedImagePanel.quaternion);
          }
          console.log('画像パネルをレーザーグリップ:', handedness);
          interactionState.updateGripState(handedness, gripPressed);
          continue;
        }
      }

      // テキストパネルをチェック
      if (textPanel.isVisible()) {
        const panel = textPanel.getPanel();
        if (textPanel.checkCollision(gripPosition)) {
          const offset = new THREE.Vector3().copy(panel.position).sub(gripPosition);
          interactionState.startTextPanelDrag(inputSource, false, 0, offset);
          if (currentGripQuat) {
            interactionState.setInitialRotation(currentGripQuat, panel.quaternion);
          }
          console.log('テキストパネルを直接グリップ:', handedness);
          interactionState.updateGripState(handedness, gripPressed);
          continue;
        }

        // レーザーでチェック
        const textHit = raycastTextPanel(inputSource, frame, referenceSpace, panel);
        if (textHit) {
          const offset = new THREE.Vector3().copy(panel.position).sub(textHit.point);
          interactionState.startTextPanelDrag(inputSource, true, textHit.distance, offset);
          if (currentGripQuat) {
            interactionState.setInitialRotation(currentGripQuat, panel.quaternion);
          }
          console.log('テキストパネルをレーザーグリップ:', handedness);
          interactionState.updateGripState(handedness, gripPressed);
          continue;
        }
      }
    }

    interactionState.updateGripState(handedness, gripPressed);
  }
}

// テキストパネルのドラッグ処理
function handleTextPanelDrag(inputSource, frame, referenceSpace) {
  const panel = textPanel.getPanel();
  const gripPosition = getGripPosition(inputSource, frame, referenceSpace);

  if (interactionState.isPanelLaserDragging) {
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
      panel.position.copy(rayOrigin).add(rayDirection.multiplyScalar(interactionState.panelLaserDragDistance)).add(interactionState.dragOffset);
    }
  } else {
    panel.position.copy(gripPosition).add(interactionState.dragOffset);
  }

  // スティック操作
  const stick = getStickValues(inputSource);
  if (Math.abs(stick.y) > 0.1) {
    if (interactionState.isPanelLaserDragging) {
      interactionState.panelLaserDragDistance -= stick.y * 0.02;
      interactionState.panelLaserDragDistance = Math.max(0.3, Math.min(5.0, interactionState.panelLaserDragDistance));
    }
  }

  if (Math.abs(stick.x) > 0.1) {
    panel.rotateY(stick.x * 0.03);
    interactionState.initialModuleQuaternion.copy(panel.quaternion);
    const currentGripQuat = getGripQuaternion(inputSource, frame, referenceSpace);
    if (currentGripQuat) {
      interactionState.initialGripQuaternion.copy(currentGripQuat);
    }
  }

  // スティック押し込みで水平にリセット
  if (isStickPressed(inputSource)) {
    const euler = new THREE.Euler().setFromQuaternion(panel.quaternion, 'YXZ');
    euler.x = 0;
    euler.z = 0;
    panel.quaternion.setFromEuler(euler);
    // 初期回転も更新
    interactionState.initialModuleQuaternion.copy(panel.quaternion);
    const currentGripQuat = getGripQuaternion(inputSource, frame, referenceSpace);
    if (currentGripQuat) {
      interactionState.initialGripQuaternion.copy(currentGripQuat);
    }
  }

  // 手の回転を適用
  if (Math.abs(stick.x) <= 0.1) {
    const currentGripQuat = getGripQuaternion(inputSource, frame, referenceSpace);
    if (currentGripQuat) {
      applyGripRotation(panel.quaternion, currentGripQuat, interactionState.initialGripQuaternion, interactionState.initialModuleQuaternion);
    }
  }

  generateButton.updatePosition(panel);
}

// 画像パネルのドラッグ処理
function handleImagePanelDrag(inputSource, frame, referenceSpace) {
  const gripPosition = getGripPosition(inputSource, frame, referenceSpace);

  if (interactionState.isImagePanelLaserDragging) {
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
      generatedImagePanel.position.copy(rayOrigin).add(rayDirection.multiplyScalar(interactionState.imagePanelLaserDragDistance)).add(interactionState.dragOffset);
    }
  } else {
    generatedImagePanel.position.copy(gripPosition).add(interactionState.dragOffset);
  }

  // スティック操作
  const stick = getStickValues(inputSource);
  if (Math.abs(stick.y) > 0.1 && interactionState.isImagePanelLaserDragging) {
    interactionState.imagePanelLaserDragDistance -= stick.y * 0.02;
    interactionState.imagePanelLaserDragDistance = Math.max(0.3, Math.min(5.0, interactionState.imagePanelLaserDragDistance));
  }

  if (Math.abs(stick.x) > 0.1) {
    generatedImagePanel.rotateY(stick.x * 0.03);
    // 回転後の状態を初期値として更新
    interactionState.initialModuleQuaternion.copy(generatedImagePanel.quaternion);
    const currentGripQuat = getGripQuaternion(inputSource, frame, referenceSpace);
    if (currentGripQuat) {
      interactionState.initialGripQuaternion.copy(currentGripQuat);
    }
  }

  // スティック押し込みで水平にリセット
  if (isStickPressed(inputSource)) {
    const euler = new THREE.Euler().setFromQuaternion(generatedImagePanel.quaternion, 'YXZ');
    euler.x = 0;
    euler.z = 0;
    generatedImagePanel.quaternion.setFromEuler(euler);
    // 初期回転も更新
    interactionState.initialModuleQuaternion.copy(generatedImagePanel.quaternion);
    const currentGripQuat = getGripQuaternion(inputSource, frame, referenceSpace);
    if (currentGripQuat) {
      interactionState.initialGripQuaternion.copy(currentGripQuat);
    }
  }

  // 手の回転を適用
  if (Math.abs(stick.x) <= 0.1) {
    const currentGripQuat = getGripQuaternion(inputSource, frame, referenceSpace);
    if (currentGripQuat) {
      applyGripRotation(generatedImagePanel.quaternion, currentGripQuat, interactionState.initialGripQuaternion, interactionState.initialModuleQuaternion);
    }
  }
}

// モジュールのコントローラー操作
function updateModuleControllerInteraction(frame, referenceSpace) {
  if (!moduleManager || !xrSession) return;

  const inputSources = xrSession.inputSources;
  if (!inputSources) return;

  // 左右のグリップ状態を収集
  let leftGripPos = null, rightGripPos = null;
  let leftGripPressed = false, rightGripPressed = false;
  let leftSource = null, rightSource = null;

  for (const inputSource of inputSources) {
    if (inputSource.targetRayMode !== 'tracked-pointer') continue;
    if (!inputSource.gripSpace) continue;

    const handedness = inputSource.handedness;
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
  if (interactionState.isTwoHandScaling && interactionState.draggingModule) {
    const module = moduleManager.modules.get(interactionState.draggingModule);
    if (leftGripPressed && rightGripPressed && leftGripPos && rightGripPos && module) {
      const currentDistance = leftGripPos.distanceTo(rightGripPos);
      const scaleFactor = currentDistance / interactionState.initialGripDistance;
      const newScale = Math.max(0.1, Math.min(5.0, interactionState.initialModuleScale * scaleFactor));
      module.group.scale.setScalar(newScale);
    } else {
      interactionState.stopTwoHandScaling();
      moduleManager.release(interactionState.draggingModule);
      interactionState.stopModuleDrag();
      console.log('両手スケーリング終了');
    }
    return;
  }

  // 片手でドラッグ中に両手スケーリング開始
  if (interactionState.draggingModule && !interactionState.isTwoHandScaling) {
    const module = moduleManager.modules.get(interactionState.draggingModule);
    if (module && leftGripPressed && rightGripPressed && leftGripPos && rightGripPos) {
      const distance = leftGripPos.distanceTo(rightGripPos);
      interactionState.startTwoHandScaling(leftSource, rightSource, distance, module.group.scale.x);
      console.log('両手スケーリング開始');
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

    // ドラッグ中
    if (interactionState.draggingModule && interactionState.draggingInputSource === inputSource) {
      if (gripPressed) {
        handleModuleDrag(inputSource, frame, referenceSpace);
      } else {
        moduleManager.release(interactionState.draggingModule);
        interactionState.stopModuleDrag();
        console.log('モジュールをドロップ');
      }
      continue;
    }

    // グリップでモジュールをつかむ
    if (gripPressed && !interactionState.isDraggingAnything()) {
      let module = moduleManager.findModuleAtPosition(gripPosition, 0.2);
      let useLaser = false;
      let distance = 0;
      let hitOffset = new THREE.Vector3();

      if (!module) {
        const hit = raycastModules(inputSource, frame, referenceSpace, moduleManager);
        if (hit) {
          module = hit.module;
          distance = hit.distance;
          hitOffset.copy(module.group.position).sub(hit.point);
          useLaser = true;
        }
      }

      if (module) {
        interactionState.startModuleDrag(module.id, inputSource, useLaser, distance, hitOffset);
        moduleManager.grab(module.id, gripPosition);
        const currentGripQuat = getGripQuaternion(inputSource, frame, referenceSpace);
        if (currentGripQuat) {
          interactionState.setInitialRotation(currentGripQuat, module.group.quaternion);
        }
        console.log('モジュールをグリップ:', module.kind, handedness, useLaser ? '(レーザー)' : '(直接)');
      }
    }
  }
}

// モジュールのドラッグ処理
function handleModuleDrag(inputSource, frame, referenceSpace) {
  const module = moduleManager.modules.get(interactionState.draggingModule);
  if (!module) return;

  const gripPosition = getGripPosition(inputSource, frame, referenceSpace);
  if (!gripPosition) return;

  if (interactionState.isLaserDragging) {
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
      // レイの方向に距離分進んだ点 + オフセット
      const hitPoint = rayOrigin.clone().add(rayDirection.clone().multiplyScalar(interactionState.laserDragDistance));
      const newPosition = hitPoint.add(interactionState.laserHitOffset);
      module.group.position.copy(newPosition);
    }
  } else {
    // 直接グリップでの移動
    moduleManager.move(interactionState.draggingModule, gripPosition);
  }

  // スティック操作
  const stick = getStickValues(inputSource);
  if (Math.abs(stick.y) > 0.1) {
    if (interactionState.isLaserDragging) {
      interactionState.laserDragDistance -= stick.y * 0.02;
      interactionState.laserDragDistance = Math.max(0.3, Math.min(5.0, interactionState.laserDragDistance));
    }
  }

  if (Math.abs(stick.x) > 0.1) {
    module.group.rotateY(stick.x * 0.03);
    interactionState.initialModuleQuaternion.copy(module.group.quaternion);
    const currentGripQuat = getGripQuaternion(inputSource, frame, referenceSpace);
    if (currentGripQuat) {
      interactionState.initialGripQuaternion.copy(currentGripQuat);
    }
  }

  if (isStickPressed(inputSource)) {
    const euler = new THREE.Euler().setFromQuaternion(module.group.quaternion, 'YXZ');
    euler.x = 0;
    euler.z = 0;
    module.group.quaternion.setFromEuler(euler);
  }

  // 手の回転を適用
  if (Math.abs(stick.x) <= 0.1) {
    const currentGripQuat = getGripQuaternion(inputSource, frame, referenceSpace);
    if (currentGripQuat) {
      applyGripRotation(module.group.quaternion, currentGripQuat, interactionState.initialGripQuaternion, interactionState.initialModuleQuaternion);
    }
  }
}

// アニメーションループ
function animate(timestamp, frame) {
  const deltaTime = lastTimestamp ? (timestamp - lastTimestamp) / 1000 : 0.016;
  lastTimestamp = timestamp;

  if (frame && xrSession) {
    const referenceSpace = renderer.xr.getReferenceSpace();

    // テキストパネルの初期位置を設定
    if (textPanel.isVisible() && !textPanel.isInitialized()) {
      textPanel.initializePosition(frame, referenceSpace, xrSession, camera);
    }

    // ピン留め時はカメラに追従
    if (textPanel.isPinnedState()) {
      textPanel.followCamera(frame, referenceSpace, xrSession, camera);
    }

    // ボタン位置を常にテキストパネルに追従
    if (textPanel.isVisible()) {
      generateButton.updatePosition(textPanel.getPanel());
      pinButton.updatePosition(textPanel.getPanel());
      voiceButton.updatePosition(textPanel.getPanel());
      clearButton.updatePosition(textPanel.getPanel());
    }

    // レーザーの表示状態を更新
    updateLaserVisibility(xrSession);

    // ボタンのホバー検出
    updateButtonHover(frame, referenceSpace);

    // トリガーによるモジュール選択を処理
    updateModuleSelection(frame, referenceSpace);

    // コントローラー操作
    updatePanelControllerInteraction(frame, referenceSpace);
    updateModuleControllerInteraction(frame, referenceSpace);

    // 接続線を更新
    updateConnectionLine();

    // 削除ボタンの位置を更新
    if (deleteButton.isVisible()) {
      deleteButton.updatePosition(generateButton.getButton());
    }

    // 深度情報を更新
    depthVisualization.update(frame, referenceSpace, camera);
  }

  // モジュールを更新
  if (moduleManager) {
    moduleManager.update(deltaTime);
  }

  // ローディングアニメーションを更新
  loadingIndicator.update(deltaTime, textPanel.getPanel());

  // ボタンのアニメーションを更新
  generateButton.update(deltaTime);
  pinButton.update(deltaTime);
  voiceButton.update(deltaTime);
  clearButton.update(deltaTime);
  deleteButton.update(deltaTime);

  // テキストパネルのアニメーションを更新
  textPanel.update(deltaTime);

  renderer.render(scene, camera);
}

// トリガーによるモジュール選択を処理
function updateModuleSelection(frame, referenceSpace) {
  if (!xrSession) return;

  const inputSources = xrSession.inputSources;
  if (!inputSources) return;

  for (const inputSource of inputSources) {
    if (inputSource.targetRayMode !== 'tracked-pointer') continue;

    const handedness = inputSource.handedness;
    if (!handedness) continue;

    const triggerPressed = isTriggerPressed(inputSource);

    // トリガーを押した瞬間を検出
    if (triggerPressed && !wasTriggerPressedState[handedness]) {
      // テキストパネルやGenerateボタンに当たっているか確認
      const textPanelHit = textPanel.isVisible() && raycastTextPanel(inputSource, frame, referenceSpace, textPanel.getPanel());
      const buttonHit = generateButton.isVisible() && raycastTextPanel(inputSource, frame, referenceSpace, generateButton.getButton());
      const deleteButtonHit = deleteButton.isVisible() && raycastTextPanel(inputSource, frame, referenceSpace, deleteButton.getButton());

      // 削除ボタンに当たっている場合
      if (deleteButtonHit) {
        deleteButton.press();
        wasTriggerPressedState[handedness] = triggerPressed;
        continue;
      }

      // テキストパネルやボタンに当たっている場合は選択解除しない
      if (textPanelHit || buttonHit) {
        wasTriggerPressedState[handedness] = triggerPressed;
        continue;
      }

      // レーザーでモジュールをヒットしているか確認
      const hit = raycastModules(inputSource, frame, referenceSpace, moduleManager);
      if (hit && hit.module) {
        // 漫画本の場合は開閉/ページめくりを処理
        if (hit.module.kind === 'mangaBook' && hit.module.instance) {
          const mangaBook = hit.module.instance;
          if (mangaBook.onPress) {
            // 閉じていれば開く、開いていれば次のページ、最後なら閉じる
            mangaBook.onPress();
          } else {
            mangaBook.toggle();
          }
          wasTriggerPressedState[handedness] = triggerPressed;
          continue;
        }

        // 既に選択中の場合は選択解除
        if (interactionState.selectedModule === hit.module.id) {
          deselectModule();
        } else {
          // 新しいモジュールを選択
          selectModule(hit.module.id);
        }
      } else {
        // モジュールに当たっていない場所でトリガーを押したら選択解除
        if (interactionState.hasSelectedModule()) {
          deselectModule();
        }
      }
    }

    wasTriggerPressedState[handedness] = triggerPressed;
  }
}

// ボタンとテキストパネルのホバー検出
function updateButtonHover(frame, referenceSpace) {
  if (!xrSession) return;

  const inputSources = xrSession.inputSources;
  if (!inputSources) return;

  let isHoveringButton = false;
  let isHoveringTextPanel = false;
  let isHoveringPinButton = false;
  let isHoveringVoiceButton = false;
  let isHoveringClearButton = false;
  let isHoveringDeleteButton = false;

  for (const inputSource of inputSources) {
    if (inputSource.targetRayMode !== 'tracked-pointer') continue;

    // このコントローラーのレーザーが出ていない場合はスキップ
    if (!isLaserVisibleForHandedness(inputSource.handedness)) continue;

    // Generateボタンのホバーチェック
    if (generateButton.isVisible()) {
      const buttonHit = raycastTextPanel(inputSource, frame, referenceSpace, generateButton.getButton());
      if (buttonHit) {
        isHoveringButton = true;
      }
    }

    // ピン留めボタンのホバーチェック
    if (pinButton.isVisible()) {
      const pinHit = raycastTextPanel(inputSource, frame, referenceSpace, pinButton.getButton());
      if (pinHit) {
        isHoveringPinButton = true;
      }
    }

    // 音声入力ボタンのホバーチェック
    if (voiceButton.isVisible()) {
      const voiceHit = raycastTextPanel(inputSource, frame, referenceSpace, voiceButton.getButton());
      if (voiceHit) {
        isHoveringVoiceButton = true;
      }
    }

    // クリアボタンのホバーチェック
    if (clearButton.isVisible()) {
      const clearHit = raycastTextPanel(inputSource, frame, referenceSpace, clearButton.getButton());
      if (clearHit) {
        isHoveringClearButton = true;
      }
    }

    // 削除ボタンのホバーチェック
    if (deleteButton.isVisible()) {
      const deleteHit = raycastTextPanel(inputSource, frame, referenceSpace, deleteButton.getButton());
      if (deleteHit) {
        isHoveringDeleteButton = true;
      }
    }

    // テキストパネルのホバーチェック
    if (textPanel.isVisible()) {
      const panelHit = raycastTextPanel(inputSource, frame, referenceSpace, textPanel.getPanel());
      if (panelHit) {
        isHoveringTextPanel = true;
      }
    }
  }

  generateButton.setHovered(isHoveringButton);
  pinButton.setHovered(isHoveringPinButton);
  voiceButton.setHovered(isHoveringVoiceButton);
  clearButton.setHovered(isHoveringClearButton);
  deleteButton.setHovered(isHoveringDeleteButton);
  textPanel.setHovered(isHoveringTextPanel);
}

// 接続線を更新
function updateConnectionLine() {
  if (!interactionState.hasSelectedModule() || !connectionLine) return;

  const module = moduleManager.getModule(interactionState.selectedModule);
  if (!module) {
    deselectModule();
    return;
  }

  const panel = textPanel.getPanel();
  if (!panel) return;

  // モジュールの位置とテキストパネルの位置を接続
  connectionLine.update(module.group.position, panel.position);
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
    return;
  }

  if (xrSession) {
    console.log('XRセッションは既に開始されています');
    return;
  }

  const button = document.getElementById('start-button');
  if (button) button.disabled = true;

  try {
    updateInfo('MRセッションを開始中...');

    const supported = await navigator.xr.isSessionSupported('immersive-ar');
    if (!supported) {
      updateInfo('immersive-ARがサポートされていません');
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
    scene.background = null;

    // コントローラーを取得
    rightController = renderer.xr.getController(0);
    leftController = renderer.xr.getController(1);
    scene.add(rightController);
    scene.add(leftController);

    // レーザーポインターを追加
    const rightLaser = createLaser();
    const leftLaser = createLaser();
    rightController.add(rightLaser);
    leftController.add(leftLaser);
    setLasers(leftLaser, rightLaser);

    // selectイベント
    const hiddenInput = document.getElementById('hidden-input');
    let lastKeyboardCloseTime = 0;
    const KEYBOARD_COOLDOWN = 1000; // キーボードを閉じてから1秒以内は再オープンしない

    // キーボードが閉じられた時間を記録
    if (hiddenInput) {
      hiddenInput.addEventListener('blur', () => {
        lastKeyboardCloseTime = Date.now();
      });
    }

    const onSelect = (event) => {
      const controller = event.target;

      // このコントローラーのレーザーが表示されていない場合は何もしない
      if (!isLaserVisibleForController(controller)) {
        return;
      }

      const raycaster = new THREE.Raycaster();
      raycaster.camera = camera;
      const tempMatrix = new THREE.Matrix4();
      tempMatrix.identity().extractRotation(controller.matrixWorld);
      raycaster.ray.origin.setFromMatrixPosition(controller.matrixWorld);
      raycaster.ray.direction.set(0, 0, -1).applyMatrix4(tempMatrix);

      // 生成ボタンをタップ
      if (generateButton.isVisible()) {
        const buttonIntersects = raycaster.intersectObject(generateButton.getButton(), true);
        if (buttonIntersects.length > 0) {
          generateButton.press();
          return;
        }
      }

      // ピン留めボタンをタップ
      if (pinButton.isVisible()) {
        const pinIntersects = raycaster.intersectObject(pinButton.getButton(), true);
        if (pinIntersects.length > 0) {
          pinButton.press();
          return;
        }
      }

      // 音声入力ボタンをタップ
      if (voiceButton.isVisible()) {
        const voiceIntersects = raycaster.intersectObject(voiceButton.getButton(), true);
        if (voiceIntersects.length > 0) {
          voiceButton.press();
          return;
        }
      }

      // クリアボタンをタップ
      if (clearButton.isVisible()) {
        const clearIntersects = raycaster.intersectObject(clearButton.getButton(), true);
        if (clearIntersects.length > 0) {
          clearButton.press();
          return;
        }
      }

      // 削除ボタンをタップ
      if (deleteButton.isVisible()) {
        const deleteIntersects = raycaster.intersectObject(deleteButton.getButton(), true);
        if (deleteIntersects.length > 0) {
          deleteButton.press();
          return;
        }
      }

      // テキストパネルをタップ
      if (textPanel.isVisible() && hiddenInput) {
        const intersects = raycaster.intersectObject(textPanel.getPanel(), true);
        if (intersects.length > 0) {
          if (!USE_SYSTEM_KEYBOARD) {
            // システムキーボードは使えないので音声入力へ誘導する
            updateInfo('🎤 Talk ボタンで音声入力できます');
          } else {
            const now = Date.now();
            // キーボードを閉じてからクールダウン中は再オープンしない
            if (now - lastKeyboardCloseTime > KEYBOARD_COOLDOWN) {
              hiddenInput.value = textPanel.getPromptText();
              hiddenInput.focus();
              hiddenInput.click();
            }
          }
        }
      }
    };
    rightController.addEventListener('selectstart', onSelect);
    leftController.addEventListener('selectstart', onSelect);

    // ハンドトラッキング
    hand1 = renderer.xr.getHand(0);
    hand2 = renderer.xr.getHand(1);
    scene.add(hand1);
    scene.add(hand2);

    startTextInput();

    if (button) button.style.display = 'none';
    window.dispatchEvent(new Event('xr-session-start'));

    if (xrSession.depthUsage) {
      updateInfo('MRセッション開始 (深度センサー有効)');
    } else {
      updateInfo('MRセッション開始 (深度センサー無効)');
    }

    xrSession.addEventListener('end', () => {
      xrSession = null;
      depthVisualization.dispose();
      window.dispatchEvent(new Event('xr-session-end'));
      updateInfo('MRセッション終了');
      if (button) {
        button.style.display = 'block';
        button.disabled = false;
      }
    });

  } catch (error) {
    console.error('XRセッション開始エラー:', error);
    updateInfo('エラー: ' + error.message);
    if (button) button.disabled = false;
  }
}

// 初期化実行
init();

// イベントリスナー
const startButton = document.getElementById('start-button');
if (startButton) {
  startButton.addEventListener('click', startXR);
}

const depthToggleButton = document.getElementById('depth-toggle');
if (depthToggleButton) {
  depthToggleButton.addEventListener('click', () => {
    const enabled = depthVisualization.toggle();
    depthToggleButton.textContent = enabled ? '深度表示 ON' : '深度表示 OFF';
  });

  window.addEventListener('xr-session-start', () => {
    depthToggleButton.style.display = 'block';
  });

  window.addEventListener('xr-session-end', () => {
    depthToggleButton.style.display = 'none';
    depthVisualization.setEnabled(false);
    depthToggleButton.textContent = '深度表示 OFF';
  });
}

const hiddenInputElement = document.getElementById('hidden-input');
if (hiddenInputElement) {
  hiddenInputElement.addEventListener('input', (e) => {
    textPanel.setPromptText(e.target.value);
  });

  hiddenInputElement.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      submitPrompt();
      hiddenInputElement.value = '';
      textPanel.clearPromptText();
    }
  });
}
