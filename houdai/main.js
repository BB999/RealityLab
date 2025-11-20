import * as THREE from 'three';
import { VRButton } from 'three/examples/jsm/webxr/VRButton.js';
import { XRControllerModelFactory } from 'three/examples/jsm/webxr/XRControllerModelFactory.js';

// --- 基本設定 ---
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 1.6, 3);

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.shadowMap.enabled = true;
renderer.xr.enabled = true;
document.body.appendChild(renderer.domElement);

// WebXR セッション設定（MRモード用）
const sessionInit = {
    requiredFeatures: ['local-floor'],
    optionalFeatures: ['layers'],
    domOverlay: { root: document.body }
};

// カスタムボタンでMRセッションを開始
const vrButton = document.getElementById('vrButton');
vrButton.addEventListener('click', async () => {
    if (navigator.xr) {
        try {
            // immersive-arでMR（パススルー）モードを起動
            const session = await navigator.xr.requestSession('immersive-ar', sessionInit);
            renderer.xr.setSession(session);
            vrButton.style.display = 'none';
        } catch (error) {
            console.error('MRセッションの開始に失敗:', error);
            alert('MRモードを開始できませんでした。Quest3のパススルーが有効か確認してください。');
        }
    }
});

// --- ライティング ---
const ambientLight = new THREE.AmbientLight(0x808080, 0.5);
scene.add(ambientLight);

const dirLight = new THREE.DirectionalLight(0xffffff, 1.5);
dirLight.position.set(5, 10, 5);
dirLight.castShadow = true;
dirLight.shadow.camera.left = -10;
dirLight.shadow.camera.right = 10;
dirLight.shadow.camera.top = 10;
dirLight.shadow.camera.bottom = -10;
dirLight.shadow.mapSize.width = 2048;
dirLight.shadow.mapSize.height = 2048;
scene.add(dirLight);

// --- 地面（参考用・MRでは実空間が見える） ---
const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(20, 20),
    new THREE.MeshStandardMaterial({
        color: 0x333333,
        roughness: 0.8,
        transparent: true,
        opacity: 0.3
    })
);
ground.rotation.x = -Math.PI / 2;
ground.receiveShadow = true;
ground.visible = false;  // MRモードでは非表示
scene.add(ground);

// --- ゲームパラメータ ---
const MAX_HP = 100;
let turretHP = MAX_HP;
let score = 0;
let gameTime = 0;
const TIME_LIMIT = 60.0;
let gameState = 'MENU'; // 'MENU', 'PLAYING', 'ENDED'

const TURRET_RANGE = 1.1;
const TURRET_ROTATION_SPEED = 6.0;
const BULLET_SPEED = 50;
const MISSILE_SPEED_BASE = 0.375;  // 0.75から0.375に半分
const SHOT_INTERVAL = 0.5;  // 1秒間に2発（0.5秒間隔）

let shakeIntensity = 0;
const cameraBasePos = new THREE.Vector3();

// --- VRコントローラー設定 ---
const controllerModelFactory = new XRControllerModelFactory();

const controller1 = renderer.xr.getController(0);
const controller2 = renderer.xr.getController(1);

const controllerGrip1 = renderer.xr.getControllerGrip(0);
const controllerGrip2 = renderer.xr.getControllerGrip(1);

controllerGrip1.add(controllerModelFactory.createControllerModel(controllerGrip1));
controllerGrip2.add(controllerModelFactory.createControllerModel(controllerGrip2));

// 右手のコントローラー（controller2）に銃を追加
function createGun() {
    const gun = new THREE.Group();

    // グリップ
    const grip = new THREE.Mesh(
        new THREE.BoxGeometry(0.03, 0.08, 0.04),
        new THREE.MeshStandardMaterial({ color: 0x333333 })
    );
    grip.position.set(0, -0.02, 0);
    gun.add(grip);

    // バレル（銃身）
    const barrel = new THREE.Mesh(
        new THREE.CylinderGeometry(0.008, 0.008, 0.15, 8),
        new THREE.MeshStandardMaterial({ color: 0x111111 })
    );
    barrel.rotation.x = Math.PI / 2;
    barrel.position.set(0, 0.02, -0.075);
    gun.add(barrel);

    // 本体
    const body = new THREE.Mesh(
        new THREE.BoxGeometry(0.04, 0.03, 0.08),
        new THREE.MeshStandardMaterial({ color: 0x444444 })
    );
    body.position.set(0, 0.02, 0.02);
    gun.add(body);

    // 銃口マーカー（発射位置）
    const muzzle = new THREE.Object3D();
    muzzle.position.set(0, 0.02, -0.15);  // バレルの先端
    gun.add(muzzle);
    gun.userData.muzzle = muzzle;

    return gun;
}

