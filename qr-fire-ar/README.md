# QR Fire AR - QRコードで炎を表示するARアプリ

iPhoneのカメラでQRマーカーをスキャンすると、AR空間に炎が表示されるWebアプリです。

## 使い方

### 1. マーカーを印刷

`marker.png`（Hiroマーカー）を印刷するか、画面に表示してください。

マーカーのダウンロード:
- [Hiro Marker](https://github.com/AR-js-org/AR.js/blob/master/data/images/hiro.png)

### 2. ローカルサーバーを起動

HTTPSが必要なため、ローカルサーバーを起動します：

```bash
cd qr-fire-ar
python3 -m http.server 8000
```

または、VS Code Live Serverなどを使用

### 3. iPhoneでアクセス

1. iPhoneとPCを同じWi-Fiに接続
2. PCのローカルIPアドレスを確認（例: 192.168.1.5）
3. iPhoneのSafariで `http://[PCのIP]:8000` にアクセス
4. カメラ権限を許可
5. Hiroマーカーにカメラを向ける
6. 炎が表示される！

## 技術スタック

- **A-Frame**: VR/AR用のWebフレームワーク
- **AR.js**: マーカーベースARライブラリ
- **Particle System**: 炎と煙のエフェクト

## 炎エフェクトの仕組み

1. **メインの炎**: オレンジ〜赤のパーティクルが上昇
2. **煙**: グレーのパーティクルが炎の上で拡散
3. **光源**: 炎の中心から発光

## カスタマイズ

`index.html`の以下の部分を編集することで、炎の見た目を変更できます：

```javascript
// 炎の色
color: #FF4500, #FFD700, #FF0000

// パーティクル数
particleCount: 200

// 炎の速度
velocityValue: 0 2 0
```

## トラブルシューティング

### カメラが起動しない
- HTTPSでアクセスしているか確認（ローカルならHTTPでもOK）
- ブラウザのカメラ権限を確認

### マーカーを認識しない
- マーカーが明るい場所にあるか確認
- マーカー全体がカメラに映っているか確認
- カメラとマーカーの距離を調整（20cm〜1m程度）

### 炎が表示されない
- ブラウザのコンソールでエラーを確認
- インターネット接続を確認（CDNからライブラリを読み込むため）

## 本番環境へのデプロイ

GitHub Pages、Netlify、Vercelなどにデプロイすれば、どこからでもアクセス可能：

```bash
# 例: GitHub Pagesにデプロイ
git add qr-fire-ar/
git commit -m "Add QR Fire AR app"
git push origin main
```

設定でGitHub Pagesを有効化すれば、`https://[username].github.io/[repo]/qr-fire-ar/`でアクセスできます。
