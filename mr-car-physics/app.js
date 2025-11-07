import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import * as CANNON from 'cannon-es';

// グローバル変数
let camera, scene, renderer;
let physicsWorld;
let carModel, carBody;
let controllers = [];
let hands = [];
let leftController, rightController, rightHand;
let grabbed = false;
let grabOffset = new THREE.Vector3();
let initialScale = 1;
let initialRotation = Math.PI / 2; // モデルの初期回転（90度）
let floor;

init();

function init() {
    // シーンの作成
    scene = new THREE.Scene();

    // カメラの作成
    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 20);

    // ライトの追加
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 2, 1);
    scene.add(directionalLight);

    // 物理ワールドの作成
    physicsWorld = new CANNON.World({
        gravity: new CANNON.Vec3(0, -9.82, 0)
    });

    // 床の作成（物理）
    const groundShape = new CANNON.Plane();
    const groundBody = new CANNON.Body({
        mass: 0, // 静的オブジェクト
        shape: groundShape
    });
    groundBody.quaternion.setFromEuler(-Math.PI / 2, 0, 0);
    groundBody.position.set(0, 0, 0);
    physicsWorld.addBody(groundBody);

    // 床の視覚表現（半透明グリッド）
    const gridHelper = new THREE.GridHelper(10, 20, 0x60a5fa, 0x334155);
    gridHelper.position.y = 0.01;
    scene.add(gridHelper);

    // レンダラーの作成
    renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.xr.enabled = true;
    renderer.shadowMap.enabled = true;
    document.body.appendChild(renderer.domElement);

    // 3Dモデルの読み込み
    const loader = new GLTFLoader();
    loader.load(
        '/classic_car_model.glb',
        (gltf) => {
            // グループを作成して、その中にモデルを配置
            carModel = new THREE.Group();
            const modelMesh = gltf.scene;

            // モデルだけを90度回転
            modelMesh.rotation.y = Math.PI / 2;

            carModel.add(modelMesh);

            // モデルのサイズを調整（適切なサイズに）
            const box = new THREE.Box3().setFromObject(carModel);
            const size = box.getSize(new THREE.Vector3());
            const maxSize = Math.max(size.x, size.y, size.z);
            const targetSize = 0.3; // 30cm程度に
            const scale = targetSize / maxSize;
            carModel.scale.set(scale, scale, scale);

            initialScale = scale;

            // 影を有効化
            carModel.traverse((child) => {
                if (child.isMesh) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                }
            });

            scene.add(carModel);

            // 物理ボディの作成（車用）
            const carBox = new THREE.Box3().setFromObject(carModel);
            const carSize = carBox.getSize(new THREE.Vector3());
            const carShape = new CANNON.Box(new CANNON.Vec3(
                carSize.x / 2,
                carSize.y / 2,
                carSize.z / 2
            ));

            carBody = new CANNON.Body({
                mass: 5, // 5kg
                shape: carShape,
                linearDamping: 0.3,
                angularDamping: 0.9
            });

            // 回転を制限（X軸とZ軸の回転を固定、Y軸のみ回転可能）
            carBody.angularFactor = new CANNON.Vec3(0, 1, 0);

            // 初期位置は後でコントローラーから設定
            carBody.position.set(0, 1.5, -1);
            physicsWorld.addBody(carBody);

            console.log('車のモデルを読み込みました');
        },
        (progress) => {
            console.log('読み込み中:', (progress.loaded / progress.total * 100).toFixed(2) + '%');
        },
        (error) => {
            console.error('モデルの読み込みに失敗しました:', error);
        }
    );

    // MR開始ボタンのイベントリスナー
    const startButton = document.getElementById('startButton');

    // WebXRサポートチェック
    if ('xr' in navigator) {
        navigator.xr.isSessionSupported('immersive-ar').then((supported) => {
            console.log('WebXR immersive-ar サポート:', supported);
            if (supported) {
                startButton.addEventListener('click', onStartButtonClick);
            } else {
                startButton.textContent = 'MRは非対応です';
                startButton.disabled = true;
            }
        }).catch((error) => {
            console.error('WebXRサポートチェックエラー:', error);
            startButton.textContent = 'WebXRエラー';
            startButton.disabled = true;
        });
    } else {
        console.log('navigator.xrが存在しません');
        startButton.textContent = 'WebXRは非対応です';
        startButton.disabled = true;
    }

    // ウィンドウリサイズ対応
    window.addEventListener('resize', onWindowResize);

    // アニメーションループ
    renderer.setAnimationLoop(render);
}

function onStartButtonClick() {
    // MRセッションの開始
    const sessionInit = {
        requiredFeatures: ['local-floor'],
        optionalFeatures: ['hand-tracking', 'dom-overlay'],
        domOverlay: { root: document.body }
    };

    navigator.xr.requestSession('immersive-ar', sessionInit)
        .then(onSessionStarted)
        .catch((error) => {
            console.error('MRセッション開始エラー:', error);
            alert('MRセッションを開始できませんでした: ' + error.message);
        });
}

