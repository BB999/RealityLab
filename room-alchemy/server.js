import 'dotenv/config';
import express from 'express';
import https from 'https';
import fs from 'fs';
import os from 'os';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { fal } from '@fal-ai/client';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
const PORT = process.env.PORT || 5173;
const FAL_API_KEY = process.env.VITE_FAL_API_KEY;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
// VITE_ プレフィックスはビルド時にクライアントへ埋め込まれてしまうため、
// 新しい名前を優先する。移行中は従来の名前も読めるようにしておく
const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY || process.env.VITE_ANTHROPIC_API_KEY;

// fal.ai client設定
fal.config({
  credentials: FAL_API_KEY
});

// Three.js のコード再生成では既存コードを丸ごと送るため、既定の100kbでは足りない
app.use(express.json({ limit: '10mb' }));

// Elapsed seconds since a Date.now() mark, for latency logging
const since = (startedAt) => ((Date.now() - startedAt) / 1000).toFixed(1);

// Claude API のプロキシ
// クライアントから直接叩くと VITE_ 経由でAPIキーがバンドルに埋め込まれ、
// dist を公開した時点で鍵が露出する。サーバーだけが鍵を持つようにする
app.post('/api/claude', async (req, res) => {
  try {
    if (!ANTHROPIC_API_KEY) {
      return res.status(500).json({ error: 'ANTHROPIC_API_KEY が設定されていません' });
    }

    const startedAt = Date.now();
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify(req.body)
    });

    // 呼び出し側がモデルごとの所要時間を追えるようにする
    console.log(`[time] claude(${req.body?.model ?? 'unknown'}): ${since(startedAt)}秒`);

    // 成否の判定は呼び出し側が行うので、ステータスと本文をそのまま返す
    const body = await response.text();
    res.status(response.status).type('application/json').send(body);
  } catch (error) {
    console.error('Claude proxy error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Realtime API 用の使い捨てトークンを発行する
// OPENAI_API_KEY をクライアントに渡さないための踏み台。有効期限は短い
app.post('/api/realtime-token', async (req, res) => {
  try {
    if (!OPENAI_API_KEY) {
      return res.status(500).json({ error: 'OPENAI_API_KEY が .env に設定されていません' });
    }

    const startedAt = Date.now();
    const response = await fetch('https://api.openai.com/v1/realtime/client_secrets', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        expires_after: { anchor: 'created_at', seconds: 600 },
        session: {
          type: 'transcription',
          audio: {
            input: {
              format: { type: 'audio/pcm', rate: 24000 },
              transcription: { model: 'gpt-4o-mini-transcribe', language: 'ja' }
            }
          }
        }
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Realtime token error:', response.status, errorText);
      return res.status(response.status).json({ error: errorText });
    }

    const data = await response.json();
    console.log(`[time] realtime-token: ${since(startedAt)}秒`);

    // 実際のレスポンスはトップレベルの value にトークンが入る。
    // ドキュメントには client_secret と書かれているので両方の形に備える
    const value =
      data.value ??
      (typeof data.client_secret === 'string' ? data.client_secret : data.client_secret?.value);
    if (!value) {
      console.error('Realtime token: 想定外のレスポンス', JSON.stringify(data));
      return res.status(502).json({ error: 'トークンを取り出せませんでした' });
    }

    res.json({ value });
  } catch (error) {
    console.error('Realtime token error:', error);
    res.status(500).json({ error: error.message });
  }
});

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
    const uploadStartedAt = Date.now();
    const audioUrl = await fal.storage.upload(blob);
    console.log(`[time] transcribe.upload: ${since(uploadStartedAt)}秒`);
    console.log('Uploaded audio:', audioUrl);

    const whisperStartedAt = Date.now();
    const result = await fal.subscribe('fal-ai/whisper', {
      input: {
        audio_url: audioUrl,
        task: 'transcribe',
        language: 'ja'
      },
      logs: true,
      onQueueUpdate: (update) => {
        console.log(`Transcribe queue update: ${update.status} (${since(whisperStartedAt)}秒)`);
      }
    });
    console.log(`[time] transcribe.whisper: ${since(whisperStartedAt)}秒`);
    console.log(`[time] transcribe.total: ${since(uploadStartedAt)}秒`);

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

    const startedAt = Date.now();
    const result = await fal.subscribe('fal-ai/nano-banana-pro', {
      input: req.body,
      logs: true,
      onQueueUpdate: (update) => {
        console.log(`Image queue update: ${update.status} (${since(startedAt)}秒)`);
      }
    });
    console.log(`[time] generate-image: ${since(startedAt)}秒`);

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

    const startedAt = Date.now();
    const result = await fal.subscribe('fal-ai/hyper3d/rodin/v2', {
      input: req.body,
      logs: true,
      onQueueUpdate: (update) => {
        console.log(`3D queue update: ${update.status} (${since(startedAt)}秒)`);
      }
    });
    console.log(`[time] generate-3d: ${since(startedAt)}秒`);

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
    // Quest から繋ぐアドレス。DHCPで変わるのでハードコードせず毎回調べる
    for (const addresses of Object.values(os.networkInterfaces())) {
      for (const addr of addresses ?? []) {
        if (addr.family === 'IPv4' && !addr.internal) {
          console.log(`ネットワーク: https://${addr.address}:${PORT}`);
        }
      }
    }
  });
}

startServer();
