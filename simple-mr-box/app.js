import * as THREE from 'three';

let camera, scene, renderer;
let box;

init();

function init() {
    // シーンの作成
    scene = new THREE.Scene();

    // カメラの作成
    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 20);

    // ライトの追加
    const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
    light.position.set(0.5, 1, 0.25);
    scene.add(light);

    // ボックスの作成（30cm x 30cm x 30cm）
    const geometry = new THREE.BoxGeometry(0.3, 0.3, 0.3);
    const material = new THREE.MeshStandardMaterial({
        color: 0x6366f1,
        metalness: 0.5,
        roughness: 0.5
    });
    box = new THREE.Mesh(geometry, material);
    // ユーザーの前方1.5m、高さ1.5mの位置に配置
    box.position.set(0, 1.5, -1.5);
    scene.add(box);

    // エッジを追加（見やすくするため）
    const edges = new THREE.EdgesGeometry(geometry);
    const edgeMaterial = new THREE.LineBasicMaterial({ color: 0xffffff });
    const edgeLines = new THREE.LineSegments(edges, edgeMaterial);
    box.add(edgeLines);

    // レンダラーの作成
    renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.xr.enabled = true;
    document.body.appendChild(renderer.domElement);

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
        requiredFeatures: ['hit-test'],
        optionalFeatures: ['dom-overlay'],
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

function render() {
    // ボックスをゆっくり回転させる
    if (box) {
        box.rotation.x += 0.005;
        box.rotation.y += 0.01;
    }

    renderer.render(scene, camera);
}
