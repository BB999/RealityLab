import * as THREE from 'three';
import * as state from './state.js';

// 自動帰還中のテキストを作成
export function createAutoReturnText() {
  if (state.autoReturnText) return;

  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 128;
  const context = canvas.getContext('2d');

  context.fillStyle = '#00ff00';
  context.font = 'bold 60px Arial';
  context.textAlign = 'center';
  context.textBaseline = 'middle';
  context.fillText('自動帰還中', canvas.width / 2, canvas.height / 2);

  const texture = new THREE.CanvasTexture(canvas);
  const geometry = new THREE.PlaneGeometry(0.15, 0.0375);
  const material = new THREE.MeshBasicMaterial({
    map: texture,
    transparent: true,
    side: THREE.DoubleSide
  });

  const mesh = new THREE.Mesh(geometry, material);
  state.scene.add(mesh);
  state.setAutoReturnText(mesh);
}

// 自動帰還中のコントローラーテキストを作成（右）
export function createAutoReturnRightControllerText() {
  if (state.autoReturnRightControllerText) return;

  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 128;
  const context = canvas.getContext('2d');

  context.fillStyle = '#00ff00';
  context.font = 'bold 60px Arial';
  context.textAlign = 'center';
  context.textBaseline = 'middle';
  context.fillText('自動帰還中', canvas.width / 2, canvas.height / 2);

  const texture = new THREE.CanvasTexture(canvas);
  const geometry = new THREE.PlaneGeometry(0.15, 0.0375);
  const material = new THREE.MeshBasicMaterial({
    map: texture,
    transparent: true,
    side: THREE.DoubleSide
  });

  const mesh = new THREE.Mesh(geometry, material);
  state.scene.add(mesh);
  state.setAutoReturnRightControllerText(mesh);
}

// 自動帰還中のコントローラーテキストを作成（左）
export function createAutoReturnLeftControllerText() {
  if (state.autoReturnLeftControllerText) return;

  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 128;
  const context = canvas.getContext('2d');

  context.fillStyle = '#00ff00';
  context.font = 'bold 60px Arial';
  context.textAlign = 'center';
  context.textBaseline = 'middle';
  context.fillText('自動帰還中', canvas.width / 2, canvas.height / 2);

  const texture = new THREE.CanvasTexture(canvas);
  const geometry = new THREE.PlaneGeometry(0.15, 0.0375);
  const material = new THREE.MeshBasicMaterial({
    map: texture,
    transparent: true,
    side: THREE.DoubleSide
  });

  const mesh = new THREE.Mesh(geometry, material);
  state.scene.add(mesh);
  state.setAutoReturnLeftControllerText(mesh);
}

// 自動帰還中のテキストを削除
export function removeAutoReturnText() {
  if (state.autoReturnText) {
    state.scene.remove(state.autoReturnText);
    state.autoReturnText.geometry.dispose();
    state.autoReturnText.material.dispose();
    state.autoReturnText.material.map.dispose();
    state.setAutoReturnText(null);
  }
  if (state.autoReturnRightControllerText) {
    state.scene.remove(state.autoReturnRightControllerText);
    state.autoReturnRightControllerText.geometry.dispose();
    state.autoReturnRightControllerText.material.dispose();
    state.autoReturnRightControllerText.material.map.dispose();
    state.setAutoReturnRightControllerText(null);
  }
  if (state.autoReturnLeftControllerText) {
    state.scene.remove(state.autoReturnLeftControllerText);
    state.autoReturnLeftControllerText.geometry.dispose();
    state.autoReturnLeftControllerText.material.dispose();
    state.autoReturnLeftControllerText.material.map.dispose();
    state.setAutoReturnLeftControllerText(null);
  }
}

// 自動帰還中のテキスト位置を更新
export function updateAutoReturnText() {
  if (state.autoReturnText) {
    const cameraPos = new THREE.Vector3();
    state.camera.getWorldPosition(cameraPos);

    const forward = new THREE.Vector3(0, 0, -1).applyQuaternion(state.camera.quaternion);
    const right = new THREE.Vector3(1, 0, 0).applyQuaternion(state.camera.quaternion);
    const down = new THREE.Vector3(0, -1, 0).applyQuaternion(state.camera.quaternion);

    const textPos = cameraPos.clone()
      .add(forward.multiplyScalar(0.5))
      .add(right.multiplyScalar(0.2))
      .add(down.multiplyScalar(0.15));

    state.autoReturnText.position.copy(textPos);
    state.autoReturnText.lookAt(state.camera.position);
  }

  if (state.autoReturnRightControllerText) {
    state.autoReturnRightControllerText.visible = false;
  }
}

// 速度レベル表示を作成
export function createSpeedText() {
  if (state.speedText) {
    state.scene.remove(state.speedText);
    state.speedText.geometry.dispose();
    state.speedText.material.dispose();
    state.speedText.material.map.dispose();
    state.setSpeedText(null);
  }
  if (state.speedRightControllerText) {
    state.scene.remove(state.speedRightControllerText);
    state.speedRightControllerText.geometry.dispose();
    state.speedRightControllerText.material.dispose();
    state.speedRightControllerText.material.map.dispose();
    state.setSpeedRightControllerText(null);
  }

  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 128;
  const context = canvas.getContext('2d');

  context.fillStyle = '#ffff00';
  context.font = 'bold 60px Arial';
  context.textAlign = 'center';
  context.textBaseline = 'middle';
  context.fillText('Speed ' + state.speedLevel, canvas.width / 2, canvas.height / 2);

  const texture = new THREE.CanvasTexture(canvas);

  const geometry1 = new THREE.PlaneGeometry(0.2, 0.05);
  const material1 = new THREE.MeshBasicMaterial({
    map: texture.clone(),
    transparent: true,
    side: THREE.DoubleSide
  });
  const speedText = new THREE.Mesh(geometry1, material1);
  state.scene.add(speedText);
  state.setSpeedText(speedText);

  const geometry2 = new THREE.PlaneGeometry(0.2, 0.05);
  const material2 = new THREE.MeshBasicMaterial({
    map: texture.clone(),
    transparent: true,
    side: THREE.DoubleSide
  });
  const speedRightText = new THREE.Mesh(geometry2, material2);
  state.scene.add(speedRightText);
  state.setSpeedRightControllerText(speedRightText);

  // 既存のタイマーをクリア
  if (state.speedTextTimerId) {
    clearTimeout(state.speedTextTimerId);
  }

  const timerId = setTimeout(() => {
    if (state.speedText) {
      state.scene.remove(state.speedText);
      state.speedText.geometry.dispose();
      state.speedText.material.dispose();
      state.speedText.material.map.dispose();
      state.setSpeedText(null);
    }
    if (state.speedRightControllerText) {
      state.scene.remove(state.speedRightControllerText);
      state.speedRightControllerText.geometry.dispose();
      state.speedRightControllerText.material.dispose();
      state.speedRightControllerText.material.map.dispose();
      state.setSpeedRightControllerText(null);
    }
    state.setSpeedTextTimerId(null);
  }, 3000);

  state.setSpeedTextTimerId(timerId);
}

// 速度レベル表示の位置を更新
export function updateSpeedText() {
  if (state.speedText) {
    const cameraPos = new THREE.Vector3();
    state.camera.getWorldPosition(cameraPos);

    const forward = new THREE.Vector3(0, 0, -1).applyQuaternion(state.camera.quaternion);
    const right = new THREE.Vector3(1, 0, 0).applyQuaternion(state.camera.quaternion);
    const down = new THREE.Vector3(0, -1, 0).applyQuaternion(state.camera.quaternion);

    const textPos = cameraPos.clone()
      .add(forward.multiplyScalar(0.5))
      .add(right.multiplyScalar(0.2))
      .add(down.multiplyScalar(0.2));

    state.speedText.position.copy(textPos);
    state.speedText.lookAt(state.camera.position);
  }

  if (state.speedRightControllerText) {
    state.speedRightControllerText.visible = false;
  }
}

