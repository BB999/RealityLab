# Room Alchemy XR開発プラットフォーム比較調査

## 調査日: 2026-01-11

## 概要

Room Alchemyアプリケーションを他のXRプラットフォームで再現できるかの調査結果。

---

## 現在のアプリケーション構成

### 技術スタック

| 項目 | 技術 |
|------|------|
| フレームワーク | Web (Node.js + Vite + Three.js) |
| XR API | WebXR API |
| 3D描画 | Three.js + WebGL |
| バックエンド | Express (HTTPS) |
| AI API | fal.ai (Nano Banana Pro, Hyper3D Rodin V2) |

### 主要機能

1. **画像生成** - Claude APIでプロンプト強化 → fal.ai Nano Banana Pro
2. **3Dモデル生成** - fal.ai Hyper3D Rodin V2 (GLB形式)
3. **漫画生成** - 見開き2ページの日本語漫画

### XR機能

- `immersive-ar` セッション
- ハンドトラッキング (hand-tracking)
- 平面検出 (plane-detection)
- 深度センシング (depth-sensing)
- コントローラーレーザーポインタ
- Raycastベースのインタラクション

---

## プラットフォーム比較

### 1. Expo Go

**結論: ❌ 再現不可**

| 理由 | 詳細 |
|------|------|
| WebXR非対応 | Expo GoはWebXR APIをサポートしていない |
| バックエンド実行不可 | Node.jsサーバーを実行できない |
| WebGL制限 | `canvas.getContext('webgl')`のサポートが不十分 |
| HTTPS制限 | 自己署名証明書との互換性問題 |

---

### 2. Unity + AR Foundation

**結論: ✅ 再現可能**

#### 対応状況

| 機能 | Unity対応 | 実現方法 |
|------|----------|----------|
| AR/MR | ✅ | AR Foundation (ARCore/ARKit) |
| 3D描画 | ✅ | Unity標準3Dエンジン |
| ハンドトラッキング | ✅ | XR Hands / Quest Hand Tracking |
| 平面検出 | ✅ | AR Foundation Plane Manager |
| 深度センシング | ✅ | AR Foundation Occlusion |
| GLB読み込み | ✅ | glTFast / UniGLTF |
| UI | ✅ | XR Interaction Toolkit |
| API通信 | ✅ | UnityWebRequest |

#### 必要なパッケージ

```
- AR Foundation
- XR Interaction Toolkit
- XR Hands
- glTFast または UniGLTF
- Newtonsoft JSON
```

#### メリット

- 成熟した安定したプラットフォーム
- Meta Quest、HoloLens、iPhoneなどマルチプラットフォーム対応
- 豊富なドキュメントとコミュニティ

#### デメリット

- C#での再実装が必要
- ライセンス費用（規模による）
- ビルド・配布の手間

---

### 3. Android Studio (従来のARCore)

**結論: ⚠️ 困難**

| 問題点 | 詳細 |
|--------|------|
| 3Dエンジン選定 | Sceneform非推奨、Filamentは低レベル |
| ハンドトラッキング | 従来のARCoreは非対応 |
| GLB読み込み | カスタム実装が必要 |

---

### 4. Android XR (Jetpack XR SDK)

**結論: ✅ 再現可能（ただしQuest非対応）**

#### 対応状況

| 機能 | 対応 | 備考 |
|------|------|------|
| AR/MR | ✅ | ARCore for Jetpack XR |
| ハンドトラッキング | ✅ | 26関節追跡対応 |
| 平面検出 | ✅ | 対応 |
| 深度センシング | ✅ | 対応 |
| フェイストラッキング | ✅ | 68ブレンドシェイプ |

#### SDK情報

```
バージョン: androidx.xr.arcore:arcore-*:1.0.0-alpha09
IDE: Android Studio Canary
エミュレータ: 36.4.3以降
```

#### 対応デバイス

- Samsung Galaxy XR
- Project Aura by XREAL
- AIグラス

#### 注意点

- Developer Preview 3（アルファ版）
- **Meta Questは対象外**

---

### 5. Meta Spatial SDK ⭐ 推奨

**結論: ✅ 完全に再現可能**

#### 対応状況

| 機能 | 対応 | 実現方法 |
|------|------|----------|
| 3D描画 | ✅ | Spatial SDK標準 |
| パススルー/MR | ✅ | Passthrough対応 |
| ハンドトラッキング | ✅ | Interaction SDK統合 |
| 平面検出 | ✅ | 自動検出（床、壁、テーブル） |
| 深度/オクルージョン | ✅ | 対応 |
| GLB読み込み | ✅ | 3Dモデル対応 |
| API通信 | ✅ | 標準Android機能 |
| カメラアクセス | ✅ | Passthrough Camera API |

#### 開発環境

