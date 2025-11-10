import { defineConfig } from 'vite';
import fs from 'fs';
import path from 'path';

const certPath = path.join(process.env.HOME, '.vite-plugin-mkcert');

export default defineConfig({
  plugins: [],
  server: {
    https: {
      key: fs.readFileSync(path.join(certPath, 'dev.pem')),
      cert: fs.readFileSync(path.join(certPath, 'cert.pem'))
    },
    host: '0.0.0.0',
    port: 3000
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false
  }
});