// 音量オンオフ表示を作成
export function createVolumeText(isOn) {
  if (state.volumeText) {
    state.scene.remove(state.volumeText);
    state.volumeText.geometry.dispose();
    state.volumeText.material.dispose();
    state.volumeText.material.map.dispose();
    state.setVolumeText(null);
  }

  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 128;
  const context = canvas.getContext('2d');

  context.fillStyle = '#00ff00';
  context.font = 'bold 60px Arial';
  context.textAlign = 'center';
  context.textBaseline = 'middle';
  const text = isOn ? 'Volume On' : 'Volume Off';
  context.fillText(text, canvas.width / 2, canvas.height / 2);

  const texture = new THREE.CanvasTexture(canvas);
  const geometry = new THREE.PlaneGeometry(0.2, 0.05);
  const material = new THREE.MeshBasicMaterial({
    map: texture,
    transparent: true,
    side: THREE.DoubleSide
  });

  const volumeText = new THREE.Mesh(geometry, material);
  state.scene.add(volumeText);
  state.setVolumeText(volumeText);

  setTimeout(() => {
    if (state.volumeText) {
      state.scene.remove(state.volumeText);
      state.volumeText.geometry.dispose();
      state.volumeText.material.dispose();
      state.volumeText.material.map.dispose();
      state.setVolumeText(null);
    }
  }, 3000);
}

// 音量オンオフ表示の位置を更新
export function updateVolumeText() {
  if (state.volumeText) {
    const cameraPos = new THREE.Vector3();
    state.camera.getWorldPosition(cameraPos);

    const forward = new THREE.Vector3(0, 0, -1).applyQuaternion(state.camera.quaternion);
    const right = new THREE.Vector3(1, 0, 0).applyQuaternion(state.camera.quaternion);
    const down = new THREE.Vector3(0, -1, 0).applyQuaternion(state.camera.quaternion);

    const textPos = cameraPos.clone()
      .add(forward.multiplyScalar(0.5))
      .add(right.multiplyScalar(0.2))
      .add(down.multiplyScalar(0.25));

    state.volumeText.position.copy(textPos);
    state.volumeText.lookAt(state.camera.position);
  }
}

// 当たり判定オンオフ表示を作成
export function createCollisionText(isOn) {
  if (state.collisionText) {
    state.scene.remove(state.collisionText);
    state.collisionText.geometry.dispose();
    state.collisionText.material.dispose();
    state.collisionText.material.map.dispose();
    state.setCollisionText(null);
  }

  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 128;
  const context = canvas.getContext('2d');

  context.fillStyle = '#00ff00';
  context.font = 'bold 60px Arial';
  context.textAlign = 'center';
  context.textBaseline = 'middle';
  const text = isOn ? 'Collision On' : 'Collision Off';
  context.fillText(text, canvas.width / 2, canvas.height / 2);

  const texture = new THREE.CanvasTexture(canvas);
  const geometry = new THREE.PlaneGeometry(0.2, 0.05);
  const material = new THREE.MeshBasicMaterial({
    map: texture,
    transparent: true,
    side: THREE.DoubleSide
  });

  const collisionText = new THREE.Mesh(geometry, material);
  state.scene.add(collisionText);
  state.setCollisionText(collisionText);

  setTimeout(() => {
    if (state.collisionText) {
      state.scene.remove(state.collisionText);
      state.collisionText.geometry.dispose();
      state.collisionText.material.dispose();
      state.collisionText.material.map.dispose();
      state.setCollisionText(null);
    }
  }, 3000);
}

// 当たり判定オンオフ表示の位置を更新
export function updateCollisionText() {
  if (state.collisionText) {
    const cameraPos = new THREE.Vector3();
    state.camera.getWorldPosition(cameraPos);

    const forward = new THREE.Vector3(0, 0, -1).applyQuaternion(state.camera.quaternion);
    const left = new THREE.Vector3(-1, 0, 0).applyQuaternion(state.camera.quaternion);
    const down = new THREE.Vector3(0, -1, 0).applyQuaternion(state.camera.quaternion);

    const textPos = cameraPos.clone()
      .add(forward.multiplyScalar(0.5))
      .add(left.multiplyScalar(0.2))
      .add(down.multiplyScalar(0.25));

    state.collisionText.position.copy(textPos);
    state.collisionText.lookAt(state.camera.position);
  }
}

// トラッキングロスト表示を作成
export function createTrackingLostText() {
  if (state.trackingLostText) {
    state.scene.remove(state.trackingLostText);
    state.trackingLostText.geometry.dispose();
    state.trackingLostText.material.dispose();
    state.trackingLostText.material.map.dispose();
    state.setTrackingLostText(null);
  }

  let message = '';
  if (!state.isLeftControllerTracked && !state.isRightControllerTracked) {
    message = 'Controllers Tracking Lost';
  } else if (!state.isLeftControllerTracked) {
    message = 'Left Controller Tracking Lost';
  } else if (!state.isRightControllerTracked) {
    message = 'Right Controller Tracking Lost';
  } else {
    return;
  }

  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 128;
  const context = canvas.getContext('2d');

  context.fillStyle = '#ff0000';
  context.font = 'bold 60px Arial';
  context.textAlign = 'center';
  context.textBaseline = 'middle';
  context.fillText(message, canvas.width / 2, canvas.height / 2);

  const texture = new THREE.CanvasTexture(canvas);
  const geometry = new THREE.PlaneGeometry(0.4, 0.05);
  const material = new THREE.MeshBasicMaterial({
    map: texture,
    transparent: true,
    side: THREE.DoubleSide
  });

  const trackingLostText = new THREE.Mesh(geometry, material);
  state.scene.add(trackingLostText);
  state.setTrackingLostText(trackingLostText);
}

// トラッキングロスト表示を削除
export function removeTrackingLostText() {
  if (state.trackingLostText) {
    state.scene.remove(state.trackingLostText);
    state.trackingLostText.geometry.dispose();
    state.trackingLostText.material.dispose();
    state.trackingLostText.material.map.dispose();
    state.setTrackingLostText(null);
  }
}

// トラッキングロスト表示の位置を更新
export function updateTrackingLostText() {
  if (state.trackingLostText) {
    const cameraPos = new THREE.Vector3();
    state.camera.getWorldPosition(cameraPos);

    const forward = new THREE.Vector3(0, 0, -1).applyQuaternion(state.camera.quaternion);
    const down = new THREE.Vector3(0, -1, 0).applyQuaternion(state.camera.quaternion);

    const textPos = cameraPos.clone()
      .add(forward.multiplyScalar(0.5))
      .add(down.multiplyScalar(0.3));

    state.trackingLostText.position.copy(textPos);
    state.trackingLostText.lookAt(state.camera.position);
  }
}

// シーケンス状態表示を作成
export function createSequenceStatusText(message) {
  if (state.sequenceStatusText) {
    state.scene.remove(state.sequenceStatusText);
    state.sequenceStatusText.geometry.dispose();
    state.sequenceStatusText.material.dispose();
    state.sequenceStatusText.material.map.dispose();
    state.setSequenceStatusText(null);
  }

  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');

  context.font = 'bold 60px Arial';
  const metrics = context.measureText(message);
  const textWidth = metrics.width;
  const textHeight = 60;

  const padding = 10;
  canvas.width = textWidth + padding * 2;
  canvas.height = textHeight + padding * 2;

  context.font = 'bold 60px Arial';
  context.fillStyle = '#00ff00';
  context.textAlign = 'center';
  context.textBaseline = 'middle';
  context.fillText(message, canvas.width / 2, canvas.height / 2);

  const texture = new THREE.CanvasTexture(canvas);
  const aspectRatio = canvas.width / canvas.height;
  const planeHeight = 0.05;
  const planeWidth = planeHeight * aspectRatio;
  const geometry = new THREE.PlaneGeometry(planeWidth, planeHeight);
  const material = new THREE.MeshBasicMaterial({
    map: texture,
    transparent: true,
    side: THREE.DoubleSide
  });

  const sequenceStatusText = new THREE.Mesh(geometry, material);
  state.scene.add(sequenceStatusText);
  state.setSequenceStatusText(sequenceStatusText);
}