const gun = createGun();
gun.rotation.x = -Math.PI / 4;  // 45度回転
controllerGrip2.add(gun);

scene.add(controller1);
scene.add(controller2);
scene.add(controllerGrip1);
scene.add(controllerGrip2);

// コントローラーのレイキャスト用のライン
const geometry = new THREE.BufferGeometry().setFromPoints([
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(0, 0, -5)
]);
const line = new THREE.Line(geometry, new THREE.LineBasicMaterial({ color: 0x00ffff }));
line.scale.z = 1;
controller1.add(line.clone());
controller2.add(line.clone());

// コントローラーイベント
let selectedButton = null;
let isDraggingTurret = false;
let dragController = null;
const tempMatrix = new THREE.Matrix4();
const raycaster = new THREE.Raycaster();

controller1.addEventListener('selectstart', onSelectStart);
controller1.addEventListener('selectend', onSelectEnd);
controller2.addEventListener('selectstart', onSelectStart);
controller2.addEventListener('selectend', onSelectEnd);

function onSelectStart(event) {
    const controller = event.target;
    const intersections = getIntersections(controller);

    if (intersections.length > 0) {
        const intersection = intersections[0];
        const object = intersection.object;

        if (object.userData.isButton) {
            selectedButton = object;
            // ボタンアクション
            if (object === startButton && gameState === 'MENU') {
                resetGame();
            } else if (object === retryButton && gameState === 'ENDED') {
                resetGame();
            }
        }
    }

    // 右手のコントローラー（controller2）でプレイ中にレーザーを撃つ
    if (controller === controller2 && gameState === 'PLAYING') {
        shootFromController(controller);
    }

    // MENUまたはENDED状態で砲台を掴めるようにする
    if (gameState === 'MENU' || gameState === 'ENDED') {
        tempMatrix.identity().extractRotation(controller.matrixWorld);
        raycaster.ray.origin.setFromMatrixPosition(controller.matrixWorld);
        raycaster.ray.direction.set(0, 0, -1).applyMatrix4(tempMatrix);

        const turretIntersections = raycaster.intersectObjects(turretGroup.children, true);
        if (turretIntersections.length > 0) {
            isDraggingTurret = true;
            dragController = controller;
        }
    }
}

function onSelectEnd() {
    selectedButton = null;
    isDraggingTurret = false;
    dragController = null;
}

function getIntersections(controller) {
    tempMatrix.identity().extractRotation(controller.matrixWorld);
    raycaster.ray.origin.setFromMatrixPosition(controller.matrixWorld);
    raycaster.ray.direction.set(0, 0, -1).applyMatrix4(tempMatrix);

    const visibleButtons = [];
    if (gameState === 'MENU' && startButton.visible) visibleButtons.push(startButton);
    if (gameState === 'ENDED' && retryButton.visible) visibleButtons.push(retryButton);

    return raycaster.intersectObjects(visibleButtons, true);
}

// --- コントローラーからレーザーを撃つ ---
function shootFromController(controller) {
    // レーザービームを作成
    const geometry = new THREE.CylinderGeometry(0.008, 0.008, 1.0, 8);
    const material = new THREE.MeshBasicMaterial({
        color: 0xff00ff,  // プレイヤーのレーザーはマゼンタ色
        transparent: true,
        opacity: 0.9,
        emissive: 0xff00ff,
        emissiveIntensity: 1.0
    });
    const bullet = new THREE.Mesh(geometry, material);

    // 銃口マーカーのワールド座標を取得
    const muzzle = gun.userData.muzzle;
    const spawnPos = new THREE.Vector3();
    muzzle.getWorldPosition(spawnPos);
    bullet.position.copy(spawnPos);

    // 銃口マーカーの向いている方向を取得
    const muzzleDirection = new THREE.Vector3();
    muzzle.getWorldDirection(muzzleDirection);
    muzzleDirection.negate();  // 方向を反転
    bullet.userData.velocity = muzzleDirection.clone().multiplyScalar(BULLET_SPEED);

    // レーザーの向きを設定
    bullet.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), muzzleDirection);
    bullet.userData.isPlayerBullet = true;  // プレイヤーの弾として識別

    scene.add(bullet);
    bullets.push(bullet);
}

// --- テクスチャ生成 (Glow) ---
function createGlowTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');
    const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
    grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
    grad.addColorStop(0.5, 'rgba(255, 100, 0, 0.6)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 32, 32);
    return new THREE.CanvasTexture(canvas);
}
const glowTexture = createGlowTexture();

