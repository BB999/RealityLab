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

Respond ONLY with valid JSON in this exact format:
{
  "kind": "threejs|imagePanel|hyper3d|manga",
  "label": "brief description in user's language",
  "params": {},
  "imagePrompt": "only if kind is imagePanel or hyper3d, detailed English prompt for image generation",
  "threejsPrompt": "only if kind is threejs, detailed description of what 3D effect to create",
  "mangaPrompt": "only if kind is manga, the theme/story for the manga in English"
}

Rules:
- If the request is for simple 3D effects, particles, geometric shapes, animations -> threejs
- If the request is for 2D images, artwork, illustrations, photos -> imagePanel
- If the request is for realistic 3D models of physical objects (furniture, animals, products, etc.) -> hyper3d
- If the request is for manga, comic, 漫画, コミック, or any comic book creation -> manga
- For hyper3d, create a detailed English prompt for generating a reference image of the object
- For threejs, describe in detail what 3D effect should be created
- For imagePanel, create a detailed English prompt for high-quality image generation
- For manga, extract the theme/story the user wants and translate to English`;

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

    // 制御文字を除去してからパース
    let jsonStr = jsonMatch[0];
    jsonStr = jsonStr.replace(/[\x00-\x1F\x7F]/g, ' ');  // 制御文字をスペースに置換
    jsonStr = jsonStr.replace(/\n/g, ' ');  // 改行もスペースに

    const result = JSON.parse(jsonStr);
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
        model: 'claude-sonnet-4-5-20250929',
        max_tokens: 4000,
        messages: [{
          role: 'user',
          content: `【対象プロンプト】
${description}

上記の対象物をThree.jsで生成してください。リアルな寸法・構造・比率で製品レベルの3Dモデルを作成し、JavaScriptコードのみを出力してください。`
        }],
        system: systemPrompt
      })
    });

    if (!response.ok) {
      console.error('Three.js code generation failed');
      return getFallbackCode(description);
    }

    const data = await response.json();
    let code = data.content[0].text.trim();

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
 * シンプルなキーワードベースの判定（Claude APIが使えない場合のフォールバック）
 * @param {string} prompt - ユーザー入力
 * @returns {Object} モジュール定義
 */
export function analyzePromptLocal(prompt) {
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
        model: 'claude-sonnet-4-5-20250929',
        max_tokens: 4000,
        messages: [{
          role: 'user',
          content: `【対象プロンプト】
元のオブジェクト: ${originalPrompt}
変更指示: ${newPrompt}

既存のThree.jsコード:
\`\`\`javascript
${existingCode}
\`\`\`

上記の変更指示に基づいて既存のコードを修正してください。リアルな寸法・構造・比率を維持しながら、JavaScriptコードのみを出力してください。`
        }],
        system: systemPrompt
      })
    });

    if (!response.ok) {
      console.error('Three.js code regeneration failed');
      return existingCode; // 失敗時は既存のコードを返す
    }

    const data = await response.json();
    let code = data.content[0].text.trim();

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
