import * as THREE from 'three';

// ARButton helper
class ARButton {
  static createButton(renderer, sessionInit = {}) {
    const button = document.createElement('button');

    function showStartAR() {
      let currentSession = null;

      async function onSessionStarted(session) {
        session.addEventListener('end', onSessionEnded);

        await renderer.xr.setSession(session);
        button.textContent = 'EXIT AR';

        currentSession = session;
      }

      function onSessionEnded() {
        currentSession.removeEventListener('end', onSessionEnded);

        button.textContent = 'ENTER AR';

        currentSession = null;
      }

      button.style.display = '';
      button.style.cursor = 'pointer';
      button.style.left = 'calc(50% - 100px)';
      button.style.width = '200px';
      button.textContent = 'ENTER AR';

      button.onmouseenter = function () {
        button.style.opacity = '1.0';
        button.style.transform = 'scale(1.05)';
      };

      button.onmouseleave = function () {
        button.style.opacity = '0.9';
        button.style.transform = 'scale(1)';
      };

      button.onclick = function () {
        if (currentSession === null) {
          navigator.xr.requestSession('immersive-ar', sessionInit).then(onSessionStarted);
        } else {
          currentSession.end();
        }
      };
    }

    function disableButton() {
      button.style.display = '';
      button.style.cursor = 'auto';
      button.style.left = 'calc(50% - 75px)';
      button.style.width = '150px';

      button.onmouseenter = null;
      button.onmouseleave = null;
      button.onclick = null;
    }

    function showARNotSupported() {
      disableButton();
      button.textContent = 'AR NOT SUPPORTED';
    }

    function showARNotAllowed() {
      disableButton();
      button.textContent = 'AR NOT ALLOWED';
    }

    button.style.position = 'absolute';
    button.style.top = 'calc(50% - 60px)';
    button.style.padding = '16px 24px';
    button.style.border = '2px solid #fff';
    button.style.borderRadius = '12px';
    button.style.background = 'linear-gradient(135deg, rgba(102, 126, 234, 0.8), rgba(118, 75, 162, 0.8))';
    button.style.color = '#fff';
    button.style.font = 'bold 14px sans-serif';
    button.style.textAlign = 'center';
    button.style.opacity = '0.9';
    button.style.outline = 'none';
    button.style.zIndex = '999';
    button.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.3)';
    button.style.transition = 'all 0.3s ease';

    if ('xr' in navigator) {
      navigator.xr.isSessionSupported('immersive-ar').then(function (supported) {
        supported ? showStartAR() : showARNotSupported();
      }).catch(showARNotAllowed);

      return button;
    } else {
      const message = document.createElement('a');
      message.href = 'https://immersiveweb.dev/';
      message.innerHTML = 'WEBXR NOT AVAILABLE';

      message.style.left = 'calc(50% - 90px)';
      message.style.width = '180px';
      message.style.textDecoration = 'none';

      message.style.position = 'absolute';
      message.style.bottom = '20px';
      message.style.padding = '12px 6px';
      message.style.border = '1px solid #fff';
      message.style.borderRadius = '4px';
      message.style.background = 'rgba(0,0,0,0.1)';
      message.style.color = '#fff';
      message.style.font = 'normal 13px sans-serif';
      message.style.textAlign = 'center';
      message.style.opacity = '0.5';
      message.style.outline = 'none';
      message.style.zIndex = '999';

      return message;
    }
  }
}