// --- 3Dボタン作成 ---
function create3DButton(text, color) {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = color;
    ctx.fillRect(0, 0, 512, 256);

    ctx.lineWidth = 20;
    ctx.strokeStyle = '#ffffff';
    ctx.strokeRect(10, 10, 492, 236);

    ctx.font = 'bold 100px Arial';
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, 256, 128);

    const texture = new THREE.CanvasTexture(canvas);
    const geometry = new THREE.BoxGeometry(1, 0.5, 0.05);

    const matBase = new THREE.MeshStandardMaterial({ color: 0x333333 });
    const matFace = new THREE.MeshBasicMaterial({ map: texture });

    const materials = [
        matBase, matBase, matBase, matBase,
        matFace,
        matBase
    ];

    const mesh = new THREE.Mesh(geometry, materials);
    mesh.userData = { isButton: true, originalY: 0 };
    return mesh;
}

// --- ボタン配置 ---
const startButton = create3DButton("START", "#00aa00");
startButton.userData.originalY = 0.6;  // もっと上に配置
startButton.userData.offsetZ = 0;  // 上に配置するためZ方向のオフセットは0
// 砲台に追従させるため、初期位置は後で設定

const retryButton = create3DButton("RETRY", "#0088ff");
retryButton.userData.originalY = 0.6;  // もっと上に配置
retryButton.userData.offsetZ = 0;  // 上に配置するためZ方向のオフセットは0
retryButton.visible = false;
// 砲台に追従させるため、初期位置は後で設定

// --- 3D HUD ---
let hudMesh, hudContext, hudTexture;
let gameOverMesh, gameClearMesh;

function create3DHUD() {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 256;
    hudContext = canvas.getContext('2d');
    hudTexture = new THREE.CanvasTexture(canvas);
    const material = new THREE.SpriteMaterial({ map: hudTexture, transparent: true, opacity: 0.9 });
    hudMesh = new THREE.Sprite(material);
    hudMesh.scale.set(0.5, 0.25, 1);  // さらに半分（元の1/4）
    hudMesh.visible = false;
    // 砲台の上に配置するため、初期位置は後で設定
    scene.add(hudMesh);
}

function createMessageBoard(text, color, subText = "") {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
    ctx.roundRect(50, 50, 924, 412, 40);
    ctx.fill();
    ctx.strokeStyle = color;
    ctx.lineWidth = 10;
    ctx.stroke();
    ctx.font = 'bold 120px Arial';
    ctx.fillStyle = color;
    ctx.textAlign = 'center';
    ctx.fillText(text, 512, 250);
    if (subText) {
        ctx.font = 'bold 60px Arial';
        ctx.fillStyle = '#ffffff';
        ctx.fillText(subText, 512, 350);
    }
    const tex = new THREE.CanvasTexture(canvas);
    const mat = new THREE.SpriteMaterial({ map: tex, transparent: true });
    const mesh = new THREE.Sprite(mat);
    mesh.scale.set(0.75, 0.375, 1);  // さらに半分のサイズ（1.5→0.75、0.75→0.375）
    mesh.position.set(0, 0.9, -1);  // 位置も調整
    mesh.visible = false;
    scene.add(mesh);
    return mesh;
}

create3DHUD();
gameOverMesh = createMessageBoard("GAME OVER", "#ff0000", "SYSTEM CRITICAL");
gameClearMesh = createMessageBoard("MISSION CLEAR", "#00ffff", "EXCELLENT WORK");

function update3DHUD() {
    if (!hudContext) return;
    const w = 512, h = 256;
    hudContext.clearRect(0, 0, w, h);
    hudContext.fillStyle = 'rgba(0, 20, 60, 0.7)';
    hudContext.strokeStyle = '#00ffff';
    hudContext.lineWidth = 3;
    hudContext.fillRect(10, 10, w - 20, h - 20);
    hudContext.strokeRect(10, 10, w - 20, h - 20);
    hudContext.fillStyle = '#ffffff';
    hudContext.font = 'bold 20px "Courier New"';  // 40pxから20pxに半分
    hudContext.textAlign = 'left';
    const remaining = Math.max(0, TIME_LIMIT - gameTime).toFixed(1);
    hudContext.fillText(`TIME : ${remaining}`, 40, 70);
    hudContext.fillText(`SCORE: ${score}`, 40, 130);
    hudContext.fillStyle = '#ffaa00';
    hudContext.font = 'bold 15px "Courier New"';  // 30pxから15pxに半分
    hudContext.fillText(`SHIELD`, 40, 200);
    const barW = 250;
    hudContext.fillStyle = '#333333';
    hudContext.fillRect(180, 175, barW, 30);
    const hpRatio = Math.max(0, turretHP / MAX_HP);
    const hpColor = hpRatio > 0.5 ? '#00ff00' : (hpRatio > 0.25 ? '#ffff00' : '#ff0000');
    hudContext.fillStyle = hpColor;
    hudContext.fillRect(180, 175, barW * hpRatio, 30);
    hudTexture.needsUpdate = true;
}

