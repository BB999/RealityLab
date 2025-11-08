# Helicopter MR

Quest 3でヘリコプターの3Dモデルを表示するMRアプリケーション

## 特徴

- WebXRを使用したMR（Mixed Reality）対応
- Three.jsによる3Dモデル表示
- ヘリコプターモデルの自動回転アニメーション
- Vite + vite-plugin-mkcertによるHTTPS開発環境

## セットアップ

```bash
cd helicopter-mr
npm install
```

## 使用方法

### 開発サーバーの起動

```bash
npm run dev
```

初回起動時に自動的にローカル証明書が生成される。

サーバーが起動したら、Quest 3のブラウザで `https://[あなたのPCのIPアドレス]:3000` にアクセス。

### ビルド

```bash
npm run build
```

ビルドされたファイルは `dist` フォルダに出力される。

### プレビュー

```bash
npm run preview
```

## 必要要件

- Meta Quest 3
- Node.js 18以上
- WebXR対応ブラウザ（Quest 3の標準ブラウザ）

## ファイル構成

- `index.html` - メインのHTMLファイル
- `main.js` - Three.jsのロジック
- `vite.config.js` - Viteの設定（HTTPS対応）
- `ヘリ.glb` - ヘリコプターの3Dモデル
