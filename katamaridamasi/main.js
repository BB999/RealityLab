import * as THREE from 'three';
import * as CANNON from 'cannon-es';

// --- 設定 ---
const START_SIZE = 0.025; // 1.0 → 0.1 → 0.05 → 0.025 (さらに1/2)
let currentSize = START_SIZE;
const WORLD_GRAVITY = -2.0; // ゆっくりとした落下速度
const FLOOR_SIZE = 30; // 300 → 30 (10分の1)

// ゲーム状態
let gameStarted = false;
let setupMode = true; // セットアップモード（キャラクター配置モード）

// コントローラー
let controller1, controller2;
let inputX = 0;
let inputZ = 0;

// 3Dスタートボタン
let startButton3D = null;
let startButtonText = null;

// --- Three.js 初期化 ---
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87CEEB);
scene.fog = new THREE.Fog(0x87CEEB, 2, 15); // 20, 150 → 2, 15 (10分の1)

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 2, 3); // 0, 20, 30 → 0, 2, 3 (10分の1)

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.xr.enabled = true;
renderer.xr.setFramebufferScaleFactor(2.0);
document.body.appendChild(renderer.domElement);

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
controller1 = renderer.xr.getController(0);
scene.add(controller1);

controller2 = renderer.xr.getController(1);
scene.add(controller2);

controller1.addEventListener('connected', function(event) {
    console.log('左コントローラー接続:', event.data.handedness);
});

controller2.addEventListener('connected', function(event) {
    console.log('右コントローラー接続:', event.data.handedness);
});

// コントローラーのボタンイベント
controller1.addEventListener('selectstart', onControllerSelect);
controller2.addEventListener('selectstart', onControllerSelect);

function onControllerSelect(event) {
    if (setupMode && startButton3D) {
        // スタートボタンとコントローラーの距離をチェック
        const controller = event.target;
        const distance = controller.position.distanceTo(startButton3D.position);

        if (distance < 0.3) { // 30cm以内ならボタン押下
            startGame();
        }
    }
}

function startGame() {
    console.log('ゲーム開始！');
    gameStarted = true;
    setupMode = false;

    // スタートボタンを削除
    if (startButton3D) {
        scene.remove(startButton3D);
        startButton3D = null;
    }

    // 塊の物理を有効化
    ballBody.type = CANNON.Body.DYNAMIC;
    ballBody.mass = 100; // 質量を大きくして衝突の影響を受けにくくする
    ballBody.updateMassProperties();

    // オブジェクトの生成を開始
    startObjectSpawning();
}

// --- 照明 ---
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

const dirLight = new THREE.DirectionalLight(0xffffff, 1);
dirLight.position.set(5, 10, 5); // 50, 100, 50 → 5, 10, 5 (10分の1)
dirLight.castShadow = true;
dirLight.shadow.mapSize.width = 2048;
dirLight.shadow.mapSize.height = 2048;
dirLight.shadow.camera.left = -10; // -100 → -10 (10分の1)
dirLight.shadow.camera.right = 10; // 100 → 10 (10分の1)
dirLight.shadow.camera.top = 10; // 100 → 10 (10分の1)
dirLight.shadow.camera.bottom = -10; // -100 → -10 (10分の1)
scene.add(dirLight);

// --- 物理エンジン ---
const world = new CANNON.World();
world.gravity.set(0, WORLD_GRAVITY, 0);
world.broadphase = new CANNON.NaiveBroadphase();
world.solver.iterations = 20;

const physicsMaterial = new CANNON.Material('physics');
const physics_physics = new CANNON.ContactMaterial(physicsMaterial, physicsMaterial, {
    friction: 0.9,
    restitution: 0.0, // 跳ね返りをゼロに（衝突時の速度変化を最小化）
});
world.addContactMaterial(physics_physics);

// --- 地面 ---
// 視覚的な地面メッシュは削除（MRモードで不要）
// const floorGeo = new THREE.PlaneGeometry(FLOOR_SIZE, FLOOR_SIZE);
// const floorMat = new THREE.MeshStandardMaterial({ color: 0x228B22 });
// const floorMesh = new THREE.Mesh(floorGeo, floorMat);
// floorMesh.receiveShadow = true;
// floorMesh.rotation.x = -Math.PI / 2;
// scene.add(floorMesh);