function onSessionStarted(session) {
    session.addEventListener('end', onSessionEnded);
    renderer.xr.setSession(session);

    // UIを非表示
    document.getElementById('info').style.display = 'none';

    // コントローラーのセットアップ
    setupControllers();

    // ハンドトラッキングのセットアップ
    setupHands();
}

function setupControllers() {
    // 右コントローラー（インデックス1）
    rightController = renderer.xr.getController(1);
    rightController.addEventListener('selectstart', onRightSelectStart);
    rightController.addEventListener('selectend', onRightSelectEnd);
    rightController.addEventListener('squeezestart', onSqueezeStart);
    rightController.addEventListener('squeezeend', onSqueezeEnd);
    scene.add(rightController);

    // 左コントローラー（インデックス0）
    leftController = renderer.xr.getController(0);
    leftController.addEventListener('selectstart', onLeftSelectStart);
    leftController.addEventListener('selectend', onLeftSelectEnd);
    scene.add(leftController);

    controllers.push(leftController, rightController);

    // コントローラーの視覚表現
    const controllerModelFactory = new THREE.Group();
    const geometry = new THREE.SphereGeometry(0.02, 16, 16);
    const material = new THREE.MeshStandardMaterial({ color: 0x60a5fa });

    controllers.forEach((controller) => {
        const mesh = new THREE.Mesh(geometry, material);
        controller.add(mesh);
    });
}

function setupHands() {
    // 右手
    rightHand = renderer.xr.getHand(1);
    scene.add(rightHand);

    // 左手
    const leftHand = renderer.xr.getHand(0);
    scene.add(leftHand);

    hands.push(leftHand, rightHand);
}

let isGrabbing = false;
let previousControllerPosition = new THREE.Vector3();
let controllerVelocity = new THREE.Vector3();
let isScalingUp = false;   // 右コントローラーで拡大
let isScalingDown = false; // 左コントローラーで縮小
let currentScale = 1;
const scaleSpeed = 0.5; // スケール変更速度（1秒あたり）
const minScale = 0.1;
const maxScale = 5.0;

function onRightSelectStart(event) {
    // 右トリガーで拡大開始
    if (carModel && !grabbed) {
        isScalingUp = true;
    }
}

function onRightSelectEnd(event) {
    // 右トリガー離したら拡大停止
    if (carModel && !grabbed) {
        isScalingUp = false;
    }
}

function onLeftSelectStart(event) {
    // 左トリガーで縮小開始
    if (carModel && !grabbed) {
        isScalingDown = true;
    }
}

function onLeftSelectEnd(event) {
    // 左トリガー離したら縮小停止
    if (carModel && !grabbed) {
        isScalingDown = false;
    }
}

function onSqueezeStart(event) {
    // グリップで掴む
    const controller = event.target;

    if (carModel && !grabbed) {
        grabbed = true;
        isGrabbing = true;

        // 掴んだ時の相対位置を記録
        const controllerPosition = new THREE.Vector3();
        controller.getWorldPosition(controllerPosition);
        grabOffset.copy(carModel.position).sub(controllerPosition);

        previousControllerPosition.copy(controllerPosition);

        // 物理を一時停止（掴んでいる間は物理シミュレーションを止める）
        if (carBody) {
            carBody.mass = 0;
            carBody.updateMassProperties();
            carBody.velocity.set(0, 0, 0);
            carBody.angularVelocity.set(0, 0, 0);
        }

        console.log('車を掴みました');
    }
}

function onSqueezeEnd(event) {
    // グリップ離したら車を放す
    if (grabbed) {
        grabbed = false;

        // 物理を再開
        if (carBody) {
            carBody.mass = 5;
            carBody.updateMassProperties();

            // コントローラーの速度を車に適用
            carBody.velocity.set(
                controllerVelocity.x,
                controllerVelocity.y,
                controllerVelocity.z
            );
        }

        isGrabbing = false;
        console.log('車を離しました');
    }
}

