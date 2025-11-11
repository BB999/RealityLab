import { defineConfig } from 'vite';
import mkcert from 'vite-plugin-mkcert';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  base: './',
  plugins: [
    mkcert(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.png', 'app_icon_192x192.png', 'app_icon_512x512.png'],
      manifest: {
        name: 'Simple MR Box',
        short_name: 'MR Box',
        description: 'シンプルなMRボックス表示アプリ',
        theme_color: '#0f172a',
        background_color: '#0f172a',
        display: 'standalone',
        orientation: 'portrait',
        icons: [
          {
            src: 'app_icon_192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'app_icon_512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
  server: {
    https: true,
    host: true
  }
});
