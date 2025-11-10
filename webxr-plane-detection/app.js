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

// Depth Sensing アプリケーション
class DepthSensingApp {
    constructor() {
        this.xrSession = null;
        this.xrRefSpace = null;
        this.gl = null;
        this.canvas = null;
        this.cube = null;
        this.gripSpace = null;
        this.isGrabbing = false;
        this.cubeOffset = { position: { x: 0, y: 0, z: 0 }, rotation: { x: 0, y: 0, z: 0, w: 1 } };

        this.statusElement = document.getElementById('depthStatus');
        this.startButton = document.getElementById('depthStartButton');

        this.init();
    }

    async init() {
        // WebXRサポートチェック
        if (!navigator.xr) {
            this.updateStatus('WebXRがサポートされていません');
            return;
        }

        // AR + depth-sensing のサポートチェック
        const supported = await navigator.xr.isSessionSupported('immersive-ar');
        if (!supported) {
            this.updateStatus('immersive-ARがサポートされていません');
            return;
        }

        this.updateStatus('準備完了');
        this.startButton.disabled = false;
        this.startButton.textContent = 'Depth Sensing ARを開始';
        this.startButton.addEventListener('click', () => this.startXR());
    }

    updateStatus(message) {
        this.statusElement.textContent = message;
        console.log('[DepthSensing]', message);
    }

    async startXR() {
        try {
            // XRセッションを開始
            this.xrSession = await navigator.xr.requestSession('immersive-ar', {
                requiredFeatures: ['local'],
                optionalFeatures: ['depth-sensing', 'hand-tracking'],
                depthSensing: {
                    usagePreference: ['cpu-optimized'],  // CPU最適化のみを指定
                    dataFormatPreference: ['luminance-alpha', 'float32']
                }
            });

            this.updateStatus('Depth Sensing ARセッション開始');

            // Depth Sensingの設定を確認
            if (this.xrSession.depthUsage) {
                console.log('[DepthSensing] Depth usage mode:', this.xrSession.depthUsage);
            }
            if (this.xrSession.depthDataFormat) {
                console.log('[DepthSensing] Depth data format:', this.xrSession.depthDataFormat);
            }

            // Canvas設定
            this.canvas = document.getElementById('xrCanvas');
            // WebGL2が必要（texture-array用）
            this.gl = this.canvas.getContext('webgl2', { xrCompatible: true });

            if (!this.gl) {
                console.warn('[DepthSensing] WebGL2 not available, trying WebGL1');
                this.gl = this.canvas.getContext('webgl', { xrCompatible: true });
            }

            if (!this.gl) {
                throw new Error('WebGLコンテキストの作成に失敗しました');
            }

            console.log('[DepthSensing] WebGL version:', this.gl.getParameter(this.gl.VERSION));

            // XRレイヤー設定
            await this.gl.makeXRCompatible();
            const layer = new XRWebGLLayer(this.xrSession, this.gl);
            this.xrSession.updateRenderState({ baseLayer: layer });

            // XRWebGLBindingを作成（GPU最適化モード用）
            this.xrGLBinding = new XRWebGLBinding(this.xrSession, this.gl);
            console.log('[DepthSensing] XRWebGLBinding created');

            // 参照空間の取得
            this.xrRefSpace = await this.xrSession.requestReferenceSpace('local');

            // キューブを初期化
            this.initCube();

            // 入力ソースの監視
            this.xrSession.addEventListener('selectstart', (event) => this.onSelectStart(event));
            this.xrSession.addEventListener('selectend', (event) => this.onSelectEnd(event));

            // レンダリングループ開始
            this.xrSession.requestAnimationFrame((time, frame) => this.onXRFrame(time, frame));

            // セッション終了時のハンドラ
            this.xrSession.addEventListener('end', () => this.onSessionEnd());

        } catch (error) {
            this.updateStatus('エラー: ' + error.message);
            console.error('XRセッション開始エラー:', error);
        }
    }

