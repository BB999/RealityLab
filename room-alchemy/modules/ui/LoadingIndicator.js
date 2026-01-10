import * as THREE from 'three';

/**
 * 複数同時対応のかっこいいローディングインジケーター
 */
export class LoadingIndicator {
  constructor(scene) {
    this.scene = scene;
    this.indicators = new Map(); // id -> indicator object
    this.nextId = 1;
  }

  create() {
    // 初期化（互換性のため）
  }

  /**
   * 新しいローディングインジケーターを表示
   * @param {THREE.Object3D} textPanel - テキストパネル
   * @param {string} label - 表示するラベル（オプション）
   * @param {string} colorTheme - 色テーマ 'cyan' または 'orange'（オプション）
   * @returns {number} インジケーターID
   */
  show(textPanel, label = 'Generating', colorTheme = 'cyan') {
    const id = this.nextId++;
    const indicator = this._createIndicator(label, colorTheme);

    // 既存のインジケーター数に応じて位置をずらす
    const offset = this.indicators.size * 0.12;

    if (textPanel) {
      indicator.group.position.copy(textPanel.position);
      indicator.group.position.y -= 0.1 + offset;
      indicator.group.quaternion.copy(textPanel.quaternion);
    }

    indicator.group.visible = true;
    this.scene.add(indicator.group);
    this.indicators.set(id, indicator);

    return id;
  }

  /**
   * インジケーターを作成
   */
  _createIndicator(label, colorTheme = 'cyan') {
    const group = new THREE.Group();

    // 色テーマの設定
    let colors;
    if (colorTheme === 'orange') {
      colors = {
        border: '#ffcc00',
        text: '#ffcc00',
        spinner: 0xffcc00
      };
    } else if (colorTheme === 'green') {
      colors = {
        border: '#4CAF50',
        text: '#4CAF50',
        spinner: 0x4CAF50
      };
    } else {
      // デフォルト: cyan
      colors = {
        border: '#00ffff',
        text: '#00ffff',
        spinner: 0x00ffff
      };
    }

    // テキストの幅を計算
    const measureCanvas = document.createElement('canvas');
    const measureCtx = measureCanvas.getContext('2d');
    measureCtx.font = 'bold 18px "SF Pro", "Segoe UI", system-ui, sans-serif';
    const textWidth = measureCtx.measureText(label + '...').width;

    // キャンバスサイズをテキストに合わせる（スピナー分 + パディング）
    const spinnerSpace = 40;  // スピナー用スペース
    const padding = 30;       // 左右パディング
    const canvasWidth = Math.max(150, spinnerSpace + textWidth + padding);
    const canvasHeight = 48;

    // 3D空間でのサイズ（キャンバスサイズに比例）
    const meshWidth = canvasWidth / 1000;  // 0.15 ~ 0.3くらい
    const meshHeight = canvasHeight / 1000;

    // 背景パネル（半透明の暗い背景）
    const bgCanvas = document.createElement('canvas');
    bgCanvas.width = canvasWidth;
    bgCanvas.height = canvasHeight;
    const bgCtx = bgCanvas.getContext('2d');

    // 背景を描画
    bgCtx.fillStyle = 'rgba(20, 20, 30, 0.9)';
    bgCtx.beginPath();
    bgCtx.roundRect(0, 0, canvasWidth, canvasHeight, 12);
    bgCtx.fill();

    // 枠線
    bgCtx.strokeStyle = colors.border;
    bgCtx.lineWidth = 2;
    bgCtx.beginPath();
    bgCtx.roundRect(2, 2, canvasWidth - 4, canvasHeight - 4, 10);
    bgCtx.stroke();

    const bgTexture = new THREE.CanvasTexture(bgCanvas);
    const bgMaterial = new THREE.MeshBasicMaterial({
      map: bgTexture,
      transparent: true,
      side: THREE.DoubleSide
    });
    const bgGeometry = new THREE.PlaneGeometry(meshWidth, meshHeight);
    const bgMesh = new THREE.Mesh(bgGeometry, bgMaterial);
    group.add(bgMesh);

    // テキストキャンバス
    const textCanvas = document.createElement('canvas');
    textCanvas.width = canvasWidth;
    textCanvas.height = canvasHeight;
    const textCtx = textCanvas.getContext('2d');

    const textTexture = new THREE.CanvasTexture(textCanvas);
    const textMaterial = new THREE.MeshBasicMaterial({
      map: textTexture,
      transparent: true,
      side: THREE.DoubleSide,
      depthTest: false
    });
    const textGeometry = new THREE.PlaneGeometry(meshWidth, meshHeight);
    const textMesh = new THREE.Mesh(textGeometry, textMaterial);
    textMesh.position.z = 0.001;
    group.add(textMesh);

    // スピナーの位置（左端からのオフセット）
    const spinnerX = -meshWidth / 2 + 0.02;

    // スピナーリング
    const ringGeometry = new THREE.RingGeometry(0.012, 0.016, 32, 1, 0, Math.PI * 1.5);
    const ringMaterial = new THREE.MeshBasicMaterial({
      color: colors.spinner,
      transparent: true,
      opacity: 0.9,
      side: THREE.DoubleSide
    });
    const ring = new THREE.Mesh(ringGeometry, ringMaterial);
    ring.position.set(spinnerX, 0, 0.002);
    group.add(ring);

    // 内側の光るドット
    const dotGeometry = new THREE.CircleGeometry(0.006, 16);
    const dotMaterial = new THREE.MeshBasicMaterial({
      color: colors.spinner,
      transparent: true,
      opacity: 0.6
    });
    const dot = new THREE.Mesh(dotGeometry, dotMaterial);
    dot.position.set(spinnerX, 0, 0.002);
    group.add(dot);

    return {
      group,
      ring,
      dot,
      textCanvas,
      textCtx,
      textTexture,
      canvasWidth,
      label,
      textColor: colors.text,
      animationTime: 0,
      dotCount: 0
    };
  }

