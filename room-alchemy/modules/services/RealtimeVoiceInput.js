/**
 * 音声入力サービス（OpenAI Realtime API 版）
 *
 * 既存の VoiceInput は「録音 → まるごとアップロード → キュー → 推論」というバッチ構造で、
 * 実測で 5.9〜13.5秒かかっていた（内訳: 接続の固定オーバーヘッド 2.6〜2.8秒 +
 * fal のキュー待ち最大 5.3秒 + 推論）。
 *
 * こちらは WebSocket を張りっぱなしにして喋っている最中から PCM を流し込むため、
 * アップロードのホップもキュー待ちも存在しない。喋り終わった時点でほぼ確定している。
 *
 * APIキーはサーバー(/api/realtime-token)が発行する ephemeral token を使う。
 * OPENAI_API_KEY 自体はクライアントに渡らない。
 */

/** Realtime API が要求するサンプリングレート */
const SAMPLE_RATE = 24000;

/** 送信単位（サンプル数）。100ms ごとに送る */
const CHUNK_SAMPLES = SAMPLE_RATE / 10;

/** 停止後、最後の文字起こしが返ってくるのを待つ上限 */
const FINALIZE_TIMEOUT_MS = 3000;


/**
 * マイク入力を Float32 のまま main thread に渡すだけの worklet。
 * 外部ファイルにすると Vite のビルド設定に依存するので Blob で埋め込む
 */
const WORKLET_SRC = `
class PCMProcessor extends AudioWorkletProcessor {
  process(inputs) {
    const channel = inputs[0] && inputs[0][0];
    // 入力バッファは使い回されるのでコピーしてから渡す
    if (channel) this.port.postMessage(new Float32Array(channel));
    return true;
  }
}
registerProcessor('pcm-processor', PCMProcessor);
`;

/** Float32(-1.0〜1.0) を PCM16 のリトルエンディアンbase64へ */
function encodePCM16(samples) {
  const pcm = new Int16Array(samples.length);
  for (let i = 0; i < samples.length; i++) {
    const clamped = Math.max(-1, Math.min(1, samples[i]));
    pcm[i] = clamped < 0 ? clamped * 0x8000 : clamped * 0x7fff;
  }

  const bytes = new Uint8Array(pcm.buffer);
  // 一度に apply するとサンプル数が多いときスタックが溢れるので分割する
  let binary = '';
  const STEP = 0x8000;
  for (let i = 0; i < bytes.length; i += STEP) {
    binary += String.fromCharCode.apply(null, bytes.subarray(i, i + STEP));
  }
  return btoa(binary);
}

/** AudioContext が 24kHz を拒否した場合の線形リサンプリング */
function resample(samples, fromRate, toRate) {
  if (fromRate === toRate) return samples;

  const ratio = fromRate / toRate;
  const out = new Float32Array(Math.floor(samples.length / ratio));
  for (let i = 0; i < out.length; i++) {
    const pos = i * ratio;
    const idx = Math.floor(pos);
    const frac = pos - idx;
    const a = samples[idx] ?? 0;
    const b = samples[idx + 1] ?? a;
    out[i] = a + (b - a) * frac;
  }
  return out;
}

export class RealtimeVoiceInput {
  constructor() {
    this.ws = null;
    this.stream = null;
    this.audioContext = null;
    this.workletNode = null;
    this.source = null;

    this.buffer = [];       // 送信待ちのサンプル
    this.segments = [];     // 確定した文字起こし
    this.partial = '';      // 未確定の delta
    this.recording = false;
    this.pending = 0;                // commit 済みで文字起こし待ちの区間数
    this.expectingCommit = false;    // 手動 commit の受理待ち
    this.speechActive = false;       // VAD が発話中と判定しているか
    this.lastError = null;           // ヘッドセット内でも原因が分かるように保持する
  }

  isRecording() {
    return this.recording;
  }

  /**
   * トークン取得と WebSocket 接続を先に済ませておく。
   * 実測でこの2つが接続時間の 1.63/1.65 秒を占めていたため、
   * テキスト入力を開いた時点で走らせて押下時の待ちを消す。
   * マイクは押した瞬間まで取らない（開いただけで録音ランプを点けないため）
   * @returns {Promise<void>} 失敗しても投げない。start() 側で通常経路に落ちる
   */
  prepare() {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) return Promise.resolve();
    if (this.preparing) return this.preparing;

    this.preparing = (async () => {
      const startedAt = Date.now();
      const ephemeralKey = await this._fetchToken();
      await this._openSocket(ephemeralKey);
      console.log(`[time] realtime.prepare: ${((Date.now() - startedAt) / 1000).toFixed(2)}秒`);
    })()
      .catch((error) => {
        // 事前接続はあくまで先回りなので、失敗しても録音開始時にやり直す
        console.warn('事前接続に失敗しました（録音時に再試行します）:', error.message);
        this._closeSocket();
      })
      .finally(() => { this.preparing = null; });