// MRButton helper with plane-detection
class MRButton {
  static createButton(renderer, onSessionStarted) {
    const button = document.createElement('button');

    function showStartMR() {
      let currentSession = null;

      async function onMRSessionStarted(session) {
        session.addEventListener('end', onSessionEnded);

        await renderer.xr.setSession(session);
        button.textContent = 'EXIT MR';

        currentSession = session;

        if (onSessionStarted) {
          onSessionStarted(session);
        }
      }

      function onSessionEnded() {
        currentSession.removeEventListener('end', onSessionEnded);

        button.textContent = 'ENTER MR (plane-detection)';

        currentSession = null;
      }

      button.style.display = '';
      button.style.cursor = 'pointer';
      button.style.left = 'calc(50% - 100px)';
      button.style.width = '200px';
      button.textContent = 'ENTER MR (plane-detection)';

      button.onmouseenter = function () {
        button.style.opacity = '1.0';
        button.style.transform = 'scale(1.05)';
      };

      button.onmouseleave = function () {
        button.style.opacity = '0.9';
        button.style.transform = 'scale(1)';
      };

      button.onclick = function () {
        if (currentSession === null) {
          const sessionInit = {
            requiredFeatures: ['plane-detection'],
            optionalFeatures: ['local-floor']
          };
          navigator.xr.requestSession('immersive-ar', sessionInit).then(onMRSessionStarted);
        } else {
          currentSession.end();
        }
      };
    }

    function disableButton() {
      button.style.display = '';
      button.style.cursor = 'auto';
      button.style.left = 'calc(50% - 75px)';
      button.style.width = '150px';

      button.onmouseenter = null;
      button.onmouseleave = null;
      button.onclick = null;
    }

    function showMRNotSupported() {
      disableButton();
      button.textContent = 'MR NOT SUPPORTED';
    }

    function showMRNotAllowed() {
      disableButton();
      button.textContent = 'MR NOT ALLOWED';
    }

    button.style.position = 'absolute';
    button.style.top = 'calc(50% + 20px)';
    button.style.padding = '16px 24px';
    button.style.border = '2px solid #fff';
    button.style.borderRadius = '12px';
    button.style.background = 'linear-gradient(135deg, rgba(234, 88, 12, 0.8), rgba(220, 38, 38, 0.8))';
    button.style.color = '#fff';
    button.style.font = 'bold 14px sans-serif';
    button.style.textAlign = 'center';
    button.style.opacity = '0.9';
    button.style.outline = 'none';
    button.style.zIndex = '999';
    button.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.3)';
    button.style.transition = 'all 0.3s ease';

    if ('xr' in navigator) {
      navigator.xr.isSessionSupported('immersive-ar').then(function (supported) {
        supported ? showStartMR() : showMRNotSupported();
      }).catch(showMRNotAllowed);

      return button;
    } else {
      const message = document.createElement('a');
      message.href = 'https://immersiveweb.dev/';
      message.innerHTML = 'WEBXR NOT AVAILABLE';

      message.style.left = 'calc(50% - 90px)';
      message.style.width = '180px';
      message.style.textDecoration = 'none';

      message.style.position = 'absolute';
      message.style.bottom = '20px';
      message.style.padding = '12px 6px';
      message.style.border = '1px solid #fff';
      message.style.borderRadius = '4px';
      message.style.background = 'rgba(0,0,0,0.1)';
      message.style.color = '#fff';
      message.style.font = 'normal 13px sans-serif';
      message.style.textAlign = 'center';
      message.style.opacity = '0.5';
      message.style.outline = 'none';
      message.style.zIndex = '999';

      return message;
    }
  }
}

