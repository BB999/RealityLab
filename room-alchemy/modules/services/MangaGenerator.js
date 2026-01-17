/**
 * MangaGenerator サービス
 * ImageGeneratorを使用して漫画ページを生成
 */
export class MangaGenerator {
  constructor(anthropicApiKey, imageGenerator) {
    this.anthropicApiKey = anthropicApiKey;
    this.imageGenerator = imageGenerator;
    this.isGenerating = false;

    // 漫画プロンプトのベース
    this.mangaBasePrompt = `萌え絵漫画風の作風で演出・表情表現を重視した漫画を生成してください。
日本の漫画形式として、右から左・上から下へと自然に読めるコマ割りにしてください。
コマの配置や形状は自由ですが、視線誘導だけは日本式の読み順に従わせてください。
均一なレイアウトではなく、変則的または自由配置のコマ構成でお願いします。
セリフがないコマは作らないでください。
セリフの英語は必ず縦向きに表示すること（横表示絶対禁止）
技術書として新しい情報が得られるような情報も入れること
見開き2ページなので2枚画像を生成してください。
セリフは日本語で生成してください
必ずフルカラーの漫画として生成してください。`;
  }

  /**
   * 漫画用のプロンプトを生成
   */
  async createMangaPrompt(userInput, pageNumber, totalPages, isCover = false, isBackCover = false) {
    try {
      let systemPrompt;

      if (isCover) {
        systemPrompt = `You are an expert manga cover artist. Create a detailed prompt for generating a Japanese manga book cover.
The cover should be eye-catching, colorful, and represent the theme of the manga.
Include: title area at top, main character illustration, dramatic composition, Japanese manga art style.
Theme: "${userInput}"
Output ONLY the English prompt for image generation, nothing else.`;
      } else if (isBackCover) {
        systemPrompt = `You are an expert manga cover artist. Create a detailed prompt for generating a Japanese manga back cover.
The back cover should complement the front cover with a simpler design.
Include: summary text area, small character illustration or pattern, author info area, Japanese manga style.
Theme: "${userInput}"
Output ONLY the English prompt for image generation, nothing else.`;
      } else {
        systemPrompt = `You are an expert manga artist. Create a detailed prompt for generating page ${pageNumber} of ${totalPages} in a Japanese manga.

Base style requirements:
- Moe art style manga with expressive character emotions
- Japanese manga format (read right to left, top to bottom)
- Dynamic panel layout (not uniform grid)
- All panels must have dialogue/speech bubbles
- Vertical Japanese text in speech bubbles
- Full color manga page
- Include educational/technical information naturally in the story

Theme/Story: "${userInput}"

For page ${pageNumber}/${totalPages}, create a prompt that:
${pageNumber === 1 ? '- Introduces the setting and main character(s)' : ''}
${pageNumber === 2 ? '- Develops the story with character interaction' : ''}
${pageNumber === 3 ? '- Shows a key moment or conflict' : ''}
${pageNumber === 4 ? '- Continues the dramatic development' : ''}
${pageNumber === 5 ? '- Builds toward the climax' : ''}
${pageNumber === 6 ? '- Provides resolution or cliffhanger ending' : ''}

Output ONLY the English prompt for image generation, nothing else.`;
      }

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
          max_tokens: 500,
          messages: [{
            role: 'user',
            content: systemPrompt
          }]
        })
      });

      if (!response.ok) {
        console.error('Claude API Error');
        return this.getFallbackPrompt(userInput, pageNumber, isCover, isBackCover);
      }

      const data = await response.json();
      return data.content[0].text.trim();

    } catch (error) {
      console.error('プロンプト生成エラー:', error);
      return this.getFallbackPrompt(userInput, pageNumber, isCover, isBackCover);
    }
  }

  /**
   * フォールバックプロンプト
   */
  getFallbackPrompt(userInput, pageNumber, isCover, isBackCover) {
    if (isCover) {
      return `Japanese manga book cover, moe art style, colorful illustration, title at top, main character, dramatic pose, theme: ${userInput}, high quality, detailed`;
    }
    if (isBackCover) {
      return `Japanese manga back cover, simple design, small character illustration, summary area, author info, theme: ${userInput}, matching front cover style`;
    }
    return `Japanese manga page ${pageNumber}, moe art style, colorful, dynamic panel layout, speech bubbles with Japanese text, expressive characters, theme: ${userInput}, full color manga`;
  }

  /**
   * 単一の画像を生成（直接APIを呼び出し、並列生成対応）
   */
  async generateSingleImage(prompt, aspectRatio = '2:3', onProgress = null) {
    try {
      const response = await fetch('/api/generate-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          prompt: prompt,
          aspect_ratio: aspectRatio,
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

      if (result.images && result.images.length > 0) {
        return result.images[0].url;
      }

      throw new Error('画像が生成されませんでした');
    } catch (error) {
      console.error('画像生成エラー:', error);
      throw error;
    }
  }

  /**
   * 漫画全体を生成（表紙、4ページ、裏表紙）
   * @param {string} userInput - ユーザーの入力テーマ
   * @param {function} onProgress - 進捗コールバック (current, total, status)
   * @returns {Promise<{cover: string, pages: string[], backCover: string}>}
   */
  async generateManga(userInput, onProgress = null) {
    if (this.isGenerating) {
      console.log('既に生成中です');
      return null;
    }

    this.isGenerating = true;
    const totalSteps = 6; // 表紙 + 4ページ + 裏表紙
    let currentStep = 0;

    const result = {
      cover: null,
      pages: [],
      backCover: null
    };

    try {
      // 表紙を生成
      if (onProgress) onProgress(currentStep, totalSteps, '表紙を生成中...');
      const coverPrompt = await this.createMangaPrompt(userInput, 0, 4, true, false);
      console.log('表紙プロンプト:', coverPrompt);
      result.cover = await this.generateSingleImage(coverPrompt, '2:3');
      currentStep++;

      // 4ページを生成
      for (let i = 1; i <= 4; i++) {
        if (onProgress) onProgress(currentStep, totalSteps, `ページ ${i}/4 を生成中...`);
        const pagePrompt = await this.createMangaPrompt(userInput, i, 4, false, false);
        console.log(`ページ${i}プロンプト:`, pagePrompt);
        const pageUrl = await this.generateSingleImage(pagePrompt, '2:3');
        result.pages.push(pageUrl);
        currentStep++;
      }

      // 裏表紙を生成
      if (onProgress) onProgress(currentStep, totalSteps, '裏表紙を生成中...');
      const backCoverPrompt = await this.createMangaPrompt(userInput, 0, 4, false, true);
      console.log('裏表紙プロンプト:', backCoverPrompt);
      result.backCover = await this.generateSingleImage(backCoverPrompt, '2:3');
      currentStep++;

      if (onProgress) onProgress(totalSteps, totalSteps, '完了！');

      this.isGenerating = false;
      return result;

    } catch (error) {
      console.error('漫画生成エラー:', error);
      this.isGenerating = false;
      throw error;
    }
  }

  /**
   * 待機用のヘルパー
   */
  wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  isCurrentlyGenerating() {
    return this.isGenerating;
  }
}
