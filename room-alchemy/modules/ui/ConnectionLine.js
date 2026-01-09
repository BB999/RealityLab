import * as THREE from 'three';

/**
 * 選択したモジュールとテキストパネルを繋ぐ線
 */
export class ConnectionLine {
  constructor(scene) {
    this.scene = scene;
    this.line = null;
    this.geometry = null;
    this.material = null;
  }

  create() {
    // 線のジオメトリ（2点間）
    this.geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(6); // 2点 × 3座標
    this.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    // 線のマテリアル（オレンジ色で目立つように）
    this.material = new THREE.LineBasicMaterial({
      color: 0xff6600,
      linewidth: 3,
      transparent: true,
      opacity: 0.8
    });

    this.line = new THREE.Line(this.geometry, this.material);
    this.line.visible = false;
    this.scene.add(this.line);

    return this.line;
  }

  /**
   * 線を更新（2点間を接続）
   * @param {THREE.Vector3} startPoint - 開始点（モジュールの位置）
   * @param {THREE.Vector3} endPoint - 終了点（テキストパネルの位置）
   */
  update(startPoint, endPoint) {
    if (!this.line || !startPoint || !endPoint) return;

    const positions = this.geometry.attributes.position.array;

    // 開始点
    positions[0] = startPoint.x;
    positions[1] = startPoint.y;
    positions[2] = startPoint.z;

    // 終了点
    positions[3] = endPoint.x;
    positions[4] = endPoint.y;
    positions[5] = endPoint.z;

    this.geometry.attributes.position.needsUpdate = true;
  }

  show() {
    if (this.line) {
      this.line.visible = true;
    }
  }

  hide() {
    if (this.line) {
      this.line.visible = false;
    }
  }

  isVisible() {
    return this.line && this.line.visible;
  }

  dispose() {
    if (this.line) {
      this.scene.remove(this.line);
    }
    if (this.geometry) {
      this.geometry.dispose();
    }
    if (this.material) {
      this.material.dispose();
    }
  }
}
