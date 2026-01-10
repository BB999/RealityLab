import * as THREE from 'three';

/**
 * モジュールマネージャー
 * 3Dモジュールのライフサイクルを管理
 */
export class ModuleManager {
  constructor(scene) {
    this.scene = scene;
    this.modules = new Map(); // id -> ModuleInstance
    this.moduleFactories = new Map(); // kind -> factory function
    this.nextId = 1;
  }

  /**
   * モジュールファクトリを登録
   * @param {string} kind - モジュール種類 (starfield, fireworks, imagePanel等)
   * @param {Function} factory - モジュール生成関数
   */
  registerFactory(kind, factory) {
    this.moduleFactories.set(kind, factory);
  }

  /**
   * モジュールをスポーン
   * @param {string} kind - モジュール種類
   * @param {THREE.Vector3} position - 初期位置
   * @param {Object} params - モジュールパラメータ
   * @returns {string} モジュールID
   */
  spawn(kind, position, params = {}) {
    const factory = this.moduleFactories.get(kind);
    if (!factory) {
      console.error(`Unknown module kind: ${kind}`);
      return null;
    }

    const id = `module_${this.nextId++}`;
    const group = new THREE.Group();
    group.position.copy(position);
    group.userData.moduleId = id;
    group.userData.moduleKind = kind;

    // ファクトリでモジュールを生成
    const instance = factory(group, params);

    // シーンに追加
    this.scene.add(group);
    console.log(`Module ${id} added to scene at position:`, group.position.x.toFixed(2), group.position.y.toFixed(2), group.position.z.toFixed(2));
    console.log('Scene children count:', this.scene.children.length);

    // モジュールを登録
    this.modules.set(id, {
      id,
      kind,
      group,
      instance,
      params,
      isGrabbed: false,
      grabOffset: new THREE.Vector3()
    });

    console.log(`Spawned module: ${kind} (${id})`);
    return id;
  }

  /**
   * モジュールを削除
   * @param {string} id - モジュールID
   */
  despawn(id) {
    const module = this.modules.get(id);
    if (!module) return;

    // クリーンアップ
    if (module.instance && module.instance.dispose) {
      module.instance.dispose();
    }

    // シーンから削除
    this.scene.remove(module.group);

    // グループ内のオブジェクトを破棄
    module.group.traverse((child) => {
      if (child.geometry) child.geometry.dispose();
      if (child.material) {
        if (Array.isArray(child.material)) {
          child.material.forEach(m => m.dispose());
        } else {
          child.material.dispose();
        }
      }
    });

    this.modules.delete(id);
    console.log(`Despawned module: ${id}`);
  }

  /**
   * 全モジュールを更新
   * @param {number} deltaTime - フレーム間の時間（秒）
   */
  update(deltaTime) {
    for (const module of this.modules.values()) {
      if (module.instance && module.instance.update) {
        module.instance.update(deltaTime);
      }
    }
  }

  /**
   * 位置でモジュールを検索（当たり判定）
   * バウンディングボックスを使用して子オブジェクト含めて判定
   * @param {THREE.Vector3} position - 検索位置
   * @param {number} radius - 検索半径（バウンディングボックスの拡張に使用）
   * @returns {Object|null} 見つかったモジュール
   */
  findModuleAtPosition(position, radius = 0.15) {
    const MAX_GRAB_SIZE = 0.5; // つかみ判定の最大サイズ（メートル）

    for (const module of this.modules.values()) {
      // バウンディングボックスを計算
      const box = new THREE.Box3().setFromObject(module.group);

      // バウンディングボックスのサイズを制限
      const center = box.getCenter(new THREE.Vector3());
      const size = box.getSize(new THREE.Vector3());

      // 各軸のサイズを最大値に制限
      const clampedHalfSize = new THREE.Vector3(
        Math.min(size.x / 2, MAX_GRAB_SIZE),
        Math.min(size.y / 2, MAX_GRAB_SIZE),
        Math.min(size.z / 2, MAX_GRAB_SIZE)
      );

      // 制限されたバウンディングボックスを作成
      const clampedBox = new THREE.Box3(
        center.clone().sub(clampedHalfSize),
        center.clone().add(clampedHalfSize)
      );

      // バウンディングボックスを少し拡張
      clampedBox.expandByScalar(radius);

      if (clampedBox.containsPoint(position)) {
        return module;
      }
    }
    return null;
  }

