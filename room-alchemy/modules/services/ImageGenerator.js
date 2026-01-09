import * as THREE from 'three';

export class ImageGenerator {
  constructor(falApiKey, anthropicApiKey) {
    this.falApiKey = falApiKey;
    this.anthropicApiKey = anthropicApiKey;
    this.isGenerating = false;
  }

  // Claude APIでプロンプトを強化
  async enhancePrompt(userPrompt) {
    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': this.anthropicApiKey,
          'anthropic-version': '2023-06-01',
          'anthropic-dangerous-direct-browser-access': 'true'
        },
        body: JSON.stringify({
          model: 'claude-3-5-haiku-20241022',
          max_tokens: 300,
          messages: [{
            role: 'user',
            content: `You are an expert at creating prompts for image generation AI. Convert the following user input into a detailed, high-quality English prompt for Nano Banana Pro (a text-to-image AI). Keep it concise but descriptive, focusing on visual details, style, lighting, and composition. Output ONLY the prompt, nothing else.

User input: ${userPrompt}`
          }]
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Claude API Error:', errorText);
        return userPrompt; // エラー時は元のプロンプトを使用
      }

      const data = await response.json();
      const enhancedPrompt = data.content[0].text.trim();
      console.log('Enhanced prompt:', enhancedPrompt);
      return enhancedPrompt;

    } catch (error) {
      console.error('プロンプト強化エラー:', error);
      return userPrompt; // エラー時は元のプロンプトを使用
    }
  }

  // fal.ai APIで画像を生成（URLを返す）
  async generate(prompt, onProgress) {
    if (this.isGenerating) {
      console.log('既に生成中です');
      return null;
    }

    this.isGenerating = true;

    try {
      // fal.ai Nano Banana Pro APIを呼び出し
      const submitResponse = await fetch('https://queue.fal.run/fal-ai/nano-banana-pro', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Key ${this.falApiKey}`
        },
        body: JSON.stringify({
          prompt: prompt,
          aspect_ratio: '1:1',
          resolution: '1K',
          num_images: 1,
          output_format: 'png'
        })
      });

      if (!submitResponse.ok) {
        throw new Error(`Submit Error: ${submitResponse.status}`);
      }

      const submitData = await submitResponse.json();
      const requestId = submitData.request_id;

      if (!requestId) {
        throw new Error('request_idが取得できませんでした');
      }

      // ポーリングで結果を待つ
      const maxAttempts = 30;
      for (let i = 0; i < maxAttempts; i++) {
        await new Promise(resolve => setTimeout(resolve, 1500));

        const statusResponse = await fetch(`https://queue.fal.run/fal-ai/nano-banana-pro/requests/${requestId}/status`, {
          method: 'GET',
          headers: { 'Authorization': `Key ${this.falApiKey}` }
        });

        if (statusResponse.ok) {
          const statusData = await statusResponse.json();

          if (statusData.status === 'COMPLETED') {
            const resultResponse = await fetch(`https://queue.fal.run/fal-ai/nano-banana-pro/requests/${requestId}`, {
              method: 'GET',
              headers: { 'Authorization': `Key ${this.falApiKey}` }
            });

            if (resultResponse.ok) {
              const resultData = await resultResponse.json();
              if (resultData.images && resultData.images.length > 0) {
                this.isGenerating = false;
                return resultData.images[0].url;
              }
            }
          }
        }

        if (onProgress) {
          onProgress(i + 1, maxAttempts);
        }
      }

      throw new Error('画像生成タイムアウト');
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
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': this.anthropicApiKey,
          'anthropic-version': '2023-06-01',
          'anthropic-dangerous-direct-browser-access': 'true'
        },
        body: JSON.stringify({
          model: 'claude-3-5-haiku-20241022',
          max_tokens: 400,
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
      const newPrompt = data.content[0].text.trim();
      console.log('Regenerate prompt:', newPrompt);
      return newPrompt;

    } catch (error) {
      console.error('再生成プロンプト作成エラー:', error);
      return `${originalPrompt}, ${modificationRequest}`;
    }
  }
}
