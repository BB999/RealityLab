---
name: threejs-bloom
description: Three.js最新版のBloomエフェクト（renderer.setEffects + UnrealBloomPass）をセットアップする。Three.jsのBloom、光る表現、ポストプロセッシング、setEffects に関する質問や実装時に使用する。
---

# Three.js Bloom セットアップ

## 重要ルール

- **Three.jsは常に最新バージョンを使用すること**
  - `npm install three@latest` で最新版をインストール
  - 既にインストール済みの場合も `npm update three` で最新化する
  - **`postprocessing` パッケージは不要**（Three.js内蔵のBloomを使うため）。存在したら `npm uninstall postprocessing` で削除する
  - 旧来の `EffectComposer` 方式は使わない。**必ず `renderer.setEffects()` 方式を使うこと**

## セットアップ手順

### 1. インポート

```javascript
import * as THREE from 'three';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
```

### 2. レンダラー設定

`outputBufferType: THREE.HalfFloatType` が**必須**。これがないと `setEffects` が正しく動作しない。

```javascript
const renderer = new THREE.WebGLRenderer({
  antialias: true,
  alpha: true,  // MR（パススルー）対応の場合
  outputBufferType: THREE.HalfFloatType
});
renderer.toneMapping = THREE.ACESFilmicToneMapping;
```

### 3. Bloomパス設定

```javascript
const bloomPass = new UnrealBloomPass(
  new THREE.Vector2(window.innerWidth, window.innerHeight),
  1.5,   // strength - 光の強さ
  0.4,   // radius - 光の広がり
  0.85   // threshold - この輝度以上のピクセルが光る
);
renderer.setEffects([bloomPass]);
```

### 4. レンダリング

`renderer.setEffects()` を使う場合、通常の `renderer.render(scene, camera)` だけでBloomが自動適用される。EffectComposerは不要。

```javascript
function animate() {
  renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);
```

## パラメータガイド

| パラメータ | 標準値 | 範囲 | 説明 |
|-----------|--------|------|------|
| strength | 1.5 | 0.0 ~ 3.0 | 光の強さ。高いほど強く光る |
| radius | 0.4 | 0.0 ~ 1.0 | 光の広がり。高いほど広範囲に光が滲む |
| threshold | 0.85 | 0.0 ~ 1.0 | 閾値。低いほど暗いピクセルも光る |

## MR（Mixed Reality）対応

MRで使用する場合の追加設定：

- `alpha: true` は必須（パススルー表示のため）
- `scene.background` は設定しない（nullのまま）
- `renderer.xr.enabled = true`

```javascript
const session = await navigator.xr.requestSession('immersive-ar', {
  optionalFeatures: ['local-floor', 'bounded-floor', 'hand-tracking', 'layers']
});
await renderer.xr.setSession(session);
```

## パーティクルを光らせるコツ

`AdditiveBlending` と組み合わせると効果的：

```javascript
const material = new THREE.PointsMaterial({
  blending: THREE.AdditiveBlending,
  depthWrite: false,
  transparent: true
});
```

## 注意事項

- `renderer.setEffects()` はThree.js r182以降で使用可能
- 旧来の `EffectComposer` 方式はWebXR非対応
- `postprocessing` ライブラリ（npmの別パッケージ）は使わない
