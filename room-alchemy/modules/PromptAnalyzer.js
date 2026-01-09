/**
 * プロンプトアナライザー
 * Claude APIを使ってプロンプトからモジュール種類とパラメータを判定
 */

/**
 * プロンプトを解析してモジュール定義を生成
 * @param {string} prompt - ユーザー入力
 * @param {string} apiKey - Anthropic APIキー
 * @returns {Promise<Object>} モジュール定義
 */
export async function analyzePrompt(prompt, apiKey) {
  const systemPrompt = `You are an AI that analyzes user prompts and determines what 3D module to spawn in a WebXR environment.

Available module types:
1. "starfield" - Stars, night sky, space, cosmos, galaxy
   params: count (50-200), color (hex string), size (0.02-0.08), spread (0.3-0.8 meters), twinkle (boolean)

2. "fireworks" - Fireworks, explosions, celebrations, sparks
   params: rate (0.3-1.0 seconds between launches), particleBudget (200-500), colors (array of hex strings), explosionSize (0.3-0.8 meters)

3. "imagePanel" - For any request that should generate an image using AI
   params: prompt (string - detailed image generation prompt), width (number), height (number)

Respond ONLY with valid JSON in this exact format:
{
  "kind": "starfield|fireworks|imagePanel",
  "label": "brief description in user's language",
  "params": { ... appropriate params ... },
  "imagePrompt": "only if kind is imagePanel, detailed English prompt for image generation"
}

Rules:
- If the prompt mentions stars, night sky, space, cosmos, galaxy -> starfield
- If the prompt mentions fireworks, explosions, sparkles, celebration -> fireworks
- For any other visual/artistic request -> imagePanel with a detailed image generation prompt
- IMPORTANT: This is WebXR at arm's reach distance. Keep all size/spread values small (under 1 meter)!
- starfield spread should be 0.3-0.8m, size 0.02-0.08
- fireworks explosionSize should be 0.3-0.8m
- For imagePanel, create a detailed English prompt for high-quality image generation`;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'anthropic-dangerous-direct-browser-access': 'true'
      },
      body: JSON.stringify({
        model: 'claude-3-5-haiku-20241022',
        max_tokens: 500,
        messages: [{
          role: 'user',
          content: `Analyze this prompt and determine the appropriate 3D module:\n\n"${prompt}"`
        }],
        system: systemPrompt
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Claude API Error:', errorText);
      // フォールバック: 画像パネルとして処理
      return createFallback(prompt);
    }

    const data = await response.json();
    const content = data.content[0].text.trim();

    // JSONをパース
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      console.error('No JSON found in response:', content);
      return createFallback(prompt);
    }

    const result = JSON.parse(jsonMatch[0]);
    console.log('Prompt analysis result:', result);

    return result;

  } catch (error) {
    console.error('Prompt analysis error:', error);
    return createFallback(prompt);
  }
}

/**
 * フォールバック: 画像パネルとして処理
 * @param {string} prompt - ユーザー入力
 * @returns {Object} モジュール定義
 */
function createFallback(prompt) {
  return {
    kind: 'imagePanel',
    label: prompt,
    params: {
      width: 0.3,
      height: 0.3
    },
    imagePrompt: prompt
  };
}

/**
 * シンプルなキーワードベースの判定（Claude APIが使えない場合のフォールバック）
 * @param {string} prompt - ユーザー入力
 * @returns {Object} モジュール定義
 */
export function analyzePromptLocal(prompt) {
  const lowerPrompt = prompt.toLowerCase();

  // 星空系
  const starKeywords = ['星', 'star', '夜空', 'night sky', '宇宙', 'space', 'cosmos', '銀河', 'galaxy', '天の川'];
  if (starKeywords.some(k => lowerPrompt.includes(k))) {
    return {
      kind: 'starfield',
      label: prompt,
      params: {
        count: 200,
        color: '#ffffff',
        size: 0.02,
        spread: 2.0,
        twinkle: true
      }
    };
  }

  // 花火系
  const fireworkKeywords = ['花火', 'firework', '爆発', 'explosion', 'スパーク', 'spark', '祝', 'celebrat'];
  if (fireworkKeywords.some(k => lowerPrompt.includes(k))) {
    return {
      kind: 'fireworks',
      label: prompt,
      params: {
        rate: 0.5,
        particleBudget: 500,
        colors: ['#ff0000', '#ffff00', '#00ff00', '#00ffff', '#ff00ff'],
        explosionSize: 0.5
      }
    };
  }

  // その他は画像パネル
  return {
    kind: 'imagePanel',
    label: prompt,
    params: {
      width: 0.3,
      height: 0.3
    },
    imagePrompt: prompt
  };
}