  /**
   * モジュールを掴む
   * @param {string} id - モジュールID
   * @param {THREE.Vector3} grabPosition - 掴んだ位置
   */
  grab(id, grabPosition) {
    const module = this.modules.get(id);
    if (!module) return;

    module.isGrabbed = true;

    // バウンディングボックスの中心を基準にオフセットを計算
    const box = new THREE.Box3().setFromObject(module.group);
    const center = box.getCenter(new THREE.Vector3());

    // group.positionとバウンディングボックス中心の差を保存
    module.centerOffset = module.group.position.clone().sub(center);

    // 掴んだ位置からの相対オフセット
    module.grabOffset.copy(center).sub(grabPosition);
  }

  /**
   * モジュールを移動（掴み中）
   * @param {string} id - モジュールID
   * @param {THREE.Vector3} handPosition - 手の位置
   */
  move(id, handPosition) {
    const module = this.modules.get(id);
    if (!module || !module.isGrabbed) return;

    // 新しい中心位置を計算
    const newCenter = handPosition.clone().add(module.grabOffset);

    // centerOffsetを加えてgroup.positionを設定
    module.group.position.copy(newCenter).add(module.centerOffset || new THREE.Vector3());
  }

  /**
   * モジュールを離す
   * @param {string} id - モジュールID
   */
  release(id) {
    const module = this.modules.get(id);
    if (!module) return;

    module.isGrabbed = false;
  }

  /**
   * 全モジュールを取得
   * @returns {Array} モジュール配列
   */
  getAllModules() {
    return Array.from(this.modules.values());
  }

  /**
   * モジュールを同じ位置・サイズで置き換え
   * @param {string} oldId - 置き換えるモジュールID
   * @param {string} kind - 新しいモジュール種類
   * @param {Object} params - 新しいモジュールパラメータ
   * @returns {string} 新しいモジュールID
   */
  replaceModule(oldId, kind, params = {}) {
    const oldModule = this.modules.get(oldId);
    if (!oldModule) {
      console.error(`Module not found: ${oldId}`);
      return null;
    }

    // 古いモジュールの位置・回転・スケールを保存
    const position = oldModule.group.position.clone();
    const quaternion = oldModule.group.quaternion.clone();
    const scale = oldModule.group.scale.clone();

    // 古いモジュールを削除
    this.despawn(oldId);

    // 新しいモジュールをスポーン
    const factory = this.moduleFactories.get(kind);
    if (!factory) {
      console.error(`Unknown module kind: ${kind}`);
      return null;
    }

    const newId = `module_${this.nextId++}`;
    const group = new THREE.Group();
    group.position.copy(position);
    group.quaternion.copy(quaternion);
    group.scale.copy(scale);
    group.userData.moduleId = newId;
    group.userData.moduleKind = kind;

    // ファクトリでモジュールを生成
    const instance = factory(group, params);

    // シーンに追加
    this.scene.add(group);
    console.log(`Module ${newId} replaced at position:`, group.position.x.toFixed(2), group.position.y.toFixed(2), group.position.z.toFixed(2));

    // モジュールを登録
    this.modules.set(newId, {
      id: newId,
      kind,
      group,
      instance,
      params,
      isGrabbed: false,
      grabOffset: new THREE.Vector3()
    });

    console.log(`Replaced module: ${oldId} -> ${newId} (${kind})`);
    return newId;
  }

  /**
   * モジュールの情報を取得
   * @param {string} id - モジュールID
   * @returns {Object|null} モジュール情報
   */
  getModule(id) {
    return this.modules.get(id) || null;
  }

  /**
   * 全モジュールを破棄
   */
  dispose() {
    for (const id of this.modules.keys()) {
      this.despawn(id);
    }
  }
}
