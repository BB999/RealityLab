import * as THREE from 'three';
import { XRControllerModelFactory } from 'three/addons/webxr/XRControllerModelFactory.js';

// --- 定数 ---
const TABLE_W = 1.525;  // 実際の卓球台サイズ (1.525m)
const TABLE_D = 2.74;   // 実際の卓球台サイズ (2.74m)
const TABLE_H = 0.05;
const TABLE_LEG_H = 0.76; // 卓球台の高さ (76cm)
const NET_H = 0.1525;   // ネットの高さ (15.25cm)
const BALL_R = 0.02;    // ボール半径 (2cm)

const GRAVITY = -9.8 * 0.0002; // 重力
const TIME_SCALE = 0.5; // 時間スケール（小さいほどゆっくり動く）

// 台のオフセット（プレイヤーの前方に配置）
const TABLE_OFFSET_Z = -TABLE_D / 2 - 0.3; // 台の中心がこの位置

// --- 状態管理 ---
let gameState = 'READY';
let pScore = 0, cScore = 0, rallyCount = 0;
let lastHitter = 'CPU', bounceCount = 0, isServe = true;
let ballVel = new THREE.Vector3();
let cpuSwingAnim = 0;

// ラケット速度追跡用
let prevRacketPos = new THREE.Vector3();
let racketVel = new THREE.Vector3();

// --- 3Dオーディオ ---
const audioListener = new THREE.AudioListener();
const audioLoader = new THREE.AudioLoader();

// 台バウンド音（位置音源）
const bounceSound = new THREE.PositionalAudio(audioListener);
audioLoader.load('./haneru.mp3', (buffer) => {
    bounceSound.setBuffer(buffer);
    bounceSound.setRefDistance(1);
    bounceSound.setVolume(0.8);
});

// ラケット打撃音（位置音源）
const hitSound = new THREE.PositionalAudio(audioListener);
audioLoader.load('./utu.mp3', (buffer) => {
    hitSound.setBuffer(buffer);
    hitSound.setRefDistance(1);
    hitSound.setVolume(1.0);
});

// 音を鳴らす関数（位置を考慮）
function playBounceSound(position) {
    if (bounceSound.buffer) {
        bounceSound.position.copy(position);
        if (bounceSound.isPlaying) bounceSound.stop();
        bounceSound.play();
    }
}

function playHitSound(position) {
    if (hitSound.buffer) {
        hitSound.position.copy(position);
        if (hitSound.isPlaying) hitSound.stop();
        hitSound.play();
    }
}

// --- XR関連 ---
let xrSession = null;
let rightController = null;
let leftController = null;
let controllerGrip1 = null;
let controllerGrip2 = null;
let ignoreNextSelect = false; // MR開始時のトリガー入力を無視するフラグ

// --- 初期化 ---
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.01, 100);
camera.position.set(0, TABLE_LEG_H + 0.5, 0.5); // プレイヤー視点
camera.lookAt(0, TABLE_LEG_H, TABLE_OFFSET_Z); // 台の方を見る
camera.add(audioListener); // オーディオリスナーをカメラに追加

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.shadowMap.enabled = true;
renderer.xr.enabled = true;
document.body.appendChild(renderer.domElement);

// ライト
const sun = new THREE.DirectionalLight(0xffffff, 1.5);
sun.position.set(1, 3, 1);
sun.castShadow = true;
scene.add(sun);
scene.add(new THREE.AmbientLight(0x808080));

// 音源をシーンに追加
scene.add(bounceSound);
scene.add(hitSound);

// --- オブジェクト作成 ---

// 卓球台
const tableGroup = new THREE.Group();
tableGroup.position.y = TABLE_LEG_H;
tableGroup.position.z = TABLE_OFFSET_Z; // プレイヤーの前方に配置

const tableTop = new THREE.Mesh(
    new THREE.BoxGeometry(TABLE_W, TABLE_H, TABLE_D),
    new THREE.MeshPhongMaterial({ color: 0x1b5e20 })
);
tableTop.receiveShadow = true;
tableGroup.add(tableTop);

// 白いライン
const lineMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
const sideLineL = new THREE.Mesh(new THREE.PlaneGeometry(0.01, TABLE_D), lineMat);
sideLineL.rotation.x = -Math.PI / 2;
sideLineL.position.set(-TABLE_W / 2, TABLE_H / 2 + 0.001, 0);
tableGroup.add(sideLineL);