    initCube() {
        // キューブの頂点データ
        const vertices = new Float32Array([
            // Front face
            -0.1, -0.1,  0.1,
             0.1, -0.1,  0.1,
             0.1,  0.1,  0.1,
            -0.1,  0.1,  0.1,
            // Back face
            -0.1, -0.1, -0.1,
            -0.1,  0.1, -0.1,
             0.1,  0.1, -0.1,
             0.1, -0.1, -0.1,
            // Top face
            -0.1,  0.1, -0.1,
            -0.1,  0.1,  0.1,
             0.1,  0.1,  0.1,
             0.1,  0.1, -0.1,
            // Bottom face
            -0.1, -0.1, -0.1,
             0.1, -0.1, -0.1,
             0.1, -0.1,  0.1,
            -0.1, -0.1,  0.1,
            // Right face
             0.1, -0.1, -0.1,
             0.1,  0.1, -0.1,
             0.1,  0.1,  0.1,
             0.1, -0.1,  0.1,
            // Left face
            -0.1, -0.1, -0.1,
            -0.1, -0.1,  0.1,
            -0.1,  0.1,  0.1,
            -0.1,  0.1, -0.1,
        ]);

        // キューブのインデックス
        const indices = new Uint16Array([
            0,  1,  2,    0,  2,  3,    // front
            4,  5,  6,    4,  6,  7,    // back
            8,  9, 10,    8, 10, 11,    // top
           12, 13, 14,   12, 14, 15,    // bottom
           16, 17, 18,   16, 18, 19,    // right
           20, 21, 22,   20, 22, 23,    // left
        ]);

        // キューブの色（面ごと）
        const colors = new Float32Array([
            // Front face - red
            1.0, 0.0, 0.0, 1.0,
            1.0, 0.0, 0.0, 1.0,
            1.0, 0.0, 0.0, 1.0,
            1.0, 0.0, 0.0, 1.0,
            // Back face - green
            0.0, 1.0, 0.0, 1.0,
            0.0, 1.0, 0.0, 1.0,
            0.0, 1.0, 0.0, 1.0,
            0.0, 1.0, 0.0, 1.0,
            // Top face - blue
            0.0, 0.0, 1.0, 1.0,
            0.0, 0.0, 1.0, 1.0,
            0.0, 0.0, 1.0, 1.0,
            0.0, 0.0, 1.0, 1.0,
            // Bottom face - yellow
            1.0, 1.0, 0.0, 1.0,
            1.0, 1.0, 0.0, 1.0,
            1.0, 1.0, 0.0, 1.0,
            1.0, 1.0, 0.0, 1.0,
            // Right face - purple
            1.0, 0.0, 1.0, 1.0,
            1.0, 0.0, 1.0, 1.0,
            1.0, 0.0, 1.0, 1.0,
            1.0, 0.0, 1.0, 1.0,
            // Left face - cyan
            0.0, 1.0, 1.0, 1.0,
            0.0, 1.0, 1.0, 1.0,
            0.0, 1.0, 1.0, 1.0,
            0.0, 1.0, 1.0, 1.0,
        ]);

        // バッファを作成
        const vertexBuffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, vertexBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, vertices, this.gl.STATIC_DRAW);