    return this.preparing;
  }

  async _fetchToken() {
    const response = await fetch('/api/realtime-token', { method: 'POST' });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`トークン取得に失敗しました (${response.status}) ${errorText}`);
    }
    const { value } = await response.json();
    return value;
  }

  /**
   * 接続して録音を開始
   */
  async start() {
    if (this.recording) return;

    this.buffer = [];
    this.segments = [];
    this.partial = '';
    this.pending = 0;
    this.expectingCommit = false;
    this.speechActive = false;
    this.lastError = null;

    const connectStartedAt = Date.now();
    const lap = (label, from) =>
      console.log(`[time] realtime.connect.${label}: ${((Date.now() - from) / 1000).toFixed(2)}秒`);

    // マイク取得はトークンにも接続にも依存しないので先に走らせておく
    const micStartedAt = Date.now();
    const micPromise = navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => { lap('mic', micStartedAt); return stream; });

    try {
      // prepare() 済みなら即座に返る。未接続・切断済みならここで繋ぐ
      const connectionStartedAt = Date.now();
      await this.prepare();
      lap('connection', connectionStartedAt);

      if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
        throw new Error('Realtime API に接続できませんでした');
      }
    } catch (error) {
      // マイクを掴んだまま失敗すると録音ランプが点いたままになる
      micPromise.then(s => s.getTracks().forEach(t => t.stop())).catch(() => {});
      throw error;
    }

    const stream = await micPromise;
    this.stream = stream;

    const pipelineStartedAt = Date.now();
    await this._startAudioPipeline(stream);
    lap('pipeline', pipelineStartedAt);

    this.recording = true;
    console.log(`[time] realtime.connect: ${((Date.now() - connectStartedAt) / 1000).toFixed(2)}秒`);
  }

  /**
   * 録音を停止して文字起こし結果を返す
   * @returns {Promise<string>} 認識されたテキスト（失敗時は空文字）
   */
  async stopAndTranscribe() {
    if (!this.recording) return '';

    // ボタンを押してからテキストが確定するまで。
    // 既存パスの [time] transcribe.roundtrip と直接比較できる数字
    const finalizeStartedAt = Date.now();

    this._teardownAudio();
    this.recording = false;

    // 送り残したぶんを流し切る
    this._flush(true);

    // 喋っている途中でボタンを止めた場合だけ手動で確定させる。
    // server_vad は無音を破棄するので、発話が終わっていれば
    // サーバー側のバッファは空であり、commit を送ると弾かれる
    if (this.speechActive && this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.expectingCommit = true;
      this.ws.send(JSON.stringify({ type: 'input_audio_buffer.commit' }));
    }

    await this._waitForFinal();

    this._closeSocket();

    const text = [...this.segments, this.partial]
      .map(s => s.trim())
      .filter(Boolean)
      .join(' ')
      .trim();

    console.log(`[time] realtime.finalize: ${((Date.now() - finalizeStartedAt) / 1000).toFixed(1)}秒`);
    console.log('Transcribed (realtime):', text);

    // 無言だったのか失敗したのかを取り違えないよう、エラーは黙って捨てない
    if (!text && this.lastError) throw new Error(this.lastError);

    return text;
  }

  /**
   * 文字起こしせずに中断
   */
  cancel() {
    this._teardownAudio();
    this._closeSocket();
    this.recording = false;
    this.buffer = [];
    this.segments = [];
    this.partial = '';
  }

  /** WebSocket を開いて transcription セッションとして設定する */
  _openSocket(ephemeralKey) {
    return new Promise((resolve, reject) => {
      // ブラウザの WebSocket は独自ヘッダを付けられないため、
      // 認証情報はサブプロトコルに載せる（Realtime API のブラウザ向け作法）。
      // GA版では openai-beta.realtime-v1 を付けると beta_api_shape_disabled で弾かれる。
      // セッション種別は発行済みトークン側に紐づいているので intent クエリも不要
      const ws = new WebSocket('wss://api.openai.com/v1/realtime', [
        'realtime',
        `openai-insecure-api-key.${ephemeralKey}`
      ]);

      ws.onopen = () => {
        ws.send(JSON.stringify({
          type: 'session.update',
          session: {
            type: 'transcription',
            audio: {
              input: {
                format: { type: 'audio/pcm', rate: SAMPLE_RATE },
                transcription: {
                  model: 'gpt-4o-mini-transcribe',
                  language: 'ja'
                },
                // 喋っている最中から文字起こしを走らせる
                turn_detection: {
                  type: 'server_vad',
                  threshold: 0.5,
                  prefix_padding_ms: 300,
                  silence_duration_ms: 500
                }
              }
            }
          }
        }));
        resolve();
      };

      ws.onerror = () => reject(new Error('Realtime API への接続に失敗しました'));
      ws.onmessage = (event) => this._handleServerEvent(event);
      // 切断されたら待ち続けても無駄なので解除する。
      // ws を捨てることで次の prepare() が繋ぎ直せるようにする
      ws.onclose = () => {
        this.pending = 0;
        this.expectingCommit = false;
        if (this.ws === ws) this.ws = null;
      };

      this.ws = ws;
    });
  }

  _handleServerEvent(event) {
    let message;
    try {
      message = JSON.parse(event.data);
    } catch {
      return;
    }

    switch (message.type) {
      // VAD の発話区間。停止時に手動 commit すべきかの判断に使う
      case 'input_audio_buffer.speech_started':
        this.speechActive = true;
        break;

      case 'input_audio_buffer.speech_stopped':
        this.speechActive = false;
        break;

      // VAD または手動 commit で1区間が確定した = 文字起こし待ちが1つ増える
      case 'input_audio_buffer.committed':
        this.pending++;
        this.expectingCommit = false;
        this.speechActive = false;
        break;

      case 'conversation.item.input_audio_transcription.delta':
        this.partial += message.delta ?? '';
        break;

      case 'conversation.item.input_audio_transcription.completed':
        // delta を積んでいた分は確定テキストで置き換える
        this.segments.push(message.transcript ?? this.partial);
        this.partial = '';
        this.pending = Math.max(0, this.pending - 1);
        break;

      case 'conversation.item.input_audio_transcription.failed':
        console.warn('文字起こしに失敗した区間があります:', message.error);
        this.partial = '';
        this.pending = Math.max(0, this.pending - 1);
        break;

      case 'error':
        // VAD が既に確定させた直後だと commit するものが残っておらず、これは正常。
        // 失敗として扱うと無音時に文字起こしエラーが出てしまう
        if (message.error?.code === 'input_audio_buffer_commit_empty') {
          this.expectingCommit = false;
          break;
        }
        console.error('Realtime API error:', message.error);
        this.lastError = message.error?.message ?? 'Realtime API エラー';
        this.pending = 0;
        this.expectingCommit = false;
        break;
    }
  }

  /** 文字起こし待ちが捌けるのを待つ。来なければタイムアウトして今ある分で返す */
  _waitForFinal() {
    return new Promise((resolve) => {
      const isSettled = () => this.pending === 0 && !this.expectingCommit;
      if (isSettled()) {
        resolve();
        return;
      }

      const startedAt = Date.now();
      const timer = setInterval(() => {
        const timedOut = Date.now() - startedAt > FINALIZE_TIMEOUT_MS;
        if (isSettled() || timedOut) {
          clearInterval(timer);
          if (timedOut) console.warn('確定待ちがタイムアウトしました');
          resolve();
        }
      }, 50);
    });
  }

  async _startAudioPipeline(stream) {
    // AudioContext と worklet の読み込みは重いので録音ごとに作り直さない。
    // 2回目以降はここが丸ごとスキップされる
    if (!this.audioContext) {
      this.audioContext = new AudioContext({ sampleRate: SAMPLE_RATE });

      const blobUrl = URL.createObjectURL(new Blob([WORKLET_SRC], { type: 'application/javascript' }));
      try {
        await this.audioContext.audioWorklet.addModule(blobUrl);
      } finally {
        URL.revokeObjectURL(blobUrl);
      }
    }
    if (this.audioContext.state === 'suspended') {
      await this.audioContext.resume();
    }

    this.source = this.audioContext.createMediaStreamSource(stream);
    this.workletNode = new AudioWorkletNode(this.audioContext, 'pcm-processor');

    const actualRate = this.audioContext.sampleRate;
    if (actualRate !== SAMPLE_RATE) {
      console.warn(`AudioContext が ${actualRate}Hz になったためリサンプリングします`);
    }

    this.workletNode.port.onmessage = (event) => {
      const samples = resample(event.data, actualRate, SAMPLE_RATE);
      for (let i = 0; i < samples.length; i++) this.buffer.push(samples[i]);
      this._flush(false);
    };

    this.source.connect(this.workletNode);
    // worklet は出力しないが、destination に繋がないと process が回らない環境がある
    this.workletNode.connect(this.audioContext.destination);
  }

  /** 溜まったサンプルを送る。force なら端数も送り切る */
  _flush(force) {
    if (!this.ws || this.ws.readyState !== WebSocket.OPEN) return;

    while (this.buffer.length >= CHUNK_SAMPLES || (force && this.buffer.length > 0)) {
      const size = Math.min(CHUNK_SAMPLES, this.buffer.length);
      const chunk = Float32Array.from(this.buffer.splice(0, size));
      this.ws.send(JSON.stringify({
        type: 'input_audio_buffer.append',
        audio: encodePCM16(chunk)
      }));
    }
  }

  _teardownAudio() {
    if (this.workletNode) {
      this.workletNode.port.onmessage = null;
      this.workletNode.disconnect();
      this.workletNode = null;
    }
    if (this.source) {
      this.source.disconnect();
      this.source = null;
    }
    // AudioContext は次回のために残す（close すると worklet の読み込みからやり直しになる）
    if (this.audioContext && this.audioContext.state === 'running') {
      this.audioContext.suspend();
    }
    if (this.stream) {
      this.stream.getTracks().forEach(t => t.stop());
      this.stream = null;
    }
  }

  _closeSocket() {
    if (this.ws) {
      this.ws.onmessage = null;
      this.ws.onclose = null;
      if (this.ws.readyState === WebSocket.OPEN) this.ws.close();
      this.ws = null;
    }
  }
}
