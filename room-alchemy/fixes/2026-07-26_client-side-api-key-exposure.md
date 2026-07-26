# 2026-07-26 APIキーがビルド成果物に埋め込まれていた問題

## 問題

`dist/assets/index-*.js` に Anthropic の API キー（`sk-ant-`）が**平文で含まれていた**。

`.gitignore` に

```
# dist/ # GitHub Pagesで公開するため除外しない
```

とあり `dist/` は追跡対象にする設計だったため、コミット＆プッシュすると
**公開リポジトリと GitHub Pages の両方に鍵が載る**状態だった。

git 履歴に一度入ると、後からファイルを消しても履歴の書き換えなしには除去できない。

## 原因

`app.js` がブラウザから Anthropic API を直接叩いていた。

```js
const ANTHROPIC_API_KEY = import.meta.env.VITE_ANTHROPIC_API_KEY;
// → fetch('https://api.anthropic.com/v1/messages', {
//      headers: { 'x-api-key': apiKey,
//                 'anthropic-dangerous-direct-browser-access': 'true' } })
```

**Vite は `import.meta.env.VITE_*` をビルド時に値そのものへ静的置換する。**
つまり `VITE_` を付けた環境変数は、定義上クライアントへ配布される。

### 重要: シークレット管理サービスに移しても解決しない

「`.env` をやめて Infisical から読めば安全になるのでは」という発想は自然だが、**これでは直らない**。

```
.env       → vite build → dist/assets/*.js に埋め込まれる
Infisical  → vite build → dist/assets/*.js に埋め込まれる   ← 同じ
```

問題は「鍵をどこに保管するか」ではなく「**鍵をブラウザに配ってしまうこと**」。
保管先を変えても、ビルド時にバンドルへ入る事実は変わらない。

`infisical run -- npm run build` としても、出来上がる `dist` は同じく鍵入りになる。
ここを取り違えると「Infisical にしたから安全」と誤認したまま公開してしまう。

## 修正

fal.ai と同じ「サーバーがキーを持つ」構成に揃えた。

### サーバー側（`server.js`）

`POST /api/claude` を追加。リクエストボディをそのまま Anthropic に転送し、
ステータスと本文をそのまま返す薄いプロキシ。呼び出し側のエラーハンドリングは変えずに済む。

- キーは `ANTHROPIC_API_KEY` を優先し、移行中は `VITE_ANTHROPIC_API_KEY` も読む
- `express.json` の上限を既定の 100kb から **10mb** に引き上げ
  （`regenerateThreejsCode` が既存コードを丸ごと送るため足りなかった）
- `[time] claude(モデル名)` の所要時間ログ付き

### クライアント側（5箇所）

| ファイル | 箇所 |
|---|---|
| `modules/PromptAnalyzer.js` | 3（analyze / generate / regenerate） |
| `modules/services/ImageGenerator.js` | 1（createRegeneratePrompt） |
| `modules/services/MangaGenerator.js` | 1（createMangaPrompt） |

- 宛先を `/api/claude` に変更
- `x-api-key` と `anthropic-dangerous-direct-browser-access` ヘッダを削除
- 不要になった `apiKey` の引き回しを撤去
  （関数引数、`ImageGenerator` / `MangaGenerator` のコンストラクタ引数、
  `app.js` の `ANTHROPIC_API_KEY` 定数）

## 検証

`dist/` を作り直して確認：

```
sk-ant-                      検出なし
sk-proj-                     検出なし
x-api-key                    検出なし
dangerous-direct-browser     検出なし
api.anthropic.com            検出なし
```

プロキシの疎通も確認（`HTTP 200`、Haiku 4.5 から応答）。

## 幸いだったこと

発覚時点で **git 履歴に秘密情報は 0 件**、`.env` のコミット履歴も無し。
`dist/` は一度も追跡されていなかった（`??` の状態）ため、**実際の漏洩は発生していない**。
公開前に気付けたので鍵の再発行は不要。

## 残タスク

- サーバーが Infisical からキーを受け取るようにする
  （`infisical run --env=dev -- node server.js`）。これで `.env` をディスクから無くせる
- `infisical scan install --pre-commit-hook` を導入し、コミット前スキャンを自動化する
- 上記が済んだら `.env` の `VITE_ANTHROPIC_API_KEY` を `ANTHROPIC_API_KEY` に改名する
  （`VITE_` のままだと、将来クライアント側で誤って参照したときに同じ事故が起きる）