// シーケンス状態表示を削除
export function removeSequenceStatusText() {
  if (state.sequenceStatusText) {
    state.scene.remove(state.sequenceStatusText);
    state.sequenceStatusText.geometry.dispose();
    state.sequenceStatusText.material.dispose();
    state.sequenceStatusText.material.map.dispose();
    state.setSequenceStatusText(null);
  }
}

// シーケンス状態表示の位置を更新
export function updateSequenceStatusText() {
  if (state.sequenceStatusText) {
    const cameraPos = new THREE.Vector3();
    state.camera.getWorldPosition(cameraPos);

    const forward = new THREE.Vector3(0, 0, -1).applyQuaternion(state.camera.quaternion);
    const down = new THREE.Vector3(0, -1, 0).applyQuaternion(state.camera.quaternion);

    const textPos = cameraPos.clone()
      .add(forward.multiplyScalar(0.5))
      .add(down.multiplyScalar(0.2));

    state.sequenceStatusText.position.copy(textPos);
    state.sequenceStatusText.lookAt(state.camera.position);
  }
}

// コントローラーガイドメニュー用のキャンバスとテクスチャを保持
let guideMenuCanvas = null;
let guideMenuTexture = null;

// コントローラーガイドメニューを作成
export function createControllerGuideMenu() {
  if (state.controllerGuideMenu) {
    state.scene.remove(state.controllerGuideMenu);
    state.controllerGuideMenu.traverse((child) => {
      if (child.geometry) child.geometry.dispose();
      if (child.material) {
        if (child.material.map) child.material.map.dispose();
        child.material.dispose();
      }
    });
    state.setControllerGuideMenu(null);
  }

  // キャンバスでメニュー全体を描画
  guideMenuCanvas = document.createElement('canvas');
  guideMenuCanvas.width = 800;
  guideMenuCanvas.height = 900;
  const canvas = guideMenuCanvas;
  const ctx = canvas.getContext('2d');

  // 背景（グラデーション風の暗い色）
  ctx.fillStyle = 'rgba(10, 10, 26, 0.95)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // 枠線（シアン）
  ctx.strokeStyle = 'rgba(0, 200, 255, 0.5)';
  ctx.lineWidth = 4;
  ctx.strokeRect(2, 2, canvas.width - 4, canvas.height - 4);

  // 内側の光彩効果
  const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  gradient.addColorStop(0, 'rgba(0, 200, 255, 0.1)');
  gradient.addColorStop(0.5, 'rgba(255, 107, 107, 0.05)');
  gradient.addColorStop(1, 'rgba(0, 200, 255, 0.1)');
  ctx.fillStyle = gradient;
  ctx.fillRect(4, 4, canvas.width - 8, canvas.height - 8);

  // タイトル
  ctx.font = 'bold 48px Orbitron, Arial';
  ctx.fillStyle = '#00c8ff';
  ctx.textAlign = 'center';
  ctx.shadowColor = 'rgba(0, 200, 255, 0.8)';
  ctx.shadowBlur = 20;
  ctx.fillText('CONTROLLER GUIDE', canvas.width / 2, 60);
  ctx.shadowBlur = 0;

  // 区切り線
  ctx.strokeStyle = 'rgba(0, 200, 255, 0.3)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(50, 90);
  ctx.lineTo(canvas.width - 50, 90);
  ctx.stroke();

  // 左コントローラーセクション
  const leftX = 200;
  let y = 140;

  // 左コントローラータイトル（アイコン風の背景付き）
  const iconGradient = ctx.createLinearGradient(leftX - 120, y, leftX + 120, y + 30);
  iconGradient.addColorStop(0, '#00c8ff');
  iconGradient.addColorStop(1, '#ff6b6b');
  ctx.fillStyle = iconGradient;
  ctx.beginPath();
  ctx.roundRect(leftX - 100, y - 5, 200, 35, 8);
  ctx.fill();

  ctx.font = 'bold 24px Orbitron, Arial';
  ctx.fillStyle = '#0a0a1a';
  ctx.textAlign = 'center';
  ctx.fillText('左コントローラー', leftX, y + 20);

  y += 55;

  // 左コントローラーの操作一覧
  const leftControls = [
    { button: 'スティック↑↓', desc: '前進 / 後退' },
    { button: 'スティック←→', desc: '左旋回 / 右旋回' },
    { button: 'Y ボタン', desc: '起動 / 終了' },
    { button: 'X ボタン', desc: '設定ウィンドウ' },
    { button: 'スティック押込', desc: '衝突 ON/OFF' },
    { button: 'トリガー', desc: '速度ダウン' },
    { button: 'グリップ', desc: 'ドローンを掴む' }
  ];

  leftControls.forEach((item) => {
    // ボタンラベルの背景
    const btnGradient = ctx.createLinearGradient(leftX - 95, y, leftX + 35, y);
    btnGradient.addColorStop(0, 'rgba(0, 200, 255, 0.2)');
    btnGradient.addColorStop(1, 'rgba(255, 107, 107, 0.2)');
    ctx.fillStyle = btnGradient;
    ctx.beginPath();
    ctx.roundRect(leftX - 95, y - 2, 130, 28, 6);
    ctx.fill();
    ctx.strokeStyle = 'rgba(0, 200, 255, 0.5)';
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.font = 'bold 18px Arial';
    ctx.fillStyle = '#00c8ff';
    ctx.textAlign = 'center';
    ctx.fillText(item.button, leftX - 30, y + 18);

    ctx.font = '18px Arial';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
    ctx.textAlign = 'left';
    ctx.fillText(item.desc, leftX + 45, y + 18);

    y += 38;
  });

  // 右コントローラーセクション
  const rightX = 600;
  y = 140;

  // 右コントローラータイトル
  const rightIconGradient = ctx.createLinearGradient(rightX - 120, y, rightX + 120, y + 30);
  rightIconGradient.addColorStop(0, '#00c8ff');
  rightIconGradient.addColorStop(1, '#ff6b6b');
  ctx.fillStyle = rightIconGradient;
  ctx.beginPath();
  ctx.roundRect(rightX - 100, y - 5, 200, 35, 8);
  ctx.fill();

  ctx.font = 'bold 24px Orbitron, Arial';
  ctx.fillStyle = '#0a0a1a';
  ctx.textAlign = 'center';
  ctx.fillText('右コントローラー', rightX, y + 20);

  y += 55;

  // 右コントローラーの操作一覧
  const rightControls = [
    { button: 'スティック↑↓', desc: '上昇 / 下降' },
    { button: 'スティック←→', desc: '左移動 / 右移動' },
    { button: 'A ボタン', desc: 'このメニュー' },
    { button: 'スティック押込', desc: '音量 ON/OFF' },
    { button: 'B ボタン', desc: '自動帰還' },
    { button: 'トリガー', desc: '速度アップ' },
    { button: 'グリップ', desc: 'ドローンを掴む' }
  ];

  rightControls.forEach((item) => {
    // ボタンラベルの背景
    const btnGradient = ctx.createLinearGradient(rightX - 95, y, rightX + 35, y);
    btnGradient.addColorStop(0, 'rgba(0, 200, 255, 0.2)');
    btnGradient.addColorStop(1, 'rgba(255, 107, 107, 0.2)');
    ctx.fillStyle = btnGradient;
    ctx.beginPath();
    ctx.roundRect(rightX - 95, y - 2, 130, 28, 6);
    ctx.fill();
    ctx.strokeStyle = 'rgba(0, 200, 255, 0.5)';
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.font = 'bold 18px Arial';
    ctx.fillStyle = '#00c8ff';
    ctx.textAlign = 'center';
    ctx.fillText(item.button, rightX - 30, y + 18);

    ctx.font = '18px Arial';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
    ctx.textAlign = 'left';
    ctx.fillText(item.desc, rightX + 45, y + 18);

    y += 38;
  });

  // ハンドトラッキング情報
  ctx.fillStyle = 'rgba(0, 255, 150, 0.1)';
  ctx.strokeStyle = 'rgba(0, 255, 150, 0.3)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.roundRect(50, 520, canvas.width - 100, 80, 12);
  ctx.fill();
  ctx.stroke();

  ctx.font = 'bold 22px Orbitron, Arial';
  ctx.fillStyle = '#00ff96';
  ctx.textAlign = 'center';
  ctx.fillText('ハンドトラッキング対応', canvas.width / 2, 555);

  ctx.font = '18px Rajdhani, Arial';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
  ctx.fillText('ピンチジェスチャーでドローンを掴んで移動・スケール変更', canvas.width / 2, 585);

  // 両グリップ操作
  ctx.fillStyle = 'rgba(255, 200, 0, 0.1)';
  ctx.strokeStyle = 'rgba(255, 200, 0, 0.3)';
  ctx.beginPath();
  ctx.roundRect(50, 620, canvas.width - 100, 60, 12);
  ctx.fill();
  ctx.stroke();

  ctx.font = 'bold 20px Orbitron, Arial';
  ctx.fillStyle = '#ffc800';
  ctx.fillText('両グリップ同時押し: ドローンサイズ変更', canvas.width / 2, 660);

  // 区切り線
  ctx.strokeStyle = 'rgba(0, 200, 255, 0.3)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(50, 710);
  ctx.lineTo(canvas.width - 50, 710);
  ctx.stroke();

  // 閉じる説明
  ctx.font = 'bold 28px Orbitron, Arial';
  ctx.fillStyle = '#ffff00';
  ctx.shadowColor = 'rgba(255, 255, 0, 0.5)';
  ctx.shadowBlur = 10;
  ctx.fillText('A ボタンで閉じる', canvas.width / 2, 760);
  ctx.shadowBlur = 0;

  // フッター
  ctx.font = '16px Rajdhani, Arial';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
  ctx.fillText('Quest 3 / Quest Pro 対応 | WebXR Immersive Experience', canvas.width / 2, 800);

  // テクスチャ作成
  guideMenuTexture = new THREE.CanvasTexture(canvas);
  guideMenuTexture.needsUpdate = true;

  // メッシュ作成
  const aspectRatio = canvas.width / canvas.height;
  const menuHeight = 0.4;
  const menuWidth = menuHeight * aspectRatio;
  const geometry = new THREE.PlaneGeometry(menuWidth, menuHeight);
  const material = new THREE.MeshBasicMaterial({
    map: guideMenuTexture,
    transparent: true,
    side: THREE.DoubleSide
  });

  const menuMesh = new THREE.Mesh(geometry, material);
  state.scene.add(menuMesh);
  state.setControllerGuideMenu(menuMesh);
  state.setIsControllerGuideVisible(true);
}

