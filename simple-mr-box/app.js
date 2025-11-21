import * as THREE from 'three';

let camera, scene, renderer;
let box;
let controller1, controller2;
let grabbedObject = null;
let grabbedController = null;
let grabOffset = new THREE.Vector3();

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
    // ユーザーの目の前、高さ1.5m、距離1mの位置に配置
    box.position.set(0, 1.5, -1);
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
        requiredFeatures: ['local-floor'],
        optionalFeatures: ['dom-overlay', 'hit-test'],
        domOverlay: { root: document.body }
    };

    navigator.xr.requestSession('immersive-ar', sessionInit)
        .then(onSessionStarted)
        .catch((error) => {
            console.error('MRセッション開始エラー:', error);
            alert('MRセッションを開始できませんでした: ' + error.message);
        });
}

async function onSessionStarted(session) {
    session.addEventListener('end', onSessionEnded);

    try {
        await renderer.xr.setSession(session);
        console.log('XRセッション開始成功');

        // コントローラーの設定
        setupControllers();

        // コントローラーの位置にキューブを配置
        // 次のフレームで実行（コントローラーの初期化を待つ）
        requestAnimationFrame(() => {
            if (controller2 && controller2.matrixWorld && box) {
                // コントローラーの位置と向きを取得
                const controllerPos = new THREE.Vector3();
                controllerPos.setFromMatrixPosition(controller2.matrixWorld);

                // コントローラーのローカル座標でのZ軸方向（コントローラーが指している方向）を取得
                const direction = new THREE.Vector3(0, 0, -1);
                direction.applyQuaternion(controller2.quaternion);

                // コントローラーの前方20cmの位置に配置
                box.position.copy(controllerPos).add(direction.multiplyScalar(0.2));
                console.log('キューブをコントローラーの前に配置しました');
            }
        });

        // UIを非表示
        document.getElementById('info').style.display = 'none';
    } catch (error) {
        console.error('XRセッション設定エラー:', error);
        session.end();
    }
}

function onSessionEnded() {
    // UIを再表示
    document.getElementById('info').style.display = 'flex';
}

function setupControllers() {
    // コントローラー1の設定
    controller1 = renderer.xr.getController(0);
    controller1.addEventListener('selectstart', onSelectStart);
    controller1.addEventListener('selectend', onSelectEnd);
    scene.add(controller1);

    // コントローラー2の設定
    controller2 = renderer.xr.getController(1);
    controller2.addEventListener('selectstart', onSelectStart);
    controller2.addEventListener('selectend', onSelectEnd);
    scene.add(controller2);

    // コントローラーの視覚的な表現を追加
    const geometry = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(0, 0, -1)
    ]);
    const material = new THREE.LineBasicMaterial({ color: 0xffffff });

    const line1 = new THREE.Line(geometry, material);
    controller1.add(line1.clone());

    const line2 = new THREE.Line(geometry, material);
    controller2.add(line2.clone());
}

function onSelectStart(event) {
    const controller = event.target;

    // レイキャストで掴めるオブジェクトを検出
    const tempMatrix = new THREE.Matrix4();
    tempMatrix.identity().extractRotation(controller.matrixWorld);

    const raycaster = new THREE.Raycaster();
    raycaster.ray.origin.setFromMatrixPosition(controller.matrixWorld);
    raycaster.ray.direction.set(0, 0, -1).applyMatrix4(tempMatrix);

    const intersects = raycaster.intersectObject(box, true);

    if (intersects.length > 0) {
        // オブジェクトを掴む
        grabbedObject = box;
        grabbedController = controller;

        // レーザーが当たった位置とオブジェクトの中心との距離を記録
        const intersectPoint = intersects[0].point;
        grabOffset.copy(box.position).sub(intersectPoint);

        // オブジェクトの色を変更（掴んだことを示す）
        box.material.color.setHex(0xff6b6b);
    }
}

function onSelectEnd(event) {
    if (grabbedController === event.target) {
        // オブジェクトを離す
        grabbedObject = null;
        grabbedController = null;

        // 色を元に戻す
        box.material.color.setHex(0x6366f1);
    }
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function render() {
    // オブジェクトが掴まれている場合、レーザーの位置に追従させる
    if (grabbedObject && grabbedController) {
        // レイキャストでレーザーの当たっている位置を計算
        const tempMatrix = new THREE.Matrix4();
        tempMatrix.identity().extractRotation(grabbedController.matrixWorld);

        const raycaster = new THREE.Raycaster();
        raycaster.ray.origin.setFromMatrixPosition(grabbedController.matrixWorld);
        raycaster.ray.direction.set(0, 0, -1).applyMatrix4(tempMatrix);

        // レーザーが当たった位置を取得（最初に掴んだ距離を保持）
        const intersects = raycaster.intersectObject(grabbedObject, true);
        if (intersects.length > 0) {
            // レーザーが当たった位置 + 掴んだ時のオフセット
            grabbedObject.position.copy(intersects[0].point).add(grabOffset);
        }
    } else if (box) {
        // 掴まれていない時はゆっくり回転
        box.rotation.x += 0.005;
        box.rotation.y += 0.01;
    }

    renderer.render(scene, camera);
}
