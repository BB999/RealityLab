import * as THREE from 'three';
import { XRControllerModelFactory } from 'three/examples/jsm/webxr/XRControllerModelFactory.js';
import { XRHandModelFactory } from 'three/examples/jsm/webxr/XRHandModelFactory.js';

// WebXRコントローラとハンドトラッキングの管理
export class XRController {
  constructor(renderer, scene, solarSystemGroup) {
    this.renderer = renderer;
    this.scene = scene;
    this.solarSystemGroup = solarSystemGroup;

    this.controllers = [];
    this.controllerGrips = [];
    this.hands = [];

    this.isGrabbing = [false, false];
    this.grabStartDistance = 0;
    this.grabStartScale = 1;
    this.grabStartControllerPos = new THREE.Vector3();
    this.grabStartObjectPos = new THREE.Vector3();
    this.grabOffset = new THREE.Vector3();

    this.setupControllers();
    this.setupHands();
  }

  setupControllers() {
    const controllerModelFactory = new XRControllerModelFactory();

    for (let i = 0; i < 2; i++) {
      // コントローラーの作成
      const controller = this.renderer.xr.getController(i);
      controller.addEventListener('selectstart', () => this.onSelectStart(i));
      controller.addEventListener('selectend', () => this.onSelectEnd(i));
      controller.addEventListener('squeezestart', () => this.onSqueezeStart(i));
      controller.addEventListener('squeezeend', () => this.onSqueezeEnd(i));
      this.scene.add(controller);
      this.controllers.push(controller);

      // レイキャスターの視覚化
      const geometry = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(0, 0, -1)
      ]);
      const line = new THREE.Line(geometry);
      line.scale.z = 5;
      controller.add(line);

      // コントローラーグリップ（3Dモデル）
      const controllerGrip = this.renderer.xr.getControllerGrip(i);
      controllerGrip.add(controllerModelFactory.createControllerModel(controllerGrip));
      this.scene.add(controllerGrip);
      this.controllerGrips.push(controllerGrip);
    }
  }

  setupHands() {
    const handModelFactory = new XRHandModelFactory();

    for (let i = 0; i < 2; i++) {
      const hand = this.renderer.xr.getHand(i);
      hand.addEventListener('pinchstart', () => this.onPinchStart(i));
      hand.addEventListener('pinchend', () => this.onPinchEnd(i));

      const handModel = handModelFactory.createHandModel(hand, 'mesh');
      hand.add(handModel);
      this.scene.add(hand);
      this.hands.push(hand);
    }
  }

  // トリガーボタン押下（セレクト）
  onSelectStart(index) {
    console.log(`Controller ${index} select start`);
  }

  onSelectEnd(index) {
    console.log(`Controller ${index} select end`);
  }

  // グリップボタン押下（スクイーズ）- 太陽系の掴みと移動
  onSqueezeStart(index) {
    console.log(`Controller ${index} squeeze start`);
    this.isGrabbing[index] = true;

    // 両手で掴んでいる場合はスケール変更モード
    if (this.isGrabbing[0] && this.isGrabbing[1]) {
      const distance = this.controllers[0].position.distanceTo(this.controllers[1].position);
      this.grabStartDistance = distance;
      this.grabStartScale = this.solarSystemGroup.scale.x;
    } else {
      // 片手の場合は位置移動モード
      const controllerPos = this.getInputPosition(index);
      if (controllerPos) {
        this.grabStartControllerPos.copy(controllerPos);
        this.grabStartObjectPos.copy(this.solarSystemGroup.position);
        // オフセット = 太陽系の位置 - コントローラーの位置
        this.grabOffset.subVectors(this.grabStartObjectPos, this.grabStartControllerPos);
      }
    }
  }

  onSqueezeEnd(index) {
    console.log(`Controller ${index} squeeze end`);
    this.isGrabbing[index] = false;
  }

  // ハンドトラッキング: ピンチジェスチャー
  onPinchStart(index) {
    console.log(`Hand ${index} pinch start`);
    this.isGrabbing[index] = true;

    // 両手でピンチしている場合はスケール変更モード
    if (this.isGrabbing[0] && this.isGrabbing[1]) {
      const hand0Pos = this.getHandPosition(0);
      const hand1Pos = this.getHandPosition(1);
      if (hand0Pos && hand1Pos) {
        const distance = hand0Pos.distanceTo(hand1Pos);
        this.grabStartDistance = distance;
        this.grabStartScale = this.solarSystemGroup.scale.x;
      }
    } else {
      // 片手の場合は位置移動モード
      const handPos = this.getInputPosition(index);
      if (handPos) {
        this.grabStartControllerPos.copy(handPos);
        this.grabStartObjectPos.copy(this.solarSystemGroup.position);
        // オフセット = 太陽系の位置 - 手の位置
        this.grabOffset.subVectors(this.grabStartObjectPos, this.grabStartControllerPos);
      }
    }
  }

  onPinchEnd(index) {
    console.log(`Hand ${index} pinch end`);
    this.isGrabbing[index] = false;
  }

  // ハンドの位置を取得
  getHandPosition(index) {
    const hand = this.hands[index];
    if (!hand) return null;

    const indexTip = hand.joints['index-finger-tip'];
    if (indexTip) {
      return indexTip.position.clone();
    }
    return null;
  }

  // コントローラーまたはハンドの位置を取得
  getInputPosition(index) {
    // ハンドトラッキングが有効な場合
    const handPos = this.getHandPosition(index);
    if (handPos) return handPos;

    // コントローラーの場合
    return this.controllers[index].position.clone();
  }

  // 毎フレーム更新
  update() {
    // 両手で掴んでいる場合：スケール変更
    if (this.isGrabbing[0] && this.isGrabbing[1]) {
      const pos0 = this.getInputPosition(0);
      const pos1 = this.getInputPosition(1);

      if (pos0 && pos1) {
        const currentDistance = pos0.distanceTo(pos1);
        const scaleFactor = currentDistance / this.grabStartDistance;
        const newScale = this.grabStartScale * scaleFactor;

        // スケール制限なし（ただし最小値だけは設定）
        const clampedScale = Math.max(0.001, newScale);
        this.solarSystemGroup.scale.set(clampedScale, clampedScale, clampedScale);
      }
    }
    // 片手だけ掴んでいる場合：位置移動
    else if (this.isGrabbing[0] || this.isGrabbing[1]) {
      const index = this.isGrabbing[0] ? 0 : 1;
      const currentPos = this.getInputPosition(index);

      if (currentPos) {
        // 新しい位置 = 現在の手の位置 + オフセット
        const newPos = new THREE.Vector3().addVectors(currentPos, this.grabOffset);
        this.solarSystemGroup.position.copy(newPos);
      }
    }
  }
}
