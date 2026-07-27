# 2026-07-27 ピン留め・Talk・クリアを押すとモジュール選択が外れる問題

## 問題

生成物を選択すると、テキストパネルと生成物が接続線で結ばれ、再生成モードに入る。
この状態で **ピン留め / Talk（音声入力）/ クリア のいずれかを押すと、選択が解除される**（接続線が消える）。

ボタン自体は正しく動くので気づきにくいが、実害がある。

- Talk で喋る → 選択が外れている → Generate が**再生成ではなく新規生成**になる
- クリアはテキストを消すだけのつもりが、選択まで落ちる
- ピン留めは押した瞬間に線が消える

テキストパネル本体・Generate・Delete では起きない。

## 原因

UI の押下判定と、モジュールの選択解除判定が**別系統**で動いている。

| 系統 | 場所 | 役割 |
|---|---|---|
| `onSelect`（XR select イベント） | `app.js:1497-1522` | ボタンを押す |
| `updateModuleSelection`（毎フレーム、トリガー立ち上がり） | `app.js:1236` | 選択・選択解除 |

`updateModuleSelection` は「UI に当たっていたら選択に触らない」という除外を持っているが、
その対象が **textPanel / generateButton / deleteButton の3つしかなかった**。

```js
const textPanelHit = ...textPanel.getPanel());
const buttonHit    = ...generateButton.getButton());
const deleteButtonHit = ...deleteButton.getButton());
```

ピン留め・Talk・クリアの3ボタンは `scene` 直下に置かれた独立オブジェクトで
（`PinButton.js:39`, `VoiceButton.js:52`, `ClearButton.js:49`）、
しかもパネルの**外側**にオフセット配置されている（ピンは左に -0.23m, `PinButton.js:117`）。

つまり `textPanel.getPanel()` へのレイキャストには**巻き込まれない**。
子オブジェクトなら `intersectObject(panel, true)` で拾えたが、兄弟なので拾えない。

結果、これらを押したレイは「パネルにもボタンにもモジュールにも当たっていない」と判定され、
`app.js:1293-1298` の

```js
} else {
  // モジュールに当たっていない場所でトリガーを押したら選択解除
  if (interactionState.hasSelectedModule()) deselectModule();
}
```

に落ちていた。押下と選択解除が**同時に**起きていたということ。

## 修正

### `app.js` — `updateModuleSelection`

除外判定を、個別変数の羅列から**列挙リスト**に変えて、抜けていた3ボタンを追加した。

```js
const uiTargets = [
  textPanel.isVisible() && textPanel.getPanel(),
  generateButton.isVisible() && generateButton.getButton(),
  pinButton.isVisible() && pinButton.getButton(),
  voiceButton.isVisible() && voiceButton.getButton(),
  clearButton.isVisible() && clearButton.getButton()
];
const uiHit = uiTargets.some(
  (target) => target && raycastTextPanel(inputSource, frame, referenceSpace, target)
);
```

削除ボタンだけは「当たったら `press()` して打ち切る」という別扱いが必要なので、リストの手前に残した。

ボタンがパネルの子でない以上ここに列挙するしかないので、
**新しいボタンを足したらこのリストにも足す必要がある**旨をコメントに書いた。

## 補足: 直っていないもの

`deleteButton.press()` が `updateModuleSelection`（`app.js:1258`）と
`onSelect`（`app.js:1528`）の両方から呼ばれ得る。
`DeleteButton.press()`（`DeleteButton.js:89`）に多重呼び出しガードがないため、
200ms の `setTimeout` が2本走って `onPress` が2回発火しうる。

ただし `handleDelete` が `hasSelectedModule()` で早期 return するため、
2回目は握りつぶされて実害は出ていない。

両者を統合しなかったのは、ガード条件が違うため。
`onSelect` は `isLaserVisibleForController` でレーザー非表示時を弾くが、
`updateModuleSelection` 側にそのガードがない。片方を消すと押せなくなるケースが出る。