// コントローラーガイドメニューを再描画（ボタン状態を反映）
export function redrawControllerGuideMenu(pressedButtons) {
  if (!guideMenuCanvas || !guideMenuTexture) return;

  const canvas = guideMenuCanvas;
  const ctx = canvas.getContext('2d');

  // 背景（グラデーション風の暗い色）
  ctx.fillStyle = 'rgba(10, 10, 26, 0.95)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // 枠線（シアン）
  ctx.strokeStyle = 'rgba(0, 200, 255, 0.5)';
  ctx.lineWidth = 4;
  ctx.strokeRect(2, 2, canvas.width - 4, canvas.height - 4);

  // 内側の光彩効果
  const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  gradient.addColorStop(0, 'rgba(0, 200, 255, 0.1)');
  gradient.addColorStop(0.5, 'rgba(255, 107, 107, 0.05)');
  gradient.addColorStop(1, 'rgba(0, 200, 255, 0.1)');
  ctx.fillStyle = gradient;
  ctx.fillRect(4, 4, canvas.width - 8, canvas.height - 8);

  // タイトル
  ctx.font = 'bold 48px Arial';
  ctx.fillStyle = '#00c8ff';
  ctx.textAlign = 'center';
  ctx.shadowColor = 'rgba(0, 200, 255, 0.8)';
  ctx.shadowBlur = 20;
  ctx.fillText('CONTROLLER GUIDE', canvas.width / 2, 60);
  ctx.shadowBlur = 0;

  // 区切り線
  ctx.strokeStyle = 'rgba(0, 200, 255, 0.3)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(50, 90);
  ctx.lineTo(canvas.width - 50, 90);
  ctx.stroke();


  // 左コントローラーセクション
  const leftX = 200;
  let y = 140;

  // 左コントローラータイトル
  const iconGradient = ctx.createLinearGradient(leftX - 120, y, leftX + 120, y + 30);
  iconGradient.addColorStop(0, '#00c8ff');
  iconGradient.addColorStop(1, '#ff6b6b');
  ctx.fillStyle = iconGradient;
  ctx.beginPath();
  ctx.roundRect(leftX - 100, y - 5, 200, 35, 8);
  ctx.fill();

  ctx.font = 'bold 24px Arial';
  ctx.fillStyle = '#0a0a1a';
  ctx.textAlign = 'center';
  ctx.fillText('左コントローラー', leftX, y + 20);

  y += 55;

  // 左コントローラーの操作一覧
  const leftControls = [
    { button: 'スティック↑↓', desc: '前進 / 後退', key: 'leftStickY' },
    { button: 'スティック←→', desc: '左旋回 / 右旋回', key: 'leftStickX' },
    { button: 'Y ボタン', desc: '起動 / 終了', key: 'leftX' },
    { button: 'X ボタン', desc: '設定ウィンドウ', key: 'leftY' },
    { button: 'スティック押込', desc: '衝突 ON/OFF', key: 'leftStickPress' },
    { button: 'トリガー', desc: '速度ダウン', key: 'leftTrigger' },
    { button: 'グリップ', desc: 'ドローンを掴む', key: 'leftGrip' }
  ];

  leftControls.forEach((item) => {
    const isPressed = pressedButtons[item.key];

    // ボタンラベルの背景
    if (isPressed) {
      ctx.fillStyle = 'rgba(255, 255, 0, 0.6)';
    } else {
      const btnGradient = ctx.createLinearGradient(leftX - 95, y, leftX + 35, y);
      btnGradient.addColorStop(0, 'rgba(0, 200, 255, 0.2)');
      btnGradient.addColorStop(1, 'rgba(255, 107, 107, 0.2)');
      ctx.fillStyle = btnGradient;
    }
    ctx.beginPath();
    ctx.roundRect(leftX - 95, y - 2, 130, 28, 6);
    ctx.fill();
    ctx.strokeStyle = isPressed ? 'rgba(255, 255, 0, 0.9)' : 'rgba(0, 200, 255, 0.5)';
    ctx.lineWidth = isPressed ? 2 : 1;
    ctx.stroke();

    ctx.font = 'bold 18px Arial';
    ctx.fillStyle = isPressed ? '#000000' : '#00c8ff';
    ctx.textAlign = 'center';
    ctx.fillText(item.button, leftX - 30, y + 18);

    ctx.font = '18px Arial';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
    ctx.textAlign = 'left';
    ctx.fillText(item.desc, leftX + 45, y + 18);

    y += 38;
  });

  // 右コントローラーセクション
  const rightX = 600;
  y = 140;

  // 右コントローラータイトル
  const rightIconGradient = ctx.createLinearGradient(rightX - 120, y, rightX + 120, y + 30);
  rightIconGradient.addColorStop(0, '#00c8ff');
  rightIconGradient.addColorStop(1, '#ff6b6b');
  ctx.fillStyle = rightIconGradient;
  ctx.beginPath();
  ctx.roundRect(rightX - 100, y - 5, 200, 35, 8);
  ctx.fill();

  ctx.font = 'bold 24px Arial';
  ctx.fillStyle = '#0a0a1a';
  ctx.textAlign = 'center';
  ctx.fillText('右コントローラー', rightX, y + 20);

  y += 55;

  // 右コントローラーの操作一覧
  const rightControls = [
    { button: 'スティック↑↓', desc: '上昇 / 下降', key: 'rightStickY' },
    { button: 'スティック←→', desc: '左移動 / 右移動', key: 'rightStickX' },
    { button: 'A ボタン', desc: 'このメニュー', key: 'rightA' },
    { button: 'スティック押込', desc: '音量 ON/OFF', key: 'rightStickPress' },
    { button: 'B ボタン', desc: '自動帰還', key: 'rightB' },
    { button: 'トリガー', desc: '速度アップ', key: 'rightTrigger' },
    { button: 'グリップ', desc: 'ドローンを掴む', key: 'rightGrip' }
  ];

  rightControls.forEach((item) => {
    const isPressed = pressedButtons[item.key];

    // ボタンラベルの背景
    if (isPressed) {
      ctx.fillStyle = 'rgba(255, 255, 0, 0.6)';
    } else {
      const btnGradient = ctx.createLinearGradient(rightX - 95, y, rightX + 35, y);
      btnGradient.addColorStop(0, 'rgba(0, 200, 255, 0.2)');
      btnGradient.addColorStop(1, 'rgba(255, 107, 107, 0.2)');
      ctx.fillStyle = btnGradient;
    }
    ctx.beginPath();
    ctx.roundRect(rightX - 95, y - 2, 130, 28, 6);
    ctx.fill();
    ctx.strokeStyle = isPressed ? 'rgba(255, 255, 0, 0.9)' : 'rgba(0, 200, 255, 0.5)';
    ctx.lineWidth = isPressed ? 2 : 1;
    ctx.stroke();

    ctx.font = 'bold 18px Arial';
    ctx.fillStyle = isPressed ? '#000000' : '#00c8ff';
    ctx.textAlign = 'center';
    ctx.fillText(item.button, rightX - 30, y + 18);

    ctx.font = '18px Arial';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
    ctx.textAlign = 'left';
    ctx.fillText(item.desc, rightX + 45, y + 18);

    y += 38;
  });

  // 両グリップ操作（先に表示）
  const bothGripsPressed = pressedButtons.leftGrip && pressedButtons.rightGrip;

  ctx.fillStyle = bothGripsPressed ? 'rgba(255, 255, 0, 0.4)' : 'rgba(255, 200, 0, 0.1)';
  ctx.strokeStyle = bothGripsPressed ? 'rgba(255, 255, 0, 0.9)' : 'rgba(255, 200, 0, 0.3)';
  ctx.lineWidth = bothGripsPressed ? 3 : 2;
  ctx.beginPath();
  ctx.roundRect(50, 520, canvas.width - 100, 60, 12);
  ctx.fill();
  ctx.stroke();

  ctx.font = 'bold 20px Arial';
  ctx.fillStyle = bothGripsPressed ? '#000000' : '#ffc800';
  ctx.textAlign = 'center';
  ctx.fillText('両グリップ同時押し: ドローンサイズ変更', canvas.width / 2, 558);

  // ハンドトラッキング情報
  ctx.fillStyle = 'rgba(0, 255, 150, 0.1)';
  ctx.strokeStyle = 'rgba(0, 255, 150, 0.3)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.roundRect(50, 600, canvas.width - 100, 80, 12);
  ctx.fill();
  ctx.stroke();

  ctx.font = 'bold 22px Arial';
  ctx.fillStyle = '#00ff96';
  ctx.textAlign = 'center';
  ctx.fillText('ハンドトラッキング対応', canvas.width / 2, 635);

  ctx.font = '18px Arial';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
  ctx.fillText('ピンチジェスチャーでドローンを掴んで移動・スケール変更', canvas.width / 2, 665);

  // 区切り線
  ctx.strokeStyle = 'rgba(0, 200, 255, 0.3)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(50, 710);
  ctx.lineTo(canvas.width - 50, 710);
  ctx.stroke();

  // 閉じる説明
  ctx.font = 'bold 28px Arial';
  ctx.fillStyle = '#ffff00';
  ctx.shadowColor = 'rgba(255, 255, 0, 0.5)';
  ctx.shadowBlur = 10;
  ctx.fillText('A ボタンで閉じる', canvas.width / 2, 760);
  ctx.shadowBlur = 0;

  // フッター
  ctx.font = '16px Arial';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
  ctx.fillText('Quest 3 / Quest Pro 対応 | WebXR Immersive Experience', canvas.width / 2, 800);

  // テクスチャを更新
  guideMenuTexture.needsUpdate = true;
}