const sideLineR = sideLineL.clone();
sideLineR.position.x = TABLE_W / 2;
tableGroup.add(sideLineR);

const centerLine = new THREE.Mesh(new THREE.PlaneGeometry(0.005, TABLE_D), lineMat);
centerLine.rotation.x = -Math.PI / 2;
centerLine.position.set(0, TABLE_H / 2 + 0.001, 0);
tableGroup.add(centerLine);

const endLineP = new THREE.Mesh(new THREE.PlaneGeometry(TABLE_W, 0.01), lineMat);
endLineP.rotation.x = -Math.PI / 2;
endLineP.position.set(0, TABLE_H / 2 + 0.001, TABLE_D / 2);
tableGroup.add(endLineP);

const endLineC = endLineP.clone();
endLineC.position.z = -TABLE_D / 2;
tableGroup.add(endLineC);

// ネット
const netGeo = new THREE.BoxGeometry(TABLE_W + 0.1, NET_H, 0.01);
const netMat = new THREE.MeshPhongMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.6
});
const net = new THREE.Mesh(netGeo, netMat);
net.position.set(0, NET_H / 2 + TABLE_H / 2, 0);
tableGroup.add(net);

// テーブル脚
const legMat = new THREE.MeshPhongMaterial({ color: 0x333333 });
const legGeo = new THREE.BoxGeometry(0.05, TABLE_LEG_H, 0.05);
const legPositions = [
    [-TABLE_W / 2 + 0.1, -TABLE_LEG_H / 2, TABLE_D / 2 - 0.1],
    [TABLE_W / 2 - 0.1, -TABLE_LEG_H / 2, TABLE_D / 2 - 0.1],
    [-TABLE_W / 2 + 0.1, -TABLE_LEG_H / 2, -TABLE_D / 2 + 0.1],
    [TABLE_W / 2 - 0.1, -TABLE_LEG_H / 2, -TABLE_D / 2 + 0.1]
];
legPositions.forEach(pos => {
    const leg = new THREE.Mesh(legGeo, legMat);
    leg.position.set(...pos);
    tableGroup.add(leg);
});

scene.add(tableGroup);

// ボール
const ball = new THREE.Mesh(
    new THREE.SphereGeometry(BALL_R, 32, 32),
    new THREE.MeshPhongMaterial({ color: 0xff9800 })
);
ball.castShadow = true;
scene.add(ball);

// ラケット作成関数
function createRacket(color) {
    const g = new THREE.Group();

    // ラケットヘッド
    const head = new THREE.Mesh(
        new THREE.CylinderGeometry(0.08, 0.08, 0.01, 32),
        new THREE.MeshPhongMaterial({ color })
    );
    head.rotation.x = Math.PI / 2;
    g.add(head);

    // グリップ
    const handle = new THREE.Mesh(
        new THREE.BoxGeometry(0.02, 0.12, 0.015),
        new THREE.MeshPhongMaterial({ color: 0x5d4037 })
    );
    handle.position.y = -0.12;
    g.add(handle);

    return g;
}

const pRacket = createRacket(0xcc0000);
const cRacket = createRacket(0x0000cc);
scene.add(pRacket);
scene.add(cRacket);

// CPUラケット初期位置（台の奥端）
const cpuZ = TABLE_OFFSET_Z - TABLE_D / 2 - 0.3;
cRacket.position.set(0, TABLE_LEG_H + 0.3, cpuZ);

// --- XRセットアップ ---
const xrButton = document.getElementById('xr-button');

async function checkXRSupport() {
    if (navigator.xr) {
        const isSupported = await navigator.xr.isSessionSupported('immersive-ar');
        if (isSupported) {
            xrButton.textContent = 'START MR';
            xrButton.disabled = false;
        } else {
            xrButton.textContent = 'MR Not Supported';
            xrButton.disabled = true;
        }
    } else {
        xrButton.textContent = 'WebXR Not Supported';
        xrButton.disabled = true;
    }
}

