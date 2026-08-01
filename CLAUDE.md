# RealityLab Project Instructions

## 概要
このプロジェクトはWebXR/ARアプリケーションです。

## 開発ガイドライン
- 日本語でコミュニケーションを行う
- コードコメントは英語で記述

## ビルド・実行コマンド
- `npm run dev` - 開発サーバー起動
- `npm run build` - プロダクションビルド
- `npm run preview` - ビルド結果のプレビュー

## プロジェクト構造
- `src/` - ソースコード
- `public/` - 静的ファイル
- `dist/` - ビルド出力

## Quest のコンソールログを見る

`chrome://inspect/#devices` を開いて DevTools からコピペする必要はない。`quest-log` でターミナルに流れる。
配下のどのプロジェクトからでも使える。

```bash
quest-log            # 開いている全ページのログ
quest-log 5173       # URL・タイトルで絞る
quest-log --list     # 今開いているページの一覧
```

- `console.log` だけでなく、**DevTools を開かないと見えない 404 や CSP 違反も拾う**
- 発生箇所が `app.js:443` の形で付く
- 無線 ADB を優先して自動で繋ぐ。切れても自動で張り直すので繋ぎっぱなしでいい
- 実体は `~/.local/bin/quest-log` の1つだけ。**各プロジェクトにコピーを置かない**
- Quest を再起動したときだけ、本体側で WiFi ADB を入れ直す必要がある

## Meta Quest 3 コントローラーインデックス

### ボタンインデックス対応表
| インデックス | ボタン名 |
|-------------|---------|
| buttons[0]  | トリガー (人差し指) - アナログ値 0.0〜1.0 |
| buttons[1]  | グリップ (中指) - アナログ値 0.0〜1.0 |
| buttons[2]  | 未使用 |
| buttons[3]  | サムスティック押し込み |
| buttons[4]  | A ボタン (右) / X ボタン (左) |
| buttons[5]  | B ボタン (右) / Y ボタン (左) |

### サムスティック (Axes)
| インデックス | 説明 |
|-------------|------|
| axes[0]     | 左右方向 (-1.0〜1.0) |
| axes[1]     | 上下方向 (-1.0〜1.0) |
| axes[2]     | サムスティック水平 (左右) |
| axes[3]     | サムスティック垂直 (上下) |

### WebXR Gamepad API での取得例
```javascript
// inputSource から gamepad を取得
const gamepad = inputSource.gamepad;

// トリガー・グリップのアナログ値
const triggerValue = gamepad.buttons[0].value;
const triggerPressed = gamepad.buttons[0].pressed;
const gripValue = gamepad.buttons[1].value;

// A/X, B/Y ボタン
const aXPressed = gamepad.buttons[4].pressed;
const bYPressed = gamepad.buttons[5].pressed;

// スティックの値
const stickX = gamepad.axes[2];  // 左右
const stickY = gamepad.axes[3];  // 上下
```