// MRButton helper with depth-sensing
class MRDepthButton {
  static createButton(renderer, onSessionStarted) {
    const button = document.createElement('button');

    function showStartMR() {
      let currentSession = null;

      async function onMRSessionStarted(session) {
        session.addEventListener('end', onSessionEnded);

        await renderer.xr.setSession(session);
        button.textContent = 'EXIT MR';

        currentSession = session;

        if (onSessionStarted) {
          onSessionStarted(session);
        }
      }

      function onSessionEnded() {
        currentSession.removeEventListener('end', onSessionEnded);

        button.textContent = 'ENTER MR (depth-sensing)';

        currentSession = null;
      }

      button.style.display = '';
      button.style.cursor = 'pointer';
      button.style.left = 'calc(50% - 100px)';
      button.style.width = '200px';
      button.textContent = 'ENTER MR (depth-sensing)';

      button.onmouseenter = function () {
        button.style.opacity = '1.0';
        button.style.transform = 'scale(1.05)';
      };

      button.onmouseleave = function () {
        button.style.opacity = '0.9';
        button.style.transform = 'scale(1)';
      };

      button.onclick = function () {
        if (currentSession === null) {
          const sessionInit = {
            requiredFeatures: ['depth-sensing'],
            depthSensing: {
              usagePreference: ['cpu-optimized', 'gpu-optimized'],
              dataFormatPreference: ['luminance-alpha', 'float32']
            }
          };
          navigator.xr.requestSession('immersive-ar', sessionInit).then(onMRSessionStarted);
        } else {
          currentSession.end();
        }
      };
    }

    function disableButton() {
      button.style.display = '';
      button.style.cursor = 'auto';
      button.style.left = 'calc(50% - 75px)';
      button.style.width = '150px';

      button.onmouseenter = null;
      button.onmouseleave = null;
      button.onclick = null;
    }

    function showMRNotSupported() {
      disableButton();
      button.textContent = 'MR NOT SUPPORTED';
    }

    function showMRNotAllowed() {
      disableButton();
      button.textContent = 'MR NOT ALLOWED';
    }

    button.style.position = 'absolute';
    button.style.top = 'calc(50% + 100px)';
    button.style.padding = '16px 24px';
    button.style.border = '2px solid #fff';
    button.style.borderRadius = '12px';
    button.style.background = 'linear-gradient(135deg, rgba(34, 197, 94, 0.8), rgba(22, 163, 74, 0.8))';
    button.style.color = '#fff';
    button.style.font = 'bold 14px sans-serif';
    button.style.textAlign = 'center';
    button.style.opacity = '0.9';
    button.style.outline = 'none';
    button.style.zIndex = '999';
    button.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.3)';
    button.style.transition = 'all 0.3s ease';

    if ('xr' in navigator) {
      navigator.xr.isSessionSupported('immersive-ar').then(function (supported) {
        supported ? showStartMR() : showMRNotSupported();
      }).catch(showMRNotAllowed);

      return button;
    } else {
      const message = document.createElement('a');
      message.href = 'https://immersiveweb.dev/';
      message.innerHTML = 'WEBXR NOT AVAILABLE';

      message.style.left = 'calc(50% - 90px)';
      message.style.width = '180px';
      message.style.textDecoration = 'none';

      message.style.position = 'absolute';
      message.style.bottom = '20px';
      message.style.padding = '12px 6px';
      message.style.border = '1px solid #fff';
      message.style.borderRadius = '4px';
      message.style.background = 'rgba(0,0,0,0.1)';
      message.style.color = '#fff';
      message.style.font = 'normal 13px sans-serif';
      message.style.textAlign = 'center';
      message.style.opacity = '0.5';
      message.style.outline = 'none';
      message.style.zIndex = '999';

      return message;
    }
  }
}

