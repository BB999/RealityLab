import { extractText } from './claudeResponse.js';

/**
 * 判定結果のJSONスキーマ（Structured Outputs用）
 * kind を enum で縛ることで、想定外の値が返ることを構造的に防ぐ
 */
const MODULE_SCHEMA = {
  type: 'object',
  properties: {
    kind: {
      type: 'string',
      enum: ['threejs', 'imagePanel', 'hyper3d', 'manga'],
      description: 'Which module to create'
    },
    label: {
      type: 'string',
      description: "Brief description in the user's own language"
    },
    imagePrompt: {
      type: 'string',
      description: 'Detailed English image-generation prompt for imagePanel and hyper3d. Empty string otherwise.'
    },
    mangaPrompt: {
      type: 'string',
      description: 'Theme/story in English for manga. Empty string otherwise.'
    }
  },
  required: ['kind', 'label', 'imagePrompt', 'mangaPrompt'],
  additionalProperties: false
};

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
  const systemPrompt = `You are an AI that analyzes user prompts and determines what to create in a WebXR environment.

Available types:
1. "threejs" - For simple 3D effects, particles, geometric shapes, animations created with Three.js code
   Examples: stars, fireworks, particles, geometric shapes, animated effects, abstract visuals

2. "imagePanel" - For 2D artwork, illustrations, photos, paintings that should be generated as an image
   Examples: portraits, landscapes, artwork, photos, illustrations, etc.

3. "hyper3d" - For realistic 3D models of real-world objects that need high-quality mesh and textures
   Examples: furniture (chair, table, lamp), animals, vehicles, food, plants, characters, products, etc.
   Use this when the user wants a realistic 3D model of a physical object.

4. "manga" - For creating manga/comic books with multiple pages
   Examples: manga, comic, 漫画, コミック, マンガ, comic book, graphic novel
   Use this when the user wants to create a manga or comic book.

Choosing between "threejs" and "hyper3d" is the decision that matters most:
- Is motion, light, or particles the point? -> threejs
  (fire, smoke, fireworks, rain, explosions, glowing orbs, waveforms, orbiting shapes)
- Is the surface, material, or exact silhouette of a real object the point? -> hyper3d
  (a specific chair, a dog, a sports car, a hamburger, a potted plant)
- Basic geometric primitives (cube, sphere, torus, spiral, helix) -> threejs, even when the user says "3D"
- The cost is asymmetric: threejs generates in seconds, while hyper3d runs image generation THEN 3D
  reconstruction and takes several minutes. Picking hyper3d for something threejs could express well
  wastes minutes of the user's time while they wait inside VR. When genuinely torn, choose threejs.

Rules:
- 2D images, artwork, illustrations, photos -> imagePanel
- manga, comic, 漫画, コミック, or any comic book request -> manga
- For hyper3d, write a detailed English prompt for generating a reference image of the object
- For imagePanel, write a detailed English prompt for high-quality image generation
- For manga, extract the theme/story the user wants and translate it to English
- For threejs, no extra prompt is needed — the user's raw input is passed to the code generator
- Leave imagePrompt and mangaPrompt as empty strings when they do not apply
- "label" is a brief description in the user's own language`;

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
        model: 'claude-opus-5',
        max_tokens: 4000,
        output_config: {
          format: {
            type: 'json_schema',
            schema: MODULE_SCHEMA
          }
        },
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
    const raw = extractText(data);

    // Structured Outputs によりスキーマ通りのJSONが返る。
    // refusal 等の異常系に備えてパース失敗時はフォールバックさせる
    try {
      const result = JSON.parse(raw);
      console.log('Prompt analysis result:', result);
      return result;
    } catch (e) {
      console.error('JSON parse failed. Raw response:', raw);
      return createFallback(prompt);
    }

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
    imagePrompt: prompt,
    mangaPrompt: ''
  };
}

/**
 * Three.jsコードを生成
 * @param {string} description - 3Dオブジェクトの説明
 * @param {string} apiKey - Anthropic APIキー
 * @returns {Promise<string>} Three.jsコード
 */
