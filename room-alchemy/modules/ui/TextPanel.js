import * as THREE from 'three';

export class TextPanel {
  constructor(scene) {
    this.scene = scene;
    this.panel = null;
    this.canvas = null;
    this.context = null;
    this.texture = null;
    this.promptText = '';
    this.cursorVisible = true;
    this.cursorBlinkInterval = null;
    this.isActive = false;
    this.initialized = false;
  }

  create() {
    // キャンバスを作成（テキスト描画用）
    this.canvas = document.createElement('canvas');
    this.canvas.width = 512;
    this.canvas.height = 64;
    this.context = this.canvas.getContext('2d');

    // テクスチャを作成
    this.texture = new THREE.CanvasTexture(this.canvas);
    this.texture.minFilter = THREE.LinearFilter;
    this.texture.magFilter = THREE.LinearFilter;

    // パネルのジオメトリとマテリアル
    const panelGeometry = new THREE.PlaneGeometry(0.4, 0.05);
    const panelMaterial = new THREE.MeshBasicMaterial({
      map: this.texture,
      transparent: true,
      side: THREE.DoubleSide
    });

    this.panel = new THREE.Mesh(panelGeometry, panelMaterial);
    this.panel.position.set(0, 1.2, -0.5);
    this.panel.visible = false;
    this.scene.add(this.panel);

    // 初期描画
    this.updateCanvas();

    // カーソル点滅
    this.cursorBlinkInterval = setInterval(() => {
      if (this.isActive) {
        this.cursorVisible = !this.cursorVisible;
        this.updateCanvas();
      }
    }, 500);

    return this.panel;
  }

  updateCanvas() {
    if (!this.context) return;

    const ctx = this.context;
    const width = this.canvas.width;
    const height = this.canvas.height;

    // 背景をクリア
    ctx.clearRect(0, 0, width, height);

    // 背景を描画（不透明の濃いグレー - MRで見やすく）
    ctx.fillStyle = 'rgba(30, 30, 40, 0.95)';
    ctx.beginPath();
    ctx.roundRect(0, 0, width, height, 8);
    ctx.fill();

    // 枠線を描画（明るい色で目立つように）
    ctx.strokeStyle = this.isActive ? '#4CAF50' : '#AAAAAA';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(1, 1, width - 2, height - 2, 7);
    ctx.stroke();

    // プレースホルダーまたはテキストを描画
    ctx.font = 'bold 24px system-ui, sans-serif';
    ctx.textBaseline = 'middle';

    if (this.promptText.length === 0 && !this.isActive) {
      ctx.fillStyle = '#888888';
      ctx.fillText('✨ プロンプトを入力...', 10, height / 2);
    } else {
      ctx.fillStyle = '#ffffff';
      const displayText = this.promptText + (this.cursorVisible && this.isActive ? '|' : '');

      // テキストが長すぎる場合は省略
      const maxWidth = width - 20;
      let text = displayText;
      while (ctx.measureText(text).width > maxWidth && text.length > 0) {
        text = text.substring(1);
      }
      ctx.fillText(text, 10, height / 2);
    }

    // テクスチャを更新
    if (this.texture) {
      this.texture.needsUpdate = true;
    }
  }

  start() {
    this.isActive = true;
    this.promptText = '';
    this.cursorVisible = true;
    this.updateCanvas();

    if (this.panel) {
      this.panel.visible = true;
      this.initialized = false; // 次回表示時にカメラの前に再配置
    }
  }

  stop() {
    this.isActive = false;
    this.cursorVisible = false;
    this.updateCanvas();
  }

  initializePosition(frame, referenceSpace, xrSession, camera) {
    if (!this.panel || this.initialized) return;

    let cameraPosition = new THREE.Vector3();
    let cameraQuaternion = new THREE.Quaternion();

    if (xrSession && frame && referenceSpace) {
      // XRセッション中はviewerPoseから位置を取得
      const viewerPose = frame.getViewerPose(referenceSpace);
      if (viewerPose) {
        const transform = viewerPose.transform;
        cameraPosition.set(
          transform.position.x,
          transform.position.y,
          transform.position.z
        );
        cameraQuaternion.set(
          transform.orientation.x,
          transform.orientation.y,
          transform.orientation.z,
          transform.orientation.w
        );
      } else {
        // viewerPoseが取得できなければ次のフレームで再試行
        return;
      }
    } else {
      cameraPosition.copy(camera.position);
      cameraQuaternion.copy(camera.quaternion);
    }

    // カメラの前方0.5mにパネルを配置（少し下に）
    const forward = new THREE.Vector3(0, -0.1, -0.5);
    forward.applyQuaternion(cameraQuaternion);
    this.panel.position.copy(cameraPosition).add(forward);

    // パネルを水平に配置（Y軸回転のみ適用）
    const euler = new THREE.Euler().setFromQuaternion(cameraQuaternion, 'YXZ');
    euler.x = 0;  // X軸回転をリセット（水平に）
    euler.z = 0;  // Z軸回転をリセット
    this.panel.quaternion.setFromEuler(euler);

    console.log('テキストパネルを配置:', this.panel.position);
    this.initialized = true;
  }

  // 当たり判定のサイズ（パネルサイズに合わせる: 0.4 x 0.05）
  checkCollision(controllerPosition) {
    if (!this.panel || !controllerPosition) return false;

    const COLLISION_SIZE = { x: 0.5, y: 0.1, z: 0.1 };

    // パネルのローカル座標系に変換
    const localPos = controllerPosition.clone();
    this.panel.worldToLocal(localPos);

    // ボックス内かどうかチェック
    const halfX = COLLISION_SIZE.x / 2;
    const halfY = COLLISION_SIZE.y / 2;
    const halfZ = COLLISION_SIZE.z / 2;

    return Math.abs(localPos.x) < halfX &&
           Math.abs(localPos.y) < halfY &&
           Math.abs(localPos.z) < halfZ;
  }

  getPromptText() {
    return this.promptText;
  }

  setPromptText(text) {
    this.promptText = text;
    this.updateCanvas();
  }

  clearPromptText() {
    this.promptText = '';
    this.updateCanvas();
  }

  isVisible() {
    return this.panel && this.panel.visible;
  }

  getPanel() {
    return this.panel;
  }

  isInitialized() {
    return this.initialized;
  }

  dispose() {
    if (this.cursorBlinkInterval) {
      clearInterval(this.cursorBlinkInterval);
    }
    if (this.panel) {
      this.scene.remove(this.panel);
      this.panel.geometry.dispose();
      this.panel.material.dispose();
    }
    if (this.texture) {
      this.texture.dispose();
    }
  }
}
