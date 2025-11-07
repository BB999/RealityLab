import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import mkcert from 'vite-plugin-mkcert';
import fs from 'fs';
import path from 'path';

export default defineConfig({
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.png', 'app_icon_192x192.png', 'app_icon_512x512.png'],
      manifest: {
        name: 'MR Car Physics',
        short_name: 'MR Car',
        description: 'ハンドトラッキングとコントローラーで車を操作できるMRアプリ',
        theme_color: '#1e293b',
        background_color: '#1e293b',
        display: 'standalone',
        orientation: 'landscape',
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
    https: {
      key: fs.readFileSync(path.resolve(__dirname, 'key.pem')),
      cert: fs.readFileSync(path.resolve(__dirname, 'cert.pem'))
    },
    host: true
  }
});