  /**
   * テキストを更新
   */
  _updateText(indicator) {
    const ctx = indicator.textCtx;
    const canvas = indicator.textCanvas;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // ドットアニメーション（...）
    const dots = '.'.repeat((indicator.dotCount % 4));

    // テキスト描画（スピナーの右側に配置）
    ctx.font = 'bold 18px "SF Pro", "Segoe UI", system-ui, sans-serif';
    ctx.fillStyle = indicator.textColor || '#00ffff';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.fillText(`${indicator.label}${dots}`, 45, canvas.height / 2);

    indicator.textTexture.needsUpdate = true;
  }

  /**
   * 特定のインジケーターを非表示
   * @param {number} id - インジケーターID
   */
  hide(id) {
    if (typeof id === 'number') {
      const indicator = this.indicators.get(id);
      if (indicator) {
        this._disposeIndicator(indicator);
        this.indicators.delete(id);
        this._repositionIndicators();
      }
    } else {
      // 全て非表示（後方互換性）
      this.hideAll();
    }
  }

  /**
   * 全てのインジケーターを非表示
   */
  hideAll() {
    for (const [id, indicator] of this.indicators) {
      this._disposeIndicator(indicator);
    }
    this.indicators.clear();
  }

  /**
   * インジケーターを破棄
   */
  _disposeIndicator(indicator) {
    this.scene.remove(indicator.group);
    indicator.group.traverse((child) => {
      if (child.geometry) child.geometry.dispose();
      if (child.material) {
        if (child.material.map) child.material.map.dispose();
        child.material.dispose();
      }
    });
  }

  /**
   * インジケーターの位置を再配置
   */
  _repositionIndicators() {
    let index = 0;
    for (const [id, indicator] of this.indicators) {
      // Y位置を調整
      const baseY = indicator.group.position.y + (index * 0.12);
      index++;
    }
  }

  /**
   * 更新（毎フレーム呼び出し）
   */
  update(deltaTime, textPanel) {
    let index = 0;
    for (const [id, indicator] of this.indicators) {
      indicator.animationTime += deltaTime;

      // スピナーリングを回転
      indicator.ring.rotation.z -= deltaTime * 4;

      // 内側ドットの明滅
      const dotPulse = Math.sin(indicator.animationTime * 6) * 0.3 + 0.7;
      indicator.dot.material.opacity = dotPulse;

      // テキストのドットアニメーション（0.4秒ごと）
      const newDotCount = Math.floor(indicator.animationTime * 2.5);
      if (newDotCount !== indicator.dotCount) {
        indicator.dotCount = newDotCount;
        this._updateText(indicator);
      }

      // テキストパネルに追従
      if (textPanel) {
        const offset = index * 0.12;
        indicator.group.position.copy(textPanel.position);
        indicator.group.position.y -= 0.1 + offset;
        indicator.group.quaternion.copy(textPanel.quaternion);
      }

      index++;
    }
  }

  /**
   * 表示中のインジケーター数を取得
   */
  getActiveCount() {
    return this.indicators.size;
  }

  dispose() {
    this.hideAll();
  }
}