// 物理演算用の地面は残す
const floorBody = new CANNON.Body({
    type: CANNON.Body.STATIC,
    shape: new CANNON.Plane(),
    material: physicsMaterial
});
floorBody.quaternion.setFromEuler(-Math.PI / 2, 0, 0);
world.addBody(floorBody);

// --- プレイヤー（塊） ---
const ballGeo = new THREE.SphereGeometry(START_SIZE, 32, 32);
const canvas = document.createElement('canvas');
canvas.width = 128; canvas.height = 128;
const ctx = canvas.getContext('2d');
ctx.fillStyle = '#FFD700'; ctx.fillRect(0,0,128,128);
ctx.fillStyle = '#FF4500'; ctx.fillRect(0,0,64,64); ctx.fillRect(64,64,64,64);
const ballTexture = new THREE.CanvasTexture(canvas);

const ballMat = new THREE.MeshStandardMaterial({ map: ballTexture, roughness: 0.7 });
const ballMesh = new THREE.Mesh(ballGeo, ballMat);
ballMesh.castShadow = true;
scene.add(ballMesh);

const ballShape = new CANNON.Sphere(START_SIZE);
const ballBody = new CANNON.Body({
    mass: 0, // セットアップモードでは物理無効（質量0）
    shape: ballShape,
    position: new CANNON.Vec3(0, START_SIZE, 0), // ボールの半径分の高さ（地面に接地）
    material: physicsMaterial,
    angularDamping: 0.99,
    linearDamping: 0.9,
    type: CANNON.Body.KINEMATIC, // キネマティックボディに設定
});
world.addBody(ballBody);

// --- 王子（キャラクター） ---
const princeGroup = new THREE.Group();
const princeParts = {};

function createPrince() {
    // 頭
    const headGeo = new THREE.CylinderGeometry(0.015, 0.015, 0.06, 16); // 10分の1
    const headMat = new THREE.MeshStandardMaterial({ color: 0x00FF00 });
    const head = new THREE.Mesh(headGeo, headMat);
    head.rotation.z = Math.PI / 2;
    head.position.y = 0.08; // 10分の1
    head.castShadow = true;
    princeGroup.add(head);

    // 顔
    const faceGeo = new THREE.CylinderGeometry(0.016, 0.016, 0.02, 16); // 10分の1
    const faceMat = new THREE.MeshStandardMaterial({ color: 0x4B0082 });
    const face = new THREE.Mesh(faceGeo, faceMat);
    face.rotation.z = Math.PI / 2;
    face.position.y = 0.08; // 10分の1
    princeGroup.add(face);

    // アンテナ
    const antGeo = new THREE.CylinderGeometry(0.002, 0.002, 0.02); // 10分の1
    const antMat = new THREE.MeshStandardMaterial({ color: 0xFF0000 });
    const ant = new THREE.Mesh(antGeo, antMat);
    ant.position.y = 0.1; // 10分の1
    const antBall = new THREE.Mesh(new THREE.SphereGeometry(0.005), antMat); // 10分の1
    antBall.position.y = 0.11; // 10分の1
    princeGroup.add(ant);
    princeGroup.add(antBall);

    // 体
    const bodyGeo = new THREE.BoxGeometry(0.02, 0.03, 0.015); // 10分の1
    const bodyMat = new THREE.MeshStandardMaterial({ color: 0x00FF00 });
    const body = new THREE.Mesh(bodyGeo, bodyMat);
    body.position.y = 0.05; // 10分の1
    body.castShadow = true;
    princeGroup.add(body);

    // 足
    const legGeo = new THREE.BoxGeometry(0.008, 0.03, 0.008); // 10分の1
    const legMat = new THREE.MeshStandardMaterial({ color: 0x4B0082 });

    const lLegGroup = new THREE.Group();
    lLegGroup.position.set(-0.006, 0.035, 0); // 10分の1
    const leftLeg = new THREE.Mesh(legGeo, legMat);
    leftLeg.position.set(0, -0.015, 0); // 10分の1
    lLegGroup.add(leftLeg);
    princeGroup.add(lLegGroup);

    const rLegGroup = new THREE.Group();
    rLegGroup.position.set(0.006, 0.035, 0); // 10分の1
    const rightLeg = new THREE.Mesh(legGeo, legMat);
    rightLeg.position.set(0, -0.015, 0); // 10分の1
    rLegGroup.add(rightLeg);
    princeGroup.add(rLegGroup);

    // 腕
    const armGeo = new THREE.BoxGeometry(0.006, 0.03, 0.006); // 10分の1
    const lArmGroup = new THREE.Group();
    lArmGroup.position.set(-0.014, 0.06, 0); // 10分の1
    const leftArm = new THREE.Mesh(armGeo, bodyMat);
    leftArm.position.set(0, -0.015, 0); // 10分の1
    lArmGroup.add(leftArm);
    princeGroup.add(lArmGroup);

    const rArmGroup = new THREE.Group();
    rArmGroup.position.set(0.014, 0.06, 0); // 10分の1
    const rightArm = new THREE.Mesh(armGeo, bodyMat);
    rightArm.position.set(0, -0.015, 0); // 10分の1
    rArmGroup.add(rightArm);
    princeGroup.add(rArmGroup);

    lArmGroup.rotation.x = -Math.PI / 3;
    rArmGroup.rotation.x = -Math.PI / 3;

    princeParts.lLeg = lLegGroup;
    princeParts.rLeg = rLegGroup;
    princeParts.lArm = lArmGroup;
    princeParts.rArm = rArmGroup;

    princeGroup.scale.set(0.5, 0.5, 0.5); // 2.0 → 1.0 → 0.5 (さらに1/2)

    scene.add(princeGroup);
}

