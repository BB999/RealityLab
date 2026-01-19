import { createVREnvironment, removeVREnvironment } from './vrEnvironment.js';
import { cleanupDepth } from './depthSensor.js';
import { onSelectStart, onSelectEnd } from './controllers.js';

// MRセッション開始
export async function startXR(renderer, scene, mini4car, updateInfo, onSessionStart, onSessionEnd) {
  if (!navigator.xr) {
    updateInfo('WebXRがサポートされていません');
    alert('このデバイスはWebXRをサポートしていません');
    return null;
  }

  try {
    updateInfo('MRセッションを開始中...');

    // immersive-ar モードをサポートしているか確認
    const supported = await navigator.xr.isSessionSupported('immersive-ar');

    if (!supported) {
      updateInfo('immersive-ARがサポートされていません');
      alert('このデバイスはAR機能をサポートしていません');
      return null;
    }

    // XRセッション開始（深度センサー、平面検出、ハンドトラッキングを有効化）
    const xrSession = await navigator.xr.requestSession('immersive-ar', {
      requiredFeatures: [],
      optionalFeatures: ['local-floor', 'bounded-floor', 'depth-sensing', 'plane-detection', 'hand-tracking'],
      depthSensing: {
        usagePreference: ['cpu-optimized', 'gpu-optimized'],
        dataFormatPreference: ['luminance-alpha', 'float32']
      }
    });

    await renderer.xr.setSession(xrSession);

    // コントローラーを取得
    const rightController = renderer.xr.getController(0);
    const leftController = renderer.xr.getController(1);
    scene.add(rightController);
    scene.add(leftController);

    // 右コントローラーのグラブイベント（MR用）- グリップボタンで掴む
    rightController.addEventListener('squeezestart', () => onSelectStart(mini4car, rightController));
    rightController.addEventListener('squeezeend', onSelectEnd);

    // ハンドトラッキングを取得
    const hand1 = renderer.xr.getHand(0);
    const hand2 = renderer.xr.getHand(1);
    scene.add(hand1);
    scene.add(hand2);

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

    if (onSessionStart) {
      onSessionStart();
    }

    updateInfo('MRセッション開始');

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
      // 深度関連のリソースをクリーンアップ
      cleanupDepth(scene);

      // セッション終了イベントを発火
      window.dispatchEvent(new Event('xr-session-end'));

      if (onSessionEnd) {
        onSessionEnd();
      }

      updateInfo('MRセッション終了');
      if (button) {
        button.style.display = 'block';
      }
      if (vrButton) {
        vrButton.style.display = 'block';
      }
    });

    return {
      xrSession,
      rightController,
      leftController,
      hand1,
      hand2
    };

  } catch (error) {
    console.error('XRセッション開始エラー:', error);
    console.error('エラー名:', error.name);
    console.error('エラーメッセージ:', error.message);
    console.error('エラー詳細:', JSON.stringify(error, null, 2));
    updateInfo('エラー: ' + (error.message || error.name || 'Unknown error'));
    alert('MRセッションを開始できませんでした: ' + (error.message || error.name || 'Unknown error'));
    return null;
  }
}

// VRセッション開始
export async function startVR(renderer, scene, mini4car, updateInfo, onSessionStart, onSessionEnd) {
  if (!navigator.xr) {
    updateInfo('WebXRがサポートされていません');
    alert('このデバイスはWebXRをサポートしていません');
    return null;
  }

  try {
    updateInfo('VRセッションを開始中...');

    // immersive-vr モードをサポートしているか確認
    const supported = await navigator.xr.isSessionSupported('immersive-vr');

    if (!supported) {
      updateInfo('immersive-VRがサポートされていません');
      alert('このデバイスはVR機能をサポートしていません');
      return null;
    }

    // XRセッション開始（VRモード）
    const xrSession = await navigator.xr.requestSession('immersive-vr', {
      requiredFeatures: [],
      optionalFeatures: ['local-floor', 'bounded-floor', 'hand-tracking']
    });

    await renderer.xr.setSession(xrSession);

    // VR環境（背景とグリッド）を作成
    createVREnvironment(scene);

    // コントローラーを取得
    const rightController = renderer.xr.getController(0);
    const leftController = renderer.xr.getController(1);
    scene.add(rightController);
    scene.add(leftController);

    // 右コントローラーのグラブイベント（VR用）- グリップボタンで掴む
    rightController.addEventListener('squeezestart', () => onSelectStart(mini4car, rightController));
    rightController.addEventListener('squeezeend', onSelectEnd);

    // ハンドトラッキングを取得
    const hand1 = renderer.xr.getHand(0);
    const hand2 = renderer.xr.getHand(1);
    scene.add(hand1);
    scene.add(hand2);

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

    if (onSessionStart) {
      onSessionStart();
    }

    updateInfo('VRセッション開始');

    xrSession.addEventListener('end', () => {
      // VR環境を削除
      removeVREnvironment(scene);

      // セッション終了イベントを発火
      window.dispatchEvent(new Event('xr-session-end'));

      if (onSessionEnd) {
        onSessionEnd();
      }

      updateInfo('VRセッション終了');
      if (button) {
        button.style.display = 'block';
      }
      if (vrButton) {
        vrButton.style.display = 'block';
      }
    });

    return {
      xrSession,
      rightController,
      leftController,
      hand1,
      hand2
    };

  } catch (error) {
    console.error('VRセッション開始エラー:', error);
    console.error('エラー名:', error.name);
    console.error('エラーメッセージ:', error.message);
    console.error('エラー詳細:', JSON.stringify(error, null, 2));
    updateInfo('エラー: ' + (error.message || error.name || 'Unknown error'));
    alert('VRセッションを開始できませんでした: ' + (error.message || error.name || 'Unknown error'));
    return null;
  }
}
