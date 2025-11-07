import * as THREE from 'three';

class HandFireMR {
    constructor() {
        this.canvas = document.getElementById('canvas');
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.01, 100);
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            alpha: true,
            antialias: true
        });

        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.xr.enabled = true;

        // 手のトラッキング用
        this.hands = {
            left: null,
            right: null
        };

        // パーティクルのプール（ワールド空間で独立して動く）
        this.particlePool = {
            left: [],
            right: []
        };

        // 手の状態（パーかグーか）
        this.handStates = {
            left: false,  // false = グー, true = パー
            right: false
        };

        // パーティクルのメッシュを格納するグループ
        this.particleGroup = new THREE.Group();

        // 手首の周りを回るキューブ
        this.wristCubes = {
            left: [],
            right: []
        };
        this.wristCubeGroup = null;
        this.cubeRotationAngle = 0;

        this.init();
    }

    init() {
        // ライティング
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
        this.scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
        directionalLight.position.set(0, 5, 5);
        this.scene.add(directionalLight);

        // パーティクルグループをシーンに追加
        this.scene.add(this.particleGroup);

        // 手首のキューブグループを作成
        this.wristCubeGroup = new THREE.Group();
        this.scene.add(this.wristCubeGroup);
        this.createWristCubes();

        // パーティクル生成のタイマー
        this.lastParticleSpawn = {
            left: 0,
            right: 0
        };

        // ヒットテスト用のキャッシュ
        this.hitTestCache = new Map();
        this.lastHitTestTime = 0;
    }

    createWristCubes() {
        const cubeCount = 8;
        const cubeSize = 0.015;

        // 左手首の周りを回るキューブ（青）
        for (let i = 0; i < cubeCount; i++) {
            const geometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
            const material = new THREE.MeshBasicMaterial({
                color: new THREE.Color(0.2, 0.6, 1.0),
                transparent: true,
                opacity: 0.8,
                wireframe: false
            });

            const cube = new THREE.Mesh(geometry, material);
            cube.visible = true;
            this.wristCubeGroup.add(cube);
            this.wristCubes.left.push(cube);
        }

        // 右手首の周りを回るキューブ（炎の色）
        for (let i = 0; i < cubeCount; i++) {
            const geometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
            // 炎の色（赤からオレンジ、黄色のグラデーション）
            const colorChoice = Math.random();
            let color;
            if (colorChoice < 0.3) {
                color = new THREE.Color(1.0, 0.2, 0.0);
            } else if (colorChoice < 0.7) {
                color = new THREE.Color(1.0, 0.5, 0.0);
            } else {
                color = new THREE.Color(1.0, 1.0, 0.0);
            }

            const material = new THREE.MeshBasicMaterial({
                color: color,
                transparent: true,
                opacity: 0.8,
                wireframe: false
            });

            const cube = new THREE.Mesh(geometry, material);
            cube.visible = true;
            this.wristCubeGroup.add(cube);
            this.wristCubes.right.push(cube);
        }
    }

    createFireParticle(position, direction) {
        // 炎の色（赤からオレンジ、黄色へ）
        const colorChoice = Math.random();
        let color;
        if (colorChoice < 0.3) {
            color = new THREE.Color(1.0, 0.2, 0.0);
        } else if (colorChoice < 0.7) {
            color = new THREE.Color(1.0, 0.5, 0.0);
        } else {
            color = new THREE.Color(1.0, 1.0, 0.0);
        }

        // より大きなサイズで派手に
        const size = Math.random() * 0.015 + 0.015;
        const geometry = new THREE.SphereGeometry(size, 6, 6);
        const material = new THREE.MeshBasicMaterial({
            color: color,
            transparent: true,
            opacity: 0.9,
            blending: THREE.AdditiveBlending
        });

        const particle = new THREE.Mesh(geometry, material);
        particle.position.copy(position);

        // 方向ベクトルに沿って速度を設定（より速く）
        particle.userData.velocity = new THREE.Vector3(
            direction.x * 0.015 + (Math.random() - 0.5) * 0.005,
            direction.y * 0.015 + Math.random() * 0.008 + 0.005,
            direction.z * 0.015 + (Math.random() - 0.5) * 0.005
        );
        particle.userData.life = 0;
        particle.userData.maxLife = 1.2;
        particle.userData.type = 'fire';

        return particle;
    }

    createPetalParticle(position, direction) {
        // 花びらの色（ピンクから白へ）
        const colorChoice = Math.random();
        let color;
        if (colorChoice < 0.3) {
            color = new THREE.Color(1.0, 0.7, 0.8); // ピンク
        } else if (colorChoice < 0.6) {
            color = new THREE.Color(1.0, 0.9, 0.95); // 薄いピンク
        } else {
            color = new THREE.Color(1.0, 1.0, 1.0); // 白
        }

        // 花びらの形状（楕円を平らにした形）
        const geometry = new THREE.BoxGeometry(0.012, 0.002, 0.008);
        const material = new THREE.MeshBasicMaterial({
            color: color,
            transparent: true,
            opacity: 0.8,
            side: THREE.DoubleSide
        });

        const particle = new THREE.Mesh(geometry, material);
        particle.position.copy(position);

        // ランダムな初期回転
        particle.rotation.set(
            Math.random() * Math.PI,
            Math.random() * Math.PI,
            Math.random() * Math.PI
        );

        // 方向ベクトルに沿って速度を設定（花びらはゆっくり舞う）
        particle.userData.velocity = new THREE.Vector3(
            direction.x * 0.01 + (Math.random() - 0.5) * 0.003,
            direction.y * 0.01 + Math.random() * 0.005 + 0.003,
            direction.z * 0.01 + (Math.random() - 0.5) * 0.003
        );

        // 回転速度
        particle.userData.rotationVelocity = new THREE.Vector3(
            (Math.random() - 0.5) * 0.1,
            (Math.random() - 0.5) * 0.1,
            (Math.random() - 0.5) * 0.1
        );

        particle.userData.life = 0;
        particle.userData.maxLife = 2.0; // 花びらは長く漂う
        particle.userData.type = 'petal';

        return particle;
    }

    updateParticles(frame, referenceSpace) {
        // 両手のパーティクルプールを更新
        ['left', 'right'].forEach(hand => {
            const particles = this.particlePool[hand];

            for (let i = particles.length - 1; i >= 0; i--) {
                const particle = particles[i];

                // 花びらの場合は軽い重力とゆらゆら動きを適用
                if (particle.userData.type === 'petal') {
                    particle.userData.velocity.y -= 0.0003; // 軽い重力

                    // ゆらゆらと揺れる動き（風の影響）
                    const time = performance.now() * 0.001;
                    particle.userData.velocity.x += Math.sin(time + particle.userData.life * 10) * 0.0001;
                    particle.userData.velocity.z += Math.cos(time + particle.userData.life * 10) * 0.0001;

                    // 回転を適用
                    particle.rotation.x += particle.userData.rotationVelocity.x;
                    particle.rotation.y += particle.userData.rotationVelocity.y;
                    particle.rotation.z += particle.userData.rotationVelocity.z;
                }

                // 次の位置を計算
                const nextPosition = particle.position.clone().add(particle.userData.velocity);

                // ヒットテストで壁との衝突をチェック
                if (frame && referenceSpace) {
                    this.checkWallCollision(particle, nextPosition, frame, referenceSpace);
                }

                // 位置を更新
                particle.position.copy(nextPosition);

                // ライフを増やす
                particle.userData.life += 0.01;

                // 透明度を減らす（フェードアウト）
                const lifeRatio = particle.userData.life / particle.userData.maxLife;
                particle.material.opacity = (1 - lifeRatio) * (particle.userData.type === 'fire' ? 0.9 : 0.8);

                // 寿命が尽きたらパーティクルを削除
                if (particle.userData.life >= particle.userData.maxLife) {
                    this.particleGroup.remove(particle);
                    particle.geometry.dispose();
                    particle.material.dispose();
                    particles.splice(i, 1);
                }
            }
        });
    }

    checkWallCollision(particle, nextPosition, frame, referenceSpace) {
        if (!frame || !referenceSpace) return;

        const bounceCoefficient = 0.7;

        try {
            // パーティクルの移動方向を計算
            const direction = new THREE.Vector3().subVectors(nextPosition, particle.position);
            const distance = direction.length();

            if (distance < 0.001) return;

            direction.normalize();

            // XRRayを作成
            const ray = new XRRay(
                {
                    x: particle.position.x,
                    y: particle.position.y,
                    z: particle.position.z,
                    w: 1
                },
                {
                    x: direction.x,
                    y: direction.y,
                    z: direction.z,
                    w: 0
                }
            );

            // ヒットテストを実行（transient input）
            const hitTestResults = frame.session.requestHitTestForTransientInput ?
                frame.session.requestHitTestForTransientInput({
                    profile: "generic-touchscreen",
                    offsetRay: ray
                }) : null;

            // 代替案：viewer spaceからのヒットテスト
            if (!hitTestResults || hitTestResults.length === 0) {
                const viewerHitTestResults = frame.getHitTestResults ?
                    frame.getHitTestResults(ray) : null;

                if (viewerHitTestResults && viewerHitTestResults.length > 0) {
                    this.processHitTestResult(particle, nextPosition, viewerHitTestResults[0], referenceSpace, bounceCoefficient, distance);
                }
            }
        } catch (error) {
            // エラーが発生した場合は境界ボックスにフォールバック
            this.fallbackBoundaryCheck(particle, nextPosition, bounceCoefficient);
        }
    }

    processHitTestResult(particle, nextPosition, hitTestResult, referenceSpace, bounceCoefficient, maxDistance) {
        try {
            const pose = hitTestResult.getPose(referenceSpace);
            if (!pose) return;

            const hitPoint = new THREE.Vector3(
                pose.transform.position.x,
                pose.transform.position.y,
                pose.transform.position.z
            );

            const hitDistance = particle.position.distanceTo(hitPoint);

            // 衝突判定
            if (hitDistance <= maxDistance + 0.1) {
                // 法線を取得
                const matrix = new THREE.Matrix4();
                const orientation = pose.transform.orientation;
                const quaternion = new THREE.Quaternion(
                    orientation.x,
                    orientation.y,
                    orientation.z,
                    orientation.w
                );

                // Y軸の法線（床/天井の場合は上向き）
                const normal = new THREE.Vector3(0, 1, 0);
                normal.applyQuaternion(quaternion);

                // 速度を反射
                const velocityDotNormal = particle.userData.velocity.dot(normal);

                if (velocityDotNormal < 0) { // 表面に向かっている場合
                    const reflection = normal.clone().multiplyScalar(2 * velocityDotNormal);
                    particle.userData.velocity.sub(reflection).multiplyScalar(bounceCoefficient);

                    // 位置を補正（めり込み防止）
                    nextPosition.copy(hitPoint).add(normal.multiplyScalar(0.02));
                }
            }
        } catch (error) {
            console.error('Hit test processing error:', error);
        }
    }

    fallbackBoundaryCheck(particle, nextPosition, bounceCoefficient) {
        // フォールバック：簡易境界ボックス
        const floorY = -0.5;
        const ceilingY = 2.5;
        const wallDistance = 3.0;

        if (nextPosition.y < floorY) {
            nextPosition.y = floorY;
            particle.userData.velocity.y = Math.abs(particle.userData.velocity.y) * bounceCoefficient;
        }

        if (nextPosition.y > ceilingY) {
            nextPosition.y = ceilingY;
            particle.userData.velocity.y = -Math.abs(particle.userData.velocity.y) * bounceCoefficient;
        }

        if (Math.abs(nextPosition.x) > wallDistance) {
            nextPosition.x = Math.sign(nextPosition.x) * wallDistance;
            particle.userData.velocity.x = -particle.userData.velocity.x * bounceCoefficient;
        }

        if (Math.abs(nextPosition.z) > wallDistance) {
            nextPosition.z = Math.sign(nextPosition.z) * wallDistance;
            particle.userData.velocity.z = -particle.userData.velocity.z * bounceCoefficient;
        }
    }

    updateWristCubes(handedness, wristData) {
        if (!wristData) {
            return;
        }

        // キューブの回転角度を更新
        this.cubeRotationAngle += 0.05;

        const radius = 0.05; // 手首からの距離
        const cubes = this.wristCubes[handedness];
        const cubeCount = cubes.length;

        cubes.forEach((cube, index) => {
            // 円周上の角度
            const angle = this.cubeRotationAngle + (index / cubeCount) * Math.PI * 2;

            // 手首のローカル座標系で円周上の位置を計算
            // side方向（横）とup方向（法線）で円を作る
            const localX = Math.cos(angle) * radius;
            const localY = Math.sin(angle) * radius;

            // ワールド座標に変換
            const offset = new THREE.Vector3();
            offset.addScaledVector(wristData.side, localX);
            offset.addScaledVector(wristData.up, localY);

            cube.position.copy(wristData.position).add(offset);

            // キューブ自体も回転
            cube.rotation.x += 0.02;
            cube.rotation.y += 0.03;
        });
    }

    spawnParticles(hand, position, direction) {
        const now = performance.now();

        // パーティクルの生成レート（ミリ秒）
        const spawnRate = hand === 'left' ? 30 : 20; // 花びらは少し遅く、炎は速く

        if (now - this.lastParticleSpawn[hand] > spawnRate) {
            // 複数パーティクルを一度に生成
            const count = hand === 'left' ? 4 : 5; // 花びら4個、炎5個

            for (let i = 0; i < count; i++) {
                let particle;
                if (hand === 'left') {
                    particle = this.createPetalParticle(position, direction);
                } else {
                    particle = this.createFireParticle(position, direction);
                }

                this.particleGroup.add(particle);
                this.particlePool[hand].push(particle);
            }

            this.lastParticleSpawn[hand] = now;
        }
    }

    isHandOpen(jointPoses, handedness, frame, referenceSpace) {
        if (!jointPoses) return false;

        try {
            // 手首と指先の関節を取得
            const wristJoint = jointPoses.get('wrist');
            const indexTipJoint = jointPoses.get('index-finger-tip');
            const middleTipJoint = jointPoses.get('middle-finger-tip');
            const ringTipJoint = jointPoses.get('ring-finger-tip');
            const pinkyTipJoint = jointPoses.get('pinky-finger-tip');

            if (!wristJoint || !indexTipJoint || !middleTipJoint || !ringTipJoint || !pinkyTipJoint) {
                return false;
            }

            // 各関節のポーズを取得
            const wristPose = frame.getJointPose(wristJoint, referenceSpace);
            const indexPose = frame.getJointPose(indexTipJoint, referenceSpace);
            const middlePose = frame.getJointPose(middleTipJoint, referenceSpace);
            const ringPose = frame.getJointPose(ringTipJoint, referenceSpace);
            const pinkyPose = frame.getJointPose(pinkyTipJoint, referenceSpace);

            if (!wristPose || !indexPose || !middlePose || !ringPose || !pinkyPose) {
                return false;
            }

            // 手首から各指先までの距離を計算
            const wristPos = new THREE.Vector3(
                wristPose.transform.position.x,
                wristPose.transform.position.y,
                wristPose.transform.position.z
            );

            const indexPos = new THREE.Vector3(
                indexPose.transform.position.x,
                indexPose.transform.position.y,
                indexPose.transform.position.z
            );

            const middlePos = new THREE.Vector3(
                middlePose.transform.position.x,
                middlePose.transform.position.y,
                middlePose.transform.position.z
            );

            const ringPos = new THREE.Vector3(
                ringPose.transform.position.x,
                ringPose.transform.position.y,
                ringPose.transform.position.z
            );

            const pinkyPos = new THREE.Vector3(
                pinkyPose.transform.position.x,
                pinkyPose.transform.position.y,
                pinkyPose.transform.position.z
            );

            const indexDist = wristPos.distanceTo(indexPos);
            const middleDist = wristPos.distanceTo(middlePos);
            const ringDist = wristPos.distanceTo(ringPos);
            const pinkyDist = wristPos.distanceTo(pinkyPos);

            // 閾値：手が開いている状態の目安
            const threshold = 0.12;

            // 全ての指が開いている場合はパー
            const isOpen = indexDist > threshold &&
                          middleDist > threshold &&
                          ringDist > threshold &&
                          pinkyDist > threshold;

            return isOpen;
        } catch (error) {
            console.error('Hand tracking error:', error);
            return false;
        }
    }

    getWristPositionAndOrientation(jointPoses, handedness, frame, referenceSpace) {
        if (!jointPoses) return null;

        try {
            const wristJoint = jointPoses.get('wrist');
            const indexMetaJoint = jointPoses.get('index-finger-metacarpal');
            const middleMetaJoint = jointPoses.get('middle-finger-metacarpal');
            const pinkyMetaJoint = jointPoses.get('pinky-finger-metacarpal');

            if (!wristJoint || !indexMetaJoint || !middleMetaJoint || !pinkyMetaJoint) return null;

            const wristPose = frame.getJointPose(wristJoint, referenceSpace);
            const indexMetaPose = frame.getJointPose(indexMetaJoint, referenceSpace);
            const middleMetaPose = frame.getJointPose(middleMetaJoint, referenceSpace);
            const pinkyMetaPose = frame.getJointPose(pinkyMetaJoint, referenceSpace);

            if (!wristPose || !indexMetaPose || !middleMetaPose || !pinkyMetaPose) return null;

            const wristPos = new THREE.Vector3(
                wristPose.transform.position.x,
                wristPose.transform.position.y,
                wristPose.transform.position.z
            );

            const indexMetaPos = new THREE.Vector3(
                indexMetaPose.transform.position.x,
                indexMetaPose.transform.position.y,
                indexMetaPose.transform.position.z
            );

            const middleMetaPos = new THREE.Vector3(
                middleMetaPose.transform.position.x,
                middleMetaPose.transform.position.y,
                middleMetaPose.transform.position.z
            );

            const pinkyMetaPos = new THREE.Vector3(
                pinkyMetaPose.transform.position.x,
                pinkyMetaPose.transform.position.y,
                pinkyMetaPose.transform.position.z
            );

            // 指の付け根の中心
            const fingerCenter = new THREE.Vector3();
            fingerCenter.addVectors(indexMetaPos, middleMetaPos).add(pinkyMetaPos).divideScalar(3);

            // 手首から指への方向（手の向き）
            const forwardDir = new THREE.Vector3().subVectors(fingerCenter, wristPos).normalize();

            // 手の幅方向
            const sideDir = handedness === 'right'
                ? new THREE.Vector3().subVectors(indexMetaPos, pinkyMetaPos).normalize()
                : new THREE.Vector3().subVectors(pinkyMetaPos, indexMetaPos).normalize();

            // 手のひらの法線方向
            const upDir = new THREE.Vector3().crossVectors(sideDir, forwardDir).normalize();

            return {
                position: wristPos,
                forward: forwardDir,
                up: upDir,
                side: sideDir
            };
        } catch (error) {
            console.error('Wrist position error:', error);
            return null;
        }
    }

    getPalmPositionAndNormal(jointPoses, handedness, frame, referenceSpace) {
        if (!jointPoses) return null;

        try {
            // 必要な関節を取得
            const wristJoint = jointPoses.get('wrist');
            const thumbMetacarpalJoint = jointPoses.get('thumb-metacarpal');
            const indexMetacarpalJoint = jointPoses.get('index-finger-metacarpal');
            const middleMetacarpalJoint = jointPoses.get('middle-finger-metacarpal');
            const ringMetacarpalJoint = jointPoses.get('ring-finger-metacarpal');
            const pinkyMetacarpalJoint = jointPoses.get('pinky-finger-metacarpal');

            if (!wristJoint || !thumbMetacarpalJoint || !indexMetacarpalJoint ||
                !middleMetacarpalJoint || !ringMetacarpalJoint || !pinkyMetacarpalJoint) {
                return null;
            }

            const wristPose = frame.getJointPose(wristJoint, referenceSpace);
            const thumbMetaPose = frame.getJointPose(thumbMetacarpalJoint, referenceSpace);
            const indexMetaPose = frame.getJointPose(indexMetacarpalJoint, referenceSpace);
            const middleMetaPose = frame.getJointPose(middleMetacarpalJoint, referenceSpace);
            const ringMetaPose = frame.getJointPose(ringMetacarpalJoint, referenceSpace);
            const pinkyMetaPose = frame.getJointPose(pinkyMetacarpalJoint, referenceSpace);

            if (!wristPose || !thumbMetaPose || !indexMetaPose ||
                !middleMetaPose || !ringMetaPose || !pinkyMetaPose) {
                return null;
            }

            // 各関節の位置を取得
            const wristPos = new THREE.Vector3(
                wristPose.transform.position.x,
                wristPose.transform.position.y,
                wristPose.transform.position.z
            );

            const indexMetaPos = new THREE.Vector3(
                indexMetaPose.transform.position.x,
                indexMetaPose.transform.position.y,
                indexMetaPose.transform.position.z
            );

            const middleMetaPos = new THREE.Vector3(
                middleMetaPose.transform.position.x,
                middleMetaPose.transform.position.y,
                middleMetaPose.transform.position.z
            );

            const ringMetaPos = new THREE.Vector3(
                ringMetaPose.transform.position.x,
                ringMetaPose.transform.position.y,
                ringMetaPose.transform.position.z
            );

            const pinkyMetaPos = new THREE.Vector3(
                pinkyMetaPose.transform.position.x,
                pinkyMetaPose.transform.position.y,
                pinkyMetaPose.transform.position.z
            );

            // 4本の指の付け根の平均位置を計算
            const fingerBasesCenter = new THREE.Vector3();
            fingerBasesCenter.x = (indexMetaPos.x + middleMetaPos.x + ringMetaPos.x + pinkyMetaPos.x) / 4;
            fingerBasesCenter.y = (indexMetaPos.y + middleMetaPos.y + ringMetaPos.y + pinkyMetaPos.y) / 4;
            fingerBasesCenter.z = (indexMetaPos.z + middleMetaPos.z + ringMetaPos.z + pinkyMetaPos.z) / 4;

            // 手のひらの中心を計算（指の付け根より先）
            const palmCenter = new THREE.Vector3();
            // 230%の位置に設定（指の付け根よりかなり外側）
            palmCenter.lerpVectors(wristPos, fingerBasesCenter, 2.3);

            // 手のひらの法線を計算
            // ベクトル1: 手首から指の付け根へ
            const vec1 = new THREE.Vector3().subVectors(fingerBasesCenter, wristPos);
            // ベクトル2: 小指から人差し指へ（手の幅方向）
            const vec2 = handedness === 'right'
                ? new THREE.Vector3().subVectors(indexMetaPos, pinkyMetaPos)
                : new THREE.Vector3().subVectors(pinkyMetaPos, indexMetaPos);

            // 外積で法線を計算
            const palmNormal = new THREE.Vector3().crossVectors(vec2, vec1).normalize();

            // 手のひらの表面から少し外側にオフセット（炎の発生位置）
            const fireOffset = palmNormal.clone().multiplyScalar(0.02);
            const firePosition = palmCenter.clone().add(fireOffset);

            return {
                position: firePosition,
                normal: palmNormal
            };
        } catch (error) {
            console.error('Palm position error:', error);
            return null;
        }
    }

    updateHands(frame, referenceSpace) {
        if (!frame.session.inputSources) return;

        // 両手の手首のデータを初期化
        let leftWristData = null;
        let rightWristData = null;

        for (const inputSource of frame.session.inputSources) {
            if (inputSource.hand) {
                const handedness = inputSource.handedness;

                // 手が開いているかチェック
                const isOpen = this.isHandOpen(inputSource.hand, handedness, frame, referenceSpace);
                this.handStates[handedness] = isOpen;

                // 手のひらの位置と法線を取得
                const palmData = this.getPalmPositionAndNormal(inputSource.hand, handedness, frame, referenceSpace);

                if (palmData && isOpen) {
                    // 手が開いている場合、パーティクルを生成
                    this.spawnParticles(handedness, palmData.position, palmData.normal);
                }

                // 手首の位置と向きを取得
                const wristData = this.getWristPositionAndOrientation(inputSource.hand, handedness, frame, referenceSpace);
                if (handedness === 'left') {
                    leftWristData = wristData;
                } else if (handedness === 'right') {
                    rightWristData = wristData;
                }
            }
        }

        // 両手の手首のキューブを更新
        if (leftWristData) {
            this.updateWristCubes('left', leftWristData);
        }
        if (rightWristData) {
            this.updateWristCubes('right', rightWristData);
        }
    }

    animate = (time, frame) => {
        let referenceSpace = null;

        if (frame) {
            referenceSpace = this.renderer.xr.getReferenceSpace();

            // 手のトラッキングを更新
            this.updateHands(frame, referenceSpace);
        }

        // パーティクルを更新（ヒットテスト用にframeとreferenceSpaceを渡す）
        this.updateParticles(frame, referenceSpace);

        this.renderer.render(this.scene, this.camera);
    }

    async start() {
        if (!navigator.xr) {
            alert('WebXRがサポートされていません');
            return;
        }

        try {
            // MRセッションを開始（hand-trackingを有効化）
            const session = await navigator.xr.requestSession('immersive-ar', {
                requiredFeatures: ['local-floor', 'hand-tracking'],
                optionalFeatures: ['unbounded']
            });

            await this.renderer.xr.setSession(session);
            this.renderer.setAnimationLoop(this.animate);

            // UIを非表示
            document.getElementById('info').style.display = 'none';
            this.canvas.style.display = 'block';

        } catch (error) {
            console.error('MRセッションの開始に失敗しました:', error);
            alert('MRセッションの開始に失敗しました。Quest 3のWebXR対応ブラウザから開いてください。');
        }
    }
}

// アプリの初期化
const app = new HandFireMR();

document.getElementById('startButton').addEventListener('click', () => {
    app.start();
});