function onSessionEnded() {
    // UIを再表示
    document.getElementById('info').style.display = 'flex';
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

const timeStep = 1 / 60;
let lastCallTime = Date.now();

function render() {
    const now = Date.now();
    const deltaTime = (now - lastCallTime) / 1000;
    lastCallTime = now;

    // 物理シミュレーションの更新
    if (physicsWorld) {
        physicsWorld.step(timeStep, deltaTime, 3);
    }

    // スケール処理（トリガーを押している間）
    if ((isScalingUp || isScalingDown) && carModel && !grabbed) {
        // 拡大または縮小
        if (isScalingUp) {
            currentScale += scaleSpeed * deltaTime;
        }
        if (isScalingDown) {
            currentScale -= scaleSpeed * deltaTime;
        }

        currentScale = Math.max(minScale, Math.min(maxScale, currentScale));
        const newScale = initialScale * currentScale;
        carModel.scale.set(newScale, newScale, newScale);

        // 物理ボディのスケールも更新
        if (carBody) {
            const carBox = new THREE.Box3().setFromObject(carModel);
            const carSize = carBox.getSize(new THREE.Vector3());
            carBody.shapes[0].halfExtents.set(
                carSize.x / 2,
                carSize.y / 2,
                carSize.z / 2
            );
            carBody.updateBoundingRadius();
        }
    }

    // 車の初期位置設定（右コントローラーまたは右手の位置）
    if (carModel && carBody && !carBody.position.y) {
        let spawnPosition = new THREE.Vector3(0, 1.5, -1);

        // 右コントローラーの位置を取得
        if (rightController) {
            const controllerPos = new THREE.Vector3();
            rightController.getWorldPosition(controllerPos);
            if (controllerPos.length() > 0.1) {
                spawnPosition.copy(controllerPos);
            }
        }
        // または右手の位置を取得
        else if (rightHand && rightHand.joints && rightHand.joints['wrist']) {
            const wrist = rightHand.joints['wrist'];
            const wristPos = new THREE.Vector3();
            wrist.getWorldPosition(wristPos);
            if (wristPos.length() > 0.1) {
                spawnPosition.copy(wristPos);
            }
        }

        carBody.position.set(spawnPosition.x, spawnPosition.y, spawnPosition.z);
        carModel.position.copy(spawnPosition);
    }

    // 掴んでいる時の処理
    if (grabbed && rightController && carModel && carBody) {
        const controllerPosition = new THREE.Vector3();
        rightController.getWorldPosition(controllerPosition);

        // 新しい位置を計算
        const newPosition = controllerPosition.clone().add(grabOffset);

        // 速度を計算
        controllerVelocity.copy(controllerPosition).sub(previousControllerPosition).divideScalar(0.016);
        previousControllerPosition.copy(controllerPosition);

        // 車の位置を更新
        carModel.position.copy(newPosition);
        carBody.position.set(newPosition.x, newPosition.y, newPosition.z);
    }
    // 掴んでいない時は物理エンジンに従う
    else if (carModel && carBody && carBody.mass > 0) {
        // コントローラーのスティック入力で車を動かす
        const session = renderer.xr.getSession();
        if (session) {
            let forwardInput = 0;
            let steerInput = 0;

            for (const source of session.inputSources) {
                if (source.gamepad && source.gamepad.axes.length >= 4) {
                    const axes = source.gamepad.axes;
                    const threshold = 0.1;

                    // 右コントローラー: スティック上下で前進・後退
                    if (source.handedness === 'right') {
                        // axes[3]が上下（上: -1, 下: +1）→ 反転させる
                        forwardInput = Math.abs(axes[3]) > threshold ? axes[3] : 0;
                    }

                    // 左コントローラー: スティック左右で方向転換
                    if (source.handedness === 'left') {
                        // axes[2]が左右（左: -1, 右: +1）
                        steerInput = Math.abs(axes[2]) > threshold ? axes[2] : 0;
                    }
                }
            }

            // 車の移動と回転を適用
            if (forwardInput !== 0 || steerInput !== 0) {
                const moveSpeed = 2.0; // 移動速度
                const turnSpeed = 2.0; // 回転速度

                // 物理ボディの向きを基準に前進・後退
                const euler = new THREE.Euler();
                euler.setFromQuaternion(new THREE.Quaternion(
                    carBody.quaternion.x,
                    carBody.quaternion.y,
                    carBody.quaternion.z,
                    carBody.quaternion.w
                ), 'YXZ');

                const carRotation = euler.y;
                const direction = new THREE.Vector3(
                    Math.sin(carRotation) * forwardInput,
                    0,
                    Math.cos(carRotation) * forwardInput
                );

                carBody.velocity.x = direction.x * moveSpeed;
                carBody.velocity.z = direction.z * moveSpeed;

                // 方向転換（Y軸回転）
                if (steerInput !== 0) {
                    carBody.angularVelocity.y = steerInput * turnSpeed;
                } else {
                    carBody.angularVelocity.y = 0;
                }
            } else {
                // スティックを離したら停止
                carBody.velocity.x *= 0.9;
                carBody.velocity.z *= 0.9;
                carBody.angularVelocity.y = 0;
            }
        }

        carModel.position.set(
            carBody.position.x,
            carBody.position.y,
            carBody.position.z
        );

        // Y軸の回転のみを適用（車が転がらないように）
        const euler = new THREE.Euler();
        euler.setFromQuaternion(new THREE.Quaternion(
            carBody.quaternion.x,
            carBody.quaternion.y,
            carBody.quaternion.z,
            carBody.quaternion.w
        ), 'YXZ');

        // X軸とZ軸の回転をリセット
        euler.x = 0;
        euler.z = 0;

        carModel.quaternion.setFromEuler(euler);
    }

    renderer.render(scene, camera);
}