// コントローラーガイドメニューを削除
export function removeControllerGuideMenu() {
  if (state.controllerGuideMenu) {
    state.scene.remove(state.controllerGuideMenu);
    state.controllerGuideMenu.traverse((child) => {
      if (child.geometry) child.geometry.dispose();
      if (child.material) {
        if (child.material.map) child.material.map.dispose();
        child.material.dispose();
      }
    });
    state.setControllerGuideMenu(null);
    state.setIsControllerGuideVisible(false);
  }
}

// コントローラーガイドメニューをトグル
export function toggleControllerGuideMenu() {
  if (state.isControllerGuideVisible) {
    removeControllerGuideMenu();
  } else {
    createControllerGuideMenu();
  }
}

// 設定メニュー用のキャンバスとテクスチャを保持
let settingsMenuCanvas = null;
let settingsMenuTexture = null;
let settingsMenuWidth = 0;
let settingsMenuHeight = 0;

// ボタンの当たり判定領域を保存
let settingsButtonAreas = [];

// 設定項目の定義
const settingsItems = [
  {
    name: 'デッドゾーン',
    description: 'スティック入力の無効範囲',
    key: 'deadzone',
    type: 'value',
    getValue: () => state.stickDeadzone,
    setValue: (v) => state.setStickDeadzone(v),
    defaultValue: 0.15,
    min: 0.05,
    max: 0.35,
    step: 0.05,
    format: (v) => (v * 100).toFixed(0) + '%'
  },
  {
    name: '加速度',
    description: 'ドローンの加速の強さ',
    key: 'acceleration',
    type: 'value',
    getValue: () => state.acceleration,
    setValue: (v) => state.setAcceleration(v),
    defaultValue: 0.001,
    min: 0.0005,
    max: 0.003,
    step: 0.0005,
    format: (v) => (v * 1000).toFixed(1)
  },
  {
    name: '摩擦',
    description: '高いほど滑らかに止まる',
    key: 'friction',
    type: 'value',
    getValue: () => state.friction,
    setValue: (v) => {
      state.setFriction(v);
      state.setAngularFriction(v);
    },
    defaultValue: 0.965,
    min: 0.90,
    max: 0.99,
    step: 0.01,
    format: (v) => v.toFixed(2)
  },
  {
    name: '傾き量',
    description: '移動時のドローンの傾き',
    key: 'tilt',
    type: 'value',
    getValue: () => state.tiltAmount,
    setValue: (v) => state.setTiltAmount(v),
    defaultValue: 0.6,
    min: 0.0,
    max: 1.0,
    step: 0.1,
    format: (v) => v.toFixed(1)
  },
];

