import * as THREE from 'three';
import { GlassSurface, TINT, drawLabel, measureLabel, icons } from './liquidGlass.js';

const W = 0.14;
const H = 0.055;

export class GenerateButton {
  constructor(scene) {
    this.scene = scene;
    this.button = null;
    this.buttonGroup = null;
    this.surface = null;
    this.isPressed = false;
    this.isHovered = false;
    this.isLoading = false;
    this.pressTime = 0;
    this.onPress = null;
    this.buttonText = 'Generate';
    this.isRegenerateMode = false;
    this.animationTime = 0;
    this.lastContentFrame = -1;
  }

  create() {
    this.buttonGroup = new THREE.Group();

    this.surface = new GlassSurface({
      width: W,
      height: H,
      tint: TINT.green,
      accent: TINT.green,
      opacity: 0.38,
      canvasWidth: 512,
      canvasHeight: 200,
      shadow: 0,
      hoverScale: 1.07,
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
    const height = this.surface.canvas.height;
    const cy = height / 2;

    // The glass carries the colour; the content layer stays achromatic so the
    // label keeps full contrast whatever tint sits behind it.
    const fg = '#ffffff';
    const fontSize = 46;
    const iconSize = 26;
    const gap = 18;

    const label = this.isLoading ? 'Generating' : this.buttonText;
    const textWidth = measureLabel(ctx, label, fontSize, 600);
    const total = iconSize * 2 + gap + textWidth;
    const startX = (width - total) / 2;
    const iconX = startX + iconSize;
    const textX = iconX + iconSize + gap;

    if (this.isLoading) {
      icons.spinner(ctx, iconX, cy, iconSize, fg, this.animationTime);
    } else if (this.isRegenerateMode) {
      icons.refresh(ctx, iconX, cy, iconSize, fg);
    } else {
      icons.bolt(ctx, iconX, cy, iconSize, fg);
    }

    drawLabel(ctx, label, textX, cy + 1, {
      size: fontSize,
      weight: 600,
      color: fg,
      align: 'left'
    });

    this.surface.markContentDirty();
  }

  // ホバー状態を設定
  setHovered(hovered) {
    if (this.isHovered !== hovered && !this.isLoading) {
      this.isHovered = hovered;
      this.surface.setHovered(hovered);
    }
  }

  // ローディング状態を設定
  setLoading(loading) {
    this.isLoading = loading;
    if (loading) {
      this.isHovered = false;
      this.surface.setHovered(false);
      this.surface.setTint(TINT.slate);
      this.surface.setAccent(this.isRegenerateMode ? TINT.orange : TINT.green);
      this.surface.setSheen(0.8);
      this.surface.setFocus(0.5);
    } else {
      this._applyTint();
      this.surface.setSheen(0);
      this.surface.setFocus(0);
    }
    this.updateCanvas();
  }

  // ローディング状態かどうか
  isInLoadingState() {
    return this.isLoading;
  }

  press() {
    if (this.isLoading) return; // ローディング中は押せない

    this.isPressed = true;
    this.pressTime = Date.now();
    this.surface.setPressed(true);
    this.updateCanvas();

    // 300ms後にローディング状態に移行
    setTimeout(() => {
      this.isPressed = false;
      this.surface.setPressed(false);
      this.setLoading(true);
      // コールバック実行
      if (this.onPress) {
        this.onPress();
      }
    }, 300);
  }

  // 毎フレーム更新
  update(deltaTime) {
    this.animationTime += deltaTime;
    this.surface.update(deltaTime);

    // スピナーはキャンバスに描いているので、20fps程度で描き直す
    if (this.isLoading) {
      const frame = Math.floor(this.animationTime * 20);
      if (frame !== this.lastContentFrame) {
        this.lastContentFrame = frame;
        this.updateCanvas();
      }
    }
  }

  updatePosition(textPanel) {
    if (!this.buttonGroup || !textPanel) return;

    // パネルの右側に配置
    const offset = new THREE.Vector3(0.28, 0, 0);
    offset.applyQuaternion(textPanel.quaternion);

    this.buttonGroup.position.copy(textPanel.position).add(offset);
    this.buttonGroup.quaternion.copy(textPanel.quaternion);
  }

  show() {
    if (this.buttonGroup) {
      this.buttonGroup.visible = true;
      this.button.visible = true;
    }
    // ローディング状態をリセット
    if (this.isLoading) {
      this.setLoading(false);
    }
  }

  hide() {
    if (this.buttonGroup) {
      this.buttonGroup.visible = false;
      this.button.visible = false;
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

  _applyTint() {
    const tint = this.isRegenerateMode ? TINT.orange : TINT.green;
    this.surface.setTint(tint);
    this.surface.setAccent(tint);
  }

  // 再生成モードに切り替え
  setRegenerateMode(enabled) {
    this.isRegenerateMode = enabled;
    this.buttonText = enabled ? 'Regenerate' : 'Generate';
    if (!this.isLoading) this._applyTint();
    this.updateCanvas();
  }

  // 再生成モードかどうか
  isInRegenerateMode() {
    return this.isRegenerateMode;
  }

  dispose() {
    if (this.surface) this.surface.dispose();
    if (this.buttonGroup) this.scene.remove(this.buttonGroup);
  }
}
