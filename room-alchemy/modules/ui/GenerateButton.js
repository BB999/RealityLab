import * as THREE from 'three';

export class GenerateButton {
  constructor(scene) {
    this.scene = scene;
    this.button = null;
    this.canvas = null;
    this.context = null;
    this.texture = null;
    this.isPressed = false;
    this.isHovered = false;
    this.isLoading = false;
    this.loadingDots = 0;
    this.pressTime = 0;
    this.onPress = null;
    this.buttonText = 'Generate';
    this.isRegenerateMode = false;
    this.animationTime = 0;
    this.targetScale = 1;
    this.currentScale = 1;
  }

  create() {
    const group = new THREE.Group();

    // キャンバスを作成（高解像度）
    this.canvas = document.createElement('canvas');
    this.canvas.width = 256;
    this.canvas.height = 96;
    this.context = this.canvas.getContext('2d');

    // テクスチャを作成
    this.texture = new THREE.CanvasTexture(this.canvas);
    this.texture.minFilter = THREE.LinearFilter;
    this.texture.magFilter = THREE.LinearFilter;

    // ボタンのジオメトリとマテリアル
    const buttonGeometry = new THREE.PlaneGeometry(0.14, 0.055);
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

    // 背景をクリア
    ctx.clearRect(0, 0, width, height);

    // グラデーション背景（Generateは緑、Regenerateはオレンジ）
    let gradient;
    if (this.isRegenerateMode) {
      // Regenerate: オレンジ系
      if (this.isPressed) {
        gradient = ctx.createLinearGradient(0, 0, 0, height);
        gradient.addColorStop(0, '#b35900');
        gradient.addColorStop(1, '#cc6600');
      } else if (this.isHovered) {
        gradient = ctx.createLinearGradient(0, 0, 0, height);
        gradient.addColorStop(0, '#ffaa33');
        gradient.addColorStop(1, '#ff8800');
      } else {
        gradient = ctx.createLinearGradient(0, 0, 0, height);
        gradient.addColorStop(0, '#FF9800');
        gradient.addColorStop(1, '#F57C00');
      }
    } else {
      // Generate: 緑系
      if (this.isPressed) {
        gradient = ctx.createLinearGradient(0, 0, 0, height);
        gradient.addColorStop(0, '#1a5c1a');
        gradient.addColorStop(1, '#2d8a2d');
      } else if (this.isHovered) {
        gradient = ctx.createLinearGradient(0, 0, 0, height);
        gradient.addColorStop(0, '#5dd55d');
        gradient.addColorStop(1, '#3cb43c');
      } else {
        gradient = ctx.createLinearGradient(0, 0, 0, height);
        gradient.addColorStop(0, '#4CAF50');
        gradient.addColorStop(1, '#388E3C');
      }
    }

    // 角丸の背景
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.roundRect(4, 4, width - 8, height - 8, 16);
    ctx.fill();

    // 内側のハイライト（上部）
    if (!this.isPressed) {
      ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
      ctx.beginPath();
      ctx.roundRect(8, 8, width - 16, (height - 16) / 2, [12, 12, 0, 0]);
      ctx.fill();
    }

    // 枠線（グロー効果付き）
    let borderColor, glowColor;
    if (this.isRegenerateMode) {
      borderColor = this.isHovered ? '#ffcc00' : '#E65100';
      glowColor = '#ffcc00';
    } else {
      borderColor = this.isHovered ? '#00ffff' : '#2E7D32';
      glowColor = '#00ffff';
    }
    ctx.strokeStyle = borderColor;
    ctx.lineWidth = this.isHovered ? 4 : 3;
    ctx.beginPath();
    ctx.roundRect(4, 4, width - 8, height - 8, 16);
    ctx.stroke();

    // 外側のグロー（ホバー時）
    if (this.isHovered && !this.isPressed) {
      ctx.shadowColor = glowColor;
      ctx.shadowBlur = 20;
      ctx.strokeStyle = this.isRegenerateMode ? 'rgba(255, 204, 0, 0.5)' : 'rgba(0, 255, 255, 0.5)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(2, 2, width - 4, height - 4, 18);
      ctx.stroke();
      ctx.shadowBlur = 0;
    }

    // アイコンとテキスト
    ctx.fillStyle = '#ffffff';
    const iconX = 35;
    const iconY = height / 2;

    if (this.isLoading) {
      // ローディング状態: スピナーアイコン
      ctx.save();
      ctx.translate(iconX, iconY);
      ctx.rotate(this.animationTime * 6); // 回転アニメーション
      ctx.beginPath();
      ctx.arc(0, 0, 12, 0, Math.PI * 1.5, false);
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 4;
      ctx.lineCap = 'round';
      ctx.stroke();
      ctx.restore();

      // ローディングテキスト
      const dots = '.'.repeat((this.loadingDots % 4));
      ctx.font = 'bold 26px "SF Pro", "Segoe UI", system-ui, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
      ctx.fillText(`Loading${dots}`, width / 2 + 12, height / 2 + 2);
      ctx.fillStyle = '#ffffff';
      ctx.fillText(`Loading${dots}`, width / 2 + 10, height / 2);
    } else if (this.isRegenerateMode) {
      // 回転矢印アイコン
      ctx.save();
      ctx.translate(iconX, iconY);
      ctx.beginPath();
      ctx.arc(0, 0, 12, -Math.PI * 0.8, Math.PI * 0.5, false);
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 4;
      ctx.lineCap = 'round';
      ctx.stroke();
      // 矢印の先端
      ctx.beginPath();
      ctx.moveTo(10, 8);
      ctx.lineTo(14, 2);
      ctx.lineTo(6, 4);
      ctx.closePath();
      ctx.fill();
      ctx.restore();

      // テキスト（影付き）
      ctx.font = 'bold 28px "SF Pro", "Segoe UI", system-ui, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
      ctx.fillText(this.buttonText, width / 2 + 12, height / 2 + 2);
      ctx.fillStyle = '#ffffff';
      ctx.fillText(this.buttonText, width / 2 + 10, height / 2);
    } else {
      // 稲妻アイコン
      ctx.beginPath();
      ctx.moveTo(iconX + 2, iconY - 14);
      ctx.lineTo(iconX - 6, iconY + 2);
      ctx.lineTo(iconX, iconY + 2);
      ctx.lineTo(iconX - 2, iconY + 14);
      ctx.lineTo(iconX + 8, iconY - 2);
      ctx.lineTo(iconX + 2, iconY - 2);
      ctx.closePath();
      ctx.fill();

      // テキスト（影付き）
      ctx.font = 'bold 32px "SF Pro", "Segoe UI", system-ui, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
      ctx.fillText(this.buttonText, width / 2 + 12, height / 2 + 2);
      ctx.fillStyle = '#ffffff';
      ctx.fillText(this.buttonText, width / 2 + 10, height / 2);
    }

    // テクスチャを更新
    if (this.texture) {
      this.texture.needsUpdate = true;
    }
  }