// 設定メニューを作成
export function createSettingsMenu() {
  if (state.settingsMenu) {
    state.scene.remove(state.settingsMenu);
    state.settingsMenu.traverse((child) => {
      if (child.geometry) child.geometry.dispose();
      if (child.material) {
        if (child.material.map) child.material.map.dispose();
        child.material.dispose();
      }
    });
    state.setSettingsMenu(null);
  }

  settingsMenuCanvas = document.createElement('canvas');
  settingsMenuCanvas.width = 700;
  settingsMenuCanvas.height = 550;

  redrawSettingsMenu(null);

  settingsMenuTexture = new THREE.CanvasTexture(settingsMenuCanvas);
  settingsMenuTexture.needsUpdate = true;

  const aspectRatio = settingsMenuCanvas.width / settingsMenuCanvas.height;
  const menuHeight = 0.35;
  const menuWidth = menuHeight * aspectRatio;
  settingsMenuWidth = menuWidth;
  settingsMenuHeight = menuHeight;
  const geometry = new THREE.PlaneGeometry(menuWidth, menuHeight);
  const material = new THREE.MeshBasicMaterial({
    map: settingsMenuTexture,
    transparent: true,
    side: THREE.DoubleSide
  });

  const menuMesh = new THREE.Mesh(geometry, material);
  state.scene.add(menuMesh);
  state.setSettingsMenu(menuMesh);
  state.setIsSettingsMenuVisible(true);
  state.setSettingsMenuSelectedIndex(0);

  // レーザーライン作成
  createSettingsLaser();
}

// 設定メニューを再描画
export function redrawSettingsMenu(hoveredButton) {
  if (!settingsMenuCanvas) return;

  const canvas = settingsMenuCanvas;
  const ctx = canvas.getContext('2d');

  // ボタン領域をクリア
  settingsButtonAreas = [];

  // 背景
  ctx.fillStyle = 'rgba(10, 10, 26, 0.95)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // 枠線
  ctx.strokeStyle = 'rgba(0, 200, 255, 0.5)';
  ctx.lineWidth = 4;
  ctx.strokeRect(2, 2, canvas.width - 4, canvas.height - 4);

  // 内側の光彩効果
  const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  gradient.addColorStop(0, 'rgba(0, 200, 255, 0.1)');
  gradient.addColorStop(0.5, 'rgba(255, 107, 107, 0.05)');
  gradient.addColorStop(1, 'rgba(0, 200, 255, 0.1)');
  ctx.fillStyle = gradient;
  ctx.fillRect(4, 4, canvas.width - 8, canvas.height - 8);

  // タイトル
  ctx.font = 'bold 36px Arial';
  ctx.fillStyle = '#00c8ff';
  ctx.textAlign = 'center';
  ctx.shadowColor = 'rgba(0, 200, 255, 0.8)';
  ctx.shadowBlur = 15;
  ctx.fillText('SETTINGS', canvas.width / 2, 50);
  ctx.shadowBlur = 0;

  // 区切り線
  ctx.strokeStyle = 'rgba(0, 200, 255, 0.3)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(40, 70);
  ctx.lineTo(canvas.width - 40, 70);
  ctx.stroke();

  // 設定項目
  let y = 110;
  const itemHeight = 100;

  settingsItems.forEach((item, index) => {
    const value = item.getValue();

    // 項目の背景
    ctx.fillStyle = 'rgba(30, 30, 50, 0.5)';
    ctx.beginPath();
    ctx.roundRect(25, y - 10, canvas.width - 50, itemHeight - 10, 8);
    ctx.fill();

    // 項目名
    ctx.font = 'bold 22px Arial';
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'left';
    ctx.fillText(item.name, 40, y + 20);

    // 説明文
    ctx.font = '14px Arial';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.fillText(item.description, 40, y + 42);

    // 値表示エリア
    const displayValue = item.format ? item.format(value) : value.toString();

    // 左矢印ボタン
    const leftBtnX = 320;
    const leftBtnY = y + 5;
    const btnSize = 50;
    const isLeftHovered = hoveredButton && hoveredButton.index === index && hoveredButton.type === 'left';

    ctx.fillStyle = isLeftHovered ? 'rgba(255, 255, 0, 0.8)' : 'rgba(0, 200, 255, 0.3)';
    ctx.beginPath();
    ctx.roundRect(leftBtnX, leftBtnY, btnSize, btnSize, 6);
    ctx.fill();
    ctx.strokeStyle = isLeftHovered ? '#ffff00' : 'rgba(0, 200, 255, 0.6)';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.font = 'bold 28px Arial';
    ctx.fillStyle = isLeftHovered ? '#000000' : '#00c8ff';
    ctx.textAlign = 'center';
    ctx.fillText('◀', leftBtnX + btnSize / 2, leftBtnY + btnSize / 2 + 8);

    settingsButtonAreas.push({
      x: leftBtnX, y: leftBtnY, w: btnSize, h: btnSize,
      index: index, type: 'left'
    });

    // 値
    ctx.font = 'bold 22px Arial';
    ctx.fillStyle = '#00c8ff';
    ctx.textAlign = 'center';
    ctx.fillText(displayValue, 440, y + 40);

    // 右矢印ボタン
    const rightBtnX = 510;
    const rightBtnY = y + 5;
    const isRightHovered = hoveredButton && hoveredButton.index === index && hoveredButton.type === 'right';

    ctx.fillStyle = isRightHovered ? 'rgba(255, 255, 0, 0.8)' : 'rgba(0, 200, 255, 0.3)';
    ctx.beginPath();
    ctx.roundRect(rightBtnX, rightBtnY, btnSize, btnSize, 6);
    ctx.fill();
    ctx.strokeStyle = isRightHovered ? '#ffff00' : 'rgba(0, 200, 255, 0.6)';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.font = 'bold 28px Arial';
    ctx.fillStyle = isRightHovered ? '#000000' : '#00c8ff';
    ctx.textAlign = 'center';
    ctx.fillText('▶', rightBtnX + btnSize / 2, rightBtnY + btnSize / 2 + 8);

    settingsButtonAreas.push({
      x: rightBtnX, y: rightBtnY, w: btnSize, h: btnSize,
      index: index, type: 'right'
    });

    // デフォルトボタン
    const defaultBtnX = 580;
    const defaultBtnY = y + 5;
    const defaultBtnW = 80;
    const isDefaultHovered = hoveredButton && hoveredButton.index === index && hoveredButton.type === 'default';
    const isDefault = Math.abs(value - item.defaultValue) < 0.0001;

    ctx.fillStyle = isDefaultHovered ? 'rgba(255, 107, 107, 0.8)' : (isDefault ? 'rgba(100, 100, 100, 0.3)' : 'rgba(255, 107, 107, 0.3)');
    ctx.beginPath();
    ctx.roundRect(defaultBtnX, defaultBtnY, defaultBtnW, btnSize, 6);
    ctx.fill();
    ctx.strokeStyle = isDefaultHovered ? '#ff6b6b' : (isDefault ? 'rgba(100, 100, 100, 0.5)' : 'rgba(255, 107, 107, 0.6)');
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.font = 'bold 14px Arial';
    ctx.fillStyle = isDefaultHovered ? '#000000' : (isDefault ? 'rgba(255, 255, 255, 0.3)' : '#ff6b6b');
    ctx.textAlign = 'center';
    ctx.fillText('DEFAULT', defaultBtnX + defaultBtnW / 2, defaultBtnY + btnSize / 2 + 5);

    settingsButtonAreas.push({
      x: defaultBtnX, y: defaultBtnY, w: defaultBtnW, h: btnSize,
      index: index, type: 'default'
    });

    y += itemHeight;
  });

  // 操作説明
  ctx.strokeStyle = 'rgba(0, 200, 255, 0.3)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(40, canvas.height - 80);
  ctx.lineTo(canvas.width - 40, canvas.height - 80);
  ctx.stroke();

  ctx.font = '16px Arial';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
  ctx.textAlign = 'center';
  ctx.fillText('右コントローラーのレーザーで操作', canvas.width / 2, canvas.height - 50);

  // 閉じる説明
  ctx.font = 'bold 22px Arial';
  ctx.fillStyle = '#ffff00';
  ctx.shadowColor = 'rgba(255, 255, 0, 0.5)';
  ctx.shadowBlur = 10;
  ctx.fillText('X ボタンで閉じる', canvas.width / 2, canvas.height - 20);
  ctx.shadowBlur = 0;

  if (settingsMenuTexture) {
    settingsMenuTexture.needsUpdate = true;
  }
}

