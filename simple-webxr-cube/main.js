import * as THREE from 'three';

let container;
let camera, scene, renderer;
let cube;
let controller1, controller2;

// キューブの移動速度
let verticalSpeed = 0;
let forwardSpeed = 0;

// キューブの位置
let cubePosition = new THREE.Vector3(0, 1.5, -1);

// フレームレート管理
let clock = new THREE.Clock();

init();
animate();

function init() {
    container = document.getElementById('container');

    // シーンの作成
    scene = new THREE.Scene();

    // カメラの作成
    camera = new THREE.PerspectiveCamera(
        50,
        window.innerWidth / window.innerHeight,
        0.1,
        100
    );
    camera.position.set(0, 1.6, 0);

    // ライトの設定
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 2, 3);
    scene.add(directionalLight);

    // キューブの作成
    const geometry = new THREE.BoxGeometry(0.3, 0.3, 0.3);
    const material = new THREE.MeshStandardMaterial({
        color: 0x00d4ff,
        metalness: 0.5,
        roughness: 0.5
    });
    cube = new THREE.Mesh(geometry, material);
    cube.position.copy(cubePosition);
    scene.add(cube);

    // レンダラーの作成
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.xr.enabled = true;

    // Depth Sensing の設定
    renderer.xr.setFramebufferScaleFactor(2.0);

    container.appendChild(renderer.domElement);

    // MRボタンの作成
    const button = document.createElement('button');
    button.id = 'MRButton';
    button.textContent = 'ENTER MR';
    button.style.cssText = `
        position: absolute;
        bottom: 60px;
        left: 50%;
        transform: translateX(-50%);
        padding: 15px 40px;
        font-size: 1.2em;
        background: #00d4ff;
        color: white;
        border: none;
        border-radius: 30px;
        cursor: pointer;
        z-index: 100;
        box-shadow: 0 5px 20px rgba(0, 212, 255, 0.4);
    `;

    button.onclick = async function() {
        if (navigator.xr) {
            try {
                const session = await navigator.xr.requestSession('immersive-ar', {
                    requiredFeatures: ['local-floor'],
                    optionalFeatures: ['hand-tracking', 'layers', 'bounded-floor', 'hit-test', 'depth-sensing'],
                    depthSensing: {
                        usagePreference: ['cpu-optimized', 'gpu-optimized'],
                        dataFormatPreference: ['luminance-alpha', 'float32']
                    }
                });

                session.addEventListener('end', onSessionEnded);
                await renderer.xr.setSession(session);
                button.textContent = 'EXIT MR';

                console.log('MRセッション開始 - Depth Sensing有効');
            } catch (error) {
                console.error('MRセッション開始エラー:', error);
            }
        }
    };

    function onSessionEnded() {
        button.textContent = 'ENTER MR';
    }

    document.body.appendChild(button);

    // コントローラーの設定
    controller1 = renderer.xr.getController(0); // 左手
    scene.add(controller1);

    controller2 = renderer.xr.getController(1); // 右手
    scene.add(controller2);

    // コントローラーの接続イベント
    controller1.addEventListener('connected', function(event) {
        console.log('左コントローラー接続:', event.data.handedness);
    });

    controller2.addEventListener('connected', function(event) {
        console.log('右コントローラー接続:', event.data.handedness);
    });

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
    const deltaTime = clock.getDelta();

    // MRモード時のコントローラー入力処理
    if (renderer.xr.isPresenting && cube) {
        // 速度をリセット
        forwardSpeed = 0;
        verticalSpeed = 0;

        const session = renderer.xr.getSession();
        if (session && session.inputSources) {
            const inputSources = session.inputSources;

            for (let i = 0; i < inputSources.length; i++) {
                const inputSource = inputSources[i];

                if (!inputSource) continue;

                const gamepad = inputSource.gamepad;

                if (!gamepad || !gamepad.axes) continue;

                if (gamepad.axes.length < 4) {
                    continue;
                }

                if (inputSource.handedness === 'left') {
                    // 左コントローラー: 上下で上昇/下降
                    const leftVertical = -gamepad.axes[3] || 0;
                    verticalSpeed = leftVertical * 0.02;
                } else if (inputSource.handedness === 'right') {
                    // 右コントローラー: 上下で前進/後退
                    const rightVertical = -gamepad.axes[3] || 0;
                    forwardSpeed = rightVertical * 0.02;
                }
            }
        }

        // キューブの位置を更新
        cubePosition.y += verticalSpeed;
        cubePosition.z += forwardSpeed;

        // 位置の制限
        cubePosition.y = Math.max(0.5, Math.min(3.0, cubePosition.y));
        cubePosition.z = Math.max(-3.0, Math.min(0.5, cubePosition.z));

        cube.position.copy(cubePosition);

        // キューブを回転させる（視覚的効果）
        cube.rotation.x += deltaTime * 0.5;
        cube.rotation.y += deltaTime * 0.7;
    }

    renderer.render(scene, camera);
}
