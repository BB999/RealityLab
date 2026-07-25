/**
 * Claude APIレスポンスから最初のテキストブロックを取り出す
 *
 * content[0] を直接読んではいけない。Opus 5 は thinking がデフォルトで有効なため、
 * 先頭に thinking ブロックが入りうる（display は "omitted" なので中身は空文字だが、
 * ブロック自体は存在する）。type で絞り込む必要がある。
 *
 * @param {Object} data - /v1/messages のレスポンスJSON
 * @returns {string} テキスト本文（見つからなければ空文字）
 */
export function extractText(data) {
  const block = data?.content?.find(b => b.type === 'text');
  return block?.text?.trim() ?? '';
}