// 設定メニューを削除
export function removeSettingsMenu() {
  if (state.settingsMenu) {
    state.scene.remove(state.settingsMenu);
    state.settingsMenu.traverse((child) => {
      if (child.geometry) child.geometry.dispose();
      if (child.material) {
        if (child.material.map) child.material.map.dispose();
        child.material.dispose();
      }
    });
    state.setSettingsMenu(null);
    state.setIsSettingsMenuVisible(false);
    settingsMenuCanvas = null;
    settingsMenuTexture = null;
    settingsButtonAreas = [];
  }

  // レーザーも削除
  removeSettingsLaser();
}

// 設定メニューをトグル
export function toggleSettingsMenu() {
  if (state.isSettingsMenuVisible) {
    removeSettingsMenu();
  } else {
    createSettingsMenu();
  }
}

// レーザーを作成
function createSettingsLaser() {
  // レーザーライン
  const lineMaterial = new THREE.LineBasicMaterial({
    color: 0x00ffff,
    linewidth: 2,
    transparent: true,
    opacity: 0.8
  });
  const lineGeometry = new THREE.BufferGeometry();
  const positions = new Float32Array(6);
  lineGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const laserLine = new THREE.Line(lineGeometry, lineMaterial);
  state.scene.add(laserLine);
  state.setSettingsLaserLine(laserLine);

  // レーザードット
  const dotGeometry = new THREE.SphereGeometry(0.005, 8, 8);
  const dotMaterial = new THREE.MeshBasicMaterial({
    color: 0xffff00,
    transparent: true,
    opacity: 0.9
  });
  const laserDot = new THREE.Mesh(dotGeometry, dotMaterial);
  laserDot.visible = false;
  state.scene.add(laserDot);
  state.setSettingsLaserDot(laserDot);
}

// レーザーを削除
function removeSettingsLaser() {
  if (state.settingsLaserLine) {
    state.scene.remove(state.settingsLaserLine);
    state.settingsLaserLine.geometry.dispose();
    state.settingsLaserLine.material.dispose();
    state.setSettingsLaserLine(null);
  }
  if (state.settingsLaserDot) {
    state.scene.remove(state.settingsLaserDot);
    state.settingsLaserDot.geometry.dispose();
    state.settingsLaserDot.material.dispose();
    state.setSettingsLaserDot(null);
  }
}

// レーザーのクリック判定用クールダウン
let laserClickCooldown = 0;

// 設定メニューの位置を更新（左コントローラー上に常に追従）
export function updateSettingsMenu() {
  if (!state.settingsMenu || !state.xrSession) return;

  const inputSources = state.xrSession.inputSources;
  const frame = state.renderer.xr.getFrame();
  const referenceSpace = state.renderer.xr.getReferenceSpace();

  if (!frame || !referenceSpace) return;

  let rightControllerPos = null;
  let rightControllerDir = null;
  let rightTriggerPressed = false;

  for (const source of inputSources) {
    // 左コントローラー：メニュー位置を更新
    if (source.handedness === 'left' && source.gripSpace) {
      const gripPose = frame.getPose(source.gripSpace, referenceSpace);
      if (gripPose) {
        const controllerMatrix = new THREE.Matrix4().fromArray(gripPose.transform.matrix);
        const controllerPos = new THREE.Vector3().setFromMatrixPosition(controllerMatrix);

        const menuPos = controllerPos.clone();
        menuPos.y += 0.25;

        state.settingsMenu.position.copy(menuPos);

        if (state.camera) {
          const cameraPos = new THREE.Vector3();
          state.camera.getWorldPosition(cameraPos);

          const direction = new THREE.Vector3();
          direction.subVectors(cameraPos, menuPos);
          direction.y = 0;
          direction.normalize();

          const angle = Math.atan2(direction.x, direction.z);
          state.settingsMenu.rotation.set(0, angle, 0);
        }
      }
    }

    // 右コントローラー：レーザー用の位置と向きを取得
    if (source.handedness === 'right' && source.targetRaySpace) {
      const rayPose = frame.getPose(source.targetRaySpace, referenceSpace);
      if (rayPose) {
        const rayMatrix = new THREE.Matrix4().fromArray(rayPose.transform.matrix);
        rightControllerPos = new THREE.Vector3().setFromMatrixPosition(rayMatrix);

        // 向きを取得（Z軸負方向がポインティング方向）
        rightControllerDir = new THREE.Vector3(0, 0, -1);
        const rayQuat = new THREE.Quaternion().setFromRotationMatrix(rayMatrix);
        rightControllerDir.applyQuaternion(rayQuat);
      }

      if (source.gamepad && source.gamepad.buttons[0]) {
        rightTriggerPressed = source.gamepad.buttons[0].pressed;
      }
    }
  }

  // レーザーとメニューの交点を計算
  let hoveredButton = null;

  if (rightControllerPos && rightControllerDir && state.settingsMenu) {
    // レーザーラインを更新
    if (state.settingsLaserLine) {
      const positions = state.settingsLaserLine.geometry.attributes.position.array;
      positions[0] = rightControllerPos.x;
      positions[1] = rightControllerPos.y;
      positions[2] = rightControllerPos.z;

      const endPoint = rightControllerPos.clone().add(rightControllerDir.clone().multiplyScalar(2));
      positions[3] = endPoint.x;
      positions[4] = endPoint.y;
      positions[5] = endPoint.z;

      state.settingsLaserLine.geometry.attributes.position.needsUpdate = true;
    }

    // メニューとの交点を計算
    const raycaster = new THREE.Raycaster(rightControllerPos, rightControllerDir);
    const intersects = raycaster.intersectObject(state.settingsMenu);

    if (intersects.length > 0) {
      const hit = intersects[0];

      // ドットを表示
      if (state.settingsLaserDot) {
        state.settingsLaserDot.visible = true;
        state.settingsLaserDot.position.copy(hit.point);
      }

      // UV座標からキャンバス上の位置を計算
      if (hit.uv) {
        const canvasX = hit.uv.x * settingsMenuCanvas.width;
        const canvasY = (1 - hit.uv.y) * settingsMenuCanvas.height;

        // ボタンの当たり判定
        for (const btn of settingsButtonAreas) {
          if (canvasX >= btn.x && canvasX <= btn.x + btn.w &&
              canvasY >= btn.y && canvasY <= btn.y + btn.h) {
            hoveredButton = btn;
            break;
          }
        }

        // トリガーでクリック
        const now = Date.now();
        if (rightTriggerPressed && hoveredButton && laserClickCooldown < now) {
          handleSettingsButtonClick(hoveredButton);
          laserClickCooldown = now + 200;
        }
      }
    } else {
      // メニューに当たっていない場合、ドットを非表示
      if (state.settingsLaserDot) {
        state.settingsLaserDot.visible = false;
      }
    }
  }

  // 再描画
  redrawSettingsMenu(hoveredButton);
}

// ボタンクリック処理
function handleSettingsButtonClick(button) {
  const item = settingsItems[button.index];

  if (button.type === 'left') {
    // 値を減少
    const currentValue = item.getValue();
    const newValue = Math.max(item.min, currentValue - item.step);
    item.setValue(newValue);
  } else if (button.type === 'right') {
    // 値を増加
    const currentValue = item.getValue();
    const newValue = Math.min(item.max, currentValue + item.step);
    item.setValue(newValue);
  } else if (button.type === 'default') {
    // デフォルト値に戻す
    item.setValue(item.defaultValue);
  }
}

