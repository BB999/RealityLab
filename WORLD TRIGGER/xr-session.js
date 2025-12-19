import * as THREE from 'three';
import { XRHandModelFactory } from 'three/addons/webxr/XRHandModelFactory.js';

import {
  createVREnvironment,
  removeVREnvironment,
  cleanupDepth
} from './vr-environment.js';

// XRセッション用変数
let xrSession = null;
let rightController = null;
let leftController = null;
let hand1 = null;
let hand2 = null;
let handModelFactory = null;
let handModel1 = null;
let handModel2 = null;

// 外部参照
let sceneRef = null;
let rendererRef = null;

// コールバック
let onSessionStartCallback = null;
let onSessionEndCallback = null;
let onVRModeChangeCallback = null;

// 初期化
export function initXRSession(scene, renderer, callbacks = {}) {
  sceneRef = scene;
  rendererRef = renderer;
  onSessionStartCallback = callbacks.onSessionStart || null;
  onSessionEndCallback = callbacks.onSessionEnd || null;
  onVRModeChangeCallback = callbacks.onVRModeChange || null;
}

// UI更新
function updateInfo(text) {
  const info = document.getElementById('info');
  if (info) {
    info.textContent = text;
  }
}

// MRセッション開始
export async function startXR() {
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
        usagePreference: ['cpu-optimized'],
        dataFormatPreference: ['luminance-alpha']
      }
    });

    await rendererRef.xr.setSession(xrSession);

    rightController = rendererRef.xr.getController(0);
    leftController = rendererRef.xr.getController(1);
    sceneRef.add(rightController);
    sceneRef.add(leftController);

    hand1 = rendererRef.xr.getHand(0);
    hand2 = rendererRef.xr.getHand(1);
    sceneRef.add(hand1);
    sceneRef.add(hand2);

    const button = document.getElementById('start-button');
    if (button) {
      button.style.display = 'none';
    }
    const vrButton = document.getElementById('vr-button');
    if (vrButton) {
      vrButton.style.display = 'none';
    }

    window.dispatchEvent(new Event('xr-session-start'));

    if (onSessionStartCallback) {
      onSessionStartCallback(false); // isVR = false
    }

    updateInfo('MRセッション開始');

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

      cleanupDepth(sceneRef);

      window.dispatchEvent(new Event('xr-session-end'));

      if (onSessionEndCallback) {
        onSessionEndCallback(false); // isVR = false
      }

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
export async function startVR() {
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

    await rendererRef.xr.setSession(xrSession);

    createVREnvironment(sceneRef);

    if (onVRModeChangeCallback) {
      onVRModeChangeCallback(true);
    }

    rightController = rendererRef.xr.getController(0);
    leftController = rendererRef.xr.getController(1);
    sceneRef.add(rightController);
    sceneRef.add(leftController);

    hand1 = rendererRef.xr.getHand(0);
    hand2 = rendererRef.xr.getHand(1);
    sceneRef.add(hand1);
    sceneRef.add(hand2);

    handModelFactory = new XRHandModelFactory();
    handModel1 = handModelFactory.createHandModel(hand1, 'mesh');
    handModel2 = handModelFactory.createHandModel(hand2, 'mesh');
    hand1.add(handModel1);
    hand2.add(handModel2);

    const button = document.getElementById('start-button');
    if (button) {
      button.style.display = 'none';
    }
    const vrButton = document.getElementById('vr-button');
    if (vrButton) {
      vrButton.style.display = 'none';
    }

    window.dispatchEvent(new Event('xr-session-start'));

    if (onSessionStartCallback) {
      onSessionStartCallback(true); // isVR = true
    }

    updateInfo('VRセッション開始');

    xrSession.addEventListener('end', () => {
      xrSession = null;

      removeVREnvironment(sceneRef);

      if (handModel1) {
        hand1.remove(handModel1);
        handModel1 = null;
      }
      if (handModel2) {
        hand2.remove(handModel2);
        handModel2 = null;
      }
      handModelFactory = null;

      window.dispatchEvent(new Event('xr-session-end'));

      if (onSessionEndCallback) {
        onSessionEndCallback(true); // isVR = true
      }

      if (onVRModeChangeCallback) {
        onVRModeChangeCallback(false);
      }

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

// セッション取得
export function getXRSession() {
  return xrSession;
}

// コントローラー取得
export function getRightController() {
  return rightController;
}

export function getLeftController() {
  return leftController;
}

// ハンド取得
export function getHand1() {
  return hand1;
}

export function getHand2() {
  return hand2;
}

// ボタン演出後の遅延時間（ms）
const BUTTON_EFFECT_DELAY = 1500;

// ボタンイベント設定
export function setupXRButtons() {
  const startButton = document.getElementById('start-button');
  if (startButton) {
    startButton.addEventListener('click', () => {
      // 1.5秒後にXRセッション開始（ボタン演出後）
      setTimeout(startXR, BUTTON_EFFECT_DELAY);
    });
  }

  const vrButton = document.getElementById('vr-button');
  if (vrButton) {
    vrButton.addEventListener('click', () => {
      // 1.5秒後にVRセッション開始（ボタン演出後）
      setTimeout(startVR, BUTTON_EFFECT_DELAY);
    });
  }
}