// MRButton helper with mesh-detection
class MRMeshButton {
  static createButton(renderer, onSessionStarted) {
    const button = document.createElement('button');

    function showStartMR() {
      let currentSession = null;

      async function onMRSessionStarted(session) {
        session.addEventListener('end', onSessionEnded);

        await renderer.xr.setSession(session);
        button.textContent = 'EXIT MR';

        currentSession = session;

        if (onSessionStarted) {
          onSessionStarted(session);
        }
      }

      function onSessionEnded() {
        currentSession.removeEventListener('end', onSessionEnded);

        button.textContent = 'ENTER MR (mesh-detection)';

        currentSession = null;
      }

      button.style.display = '';
      button.style.cursor = 'pointer';
      button.style.left = 'calc(50% - 100px)';
      button.style.width = '200px';
      button.textContent = 'ENTER MR (mesh-detection)';

      button.onmouseenter = function () {
        button.style.opacity = '1.0';
        button.style.transform = 'scale(1.05)';
      };

      button.onmouseleave = function () {
        button.style.opacity = '0.9';
        button.style.transform = 'scale(1)';
      };

      button.onclick = function () {
        if (currentSession === null) {
          const sessionInit = {
            requiredFeatures: ['mesh-detection']
          };
          navigator.xr.requestSession('immersive-ar', sessionInit).then(onMRSessionStarted);
        } else {
          currentSession.end();
        }
      };
    }

    function disableButton() {
      button.style.display = '';
      button.style.cursor = 'auto';
      button.style.left = 'calc(50% - 75px)';
      button.style.width = '150px';

      button.onmouseenter = null;
      button.onmouseleave = null;
      button.onclick = null;
    }

    function showMRNotSupported() {
      disableButton();
      button.textContent = 'MR NOT SUPPORTED';
    }

    function showMRNotAllowed() {
      disableButton();
      button.textContent = 'MR NOT ALLOWED';
    }

    button.style.position = 'absolute';
    button.style.top = 'calc(50% + 180px)';
    button.style.padding = '16px 24px';
    button.style.border = '2px solid #fff';
    button.style.borderRadius = '12px';
    button.style.background = 'linear-gradient(135deg, rgba(139, 92, 246, 0.8), rgba(168, 85, 247, 0.8))';
    button.style.color = '#fff';
    button.style.font = 'bold 14px sans-serif';
    button.style.textAlign = 'center';
    button.style.opacity = '0.9';
    button.style.outline = 'none';
    button.style.zIndex = '999';
    button.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.3)';
    button.style.transition = 'all 0.3s ease';

    if ('xr' in navigator) {
      navigator.xr.isSessionSupported('immersive-ar').then(function (supported) {
        supported ? showStartMR() : showMRNotSupported();
      }).catch(showMRNotAllowed);

      return button;
    } else {
      const message = document.createElement('a');
      message.href = 'https://immersiveweb.dev/';
      message.innerHTML = 'WEBXR NOT AVAILABLE';

      message.style.left = 'calc(50% - 90px)';
      message.style.width = '180px';
      message.style.textDecoration = 'none';

      message.style.position = 'absolute';
      message.style.bottom = '20px';
      message.style.padding = '12px 6px';
      message.style.border = '1px solid #fff';
      message.style.borderRadius = '4px';
      message.style.background = 'rgba(0,0,0,0.1)';
      message.style.color = '#fff';
      message.style.font = 'normal 13px sans-serif';
      message.style.textAlign = 'center';
      message.style.opacity = '0.5';
      message.style.outline = 'none';
      message.style.zIndex = '999';

      return message;
    }
  }
}

let camera, scene, renderer;
let cube;
let rightController;
let cubePositioned = false;
let xrSession = null;
let detectedPlanes = new Map();
let detectedMeshes = new Map();
let depthDataTexture = null;
let depthEnabled = false;
let occlusionMesh = null;
let isGrabbing = false;
let grabOffset = new THREE.Vector3();

init();
animate();

