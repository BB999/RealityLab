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
1. "threejs" - For any 3D object, effect, or animation that can be created with Three.js code
   Examples: stars, fireworks, cubes, spheres, particles, geometric shapes, animated objects, etc.

2. "imagePanel" - For 2D artwork, illustrations, photos, paintings that should be generated as an image
   Examples: portraits, landscapes, artwork, photos, illustrations, etc.

Respond ONLY with valid JSON in this exact format:
{
  "kind": "threejs|imagePanel",
  "label": "brief description in user's language",
  "params": {},
  "imagePrompt": "only if kind is imagePanel, detailed English prompt for image generation",
  "threejsPrompt": "only if kind is threejs, detailed description of what 3D object/effect to create"
}

Rules:
- If the request is for 3D objects, effects, particles, geometric shapes, animations -> threejs
- If the request is for 2D images, artwork, illustrations, photos -> imagePanel
- For threejs, describe in detail what 3D effect/object should be created
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
  const systemPrompt = `You are a Three.js code generator for WebXR. Generate JavaScript code that creates 3D objects.

CRITICAL CONSTRAINTS:
- Objects should fit within 0.5m radius (arm's reach in VR/MR)
- Use MeshBasicMaterial ONLY (not MeshStandardMaterial, not ShaderMaterial)
- All objects must be added to the 'group' variable
- Track meshes in the 'meshes' array for cleanup
- Use 'animationCallbacks' array to register animation functions

FORBIDDEN (these will cause errors):
- FontLoader, TextGeometry (not available)
- GLTFLoader, OBJLoader (no external loaders)
- ShaderMaterial, RawShaderMaterial (use MeshBasicMaterial instead)
- CanvasTexture with dynamic text (not reliable in WebXR)
- Any external resources or imports

USE ONLY these geometries:
- BoxGeometry, SphereGeometry, PlaneGeometry, CylinderGeometry
- TorusGeometry, TorusKnotGeometry, ConeGeometry, RingGeometry
- CircleGeometry, IcosahedronGeometry, OctahedronGeometry

Available variables:
- THREE: Three.js core library only
- group: THREE.Group to add objects to
- meshes: Array to track created meshes
- animationCallbacks: Array of functions called each frame with (time, deltaTime)

Example code structure:
\`\`\`javascript
// Create geometry and material
const geometry = new THREE.SphereGeometry(0.05, 16, 16);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });

// Create mesh and add to group
const mesh = new THREE.Mesh(geometry, material);
group.add(mesh);
meshes.push(mesh);

// Optional: Add animation
animationCallbacks.push((time, deltaTime) => {
  mesh.rotation.y = time;
});
\`\`\`

Output ONLY the JavaScript code, no markdown, no explanation.`;

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
        max_tokens: 1500,
        messages: [{
          role: 'user',
          content: `Generate Three.js code for: ${description}`
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
  const systemPrompt = `You are a Three.js code generator for WebXR. You will modify existing Three.js code based on user instructions.

CRITICAL CONSTRAINTS:
- Objects should fit within 0.5m radius (arm's reach in VR/MR)
- Use MeshBasicMaterial ONLY (not MeshStandardMaterial, not ShaderMaterial)
- All objects must be added to the 'group' variable
- Track meshes in the 'meshes' array for cleanup
- Use 'animationCallbacks' array to register animation functions

FORBIDDEN (these will cause errors):
- FontLoader, TextGeometry (not available)
- GLTFLoader, OBJLoader (no external loaders)
- ShaderMaterial, RawShaderMaterial (use MeshBasicMaterial instead)
- CanvasTexture with dynamic text (not reliable in WebXR)
- Any external resources or imports

USE ONLY these geometries:
- BoxGeometry, SphereGeometry, PlaneGeometry, CylinderGeometry
- TorusGeometry, TorusKnotGeometry, ConeGeometry, RingGeometry
- CircleGeometry, IcosahedronGeometry, OctahedronGeometry

Available variables:
- THREE: Three.js core library only
- group: THREE.Group to add objects to
- meshes: Array to track created meshes
- animationCallbacks: Array of functions called each frame with (time, deltaTime)

IMPORTANT: Modify the existing code based on the user's instructions while maintaining the overall structure.

Output ONLY the JavaScript code, no markdown, no explanation.`;

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
        max_tokens: 2000,
        messages: [{
          role: 'user',
          content: `Original prompt: "${originalPrompt}"

Existing Three.js code:
\`\`\`javascript
${existingCode}
\`\`\`

User's modification request: "${newPrompt}"

Please modify the existing code based on the user's request. Keep the same overall structure but apply the requested changes.`
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

    console.log('Regenerated Three.js code:', code);
    return code;

  } catch (error) {
    console.error('Three.js code regeneration error:', error);
    return existingCode; // エラー時は既存のコードを返す
  }
}
