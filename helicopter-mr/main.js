import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { VRButton } from 'three/examples/jsm/webxr/VRButton.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

let container;
let camera, scene, renderer;
let helicopter;
let rotor1;
let rotor2;
let controller1, controller2;
let controls;

// ヘリコプターの移動速度と回転
let helicopterVelocity = new THREE.Vector3();
let helicopterRotation = 0;
let forwardSpeed = 0;
let verticalSpeed = 0;

// 浮遊感のためのパラメータ
let hoverTime = 0;
let hoverBaseY = 0;

// 慣性のためのパラメータ
let currentForwardSpeed = 0;
let currentVerticalSpeed = 0;
let currentRotationSpeed = 0;
let targetRotationSpeed = 0; // 目標回転速度

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
    camera.position.set(0, 1.6, 3);

    // ライトの設定
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 2, 3);
    scene.add(directionalLight);

    // レンダラーの作成
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.xr.enabled = true;
    container.appendChild(renderer.domElement);

    // MRボタンの作成
    const button = document.createElement('button');
    button.id = 'MRButton';
    button.textContent = 'ENTER MR';
    button.style.cssText = `
        position: absolute;
        bottom: 20px;
        padding: 12px 24px;
        border: 1px solid white;
        border-radius: 4px;
        background: rgba(0, 0, 0, 0.8);
        color: white;
        font: normal 13px sans-serif;
        text-align: center;
        cursor: pointer;
        outline: none;
        z-index: 999;
    `;

    button.onmouseenter = function() {
        button.style.background = 'rgba(0, 0, 0, 1)';
    };
    button.onmouseleave = function() {
        button.style.background = 'rgba(0, 0, 0, 0.8)';
    };

    button.onclick = function() {
        if (navigator.xr) {
            navigator.xr.requestSession('immersive-ar', {
                requiredFeatures: ['local-floor'],
                optionalFeatures: ['hand-tracking', 'layers', 'bounded-floor', 'depth-sensing', 'hit-test']
            }).then(function(session) {
                session.addEventListener('end', onSessionEnded);
                renderer.xr.setSession(session);
                button.textContent = 'EXIT MR';
            });
        }
    };

    function onSessionEnded() {
        button.textContent = 'ENTER MR';
    }

    document.body.appendChild(button);
    document.getElementById('startButton').style.display = 'none';

    // コントローラーの設定
    controller1 = renderer.xr.getController(0); // 左手
    scene.add(controller1);

    controller2 = renderer.xr.getController(1); // 右手
    scene.add(controller2);

    // コントローラーの入力イベント
    controller1.addEventListener('connected', function(event) {
        console.log('左コントローラー接続');
    });

    controller2.addEventListener('connected', function(event) {
        console.log('右コントローラー接続');
    });

    // OrbitControlsの追加（非VRモード用）
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.minDistance = 0;
    controls.maxDistance = Infinity;
    controls.target.set(0, 1.5, -2);
    controls.update();

    // GLTFローダーでヘリコプターモデルを読み込み
    const loader = new GLTFLoader();
    loader.load(
        './ヘリ.glb',
        function (gltf) {
            helicopter = gltf.scene;
            helicopter.position.set(0, 1.5, -2);
            helicopter.scale.set(0.5, 0.5, 0.5);
            scene.add(helicopter);

            // rotor1とrotor2を探して保持
            helicopter.traverse((child) => {
                if (child.name === 'puro1') {
                    rotor1 = child;
                    console.log('puro1を発見:', rotor1);
                }
                if (child.name === 'puro2') {
                    rotor2 = child;
                    console.log('puro2を発見:', rotor2);

                    // puro2のジオメトリの中心を計算して、その中心で回転するように調整
                    if (rotor2.geometry) {
                        rotor2.geometry.computeBoundingBox();
                        const boundingBox = rotor2.geometry.boundingBox;
                        const center = new THREE.Vector3();
                        boundingBox.getCenter(center);

                        // ジオメトリを中心に移動
                        rotor2.geometry.translate(-center.x, -center.y, -center.z);

                        // オブジェクトの位置を元の中心位置に戻す
                        rotor2.position.add(center);

                        console.log('puro2の中心を調整:', center);
                    }
                }
            });

            console.log('ヘリコプターモデル読み込み完了');
        },
        function (xhr) {
            console.log((xhr.loaded / xhr.total * 100) + '% loaded');
        },
        function (error) {
            console.error('モデルの読み込みエラー:', error);
        }
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
    // OrbitControlsの更新（非VRモード時のみ）
    if (!renderer.xr.isPresenting && controls) {
        controls.update();
    }

    // MRモード時のコントローラー入力処理
    if (renderer.xr.isPresenting && helicopter) {
        // NaNチェックと修正
        if (isNaN(helicopter.position.x) || isNaN(helicopter.position.y) || isNaN(helicopter.position.z)) {
            console.error('ヘリコプターの座標がNaNになりました。リセットします。');
            helicopter.position.set(0, 1.5, -2);
            helicopterRotation = 0;
        }

        // 速度をリセット（スティック入力がない時は停止）
        forwardSpeed = 0;
        verticalSpeed = 0;
        targetRotationSpeed = 0; // 回転速度もリセット

        const session = renderer.xr.getSession();
        if (session) {
            const inputSources = session.inputSources;

            for (let i = 0; i < inputSources.length; i++) {
                const inputSource = inputSources[i];
                const gamepad = inputSource.gamepad;

                if (gamepad && gamepad.axes && gamepad.axes.length >= 4) {
                    if (inputSource.handedness === 'left') {
                        // 左コントローラー: 上下で上昇/下降、左右で旋回
                        const leftVertical = -gamepad.axes[3] || 0; // スティック上下（上が正）
                        const leftHorizontal = -gamepad.axes[2] || 0; // スティック左右（符号を反転）

                        if (!isNaN(leftVertical)) {
                            verticalSpeed = leftVertical * 0.01;
                        }
                        if (!isNaN(leftHorizontal)) {
                            // 直接回転を変更するのではなく、目標回転速度を設定
                            targetRotationSpeed = leftHorizontal * 0.02;
                        }
                    } else if (inputSource.handedness === 'right') {
                        // 右コントローラー: 上下で前進/後退
                        const rightVertical = gamepad.axes[3] || 0; // スティック上下（符号を反転）
                        if (!isNaN(rightVertical)) {
                            forwardSpeed = rightVertical * 0.01;
                        }
                    }
                }
            }
        }

        // 慣性を適用（滑らかな加速・減速）
        const lerpFactor = 0.01; // 補間係数（小さいほど滑らか）
        const decelerationFactor = 0.98; // 減速時の減衰率

        // 前進速度の慣性（イージングを使用）
        if (forwardSpeed !== 0) {
            // 加速時：目標速度に向かって滑らかに補間
            currentForwardSpeed += (forwardSpeed - currentForwardSpeed) * lerpFactor;
        } else {
            // 減速時：減衰
            currentForwardSpeed *= decelerationFactor;
            if (Math.abs(currentForwardSpeed) < 0.0001) currentForwardSpeed = 0;
        }

        // 上昇速度の慣性（イージングを使用）
        if (verticalSpeed !== 0) {
            currentVerticalSpeed += (verticalSpeed - currentVerticalSpeed) * lerpFactor;
        } else {
            currentVerticalSpeed *= decelerationFactor;
            if (Math.abs(currentVerticalSpeed) < 0.0001) currentVerticalSpeed = 0;
        }

        // 回転速度の慣性（イージングを使用）
        if (targetRotationSpeed !== 0) {
            // 加速時：目標回転速度に向かって滑らかに補間
            currentRotationSpeed += (targetRotationSpeed - currentRotationSpeed) * lerpFactor;
        } else {
            // 減速時：減衰
            currentRotationSpeed *= decelerationFactor;
            if (Math.abs(currentRotationSpeed) < 0.0001) currentRotationSpeed = 0;
        }
        helicopterRotation += currentRotationSpeed;

        // ヘリコプターの回転を適用
        helicopter.rotation.y = helicopterRotation;

        // 前進方向を計算（ヘリコプターの向きに基づく）
        const forward = new THREE.Vector3(
            -Math.cos(helicopterRotation),
            0,
            Math.sin(helicopterRotation)
        );

        // 位置を更新（慣性を適用した速度を使用）
        hoverBaseY += currentVerticalSpeed;
        helicopter.position.x += forward.x * currentForwardSpeed;
        helicopter.position.z += forward.z * currentForwardSpeed;

        // 浮遊感の演出（上下に揺れる）
        hoverTime += 0.05;
        const hoverOffset = Math.sin(hoverTime) * 0.01; // 1cmの揺れ
        const hoverTiltX = Math.sin(hoverTime * 0.7) * 0.04; // 左右の微細な揺れ
        const hoverTiltZ = Math.cos(hoverTime * 0.5) * 0.02; // 前後の微細な揺れ

        // 前進・後退による傾き
        const speedTilt = currentForwardSpeed * 30; // 速度に応じた傾き（前進で前傾、後退で後傾）

        helicopter.position.y = hoverBaseY + hoverOffset;
        helicopter.rotation.x = speedTilt + hoverTiltX; // 前後の傾き + 浮遊感の揺れ
        helicopter.rotation.z = hoverTiltZ;

        // デバッグ: NaNチェック
        if (isNaN(forward.x) || isNaN(forward.z) || isNaN(forwardSpeed)) {
            console.error('移動計算でNaN発生!',
                'forward.x:', forward.x, 'forward.z:', forward.z,
                'forwardSpeed:', forwardSpeed, 'helicopterRotation:', helicopterRotation);
        }

        // 位置の制限（カメラから離れすぎないように）
        const maxDistance = 10; // カメラから最大10mまで
        const distanceFromCamera = helicopter.position.distanceTo(camera.position);
        if (!isNaN(distanceFromCamera) && distanceFromCamera > maxDistance && distanceFromCamera > 0) {
            // カメラ方向に戻す
            const direction = new THREE.Vector3().subVectors(camera.position, helicopter.position);
            if (direction.length() > 0) {
                direction.normalize();
                helicopter.position.addScaledVector(direction, distanceFromCamera - maxDistance);
            }
        }

        // Y座標も制限（hoverBaseYを制限）
        hoverBaseY = Math.max(0.3, Math.min(5.0, hoverBaseY));

        // 最終的なNaNチェック
        if (isNaN(helicopter.position.x) || isNaN(helicopter.position.y) || isNaN(helicopter.position.z)) {
            console.error('計算後もNaN! 強制的に初期位置に戻します');
            helicopter.position.set(0, 1.5, -2);
            hoverBaseY = 1.5;
        }

        // デバッグログ（100フレームに1回程度）
        if (Math.random() < 0.01) {
            console.log('ヘリ:',
                'pos(', helicopter.position.x.toFixed(2), helicopter.position.y.toFixed(2), helicopter.position.z.toFixed(2), ')',
                'rot:', helicopterRotation.toFixed(2));
        }
    }

    // プロペラを回転させる
    if (rotor1) {
        rotor1.rotation.y += 0.3;
    }
    if (rotor2) {
        rotor2.rotation.z += 0.3;
    }

    renderer.render(scene, camera);
}