// --- オブジェクト管理 ---
const missiles = [];
const bullets = [];
const particles = [];
let turretHead;
let dummyTargetObj;
let lastShotTime = 0;

// --- 砲台 ---
let turretGroup;
function createTurret() {
    turretGroup = new THREE.Group();
    const base = new THREE.Mesh(
        new THREE.CylinderGeometry(0.075, 0.1, 0.05, 8),
        new THREE.MeshStandardMaterial({ color: 0x444444 })
    );
    base.position.y = 0.025;
    base.castShadow = true;
    turretGroup.add(base);

    turretHead = new THREE.Group();
    turretHead.position.y = 0.05;
    const headBody = new THREE.Mesh(
        new THREE.BoxGeometry(0.0875, 0.0625, 0.125),
        new THREE.MeshStandardMaterial({ color: 0x335588 })
    );
    headBody.position.y = 0.0125;
    headBody.castShadow = true;
    turretHead.add(headBody);

    const barrelGeo = new THREE.CylinderGeometry(0.005, 0.005, 0.175);
    const barrelMat = new THREE.MeshStandardMaterial({ color: 0x111111 });
    [-0.025, -0.01, 0.01, 0.025].forEach(x => {
        const b = new THREE.Mesh(barrelGeo, barrelMat);
        b.rotation.x = Math.PI / 2;
        b.position.set(x, 0.0125, 0.0875);
        turretHead.add(b);
    });

    turretGroup.add(turretHead);
    turretGroup.position.set(0, 0, -1.5);
    scene.add(turretGroup);
    dummyTargetObj = new THREE.Object3D();
    dummyTargetObj.position.copy(turretHead.position);
}
createTurret();

// --- リロードバー ---
let reloadBarGroup;
function createReloadBar() {
    reloadBarGroup = new THREE.Group();

    // 背景（黒）
    const bgGeo = new THREE.PlaneGeometry(0.15, 0.015);
    const bgMat = new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.7 });
    const bg = new THREE.Mesh(bgGeo, bgMat);
    reloadBarGroup.add(bg);

    // リロードバー（緑）
    const barGeo = new THREE.PlaneGeometry(0.15, 0.015);
    const barMat = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const bar = new THREE.Mesh(barGeo, barMat);
    bar.position.z = 0.001;
    reloadBarGroup.userData.bar = bar;
    reloadBarGroup.add(bar);

    // 砲台の上に配置
    reloadBarGroup.position.set(
        turretGroup.position.x,
        turretGroup.position.y + 0.15,
        turretGroup.position.z
    );
    reloadBarGroup.visible = false;
    scene.add(reloadBarGroup);
}
createReloadBar();

// ボタンをシーンに追加
scene.add(startButton);
scene.add(retryButton);

// --- ミサイル ---
function createMissileModel() {
    const group = new THREE.Group();
    const body = new THREE.Mesh(
        new THREE.CylinderGeometry(0.00875, 0.00875, 0.075, 8),
        new THREE.MeshStandardMaterial({ color: 0xdddddd })
    );
    body.rotation.x = Math.PI / 2;
    body.castShadow = true;
    group.add(body);

    const nose = new THREE.Mesh(
        new THREE.ConeGeometry(0.00875, 0.02, 16),
        new THREE.MeshStandardMaterial({ color: 0xff2222 })
    );
    nose.rotation.x = Math.PI / 2;
    nose.position.z = 0.0475;
    nose.castShadow = true;
    group.add(nose);

    const engine = new THREE.Mesh(
        new THREE.CylinderGeometry(0.00625, 0.00375, 0.0125),
        new THREE.MeshBasicMaterial({ color: 0xffaa00 })
    );
    engine.rotation.x = Math.PI / 2;
    engine.position.z = -0.04;
    group.add(engine);

    return group;
}