  // ホバー状態を設定
  setHovered(hovered) {
    if (this.isHovered !== hovered && !this.isLoading) {
      this.isHovered = hovered;
      this.targetScale = hovered ? 1.1 : 1;
      this.updateCanvas();
    }
  }

  // ローディング状態を設定
  setLoading(loading) {
    this.isLoading = loading;
    this.loadingDots = 0;
    if (loading) {
      this.targetScale = 1;
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
    this.targetScale = 0.85;
    this.updateCanvas();

    // 300ms後にローディング状態に移行
    setTimeout(() => {
      this.isPressed = false;
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

    // スムーズなスケールアニメーション
    this.currentScale += (this.targetScale - this.currentScale) * 0.2;
    if (this.buttonGroup) {
      this.buttonGroup.scale.setScalar(this.currentScale);
    }

    // ローディング中のアニメーション
    if (this.isLoading) {
      // ドットアニメーション（0.4秒ごと）
      const newDotCount = Math.floor(this.animationTime * 2.5);
      if (newDotCount !== this.loadingDots) {
        this.loadingDots = newDotCount;
        this.updateCanvas();
      }
      // スピナー回転のためにキャンバスを継続的に更新（60fpsでは重いので10fps程度で）
      if (Math.floor(this.animationTime * 10) !== Math.floor((this.animationTime - deltaTime) * 10)) {
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
    return this.button && this.button.visible;
  }

  getButton() {
    return this.button;
  }

  setOnPress(callback) {
    this.onPress = callback;
  }

  // 再生成モードに切り替え
  setRegenerateMode(enabled) {
    this.isRegenerateMode = enabled;
    this.buttonText = enabled ? 'Regenerate' : 'Generate';
    this.updateCanvas();
  }

  // 再生成モードかどうか
  isInRegenerateMode() {
    return this.isRegenerateMode;
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
