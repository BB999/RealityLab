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
        button.textContent = 'STOP AR';

        currentSession = session;
      }

      function onSessionEnded() {
        currentSession.removeEventListener('end', onSessionEnded);

        button.textContent = 'START AR';

        currentSession = null;
      }

      button.style.display = '';
      button.style.cursor = 'pointer';
      button.style.left = 'calc(50% - 50px)';
      button.style.width = '100px';
      button.textContent = 'START AR';

      button.onmouseenter = function () {
        button.style.opacity = '1.0';
      };

      button.onmouseleave = function () {
        button.style.opacity = '0.5';
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
    button.style.bottom = '20px';
    button.style.padding = '12px 6px';
    button.style.border = '1px solid #fff';
    button.style.borderRadius = '4px';
    button.style.background = 'rgba(0,0,0,0.1)';
    button.style.color = '#fff';
    button.style.font = 'normal 13px sans-serif';
    button.style.textAlign = 'center';
    button.style.opacity = '0.5';
    button.style.outline = 'none';
    button.style.zIndex = '999';

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

let camera, scene, renderer;
let cube;
let rightController;
let cubePositioned = false;

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

  // ウィンドウリサイズ対応
  window.addEventListener('resize', onWindowResize);
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