        const colorBuffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, colorBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, colors, this.gl.STATIC_DRAW);

        const indexBuffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
        this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, indices, this.gl.STATIC_DRAW);

        this.cube = {
            vertexBuffer,
            colorBuffer,
            indexBuffer,
            indexCount: indices.length,
            position: { x: 0, y: 0, z: -0.5 },
            rotation: 0
        };
    }

    onSelectStart(event) {
        const inputSource = event.inputSource;
        if (inputSource.handedness === 'right' && inputSource.gripSpace) {
            // つかんだ瞬間のコントローラーとキューブの相対位置を計算
            const gripPose = this.xrSession ?
                this.lastFrame?.getPose(inputSource.gripSpace, this.xrRefSpace) : null;

            if (gripPose) {
                const transform = gripPose.transform;
                this.cubeOffset.position.x = this.cube.position.x - transform.position.x;
                this.cubeOffset.position.y = this.cube.position.y - transform.position.y;
                this.cubeOffset.position.z = this.cube.position.z - transform.position.z;
            }

            this.isGrabbing = true;
            this.gripSpace = inputSource.gripSpace;
            console.log('キューブをつかみました');
        }
    }

    onSelectEnd(event) {
        const inputSource = event.inputSource;
        if (inputSource.handedness === 'right') {
            this.isGrabbing = false;
            this.gripSpace = null;
            console.log('キューブを放しました');
        }
    }

    onXRFrame(time, frame) {
        const session = frame.session;
        session.requestAnimationFrame((time, frame) => this.onXRFrame(time, frame));

        // フレームを保存（onSelectStartで使用）
        this.lastFrame = frame;

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

        // 入力ソースの処理
        for (const inputSource of session.inputSources) {
            if (inputSource.handedness === 'right' && inputSource.gripSpace) {
                const gripPose = frame.getPose(inputSource.gripSpace, this.xrRefSpace);
                if (gripPose) {
                    if (this.isGrabbing) {
                        // つかんでいる場合はコントローラーの位置に追従
                        const transform = gripPose.transform;
                        this.cube.position.x = transform.position.x + this.cubeOffset.position.x;
                        this.cube.position.y = transform.position.y + this.cubeOffset.position.y;
                        this.cube.position.z = transform.position.z + this.cubeOffset.position.z;
                    }
                    // つかんでいない場合は何もしない（キューブは固定位置に留まる）
                }
            }
        }

        // Depth Sensingデータの処理（GPU最適化モード）
        this.depthInfo = null;
        if (this.xrGLBinding && this.xrGLBinding.getDepthInformation) {
            try {
                const depthInfo = this.xrGLBinding.getDepthInformation(pose.views[0]);
                if (depthInfo) {
                    // GPU Depth データが利用可能
                    this.depthInfo = depthInfo;

                    // 初回のみログ出力
                    if (!this.depthLogged) {
                        console.log('[DepthSensing] GPU Depth data available:', {
                            texture: !!depthInfo.texture,
                            textureType: depthInfo.textureType,
                            hasNormMatrix: !!depthInfo.normDepthBufferFromNormView
                        });
                        this.depthLogged = true;
                    }
                } else {
                    if (!this.depthUnavailableLogged) {
                        console.log('[DepthSensing] GPU Depth info is null');
                        this.depthUnavailableLogged = true;
                    }
                }
            } catch (error) {
                if (!this.depthErrorLogged) {
                    console.error('[DepthSensing] Error getting GPU depth info:', error);
                    this.depthErrorLogged = true;
                }
            }
        } else {
            if (!this.depthNotSupportedLogged) {
                console.log('[DepthSensing] XRWebGLBinding.getDepthInformation is not available');
                this.depthNotSupportedLogged = true;
            }
        }

        // キューブの回転
        this.cube.rotation += 0.01;

        // 各ビューをレンダリング
        for (let viewIndex = 0; viewIndex < pose.views.length; viewIndex++) {
            const view = pose.views[viewIndex];
            const viewport = layer.getViewport(view);
            this.gl.viewport(viewport.x, viewport.y, viewport.width, viewport.height);

            // キューブの描画（ビューインデックスを渡す）
            this.renderCube(view.projectionMatrix, view.transform, view, viewIndex);
        }
    }

    renderCube(projectionMatrix, viewTransform, view, viewIndex) {
        // シェーダープログラムがまだ作成されていない場合は作成
        if (!this.shaderProgram) {
            this.initShaders();
        }

        this.gl.useProgram(this.shaderProgram);

        // Depth Sensingのテクスチャをバインド
        if (this.depthInfo) {
            this.setupDepthTexture(view, viewIndex);
        } else {
            // 深度が利用できない場合
            const useDepthLocation = this.gl.getUniformLocation(this.shaderProgram, 'u_useDepth');
            this.gl.uniform1i(useDepthLocation, 0);
        }

        // モデル行列の作成
        const modelMatrix = this.createModelMatrix(
            this.cube.position,
            this.cube.rotation
        );

        // ビュー行列
        const viewMatrix = viewTransform.inverse.matrix;

        // MVP行列の計算
        const modelView = this.multiplyMatrices(viewMatrix, modelMatrix);
        const mvpMatrix = this.multiplyMatrices(projectionMatrix, modelView);

        // ユニフォーム変数を設定
        this.gl.uniformMatrix4fv(
            this.gl.getUniformLocation(this.shaderProgram, 'u_mvpMatrix'),
            false,
            mvpMatrix
        );

        // 頂点データをバインド
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.cube.vertexBuffer);
        const positionLocation = this.gl.getAttribLocation(this.shaderProgram, 'a_position');
        this.gl.enableVertexAttribArray(positionLocation);
        this.gl.vertexAttribPointer(positionLocation, 3, this.gl.FLOAT, false, 0, 0);

        // 色データをバインド
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.cube.colorBuffer);
        const colorLocation = this.gl.getAttribLocation(this.shaderProgram, 'a_color');
        this.gl.enableVertexAttribArray(colorLocation);
        this.gl.vertexAttribPointer(colorLocation, 4, this.gl.FLOAT, false, 0, 0);

        // インデックスバッファをバインド
        this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.cube.indexBuffer);

        // 描画
        this.gl.drawElements(this.gl.TRIANGLES, this.cube.indexCount, this.gl.UNSIGNED_SHORT, 0);
    }

    createModelMatrix(position, rotation) {
        // 平行移動行列
        const translation = new Float32Array([
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            position.x, position.y, position.z, 1
        ]);

        // Y軸回転行列
        const c = Math.cos(rotation);
        const s = Math.sin(rotation);
        const rotationMatrix = new Float32Array([
            c, 0, s, 0,
            0, 1, 0, 0,
            -s, 0, c, 0,
            0, 0, 0, 1
        ]);

        return this.multiplyMatrices(translation, rotationMatrix);
    }

    setupDepthTexture(view, viewIndex) {
        if (!this.depthInfo) {
            return;
        }

        // GPU最適化モード: WebGLテクスチャを直接使用
        const depthTexture = this.depthInfo.texture;
        if (!depthTexture) {
            console.error('[DepthSensing] No depth texture available from XRWebGLBinding');
            return;
        }

        // テクスチャタイプに応じてバインド
        const textureType = this.depthInfo.textureType;
        this.gl.activeTexture(this.gl.TEXTURE0);

        // WebGL2が必要（texture-array用）
        if (!this.gl.TEXTURE_2D_ARRAY) {
            console.error('[DepthSensing] WebGL2 is required for texture-array');
            return;
        }

        if (textureType === 'texture-array') {
            this.gl.bindTexture(this.gl.TEXTURE_2D_ARRAY, depthTexture);
            this.textureTarget = this.gl.TEXTURE_2D_ARRAY;
        } else {
            this.gl.bindTexture(this.gl.TEXTURE_2D, depthTexture);
            this.textureTarget = this.gl.TEXTURE_2D;
        }

        // シェーダーにユニフォームを設定
        const depthTextureLocation = this.gl.getUniformLocation(this.shaderProgram, 'u_depthTexture');
        this.gl.uniform1i(depthTextureLocation, 0);

        // ビューインデックスをシェーダーに渡す（左目=0, 右目=1）
        const viewIndexLocation = this.gl.getUniformLocation(this.shaderProgram, 'u_viewIndex');
        this.gl.uniform1i(viewIndexLocation, viewIndex);

        // 深度情報の正規化行列をシェーダーに渡す
        const normTextureFromNormViewLocation = this.gl.getUniformLocation(this.shaderProgram, 'u_uvTransform');
        if (normTextureFromNormViewLocation && this.depthInfo.normDepthBufferFromNormView) {
            this.gl.uniformMatrix4fv(normTextureFromNormViewLocation, false, this.depthInfo.normDepthBufferFromNormView.matrix);

            if (!this.uvTransformLogged) {
                console.log('[DepthSensing] UV transform matrix set');
                this.uvTransformLogged = true;
            }
        } else {
            if (!this.noMatrixLogged) {
                console.warn('[DepthSensing] No normDepthBufferFromNormView matrix available');
                this.noMatrixLogged = true;
            }
        }

        // 深度が利用可能かどうかのフラグ
        const useDepthLocation = this.gl.getUniformLocation(this.shaderProgram, 'u_useDepth');
        this.gl.uniform1i(useDepthLocation, 1);

        if (!this.textureSetupLogged) {
            console.log('[DepthSensing] GPU Depth texture bound successfully');
            this.textureSetupLogged = true;
        }
    }

    initShaders() {
        const vertexShaderSource = `#version 300 es
            in vec3 a_position;
            in vec4 a_color;
            uniform mat4 u_mvpMatrix;
            out vec4 v_color;
            out vec4 v_position;

            void main() {
                gl_Position = u_mvpMatrix * vec4(a_position, 1.0);
                v_color = a_color;
                v_position = gl_Position;
            }
        `;

        const fragmentShaderSource = `#version 300 es
            precision highp float;
            precision highp sampler2DArray;

            in vec4 v_color;
            in vec4 v_position;
            out vec4 fragColor;

            uniform sampler2DArray u_depthTexture;
            uniform mat4 u_uvTransform;
            uniform int u_useDepth;
            uniform int u_viewIndex;

            float reconstructDepth(vec3 uvw) {
                vec4 depthSample = texture(u_depthTexture, uvw);
                // GPU最適化モード: unsigned-short形式（16ビット）
                // r=上位バイト、a=下位バイト
                return depthSample.r + depthSample.a / 256.0;
            }

            // バイラテラルフィルタを使った深度サンプリング
            float sampleDepthSmooth(vec3 uvw, vec2 texelSize) {
                float centerDepth = reconstructDepth(uvw);

                // 周辺4サンプルの平均を取る
                float sum = centerDepth;
                float weight = 1.0;

                vec2 offsets[4];
                offsets[0] = vec2(texelSize.x, 0.0);
                offsets[1] = vec2(-texelSize.x, 0.0);
                offsets[2] = vec2(0.0, texelSize.y);
                offsets[3] = vec2(0.0, -texelSize.y);

                for (int i = 0; i < 4; i++) {
                    vec3 sampleUVW = vec3(uvw.xy + offsets[i], uvw.z);
                    float sampleDepth = reconstructDepth(sampleUVW);

                    // 深度差が小さい場合のみ平均に含める（バイラテラルフィルタ）
                    float depthDiff = abs(sampleDepth - centerDepth);
                    if (depthDiff < 0.05) {
                        sum += sampleDepth;
                        weight += 1.0;
                    }
                }

                return sum / weight;
            }

            void main() {
                if (u_useDepth == 1) {
                    // 正規化デバイス座標 (-1 to 1)
                    vec3 ndc = v_position.xyz / v_position.w;

                    // NDC座標を正規化ビュー座標 (0 to 1) に変換
                    vec2 normView = ndc.xy * 0.5 + 0.5;

                    // UV変換行列を使用してDepthバッファ座標を計算
                    vec4 depthBufferCoord = u_uvTransform * vec4(normView, 0.0, 1.0);
                    vec2 uv = depthBufferCoord.xy / depthBufferCoord.w;

                    // UV座標が範囲内かチェック
                    if (uv.x < 0.0 || uv.x > 1.0 || uv.y < 0.0 || uv.y > 1.0) {
                        fragColor = v_color;
                        return;
                    }

                    // 2D配列テクスチャのレイヤーをビューインデックスで選択
                    vec3 uvw = vec3(uv, float(u_viewIndex));

                    // テクセルサイズ（フィルタリング用）
                    vec2 texelSize = vec2(1.0 / 256.0, 1.0 / 256.0);

                    // スムーズな深度値を取得
                    float realWorldDepth = sampleDepthSmooth(uvw, texelSize);

                    // 現在のフラグメントの正規化深度（0.0=近い, 1.0=遠い）
                    float fragDepth = ndc.z * 0.5 + 0.5;

                    // ソフトオクルージョン - 境界付近でアルファブレンディング
                    float depthDiff = fragDepth - realWorldDepth;

                    if (realWorldDepth > 0.0) {
                        // 完全に手前にある場合は破棄
                        if (depthDiff > 0.015) {
                            discard;
                        }
                        // 境界付近では透明度を調整
                        else if (depthDiff > 0.005) {
                            float alpha = (depthDiff - 0.005) / 0.01;
                            fragColor = vec4(v_color.rgb, v_color.a * (1.0 - alpha));
                            return;
                        }
                    }
                }

                fragColor = v_color;
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
        if (this.cube) {
            this.gl.deleteBuffer(this.cube.vertexBuffer);
            this.gl.deleteBuffer(this.cube.colorBuffer);
            this.gl.deleteBuffer(this.cube.indexBuffer);
            this.cube = null;
        }

        // ボタンを再度有効化
        this.startButton.disabled = false;
    }
}

// アプリケーション起動
window.addEventListener('load', () => {
    new PlaneDetectionApp();
    new DepthSensingApp();
});