createPrince();

// --- サイズ表示テキストの作成 ---
let sizeDisplayText = null;
let lastDisplayedSize = START_SIZE;

function createSizeDisplay() {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 128;
    const ctx = canvas.getContext('2d');

    // 背景（半透明の黒）
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(0, 0, 512, 128);

    // テキスト
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 60px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(`${(currentSize * 100).toFixed(1)}cm`, 256, 64);

    const texture = new THREE.CanvasTexture(canvas);

    const textGeometry = new THREE.PlaneGeometry(0.2, 0.05);
    const textMaterial = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        side: THREE.DoubleSide
    });
    const textMesh = new THREE.Mesh(textGeometry, textMaterial);

    scene.add(textMesh);
    sizeDisplayText = { mesh: textMesh, canvas, ctx, texture };

    return textMesh;
}

function updateSizeDisplayText() {
    if (!sizeDisplayText) return;

    const ctx = sizeDisplayText.ctx;
    const canvas = sizeDisplayText.canvas;

    // キャンバスをクリア
    ctx.clearRect(0, 0, 512, 128);

    // 背景
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(0, 0, 512, 128);

    // テキスト
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 60px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(`${(currentSize * 100).toFixed(1)}cm`, 256, 64);

    // テクスチャを更新
    sizeDisplayText.texture.needsUpdate = true;

    lastDisplayedSize = currentSize;
}

function updateSizeDisplayPosition() {
    if (!sizeDisplayText) return;

    // 王子の上に配置
    sizeDisplayText.mesh.position.copy(princeGroup.position);
    sizeDisplayText.mesh.position.y += 0.15;

    // カメラの方を向く
    sizeDisplayText.mesh.lookAt(camera.position);

    // サイズが変わっていたらテキストを更新
    if (Math.abs(currentSize - lastDisplayedSize) > 0.001) {
        updateSizeDisplayText();
    }
}

createSizeDisplay();

