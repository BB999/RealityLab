import { extractText } from './claudeResponse.js';

/** Elapsed seconds since a Date.now() mark, for latency logging */
const since = (startedAt) => ((Date.now() - startedAt) / 1000).toFixed(1);

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
 * @returns {Promise<Object>} モジュール定義
 */
export async function analyzePrompt(prompt) {
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
- If the user names the technique, that overrides every rule below. Naming a tool is an
  instruction about HOW to build it, not a description of the subject — the subject may
  look like it belongs to another type and the instruction still wins.
    "Three.jsで", "with Three.js", "コードで", "プログラムで"  -> threejs
    "画像で", "イラストで", "as an image", "絵で"              -> imagePanel
    "3Dモデルで", "as a 3D model"                              -> hyper3d
    "漫画で", "as a manga"                                     -> manga
- 2D images, artwork, illustrations, photos -> imagePanel
- manga, comic, 漫画, コミック, or any comic book request -> manga
- For hyper3d, write a detailed English prompt for generating a reference image of the object
- For imagePanel, write a detailed English prompt for high-quality image generation
- For manga, extract the theme/story the user wants and translate it to English
- For threejs, no extra prompt is needed — the user's raw input is passed to the code generator
- Leave imagePrompt and mangaPrompt as empty strings when they do not apply
- "label" is a brief description in the user's own language`;

  const startedAt = Date.now();
  const response = await fetch('/api/claude', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      // 分類のみのタスクなので Haiku 4.5。生成ボタンを押してから
      // 実際の生成が始まるまでの待ち時間を短くするのが狙い
      model: 'claude-haiku-4-5',
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
  console.log(`[time] analyzePrompt: ${since(startedAt)}秒`);

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Claude API Error:', errorText);
    throw new Error(describeClaudeError(response.status, errorText));
  }

  const data = await response.json();
  const raw = extractText(data);

  // Structured Outputs によりスキーマ通りのJSONが返る。
  // refusal 等でこれが崩れたときは、推測で先に進まずここで止める
  let result;
  try {
    result = JSON.parse(raw);
  } catch (e) {
    console.error('JSON parse failed. Raw response:', raw);
    throw new Error('判定結果を読み取れませんでした');
  }

  console.log('Prompt analysis result:', result);
  return result;
}

/**
 * VR の中に出せる短いエラー文にする。
 * API が返す原文は英語で長く、パネルに収まらない
 */
function describeClaudeError(status, body) {
  let message = '';
  try {
    message = JSON.parse(body)?.error?.message ?? '';
  } catch (e) {
    message = body;
  }

  if (message.includes('credit balance')) return 'Anthropic のクレジットが不足しています';
  if (status === 401 || status === 403) return 'Anthropic の APIキーが無効です';
  if (status === 429) return 'リクエストが多すぎます。少し待ってください';
  return `プロンプトの判定に失敗しました (${status})`;
}

/**
 * Three.jsコードを生成
 * @param {string} description - 3Dオブジェクトの説明
 * @returns {Promise<string>} Three.jsコード
 */
export async function generateThreejsCode(description) {
  const systemPrompt = `You are a Three.js code generator for WebXR. Output ONLY executable JavaScript code.

RULES:
- No import/export statements (THREE is already available as global)
- No markdown code blocks
- These variables already exist, do NOT redeclare them: THREE, group, meshes, animationCallbacks
- Add all meshes to 'group' and 'meshes' array
- Use 'animationCallbacks' for animations: animationCallbacks.push((time, deltaTime) => {...})
- Objects should fit within 0.5m radius`;

  try {
    const startedAt = Date.now();
    const response = await fetch('/api/claude', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
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
    console.log(`[time] generateThreejsCode: ${since(startedAt)}秒`);

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
 * @returns {Promise<string>} 新しいThree.jsコード
 */
export async function regenerateThreejsCode(newPrompt, existingCode, originalPrompt) {
  const systemPrompt = `You are a Three.js code generator for WebXR. Modify existing code based on user instructions. Output ONLY executable JavaScript code.

RULES:
- No import/export statements (THREE is already available as global)
- No markdown code blocks
- These variables already exist, do NOT redeclare them: THREE, group, meshes, animationCallbacks
- Add all meshes to 'group' and 'meshes' array
- Use 'animationCallbacks' for animations: animationCallbacks.push((time, deltaTime) => {...})
- Objects should fit within 0.5m radius`;

  try {
    const startedAt = Date.now();
    const response = await fetch('/api/claude', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
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
    console.log(`[time] regenerateThreejsCode: ${since(startedAt)}秒`);

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
