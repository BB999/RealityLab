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

  // 影を受ける床面を追加
  const floorGeometry = new THREE.PlaneGeometry(gridSize, gridSize);
  const floorMaterial = new THREE.ShadowMaterial({
    opacity: 0.3
  });
  const floor = new THREE.Mesh(floorGeometry, floorMaterial);
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = 0.001;
  floor.receiveShadow = true;
  state.scene.add(floor);
  state.setVrFloor(floor);

  // 影用のディレクショナルライトを追加
  const shadowLight = new THREE.DirectionalLight(0xffffff, 0.5);
  shadowLight.position.set(0, 10, 0);
  shadowLight.castShadow = true;
  shadowLight.shadow.mapSize.width = 1024;
  shadowLight.shadow.mapSize.height = 1024;
  shadowLight.shadow.camera.near = 0.5;
  shadowLight.shadow.camera.far = 50;
  shadowLight.shadow.camera.left = -3;
  shadowLight.shadow.camera.right = 3;
  shadowLight.shadow.camera.top = 3;
  shadowLight.shadow.camera.bottom = -3;
  state.scene.add(shadowLight);
  // ターゲットもシーンに追加（位置更新を反映させるため）
  state.scene.add(shadowLight.target);
  state.setVrShadowLight(shadowLight);

  // レンダラーの影を有効化
  state.renderer.shadowMap.enabled = true;
  state.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  // ドローンに影を付ける
  if (state.drone) {
    state.drone.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
      }
    });
  }

  // 練習用障害物を配置
  createTrainingObstacles();

  console.log('VR環境を作成しました');
}

// 練習用障害物を作成
function createTrainingObstacles() {
  const obstacles = [];

  // キューブ障害物（ランダム配置）
  const cubePositions = [
    { x: 3, y: 1.5, z: -5 },
    { x: -4, y: 2, z: -8 },
    { x: 6, y: 1, z: 3 },
    { x: -2, y: 2.5, z: 5 },
    { x: 5, y: 1.8, z: -3 },
    { x: -6, y: 1.2, z: -4 },
  ];

  cubePositions.forEach((pos, i) => {
    const size = 0.5 + Math.random() * 0.5;
    const geometry = new THREE.BoxGeometry(size, size, size);
    const material = new THREE.MeshStandardMaterial({
      color: new THREE.Color().setHSL(i / cubePositions.length, 0.7, 0.5),
      roughness: 0.5,
      metalness: 0.3
    });
    const cube = new THREE.Mesh(geometry, material);
    cube.position.set(pos.x, pos.y, pos.z);
    cube.userData.isObstacle = true;
    cube.userData.type = 'cube';
    cube.userData.size = size;

    state.scene.add(cube);
    obstacles.push(cube);
  });

  // ドーナツ（トーラス）ゲート - くぐる練習用
  const torusPositions = [
    { x: 0, y: 1.5, z: -6, rotY: 0 },
    { x: -5, y: 2, z: 0, rotY: Math.PI / 2 },
    { x: 4, y: 1.8, z: 4, rotY: Math.PI / 4 },
    { x: -3, y: 2.5, z: -10, rotY: 0 },
    { x: 7, y: 1.5, z: -7, rotY: -Math.PI / 3 },
  ];

  torusPositions.forEach((pos, i) => {
    const outerRadius = 1.0 + Math.random() * 0.5;
    const tubeRadius = 0.1;
    const geometry = new THREE.TorusGeometry(outerRadius, tubeRadius, 16, 32);
    const material = new THREE.MeshStandardMaterial({
      color: new THREE.Color().setHSL(0.1 + i * 0.15, 0.8, 0.6),
      roughness: 0.3,
      metalness: 0.5
    });
    const torus = new THREE.Mesh(geometry, material);
    torus.position.set(pos.x, pos.y, pos.z);
    torus.rotation.y = pos.rotY;
    torus.userData.isObstacle = true;
    torus.userData.type = 'torus';
    torus.userData.outerRadius = outerRadius;
    torus.userData.tubeRadius = tubeRadius;

    state.scene.add(torus);
    obstacles.push(torus);
  });

  // ポール障害物（縦長の円柱）
  const polePositions = [
    { x: 2, z: -2 },
    { x: -3, z: -6 },
    { x: 5, z: 1 },
    { x: -5, z: 3 },
  ];

  polePositions.forEach((pos, i) => {
    const height = 3 + Math.random() * 2;
    const radius = 0.15;
    const geometry = new THREE.CylinderGeometry(radius, radius, height, 16);
    const material = new THREE.MeshStandardMaterial({
      color: 0xff4444,
      roughness: 0.4,
      metalness: 0.2
    });
    const pole = new THREE.Mesh(geometry, material);
    pole.position.set(pos.x, height / 2, pos.z);
    pole.userData.isObstacle = true;
    pole.userData.type = 'pole';
    pole.userData.radius = radius;
    pole.userData.height = height;

    state.scene.add(pole);
    obstacles.push(pole);
  });

  state.setVrObstacles(obstacles);
  console.log('練習用障害物を配置:', obstacles.length, '個');
}

// VR環境を削除
export function removeVREnvironment() {
  state.scene.background = null;

  if (state.gridHelper) {
    state.scene.remove(state.gridHelper);
    state.setGridHelper(null);
  }

  // 床面を削除
  if (state.vrFloor) {
    state.scene.remove(state.vrFloor);
    state.vrFloor.geometry.dispose();
    state.vrFloor.material.dispose();
    state.setVrFloor(null);
  }

  // 影用ライトを削除
  if (state.vrShadowLight) {
    state.scene.remove(state.vrShadowLight.target);
    state.scene.remove(state.vrShadowLight);
    state.setVrShadowLight(null);
  }

  // 障害物を削除
  state.vrObstacles.forEach(obstacle => {
    state.scene.remove(obstacle);
    if (obstacle.geometry) obstacle.geometry.dispose();
    if (obstacle.material) obstacle.material.dispose();
  });
  state.setVrObstacles([]);

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

  // 右コントローラーの位置を取得してドローンを配置
  let dronePos = null;
  const inputSources = state.xrSession.inputSources;
  for (const source of inputSources) {
    if (source.handedness === 'right' && source.gripSpace) {
      const gripPose = frame.getPose(source.gripSpace, referenceSpace);
      if (gripPose) {
        dronePos = new THREE.Vector3().setFromMatrixPosition(
          new THREE.Matrix4().fromArray(gripPose.transform.matrix)
        );
        console.log('右コントローラーの位置にドローンを配置:', dronePos);
        break;
      }
    }
  }

  // 右コントローラーが見つからない場合は次のフレームまで待つ
  if (!dronePos) {
    console.log('右コントローラー待機中... inputSources:', inputSources.length);
    return; // 配置しない、次のフレームで再試行
  }

  state.drone.position.copy(dronePos);

  const angle = Math.atan2(cameraDirection.x, cameraDirection.z);
  state.drone.rotation.y = angle;

  // ドローンを表示
  state.drone.visible = true;

  state.setDronePositioned(true);
  console.log('ドローン配置位置:', state.drone.position);
  console.log('カメラ位置:', cameraPos);
  console.log('床の高さ:', floorY);
}