// --- 3Dスタートボタンの作成 ---
function create3DStartButton() {
    const buttonGroup = new THREE.Group();

    // "START"テキストをCanvasで作成
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');

    // 背景（赤いボタン風）
    ctx.fillStyle = '#ff0000';
    ctx.fillRect(0, 0, 512, 256);

    // 枠線
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 10;
    ctx.strokeRect(10, 10, 492, 236);

    // テキスト
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 120px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('START', 256, 128);

    const texture = new THREE.CanvasTexture(canvas);

    // テキストパネル（平面）
    const textGeometry = new THREE.PlaneGeometry(0.3, 0.15);
    const textMaterial = new THREE.MeshStandardMaterial({
        map: texture,
        emissive: 0xff0000,
        emissiveIntensity: 0.3,
        side: THREE.DoubleSide
    });
    const textMesh = new THREE.Mesh(textGeometry, textMaterial);
    buttonGroup.add(textMesh);

    // 王子の上に配置（王子の高さより上）
    buttonGroup.position.copy(princeGroup.position);
    buttonGroup.position.y += 0.125; // 王子の上12.5cm（さらに1/2に調整）

    scene.add(buttonGroup);
    startButton3D = buttonGroup;

    // ボタンをふわふわアニメーション
    const clock = new THREE.Clock();
    function animateButton() {
        if (startButton3D && setupMode) {
            const time = clock.getElapsedTime();
            startButton3D.position.y = princeGroup.position.y + 0.125 + Math.sin(time * 2) * 0.005;

            // 常にカメラの方を向く
            startButton3D.lookAt(camera.position);
        }
    }

    return animateButton;
}

const animateStartButton = create3DStartButton();

// --- 物体管理 ---
const objectsToCatch = [];
const bodiesToRemove = []; // 削除待ちボディのキュー
const stuckObjects = []; // くっついたオブジェクトの記録
const MAX_OBJECTS = 100; // 最大オブジェクト数

function createRandomObject() {
    // 総オブジェクト数をチェック（くっついたものと落ちているものの合計）
    const totalObjects = stuckObjects.length + objectsToCatch.length;
    if (totalObjects >= MAX_OBJECTS) {
        // 古いオブジェクトを削除
        removeOldestObject();
    }

    const x = (Math.random() - 0.5) * 2.0; // 横方向2メートルの範囲（-1.0m ～ +1.0m）
    const z = (Math.random() - 0.5) * 2.0; // 横方向2メートルの範囲（-1.0m ～ +1.0m）
    const y = 2.5; // 高さ2.5mに固定

    const type = Math.floor(Math.random() * 4);
    let mesh, body, shape, widthForGrow;

    const color = new THREE.Color().setHSL(Math.random(), 1, 0.5);
    const material = new THREE.MeshStandardMaterial({ color: color });

    // ボールのサイズに応じて物体のサイズを調整
    // 平方根を使って成長率を緩やかにする（2倍 → 1.41倍、4倍 → 2倍）
    const sizeMultiplier = Math.max(1, Math.sqrt(currentSize / 0.025));
    const baseSize = 0.003 + Math.random() * 0.05;
    const scaleBase = baseSize * sizeMultiplier;

    if (type === 0) {
        const sx = scaleBase * (0.8 + Math.random());
        const sy = scaleBase * (0.8 + Math.random());
        const sz = scaleBase * (0.8 + Math.random());
        mesh = new THREE.Mesh(new THREE.BoxGeometry(sx, sy, sz), material);
        shape = new CANNON.Box(new CANNON.Vec3(sx/2, sy/2, sz/2));
        widthForGrow = Math.max(sx, sy, sz);
    }
    else if (type === 1) {
        if (Math.random() > 0.5) {
            const sx = scaleBase * 0.3;
            const sy = scaleBase * 3.0;
            const sz = scaleBase * 0.3;
            mesh = new THREE.Mesh(new THREE.BoxGeometry(sx, sy, sz), material);
            shape = new CANNON.Box(new CANNON.Vec3(sx/2, sy/2, sz/2));
            widthForGrow = sy * 0.5;
        } else {
            const sx = scaleBase * 2.0;
            const sy = scaleBase * 0.1;
            const sz = scaleBase * 2.0;
            mesh = new THREE.Mesh(new THREE.BoxGeometry(sx, sy, sz), material);
            shape = new CANNON.Box(new CANNON.Vec3(sx/2, sy/2, sz/2));
            widthForGrow = sx * 0.5;
        }
    }
    else if (type === 2) {
        const r = scaleBase * 0.6;
        mesh = new THREE.Mesh(new THREE.SphereGeometry(r, 16, 16), material);
        shape = new CANNON.Sphere(r);
        widthForGrow = r * 2;
    }
    else {
        const rt = scaleBase * 0.4;
        const h = scaleBase * 1.2;
        mesh = new THREE.Mesh(new THREE.CylinderGeometry(rt, rt, h, 16), material);
        shape = new CANNON.Cylinder(rt, rt, h, 12);
        widthForGrow = h;
    }

    mesh.castShadow = true;
    mesh.receiveShadow = true;
    mesh.position.set(x, y, z);
    scene.add(mesh);

    body = new CANNON.Body({
        mass: scaleBase * 10,
        shape: shape,
        position: new CANNON.Vec3(x, y, z),
        material: physicsMaterial
    });
    body.quaternion.setFromEuler(Math.random()*Math.PI, Math.random()*Math.PI, 0);
    world.addBody(body);

    objectsToCatch.push({ mesh, body, width: widthForGrow });
}

