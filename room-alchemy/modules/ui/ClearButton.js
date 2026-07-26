import * as THREE from 'three';
import { GlassSurface, TINT, drawLabel, measureLabel, icons } from './liquidGlass.js';

const W = 0.08;
const H = 0.04;
const ACCENT = '#ff9f0a';

/**
 * テキストクリアボタン
 * 入力中のプロンプトを消す
 */
export class ClearButton {
  /**
   * @param {THREE.Scene} scene
   * @param {{offset?: THREE.Vector3}} options
   *   offset - テキストパネルからの相対位置
   */
  constructor(scene, options = {}) {
    this.scene = scene;
    this.offset = options.offset ?? new THREE.Vector3(0.13, -0.05, 0);
    this.button = null;
    this.buttonGroup = null;
    this.surface = null;
    this.isPressed = false;
    this.isHovered = false;
    this.onPress = null;
  }

  create() {
    this.buttonGroup = new THREE.Group();

    // 二次的な操作なので、生成(緑)や音声(青)のように色ガラスにはしない。
    // 素のガラス + 警告色のアイコン、という Apple の二次アクションの扱いに合わせる
    this.surface = new GlassSurface({
      width: W,
      height: H,
      tint: TINT.graphite,
      accent: TINT.orange,
      opacity: 0.4,
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

    const fontSize = 40;
    const iconSize = 14;
    const gap = 13;

    const label = 'Clear';
    const textWidth = measureLabel(ctx, label, fontSize, 600);
    const total = iconSize * 2 + gap + textWidth;
    const startX = (width - total) / 2;
    const iconX = startX + iconSize;

    icons.xmark(ctx, iconX, cy, iconSize, ACCENT);

    drawLabel(ctx, label, iconX + iconSize + gap, cy + 1, {
      size: fontSize,
      weight: 600,
      color: ACCENT,
      align: 'left'
    });

    this.surface.markContentDirty();
  }

  setHovered(hovered) {
    if (this.isHovered === hovered) return;
    this.isHovered = hovered;
    this.surface.setHovered(hovered);
    this.surface.setFocus(hovered ? 0.6 : 0);
  }

  update(deltaTime) {
    this.surface.update(deltaTime);
  }

  press() {
    this.isPressed = true;
    this.surface.setPressed(true);

    if (this.onPress) {
      this.onPress();
    }

    setTimeout(() => {
      this.isPressed = false;
      this.surface.setPressed(false);
    }, 160);
  }

  /**
   * テキストパネルからの相対位置に配置
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
