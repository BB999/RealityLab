import 'dotenv/config';
import express from 'express';
import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { fal } from '@fal-ai/client';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
const PORT = process.env.PORT || 5173;
const FAL_API_KEY = process.env.VITE_FAL_API_KEY;

// fal.ai client設定
fal.config({
  credentials: FAL_API_KEY
});

app.use(express.json());

// 音声文字起こしAPI（Whisper）
// Oculus BrowserにWeb Speech APIが無いため、録音した音声をfal.ai経由で文字起こしする
app.post('/api/transcribe', express.raw({ type: ['audio/*', 'video/*'], limit: '25mb' }), async (req, res) => {
  try {
    const contentType = req.headers['content-type'] || 'audio/webm';
    console.log(`Transcribe request: ${req.body.length} bytes, type=${contentType}`);

    if (!req.body || req.body.length === 0) {
      return res.status(400).json({ error: '音声データが空です' });
    }

    // fal.storageにアップロードしてURLを得る（whisperはaudio_urlを要求するため）
    const blob = new Blob([req.body], { type: contentType });
    const audioUrl = await fal.storage.upload(blob);
    console.log('Uploaded audio:', audioUrl);

    const result = await fal.subscribe('fal-ai/whisper', {
      input: {
        audio_url: audioUrl,
        task: 'transcribe',
        language: 'ja'
      },
      logs: true,
      onQueueUpdate: (update) => {
        console.log('Transcribe queue update:', update.status);
      }
    });

    console.log('Transcribe result:', JSON.stringify(result.data));
    res.json({ text: result.data.text ?? '' });
  } catch (error) {
    console.error('Transcribe error:', error);
    res.status(500).json({ error: error.message });
  }
});

// 画像生成API（Nano Banana Pro）
app.post('/api/generate-image', async (req, res) => {
  try {
    console.log('Image generate request:', JSON.stringify(req.body));

    const result = await fal.subscribe('fal-ai/nano-banana-pro', {
      input: req.body,
      logs: true,
      onQueueUpdate: (update) => {
        console.log('Image queue update:', update.status);
      }
    });

    console.log('Image generate result:', JSON.stringify(result.data));
    res.json(result.data);
  } catch (error) {
    console.error('Image generate error:', error);
    res.status(500).json({ error: error.message });
  }
});

// 3D生成API（Hyper3D Rodin V2）
app.post('/api/generate-3d', async (req, res) => {
  try {
    console.log('3D generate request:', JSON.stringify(req.body));

    const result = await fal.subscribe('fal-ai/hyper3d/rodin/v2', {
      input: req.body,
      logs: true,
      onQueueUpdate: (update) => {
        console.log('3D queue update:', update.status);
      }
    });

    console.log('3D generate result:', JSON.stringify(result.data));
    res.json(result.data);
  } catch (error) {
    console.error('3D generate error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Vite開発サーバーをミドルウェアとして使用
async function startServer() {
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'spa'
  });

  app.use(vite.middlewares);

  // HTTPS証明書を読み込み
  const httpsOptions = {
    key: fs.readFileSync(path.resolve(__dirname, '.cert/key.pem')),
    cert: fs.readFileSync(path.resolve(__dirname, '.cert/cert.pem'))
  };

  // HTTPSサーバーを起動
  https.createServer(httpsOptions, app).listen(PORT, '0.0.0.0', () => {
    console.log(`サーバー起動: https://localhost:${PORT}`);
    console.log(`ネットワーク: https://192.168.128.171:${PORT}`);
  });
}

startServer();
