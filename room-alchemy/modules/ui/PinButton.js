import * as THREE from 'three';
import { GlassSurface, TINT, icons } from './liquidGlass.js';

const SIZE = 0.035;

export class PinButton {
  constructor(scene) {
    this.scene = scene;
    this.button = null;
    this.buttonGroup = null;
    this.surface = null;
    this.isPressed = false;
    this.isHovered = false;
    this.isPinned = false;
    this.onPress = null;
    this.animationTime = 0;
  }

  create() {
    this.buttonGroup = new THREE.Group();

    // 正方形 + radius=半分 で真円のガラス（visionOS のツールバーボタンと同じ形）
    this.surface = new GlassSurface({
      width: SIZE,
      height: SIZE,
      radius: SIZE / 2,
      tint: TINT.graphite,
      accent: TINT.green,
      opacity: 0.4,
      canvasWidth: 160,
      canvasHeight: 160,
      shadow: 0,
      hoverScale: 1.14,
      pressScale: 0.86
    });

    this.buttonGroup.add(this.surface.object3D);
    this.buttonGroup.visible = false;
    this.scene.add(this.buttonGroup);

    this.button = this.surface.hitMesh;

    // Web フォントが後から届いたときにラベルを描き直す
    this.surface.onRedraw = () => this.updateCanvas();

    this._applyState();

    this.updateCanvas();

    return this.button;
  }

  updateCanvas() {
    if (!this.surface) return;

    const ctx = this.surface.beginContent();
    const cx = this.surface.canvas.width / 2;
    const cy = this.surface.canvas.height / 2;

    icons.pin(ctx, cx, cy, 40, '#ffffff', this.isPinned);

    this.surface.markContentDirty();
  }

  // ホバー状態を設定
  setHovered(hovered) {
    if (this.isHovered !== hovered) {
      this.isHovered = hovered;
      this.surface.setHovered(hovered);
    }
  }

  // ピン留め状態を設定
  setPinned(pinned) {
    this.isPinned = pinned;
    this._applyState();
    this.updateCanvas();
  }

  // ピン留め状態を取得
  isPinnedState() {
    return this.isPinned;
  }

  _applyState() {
    // ON はアクセント色のガラス + リングを点灯、OFF は素のガラス
    this.surface.setTint(this.isPinned ? TINT.green : TINT.graphite);
    this.surface.setFocus(this.isPinned ? 0.85 : 0);
  }

  press() {
    this.isPressed = true;
    this.surface.setPressed(true);
    this.updateCanvas();

    setTimeout(() => {
      this.isPressed = false;
      this.surface.setPressed(false);
      this.isPinned = !this.isPinned;
      this._applyState();
      this.updateCanvas();

      if (this.onPress) {
        this.onPress(this.isPinned);
      }
    }, 150);
  }

  // 毎フレーム更新
  update(deltaTime) {
    this.animationTime += deltaTime;
    this.surface.update(deltaTime);
  }

  updatePosition(textPanel) {
    if (!this.buttonGroup || !textPanel) return;

    // テキストパネルの左側に配置
    const offset = new THREE.Vector3(-0.23, 0, 0);
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
