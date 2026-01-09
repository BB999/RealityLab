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
   * @param {THREE.Vector3} position - 検索位置
   * @param {number} radius - 検索半径
   * @returns {Object|null} 見つかったモジュール
   */
  findModuleAtPosition(position, radius = 0.15) {
    for (const module of this.modules.values()) {
      const distance = module.group.position.distanceTo(position);
      if (distance < radius) {
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
    module.grabOffset.copy(module.group.position).sub(grabPosition);
  }

  /**
   * モジュールを移動（掴み中）
   * @param {string} id - モジュールID
   * @param {THREE.Vector3} handPosition - 手の位置
   */
  move(id, handPosition) {
    const module = this.modules.get(id);
    if (!module || !module.isGrabbed) return;

    module.group.position.copy(handPosition).add(module.grabOffset);
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
   * 全モジュールを破棄
   */
  dispose() {
    for (const id of this.modules.keys()) {
      this.despawn(id);
    }
  }
}