function removeOldestObject() {
    // くっついたオブジェクトの中から最も古いものを削除
    if (stuckObjects.length > 0) {
        const oldest = stuckObjects.shift(); // 配列の先頭（最も古いもの）を削除
        if (oldest.mesh) {
            // ジオメトリとマテリアルを破棄
            if (oldest.mesh.geometry) oldest.mesh.geometry.dispose();
            if (oldest.mesh.material) {
                if (Array.isArray(oldest.mesh.material)) {
                    oldest.mesh.material.forEach(mat => mat.dispose());
                } else {
                    oldest.mesh.material.dispose();
                }
            }
            // シーンから削除
            scene.remove(oldest.mesh);
        }
        console.log('Removed oldest stuck object. Stuck objects count:', stuckObjects.length);
    }
}

// 初期配置（ゲーム開始後のみ）
let objectSpawnInterval = null;

function startObjectSpawning() {
    // 初期配置
    for(let i=0; i<100; i++) { createRandomObject(); }
    // 継続的な生成
    objectSpawnInterval = setInterval(createRandomObject, 500);
}

// --- 接着ロジック ---
ballBody.addEventListener("collide", (e) => {
    const contactBody = e.body;
    const index = objectsToCatch.findIndex(obj => obj.body === contactBody);

    if (index !== -1) {
        const target = objectsToCatch[index];
        const catchThreshold = currentSize * 1.3;

        if (target.width < catchThreshold) {
            stickObject(target, index);
        }
    }
});

function stickObject(target, index) {
    try {
        // まず配列から削除
        objectsToCatch.splice(index, 1);

        // メッシュを塊に接着
        ballMesh.attach(target.mesh);

        // くっついたオブジェクトを記録（最後尾に追加）
        stuckObjects.push({ mesh: target.mesh });

        // 物理ボディを削除キューに追加（world.step()の後に削除）
        if (target.body && world.bodies.includes(target.body)) {
            bodiesToRemove.push(target.body);
        }

        // ボールのサイズを大きくする（当たり判定のみ、見た目は変えない）
        const growFactor = 0.017 * target.width;
        currentSize += growFactor;

        // 球の物理シェイプのみ更新（見た目は初期サイズのまま）
        ballShape.radius = currentSize;
        ballBody.updateBoundingRadius();

        // 球のメッシュジオメトリは更新しない（見た目は変えない）
        // ballMesh.geometry.dispose();
        // ballMesh.geometry = new THREE.SphereGeometry(currentSize, 32, 32);

        console.log('Object stuck! New size:', currentSize.toFixed(3), 'Stuck count:', stuckObjects.length);
    } catch (error) {
        console.error('Error in stickObject:', error);
    }
}

