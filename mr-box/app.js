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

let camera, scene, renderer;
let cube;
let rightController;
let cubePositioned = false;
let xrSession = null;
let detectedPlanes = new Map();

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

  // 各面に異なる色のマテリアルを作成
  const materials = [
    new THREE.MeshStandardMaterial({ color: 0xff0000, roughness: 0.7, metalness: 0.3 }), // 右面: 赤
    new THREE.MeshStandardMaterial({ color: 0xff6600, roughness: 0.7, metalness: 0.3 }), // 左面: オレンジ
    new THREE.MeshStandardMaterial({ color: 0x00ff00, roughness: 0.7, metalness: 0.3 }), // 上面: 緑
    new THREE.MeshStandardMaterial({ color: 0x0000ff, roughness: 0.7, metalness: 0.3 }), // 下面: 青
    new THREE.MeshStandardMaterial({ color: 0xffff00, roughness: 0.7, metalness: 0.3 }), // 前面: 黄
    new THREE.MeshStandardMaterial({ color: 0xff00ff, roughness: 0.7, metalness: 0.3 })  // 後面: マゼンタ
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

  // ウィンドウリサイズ対応
  window.addEventListener('resize', onWindowResize);
}

function onMRSessionStarted(session) {
  xrSession = session;
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
    }
  }

  // コントローラーの位置が取得できたら、その前方にキューブを配置（1回だけ）
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

  // キューブを回転
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  renderer.render(scene, camera);
}
