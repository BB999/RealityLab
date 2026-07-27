# 2026-07-27 「three.js の生成物が出てこない」— 無言のフォールバックが API 障害を隠していた

## 問題

「Three.jsで スーパーマリオに出てくるクリボーを作ってください」と指示しても、
three.js の生成物が出てこない。エラーも出ない。

## 原因

3つが重なっていて、**どれも表に出ていなかった**。

### 1. 根本原因: Anthropic API のクレジット切れ

分類に使っている Claude API が `400 invalid_request_error` を返していた。

```
Your credit balance is too low to access the Anthropic API.
```

### 2. その失敗を、無言のフォールバックが隠していた ← これが本体

`analyzePrompt`（`modules/PromptAnalyzer.js`）は、API が失敗すると
**無条件で画像生成にフォールバック**していた。

```js
function createFallback(prompt) {
  return {
    kind: 'imagePanel',
    label: prompt,
    imagePrompt: prompt,   // ← 生のユーザー入力がそのまま画像プロンプトになる
    mangaPrompt: ''
  };
}
```

これが発動する条件は3つあり、**API エラーもここに含まれていた**。

- `!response.ok`（＝今回のクレジット切れ）
- `JSON.parse` 失敗
- fetch 例外

結果、次の連鎖が起きる。

```
分類が 400 で失敗
  → フォールバックで kind: 'imagePanel'
  → imagePrompt に「Three.jsで棒人形を作ってください。」がそのまま入る
  → fal.ai に画像生成として送られる
  → fal が 422 (no_media_generated) を返す ← 画像生成の指示になっていないので当然
  → VR 内には何も出ない
```

**ユーザーから見える情報がゼロ**なうえ、判定できていないのに
**課金の走る画像生成が勝手に実行される**。
最初 fal のクレジット切れを疑ったが、fal は正常だった。

### 3. エラーの詳細がログで潰れていた

- `/api/claude` は HTTP ステータスをログに出していなかった（所要時間だけ）
- fal のエラーは `console.error('...', error)` に生オブジェクトを渡していたため、
  理由が入っている `body.detail` が `[Object]` に潰れて読めなかった

## 修正

### `modules/PromptAnalyzer.js` — フォールバックを廃止

`createFallback()` を**削除**し、失敗時は throw するようにした。
呼び出し側（`app.js` の `handleGenerate`）には既に catch があり、
`updateInfo('エラー: ' + error.message)` で VR 内に表示され、
`generateButton.show()` でボタンも操作可能な状態に戻る。

判定できていない時点でユーザーの意図（three.js なのか画像なのか）は不明なので、
推測で課金を走らせない。

VR のパネルは狭く API の英語原文は読めないので、`describeClaudeError()` で短い日本語にする。

```js
if (message.includes('credit balance')) return 'Anthropic のクレジットが不足しています';
if (status === 401 || status === 403) return 'Anthropic の APIキーが無効です';
if (status === 429) return 'リクエストが多すぎます。少し待ってください';
return `プロンプトの判定に失敗しました (${status})`;
```

### `modules/PromptAnalyzer.js` — 明示された手法を最優先にする

そもそも分類プロンプトに「ユーザーが手法を明示したらそれに従う」ルールが**無かった**。
題材だけで判断するため、「クリボー」＝キャラクター → 画像、となり
「Three.jsで」は完全に無視されていた。

Rules の先頭に最優先ルールとして追加した。

```
- If the user names the technique, that overrides every rule below.
    "Three.jsで", "with Three.js", "コードで"  -> threejs
    "画像で", "イラストで", "as an image"      -> imagePanel
    "3Dモデルで", "as a 3D model"              -> hyper3d
    "漫画で", "as a manga"                     -> manga
```

「ツール名を出すのは *どう作るか* の指示であって題材の説明ではない」と明示してある。

### `server.js` — 失敗理由をログに出す

- `/api/claude`: 所要時間に加えて `status=` を出し、非 2xx のときは本文も `console.error`
- fal (`/api/generate-image`, `/api/generate-3d`): `describeFalError()` を追加して
  `body` を JSON 展開する。クライアントに返すメッセージにも同じものを乗せた

## 検証

API を直接叩いて、スキーマではなく残高が原因であることを確定させた。
クレジット投入後に同じリクエストで確認。

```
HTTP 200
{"kind":"threejs","label":"Three.jsでスーパーマリオのクリボーを作成","imagePrompt":"","mangaPrompt":""}
```

題材がキャラクターでも、明示された手法が優先されている。

## 補足: Structured Outputs の実装は正しかった

疑ったが、`PromptAnalyzer` の API 呼び出しに問題はなかった（公式ドキュメントで確認）。

- `output_config.format` が正しい形式（`output_format` のほうが非推奨）
- **beta ヘッダーは不要**（structured outputs は GA）
- `claude-haiku-4-5` は structured outputs をサポートしている
- `MODULE_SCHEMA` は制約を満たしている
  - 全オブジェクトに `additionalProperties: false` が**必須**
  - 数値制約（`minimum` 等）・文字列制約（`minLength` 等）・再帰スキーマは**使えない**

スキーマを変更する際はこの制約に注意すること。違反すると 400 になる。
