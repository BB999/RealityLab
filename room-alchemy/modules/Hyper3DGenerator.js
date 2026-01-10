/**
 * Hyper3D Rodin V2 ジェネレーター
 * 画像から3Dモデル(GLB)を生成
 */

export class Hyper3DGenerator {
  constructor() {
    this.pendingRequests = new Map(); // requestId -> callback
  }

  /**
   * 画像URLから3Dモデルを生成
   * @param {string} imageUrl - 入力画像のURL
   * @param {string} prompt - オプションのプロンプト
   * @param {Function} onComplete - 完了コールバック (glbUrl) => void
   * @param {Function} onError - エラーコールバック (error) => void
   * @returns {Promise<string>} リクエストID
   */
  async generate(imageUrl, prompt = '', onComplete, onError) {
    try {
      // MCP経由でHyper3D Rodin V2にサブミット
      const submitParams = {
        input_image_urls: [imageUrl],
        geometry_file_format: 'glb',
        quality_mesh_option: '20K Triangle', // 約1万ポリゴン（20K Triangle ≈ 10K polygons）
        material: 'PBR'
      };

      if (prompt) {
        submitParams.prompt = prompt;
      }

      console.log('Hyper3D submit params:', submitParams);

      // MCPツールはClaude Code側で呼び出すため、
      // ここではパラメータを返して外部で処理する
      return {
        type: 'hyper3d_submit',
        params: submitParams,
        onComplete,
        onError
      };

    } catch (error) {
      console.error('Hyper3D generation error:', error);
      if (onError) onError(error);
      throw error;
    }
  }

  /**
   * ステータスチェック用のパラメータを生成
   * @param {string} requestId - リクエストID
   * @returns {Object} ステータスチェック用パラメータ
   */
  checkStatus(requestId) {
    return {
      type: 'hyper3d_status',
      params: { request_id: requestId }
    };
  }

  /**
   * 結果取得用のパラメータを生成
   * @param {string} requestId - リクエストID
   * @returns {Object} 結果取得用パラメータ
   */
  getResult(requestId) {
    return {
      type: 'hyper3d_result',
      params: { request_id: requestId }
    };
  }
}

// シングルトンインスタンス
export const hyper3DGenerator = new Hyper3DGenerator();
