import * as THREE from 'three';
import { disposeObject3D } from './disposeUtils.js';

// findModuleAtPosition はグリップを握っている間ずっと呼ばれるので、
// フレームごとの確保を避けるために使い回す
const _box = new THREE.Box3();
const _grabBox = new THREE.Box3();
const _center = new THREE.Vector3();
const _size = new THREE.Vector3();
const _half = new THREE.Vector3();

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

    // グループ内のオブジェクトを破棄（テクスチャ含む）
    disposeObject3D(module.group);

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
   * @param {number} minHalfSize - つかみ判定の最小半径。
   *   小さいモジュールを掴みやすくするための下限で、実寸がこれより大きければ実寸を使う
   * @returns {Object|null} 見つかったモジュール
   */
  findModuleAtPosition(position, minHalfSize = 0.15) {
    // 上限。これが無いと巨大なモジュールが周囲すべてを飲み込む
    const MAX_HALF_SIZE = 0.5;
    // 手が少しはみ出していても掴めるようにする遊び
    const SLACK = 0.04;

    let found = null;
    let foundDistance = Infinity;

    for (const module of this.modules.values()) {
      _box.setFromObject(module.group);
      // 描画物を持たないモジュールは中心が NaN になるので除外する
      if (_box.isEmpty()) continue;

      _box.getCenter(_center);
      _box.getSize(_size);

      // 判定用の半径は「実寸を下限と上限で挟んだもの」。
      // 一律に下駄を履かせると、大きいモジュールほど余分な範囲が増えて
      // 隣のモジュールを覆い隠してしまう
      _half.set(
        Math.min(Math.max(_size.x / 2, minHalfSize), MAX_HALF_SIZE) + SLACK,
        Math.min(Math.max(_size.y / 2, minHalfSize), MAX_HALF_SIZE) + SLACK,
        Math.min(Math.max(_size.z / 2, minHalfSize), MAX_HALF_SIZE) + SLACK
      );

      _grabBox.min.copy(_center).sub(_half);
      _grabBox.max.copy(_center).add(_half);

      if (!_grabBox.containsPoint(position)) continue;

      // 判定領域が重なったときは手に近いほうを掴む。
      // 最初に見つかったものを返すと、Map の登録順で決まってしまい、
      // 先にスポーンした大きいモジュールが手前の小さいモジュールを奪う
      const distance = _center.distanceToSquared(position);
      if (distance < foundDistance) {
        foundDistance = distance;
        found = module;
      }
    }

    return found;
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