// --- コントローラー入力処理 ---
function updateControllerInput() {
    inputX = 0;
    inputZ = 0;

    if (!renderer.xr.isPresenting) return;

    const session = renderer.xr.getSession();
    if (session && session.inputSources) {
        const inputSources = session.inputSources;

        for (let i = 0; i < inputSources.length; i++) {
            const inputSource = inputSources[i];
            if (!inputSource) continue;

            const gamepad = inputSource.gamepad;
            if (!gamepad || !gamepad.axes) continue;
            if (gamepad.axes.length < 4) continue;

            // 左コントローラー: 左スティックで移動
            if (inputSource.handedness === 'left') {
                const leftHorizontal = gamepad.axes[2] || 0;
                const leftVertical = gamepad.axes[3] || 0;
                inputX += leftHorizontal;
                inputZ += leftVertical;
            }

            // 右コントローラー: 右スティックで移動
            if (inputSource.handedness === 'right') {
                const rightHorizontal = gamepad.axes[2] || 0;
                const rightVertical = gamepad.axes[3] || 0;
                inputX += rightHorizontal;
                inputZ += rightVertical;
            }
        }
    }
}

// --- 操作 ---
const keyState = {};
let currentAngle = 0;

window.addEventListener('keydown', (e) => { keyState[e.code] = true; });
window.addEventListener('keyup', (e) => { keyState[e.code] = false; });

function lerpAngle(start, end, t) {
    const diff = end - start;
    const wrappedDiff = Math.atan2(Math.sin(diff), Math.cos(diff));
    return start + wrappedDiff * t;
}

function updateControlAndPrince(time) {
    let moveX = inputX;
    let moveZ = inputZ;
    let isMoving = false;

    // キーボード入力（非VRモード用）
    if (!renderer.xr.isPresenting) {
        if (keyState['KeyW'] || keyState['ArrowUp'])    { moveZ -= 1; }
        if (keyState['KeyS'] || keyState['ArrowDown'])  { moveZ += 1; }
        if (keyState['KeyA'] || keyState['ArrowLeft'])  { moveX -= 1; }
        if (keyState['KeyD'] || keyState['ArrowRight']) { moveX += 1; }
    }

    // カメラの向きに基づいて移動方向を変換（VRモード時）
    if (renderer.xr.isPresenting && (moveX !== 0 || moveZ !== 0)) {
        // カメラの前方向ベクトルと右方向ベクトルを取得
        const forward = new THREE.Vector3();
        camera.getWorldDirection(forward);
        forward.y = 0; // 水平方向のみ
        forward.normalize();

        // カメラの右方向ベクトルを計算
        const right = new THREE.Vector3();
        right.crossVectors(forward, new THREE.Vector3(0, 1, 0));

        // スティック入力をカメラ視点の動きに変換
        // moveX: 左右のスティック入力
        // moveZ: 上下のスティック入力（負の値が前方）
        const movement = new THREE.Vector3();
        movement.addScaledVector(right, moveX);  // 右方向
        movement.addScaledVector(forward, -moveZ); // 前方向

        moveX = movement.x;
        moveZ = movement.z;
    }

    if (moveX !== 0 || moveZ !== 0) {
        isMoving = true;

        if (setupMode) {
            // セットアップモード: 直接位置を移動（転がさない）
            const moveSpeed = 0.03;
            ballBody.position.x += moveX * moveSpeed;
            ballBody.position.z += moveZ * moveSpeed;
            ballMesh.position.copy(ballBody.position);

            // スタートボタンも一緒に移動
            if (startButton3D) {
                startButton3D.position.x = ballBody.position.x;
                startButton3D.position.z = ballBody.position.z;
            }
        } else if (gameStarted) {
            // ゲームモード: 物理演算で転がす
            // 直接移動と同じ速度になるようにトルクを調整
            const moveSpeed = 0.03;
            const linearVelocity = moveSpeed * 60; // フレームレート考慮

            // 目標速度を設定
            ballBody.velocity.x = moveX * linearVelocity;
            ballBody.velocity.z = moveZ * linearVelocity;

            // 転がりのための角速度を計算（v = ωr より ω = v/r）
            const angularSpeed = linearVelocity / currentSize;
            ballBody.angularVelocity.x = -moveZ * angularSpeed;
            ballBody.angularVelocity.z = moveX * angularSpeed;
        }

        const moveAngle = Math.atan2(moveX, moveZ);
        currentAngle = lerpAngle(currentAngle, moveAngle, 0.15);
    } else if (gameStarted) {
        // 移動していない時は速度をゼロに（衝突の影響を打ち消す）
        ballBody.velocity.x = 0;
        ballBody.velocity.z = 0;
        ballBody.angularVelocity.x = 0;
        ballBody.angularVelocity.z = 0;
    }

    // 王子の位置計算
    const bx = ballMesh.position.x;
    const by = ballMesh.position.y;
    const bz = ballMesh.position.z;
    const dist = currentSize + 0.0875; // 3.5 → 0.35 → 0.175 → 0.0875 (さらに1/2)

    const px = bx - Math.sin(currentAngle) * dist;
    const pz = bz - Math.cos(currentAngle) * dist;
    let py = by - currentSize + 0.025; // 1.0 → 0.1 → 0.05 → 0.025 (さらに1/2)
    if (py < 0.025) py = 0.025; // 1.0 → 0.1 → 0.05 → 0.025 (さらに1/2)

    princeGroup.position.set(px, py, pz);
    princeGroup.lookAt(bx, by, bz);

    // サイズ表示の位置を更新（必要に応じてテキストも更新）
    updateSizeDisplayPosition();

    if (isMoving) {
        const speed = 20;
        princeParts.lLeg.rotation.x = Math.sin(time * speed) * 0.8;
        princeParts.rLeg.rotation.x = Math.cos(time * speed) * 0.8;
        princeParts.lArm.rotation.x = -Math.PI/3 + Math.sin(time * speed) * 0.3;
        princeParts.rArm.rotation.x = -Math.PI/3 + Math.cos(time * speed) * 0.3;
        princeGroup.position.y += Math.abs(Math.sin(time * speed * 2)) * 0.0025; // 0.1 → 0.01 → 0.005 → 0.0025 (さらに1/2)
    } else {
        princeParts.lLeg.rotation.x = THREE.MathUtils.lerp(princeParts.lLeg.rotation.x, 0, 0.1);
        princeParts.rLeg.rotation.x = THREE.MathUtils.lerp(princeParts.rLeg.rotation.x, 0, 0.1);
        princeParts.lArm.rotation.x = THREE.MathUtils.lerp(princeParts.lArm.rotation.x, -Math.PI/3, 0.1);
        princeParts.rArm.rotation.x = THREE.MathUtils.lerp(princeParts.rArm.rotation.x, -Math.PI/3, 0.1);
    }

    const camOffsetZ = 2 + (currentSize * 3); // 20 → 2 (10分の1)
    const camOffsetY = 1.5 + (currentSize * 2); // 15 → 1.5 (10分の1)

    const targetCamPos = new THREE.Vector3(bx, by + camOffsetY, bz + camOffsetZ);
    camera.position.lerp(targetCamPos, 0.1);
    camera.lookAt(bx, by, bz);
}

