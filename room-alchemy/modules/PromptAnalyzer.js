/**
 * プロンプトアナライザー
 * Claude APIを使ってプロンプトからモジュール種類とパラメータを判定
 */

// Three.js用の詳細プロンプト
const THREEJS_DESIGN_PROMPT = `あなたはThree.jsのプロのエンジニア兼、工業製品の3Dモデリング設計者です。
展示・製品レベルを想定して、以下のプロンプトの対象物をThree.jsで生成してください。

【最重要ルール】
- 1 unit = 1m。現実の寸法・構造・比率で"リアル"を表現する（質感頼み禁止）。
- 形状は見た目だけでなく、構造・厚み・接合が論理的に説明できること。
- 抽象化・省略・シルエット誤魔化しは禁止（「なんとなくそれっぽい」は不可）。
- まず形状構造を文章で整理し、その設計に忠実なコードを出すこと。

【出力フォーマット（必ずこの順番）】
1) 設計仕様（Design Spec）
   - 全体寸法（W/H/D）をmm換算でも併記
   - 厚み（板厚/肉厚）を数値で明記（例：t=18mm等）
   - クリアランス/隙間（例：嵌合クリアランス0.5mm）
   - 面取り/角丸の方針（例：R=2mm相当）
2) 部品表（BOM: Bill of Materials）
   - パーツを必ず分割：id, 名称, 寸法, 厚み, 材料想定, 接合方式（ねじ/ほぞ/溶接/接着等）
3) 接合設計（Joints）
   - どのパーツがどこで、どう固定されるかを文章で説明
   - 組み立て順（Assembly steps）を3〜8手順で書く
4) Three.js実装（Code）
   - パーツごとに関数化を意識し、BOMのidと対応させる
   - 各パーツは局所座標系で作り、最後に組み立て（transform）して全体にする
   - すべての寸法は定数（mm→m変換）から計算し、ハードコードの魔法数を避ける
5) 自己検証（Validation）
   - 指定寸法と一致しているか（W/H/D）
   - 厚みが全パーツで定義され一貫しているか
   - 接合が物理的に成立しているか（浮き/めり込み/貫通がないか）
   - "省略"が入り込んでいないか（BOMに無い形状がないか）

【禁止】
- 「詳細は省略」「適当に」「いい感じ」などの曖昧処理
- 外部モデル(GLB)前提、外部テクスチャ必須
- 参照不能な架空寸法（必ず数値化）

最初に 想定する製造方法（木工/板金/射出成形/3Dプリント）を1つ選び、その制約（板厚や曲げRなど）に従え`;

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
  const systemPrompt = `You are a Three.js code generator for WebXR.

${THREEJS_DESIGN_PROMPT}

---

CRITICAL CONSTRAINTS FOR CODE OUTPUT:
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
- NEVER set group.position or group.rotation - the group position is managed by the system

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

Output ONLY the JavaScript code, no markdown, no explanation. Skip the design documentation and output only the final code.`;

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
        model: 'claude-sonnet-4-20250514',
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
  const systemPrompt = `You are a Three.js code generator for WebXR. You will modify existing Three.js code based on user instructions.

${THREEJS_DESIGN_PROMPT}

---

CRITICAL CONSTRAINTS FOR CODE OUTPUT:
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
- NEVER set group.position or group.rotation - the group position is managed by the system

USE ONLY these geometries:
- BoxGeometry, SphereGeometry, PlaneGeometry, CylinderGeometry
- TorusGeometry, TorusKnotGeometry, ConeGeometry, RingGeometry
- CircleGeometry, IcosahedronGeometry, OctahedronGeometry

Available variables:
- THREE: Three.js core library only
- group: THREE.Group to add objects to
- meshes: Array to track created meshes
- animationCallbacks: Array of functions called each frame with (time, deltaTime)

IMPORTANT: Modify the existing code based on the user's instructions while maintaining the overall structure and realistic dimensions.

Output ONLY the JavaScript code, no markdown, no explanation. Skip the design documentation and output only the final code.`;

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
        model: 'claude-sonnet-4-20250514',
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