```
IDE: Android Studio (Narwhal Feature Drop 2025.1.2推奨)
言語: Kotlin / Java
プラグイン: Meta Horizon Android Studio Plugin
テスト: Meta Spatial Simulator（ヘッドセット不要）
```

#### 対応デバイス

- Meta Quest 2
- Meta Quest 3
- Meta Quest 3S
- Meta Quest Pro

#### 特徴

- **Unity/Unreal不要** - ゲームエンジンなしで開発可能
- **Kotlin/Java対応** - Android開発者に馴染みやすい
- **Spatial Simulator** - ヘッドセットなしでテスト可能
- **90fps安定** - 複雑なシーンでもスムーズ
- **React Native/Flutter移植** - 既存アプリの移植も可能

#### メリット

- Quest向けネイティブ開発
- Unity/Unrealライセンス不要
- Android Studioの豊富なツール活用
- ヘッドセットなしでのテスト環境

#### 参考リンク

- [Meta Spatial SDK概要](https://developers.meta.com/horizon/documentation/spatial-sdk/spatial-sdk-explainer/)
- [Spatial SDK開発ガイド](https://developers.meta.com/horizon/documentation/spatial-sdk/spatial-sdk-development/)
- [Passthrough Camera API](https://developers.meta.com/horizon/documentation/spatial-sdk/spatial-sdk-pca-overview)
- [Meta Spatial Simulator](https://developers.meta.com/horizon/blog/meta-spatial-simulator-android-horizon-os)

---

## 総合比較表

| 項目 | WebXR (現状) | Unity | Android XR | Meta Spatial SDK |
|------|-------------|-------|------------|------------------|
| Quest対応 | ✅ | ✅ | ❌ | ✅ |
| ハンドトラッキング | ✅ | ✅ | ✅ | ✅ |
| 平面検出 | ✅ | ✅ | ✅ | ✅ |
| 開発言語 | JavaScript | C# | Kotlin | Kotlin/Java |
| ネイティブ性能 | 中 | 高 | 高 | 高 |
| 配布方法 | URL共有 | ストア | ストア | ストア |
| ヘッドセット不要テスト | ❌ | ❌ | ✅ | ✅ |
| 成熟度 | ✅ 安定 | ✅ 安定 | ⚠️ アルファ | ✅ 安定 |
| ライセンス費用 | 無料 | 規模による | 無料 | 無料 |

---

## 推奨事項

### Quest向け開発を継続する場合

**Meta Spatial SDK** を推奨

理由:
1. Unity/Unrealなしでネイティブ開発可能
2. Android Studioで完結
3. Spatial Simulatorでヘッドセットなしテスト
4. Kotlin/Javaの既存スキルを活用

### マルチプラットフォーム展開する場合

**Unity + AR Foundation** を推奨

理由:
1. Quest、HoloLens、iOS、Androidすべて対応
2. 成熟したエコシステム
3. 豊富な学習リソース

---

## 次のステップ

### Meta Spatial SDKで移植する場合

1. [ ] Android Studio Narwhal Feature Drop 2025.1.2 インストール
2. [ ] Meta Horizon Android Studio Plugin インストール
3. [ ] Meta Spatial Simulator セットアップ
4. [ ] サンプルプロジェクト作成・動作確認
5. [ ] 基本的なMR機能（パススルー、平面検出）の実装
6. [ ] ハンドトラッキングの実装
7. [ ] GLBモデル読み込み機能の実装
8. [ ] fal.ai API通信の実装
9. [ ] UIコンポーネント（TextPanel, Button等）の移植
10. [ ] 全体統合とテスト

### 調査が必要な項目

- [ ] Meta Spatial SDKでのGLBランタイム読み込み方法の詳細
- [ ] Interaction SDKのジェスチャー認識詳細
- [ ] Passthrough Camera APIの制限事項

---

## 調査ソース

- [Meta Spatial SDK overview](https://developers.meta.com/horizon/documentation/spatial-sdk/spatial-sdk-explainer/)
- [Meta's Spatial SDK Upgrades 2025](https://www.uploadvr.com/meta-spatial-sdk-mid-2025-upgrades/)
- [Passthrough Camera API](https://developers.meta.com/horizon/documentation/spatial-sdk/spatial-sdk-pca-overview)
- [Meta Spatial Simulator](https://developers.meta.com/horizon/blog/meta-spatial-simulator-android-horizon-os)
- [Building Your First Android App for Meta Quest](https://proandroiddev.com/building-your-first-android-app-using-kotlin-for-meta-quest-headset-8ab768b1a18b)
- [Android XR Jetpack SDK](https://developer.android.com/develop/xr/jetpack-xr-sdk/arcore)
- [Work with hands using ARCore for Jetpack XR](https://developer.android.com/develop/xr/jetpack-xr-sdk/arcore/hands)
