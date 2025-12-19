import * as THREE from 'three';

// 共有オーディオマネージャー
let audioListener = null;
let audioLoader = null;
let sceneRef = null;
let initialized = false;

// オーディオマネージャーを初期化
export function initAudioManager(camera, scene) {
  if (initialized) return;

  audioListener = new THREE.AudioListener();
  camera.add(audioListener);

  audioLoader = new THREE.AudioLoader();
  sceneRef = scene;
  initialized = true;

  console.log('オーディオマネージャー初期化完了');
}

// AudioListenerを取得
export function getAudioListener() {
  return audioListener;
}

// AudioLoaderを取得
export function getAudioLoader() {
  return audioLoader;
}

// シーン参照を取得
export function getAudioScene() {
  return sceneRef;
}

// 初期化済みかどうか
export function isAudioInitialized() {
  return initialized;
}

// 3Dポジショナルサウンドを再生（共有関数）
export function playPositionalSound(buffer, position, volume = 1.0) {
  if (!buffer || !audioListener || !sceneRef) return;

  const sound = new THREE.PositionalAudio(audioListener);
  sound.setBuffer(buffer);
  sound.setRefDistance(0.5);  // 0.5mで最大音量（近くで大きく）
  sound.setMaxDistance(15);   // 15mで聞こえなくなる
  sound.setRolloffFactor(1);
  sound.setVolume(volume);

  const soundObject = new THREE.Object3D();
  soundObject.position.copy(position);
  soundObject.add(sound);
  sceneRef.add(soundObject);

  sound.play();

  sound.onEnded = () => {
    sceneRef.remove(soundObject);
    sound.disconnect();
  };
}

// 音声ファイルをロード
export function loadAudioBuffer(path, callback) {
  if (!audioLoader) {
    console.error('AudioLoaderが初期化されていません');
    return;
  }

  audioLoader.load(path, (buffer) => {
    console.log(`音声ロード完了: ${path}`);
    if (callback) callback(buffer);
  }, undefined, (err) => {
    console.error(`音声ロードエラー: ${path}`, err);
  });
}
