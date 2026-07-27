import * as THREE from 'three';
import { GlassSurface, TINT, drawLabel, measureLabel, icons } from './liquidGlass.js';

// 主要な入力手段なので、脇のボタンより横に長くとってある
const W = 0.112;
const H = 0.04;

/**
 * 音声入力ボタン
 * 押すと録音開始、もう一度押すと停止して文字起こし
 */
export class VoiceButton {
  /**
   * @param {THREE.Scene} scene
   * @param {{label?: string, offset?: THREE.Vector3}} options
   *   label  - 通常時の表示（録音中/処理中の表示は共通）
   *   offset - テキストパネルからの相対位置
   */
  constructor(scene, options = {}) {
    this.scene = scene;
    this.label = options.label ?? 'Talk';
    this.offset = options.offset ?? new THREE.Vector3(0.13, -0.05, 0);
    this.button = null;
    this.buttonGroup = null;
    this.surface = null;
    this.isPressed = false;
    this.isHovered = false;
    this.isRecording = false;
    this.isBusy = false;      // 文字起こし待ち
    this.pulse = 0;           // 録音中の波形アニメーション用
    this.lastContentFrame = -1;
    this.onPress = null;
  }

  create() {
    this.buttonGroup = new THREE.Group();

    this.surface = new GlassSurface({
      width: W,
      height: H,
      tint: TINT.graphite,
      accent: TINT.blue,
      opacity: 0.38,
      // 幅と同じ比率で広げる。合わせないとラベルが横に伸びる
      canvasWidth: 448,
      canvasHeight: 160,
      shadow: 0,
      hoverScale: 1.08,
      pressScale: 0.9
    });

    this.buttonGroup.add(this.surface.object3D);
    this.buttonGroup.visible = false;
    this.scene.add(this.buttonGroup);

    this.button = this.surface.hitMesh;

    // Web フォントが後から届いたときにラベルを描き直す
    this.surface.onRedraw = () => this.updateCanvas();

    this.updateCanvas();

    return this.button;
  }

  updateCanvas() {
    if (!this.surface) return;

    const ctx = this.surface.beginContent();
    const width = this.surface.canvas.width;
    const cy = this.surface.canvas.height / 2;

    const fontSize = 40;
    const iconSize = 15;
    const gap = 12;

    // 状態: 録音中=波形 / 処理中=スピナー / 通常=マイク
    let label = this.label;
    if (this.isBusy) label = 'Wait';
    else if (this.isRecording) label = 'REC';

    const textWidth = measureLabel(ctx, label, fontSize, 600);
    const total = iconSize * 2 + gap + textWidth;
    const startX = (width - total) / 2;
    const iconX = startX + iconSize;
    const textX = iconX + iconSize + gap;

    if (this.isBusy) {
      icons.spinner(ctx, iconX, cy, iconSize, '#ffffff', this.pulse);
    } else if (this.isRecording) {
      icons.waveform(ctx, iconX, cy, iconSize, '#ffffff', this.pulse);
    } else {
      icons.mic(ctx, iconX, cy, iconSize, '#ffffff');
    }

    drawLabel(ctx, label, textX, cy + 1, {
      size: fontSize,
      weight: 600,
      color: '#ffffff',
      align: 'left'
    });

    this.surface.markContentDirty();
  }

  /**
   * 録音中の波形・処理中のスピナーを進める（毎フレーム呼ぶ）
   */
  update(deltaTime) {
    this.surface.update(deltaTime);

    if (!this.isRecording && !this.isBusy) return;
    this.pulse += deltaTime;

    // 描き直しは20fps程度で足りる
    const frame = Math.floor(this.pulse * 20);
    if (frame !== this.lastContentFrame) {
      this.lastContentFrame = frame;
      this.updateCanvas();
    }
  }

  setHovered(hovered) {
    if (this.isHovered === hovered) return;
    this.isHovered = hovered;
    this.surface.setHovered(hovered);
  }

  press() {
    this.isPressed = true;
    this.surface.setPressed(true);

    // 接続に時間がかかるので、押下アニメーションの完了を待たずに走らせる
    if (this.onPress) {
      this.onPress();
    }

    setTimeout(() => {
      this.isPressed = false;
      this.surface.setPressed(false);
    }, 160);
  }

  setRecording(recording) {
    this.isRecording = recording;
    this.pulse = 0;
    this.lastContentFrame = -1;
    // 録音中は赤ガラス + 明滅するシーンで「録れている」ことを示す。
    // 待機中は Clear と同じ素のガラスで、色はアクセントの滲みだけ
    this.surface.setTint(recording ? TINT.red : TINT.graphite);
    this.surface.setAccent(recording ? TINT.red : TINT.blue);
    this.surface.setSheen(recording ? 0.9 : 0);
    this.surface.setFocus(recording ? 0.7 : 0);
    this.updateCanvas();
  }

  setBusy(busy) {
    this.isBusy = busy;
    this.lastContentFrame = -1;
    if (busy) {
      this.surface.setTint(TINT.slate);
      this.surface.setAccent(TINT.gray);
      this.surface.setSheen(0.6);
    } else if (!this.isRecording) {
      this.surface.setTint(TINT.graphite);
      this.surface.setAccent(TINT.blue);
      this.surface.setSheen(0);
    }
    this.updateCanvas();
  }

  /**
   * テキストパネルの相対位置に配置
   */
  updatePosition(textPanel) {
    if (!this.buttonGroup || !textPanel) return;

    const offset = this.offset.clone();
    offset.applyQuaternion(textPanel.quaternion);

    this.buttonGroup.position.copy(textPanel.position).add(offset);
    this.buttonGroup.quaternion.copy(textPanel.quaternion);
  }

  show() {
    if (this.buttonGroup) {
      this.buttonGroup.visible = true;
    }
  }

  hide() {
    if (this.buttonGroup) {
      this.buttonGroup.visible = false;
    }
  }

  isVisible() {
    return this.buttonGroup && this.buttonGroup.visible;
  }

  getButton() {
    return this.button;
  }

  setOnPress(callback) {
    this.onPress = callback;
  }

  dispose() {
    if (this.surface) this.surface.dispose();
    if (this.buttonGroup) this.scene.remove(this.buttonGroup);
  }
}
