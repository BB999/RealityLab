// WebXR 平面検出アプリケーション
class PlaneDetectionApp {
    constructor() {
        this.xrSession = null;
        this.xrRefSpace = null;
        this.gl = null;
        this.canvas = null;
        this.detectedPlanes = new Map();
        this.planeMeshes = new Map();

        this.statusElement = document.getElementById('status');
        this.startButton = document.getElementById('startButton');

        this.init();
    }

    async init() {
        // WebXRサポートチェック
        if (!navigator.xr) {
            this.updateStatus('WebXRがサポートされていません');
            return;
        }

        // AR + 平面検出のサポートチェック
        const supported = await navigator.xr.isSessionSupported('immersive-ar');
        if (!supported) {
            this.updateStatus('immersive-ARがサポートされていません');
            return;
        }

        this.updateStatus('準備完了');
        this.startButton.disabled = false;
        this.startButton.textContent = 'ARを開始';
        this.startButton.addEventListener('click', () => this.startXR());
    }

    updateStatus(message) {
        this.statusElement.textContent = message;
        console.log(message);
    }

    async startXR() {
        try {
            // XRセッションを開始
            this.xrSession = await navigator.xr.requestSession('immersive-ar', {
                requiredFeatures: ['hit-test', 'local'],
                optionalFeatures: ['plane-detection', 'depth-sensing'],
                depthSensing: {
                    usagePreference: ['cpu-optimized', 'gpu-optimized'],
                    dataFormatPreference: ['luminance-alpha', 'float32']
                }
            });

            this.updateStatus('ARセッション開始');

            // Canvas設定
            this.canvas = document.getElementById('xrCanvas');
            this.gl = this.canvas.getContext('webgl', { xrCompatible: true });

            if (!this.gl) {
                throw new Error('WebGLコンテキストの作成に失敗しました');
            }

            // XRレイヤー設定
            await this.gl.makeXRCompatible();
            const layer = new XRWebGLLayer(this.xrSession, this.gl);
            this.xrSession.updateRenderState({ baseLayer: layer });

            // 参照空間の取得
            this.xrRefSpace = await this.xrSession.requestReferenceSpace('local');

            // レンダリングループ開始
            this.xrSession.requestAnimationFrame((time, frame) => this.onXRFrame(time, frame));

            // セッション終了時のハンドラ
            this.xrSession.addEventListener('end', () => this.onSessionEnd());

        } catch (error) {
            this.updateStatus('エラー: ' + error.message);
            console.error('XRセッション開始エラー:', error);
        }
    }

    onXRFrame(time, frame) {
        const session = frame.session;
        session.requestAnimationFrame((time, frame) => this.onXRFrame(time, frame));

        // ビューアーのポーズを取得
        const pose = frame.getViewerPose(this.xrRefSpace);
        if (!pose) return;

        // WebGLの準備
        const layer = session.renderState.baseLayer;
        this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, layer.framebuffer);

