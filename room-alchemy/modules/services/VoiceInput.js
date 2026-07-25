/**
 * 音声入力サービス
 *
 * Oculus Browser には Web Speech API が存在せず、さらに VR セッション中に
 * システムキーボード（hiddenInput.focus()）を開くとブラウザ側がクラッシュするため、
 * MediaRecorder で録音した音声をサーバー経由で Whisper に渡して文字起こしする。
 */
/**
 * Whisper が無音・環境音に対して返しがちな定型句。
 * 字幕データで学習しているため、実際には何も喋っていなくても出力されることがある。
 */
const HALLUCINATION_PATTERNS = [
  /^ご視聴ありがとうございました[。、！!]?$/,
  /^ありがとうございました[。、！!]?$/,
  /^おわり[。、]?$/,
  /^終わり[。、]?$/,
  /^字幕.*$/,
  /^Thank you for watching[.!]?$/i,
  /^Thanks for watching[.!]?$/i,
  /^you$/i
];

/** 極端に短い録音は無音とみなす（バイト数） */
const MIN_AUDIO_BYTES = 8000;

export class VoiceInput {
  constructor() {
    this.mediaRecorder = null;
    this.stream = null;
    this.chunks = [];
  }

  isRecording() {
    return this.mediaRecorder !== null && this.mediaRecorder.state === 'recording';
  }

  /**
   * 録音を開始
   * @returns {Promise<void>}
   */
  async start() {
    if (this.isRecording()) return;

    this.stream = await navigator.mediaDevices.getUserMedia({ audio: true });

    // このブラウザが出力できる形式を選ぶ
    const candidates = ['audio/webm;codecs=opus', 'audio/webm', 'audio/mp4', 'audio/ogg;codecs=opus'];
    const mimeType = candidates.find(t => MediaRecorder.isTypeSupported(t));

    this.chunks = [];
    this.mediaRecorder = new MediaRecorder(this.stream, mimeType ? { mimeType } : undefined);
    this.mediaRecorder.ondataavailable = (e) => {
      if (e.data.size > 0) this.chunks.push(e.data);
    };
    this.mediaRecorder.start();

    console.log('Voice recording started:', this.mediaRecorder.mimeType);
  }

  /**
   * 録音を停止して文字起こし結果を返す
   * @returns {Promise<string>} 認識されたテキスト（失敗時は空文字）
   */
  async stopAndTranscribe() {
    if (!this.mediaRecorder) return '';

    const blob = await this._stopAndCollect();
    if (!blob || blob.size === 0) {
      console.warn('録音データが空');
      return '';
    }

    console.log(`Recorded: ${(blob.size / 1024).toFixed(1)} KB (${blob.type})`);

    // 短すぎる録音は Whisper が幻聴を返しやすいので送らない
    if (blob.size < MIN_AUDIO_BYTES) {
      console.warn(`録音が短すぎるため破棄: ${blob.size} bytes`);
      return '';
    }

    const response = await fetch('/api/transcribe', {
      method: 'POST',
      headers: { 'Content-Type': blob.type || 'audio/webm' },
      body: blob
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Transcribe failed:', response.status, errorText);
      throw new Error(`文字起こしに失敗しました (${response.status})`);
    }

    const data = await response.json();
    const text = (data.text || '').trim();
    console.log('Transcribed:', text);

    if (HALLUCINATION_PATTERNS.some(p => p.test(text))) {
      console.warn(`幻聴とみなして破棄: "${text}"`);
      return '';
    }

    return text;
  }

  /**
   * 録音を破棄（文字起こしせずに中断）
   */
  cancel() {
    if (this.mediaRecorder && this.mediaRecorder.state !== 'inactive') {
      this.mediaRecorder.stop();
    }
    this._releaseStream();
    this.mediaRecorder = null;
    this.chunks = [];
  }

  /**
   * stop() の完了を待って Blob にまとめる
   */
  _stopAndCollect() {
    return new Promise((resolve) => {
      const recorder = this.mediaRecorder;
      if (!recorder || recorder.state === 'inactive') {
        resolve(null);
        return;
      }

      recorder.onstop = () => {
        const blob = new Blob(this.chunks, { type: recorder.mimeType });
        this._releaseStream();
        this.mediaRecorder = null;
        this.chunks = [];
        resolve(blob);
      };

      recorder.stop();
    });
  }

  _releaseStream() {
    if (this.stream) {
      this.stream.getTracks().forEach(t => t.stop());
      this.stream = null;
    }
  }
}