// --- アニメーションループ ---
const timeStep = 1 / 60;
const clock = new THREE.Clock();

function animate() {
    const elapsedTime = clock.getElapsedTime();

    updateControllerInput();

    // セットアップモード時はスタートボタンのアニメーション
    if (setupMode && startButton3D) {
        animateStartButton();
    }

    world.step(timeStep);

    // world.step()の後に削除待ちボディを削除
    while (bodiesToRemove.length > 0) {
        const body = bodiesToRemove.shift();
        if (world.bodies.includes(body)) {
            world.removeBody(body);
        }
    }

    updateControlAndPrince(elapsedTime);

    // ゲーム開始後のみボールの位置を物理エンジンから更新
    if (gameStarted) {
        ballMesh.position.copy(ballBody.position);
        ballMesh.quaternion.copy(ballBody.quaternion);
    }

    // ゲーム開始後のみオブジェクトを更新
    if (gameStarted) {
        for (const obj of objectsToCatch) {
            // 物理ボディが有効な場合のみ更新
            if (obj.body && obj.mesh) {
                obj.mesh.position.copy(obj.body.position);
                obj.mesh.quaternion.copy(obj.body.quaternion);

                if (obj.body.position.y < -2) { // -20 → -2 (10分の1)
                   obj.body.position.set((Math.random()-0.5)*FLOOR_SIZE/2, 3, (Math.random()-0.5)*FLOOR_SIZE/2); // 30 → 3 (10分の1)
                   obj.body.velocity.set(0,0,0);
                }
            }
        }
    }

    renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
