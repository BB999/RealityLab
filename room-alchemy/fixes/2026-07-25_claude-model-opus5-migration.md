# Claude モデルの廃止対応と Opus 5 への移行

## 問題

Claude API を呼ぶ 6 箇所のうち 4 箇所が `claude-3-5-haiku-20241022` を指定していた。このモデルは 2026-02-19 に廃止済みで、API は 404 を返す。

いずれの呼び出しもフォールバック付きだったため、エラーで停止せず「静かに品質が落ちた状態」で動作していた。実害は以下：

- `ImageGenerator.enhancePrompt()` — 英訳・プロンプト強化が効かず、日本語のまま fal.ai に渡っていた
- `ImageGenerator.createRegeneratePrompt()` — 元プロンプトと変更指示を単純結合していた
- `PromptAnalyzer.analyzePrompt()` — モジュール種別の判定ができず、`createFallback()` により**常に `imagePanel`** になっていた。「椅子を作って」でも hyper3d の 3D モデルではなく板ポリの画像が生成される
- `MangaGenerator.createMangaPrompt()` — ページごとのプロンプトがハードコードのフォールバックに固定

## 原因

モデル ID をコードに直接埋め込んでおり、モデル廃止に追従していなかった。加えて `!response.ok` 時のフォールバックが握りつぶしとして機能し、404 が表面化しなかった。

## 修正

6 箇所すべてを `claude-opus-5` に統一。あわせて `max_tokens` を引き上げた。

Opus 5 は thinking がデフォルトで有効になっており、`max_tokens` は thinking と応答テキストの**合計**上限として働く。従来の 300〜500 のままでは thinking に消費されて応答が空、または途中で切れるため。

| ファイル | 行 | 変更前 | 変更後 |
|---|---|---|---|
| `modules/services/ImageGenerator.js` | 22-23 | `claude-3-5-haiku-20241022` / 300 | `claude-opus-5` / 4000 |
| `modules/services/ImageGenerator.js` | 162-163 | `claude-3-5-haiku-20241022` / 400 | `claude-opus-5` / 4000 |
| `modules/services/MangaGenerator.js` | 77-78 | `claude-3-5-haiku-20241022` / 500 | `claude-opus-5` / 4000 |
| `modules/PromptAnalyzer.js` | 60-61 | `claude-3-5-haiku-20241022` / 500 | `claude-opus-5` / 4000 |
| `modules/PromptAnalyzer.js` | 147-148 | `claude-sonnet-4-5-20250929` / 4000 | `claude-opus-5` / 16000 |
| `modules/PromptAnalyzer.js` | 253-254 | `claude-sonnet-4-5-20250929` / 4000 | `claude-opus-5` / 16000 |

Three.js コード生成の 2 箇所（147, 253）は出力が長いため 16000 とした。

## 残課題

- レイテンシが気になる場合、軽い変換タスク（ImageGenerator 2 箇所、MangaGenerator、analyzePrompt）に `output_config: { effort: "low" }` を追加すると thinking が浅くなり応答が速くなる
- モデル ID が 6 箇所に散っている。定数化すると次回の移行が 1 行で済む
- `VITE_ANTHROPIC_API_KEY` がブラウザから直叩きされており、クライアントに露出している。公開する場合は fal.ai と同様に `server.js` 経由へ移すべき
