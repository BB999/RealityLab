import * as THREE from 'three';

export class LoadingIndicator {
  constructor(scene) {
    this.scene = scene;
    this.indicator = null;
    this.dots = [];
    this.animationTime = 0;
  }

  create() {
    if (this.indicator) {
      this.scene.remove(this.indicator);
    }

    this.indicator = new THREE.Group();
    this.dots = [];

    // 5つのドットを作成
    const dotCount = 5;
    const dotRadius = 0.015;
    const spacing = 0.05;

    for (let i = 0; i < dotCount; i++) {
      const geometry = new THREE.SphereGeometry(dotRadius, 12, 12);
      const material = new THREE.MeshBasicMaterial({
        color: 0x4CAF50,
        transparent: true,
        opacity: 0.3
      });
      const dot = new THREE.Mesh(geometry, material);
      dot.position.x = (i - (dotCount - 1) / 2) * spacing;
      this.indicator.add(dot);
      this.dots.push(dot);
    }

    this.indicator.visible = false;
    this.scene.add(this.indicator);

    return this.indicator;
  }

  show(textPanel) {
    if (!this.indicator) {
      this.create();
    }

    if (textPanel) {
      this.indicator.position.copy(textPanel.position);
      this.indicator.position.y -= 0.08;
      this.indicator.quaternion.copy(textPanel.quaternion);
    }

    this.indicator.visible = true;
    this.animationTime = 0;
  }

  hide() {
    if (this.indicator) {
      this.indicator.visible = false;
    }
  }

  update(deltaTime, textPanel) {
    if (!this.indicator || !this.indicator.visible) return;

    this.animationTime += deltaTime * 3;

    for (let i = 0; i < this.dots.length; i++) {
      const phase = this.animationTime - i * 0.3;
      const wave = Math.sin(phase) * 0.5 + 0.5;
      this.dots[i].material.opacity = 0.3 + wave * 0.7;
      this.dots[i].scale.setScalar(0.8 + wave * 0.4);
    }

    // テキストパネルに追従
    if (textPanel) {
      this.indicator.position.copy(textPanel.position);
      this.indicator.position.y -= 0.08;
      this.indicator.quaternion.copy(textPanel.quaternion);
    }
  }

  dispose() {
    if (this.indicator) {
      this.scene.remove(this.indicator);
      this.dots.forEach(dot => {
        dot.geometry.dispose();
        dot.material.dispose();
      });
    }
  }
}