function init() {
  // シーンの作成
  scene = new THREE.Scene();

  // カメラの作成
  camera = new THREE.PerspectiveCamera(
    70,
    window.innerWidth / window.innerHeight,
    0.01,
    20
  );

  // ライトの追加
  const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
  light.position.set(0.5, 1, 0.25);
  scene.add(light);

  // キューブの作成（各面に異なる色）
  const geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);

  // 各面に異なる色のマテリアルを作成（depth-sensing用にdepthTestとdepthWriteを有効化）
  const materials = [
    new THREE.MeshStandardMaterial({
      color: 0xff0000,
      roughness: 0.7,
      metalness: 0.3,
      depthTest: true,
      depthWrite: true
    }), // 右面: 赤
    new THREE.MeshStandardMaterial({
      color: 0xff6600,
      roughness: 0.7,
      metalness: 0.3,
      depthTest: true,
      depthWrite: true
    }), // 左面: オレンジ
    new THREE.MeshStandardMaterial({
      color: 0x00ff00,
      roughness: 0.7,
      metalness: 0.3,
      depthTest: true,
      depthWrite: true
    }), // 上面: 緑
    new THREE.MeshStandardMaterial({
      color: 0x0000ff,
      roughness: 0.7,
      metalness: 0.3,
      depthTest: true,
      depthWrite: true
    }), // 下面: 青
    new THREE.MeshStandardMaterial({
      color: 0xffff00,
      roughness: 0.7,
      metalness: 0.3,
      depthTest: true,
      depthWrite: true
    }), // 前面: 黄
    new THREE.MeshStandardMaterial({
      color: 0xff00ff,
      roughness: 0.7,
      metalness: 0.3,
      depthTest: true,
      depthWrite: true
    })  // 後面: マゼンタ
  ];

  cube = new THREE.Mesh(geometry, materials);

  // レンダラーの作成
  renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.xr.enabled = true;
  renderer.xr.setReferenceSpaceType('local');
  document.body.appendChild(renderer.domElement);

  // 右手コントローラーの作成
  rightController = renderer.xr.getController(0);
  scene.add(rightController);

  // コントローラーのイベントリスナーを追加
  rightController.addEventListener('selectstart', onSelectStart);
  rightController.addEventListener('selectend', onSelectEnd);

  // キューブをシーンに追加（初期位置は原点、後でコントローラー位置から設定）
  scene.add(cube);

  // ARボタンの作成
  document.body.appendChild(
    ARButton.createButton(renderer)
  );

  // MRボタンの作成（plane-detection付き）
  document.body.appendChild(
    MRButton.createButton(renderer, onMRSessionStarted)
  );

  // MRボタンの作成（depth-sensing付き）
  document.body.appendChild(
    MRDepthButton.createButton(renderer, onMRSessionStarted)
  );

  // MRボタンの作成（mesh-detection付き）
  document.body.appendChild(
    MRMeshButton.createButton(renderer, onMRSessionStarted)
  );

  // ウィンドウリサイズ対応
  window.addEventListener('resize', onWindowResize);
}

function onMRSessionStarted(session) {
  xrSession = session;

  // depth-sensingが利用可能かチェック
  if (session.depthUsage && session.depthDataFormat) {
    depthEnabled = true;
    console.log('Depth sensing enabled:', session.depthUsage, session.depthDataFormat);
  } else {
    depthEnabled = false;
    console.log('Depth sensing not available');
  }
}

// 深度データの処理（drone-copterを参考）
function processDepthInformation(frame, referenceSpace) {
  const pose = frame.getViewerPose(referenceSpace);
  if (!pose) return;

  // WebGLバインディングを取得（GPU最適化モードの場合）
  const glBinding = frame.session.renderState.baseLayer;

  for (const view of pose.views) {
    // GPU最適化モードの場合はWebGLテクスチャとして取得
    if (glBinding && glBinding.getDepthInformation) {
      const depthInfo = glBinding.getDepthInformation(view);
      if (depthInfo) {
        // WebGLテクスチャとして深度データが利用可能
        const texture = depthInfo.texture;

        // Three.jsのWebGLTextureとして設定
        if (!depthDataTexture) {
          depthDataTexture = new THREE.Texture();
          // WebGLテクスチャを直接マッピング
          const properties = renderer.properties.get(depthDataTexture);
          properties.__webglTexture = texture;
          properties.__webglInit = true;
          depthDataTexture.needsUpdate = true;

          console.log('Depth data texture created (GPU mode):', {
            width: depthInfo.width,
            height: depthInfo.height
          });
        }
      }
    }
  }
}

function onSelectStart() {
  // コントローラーのトリガーを引いた時
  const controllerPosition = new THREE.Vector3();
  rightController.getWorldPosition(controllerPosition);

  // キューブとコントローラーの距離をチェック
  const distance = cube.position.distanceTo(controllerPosition);

  if (distance < 0.5) { // 50cm以内なら掴める
    isGrabbing = true;

    // キューブとコントローラーのオフセットを保存
    grabOffset.copy(cube.position).sub(controllerPosition);

    console.log('Grabbed cube');
  }
}

