import * as THREE from 'three';

/**
 * MangaBook モジュール
 * 3D空間で漫画本を表示・操作するビューア
 *
 * params:
 *   pages: Array<string> - ページ画像URLの配列 (required)
 *   coverUrl: string - 表紙画像URL (optional)
 *   backCoverUrl: string - 裏表紙画像URL (optional)
 *   width: number - 本の幅 (default: 0.21) A5サイズ相当
 *   height: number - 本の高さ (default: 0.297)
 *   pageThickness: number - ページの厚さ (default: 0.002)
 *   coverThickness: number - 表紙の厚さ (default: 0.005)
 */
export function createMangaBook(group, params = {}) {
  const {
    pages = [],
    coverUrl = '',
    backCoverUrl = '',
    width = 0.21,
    height = 0.297,
    pageThickness = 0.002,
    coverThickness = 0.005
  } = params;

  // 状態管理
  let isOpen = false;
  let currentPageIndex = 0;
  let isAnimating = false;
  let targetOpenAngle = 0;
  let currentOpenAngle = 0;

  // ページめくりアニメーション
  let isPageTurning = false;
  let pageTurnProgress = 0;
  let pageTurnDirection = 1; // 1: 次へ, -1: 前へ

  // メッシュ参照
  const meshes = [];
  const pageMeshes = [];
  let frontCover = null;
  let backCover = null;
  let spine = null;

  // テクスチャキャッシュ
  const textureLoader = new THREE.TextureLoader();
  textureLoader.crossOrigin = 'anonymous';
  const loadedTextures = [];

  // 本の背表紙（厚み部分）を計算
  const totalPages = Math.max(pages.length, 2);
  const spineWidth = totalPages * pageThickness + coverThickness * 2;

  // マテリアル
  const coverMaterial = new THREE.MeshStandardMaterial({
    color: 0x8B4513, // 茶色の本
    roughness: 0.7,
    metalness: 0.1,
    side: THREE.DoubleSide
  });

  const pageMaterial = new THREE.MeshStandardMaterial({
    color: 0xFFFFF0, // アイボリー
    roughness: 0.9,
    metalness: 0,
    side: THREE.DoubleSide
  });

  // インタラクション用のヒットボックス
  const hitboxGeometry = new THREE.BoxGeometry(width * 2.2, height * 1.1, spineWidth * 2);
  const hitboxMaterial = new THREE.MeshBasicMaterial({
    transparent: true,
    opacity: 0,
    depthWrite: false
  });
  const hitbox = new THREE.Mesh(hitboxGeometry, hitboxMaterial);
  hitbox.userData.isMangaBookHitbox = true;
  hitbox.userData.mangaBook = {
    toggle,
    nextPage,
    prevPage,
    isOpen: () => isOpen,
    // 押したときの処理：閉じていれば開く、開いていれば次のページへ
    onPress: () => {
      if (!isOpen) {
        toggle();
      } else if (currentPageIndex < pages.length - 2) {
        nextPage();
      } else {
        // 最後のページなら閉じる
        toggle();
      }
    }
  };
  group.add(hitbox);

  // 背表紙を作成（本の背中、縦に立つ部分）
  function createSpine() {
    const spineGeometry = new THREE.BoxGeometry(coverThickness, height, spineWidth);
    spine = new THREE.Mesh(spineGeometry, coverMaterial.clone());
    spine.position.set(-width / 2, 0, 0); // 左端に配置
    group.add(spine);
    meshes.push(spine);
  }

  // 表紙を作成（閉じた状態で手前に見える）
  function createFrontCover() {
    const coverGeometry = new THREE.BoxGeometry(width, height, coverThickness);
    frontCover = new THREE.Mesh(coverGeometry, coverMaterial.clone());

    // ピボットを背表紙側（左端）に設定
    const frontCoverPivot = new THREE.Group();
    frontCoverPivot.position.set(-width / 2, 0, 0); // 背表紙の位置
    frontCover.position.set(width / 2, 0, spineWidth / 2); // 閉じた状態：手前側
    frontCoverPivot.add(frontCover);
    frontCoverPivot.userData.isPivot = true;
    frontCoverPivot.userData.type = 'frontCover';
    frontCoverPivot.rotation.y = 0; // 閉じた状態
    group.add(frontCoverPivot);
    meshes.push(frontCoverPivot);

    // 表紙テクスチャを読み込む
    if (coverUrl) {
      textureLoader.load(coverUrl, (texture) => {
        frontCover.material = new THREE.MeshStandardMaterial({
          map: texture,
          roughness: 0.6,
          metalness: 0.1,
          side: THREE.DoubleSide
        });
        loadedTextures.push(texture);
      });
    }
  }

  // 裏表紙を作成（閉じた状態で奥に見える）
  function createBackCover() {
    const coverGeometry = new THREE.BoxGeometry(width, height, coverThickness);
    backCover = new THREE.Mesh(coverGeometry, coverMaterial.clone());

    // 裏表紙は背表紙の反対側に固定
    backCover.position.set(0, 0, -spineWidth / 2); // 閉じた状態：奥側
    group.add(backCover);
    meshes.push(backCover);

    // 裏表紙テクスチャを読み込む
    if (backCoverUrl) {
      textureLoader.load(backCoverUrl, (texture) => {
        backCover.material = new THREE.MeshStandardMaterial({
          map: texture,
          roughness: 0.6,
          metalness: 0.1,
          side: THREE.DoubleSide
        });
        loadedTextures.push(texture);
      });
    }
  }

  // ページを作成
  function createPages() {
    const pageCount = Math.max(pages.length, 4); // 最低4ページ

    for (let i = 0; i < pageCount; i++) {
      const pageGeometry = new THREE.PlaneGeometry(width, height);
      const pageMesh = new THREE.Mesh(pageGeometry, pageMaterial.clone());

      // ピボットグループ（背表紙の位置に配置）
      const pagePivot = new THREE.Group();
      pagePivot.position.set(-width / 2, 0, 0); // 背表紙の位置をピボットに
      pageMesh.position.set(width / 2, 0, 0);
      pagePivot.add(pageMesh);
      pagePivot.userData.isPivot = true;
      pagePivot.userData.type = 'page';
      pagePivot.userData.pageIndex = i;
      pagePivot.visible = false; // 最初は非表示

      group.add(pagePivot);
      pageMeshes.push({ pivot: pagePivot, mesh: pageMesh, index: i });
      meshes.push(pagePivot);

      // ページテクスチャを読み込む
      if (pages[i]) {
        textureLoader.load(pages[i], (texture) => {
          pageMesh.material = new THREE.MeshStandardMaterial({
            map: texture,
            roughness: 0.9,
            metalness: 0,
            side: THREE.DoubleSide
          });
          loadedTextures.push(texture);
        });
      }
    }
  }

  // 本を開く/閉じる
  function toggle() {
    if (isAnimating) return;

    isOpen = !isOpen;
    targetOpenAngle = isOpen ? -Math.PI * 0.8 : 0; // 開いた状態で約144度
    isAnimating = true;

    // 開く時はページを表示（アニメーション中に一緒に開く）
    if (isOpen) {
      pageMeshes.forEach(({ pivot, mesh, index }) => {
        const isCurrentSpread = index >= currentPageIndex && index < currentPageIndex + 2;
        pivot.visible = isCurrentSpread;
        // 初期角度を閉じた状態にセット
        if (isCurrentSpread) {
          pivot.rotation.y = 0;
        }
      });
    }

    console.log('漫画本:', isOpen ? '開く' : '閉じる');
  }

  // 次のページへ
  function nextPage() {
    if (!isOpen || isPageTurning) return;
    if (currentPageIndex >= pages.length - 2) return; // 最後のページ

    isPageTurning = true;
    pageTurnProgress = 0;
    pageTurnDirection = 1;

    console.log('次のページへ:', currentPageIndex, '->', currentPageIndex + 2);
  }

  // 前のページへ
  function prevPage() {
    if (!isOpen || isPageTurning) return;
    if (currentPageIndex <= 0) return;

    isPageTurning = true;
    pageTurnProgress = 0;
    pageTurnDirection = -1;

    console.log('前のページへ:', currentPageIndex, '->', currentPageIndex - 2);
  }

  // 表示するページを更新
  function updateVisiblePages() {
    pageMeshes.forEach(({ pivot, mesh, index }) => {
      // 現在のページと次のページを表示
      const isCurrentSpread = index >= currentPageIndex && index < currentPageIndex + 2;
      pivot.visible = isOpen && isCurrentSpread;

      // 左右のページの配置（開いた状態で見開きになるように）
      if (isCurrentSpread) {
        if (index === currentPageIndex) {
          // 左ページ（開いた表紙側）- 裏側を表示
          pivot.rotation.y = currentOpenAngle; // 表紙と同じ角度で開く
          mesh.rotation.y = Math.PI; // 裏返す
          mesh.position.z = 0.001;
        } else {
          // 右ページ（裏表紙側）
          pivot.rotation.y = 0;
          mesh.rotation.y = 0;
          mesh.position.z = -0.001;
        }
      }
    });
  }

  // イージング関数
  function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  // 更新処理
  function update(deltaTime) {
    // 開閉アニメーション
    if (isAnimating) {
      const speed = 3.0;
      const diff = targetOpenAngle - currentOpenAngle;

      if (Math.abs(diff) < 0.01) {
        currentOpenAngle = targetOpenAngle;
        isAnimating = false;

        if (!isOpen) {
          // 閉じたらページを非表示
          pageMeshes.forEach(({ pivot }) => {
            pivot.visible = false;
          });
        }
      } else {
        currentOpenAngle += diff * speed * deltaTime;
      }

      // 表紙を回転
      meshes.forEach(m => {
        if (m.userData.isPivot && m.userData.type === 'frontCover') {
          m.rotation.y = currentOpenAngle;
        }
      });

      // 左ページも表紙と一緒に開く
      pageMeshes.forEach(({ pivot, index }) => {
        if (index === currentPageIndex && pivot.visible) {
          pivot.rotation.y = currentOpenAngle;
        }
      });
    }

    // ページめくりアニメーション
    if (isPageTurning) {
      const turnSpeed = 2.0;
      pageTurnProgress += deltaTime * turnSpeed;

      if (pageTurnProgress >= 1) {
        pageTurnProgress = 1;
        isPageTurning = false;

        // ページインデックスを更新
        currentPageIndex += pageTurnDirection * 2;
        currentPageIndex = Math.max(0, Math.min(currentPageIndex, pages.length - 2));

        updateVisiblePages();
      } else {
        // ページめくりのアニメーション
        const eased = easeInOutCubic(pageTurnProgress);
        const turnAngle = eased * Math.PI * pageTurnDirection;

        // めくるページを取得
        const turningPageIndex = pageTurnDirection > 0 ? currentPageIndex + 1 : currentPageIndex;
        const turningPage = pageMeshes.find(p => p.index === turningPageIndex);

        if (turningPage) {
          turningPage.pivot.visible = true;
          turningPage.pivot.rotation.y = turnAngle;
        }
      }
    }
  }

  // クリーンアップ
  function dispose() {
    meshes.forEach(mesh => {
      if (mesh.geometry) mesh.geometry.dispose();
      if (mesh.material) {
        if (Array.isArray(mesh.material)) {
          mesh.material.forEach(m => m.dispose());
        } else {
          mesh.material.dispose();
        }
      }
    });

    loadedTextures.forEach(texture => texture.dispose());

    hitboxGeometry.dispose();
    hitboxMaterial.dispose();
  }

  // 初期化
  createSpine();
  createFrontCover();
  createBackCover();
  createPages();

  // インスタンスを返す
  return {
    meshes,
    hitbox,

    update,
    dispose,

    // 公開メソッド
    toggle,
    nextPage,
    prevPage,

    isOpen: () => isOpen,
    getCurrentPage: () => currentPageIndex,
    getTotalPages: () => pages.length,

    // ページを設定
    setPages(newPages) {
      // 既存のページテクスチャを更新
      newPages.forEach((url, i) => {
        if (pageMeshes[i] && url) {
          textureLoader.load(url, (texture) => {
            pageMeshes[i].mesh.material = new THREE.MeshStandardMaterial({
              map: texture,
              roughness: 0.9,
              metalness: 0,
              side: THREE.DoubleSide
            });
            loadedTextures.push(texture);
          });
        }
      });
    }
  };
}