xrButton.addEventListener('click', async () => {
    if (!xrSession) {
        try {
            xrSession = await navigator.xr.requestSession('immersive-ar', {
                requiredFeatures: ['local-floor'],
                optionalFeatures: ['hand-tracking']
            });

            renderer.xr.setReferenceSpaceType('local-floor');
            await renderer.xr.setSession(xrSession);

            // MR開始時のトリガー入力を無視
            ignoreNextSelect = true;
            setTimeout(() => { ignoreNextSelect = false; }, 500);

            xrButton.textContent = 'MRモード終了';
            document.querySelector('.main-content').style.display = 'none';
            document.querySelector('.table-pattern').style.display = 'none';
            document.querySelector('.footer').style.display = 'none';
            document.getElementById('game-ui').style.display = 'block';

            // 背景を透明に
            scene.background = null;

            xrSession.addEventListener('end', () => {
                xrSession = null;
                xrButton.textContent = 'START MR';
                document.querySelector('.main-content').style.display = 'flex';
                document.querySelector('.table-pattern').style.display = 'block';
                document.querySelector('.footer').style.display = 'block';
                document.getElementById('game-ui').style.display = 'none';
                scene.background = new THREE.Color(0x1a1a1a);
            });

        } catch (e) {
            console.error('XRセッション開始エラー:', e);
        }
    } else {
        xrSession.end();
    }
});

// コントローラーセットアップ
const controllerModelFactory = new XRControllerModelFactory();

// Controller 0
const controller0 = renderer.xr.getController(0);
controller0.addEventListener('selectstart', onSelectStart);
scene.add(controller0);

controllerGrip1 = renderer.xr.getControllerGrip(0);
controllerGrip1.add(controllerModelFactory.createControllerModel(controllerGrip1));
scene.add(controllerGrip1);

// Controller 1
const controller1 = renderer.xr.getController(1);
controller1.addEventListener('selectstart', onSelectStart);
scene.add(controller1);

controllerGrip2 = renderer.xr.getControllerGrip(1);
controllerGrip2.add(controllerModelFactory.createControllerModel(controllerGrip2));
scene.add(controllerGrip2);

// コントローラー接続時にハンドを判定
controller0.addEventListener('connected', (event) => {
    const handedness = event.data.handedness;
    if (handedness === 'right') {
        rightController = controller0;
    } else if (handedness === 'left') {
        leftController = controller0;
    }
});

controller1.addEventListener('connected', (event) => {
    const handedness = event.data.handedness;
    if (handedness === 'right') {
        rightController = controller1;
    } else if (handedness === 'left') {
        leftController = controller1;
    }
});

function onSelectStart(event) {
    // MR開始直後のトリガー入力は無視
    if (ignoreNextSelect) {
        return;
    }

    if (gameState === 'READY') {
        gameState = 'PLAYING';
        isServe = true;
        lastHitter = 'PLAYER';
        bounceCount = 0;
        rallyCount = 0;

        // サーブ方向
        ballVel.set(
            (Math.random() - 0.5) * 0.005,
            0.018,
            -0.03
        );
        updateUI();
    }
}

// --- マウス操作（非XR時） ---
let mouseX = 0, mouseY = 0;
window.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
});

window.addEventListener('mousedown', () => {
    if (!xrSession && gameState === 'READY') {
        gameState = 'PLAYING';
        isServe = true;
        lastHitter = 'PLAYER';
        bounceCount = 0;
        rallyCount = 0;
        ballVel.set(mouseX * 0.005, 0.018, -0.03);
        updateUI();
    }
});

// --- スコア・UI ---
function score(winner) {
    if (gameState !== 'PLAYING') return;
    if (winner === 'PLAYER') pScore++; else cScore++;
    gameState = 'READY';
    updateUI();
}

function updateUI() {
    document.getElementById('pScore').innerText = pScore;
    document.getElementById('cScore').innerText = cScore;
    document.getElementById('rally').innerText = rallyCount;
}

