import * as THREE from 'three';

// パネル・モジュールのドラッグ状態を管理するクラス
export class InteractionState {
  constructor() {
    // モジュールドラッグ用
    this.draggingModule = null;
    this.initialModuleQuaternion = new THREE.Quaternion();
    this.initialGripQuaternion = new THREE.Quaternion();
    this.isLaserDragging = false;
    this.laserDragDistance = 0;
    this.laserHitOffset = new THREE.Vector3();

    // パネルのレーザードラッグ用
    this.isPanelLaserDragging = false;
    this.panelLaserDragDistance = 0;
    this.isImagePanelLaserDragging = false;
    this.imagePanelLaserDragDistance = 0;

    // 両手スケーリング用
    this.isTwoHandScaling = false;
    this.initialGripDistance = 0;
    this.initialModuleScale = 1;
    this.leftGripInputSource = null;
    this.rightGripInputSource = null;

    // パネルドラッグ用
    this.isDraggingPanel = false;
    this.isDraggingImagePanel = false;
    this.draggingInputSource = null;
    this.dragOffset = new THREE.Vector3();
    this.wasGripPressed = { left: false, right: false };

    // 再生成用：選択中モジュール
    this.selectedModule = null;
    this.selectedModuleKind = null;  // 'threejs' or 'imagePanel'
    this.selectedModuleCode = null;
    this.selectedModulePrompt = null;
    this.selectedModuleImageUrl = null;
  }

  // ドラッグ開始（モジュール）
  startModuleDrag(moduleId, inputSource, useLaser, distance, hitOffset) {
    this.draggingModule = moduleId;
    this.draggingInputSource = inputSource;
    this.isLaserDragging = useLaser;
    if (useLaser) {
      this.laserDragDistance = distance;
      this.laserHitOffset.copy(hitOffset);
    }
  }

  // ドラッグ終了（モジュール）
  stopModuleDrag() {
    this.draggingModule = null;
    this.draggingInputSource = null;
    this.isLaserDragging = false;
  }

  // テキストパネルドラッグ開始
  startTextPanelDrag(inputSource, useLaser, distance, offset) {
    this.isDraggingPanel = true;
    this.isPanelLaserDragging = useLaser;
    this.draggingInputSource = inputSource;
    if (useLaser) {
      this.panelLaserDragDistance = distance;
    }
    this.dragOffset.copy(offset);
  }

  // テキストパネルドラッグ終了
  stopTextPanelDrag() {
    this.isDraggingPanel = false;
    this.isPanelLaserDragging = false;
    this.draggingInputSource = null;
  }

  // 画像パネルドラッグ開始
  startImagePanelDrag(inputSource, useLaser, distance, offset) {
    this.isDraggingImagePanel = true;
    this.isImagePanelLaserDragging = useLaser;
    this.draggingInputSource = inputSource;
    if (useLaser) {
      this.imagePanelLaserDragDistance = distance;
    }
    this.dragOffset.copy(offset);
  }

  // 画像パネルドラッグ終了
  stopImagePanelDrag() {
    this.isDraggingImagePanel = false;
    this.isImagePanelLaserDragging = false;
    this.draggingInputSource = null;
  }

  // 両手スケーリング開始
  startTwoHandScaling(leftSource, rightSource, distance, scale) {
    this.isTwoHandScaling = true;
    this.leftGripInputSource = leftSource;
    this.rightGripInputSource = rightSource;
    this.initialGripDistance = distance;
    this.initialModuleScale = scale;
  }

  // 両手スケーリング終了
  stopTwoHandScaling() {
    this.isTwoHandScaling = false;
    this.leftGripInputSource = null;
    this.rightGripInputSource = null;
  }

  // 初期回転を記録
  setInitialRotation(gripQuaternion, moduleQuaternion) {
    this.initialGripQuaternion.copy(gripQuaternion);
    this.initialModuleQuaternion.copy(moduleQuaternion);
  }

  // 何かドラッグ中か
  isDraggingAnything() {
    return this.draggingModule !== null || this.isDraggingPanel || this.isDraggingImagePanel;
  }

  // グリップ状態を更新
  updateGripState(handedness, pressed) {
    this.wasGripPressed[handedness] = pressed;
  }

  // グリップ状態を取得
  wasGripPressedFor(handedness) {
    return this.wasGripPressed[handedness];
  }

  // モジュールを選択（再生成用）
  selectModule(moduleId, kind, code, prompt, imageUrl = null) {
    this.selectedModule = moduleId;
    this.selectedModuleKind = kind;
    this.selectedModuleCode = code;
    this.selectedModulePrompt = prompt;
    this.selectedModuleImageUrl = imageUrl;
  }

  // モジュール選択を解除
  deselectModule() {
    this.selectedModule = null;
    this.selectedModuleKind = null;
    this.selectedModuleCode = null;
    this.selectedModulePrompt = null;
    this.selectedModuleImageUrl = null;
  }

  // モジュールが選択されているか
  hasSelectedModule() {
    return this.selectedModule !== null;
  }

  // 選択中のモジュール情報を取得
  getSelectedModuleInfo() {
    return {
      moduleId: this.selectedModule,
      kind: this.selectedModuleKind,
      code: this.selectedModuleCode,
      prompt: this.selectedModulePrompt,
      imageUrl: this.selectedModuleImageUrl
    };
  }
}