export async function generateThreejsCode(description, apiKey) {
  const systemPrompt = `You are a Three.js code generator for WebXR. Output ONLY executable JavaScript code.

RULES:
- No import/export statements (THREE is already available as global)
- No markdown code blocks
- These variables already exist, do NOT redeclare them: THREE, group, meshes, animationCallbacks
- Add all meshes to 'group' and 'meshes' array
- Use 'animationCallbacks' for animations: animationCallbacks.push((time, deltaTime) => {...})
- Objects should fit within 0.5m radius`;

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
        model: 'claude-opus-5',
        max_tokens: 16000,
        messages: [{
          role: 'user',
          content: description
        }],
        system: systemPrompt
      })
    });

    if (!response.ok) {
      console.error('Three.js code generation failed');
      return getFallbackCode(description);
    }

    const data = await response.json();
    let code = extractText(data);

    // マークダウンのコードブロックを除去
    code = code.replace(/```javascript\n?/g, '').replace(/```\n?/g, '');

    // group.positionとgroup.rotationへの直接設定を除去（システムが管理するため）
    code = code.replace(/group\.position\.(set|copy|add|sub|multiply|divide)\s*\([^)]*\)\s*;?/g, '// position managed by system');
    code = code.replace(/group\.rotation\.(set|copy)\s*\([^)]*\)\s*;?/g, '// rotation managed by system');
    code = code.replace(/group\.position\s*=\s*[^;]+;?/g, '// position managed by system');
    code = code.replace(/group\.rotation\s*=\s*[^;]+;?/g, '// rotation managed by system');
    code = code.replace(/group\.position\.[xyz]\s*=\s*[^;]+;?/g, '// position managed by system');
    code = code.replace(/group\.rotation\.[xyz]\s*=\s*[^;]+;?/g, '// rotation managed by system');

    console.log('Generated Three.js code:', code);
    return code;

  } catch (error) {
    console.error('Three.js code generation error:', error);
    return getFallbackCode(description);
  }
}

/**
 * フォールバック用のシンプルなコード
 */
function getFallbackCode(description) {
  return `
// Fallback: Simple rotating cube
const geometry = new THREE.BoxGeometry(0.1, 0.1, 0.1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
group.add(cube);
meshes.push(cube);

animationCallbacks.push((time, deltaTime) => {
  cube.rotation.x = time;
  cube.rotation.y = time * 0.5;
});
`;
}

/**
 * 既存のThree.jsコードを参照して再生成
 * @param {string} newPrompt - 新しいプロンプト（変更点の指示）
 * @param {string} existingCode - 既存のThree.jsコード
 * @param {string} originalPrompt - 元のプロンプト
 * @param {string} apiKey - Anthropic APIキー
 * @returns {Promise<string>} 新しいThree.jsコード
 */
export async function regenerateThreejsCode(newPrompt, existingCode, originalPrompt, apiKey) {
  const systemPrompt = `You are a Three.js code generator for WebXR. Modify existing code based on user instructions. Output ONLY executable JavaScript code.

RULES:
- No import/export statements (THREE is already available as global)
- No markdown code blocks
- These variables already exist, do NOT redeclare them: THREE, group, meshes, animationCallbacks
- Add all meshes to 'group' and 'meshes' array
- Use 'animationCallbacks' for animations: animationCallbacks.push((time, deltaTime) => {...})
- Objects should fit within 0.5m radius`;

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
        model: 'claude-opus-5',
        max_tokens: 16000,
        messages: [{
          role: 'user',
          content: `元のオブジェクト: ${originalPrompt}
変更指示: ${newPrompt}

既存のThree.jsコード:
\`\`\`javascript
${existingCode}
\`\`\``
        }],
        system: systemPrompt
      })
    });

    if (!response.ok) {
      console.error('Three.js code regeneration failed');
      return existingCode; // 失敗時は既存のコードを返す
    }

    const data = await response.json();
    let code = extractText(data);

    // マークダウンのコードブロックを除去
    code = code.replace(/```javascript\n?/g, '').replace(/```\n?/g, '');

    // group.positionとgroup.rotationへの直接設定を除去（システムが管理するため）
    code = code.replace(/group\.position\.(set|copy|add|sub|multiply|divide)\s*\([^)]*\)\s*;?/g, '// position managed by system');
    code = code.replace(/group\.rotation\.(set|copy)\s*\([^)]*\)\s*;?/g, '// rotation managed by system');
    code = code.replace(/group\.position\s*=\s*[^;]+;?/g, '// position managed by system');
    code = code.replace(/group\.rotation\s*=\s*[^;]+;?/g, '// rotation managed by system');
    code = code.replace(/group\.position\.[xyz]\s*=\s*[^;]+;?/g, '// position managed by system');
    code = code.replace(/group\.rotation\.[xyz]\s*=\s*[^;]+;?/g, '// rotation managed by system');

    console.log('Regenerated Three.js code:', code);
    return code;

  } catch (error) {
    console.error('Three.js code regeneration error:', error);
    return existingCode; // エラー時は既存のコードを返す
  }
}