// --- メインループ ---
function animate() {
    // XRモード時は右コントローラーにラケットを追従
    if (xrSession && rightController) {
        pRacket.position.copy(rightController.position);
        pRacket.quaternion.copy(rightController.quaternion);

        // ラケットの向きを調整（コントローラーの前方向に）
        pRacket.rotateX(-Math.PI / 4);
    } else if (!xrSession) {
        // 非XR時はマウス操作
        pRacket.position.x = mouseX * (TABLE_W / 2);
        pRacket.position.y = Math.max(mouseY * 0.5 + TABLE_LEG_H + 0.3, TABLE_LEG_H + 0.1);
        pRacket.position.z = TABLE_OFFSET_Z + TABLE_D / 2 + 0.2; // 台の手前端
        pRacket.rotation.y = -mouseX * 0.4;
    }

    // ラケットの速度を計算
    racketVel.subVectors(pRacket.position, prevRacketPos);
    prevRacketPos.copy(pRacket.position);

    if (gameState === 'READY') {
        ball.position.copy(pRacket.position);
        ball.position.z -= 0.05;
        ball.position.y += 0.05;
        ballVel.set(0, 0, 0);
    } else if (gameState === 'PLAYING') {
        // 時間スケールでゆっくり動かす
        ballVel.y += GRAVITY * TIME_SCALE;
        ball.position.x += ballVel.x * TIME_SCALE;
        ball.position.y += ballVel.y * TIME_SCALE;
        ball.position.z += ballVel.z * TIME_SCALE;

        // --- CPUの動き ---
        const oldCpuX = cRacket.position.x;
        if (ballVel.z < 0) {
            const timeToReach = Math.abs(cpuZ - ball.position.z) / Math.abs(ballVel.z);
            let targetX = ball.position.x + (ballVel.x * timeToReach);
            targetX = Math.max(-TABLE_W / 2, Math.min(TABLE_W / 2, targetX));
            cRacket.position.x += (targetX - cRacket.position.x) * 0.12;
            cRacket.position.y += (ball.position.y - cRacket.position.y + 0.05) * 0.12;

            // 前後移動（ボールに近づく）
            const targetZ = ball.position.z - 0.15;
            const minZ = cpuZ - 0.5; // 最大前進
            const maxZ = cpuZ + 0.3; // 最大後退
            cRacket.position.z += (Math.max(minZ, Math.min(maxZ, targetZ)) - cRacket.position.z) * 0.1;

            const moveDiff = cRacket.position.x - oldCpuX;
            cRacket.rotation.z += (-moveDiff * 2 - cRacket.rotation.z) * 0.1;
            cRacket.rotation.y += (moveDiff * 3 - cRacket.rotation.y) * 0.1;
        } else {
            cRacket.position.x += (0 - cRacket.position.x) * 0.05;
            cRacket.position.y += (TABLE_LEG_H + 0.3 - cRacket.position.y) * 0.05;
            cRacket.position.z += (cpuZ - cRacket.position.z) * 0.05; // 元の位置に戻る
            cRacket.rotation.z *= 0.9;
            cRacket.rotation.y *= 0.9;
        }

        // CPUスイングアニメーション
        if (cpuSwingAnim > 0) {
            cRacket.rotation.x = -Math.PI / 4 * cpuSwingAnim;
            cpuSwingAnim *= 0.85;
        } else {
            cRacket.rotation.x = 0;
        }

        // --- 物理判定 ---

        // テーブルバウンド（ワールド座標で判定）
        const tableY = TABLE_LEG_H + TABLE_H / 2;
        const tableZMin = TABLE_OFFSET_Z - TABLE_D / 2; // 台の奥端
        const tableZMax = TABLE_OFFSET_Z + TABLE_D / 2; // 台の手前端
        const tableNetZ = TABLE_OFFSET_Z; // ネット位置

        if (ball.position.y - BALL_R < tableY &&
            Math.abs(ball.position.x) < TABLE_W / 2 &&
            ball.position.z > tableZMin && ball.position.z < tableZMax) {
            if (ballVel.y < 0) {
                ballVel.y *= -0.85;
                ball.position.y = tableY + BALL_R;
                bounceCount++;
                playBounceSound(ball.position); // 台バウンド音
                const isPlayerSide = ball.position.z > tableNetZ; // プレイヤー側はネットより手前
                if (isServe) {
                    if (bounceCount === 1 && !isPlayerSide) score('CPU');
                    else if (bounceCount === 2) {
                        if (isPlayerSide) score('CPU'); else isServe = false;
                    }
                } else {
                    if (lastHitter === 'PLAYER' && isPlayerSide) score('CPU');
                    if (lastHitter === 'CPU' && !isPlayerSide) score('PLAYER');
                    if (bounceCount >= 2) score(lastHitter === 'PLAYER' ? 'PLAYER' : 'CPU');
                }
            }
        }

        // ネット衝突
        const netY = TABLE_LEG_H + TABLE_H / 2 + NET_H;
        if (Math.abs(ball.position.z - tableNetZ) < 0.02 && ball.position.y < netY) {
            ballVel.z *= -0.4;
            ball.position.z = ball.position.z > tableNetZ ? tableNetZ + 0.03 : tableNetZ - 0.03;
            if (isServe) score('CPU');
        }

        // 打ち返し (Player)
        const pDist = ball.position.distanceTo(pRacket.position);
        if (ballVel.z > 0 && pDist < 0.15) {
            // ラケットの向きを取得
            const racketDir = new THREE.Vector3(0, 0, -1);
            racketDir.applyQuaternion(pRacket.quaternion);

            // ラケットの速度を加味して打ち返す
            const swingPower = racketVel.length() * 3;
            const power = 0.01 + swingPower;

            // ラケットの向きに基づいてボールを打ち返す
            ballVel.x = racketDir.x * power + racketVel.x * 1.2;
            ballVel.y = racketDir.y * power * 0.5 + 0.01 + Math.abs(racketVel.y) * 1.2;
            ballVel.z = racketDir.z * power;
            lastHitter = 'PLAYER';
            bounceCount = 0;
            rallyCount++;
            updateUI();
            isServe = false;
            playHitSound(pRacket.position); // プレイヤーラケット打撃音
        }

        // 打ち返し (CPU)
        const cDist = ball.position.distanceTo(cRacket.position);
        if (ballVel.z < 0 && cDist < 0.15) {
            // プレイヤーが打ち返したボールが敵陣にバウンドしていない場合は敵のポイント
            if (lastHitter === 'PLAYER' && bounceCount === 0) {
                score('CPU');
                return;
            }

            cpuSwingAnim = 1.0;

            // プレイヤーの位置を取得（XRモード時はカメラ、非XR時はラケット位置基準）
            let playerPos;
            if (xrSession) {
                playerPos = camera.position.clone();
            } else {
                playerPos = pRacket.position.clone();
            }

            // プレイヤーの視野内に確実に入るように打ち返す
            // 台のプレイヤー側（手前半分）の中心付近を狙う
            const targetZ = TABLE_OFFSET_Z + TABLE_D / 4; // プレイヤー側の台の中心
            const targetX = (Math.random() - 0.5) * (TABLE_W * 0.6); // 台の幅の60%内でランダム

            // ボールの現在位置からターゲットへの方向を計算
            const dx = targetX - ball.position.x;
            const dz = targetZ - ball.position.z;
            const distance = Math.sqrt(dx * dx + dz * dz);

            // 山なりの軌道で、プレイヤーの目の高さ付近を通るように
            // 目標の高さ：プレイヤーの視点の少し下（見やすい位置）
            const targetHeight = playerPos.y - 0.2; // プレイヤーの目線より少し下
            const tableTopY = TABLE_LEG_H + TABLE_H / 2;

            // 適切な速度を計算
            ballVel.z = 0.055; // Z方向の速度（プレイヤー側へ）

            // X方向の速度：ターゲットに向かう
            ballVel.x = dx * 0.03;

            // Y方向の速度：山なりでプレイヤーの視野内を通るように
            // ボールが最高点でプレイヤーの目線付近になるように調整
            const peakHeight = Math.max(targetHeight, tableTopY + 0.3);
            ballVel.y = 0.02 + (peakHeight - ball.position.y) * 0.015;

            lastHitter = 'CPU';
            bounceCount = 0;
            playHitSound(cRacket.position); // CPUラケット打撃音
        }

        // アウト
        if (ball.position.z > 1 || ball.position.z < tableZMin - 1.5 || ball.position.y < 0) {
            if (isServe && bounceCount < 2) score('CPU');
            else if (bounceCount === 0) score(lastHitter === 'PLAYER' ? 'CPU' : 'PLAYER');
            else score(lastHitter);
        }
    }

    renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);

// リサイズ対応
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// XRサポートチェック
checkXRSupport();
