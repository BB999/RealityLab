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

  if (!state.isHUDMode) {
    setTimeout(() => {
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
    }, 3000);
  }
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

  if (!state.isHUDMode) {
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

  if (!state.isHUDMode) {
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

// HUDモードテキストを作成
export function createHUDModeText() {
  if (state.hudModeText) {
    state.scene.remove(state.hudModeText);
    state.hudModeText.geometry.dispose();
    state.hudModeText.material.dispose();
    state.hudModeText.material.map.dispose();
    state.setHudModeText(null);
  }

  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 128;
  const context = canvas.getContext('2d');

  context.fillStyle = '#00ffff';
  context.font = 'bold 50px Arial';
  context.textAlign = 'center';
  context.textBaseline = 'middle';
  context.fillText('HUD Mode', canvas.width / 2, canvas.height / 2);

  const texture = new THREE.CanvasTexture(canvas);
  const geometry = new THREE.PlaneGeometry(0.25, 0.06);
  const material = new THREE.MeshBasicMaterial({
    map: texture,
    transparent: true,
    side: THREE.DoubleSide
  });

  const hudModeText = new THREE.Mesh(geometry, material);
  state.scene.add(hudModeText);
  state.setHudModeText(hudModeText);
}

// HUDモードテキストの位置を更新
export function updateHUDModeText() {
  if (state.hudModeText) {
    const cameraPos = new THREE.Vector3();
    state.camera.getWorldPosition(cameraPos);

    const forward = new THREE.Vector3(0, 0, -1).applyQuaternion(state.camera.quaternion);
    const left = new THREE.Vector3(-1, 0, 0).applyQuaternion(state.camera.quaternion);
    const up = new THREE.Vector3(0, 1, 0).applyQuaternion(state.camera.quaternion);

    const textPos = cameraPos.clone()
      .add(forward.multiplyScalar(0.5))
      .add(left.multiplyScalar(0.15))
      .add(up.multiplyScalar(0.15));

    state.hudModeText.position.copy(textPos);
    state.hudModeText.lookAt(state.camera.position);
  }
}

// 進行方向の矢印を作成
export function createDirectionArrow() {
  if (state.hudDirectionArrow) {
    state.scene.remove(state.hudDirectionArrow);
    if (state.hudDirectionArrow.geometry) state.hudDirectionArrow.geometry.dispose();
    if (state.hudDirectionArrow.material) state.hudDirectionArrow.material.dispose();
    state.setHudDirectionArrow(null);
  }

  const geometry = new THREE.ConeGeometry(0.03, 0.1, 8);
  const material = new THREE.MeshBasicMaterial({
    color: 0xff0000,
    transparent: true,
    opacity: 0.8
  });

  const hudDirectionArrow = new THREE.Mesh(geometry, material);
  state.scene.add(hudDirectionArrow);
  state.setHudDirectionArrow(hudDirectionArrow);
}

// 進行方向矢印の位置と向きを更新
export function updateDirectionArrow() {
  if (state.hudDirectionArrow && state.drone) {
    const arrowScale = Math.max(0.5, Math.min(2.0, state.currentDroneScale / 0.3));
    state.hudDirectionArrow.scale.set(arrowScale, arrowScale, arrowScale);

    const droneRadius = state.currentDroneScale * 0.5;
    const arrowLength = 0.1 * arrowScale;
    const arrowOffset = droneRadius + arrowLength * 0.6;

    const droneForward = new THREE.Vector3(0, 0, 1).applyQuaternion(state.drone.quaternion);
    const arrowPos = state.drone.position.clone().add(droneForward.multiplyScalar(arrowOffset));
    state.hudDirectionArrow.position.copy(arrowPos);

    state.hudDirectionArrow.rotation.copy(state.drone.rotation);
    state.hudDirectionArrow.rotateX(Math.PI / 2);
  }
}

// ドローン位置表示矢印を作成
export function createDroneLocationArrow() {
  if (state.hudDroneLocationArrow) {
    state.scene.remove(state.hudDroneLocationArrow);
    if (state.hudDroneLocationArrow.geometry) state.hudDroneLocationArrow.geometry.dispose();
    if (state.hudDroneLocationArrow.material) state.hudDroneLocationArrow.material.dispose();
    state.setHudDroneLocationArrow(null);
  }

  const geometry = new THREE.ConeGeometry(0.04, 0.12, 8);
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

    let horizontalOffset = 0;
    if (Math.abs(angleX) > horizontalHalfAngle) {
      const edgeAngleX = angleX > 0 ? horizontalHalfAngle * 0.75 : -horizontalHalfAngle * 0.65;
      horizontalOffset = Math.tan(edgeAngleX) * depth;
    } else {
      horizontalOffset = Math.tan(angleX) * depth;
    }
    edgePos.add(right.clone().multiplyScalar(horizontalOffset));

    let verticalOffset = 0;
    if (Math.abs(angleY) > verticalHalfAngle) {
      const edgeAngleY = angleY > 0 ? verticalHalfAngle * 0.85 : -verticalHalfAngle * 1.05;
      verticalOffset = Math.tan(edgeAngleY) * depth;
    } else {
      verticalOffset = Math.tan(angleY) * depth;
    }
    edgePos.add(up.clone().multiplyScalar(verticalOffset));

    state.hudDroneLocationArrow.position.copy(edgePos);
    state.hudDroneLocationArrow.lookAt(dronePos);
    state.hudDroneLocationArrow.rotateX(Math.PI / 2);
  }
}