        // 画面クリア
        this.gl.clearColor(0, 0, 0, 0);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.enable(this.gl.BLEND);
        this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);

        // 平面検出の更新
        this.updateDetectedPlanes(frame);

        // 各ビューをレンダリング
        for (const view of pose.views) {
            const viewport = layer.getViewport(view);
            this.gl.viewport(viewport.x, viewport.y, viewport.width, viewport.height);

            // 平面の描画
            this.renderPlanes(frame, view.projectionMatrix, view.transform);
        }
    }

    updateDetectedPlanes(frame) {
        // 平面検出結果を取得
        const detectedPlanes = frame.detectedPlanes;

        if (!detectedPlanes) {
            // 平面検出がサポートされていない場合
            return;
        }

        // 新しい平面と更新された平面を処理
        detectedPlanes.forEach(plane => {
            if (!this.detectedPlanes.has(plane)) {
                // 新しい平面
                this.detectedPlanes.set(plane, {
                    orientation: plane.orientation,
                    polygon: plane.polygon,
                    lastChanged: plane.lastChangedTime
                });

                // メッシュを作成
                this.createPlaneMesh(plane);

                console.log(`新しい平面を検出: ${plane.orientation}`);
            } else {
                // 既存の平面が更新された場合
                const planeData = this.detectedPlanes.get(plane);
                if (planeData.lastChanged !== plane.lastChangedTime) {
                    planeData.polygon = plane.polygon;
                    planeData.lastChanged = plane.lastChangedTime;

                    // メッシュを更新
                    this.updatePlaneMesh(plane);
                }
            }
        });

        // 削除された平面を処理
        this.detectedPlanes.forEach((planeData, plane) => {
            if (!detectedPlanes.has(plane)) {
                this.detectedPlanes.delete(plane);
                this.deletePlaneMesh(plane);
                console.log('平面が削除されました');
            }
        });
    }

    createPlaneMesh(plane) {
        const polygon = plane.polygon;

        // ポリゴンを三角形に分割（ファン三角分割）
        const vertices = [];
        const indices = [];

        for (let i = 0; i < polygon.length; i++) {
            vertices.push(polygon[i].x, polygon[i].y, polygon[i].z);
        }

        // 三角形インデックスを生成
        for (let i = 1; i < polygon.length - 1; i++) {
            indices.push(0, i, i + 1);
        }

        // WebGLバッファを作成
        const vertexBuffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, vertexBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(vertices), this.gl.STATIC_DRAW);

        const indexBuffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
        this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), this.gl.STATIC_DRAW);

        // 平面の向きによって色を変える
        let color;
        switch (plane.orientation) {
            case 'horizontal':
                color = [0.2, 0.8, 0.2, 0.4]; // 緑 - 床
                break;
            case 'vertical':
                color = [0.2, 0.4, 0.8, 0.4]; // 青 - 壁
                break;
            default:
                color = [0.8, 0.8, 0.2, 0.4]; // 黄色 - その他
        }

        this.planeMeshes.set(plane, {
            vertexBuffer,
            indexBuffer,
            indexCount: indices.length,
            color,
            pose: plane.planeSpace
        });
    }

    updatePlaneMesh(plane) {
        // 既存のメッシュを削除して新しく作成
        this.deletePlaneMesh(plane);
        this.createPlaneMesh(plane);
    }

    deletePlaneMesh(plane) {
        const mesh = this.planeMeshes.get(plane);
        if (mesh) {
            this.gl.deleteBuffer(mesh.vertexBuffer);
            this.gl.deleteBuffer(mesh.indexBuffer);
            this.planeMeshes.delete(plane);
        }
    }

    renderPlanes(frame, projectionMatrix, viewTransform) {
        // シェーダープログラムがまだ作成されていない場合は作成
        if (!this.shaderProgram) {
            this.initShaders();
        }

        this.gl.useProgram(this.shaderProgram);

        // 平面を描画
        this.planeMeshes.forEach((mesh, plane) => {
            try {
                // 平面の姿勢を取得
                const planePose = frame.getPose(mesh.pose, this.xrRefSpace);
                if (!planePose) return;

                // デバッグ: 平面の位置を出力（最初の平面のみ）
                if (this.debugCount === undefined) this.debugCount = 0;
                if (this.debugCount < 1) {
                    console.log('平面の位置:', planePose.transform.position);
                    this.debugCount++;
                }

                // モデルビュープロジェクション行列を計算
                // viewTransform.inverse.matrix はワールド空間からビュー空間への変換
                const modelMatrix = planePose.transform.matrix;
                const viewMatrix = viewTransform.inverse.matrix;

                // Model → View → Projection の順で変換
                const modelView = this.multiplyMatrices(viewMatrix, modelMatrix);
                const mvpMatrix = this.multiplyMatrices(projectionMatrix, modelView);

                // ユニフォーム変数を設定
                this.gl.uniformMatrix4fv(
                    this.gl.getUniformLocation(this.shaderProgram, 'u_mvpMatrix'),
                    false,
                    mvpMatrix
                );
                this.gl.uniform4fv(
                    this.gl.getUniformLocation(this.shaderProgram, 'u_color'),
                    mesh.color
                );

                // 頂点データをバインド
                this.gl.bindBuffer(this.gl.ARRAY_BUFFER, mesh.vertexBuffer);
                const positionLocation = this.gl.getAttribLocation(this.shaderProgram, 'a_position');
                this.gl.enableVertexAttribArray(positionLocation);
                this.gl.vertexAttribPointer(positionLocation, 3, this.gl.FLOAT, false, 0, 0);

                // インデックスバッファをバインド
                this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, mesh.indexBuffer);

                // 描画
                this.gl.drawElements(this.gl.TRIANGLES, mesh.indexCount, this.gl.UNSIGNED_SHORT, 0);

            } catch (error) {
                console.error('平面描画エラー:', error);
            }
        });
    }

    initShaders() {
        const vertexShaderSource = `
            attribute vec3 a_position;
            uniform mat4 u_mvpMatrix;

            void main() {
                gl_Position = u_mvpMatrix * vec4(a_position, 1.0);
            }
        `;

        const fragmentShaderSource = `
            precision mediump float;
            uniform vec4 u_color;

            void main() {
                gl_FragColor = u_color;
            }
        `;

        // 頂点シェーダーをコンパイル
        const vertexShader = this.gl.createShader(this.gl.VERTEX_SHADER);
        this.gl.shaderSource(vertexShader, vertexShaderSource);
        this.gl.compileShader(vertexShader);

        // フラグメントシェーダーをコンパイル
        const fragmentShader = this.gl.createShader(this.gl.FRAGMENT_SHADER);
        this.gl.shaderSource(fragmentShader, fragmentShaderSource);
        this.gl.compileShader(fragmentShader);

        // プログラムをリンク
        this.shaderProgram = this.gl.createProgram();
        this.gl.attachShader(this.shaderProgram, vertexShader);
        this.gl.attachShader(this.shaderProgram, fragmentShader);
        this.gl.linkProgram(this.shaderProgram);

        // エラーチェック
        if (!this.gl.getProgramParameter(this.shaderProgram, this.gl.LINK_STATUS)) {
            console.error('シェーダープログラムのリンクエラー');
        }
    }

    multiplyMatrices(a, b) {
        // WebGLは列優先（column-major）行列を使用
        const result = new Float32Array(16);
        for (let col = 0; col < 4; col++) {
            for (let row = 0; row < 4; row++) {
                result[col * 4 + row] = 0;
                for (let k = 0; k < 4; k++) {
                    result[col * 4 + row] += a[k * 4 + row] * b[col * 4 + k];
                }
            }
        }
        return result;
    }

    onSessionEnd() {
        this.xrSession = null;
        this.updateStatus('ARセッション終了');

        // リソースのクリーンアップ
        this.planeMeshes.forEach(mesh => {
            this.gl.deleteBuffer(mesh.vertexBuffer);
            this.gl.deleteBuffer(mesh.indexBuffer);
        });
        this.planeMeshes.clear();
        this.detectedPlanes.clear();

        // ボタンを再度有効化
        this.startButton.disabled = false;
    }
}

// アプリケーション起動
window.addEventListener('load', () => {
    new PlaneDetectionApp();
});
