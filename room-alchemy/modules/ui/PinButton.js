import * as THREE from 'three';

export class PinButton {
  constructor(scene) {
    this.scene = scene;
    this.button = null;
    this.buttonGroup = null;
    this.canvas = null;
    this.context = null;
    this.texture = null;
    this.isPressed = false;
    this.isHovered = false;
    this.isPinned = false;
    this.onPress = null;
    this.animationTime = 0;
    this.targetScale = 1;
    this.currentScale = 1;
  }

  create() {
    const group = new THREE.Group();

    // キャンバスを作成
    this.canvas = document.createElement('canvas');
    this.canvas.width = 64;
    this.canvas.height = 64;
    this.context = this.canvas.getContext('2d');

    // テクスチャを作成
    this.texture = new THREE.CanvasTexture(this.canvas);
    this.texture.minFilter = THREE.LinearFilter;
    this.texture.magFilter = THREE.LinearFilter;

    // ボタンのジオメトリとマテリアル（正方形）
    const buttonGeometry = new THREE.PlaneGeometry(0.035, 0.035);
    const buttonMaterial = new THREE.MeshBasicMaterial({
      map: this.texture,
      transparent: true,
      side: THREE.DoubleSide
    });

    this.button = new THREE.Mesh(buttonGeometry, buttonMaterial);
    this.button.visible = false;
    group.add(this.button);

    this.buttonGroup = group;
    this.scene.add(group);

    // 初期描画
    this.updateCanvas();

    return this.button;
  }

  updateCanvas() {
    if (!this.context) return;

    const ctx = this.context;
    const width = this.canvas.width;
    const height = this.canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;

    // 背景をクリア
    ctx.clearRect(0, 0, width, height);

    // 背景色（ピン留め状態で色を変える）
    let bgColor;
    if (this.isPressed) {
      bgColor = this.isPinned ? '#1a5c1a' : '#555555';
    } else if (this.isHovered) {
      bgColor = this.isPinned ? '#5dd55d' : '#888888';
    } else {
      bgColor = this.isPinned ? '#4CAF50' : '#666666';
    }

    // 円形の背景
    ctx.fillStyle = bgColor;
    ctx.beginPath();
    ctx.arc(centerX, centerY, 28, 0, Math.PI * 2);
    ctx.fill();

    // 枠線
    ctx.strokeStyle = this.isHovered ? '#ffffff' : (this.isPinned ? '#2E7D32' : '#888888');
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(centerX, centerY, 28, 0, Math.PI * 2);
    ctx.stroke();

    // ピンアイコンを描画
    ctx.fillStyle = '#ffffff';
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;

    if (this.isPinned) {
      // ピン留め状態: 刺さったピンのアイコン
      // ピンの頭（円）
      ctx.beginPath();
      ctx.arc(centerX, centerY - 8, 8, 0, Math.PI * 2);
      ctx.fill();

      // ピンの針
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(centerX, centerY + 14);
      ctx.stroke();

      // ピンの頭の光沢
      ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
      ctx.beginPath();
      ctx.arc(centerX - 2, centerY - 10, 3, 0, Math.PI * 2);
      ctx.fill();
    } else {
      // 非ピン留め状態: 斜めのピンアイコン
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(Math.PI / 4); // 45度回転

      // ピンの頭（円）
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(0, -8, 7, 0, Math.PI * 2);
      ctx.fill();

      // ピンの針
      ctx.beginPath();
      ctx.moveTo(0, -1);
      ctx.lineTo(0, 12);
      ctx.stroke();

      ctx.restore();
    }

    // テクスチャを更新
    if (this.texture) {
      this.texture.needsUpdate = true;
    }
  }

  // ホバー状態を設定
  setHovered(hovered) {
    if (this.isHovered !== hovered) {
      this.isHovered = hovered;
      this.targetScale = hovered ? 1.15 : 1;
      this.updateCanvas();
    }
  }

  // ピン留め状態を設定
  setPinned(pinned) {
    this.isPinned = pinned;
    this.updateCanvas();
  }

  // ピン留め状態を取得
  isPinnedState() {
    return this.isPinned;
  }

  press() {
    this.isPressed = true;
    this.targetScale = 0.85;
    this.updateCanvas();

    setTimeout(() => {
      this.isPressed = false;
      this.isPinned = !this.isPinned;
      this.targetScale = 1;
      this.updateCanvas();

      if (this.onPress) {
        this.onPress(this.isPinned);
      }
    }, 150);
  }

  // 毎フレーム更新
  update(deltaTime) {
    this.animationTime += deltaTime;

    // スムーズなスケールアニメーション
    this.currentScale += (this.targetScale - this.currentScale) * 0.2;
    if (this.buttonGroup) {
      this.buttonGroup.scale.setScalar(this.currentScale);
    }
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
      this.button.visible = true;
    }
  }

  hide() {
    if (this.buttonGroup) {
      this.buttonGroup.visible = false;
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
    if (this.buttonGroup) {
      this.scene.remove(this.buttonGroup);
    }
    if (this.button) {
      this.button.geometry.dispose();
      this.button.material.dispose();
    }
    if (this.texture) {
      this.texture.dispose();
    }
  }
}
