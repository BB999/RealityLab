/**
 * DSLパーサー
 * YAML形式のモジュール定義をパース
 */

/**
 * DSL定義の例:
 *
 * kind: starfield
 * label: 夜空の星
 * params:
 *   count: 200
 *   color: "#ffffff"
 *   size: 0.02
 *   spread: 2.0
 *
 * kind: fireworks
 * label: 打ち上げ花火
 * params:
 *   rate: 0.5
 *   particleBudget: 500
 *   colors: ["#ff0000", "#00ff00", "#0000ff"]
 *
 * kind: imagePanel
 * label: 生成画像
 * params:
 *   imageUrl: "https://..."
 *   width: 0.3
 *   height: 0.3
 */

/**
 * シンプルなYAMLパーサー（外部ライブラリ不要）
 * @param {string} yamlString - YAML文字列
 * @returns {Object} パースされたオブジェクト
 */
export function parseYAML(yamlString) {
  const lines = yamlString.split('\n');
  const result = {};
  let currentKey = null;
  let currentObject = result;
  const stack = [{ obj: result, indent: -1 }];

  for (let line of lines) {
    // 空行とコメントをスキップ
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;

    // インデントを計算
    const indent = line.search(/\S/);

    // key: value の形式をパース
    const colonIndex = trimmed.indexOf(':');
    if (colonIndex === -1) continue;

    const key = trimmed.substring(0, colonIndex).trim();
    let value = trimmed.substring(colonIndex + 1).trim();

    // インデントレベルに基づいてスタックを調整
    while (stack.length > 1 && stack[stack.length - 1].indent >= indent) {
      stack.pop();
    }
    currentObject = stack[stack.length - 1].obj;

    // 値がない場合（ネストされたオブジェクト）
    if (!value) {
      currentObject[key] = {};
      stack.push({ obj: currentObject[key], indent: indent });
    } else {
      // 値をパース
      currentObject[key] = parseValue(value);
    }
  }

  return result;
}

/**
 * 値をパース（文字列、数値、配列、真偽値）
 * @param {string} value - パースする値
 * @returns {*} パースされた値
 */
function parseValue(value) {
  // 配列
  if (value.startsWith('[') && value.endsWith(']')) {
    const arrayContent = value.slice(1, -1);
    return arrayContent.split(',').map(item => parseValue(item.trim()));
  }

  // 文字列（クォート付き）
  if ((value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))) {
    return value.slice(1, -1);
  }

  // 真偽値
  if (value === 'true') return true;
  if (value === 'false') return false;
  if (value === 'null') return null;

  // 数値
  const num = Number(value);
  if (!isNaN(num)) return num;

  // その他は文字列
  return value;
}

/**
 * DSL定義をパース
 * @param {string} dslString - DSL文字列
 * @returns {Object} モジュール定義
 */
export function parseDSL(dslString) {
  const parsed = parseYAML(dslString);

  return {
    kind: parsed.kind || 'unknown',
    label: parsed.label || '',
    params: parsed.params || {}
  };
}

/**
 * JSONからモジュール定義を生成
 * @param {Object} json - JSON形式のモジュール定義
 * @returns {Object} モジュール定義
 */
export function parseJSON(json) {
  return {
    kind: json.kind || 'unknown',
    label: json.label || '',
    params: json.params || {}
  };
}

/**
 * モジュール定義をDSL文字列に変換
 * @param {Object} moduleDef - モジュール定義
 * @returns {string} DSL文字列
 */
export function toDSL(moduleDef) {
  let dsl = `kind: ${moduleDef.kind}\n`;

  if (moduleDef.label) {
    dsl += `label: "${moduleDef.label}"\n`;
  }

  if (moduleDef.params && Object.keys(moduleDef.params).length > 0) {
    dsl += `params:\n`;
    for (const [key, value] of Object.entries(moduleDef.params)) {
      dsl += `  ${key}: ${formatValue(value)}\n`;
    }
  }

  return dsl;
}

/**
 * 値をDSL形式にフォーマット
 * @param {*} value - フォーマットする値
 * @returns {string} フォーマットされた文字列
 */
function formatValue(value) {
  if (Array.isArray(value)) {
    return `[${value.map(v => formatValue(v)).join(', ')}]`;
  }
  if (typeof value === 'string') {
    return `"${value}"`;
  }
  return String(value);
}