function onSelectEnd() {
  // コントローラーのトリガーを離した時
  if (isGrabbing) {
    isGrabbing = false;
    console.log('Released cube');
  }
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  renderer.setAnimationLoop(render);
}

function render() {
  // depth-sensingの処理（drone-copterを参考）
  if (xrSession && depthEnabled) {
    const frame = renderer.xr.getFrame();
    const referenceSpace = renderer.xr.getReferenceSpace();
    if (frame && referenceSpace) {
      processDepthInformation(frame, referenceSpace);
    }
  }

  // plane-detectionの処理
  if (xrSession) {
    const frame = renderer.xr.getFrame();
    if (frame) {
      const referenceSpace = renderer.xr.getReferenceSpace();
      const detectedPlanesThisFrame = frame.detectedPlanes;

      if (detectedPlanesThisFrame) {
        // 古い平面を削除
        detectedPlanes.forEach((mesh, plane) => {
          if (!detectedPlanesThisFrame.has(plane)) {
            scene.remove(mesh);
            detectedPlanes.delete(plane);
          }
        });

        // 新しい平面を追加または更新
        detectedPlanesThisFrame.forEach((plane) => {
          const pose = frame.getPose(plane.planeSpace, referenceSpace);
          if (pose) {
            let mesh = detectedPlanes.get(plane);

            if (!mesh) {
              // 新しい平面のメッシュを作成
              const geometry = new THREE.PlaneGeometry(1, 1);

              // 平面ごとに異なる色をランダムに生成
              const colors = [
                0xff0000, // 赤
                0x00ff00, // 緑
                0x0000ff, // 青
                0xffff00, // 黄
                0xff00ff, // マゼンタ
                0x00ffff, // シアン
                0xff8800, // オレンジ
                0x8800ff  // 紫
              ];
              const randomColor = colors[Math.floor(Math.random() * colors.length)];

              const material = new THREE.MeshBasicMaterial({
                color: randomColor,
                transparent: true,
                opacity: 0.5,
                side: THREE.DoubleSide
              });
              mesh = new THREE.Mesh(geometry, material);
              scene.add(mesh);
              detectedPlanes.set(plane, mesh);
            }

            // 平面の変換行列を直接適用
            const matrix = new THREE.Matrix4();
            matrix.fromArray(pose.transform.matrix);
            mesh.matrixAutoUpdate = false;
            mesh.matrix.copy(matrix);

            // 平面のサイズを更新
            if (plane.polygon && plane.polygon.length > 0) {
              // ポリゴンから境界を計算
              let minX = Infinity, maxX = -Infinity;
              let minZ = Infinity, maxZ = -Infinity;

              plane.polygon.forEach(point => {
                minX = Math.min(minX, point.x);
                maxX = Math.max(maxX, point.x);
                minZ = Math.min(minZ, point.z);
                maxZ = Math.max(maxZ, point.z);
              });

              const width = maxX - minX;
              const height = maxZ - minZ;

              // ジオメトリを再作成してポリゴン形状に合わせる
              const centerX = (minX + maxX) / 2;
              const centerZ = (minZ + maxZ) / 2;

              const geometry = new THREE.PlaneGeometry(width, height);
              geometry.rotateX(-Math.PI / 2);
              geometry.translate(centerX, centerZ, 0);
              mesh.geometry.dispose();
              mesh.geometry = geometry;
            }
          }
        });
      }

      // mesh-detectionの処理
      const detectedMeshesThisFrame = frame.detectedMeshes;

      if (detectedMeshesThisFrame) {
        // 古いメッシュを削除
        detectedMeshes.forEach((threeMesh, xrMesh) => {
          if (!detectedMeshesThisFrame.has(xrMesh)) {
            scene.remove(threeMesh);
            detectedMeshes.delete(xrMesh);
          }
        });

        // 新しいメッシュを追加または更新
        detectedMeshesThisFrame.forEach((xrMesh) => {
          const pose = frame.getPose(xrMesh.meshSpace, referenceSpace);
          if (pose) {
            let threeMesh = detectedMeshes.get(xrMesh);

            if (!threeMesh) {
              // 新しいメッシュを作成
              const geometry = new THREE.BufferGeometry();

              // メッシュの頂点データを取得
              const vertices = xrMesh.vertices;
              const indices = xrMesh.indices;

              // BufferGeometryにデータを設定
              geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
              if (indices) {
                geometry.setIndex(new THREE.Uint32BufferAttribute(indices, 1));
              }
              geometry.computeVertexNormals();

              // semanticLabelに応じて色と透明度を設定
              const label = xrMesh.semanticLabel || 'unknown';
              let color = 0x00ffaa;
              let opacity = 0.7;

              if (label === 'global mesh') {
                // global meshは薄く表示
                color = 0x444444;
                opacity = 0.15;
              } else if (label === 'table') {
                color = 0xff6b6b;
              } else if (label === 'bed') {
                color = 0x4ecdc4;
              } else if (label === 'shelf') {
                color = 0xffe66d;
              } else if (label === 'wall') {
                color = 0x95e1d3;
                opacity = 0.3;
              } else if (label === 'floor') {
                color = 0xf38181;
                opacity = 0.3;
              } else if (label === 'ceiling') {
                color = 0xaa96da;
                opacity = 0.3;
              }

              // ワイヤーフレーム表示用のマテリアル
              const material = new THREE.MeshBasicMaterial({
                color: color,
                wireframe: true,
                transparent: true,
                opacity: opacity,
                side: THREE.DoubleSide
              });

              threeMesh = new THREE.Mesh(geometry, material);
              scene.add(threeMesh);
              detectedMeshes.set(xrMesh, threeMesh);

              console.log('New mesh detected:', {
                vertexCount: vertices.length / 3,
                indexCount: indices ? indices.length : 0,
                meshSpace: xrMesh.meshSpace,
                semanticLabel: label
              });
            } else {
              // 既存のメッシュを更新
              const geometry = threeMesh.geometry;
              const vertices = xrMesh.vertices;
              const indices = xrMesh.indices;

              geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
              if (indices) {
                geometry.setIndex(new THREE.Uint32BufferAttribute(indices, 1));
              }
              geometry.computeVertexNormals();
              geometry.attributes.position.needsUpdate = true;
            }

            // メッシュの変換行列を適用
            const matrix = new THREE.Matrix4();
            matrix.fromArray(pose.transform.matrix);
            threeMesh.matrixAutoUpdate = false;
            threeMesh.matrix.copy(matrix);
          }
        });
      }
    }
  }

  // キューブを掴んでいる場合、コントローラーに追従
  if (isGrabbing && rightController) {
    const controllerPosition = new THREE.Vector3();
    rightController.getWorldPosition(controllerPosition);

    // キューブをコントローラーの位置+オフセットに移動
    cube.position.copy(controllerPosition).add(grabOffset);
  } else {
    // 掴んでいない場合、コントローラーの位置が取得できたら、その前方にキューブを配置（1回だけ）
    if (!cubePositioned && rightController) {
      const controllerPosition = new THREE.Vector3();
      rightController.getWorldPosition(controllerPosition);

      // コントローラーの位置が有効な場合（0,0,0以外）
      if (controllerPosition.length() > 0.01) {
        const controllerQuaternion = new THREE.Quaternion();
        rightController.getWorldQuaternion(controllerQuaternion);

        // コントローラーの前方ベクトルを取得
        const forward = new THREE.Vector3(0, 0, -0.3);
        forward.applyQuaternion(controllerQuaternion);

        // キューブをコントローラーの前方0.3mに配置
        cube.position.copy(controllerPosition).add(forward);
        cubePositioned = true;
      }
    }

    // キューブを回転（掴んでいない時のみ）
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
  }

  renderer.render(scene, camera);
}
