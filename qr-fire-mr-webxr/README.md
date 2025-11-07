# WebXR MR Fire - Quest 3 マーカーベース炎MRアプリ

Quest 3のMRモードで、マーカー画像の上に炎が表示されるWebアプリです。

## 特徴

- **Quest 3専用MRアプリ**
- **MindAR**による画像トラッキング
- **パススルー映像**に炎のエフェクトを重ねて表示
- **マーカーベース**で安定したトラッキング

## 必要なもの

1. **Meta Quest 3**
2. **マーカー画像**（`marker.png`を印刷）
3. **HTTPSサーバー**

## 使い方

### 1. マーカーを印刷

`marker.png` を印刷してください。A4サイズ程度が適切です。

### 2. HTTPSサーバーを起動

```bash
cd qr-fire-mr-webxr
python3 ../qr-fire-ar/server.py
```

または新しくサーバーを立てる：

```bash
python3 -m http.server 8443 --bind 0.0.0.0
```

### 3. Quest 3でアクセス

1. Quest 3を装着
2. ブラウザ（Meta Quest Browser）を起動
3. `https://[PCのIP]:8443` にアクセス
4. 証明書の警告を許可
5. 「MRモードに入る」ボタンをタップ
6. カメラ権限を許可
7. マーカーにヘッドセットを向ける
8. 炎が表示される！

## PCのIPアドレス確認方法

### Mac
```bash
ifconfig | grep "inet " | grep -v 127.0.0.1
```

### Windows
```bash
ipconfig
```

## トラブルシューティング

### カメラが起動しない
- HTTPSでアクセスしているか確認
- Quest 3のカメラ権限を確認
- ブラウザを再起動

### マーカーを認識しない
- マーカー全体がカメラの視野に入っているか確認
- 明るい場所で使用
- マーカーとの距離を調整（30cm〜1m程度）
- マーカーが平らな場所に置かれているか確認

### 炎が表示されない
- ブラウザのコンソールでエラーを確認
- インターネット接続を確認（CDNからライブラリを読み込むため）
- ページを再読み込み

### MRモードボタンが反応しない
- Quest 3のブラウザで開いているか確認
- WebXR API対応ブラウザか確認

## 技術スタック

- **A-Frame**: WebVR/WebXRフレームワーク
- **MindAR**: 画像トラッキングライブラリ
- **WebXR Device API**: Quest 3のMR機能にアクセス
- **Three.js**: 3Dグラフィックスエンジン（A-Frameの内部）

## カスタマイズ

### 炎の色を変更

`index.html`の`material`プロパティを編集：

```html
<a-sphere
    material="color: #FF4500; emissive: #FF4500;"
    ...
></a-sphere>
```

### 炎の大きさを変更

`radius`と`position`を調整：

```html
<a-sphere
    position="0 0.5 0"
    radius="0.3"
    ...
></a-sphere>
```

### アニメーション速度を変更

`animation`の`dur`（ミリ秒）を調整：

```html
animation="... dur: 500 ..."
```

## 自分のマーカーを使う方法

1. **マーカー画像を作成**
   - 特徴点の多い画像が良い（テクスチャが豊富）
   - 推奨サイズ: 640x480以上

2. **MindAR Compilerでコンパイル**
   - https://hiukim.github.io/mind-ar-js-doc/tools/compile
   - 画像をアップロード
   - `targets.mind`をダウンロード

3. **ファイルを置き換え**
   - 新しい`targets.mind`で上書き
   - マーカー画像も差し替え

## オンラインデプロイ

GitHub Pages、Netlify、Vercelなどにデプロイ可能：

```bash
# 例: GitHub Pages
git add qr-fire-mr-webxr/
git commit -m "Add WebXR MR Fire app"
git push origin main
```

設定でGitHub Pagesを有効化すれば、Quest 3からどこでもアクセス可能になります。

## 比較: AR.js版との違い

| 機能 | AR.js版 | WebXR MR版 |
|------|---------|------------|
| 対応デバイス | iPhone, Android | Quest 3 |
| マーカー | Hiroマーカー | カスタム画像 |
| モード | AR（カメラ映像） | MR（パススルー） |
| 没入感 | 低 | 高 |
| 操作 | タッチ | ハンドトラッキング/コントローラー |

## ライセンス

MIT License
