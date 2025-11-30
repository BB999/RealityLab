import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import mkcert from 'vite-plugin-mkcert';
import fs from 'fs';
import path from 'path';

export default defineConfig({
  base: './',
  plugins: [
    mkcert(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: [],
      manifest: {
        name: 'MR Car Physics',
        short_name: 'MR Car',
        description: 'ハンドトラッキングとコントローラーで車を操作できるMRアプリ',
        theme_color: '#1e293b',
        background_color: '#1e293b',
        display: 'standalone',
        orientation: 'landscape',
        icons: []
      }
    })
  ],
  server: {
    host: true
  }
});
