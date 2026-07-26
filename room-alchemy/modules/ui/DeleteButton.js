import * as THREE from 'three';
import { GlassSurface, TINT, drawLabel, measureLabel, icons } from './liquidGlass.js';

const W = 0.08;
const H = 0.04;

export class DeleteButton {
  constructor(scene) {
    this.scene = scene;
    this.button = null;
    this.buttonGroup = null;
    this.surface = null;
    this.isPressed = false;
    this.isHovered = false;
    this.pressTime = 0;
    this.onPress = null;
  }

  create() {
    this.buttonGroup = new THREE.Group();

    // 破壊的な操作なので Apple の destructive と同じ赤ガラス
    this.surface = new GlassSurface({
      width: W,
      height: H,
      tint: TINT.red,
      accent: TINT.red,
      opacity: 0.38,
      canvasWidth: 320,
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

    const fontSize = 38;
    const iconSize = 15;
    const gap = 13;

    const label = 'Delete';
    const textWidth = measureLabel(ctx, label, fontSize, 600);
    const total = iconSize * 2 + gap + textWidth;
    const startX = (width - total) / 2;
    const iconX = startX + iconSize;

    icons.trash(ctx, iconX, cy, iconSize, '#ffffff');

    drawLabel(ctx, label, iconX + iconSize + gap, cy + 1, {
      size: fontSize,
      weight: 600,
      color: '#ffffff',
      align: 'left'
    });

    this.surface.markContentDirty();
  }

  setHovered(hovered) {
    if (this.isHovered === hovered) return;
    this.isHovered = hovered;
    this.surface.setHovered(hovered);
  }

  update(deltaTime) {
    this.surface.update(deltaTime);
  }

  press() {
    this.isPressed = true;
    this.pressTime = Date.now();
    this.surface.setPressed(true);

    // 200ms後に元に戻す
    setTimeout(() => {
      this.isPressed = false;
      this.surface.setPressed(false);
      // コールバック実行
      if (this.onPress) {
        this.onPress();
      }
    }, 200);
  }

  updatePosition(generateButton) {
    if (!this.buttonGroup || !generateButton) return;

    // Generateボタンの下に配置
    const offset = new THREE.Vector3(0, -0.06, 0);
    offset.applyQuaternion(generateButton.quaternion);

    this.buttonGroup.position.copy(generateButton.position).add(offset);
    this.buttonGroup.quaternion.copy(generateButton.quaternion);
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