// コントローラーガイドメニューの位置を更新（右コントローラー上に常に追従、角度は水平固定）
export function updateControllerGuideMenu() {
  if (!state.controllerGuideMenu || !state.xrSession) return;

  const inputSources = state.xrSession.inputSources;
  const frame = state.renderer.xr.getFrame();
  const referenceSpace = state.renderer.xr.getReferenceSpace();

  if (!frame || !referenceSpace) return;

  // ボタン状態を収集
  const pressedButtons = {
    leftStickX: false,
    leftStickY: false,
    leftY: false,
    leftX: false,
    leftStickPress: false,
    leftTrigger: false,
    leftGrip: false,
    rightStickX: false,
    rightStickY: false,
    rightA: false,
    rightStickPress: false,
    rightB: false,
    rightTrigger: false,
    rightGrip: false
  };

  for (const source of inputSources) {
    if (source.gamepad) {
      const gp = source.gamepad;
      const buttons = gp.buttons;
      const axes = gp.axes;

      // デッドゾーン（実際のコントロールと同じ値）
      const deadzone = state.stickDeadzone;

      if (source.handedness === 'left') {
        // 左スティック（デッドゾーン考慮）
        if (axes.length >= 4) {
          pressedButtons.leftStickX = Math.abs(axes[2]) > deadzone;
          pressedButtons.leftStickY = Math.abs(axes[3]) > deadzone;
        }
        // ボタン (X=buttons[5], Y=buttons[4])
        if (buttons[5]) pressedButtons.leftX = buttons[5].pressed;
        if (buttons[4]) pressedButtons.leftY = buttons[4].pressed;
        if (buttons[3]) pressedButtons.leftStickPress = buttons[3].pressed;
        if (buttons[0]) pressedButtons.leftTrigger = buttons[0].pressed || buttons[0].value > 0.5;
        if (buttons[1]) pressedButtons.leftGrip = buttons[1].pressed || buttons[1].value > 0.5;
      } else if (source.handedness === 'right') {
        // 右スティック（デッドゾーン考慮）
        if (axes.length >= 4) {
          pressedButtons.rightStickX = Math.abs(axes[2]) > deadzone;
          pressedButtons.rightStickY = Math.abs(axes[3]) > deadzone;
        }
        // ボタン
        if (buttons[4]) pressedButtons.rightA = buttons[4].pressed;
        if (buttons[3]) pressedButtons.rightStickPress = buttons[3].pressed;
        if (buttons[5]) pressedButtons.rightB = buttons[5].pressed;
        if (buttons[0]) pressedButtons.rightTrigger = buttons[0].pressed || buttons[0].value > 0.5;
        if (buttons[1]) pressedButtons.rightGrip = buttons[1].pressed || buttons[1].value > 0.5;
      }
    }

    if (source.handedness === 'right' && source.gripSpace) {
      const gripPose = frame.getPose(source.gripSpace, referenceSpace);
      if (gripPose) {
        const controllerMatrix = new THREE.Matrix4().fromArray(gripPose.transform.matrix);
        const controllerPos = new THREE.Vector3().setFromMatrixPosition(controllerMatrix);

        // コントローラーの位置から上方向（ワールド座標）に配置
        const menuPos = controllerPos.clone();
        menuPos.y += 0.25;

        state.controllerGuideMenu.position.copy(menuPos);

        // カメラの方を向く（Y軸回転のみ、傾きなし）
        if (state.camera) {
          const cameraPos = new THREE.Vector3();
          state.camera.getWorldPosition(cameraPos);

          // Y軸回転のみでカメラの方を向く
          const direction = new THREE.Vector3();
          direction.subVectors(cameraPos, menuPos);
          direction.y = 0; // 水平方向のみ
          direction.normalize();

          const angle = Math.atan2(direction.x, direction.z);
          state.controllerGuideMenu.rotation.set(0, angle, 0);
        }
      }
    }
  }

  // メニューを再描画（ボタン状態を反映）
  redrawControllerGuideMenu(pressedButtons);
}

// ドローン位置表示矢印を作成（ドローンがカメラ外にいる時の方向ガイド）
export function createDroneLocationArrow() {
  if (state.hudDroneLocationArrow) {
    state.scene.remove(state.hudDroneLocationArrow);
    if (state.hudDroneLocationArrow.geometry) state.hudDroneLocationArrow.geometry.dispose();
    if (state.hudDroneLocationArrow.material) state.hudDroneLocationArrow.material.dispose();
    state.setHudDroneLocationArrow(null);
  }

  const geometry = new THREE.ConeGeometry(0.02, 0.06, 8);
  const material = new THREE.MeshBasicMaterial({
    color: 0xffff00,
    transparent: true,
    opacity: 0.9
  });

  const hudDroneLocationArrow = new THREE.Mesh(geometry, material);
  state.scene.add(hudDroneLocationArrow);
  state.setHudDroneLocationArrow(hudDroneLocationArrow);
}

// ドローン位置表示矢印の位置と向きを更新
export function updateDroneLocationArrow() {
  if (!state.drone || !state.camera) return;

  const cameraPos = new THREE.Vector3();
  state.camera.getWorldPosition(cameraPos);

  const dronePos = state.drone.position.clone();
  const toDrone = dronePos.clone().sub(cameraPos);
  const toDroneLocal = toDrone.clone().applyQuaternion(state.camera.quaternion.clone().invert());

  const fovRad = (state.camera.fov * Math.PI) / 180;
  const aspectRatio = state.camera.aspect || (window.innerWidth / window.innerHeight);

  const verticalHalfAngle = fovRad / 2 * 0.7;
  const horizontalHalfAngle = Math.atan(Math.tan(verticalHalfAngle) * aspectRatio);

  const angleY = Math.atan2(toDroneLocal.y, -toDroneLocal.z);
  const angleX = Math.atan2(toDroneLocal.x, -toDroneLocal.z);

  const isInView =
    Math.abs(angleY) < verticalHalfAngle &&
    Math.abs(angleX) < horizontalHalfAngle &&
    toDroneLocal.z < 0;

  if (isInView) {
    if (state.hudDroneLocationArrow) {
      state.hudDroneLocationArrow.visible = false;
    }
  } else {
    if (!state.hudDroneLocationArrow) {
      createDroneLocationArrow();
    }
    state.hudDroneLocationArrow.visible = true;

    const forward = new THREE.Vector3(0, 0, -1).applyQuaternion(state.camera.quaternion);
    const right = new THREE.Vector3(1, 0, 0).applyQuaternion(state.camera.quaternion);
    const up = new THREE.Vector3(0, 1, 0).applyQuaternion(state.camera.quaternion);

    const depth = 0.35;
    let edgePos = cameraPos.clone().add(forward.clone().multiplyScalar(depth));

    // 円形の表示エリアにするため、角度から方向を計算
    const dirAngle = Math.atan2(angleY, angleX);

    // 上下で異なる半径係数を使用（下は外側に、上は内側に）
    const isDown = angleY < 0;
    const verticalRadius = isDown ? 0.95 : 0.55;
    const horizontalRadius = 0.55;

    // 円周上の位置を計算
    const horizontalOffset = Math.cos(dirAngle) * horizontalHalfAngle * horizontalRadius;
    const verticalOffset = Math.sin(dirAngle) * verticalHalfAngle * verticalRadius;

    edgePos.add(right.clone().multiplyScalar(Math.tan(horizontalOffset) * depth));
    edgePos.add(up.clone().multiplyScalar(Math.tan(verticalOffset) * depth));

    state.hudDroneLocationArrow.position.copy(edgePos);
    state.hudDroneLocationArrow.lookAt(dronePos);
    state.hudDroneLocationArrow.rotateX(Math.PI / 2);

    // 矢印自体をゆっくり自転させる
    state.hudDroneLocationArrow.rotateY(Date.now() * 0.002);
  }
}
