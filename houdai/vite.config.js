import { defineConfig } from 'vite';
import mkcert from 'vite-plugin-mkcert';

export default defineConfig({
  plugins: [
    mkcert({
      savePath: './.cert', // 証明書の保存パス
      force: false, // 既存の証明書があれば再利用
    })
  ],
  server: {
    https: true,
    host: '0.0.0.0', // ネットワーク上の他のデバイスからアクセス可能にする
    port: 5173
  }
});
