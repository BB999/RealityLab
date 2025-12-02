import * as THREE from 'three';
import * as state from './state.js';

// VR用の背景とグリッドを作成
export function createVREnvironment() {
  state.scene.background = new THREE.Color(0xcccccc);

  const gridSize = 50;
  const gridDivisions = 100;
  const gridHelper = new THREE.GridHelper(gridSize, gridDivisions, 0x888888, 0x999999);
  gridHelper.position.y = 0;
  state.scene.add(gridHelper);
  state.setGridHelper(gridHelper);

  console.log('VR環境を作成しました');
}

// VR環境を削除
export function removeVREnvironment() {
  state.scene.background = null;

  if (state.gridHelper) {
    state.scene.remove(state.gridHelper);
    state.setGridHelper(null);
  }

  console.log('VR環境を削除しました');
}

// 深度データの処理
export function processDepthInformation(frame, referenceSpace) {
  const pose = frame.getViewerPose(referenceSpace);
  if (!pose) return;

  const glBinding = frame.session.renderState.baseLayer;

  for (const view of pose.views) {
    if (glBinding && glBinding.getDepthInformation) {
      const depthInfo = glBinding.getDepthInformation(view);
      if (depthInfo) {
        const texture = depthInfo.texture;

        if (!state.depthDataTexture) {
          const depthTexture = new THREE.Texture();
          const properties = state.renderer.properties.get(depthTexture);
          properties.__webglTexture = texture;
          properties.__webglInit = true;
          depthTexture.needsUpdate = true;
          state.setDepthDataTexture(depthTexture);
        }

        if (!state.depthDataTexture.userData.logged) {
          console.log('深度データ取得 (GPU):', {
            width: depthInfo.width,
            height: depthInfo.height,
            normDepthBufferFromNormView: depthInfo.normDepthBufferFromNormView
          });
          state.depthDataTexture.userData.logged = true;
        }
      }
    }
  }
}

// 深度メッシュの視覚化を作成
export function createDepthVisualization() {
  if (state.depthMesh) return;

  const geometry = new THREE.PlaneGeometry(2, 2);
  const material = new THREE.MeshBasicMaterial({
    map: state.depthDataTexture,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.5
  });

  const depthMesh = new THREE.Mesh(geometry, material);
  depthMesh.position.set(0, 1.5, -2);
  depthMesh.visible = state.showDepthVisualization;
  state.scene.add(depthMesh);
  state.setDepthMesh(depthMesh);
}

// plane-detectionで検出された平面を処理
export function updatePlanes(frame, referenceSpace) {
  if (!frame.detectedPlanes) return;

  // 削除された平面を処理
  state.detectedPlanes.forEach((plane, xrPlane) => {
    if (!frame.detectedPlanes.has(xrPlane)) {
      state.detectedPlanes.delete(xrPlane);
    }
  });

  // 新しい平面または更新された平面を処理
  frame.detectedPlanes.forEach((xrPlane) => {
    const pose = frame.getPose(xrPlane.planeSpace, referenceSpace);
    if (!pose) return;

    const position = new THREE.Vector3().setFromMatrixPosition(
      new THREE.Matrix4().fromArray(pose.transform.matrix)
    );
    const quaternion = new THREE.Quaternion().setFromRotationMatrix(
      new THREE.Matrix4().fromArray(pose.transform.matrix)
    );

    const polygon = xrPlane.polygon;

    if (!state.detectedPlanes.has(xrPlane)) {
      state.detectedPlanes.set(xrPlane, {
        position: position,
        quaternion: quaternion,
        polygon: polygon,
        orientation: xrPlane.orientation
      });

      console.log('新しい平面を検出:', xrPlane.orientation);
    } else {
      const planeData = state.detectedPlanes.get(xrPlane);
      planeData.position = position;
      planeData.quaternion = quaternion;
      planeData.polygon = polygon;
    }
  });
}

// ドローンの初期配置
export function positionDrone() {
  if (!state.xrSession || !state.drone || state.dronePositioned) return;

  const frame = state.renderer.xr.getFrame();
  const referenceSpace = state.renderer.xr.getReferenceSpace();

  if (!frame || !referenceSpace) return;

  const cameraPos = new THREE.Vector3();
  state.camera.getWorldPosition(cameraPos);

  const cameraDirection = new THREE.Vector3(0, 0, -1);
  cameraDirection.applyQuaternion(state.camera.quaternion);
  cameraDirection.y = 0;
  cameraDirection.normalize();

  let floorY = null;

  if (state.detectedPlanes && state.detectedPlanes.size > 0) {
    let lowestY = Infinity;
    for (const [xrPlane, planeMesh] of state.detectedPlanes) {
      const planeOrientation = xrPlane.orientation;
      if (planeOrientation === 'horizontal') {
        const planeY = planeMesh.position.y;
        if (planeY < lowestY) {
          lowestY = planeY;
        }
      }
    }
    if (lowestY !== Infinity) {
      floorY = lowestY;
      console.log('検出された床の高さ:', floorY);
    }
  }

  if (floorY === null) {
    floorY = 0.0;
    console.log('床をy=0に設定 (カメラ位置:', cameraPos.y, ')');
  }

  const dronePos = cameraPos.clone()
    .add(cameraDirection.multiplyScalar(0.3));
  dronePos.y = floorY + 0.05;

  state.drone.position.copy(dronePos);

  const angle = Math.atan2(cameraDirection.x, cameraDirection.z);
  state.drone.rotation.y = angle;

  state.setDronePositioned(true);
  console.log('ドローン配置位置:', state.drone.position);
  console.log('カメラ位置:', cameraPos);
  console.log('床の高さ:', floorY);
}
