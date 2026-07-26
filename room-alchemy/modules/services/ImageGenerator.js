import * as THREE from 'three';
import { extractText } from '../claudeResponse.js';

export class ImageGenerator {
  constructor() {
    this.isGenerating = false;
  }

  // サーバー経由でfal.ai APIで画像を生成（URLを返す）
  async generate(prompt, onProgress) {
    if (this.isGenerating) {
      console.log('既に生成中です');
      return null;
    }

    this.isGenerating = true;

    try {
      console.log('Image generation prompt:', prompt);

      // 進捗表示開始
      if (onProgress) {
        onProgress(0, 1);
      }

      // サーバー経由でfal.ai Nano Banana Pro APIを呼び出し
      const response = await fetch('/api/generate-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          prompt: prompt,
          aspect_ratio: '1:1',
          resolution: '1K',
          num_images: 1,
          output_format: 'png'
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Server Error: ${response.status}`);
      }

      const result = await response.json();
      console.log('Image generation result:', result);

      if (result.images && result.images.length > 0) {
        this.isGenerating = false;
        if (onProgress) {
          onProgress(1, 1);
        }
        return result.images[0].url;
      }

      throw new Error('画像が見つかりません');

    } catch (error) {
      console.error('画像生成エラー:', error);
      this.isGenerating = false;
      throw error;
    }
  }

  // 画像パネルを作成
  createImagePanel(imageUrl, scene, textPanel) {
    return new Promise((resolve, reject) => {
      const textureLoader = new THREE.TextureLoader();
      textureLoader.crossOrigin = 'anonymous';

      textureLoader.load(
        imageUrl,
        (texture) => {
          // 画像パネルを作成（正方形、半分のサイズ）
          const panelGeometry = new THREE.PlaneGeometry(0.25, 0.25);
          const panelMaterial = new THREE.MeshBasicMaterial({
            map: texture,
            side: THREE.DoubleSide,
            transparent: true
          });

          const imagePanel = new THREE.Mesh(panelGeometry, panelMaterial);

          // テキストパネルの下に配置
          if (textPanel) {
            imagePanel.position.copy(textPanel.position);
            imagePanel.position.y -= 0.35;
            imagePanel.quaternion.copy(textPanel.quaternion);
          } else {
            imagePanel.position.set(0, 0.8, -0.5);
          }

          scene.add(imagePanel);
          resolve(imagePanel);
        },
        undefined,
        (error) => {
          reject(error);
        }
      );
    });
  }

  isCurrentlyGenerating() {
    return this.isGenerating;
  }

  // 元のプロンプトと変更指示を組み合わせて再生成用プロンプトを作成
  async createRegeneratePrompt(originalPrompt, modificationRequest) {
    try {
      const response = await fetch('/api/claude', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-opus-5',
          max_tokens: 4000,
          messages: [{
            role: 'user',
            content: `You are an expert at creating prompts for image generation AI.

Original image prompt: "${originalPrompt}"

User's modification request: "${modificationRequest}"

Create a new, detailed English prompt that incorporates the user's modification into the original image concept. Keep the essence of the original while applying the requested changes. Output ONLY the new prompt, nothing else.`
          }]
        })
      });

      if (!response.ok) {
        console.error('Claude API Error');
        // フォールバック: 元のプロンプトと変更指示を単純に結合
        return `${originalPrompt}, ${modificationRequest}`;
      }

      const data = await response.json();
      const newPrompt = extractText(data);
      console.log('Regenerate prompt:', newPrompt);
      return newPrompt;

    } catch (error) {
      console.error('再生成プロンプト作成エラー:', error);
      return `${originalPrompt}, ${modificationRequest}`;
    }
  }
}
