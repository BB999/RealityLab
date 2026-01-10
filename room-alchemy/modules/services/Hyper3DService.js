/**
 * Hyper3D Rodin V2 サービス
 * サーバー経由でfal.ai APIを呼び出し、画像から3Dモデル(GLB)を生成
 */

export class Hyper3DService {
  constructor() {
    this.isGenerating = false;
  }

  /**
   * 画像URLから3Dモデルを生成
   * @param {string} imageUrl - 入力画像のURL
   * @param {string} prompt - オプションのプロンプト
   * @param {Function} onProgress - 進捗コールバック
   * @returns {Promise<string>} GLBファイルのURL
   */
  async generate(imageUrl, prompt = '', onProgress) {
    if (this.isGenerating) {
      console.log('既に3Dモデル生成中です');
      return null;
    }

    this.isGenerating = true;

    try {
      // サーバー経由でfal.ai Hyper3D Rodin V2 APIを呼び出し
      const payload = {
        input_image_urls: [imageUrl],
        geometry_file_format: 'glb',
        quality_mesh_option: '20K Triangle',
        material: 'PBR'
      };

      if (prompt) {
        payload.prompt = prompt;
      }

      console.log('Hyper3D payload:', payload);

      // 進捗表示開始
      if (onProgress) {
        onProgress(0, 1);
      }

      const response = await fetch('/api/generate-3d', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Server Error: ${response.status}`);
      }

      const result = await response.json();
      console.log('Hyper3D result:', result);

      // GLBファイルのURLを取得
      if (result.model_mesh && result.model_mesh.url) {
        this.isGenerating = false;
        if (onProgress) {
          onProgress(1, 1);
        }
        return result.model_mesh.url;
      }

      throw new Error('GLBファイルが見つかりません');

    } catch (error) {
      console.error('Hyper3D生成エラー:', error);
      this.isGenerating = false;
      throw error;
    }
  }

  isCurrentlyGenerating() {
    return this.isGenerating;
  }
}
