import * as THREE from 'three';
import { GlassSurface, TINT, GLASS_FONT, icons } from './liquidGlass.js';

const W = 0.4;
const H = 0.05;
const INSET = 34;          // 左右の内側余白（キャンバスpx）
const CARET_FPS = 12;      // キャレットのフェードを描き直す頻度

export class TextPanel {
  constructor(scene) {
    this.scene = scene;
    this.panel = null;
    this.panelGroup = null;
    this.surface = null;
    this.promptText = '';
    this.caretPhase = 0;
    this.caretAlpha = 1;
    this.lastCaretFrame = -1;
    this.isActive = false;
    this.initialized = false;
    this.isHovered = false;
    this.animationTime = 0;
    // ピン留め（カメラ追従）状態
    this.isPinned = false;
  }

  create() {
    const group = new THREE.Group();

    this.surface = new GlassSurface({
      width: W,
      height: H,
      tint: TINT.graphite,
      accent: TINT.blue,
      // 入力欄は文字が乗るので、ボタンより濃いガラスにして可読性を確保する
      opacity: 0.46,
      canvasWidth: 1024,
      canvasHeight: 128,
      shadow: 0,
      hoverScale: 1.03,
      pressScale: 1,
      stiffness: 200,
      damping: 24
    });

    group.add(this.surface.object3D);

    this.panel = this.surface.hitMesh;
    // Web フォントが後から届いたときにラベルを描き直す
    this.surface.onRedraw = () => this.updateCanvas();
    this.panelGroup = group;
    this.panelGroup.position.set(0, 1.2, -0.5);
    this.panelGroup.visible = false;
    this.scene.add(this.panelGroup);

    // 初期描画
    this.updateCanvas();

    return this.panel;
  }

  updateCanvas() {
    if (!this.surface) return;

    const ctx = this.surface.beginContent();
    const width = this.surface.canvas.width;
    const height = this.surface.canvas.height;
    const cy = height / 2;
    const fontSize = 48;

    ctx.font = `500 ${fontSize}px ${GLASS_FONT}`;
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'left';
    if ('letterSpacing' in ctx) ctx.letterSpacing = '-0.5px';

    if (this.promptText.length === 0 && !this.isActive) {
      // プレースホルダー: sparkles + 説明文（Apple のプレースホルダーと同じ第二階層の白）
      icons.sparkle(ctx, INSET + 20, cy, 20, 'rgba(255, 255, 255, 0.55)');
      ctx.fillStyle = 'rgba(255, 255, 255, 0.55)';
      ctx.fillText('プロンプトを入力', INSET + 56, cy + 1);
      this.surface.markContentDirty();
      return;
    }

    // 末尾が見えるように、あふれた分は先頭から削る
    const maxWidth = width - INSET * 2 - 20;
    let text = this.promptText;
    while (text.length > 0 && ctx.measureText(text).width > maxWidth) {
      text = text.substring(1);
    }

    ctx.save();
    ctx.shadowColor = 'rgba(0, 0, 0, 0.55)';
    ctx.shadowBlur = 14;
    ctx.shadowOffsetY = 2;
    ctx.fillStyle = '#ffffff';
    ctx.fillText(text, INSET, cy + 1);
    ctx.restore();

    if (this.isActive) {
      // 角丸のキャレット。点滅はオン/オフではなくフェードさせる
      const caretX = INSET + ctx.measureText(text).width + 6;
      const caretH = fontSize * 0.86;
      ctx.save();
      ctx.globalAlpha = this.caretAlpha;
      ctx.fillStyle = '#0a84ff';
      ctx.shadowColor = 'rgba(10, 132, 255, 0.9)';
      ctx.shadowBlur = 16;
      ctx.beginPath();
      ctx.roundRect(caretX, cy - caretH / 2, 5, caretH, 2.5);
      ctx.fill();
      ctx.restore();
    }

    this.surface.markContentDirty();
  }

  start() {
    this.isActive = true;
    this.promptText = '';
    this.caretPhase = 0;
    this.caretAlpha = 1;
    this.surface.setFocus(1);
    this.updateCanvas();

    if (this.panelGroup) {
      this.panelGroup.visible = true;
      this.initialized = false; // 次回表示時にカメラの前に再配置
    }
  }

  stop() {
    this.isActive = false;
    this.surface.setFocus(0);
    this.updateCanvas();
  }

  // ホバー状態を設定
  setHovered(hovered) {
    if (this.isHovered !== hovered) {
      this.isHovered = hovered;
      this.surface.setHovered(hovered);
    }
  }

  // 毎フレーム更新
  update(deltaTime) {
    this.animationTime += deltaTime;
    this.surface.update(deltaTime);

    if (!this.isActive) return;

    // 1.1秒周期。半分以上は点灯させたままにして、消えるところだけ滑らかに落とす
    this.caretPhase = (this.caretPhase + deltaTime / 1.1) % 1;
    const p = this.caretPhase;
    this.caretAlpha = p < 0.5 ? 1 : 0.5 + 0.5 * Math.cos((p - 0.5) * Math.PI * 4);

    const frame = Math.floor(this.animationTime * CARET_FPS);
    if (frame !== this.lastCaretFrame) {
      this.lastCaretFrame = frame;
      this.updateCanvas();
    }
  }

  // ピン留め状態を設定
  setPinned(pinned) {
    this.isPinned = pinned;
  }

  // ピン留め状態を取得
  isPinnedState() {
    return this.isPinned;
  }

  // カメラ追従更新（ピン留め時に毎フレーム呼び出す）
  followCamera(frame, referenceSpace, xrSession, camera) {
    if (!this.panelGroup || !this.isPinned) return;

    let cameraPosition = new THREE.Vector3();
    let cameraQuaternion = new THREE.Quaternion();

    if (xrSession && frame && referenceSpace) {
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
        return;
      }
    } else {
      cameraPosition.copy(camera.position);
      cameraQuaternion.copy(camera.quaternion);
    }

    // カメラの前方0.5m、下にパネルを配置
    const forward = new THREE.Vector3(0, -0.28, -0.5);
    forward.applyQuaternion(cameraQuaternion);
    const targetPosition = cameraPosition.clone().add(forward);

    // スムーズに移動（lerp）
    this.panelGroup.position.lerp(targetPosition, 0.1);

    // 常にカメラに向く（Y軸回転のみ）
    const euler = new THREE.Euler().setFromQuaternion(cameraQuaternion, 'YXZ');
    euler.x = 0;
    euler.z = 0;
    const targetQuaternion = new THREE.Quaternion().setFromEuler(euler);
    this.panelGroup.quaternion.slerp(targetQuaternion, 0.1);
  }

  initializePosition(frame, referenceSpace, xrSession, camera) {
    if (!this.panelGroup || this.initialized) return;

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
    this.panelGroup.position.copy(cameraPosition).add(forward);

    // パネルを水平に配置（Y軸回転のみ適用）
    const euler = new THREE.Euler().setFromQuaternion(cameraQuaternion, 'YXZ');
    euler.x = 0;  // X軸回転をリセット（水平に）
    euler.z = 0;  // Z軸回転をリセット
    this.panelGroup.quaternion.setFromEuler(euler);

    console.log('テキストパネルを配置:', this.panelGroup.position);
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
    return this.panelGroup && this.panelGroup.visible;
  }

  getPanel() {
    return this.panelGroup;
  }

  isInitialized() {
    return this.initialized;
  }

  dispose() {
    if (this.surface) this.surface.dispose();
    if (this.panelGroup) {
      this.scene.remove(this.panelGroup);
    }
  }
}
