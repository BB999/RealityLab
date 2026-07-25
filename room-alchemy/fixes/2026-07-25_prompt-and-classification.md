# Three.js生成プロンプトの簡素化と判定の確実化

同日の [2026-07-25_claude-model-opus5-migration.md](./2026-07-25_claude-model-opus5-migration.md) に続く作業。

## 問題

### 1. Three.js生成にユーザーの入力がそのまま届いていなかった

「星空を作って」と入力しても、Claude に届く頃には別物になっていた。加工が2段入っていたため：

1. `analyzePrompt()` が `threejsPrompt` として英語の詳細説明に書き換え（`app.js:272`）
2. `generateThreejsCode()` が「【対象プロンプト】」で囲み、末尾に「リアルな寸法・構造・比率で製品レベルの3Dモデルを作成し」を付加

特に 2 の文言は、花火やパーティクルのようなエフェクト系を作るときに阻害要因になっていた。

### 2. 判定結果が捨てられる経路があった

`analyzePrompt()` は応答から正規表現 `/\{[\s\S]*\}/`（貪欲マッチ）でJSONを抜き出し、制御文字と改行をスペースに置換してから `JSON.parse` していた。この置換は過去にパースが壊れたことへの対症療法と思われる。

ここで失敗すると `createFallback()` に落ち、**判定内容に関わらず常に `imagePanel`** になる。判定精度以前に、判定結果が破棄される経路だった。

### 3. threejs と hyper3d の境界が曖昧

判断基準が「実在物か抽象か」だけで、両者のコストが非対称であることがプロンプトに書かれていなかった。threejs は数秒、hyper3d は画像生成→3D再構成で数分かかる。誤って hyper3d に倒れると、VR内で数分待たされる。

### 4. デッドコード

- `modules/DSLParser.js`（172行）— YAMLパーサー。`starfield` / `fireworks` という現存しないモジュール種別を前提にした設計初期の遺物。どこからも import されていない
- `analyzePromptLocal()` — 「キーワードベースの判定」と称しつつ中身は常に `imagePanel` を返すだけ。`createFallback()` と重複

## 原因

プロンプトの加工層が増築され、どの層が何を担うか整理されていなかった。JSON抽出は Structured Outputs を使わず自前パースしていたため、応答形式のゆらぎに弱かった。

## 修正

### Three.jsプロンプトをユーザー入力そのままに

| ファイル | 変更 |
|---|---|
| `app.js:272` | `moduleDef.threejsPrompt \|\| promptText` を廃止し、`promptText` を直接 `generateThreejsCode()` へ |
| `app.js:286` | `spawn` に渡す `prompt` も `promptText` に |
| `modules/PromptAnalyzer.js:150` | user メッセージを `content: description` のみに（テンプレ文言を削除） |
| `modules/PromptAnalyzer.js:256` | 再生成側も定型文を削除し、元プロンプト・変更指示・既存コードの骨組みだけに |
| `modules/PromptAnalyzer.js` | 使われなくなった `threejsPrompt` をJSONスキーマから削除 |

`systemPrompt`（技術制約）は残した。`dynamicThreejs.js` が `new Function('THREE','group','meshes','animationCallbacks', code)` でコードを実行するため、`import` 文の禁止・変数の再宣言禁止・`group`/`meshes` への追加はいずれも動作条件であり、外すと実行時エラーになる。

### Structured Outputs でJSONを保証

`modules/PromptAnalyzer.js` に `MODULE_SCHEMA` を定義し、`output_config.format` で渡すようにした。`kind` は enum で `threejs` / `imagePanel` / `hyper3d` / `manga` の4値に固定。

これに伴い正規表現マッチと制御文字除去を削除し、`JSON.parse` 一発にした。パース失敗時のフォールバックは refusal 等の異常系に備えて残してある。

### 判定基準の書き直し

`systemPrompt` に threejs / hyper3d の判断軸を追加：

- 動き・光・粒子が主役か → threejs
- 実物の表面・材質・シルエットが主役か → hyper3d
- 幾何プリミティブは「3D」と言われても threejs
- コストが非対称であること（数秒 vs 数分）を明記し、迷ったら threejs を選ばせる

### `params` の廃止

Claude が常に `{}` を返すだけで機能していなかったため、スキーマ・`systemPrompt`・`createFallback()` から削除。`app.js:256` は固定値 `0.25` に変更した。

### デッドコード削除

- `modules/DSLParser.js` を削除
- `modules/PromptAnalyzer.js` から `analyzePromptLocal()` を削除

## 検証

実APIで7ケース試し、**7/7 が期待通りに判定された**。

| 入力 | 判定 | 応答時間 |
|---|---|---|
| 花火を作って | threejs | 5.0s |
| 回転する立方体 | threejs | 2.5s |
| 光る粒子が舞ってる | threejs | 2.8s |
| 椅子を作って | hyper3d | 5.8s |
| 猫 | hyper3d | 4.0s |
| 夕焼けの風景画 | imagePanel | 4.7s |
| 宇宙飛行士の漫画 | manga | 3.0s |

Structured Outputs は生の `fetch` でも問題なく機能し、`imagePrompt` / `mangaPrompt` も該当しない場合は空文字で返ってきた。

### 判明した事実：Opus 5 でも `content[0]` は text ブロック

移行時に「Opus 5 は thinking がデフォルト有効なので `content[0]` が thinking ブロックになりうる」と想定して `extractText()` を導入したが、**実際の応答の `content` には text ブロックしか含まれなかった**（`display` の既定値が `"omitted"` のため）。

```
content ブロック types : text
content[0].text        : "{\"ok\":true}"
```

したがって `extractText()` は必須の修正ではなく予防的な堅牢化。型で絞るぶん安全なので残してある。

## 残課題

- 判定に 2.5〜5.8秒かかっている。分類タスクなので `output_config: { effort: "low" }` で短縮できる余地がある
- モデルID `claude-opus-5` が6箇所に散在（前回からの継続課題）
- `VITE_ANTHROPIC_API_KEY` がブラウザから直叩きで露出（前回からの継続課題）
- 明示プレフィックスは `manga:` / `漫画:` のみ。`漫画：`（全角コロン）は拾えない
