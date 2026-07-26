# 2026-07-26 音声入力の遅延調査と OpenAI Realtime API への移行

## 問題

音声入力から生成までが体感で遅い。ただし計測コードが無く、どこが遅いのか分かっていなかった
（`MangaGenerator.js` にだけ時間計測があった）。

## 計測して分かったこと

各所に `[time]` プレフィックスのログを追加して実測した。

### 音声入力（Whisper / fal 経由）

| 区間 | 1回目 (76KB) | 2回目 (98KB) |
|---|---|---|
| `transcribe.upload`（fal.storage へアップロード） | 2.6秒 | 2.8秒 |
| `transcribe.whisper`（キュー待ち + 推論） | 3.2秒 | 10.7秒 |
| `transcribe.total` | **5.9秒** | **13.5秒** |
| `transcribe.roundtrip`（Quest 側の往復） | 6.1秒 | 13.6秒 |

- **Quest ↔ サーバー間は 0.1〜0.2秒**。Wi-Fi は原因ではなかった
- **upload はサイズに比例しない**。76KB と 98KB で 0.2秒しか変わらない
  → 帯域ではなく fal.storage への接続確立の固定オーバーヘッド。回線を太くしても直らない
- **whisper の内訳はキュー待ちが支配的**。2回目は `IN_QUEUE` で 5.3秒待たされていた。制御不能

### 生成パス

| 処理 | 実測 |
|---|---|
| `analyzePrompt`（初回） | 5.1秒 |
| `analyzePrompt`（2回目以降） | 1.5秒 |
| `generateThreejsCode` | 5.0秒 |
| `generate-image`（nano-banana-pro） | 18.7秒 |

- `analyzePrompt` の初回だけ遅いのは **Structured Outputs のスキーマコンパイル**。
  新しい JSON スキーマは初回に一度コンパイルされ 24時間キャッシュされる
- `generateThreejsCode` は事前予想の「数十秒」に反して 5.0秒だった。
  `max_tokens: 16000` は上限であって実出力ではない（実際の出力は30行程度）。
  ストリーミング化は不要と判断
- `generate-image` はキュー待ちゼロで純粋な推論時間。詰める余地がない

## 原因

音声入力が「録音を全部溜める → アップロード → キュー投入 → 推論」というバッチ構造だったこと。
接続オーバーヘッドもキュー待ちも、喋り終わってから始まる推論も、すべて構造由来で
回線やモデルの改善では消えない。

## 修正

### 1. 計測ログの追加

- `server.js` に `since()` ヘルパー。`transcribe.upload` / `.whisper` / `.total`、
  `generate-image`、`generate-3d`、`realtime-token`
- `modules/PromptAnalyzer.js` に `analyzePrompt` / `generateThreejsCode` / `regenerateThreejsCode`
- `modules/services/VoiceInput.js:89` に `transcribe.roundtrip`
- キュー更新ログにも経過秒を付けて、キュー待ちと推論を切り分けられるようにした

### 2. analyzePrompt を Haiku 4.5 に変更

`modules/PromptAnalyzer.js:97` — 分類のみのタスクに Opus 5 は過剰。
Structured Outputs は Haiku 4.5 でも使えるため `MODULE_SCHEMA` の enum 縛りは維持される。
判定精度・英訳品質とも実測で問題なし（whisper が "Three.js" を "3.js" と誤認識しても
正しく threejs と判定した）。

### 3. OpenAI Realtime API 版の音声入力を追加（比較用に併存）

- `modules/services/RealtimeVoiceInput.js`（新規）
- `server.js` に `POST /api/realtime-token`（ephemeral token 発行、有効期限10分）
- `modules/ui/VoiceButton.js` にラベルと位置のオプションを追加して使い回し
- `app.js` — トグル処理を `toggleVoiceInput()` に共通化し、サービスとボタンだけ差し替え

**結果: 6.1〜13.6秒 → 0.2〜0.5秒**

### 4. 死にコードの削除

- `ImageGenerator.enhancePrompt()` — `analyzePrompt` が `imagePrompt` を返すようになった名残で
  どこからも呼ばれていなかった（Opus 5 呼び出しを含む39行）
- `ImageGenerator` の `falApiKey` — 保持するだけで未使用。fal 呼び出しはサーバー経由になっていた
- `app.js` の `FAL_API_KEY` — 上記の唯一の利用先だった

**これは掃除以上の意味があった。** `import.meta.env.VITE_FAL_API_KEY` は Vite がビルド時に
値を直接埋め込むため、使っていない fal のキーが `dist/assets/index-*.js` に平文で
入っていた。削除により配布物から消えた。

### 5. server.js のネットワーク IP 表示

`192.168.128.171` がハードコードされていたが DHCP で `.114` に変わっていた。
`os.networkInterfaces()` から起動時に実際の IP を出すよう変更。

## Realtime API 実装でハマった点（3つ）

### (1) ephemeral token のフィールド名がドキュメントと違う

API リファレンスには `client_secret` に入ると書かれているが、
**実際のレスポンスはトップレベルの `value`**。

```json
{ "value": "ek_...", "expires_at": 1234567890, "session": { ... } }
```

`server.js` では両方の形に対応させた。

### (2) `openai-beta.realtime-v1` サブプロトコルで弾かれる

```
beta_api_shape_disabled: The Realtime Beta API is no longer supported.
Please use /v1/realtime for the GA API.
```

GA 版ではこのサブプロトコルは廃止。正しくは以下の2つだけ:

```js
new WebSocket('wss://api.openai.com/v1/realtime', [
  'realtime',
  `openai-insecure-api-key.${ephemeralKey}`
]);
```

`?intent=transcription` クエリも旧ベータの形式なので不要。
セッション種別は ephemeral token 発行時の `session.type: "transcription"` に紐づく。

### (3) server_vad 使用時の手動 commit が弾かれる

```
input_audio_buffer_commit_empty: buffer only has 0.00ms of audio.
```

`server_vad` は喋りの切れ目で**自動的に commit する**ため、停止時にもう一度手動 commit を
送ると二重になる。

最初「送信済みサンプル数が 100ms 以上なら commit」という判定にしたが**これも誤り**。
server_vad は**無音を破棄する**ので、送信サンプル数はサーバー側のバッファ状態を表さない。
ボタンを押しっぱなしにしている間の無音でカウンタだけ増え、かえって誤爆が増える。

正しくは VAD の発話状態で判定する:

| イベント | 状態 |
|---|---|
| `input_audio_buffer.speech_started` | `speechActive = true` |
| `input_audio_buffer.speech_stopped` | `false`（VAD が commit する） |
| `input_audio_buffer.committed` | `false` |

**`speechActive` が true のとき＝喋っている途中でボタンを止めたときだけ** 手動 commit する。

## 最終結果

| | ボタン停止 → テキスト確定 |
|---|---|
| Whisper（fal 経由） | 6.1秒 / 13.6秒 |
| **Realtime API** | **0.2〜0.5秒** |

接続の 1.5〜1.9秒は喋り始める前に完了するため体感には出ない。

## 比較後の整理（同日）

実測で決着がついたため Whisper 版を撤去し、Realtime 版に一本化した。

- `modules/services/VoiceInput.js` を削除（Whisper + MediaRecorder 版）
- `⚡ RT` ボタンを `🎤 Talk` に戻し、**テキストパネルの左下** `(-0.13, -0.05, 0)` へ移動
- 変数名を `voiceButton` / `voiceInput` に統一（中身は `RealtimeVoiceInput`）
- 2系統を切り替えるために作った `toggleVoiceInput(input, button, label)` の共通化を解除し、
  `handleVoiceToggle()` 1本に戻した。同時録音を防ぐガードも不要になったため削除

`server.js` の `/api/transcribe`（fal-ai/whisper）は残してある。エンドポイント単体では
害がなく、Realtime が使えない状況での退避先として機能するため。
完全に不要と判断した時点で消してよい。

## 追加課題: ボタン押下から REC 表示までが約2秒（同日・解決済み）

### 問題

Talk を押してから REC 表示に切り替わるまで体感で2秒ほどかかる。

移行時に「接続の1.5秒は喋り始める前に済むので体感には出ない」と書いたが**これは誤り**だった。
`await voiceInput.start()` の完了後に `setRecording(true)` していたため、
接続時間がそのまま「押してから反応がない時間」になっていた。

### 内訳（サブ計測を追加して判明）

| 区間 | 実測 |
|---|---|
| `realtime.connect.mic` | 0.06秒 |
| `realtime.connect.token` | **0.61秒** |
| `realtime.connect.socket` | **1.02秒** |
| `realtime.connect.pipeline` | 0.02秒 |
| 合計 | 1.65秒 |

token + socket で 1.63/1.65秒。どちらも Quest → OpenAI のネットワーク往復で、
socket はトークンを必要とするため直列。並列化では縮まない。

### 修正

**1. 接続の前倒し（`RealtimeVoiceInput.prepare()`）**

トークン取得と WebSocket 接続を、テキスト入力を開いた時点で先に済ませる。
`app.js` の `startTextInput()` と、録音完了後の `finally` から呼ぶ。

マイクだけは押下時まで取得しない（パネルを開いただけで録音インジケータが点くのを避けるため）。
先読みが失敗しても `start()` 側で通常経路に落ちるので壊れない。

**2. AudioContext と AudioWorklet の使い回し**

録音のたびに `new AudioContext()` + `addModule()` していた（`_teardownAudio` で
`close()` していたため）。`suspend()` に変更して残すようにし、2回目以降は丸ごとスキップ。
`pipeline` が 0.02秒に。

**3. ボタンの 200ms 遅延を除去**

`VoiceButton.press()` が押下アニメーションのため `setTimeout(..., 200)` の中で
`onPress()` を呼んでいた。アニメーションは残したまま、ハンドラは即座に呼ぶよう変更。

**4. 空 commit エラーの再発を無害化**

`speechActive` ガードを入れてもエラーが再発した。原因は発話後のノイズで
`speech_started` が再度発火し、`speechActive` が true のまま残るため。

`input_audio_buffer_commit_empty` は「commit するものが無い」という**正常な状態**なので、
エラーとして扱わず黙って無視するよう変更（従来は `lastError` に入り、無音時に
文字起こしエラーが表示される可能性があった）。

**5. WebSocket 切断時に `this.ws` を捨てる**

残したままだと `prepare()` が「接続済み」と誤判定して繋ぎ直せない。

### 結果

| | 修正前 | 修正後 |
|---|---|---|
| 押下 → REC 表示 | 1.65秒 | **0.07秒** |
| `prepare`（押す前に完了） | — | 1.3〜1.5秒 |

### 残っている改善余地

`realtime.finalize` は 0.8秒。うち約0.5秒は手動 commit の応答待ち
（VAD が既に確定済みでも安全網として commit を送り、`commit_empty` の応答を待っている）。
`pending === 0` のときは待ち時間を短く打ち切れば 0.3秒台まで削れる。

