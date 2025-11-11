import { defineConfig } from 'vite';
import mkcert from 'vite-plugin-mkcert';

export default defineConfig({
  base: './',
  plugins: [
    mkcert({
      savePath: './.cert',
      force: true
    })
  ],
  server: {
    host: '0.0.0.0',
    port: 3000
  }
});