// --- スモーク ---
function createSmoke(position) {
    const geometry = new THREE.DodecahedronGeometry(0.05, 0);
    const material = new THREE.MeshBasicMaterial({ color: 0x999999, transparent: true, opacity: 0.4 });
    const p = new THREE.Mesh(geometry, material);
    p.position.copy(position).add(new THREE.Vector3(
        (Math.random() - 0.5) * 0.05,
        (Math.random() - 0.5) * 0.05,
        (Math.random() - 0.5) * 0.05
    ));
    p.userData = { velocity: new THREE.Vector3(0, 0.1, 0), isSmoke: true, life: 0.5, maxLife: 0.5 };
    p.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
    scene.add(p);
    particles.push(p);
}

// --- 爆発エフェクト ---
function createExplosion(position, colorHex, scale = 1.0) {
    if (scale > 2.0) shakeIntensity = 0.05 * scale;
    else shakeIntensity = 0.02;

    // メインフラッシュ（より明るく大きく）
    const flashMat = new THREE.SpriteMaterial({
        map: glowTexture,
        color: 0xffff88,
        transparent: true,
        blending: THREE.AdditiveBlending,
        opacity: 1.0
    });
    const flash = new THREE.Sprite(flashMat);
    flash.position.copy(position);
    flash.scale.set(0.8 * scale, 0.8 * scale, 1);
    flash.userData = { life: 0.2, maxLife: 0.2, type: 'flash', expand: 5 };
    scene.add(flash);
    particles.push(flash);

    // セカンダリフラッシュ（オレンジ）
    const flash2Mat = new THREE.SpriteMaterial({
        map: glowTexture,
        color: 0xff6600,
        transparent: true,
        blending: THREE.AdditiveBlending,
        opacity: 0.7
    });
    const flash2 = new THREE.Sprite(flash2Mat);
    flash2.position.copy(position);
    flash2.scale.set(0.6 * scale, 0.6 * scale, 1);
    flash2.userData = { life: 0.25, maxLife: 0.25, type: 'flash', expand: 4 };
    scene.add(flash2);
    particles.push(flash2);

    // ミサイルの部品（様々な形状）
    const debrisTypes = [
        // 本体の破片
        { geo: new THREE.BoxGeometry(0.015, 0.015, 0.05), color: 0xdddddd },
        { geo: new THREE.BoxGeometry(0.015, 0.015, 0.03), color: 0xdddddd },
        // 先端の破片
        { geo: new THREE.ConeGeometry(0.01, 0.03, 8), color: 0xff2222 },
        // エンジンの破片
        { geo: new THREE.CylinderGeometry(0.008, 0.006, 0.015), color: 0xffaa00 },
        // 小さい破片
        { geo: new THREE.BoxGeometry(0.008, 0.008, 0.008), color: 0x888888 }
    ];

    const debrisCount = 40 * scale;  // パーティクル数を増やす

    for (let i = 0; i < debrisCount; i++) {
        const debrisType = debrisTypes[Math.floor(Math.random() * debrisTypes.length)];
        const pMat = new THREE.MeshStandardMaterial({
            color: debrisType.color,
            transparent: true,
            opacity: 1.0,
            emissive: debrisType.color,
            emissiveIntensity: 0.3
        });
        const p = new THREE.Mesh(debrisType.geo.clone(), pMat);
        p.position.copy(position);
        p.castShadow = true;

        // より激しく飛び散る
        const speed = (2.0 + Math.random() * 5) * scale;
        const vel = new THREE.Vector3(
            Math.random() - 0.5,
            Math.random() - 0.3,  // 少し上方向に
            Math.random() - 0.5
        ).normalize().multiplyScalar(speed);

        p.userData = {
            velocity: vel,
            life: 0.8 + Math.random() * 1.0,
            maxLife: 1.8,
            type: 'debris',
            rotVel: new THREE.Vector3(
                (Math.random() - 0.5) * 15,
                (Math.random() - 0.5) * 15,
                (Math.random() - 0.5) * 15
            )
        };
        const s = 0.8 + Math.random() * 0.4;
        p.scale.multiplyScalar(s);
        scene.add(p);
        particles.push(p);
    }

    // 火花エフェクト
    for (let i = 0; i < 15 * scale; i++) {
        const sparkMat = new THREE.SpriteMaterial({
            map: glowTexture,
            color: Math.random() > 0.5 ? 0xffff00 : 0xff8800,
            transparent: true,
            blending: THREE.AdditiveBlending,
            opacity: 1.0
        });
        const spark = new THREE.Sprite(sparkMat);
        spark.position.copy(position);
        spark.scale.set(0.05, 0.05, 1);

        const speed = 3 + Math.random() * 4;
        const vel = new THREE.Vector3(
            Math.random() - 0.5,
            Math.random() - 0.5,
            Math.random() - 0.5
        ).normalize().multiplyScalar(speed);

        spark.userData = {
            velocity: vel,
            life: 0.3 + Math.random() * 0.3,
            maxLife: 0.6,
            type: 'spark'
        };
        scene.add(spark);
        particles.push(spark);
    }
}

