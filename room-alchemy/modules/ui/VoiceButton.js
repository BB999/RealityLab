import * as THREE from 'three';

/**
 * 音声入力ボタン
 * 押すと録音開始、もう一度押すと停止して文字起こし
 */
export class VoiceButton {
  constructor(scene) {
    this.scene = scene;
    this.button = null;
    this.canvas = null;
    this.context = null;
    this.texture = null;
    this.isPressed = false;
    this.isRecording = false;
    this.isBusy = false;      // 文字起こし待ち
    this.pulse = 0;           // 録音中の点滅用
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

    // 状態で色を変える: 録音中=赤 / 処理中=灰 / 通常=青
    let bgColor, borderColor, label;
    if (this.isBusy) {
      bgColor = '#7f8c8d';
      borderColor = '#5d6d6e';
      label = '...';
    } else if (this.isRecording) {
      // 録音中は明滅させて「録れている」ことを示す
      const t = (Math.sin(this.pulse * 6) + 1) / 2;
      const r = Math.round(200 + 55 * t);
      bgColor = `rgb(${r}, 60, 60)`;
      borderColor = '#8b1a1a';
      label = '● REC';
    } else {
      bgColor = this.isPressed ? '#2471a3' : '#3498db';
      borderColor = '#1b4f72';
      label = '🎤 Talk';
    }

    ctx.fillStyle = bgColor;
    ctx.beginPath();
    ctx.roundRect(0, 0, width, height, 8);
    ctx.fill();

    ctx.strokeStyle = borderColor;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(1, 1, width - 2, height - 2, 7);
    ctx.stroke();

    ctx.font = 'bold 20px system-ui, sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(label, width / 2, height / 2);

    if (this.texture) {
      this.texture.needsUpdate = true;
    }
  }

  /**
   * 録音中の明滅を進める（毎フレーム呼ぶ）
   */
  update(deltaTime) {
    if (!this.isRecording) return;
    this.pulse += deltaTime;
    this.updateCanvas();
  }

  press() {
    this.isPressed = true;
    this.updateCanvas();

    if (this.button) {
      this.button.scale.set(0.9, 0.9, 1);
    }

    setTimeout(() => {
      this.isPressed = false;
      this.updateCanvas();
      if (this.button) {
        this.button.scale.set(1, 1, 1);
      }
      if (this.onPress) {
        this.onPress();
      }
    }, 200);
  }

  setRecording(recording) {
    this.isRecording = recording;
    this.pulse = 0;
    this.updateCanvas();
  }

  setBusy(busy) {
    this.isBusy = busy;
    this.updateCanvas();
  }

  /**
   * テキストパネルの右下に配置
   */
  updatePosition(textPanel) {
    if (!this.button || !textPanel) return;

    const offset = new THREE.Vector3(0.13, -0.05, 0);
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
