import * as THREE from 'three';

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
    this.canvas = null;
    this.context = null;
    this.texture = null;
    this.isPressed = false;
    this.onPress = null;
  }

  create() {
    this.canvas = document.createElement('canvas');
    this.canvas.width = 128;
    this.canvas.height = 64;
    this.context = this.canvas.getContext('2d');

    this.texture = new THREE.CanvasTexture(this.canvas);
    this.texture.minFilter = THREE.LinearFilter;
    this.texture.magFilter = THREE.LinearFilter;

    const buttonGeometry = new THREE.PlaneGeometry(0.08, 0.04);
    const buttonMaterial = new THREE.MeshBasicMaterial({
      map: this.texture,
      transparent: true,
      side: THREE.DoubleSide
    });

    this.button = new THREE.Mesh(buttonGeometry, buttonMaterial);
    this.button.visible = false;
    this.scene.add(this.button);

    this.updateCanvas();

    return this.button;
  }

  updateCanvas() {
    if (!this.context) return;

    const ctx = this.context;
    const width = this.canvas.width;
    const height = this.canvas.height;

    ctx.clearRect(0, 0, width, height);

    // 破壊的な操作なので、生成(緑)や音声(青)とは違う警告色にする
    const bgColor = this.isPressed ? '#b9770e' : '#e67e22';

    ctx.fillStyle = bgColor;
    ctx.beginPath();
    ctx.roundRect(0, 0, width, height, 8);
    ctx.fill();

    ctx.strokeStyle = '#7e5109';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(1, 1, width - 2, height - 2, 7);
    ctx.stroke();

    ctx.font = 'bold 20px system-ui, sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('✕ Clear', width / 2, height / 2);

    if (this.texture) {
      this.texture.needsUpdate = true;
    }
  }

  press() {
    this.isPressed = true;
    this.updateCanvas();

    if (this.button) {
      this.button.scale.set(0.9, 0.9, 1);
    }

    if (this.onPress) {
      this.onPress();
    }

    setTimeout(() => {
      this.isPressed = false;
      this.updateCanvas();
      if (this.button) {
        this.button.scale.set(1, 1, 1);
      }
    }, 200);
  }

  /**
   * テキストパネルからの相対位置に配置
   */
  updatePosition(textPanel) {
    if (!this.button || !textPanel) return;

    const offset = this.offset.clone();
    offset.applyQuaternion(textPanel.quaternion);

    this.button.position.copy(textPanel.position).add(offset);
    this.button.quaternion.copy(textPanel.quaternion);
  }

  show() {
    if (this.button) {
      this.button.visible = true;
    }
  }

  hide() {
    if (this.button) {
      this.button.visible = false;
    }
  }

  isVisible() {
    return this.button && this.button.visible;
  }

  getButton() {
    return this.button;
  }

  setOnPress(callback) {
    this.onPress = callback;
  }

  dispose() {
    if (this.button) {
      this.scene.remove(this.button);
      this.button.geometry.dispose();
      this.button.material.dispose();
    }
    if (this.texture) {
      this.texture.dispose();
    }
  }
}