// --- ゲームのリセット処理 ---
function resetGame() {
    turretHP = MAX_HP;
    score = 0;
    gameTime = 0;
    shakeIntensity = 0;

    missiles.forEach(m => scene.remove(m.mesh));
    missiles.length = 0;
    bullets.forEach(b => scene.remove(b));
    bullets.length = 0;

    gameOverMesh.visible = false;
    gameClearMesh.visible = false;
    retryButton.visible = false;
    startButton.visible = false;

    hudMesh.visible = true;
    gameState = 'PLAYING';
}

// --- ゲーム進行 ---
function spawnMissile(difficultyFactor) {
    const missileMesh = createMissileModel();
    const angle = Math.random() * Math.PI * 2;
    const radius = 1 + Math.random() * 1;

    // 砲台の位置を基準にミサイルを配置
    missileMesh.position.set(
        turretGroup.position.x + Math.cos(angle) * radius,
        2.0 + Math.random() * 0.5,  // 3m→2m、高さの範囲も1m→0.5mに
        turretGroup.position.z + Math.sin(angle) * radius
    );

    const spread = Math.max(0.1, 1 - difficultyFactor * 0.75);
    // 砲台の位置を狙う
    const targetPos = new THREE.Vector3(
        turretGroup.position.x + (Math.random() - 0.5) * spread,
        0.1,
        turretGroup.position.z + (Math.random() - 0.5) * spread
    );
    missileMesh.lookAt(targetPos);
    const speed = MISSILE_SPEED_BASE;  // 一定速度
    missiles.push({
        mesh: missileMesh,
        velocity: new THREE.Vector3().subVectors(targetPos, missileMesh.position).normalize().multiplyScalar(speed),
        rotationSpeed: (Math.random() - 0.5) * 3,
        smokeTimer: 0
    });
    scene.add(missileMesh);
}

function shoot(targetPos) {
    // レーザービームを作成
    const geometry = new THREE.CylinderGeometry(0.008, 0.008, 1.0, 8);
    const material = new THREE.MeshBasicMaterial({
        color: 0x00ffff,
        transparent: true,
        opacity: 0.9,
        emissive: 0x00ffff,
        emissiveIntensity: 1.0
    });
    const bullet = new THREE.Mesh(geometry, material);

    // 砲身の先端から発射（4つの砲身のうちランダムに選択）
    const barrelX = [-0.025, -0.01, 0.01, 0.025][Math.floor(Math.random() * 4)];
    const spawnPos = new THREE.Vector3(barrelX, 0.0125, 0.175).applyMatrix4(turretHead.matrixWorld);
    bullet.position.copy(spawnPos);

    const direction = new THREE.Vector3().subVectors(targetPos, bullet.position).normalize();
    bullet.userData.velocity = direction.clone().multiplyScalar(BULLET_SPEED);

    // レーザーの向きを設定（シリンダーのY軸を進行方向に向ける）
    bullet.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction);

    scene.add(bullet);
    bullets.push(bullet);
}

function takeDamage(amount) {
    turretHP -= amount;
    turretHead.children[0].material.emissive.setHex(0xff0000);
    setTimeout(() => {
        if (gameState === 'PLAYING') turretHead.children[0].material.emissive.setHex(0x000000);
    }, 100);

    if (turretHP <= 0) {
        turretHP = 0;
        endGame(false);
    }
}

function endGame(isClear) {
    gameState = 'ENDED';
    hudMesh.visible = false;
    retryButton.visible = true;

    if (isClear) {
        gameClearMesh.visible = true;
        missiles.forEach(m => {
            createExplosion(m.mesh.position, 0xffaa00, 0.3);
            scene.remove(m.mesh);
        });
        missiles.length = 0;
    } else {
        gameOverMesh.visible = true;
        createExplosion(new THREE.Vector3(0, 0.4, -1.5), 0xff4400, 0.6);
    }
}

// --- メインループ ---
const clock = new THREE.Clock();

