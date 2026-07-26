import * as THREE from 'three';
import { GlassSurface, TINT, drawLabel, measureLabel, icons } from './liquidGlass.js';

const CANVAS_HEIGHT = 96;
const MESH_HEIGHT = 0.042;
const FONT_SIZE = 34;
const ICON_SIZE = 15;
// ピルの幅はラベルを実測して決めるので、フォントが差し替わったときのために余白を多めに取る
const PAD = 32;
const GAP = 16;
const REDRAW_FPS = 20;
// テキストパネルから1枚目までの距離。Talk / Clear の行を避けるのに必要な分
const STACK_TOP = 0.1;
// 2枚目以降の間隔。ピルの高さ + わずかな隙間にして、すぐ下に積む
const STACK_GAP = MESH_HEIGHT + 0.008;

const THEME = {
  cyan: TINT.blue,
  orange: TINT.orange,
  green: TINT.green
};

const THEME_CSS = {
  cyan: '#0a84ff',
  orange: '#ff9f0a',
  green: '#30d158'
};

/**
 * 複数同時対応のローディングインジケーター
 * テキストパネルの下に、Liquid Glass のピル型で積み重なる
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
   * @param {string} colorTheme - 色テーマ 'cyan' / 'orange' / 'green'（オプション）
   * @returns {number} インジケーターID
   */
  show(textPanel, label = 'Generating', colorTheme = 'cyan') {
    const id = this.nextId++;
    const indicator = this._createIndicator(label, colorTheme);

    // 既存のインジケーター数に応じて位置をずらす
    const offset = this.indicators.size * STACK_GAP;

    if (textPanel) {
      indicator.group.position.copy(textPanel.position);
      indicator.group.position.y -= STACK_TOP + offset;
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

    const accent = THEME[colorTheme] ?? TINT.blue;
    const accentCss = THEME_CSS[colorTheme] ?? THEME_CSS.cyan;

    // ラベルの幅に合わせてピルの長さを決める
    const measureCtx = document.createElement('canvas').getContext('2d');
    const textWidth = measureLabel(measureCtx, `${label}...`, FONT_SIZE, 600);
    const canvasWidth = Math.ceil(PAD * 2 + ICON_SIZE * 2 + GAP + textWidth);
    const meshWidth = MESH_HEIGHT * (canvasWidth / CANVAS_HEIGHT);

    const surface = new GlassSurface({
      width: meshWidth,
      height: MESH_HEIGHT,
      tint: TINT.graphite,
      accent,
      opacity: 0.42,
      canvasWidth,
      canvasHeight: CANVAS_HEIGHT,
      shadow: 0,
      hoverScale: 1,
      pressScale: 1,
      stiffness: 260,
      damping: 24
    });

    // 湧き出るように出現させる
    surface.scaleSpring.snap(0.82);
    surface.scaleSpring.to(1);
    surface.setSheen(0.75);
    surface.setFocus(0.45);

    const indicator = {
      group,
      surface,
      label,
      accentCss,
      animationTime: 0,
      dotCount: 0,
      lastFrame: -1
    };
    // Web フォントが後から届いたときにラベルを描き直す
    surface.onRedraw = () => this._updateContent(indicator);
    group.add(surface.object3D);

    return indicator;
  }

  /**
   * スピナーとラベルを描き直す
   */
  _updateContent(indicator) {
    const surface = indicator.surface;
    const ctx = surface.beginContent();
    const cy = surface.canvas.height / 2;

    const dots = '.'.repeat(indicator.dotCount % 4);

    icons.spinner(ctx, PAD + ICON_SIZE, cy, ICON_SIZE, indicator.accentCss, indicator.animationTime);

    drawLabel(ctx, `${indicator.label}${dots}`, PAD + ICON_SIZE * 2 + GAP, cy + 1, {
      size: FONT_SIZE,
      weight: 600,
      color: '#ffffff',
      align: 'left'
    });

    surface.markContentDirty();
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
    for (const indicator of this.indicators.values()) {
      this._disposeIndicator(indicator);
    }
    this.indicators.clear();
  }

  /**
   * インジケーターを破棄
   */
  _disposeIndicator(indicator) {
    this.scene.remove(indicator.group);
    indicator.surface.dispose();
  }

  /**
   * 更新（毎フレーム呼び出し）
   */
  update(deltaTime, textPanel) {
    let index = 0;
    for (const indicator of this.indicators.values()) {
      indicator.animationTime += deltaTime;
      indicator.surface.update(deltaTime);

      // スピナーとドットはキャンバス描画なので、20fps程度で描き直す
      const frame = Math.floor(indicator.animationTime * REDRAW_FPS);
      if (frame !== indicator.lastFrame) {
        indicator.lastFrame = frame;
        indicator.dotCount = Math.floor(indicator.animationTime * 2.5);
        this._updateContent(indicator);
      }

      // テキストパネルに追従
      if (textPanel) {
        const offset = index * STACK_GAP;
        indicator.group.position.copy(textPanel.position);
        indicator.group.position.y -= STACK_TOP + offset;
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
