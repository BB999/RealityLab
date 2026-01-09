import * as THREE from 'three';

export class GenerateButton {
  constructor(scene) {
    this.scene = scene;
    this.button = null;
    this.canvas = null;
    this.context = null;
    this.texture = null;
    this.isPressed = false;
    this.pressTime = 0;
    this.onPress = null; // コールバック関数
  }

  create() {
    // キャンバスを作成
    this.canvas = document.createElement('canvas');
    this.canvas.width = 128;
    this.canvas.height = 64;
    this.context = this.canvas.getContext('2d');

    // テクスチャを作成
    this.texture = new THREE.CanvasTexture(this.canvas);
    this.texture.minFilter = THREE.LinearFilter;
    this.texture.magFilter = THREE.LinearFilter;

    // ボタンのジオメトリとマテリアル
    const buttonGeometry = new THREE.PlaneGeometry(0.1, 0.05);
    const buttonMaterial = new THREE.MeshBasicMaterial({
      map: this.texture,
      transparent: true,
      side: THREE.DoubleSide
    });

    this.button = new THREE.Mesh(buttonGeometry, buttonMaterial);
    this.button.visible = false;
    this.scene.add(this.button);

    // 初期描画
    this.updateCanvas();

    return this.button;
  }

  updateCanvas() {
    if (!this.context) return;

    const ctx = this.context;
    const width = this.canvas.width;
    const height = this.canvas.height;

    // 背景をクリア
    ctx.clearRect(0, 0, width, height);

    // ボタンの色（押されているかどうかで変化）
    const bgColor = this.isPressed ? '#45a049' : '#4CAF50';

    // 背景を描画
    ctx.fillStyle = bgColor;
    ctx.beginPath();
    ctx.roundRect(0, 0, width, height, 8);
    ctx.fill();

    // 枠線
    ctx.strokeStyle = '#2E7D32';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(1, 1, width - 2, height - 2, 7);
    ctx.stroke();

    // テキスト
    ctx.font = 'bold 20px system-ui, sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('Generate', width / 2, height / 2);

    // テクスチャを更新
    if (this.texture) {
      this.texture.needsUpdate = true;
    }
  }

  press() {
    this.isPressed = true;
    this.pressTime = Date.now();
    this.updateCanvas();

    // ボタンを少し縮小
    if (this.button) {
      this.button.scale.set(0.9, 0.9, 1);
    }

    // 200ms後に元に戻す
    setTimeout(() => {
      this.isPressed = false;
      this.updateCanvas();
      if (this.button) {
        this.button.scale.set(1, 1, 1);
      }
      // コールバック実行
      if (this.onPress) {
        this.onPress();
      }
    }, 200);
  }

  updatePosition(textPanel) {
    if (!this.button || !textPanel) return;

    // パネルの右側に配置（パネル幅0.4の半分 + ボタン幅0.1の半分 + 少し隙間）
    const offset = new THREE.Vector3(0.26, 0, 0);
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