function animate() {
    const delta = clock.getDelta();

    // VRセッション中はカメラ位置を保存
    if (renderer.xr.isPresenting) {
        cameraBasePos.copy(camera.position);
    }

    // カメラシェイク
    if (shakeIntensity > 0 && renderer.xr.isPresenting) {
        const rx = (Math.random() - 0.5) * shakeIntensity;
        const ry = (Math.random() - 0.5) * shakeIntensity;
        const rz = (Math.random() - 0.5) * shakeIntensity;
        camera.position.set(
            cameraBasePos.x + rx,
            cameraBasePos.y + ry,
            cameraBasePos.z + rz
        );
        shakeIntensity -= delta * 2.0;
        if (shakeIntensity < 0) shakeIntensity = 0;
    }

    // コントローラーで砲台を移動
    if (isDraggingTurret && dragController) {
        tempMatrix.identity().extractRotation(dragController.matrixWorld);
        raycaster.ray.origin.setFromMatrixPosition(dragController.matrixWorld);
        raycaster.ray.direction.set(0, 0, -1).applyMatrix4(tempMatrix);

        // レイが床と交差する位置を計算
        const groundPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
        const intersectPoint = new THREE.Vector3();
        raycaster.ray.intersectPlane(groundPlane, intersectPoint);

        if (intersectPoint) {
            turretGroup.position.x = intersectPoint.x;
            turretGroup.position.z = intersectPoint.z;
        }
    }

    // HUDを砲台の上に配置してカメラの方を向かせる
    if (gameState === 'PLAYING' && hudMesh) {
        hudMesh.position.set(
            turretGroup.position.x,
            turretGroup.position.y + 0.5,
            turretGroup.position.z
        );
        hudMesh.lookAt(camera.position);
    }

    // ボタンを砲台に追従させる
    const time = Date.now() * 0.002;
    if (gameState === 'MENU') {
        const floatOffset = Math.sin(time) * 0.05;
        startButton.position.set(
            turretGroup.position.x,
            turretGroup.position.y + startButton.userData.originalY + floatOffset,
            turretGroup.position.z + startButton.userData.offsetZ
        );
        startButton.lookAt(camera.position);  // カメラの方を向く
        startButton.visible = true;
    } else {
        startButton.visible = false;
    }

    if (gameState === 'ENDED') {
        const floatOffset = Math.sin(time) * 0.05;
        retryButton.position.set(
            turretGroup.position.x,
            turretGroup.position.y + retryButton.userData.originalY + floatOffset,
            turretGroup.position.z + retryButton.userData.offsetZ
        );
        retryButton.lookAt(camera.position);  // カメラの方を向く
        retryButton.visible = true;
    } else {
        retryButton.visible = false;
    }

    // ゲームロジック
    if (gameState === 'PLAYING') {
        gameTime += delta;
        if (TIME_LIMIT - gameTime <= 0) endGame(true);

        const difficulty = Math.min(1.0, gameTime / TIME_LIMIT);
        if (Math.random() < 0.02 + (difficulty * 0.06)) spawnMissile(difficulty);  // 出現率2倍
        update3DHUD();

        // Turret AI
        const turretPos = new THREE.Vector3(
            turretGroup.position.x,
            turretGroup.position.y + 0.4,
            turretGroup.position.z
        );
        let targetMissileObj = null;
        let closestDist = Infinity;

        for (let mObj of missiles) {
            const dist = turretPos.distanceTo(mObj.mesh.position);
            if (dist < TURRET_RANGE && dist < closestDist) {
                closestDist = dist;
                targetMissileObj = mObj;
            }
        }

        if (targetMissileObj) {
            dummyTargetObj.position.copy(turretHead.position);
            dummyTargetObj.lookAt(targetMissileObj.mesh.position);
            turretHead.quaternion.slerp(dummyTargetObj.quaternion, TURRET_ROTATION_SPEED * delta);

            if (turretHead.quaternion.angleTo(dummyTargetObj.quaternion) < 0.3 &&
                clock.elapsedTime - lastShotTime > SHOT_INTERVAL) {
                shoot(targetMissileObj.mesh.position);
                lastShotTime = clock.elapsedTime;
            }
        }

        // リロードバーの更新
        const timeSinceLastShot = clock.elapsedTime - lastShotTime;
        const reloadProgress = Math.min(1.0, timeSinceLastShot / SHOT_INTERVAL);

        if (reloadProgress < 1.0) {
            // リロード中
            reloadBarGroup.visible = true;
            reloadBarGroup.position.set(
                turretGroup.position.x,
                turretGroup.position.y + 0.15,
                turretGroup.position.z
            );
            reloadBarGroup.lookAt(camera.position);

            // バーの長さを更新
            const bar = reloadBarGroup.userData.bar;
            bar.scale.x = reloadProgress;
            bar.position.x = -(0.15 / 2) * (1 - reloadProgress);
        } else {
            // リロード完了
            reloadBarGroup.visible = false;
        }
    } else {
        // ゲーム中でない時はバーを非表示
        reloadBarGroup.visible = false;
    }

    // ミサイル更新
    for (let i = missiles.length - 1; i >= 0; i--) {
        const mObj = missiles[i];

        if (gameState === 'PLAYING') {
            mObj.mesh.position.add(mObj.velocity.clone().multiplyScalar(delta));
            mObj.mesh.rotateZ(mObj.rotationSpeed * delta);

            mObj.smokeTimer += delta;
            if (mObj.smokeTimer > 0.08) {
                // エンジンの後ろから煙を出す
                const enginePos = new THREE.Vector3(0, 0, -0.047).applyMatrix4(mObj.mesh.matrixWorld);
                createSmoke(enginePos);
                mObj.smokeTimer = 0;
            }

            const turretCenter = new THREE.Vector3(
                turretGroup.position.x,
                turretGroup.position.y + 0.05,  // 砲台の中心高さ
                turretGroup.position.z
            );
            const dist = turretCenter.distanceTo(mObj.mesh.position);
            if (dist < 0.15) {  // 1.0mから0.15mに変更（15cm）
                createExplosion(mObj.mesh.position, 0xff2200, 0.5);
                takeDamage(15);
                scene.remove(mObj.mesh);
                missiles.splice(i, 1);
                continue;
            }
            if (mObj.mesh.position.y < 0) {
                createExplosion(mObj.mesh.position, 0x555555, 0.2);
                scene.remove(mObj.mesh);
                missiles.splice(i, 1);
                continue;
            }
        }
    }

    // 弾更新
    for (let i = bullets.length - 1; i >= 0; i--) {
        const b = bullets[i];
        const prevPos = b.position.clone();

        b.position.add(b.userData.velocity.clone().multiplyScalar(delta));

        let hit = false;
        if (gameState === 'PLAYING') {
            const ray = new THREE.Line3(prevPos, b.position);
            for (let j = missiles.length - 1; j >= 0; j--) {
                const m = missiles[j];
                const pt = new THREE.Vector3();
                ray.closestPointToPoint(m.mesh.position, true, pt);
                if (pt.distanceTo(m.mesh.position) < 0.05) {  // 0.4mから0.05mに変更（5cm）
                    createExplosion(m.mesh.position, 0xffaa00, 0.24);
                    scene.remove(m.mesh);
                    missiles.splice(j, 1);
                    score += 100;
                    hit = true;
                    break;
                }
            }
        }
        if (hit || b.position.distanceTo(new THREE.Vector3(0, 0, 0)) > TURRET_RANGE + 10 || b.position.y < 0) {
            scene.remove(b);
            bullets.splice(i, 1);
        }
    }

    // パーティクル更新
    for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];

        if (p.userData.type === 'flash') {
            p.scale.multiplyScalar(1 + (p.userData.expand * delta));
            p.userData.life -= delta;
            p.material.opacity = p.userData.life / p.userData.maxLife;
        }
        else if (p.userData.type === 'spark') {
            p.position.add(p.userData.velocity.clone().multiplyScalar(delta));
            p.userData.velocity.multiplyScalar(0.95);  // 減速
            p.userData.life -= delta;
            const lifeRatio = p.userData.life / p.userData.maxLife;
            p.material.opacity = lifeRatio;
            p.scale.multiplyScalar(0.96);
        }
        else if (p.userData.isSmoke) {
            p.position.add(p.userData.velocity.clone().multiplyScalar(delta));
            p.userData.life -= delta;
            const lifeRatio = p.userData.life / p.userData.maxLife;
            p.scale.setScalar(0.1 + (1.0 - lifeRatio) * 0.3);
            p.material.opacity = lifeRatio * 0.4;
        }
        else if (p.userData.type === 'debris') {
            p.userData.velocity.y -= 3.0 * delta;
            p.userData.velocity.multiplyScalar(0.98);
            p.position.add(p.userData.velocity.clone().multiplyScalar(delta));
            p.rotation.x += p.userData.rotVel.x * delta;
            p.rotation.y += p.userData.rotVel.y * delta;
            p.rotation.z += p.userData.rotVel.z * delta;
            p.userData.life -= delta;
            p.scale.multiplyScalar(0.98);
        }

        if (p.userData.life <= 0) {
            scene.remove(p);
            particles.splice(i, 1);
            if (p.geometry) p.geometry.dispose();
            if (p.material) p.material.dispose();
        }
    }

    renderer.render(scene, camera);
}

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

renderer.setAnimationLoop(animate);
