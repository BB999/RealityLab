import * as THREE from 'three';
import interLatinUrl from '@fontsource-variable/inter/files/inter-latin-wght-normal.woff2?url';

/**
 * Liquid Glass design system for WebXR.
 *
 * Apple's Liquid Glass is not "a translucent rectangle". Its identity comes from
 * how the *edge* of the material behaves: the rim acts as a lens, so it is denser,
 * brighter, and carries a specular highlight that slides around the perimeter as
 * the viewer moves. Everything here is built around reproducing that.
 *
 * Constraint worth stating: WebXR passthrough never hands the camera feed to the
 * renderer, so genuine refraction of the real room is impossible. Instead the
 * glass is smoked (dark neutral tint, like visionOS windows), which both reads as
 * glass over an arbitrary background and keeps text legible in a bright room.
 *
 * Every surface is three coplanar layers:
 *   shadow (soft, offset down) -> glass (shader) -> content (canvas text/icons)
 */

// SF Pro is what Apple actually uses, but it is licensed and cannot ship in a
// public repo. Inter is the closest open face — same tall x-height, open
// apertures and squared-off bowls — and unlike naming SF in a fallback chain it
// actually resolves on Quest, where none of Apple's fonts exist.
//
// Only the Latin subset is bundled. Japanese falls through to the platform CJK
// face (Noto Sans JP on Quest, Hiragino on macOS), which is the right call: the
// prompt field takes arbitrary text, so a CJK font could not be subset, and
// shipping a full one would cost several megabytes.
export const GLASS_FONT = '"Inter Variable", system-ui, -apple-system, sans-serif';

// Every live surface, so they can be redrawn once the face is available.
// Canvas text does not reflow on its own — a label drawn before the font
// arrives would stay in the fallback forever.
const liveSurfaces = new Set();

const glassFontReady = (() => {
  if (typeof document === 'undefined' || typeof FontFace === 'undefined') {
    return Promise.resolve();
  }
  const face = new FontFace(
    'Inter Variable',
    `url(${interLatinUrl}) format('woff2-variations')`,
    { weight: '100 900', style: 'normal', display: 'swap' }
  );
  return face
    .load()
    .then((loaded) => { document.fonts.add(loaded); })
    .catch((error) => {
      console.warn('Inter を読み込めませんでした。system-ui で描画します:', error.message);
    });
})();

glassFontReady.then(() => {
  for (const surface of liveSurfaces) surface.redraw();
});

// Apple system colors (dark appearance)
export const TINT = {
  graphite: 0x1c1c1e,
  slate: 0x3a3a3c,
  blue: 0x0a84ff,
  green: 0x30d158,
  orange: 0xff9f0a,
  red: 0xff453a,
  yellow: 0xffd60a,
  gray: 0x8e8e93,
  white: 0xffffff
};

const hexToVec3 = (hex) =>
  new THREE.Vector3(((hex >> 16) & 255) / 255, ((hex >> 8) & 255) / 255, (hex & 255) / 255);

const setVec3 = (vec, hex) =>
  vec.set(((hex >> 16) & 255) / 255, ((hex >> 8) & 255) / 255, (hex & 255) / 255);

/**
 * Critically-damped-ish spring. Liquid Glass reacts with momentum, not with a
 * linear fade — a lerp reads as "UI", a spring reads as "material".
 */
export class Spring {
  constructor(value = 0, stiffness = 220, damping = 24) {
    this.value = value;
    this.target = value;
    this.velocity = 0;
    this.stiffness = stiffness;
    this.damping = damping;
  }

  snap(v) {
    this.value = v;
    this.target = v;
    this.velocity = 0;
  }

  to(v) {
    this.target = v;
  }

  update(deltaTime) {
    // Clamp the step so a dropped frame can't make the integrator explode
    const h = Math.min(deltaTime, 1 / 30);
    const accel = (this.target - this.value) * this.stiffness - this.velocity * this.damping;
    this.velocity += accel * h;
    this.value += this.velocity * h;
    return this.value;
  }
}

// ---------------------------------------------------------------------------
// Shaders
// ---------------------------------------------------------------------------

// Shared signed-distance helpers. `b` is the half-size, `r` the corner radius.
const SDF_CHUNK = /* glsl */ `
  float sdRoundRect(vec2 p, vec2 b, float r) {
    vec2 q = abs(p) - b + r;
    return min(max(q.x, q.y), 0.0) + length(max(q, vec2(0.0))) - r;
  }

  vec2 gradRoundRect(vec2 p, vec2 b, float r) {
    vec2 q = abs(p) - b + r;
    vec2 g = (max(q.x, q.y) > 0.0)
      ? normalize(max(q, vec2(0.0)))
      : (q.x > q.y ? vec2(1.0, 0.0) : vec2(0.0, 1.0));
    vec2 s = vec2(p.x < 0.0 ? -1.0 : 1.0, p.y < 0.0 ? -1.0 : 1.0);
    return g * s;
  }
`;

const GLASS_VERT = /* glsl */ `
  uniform vec3 uCamLocal;

  varying vec2 vPos;
  varying vec3 vView;

  void main() {
    vPos = position.xy;
    vView = uCamLocal - position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const GLASS_FRAG = /* glsl */ `
  precision highp float;

  uniform vec2  uHalf;
  uniform float uRadius;
  uniform vec3  uTint;
  uniform vec3  uAccent;
  uniform float uOpacity;
  uniform float uHover;
  uniform float uPress;
  uniform float uFocus;
  uniform float uSheen;
  uniform float uTime;

  varying vec2 vPos;
  varying vec3 vView;

  ${SDF_CHUNK}

  void main() {
    float d  = sdRoundRect(vPos, uHalf, uRadius);
    float aa = max(fwidth(d), 1e-5);
    float inside = 1.0 - smoothstep(-aa, aa, d);
    if (inside < 0.002) discard;

    float m = max(min(uHalf.x, uHalf.y), 1e-5);

    // Two different edge falloffs do two different jobs. Collapsing them into
    // one is what turns glass into shiny plastic.
    //   lens - wide, drives density: the rim gathers more material
    //   e    - narrow, drives the specular: the highlight must stay a hairline
    float lens = pow(clamp(1.0 + d / (m * 0.50), 0.0, 1.0), 2.0);
    float e    = clamp(1.0 + d / (m * 0.10), 0.0, 1.0);

    // The SDF gradient points outward from the shape, so it tells us which way
    // this bit of rim faces. Driving the highlight off that — not a Blinn-Phong
    // lobe — is what keeps it a hairline arc instead of a fat dome.
    vec2 g = gradRoundRect(vPos, uHalf, uRadius);
    vec3 V = normalize(vView);

    // Folding the view direction into the light direction is the whole trick:
    // move your head and the arc slides around the perimeter, exactly the way
    // a real bevel catches the room.
    vec2 key  = normalize(vec2(-0.35,  1.0) + V.xy * 1.2);
    vec2 fill = normalize(vec2( 0.30, -1.0) + V.xy * 1.2);

    float band = pow(e, 2.5);
    float k = max(dot(g, key),  0.0);
    float f = max(dot(g, fill), 0.0);

    // A glass edge disperses what passes through it. The passthrough feed is
    // out of reach, but the colour fringe that dispersion produces is not:
    // per-channel falloffs fringe the upper arc cool and the lower one warm.
    vec3 arc = vec3(pow(k, 2.2), pow(k, 2.5), pow(k, 3.0))
             + vec3(pow(f, 3.9), pow(f, 3.5), pow(f, 3.1)) * 0.7;

    vec3 spec = arc * band * (1.05 + 0.85 * uHover) * (1.0 - 0.55 * uPress);
    float specL = dot(spec, vec3(0.3333));

    // Constant hairline so the silhouette reads even with no arc aimed at us
    float rim = pow(e, 6.0) * (0.22 + 0.40 * uHover);

    // --- body ---------------------------------------------------------------
    // Grazing angles make the sheet more reflective, so the panel firms up as
    // you look across it and thins out when you face it square on.
    float cosView = clamp(abs(V.z), 0.0, 1.0);
    float faceFres = pow(1.0 - cosView, 4.0);

    float vgrad = clamp(vPos.y / uHalf.y * 0.5 + 0.5, 0.0, 1.0);
    vec3 body = uTint * mix(0.86, 1.14, vgrad);   // gentle top-lit gradient
    // Faint sheen across the top, the way a sheet of glass catches sky
    float sheet = pow(smoothstep(0.55, 1.0, vgrad), 2.4) * 0.05;
    body += vec3(0.10) * lens + vec3(0.06) * faceFres + vec3(sheet);
    body = mix(body, body * 0.62, uPress);

    float bodyA = uOpacity * (0.90 + 0.55 * lens) + 0.10 * faceFres;
    bodyA = mix(bodyA, min(bodyA * 1.14, 1.0), uHover);

    // Travelling sheen, used for busy/recording states
    float sw = sin((vPos.x / uHalf.x * 1.6 + vPos.y / uHalf.y * 0.5) * 2.2 - uTime * 2.6);
    float sheen = pow(max(sw, 0.0), 10.0) * uSheen;

    // Accent ring hugging the rim (focused field, pinned toggle)
    float ring = pow(e, 3.0) * uFocus;

    vec3 col = body
             + spec
             + vec3(rim)
             + vec3(sheen) * 0.5
             + uAccent * ring * 1.5;

    float a = clamp(bodyA + specL * 0.85 + rim * 0.6 + sheen * 0.35 + ring * 0.7, 0.0, 1.0) * inside;

    gl_FragColor = vec4(col, a);
  }
`;

const SHADOW_VERT = /* glsl */ `
  varying vec2 vPos;
  void main() {
    vPos = position.xy;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const SHADOW_FRAG = /* glsl */ `
  precision highp float;

  uniform vec2  uHalf;
  uniform float uRadius;
  uniform float uFeather;
  uniform float uStrength;
  uniform vec2  uOffset;
  uniform vec3  uAccent;
  uniform float uGlow;

  varying vec2 vPos;

  ${SDF_CHUNK}

  void main() {
    // Contact shadow: tight and offset down, so the control reads as sitting
    // just above the surface behind it rather than floating in a dark cloud.
    float ds = sdRoundRect(vPos - uOffset, uHalf, uRadius);
    float shadow = 1.0 - smoothstep(0.0, uFeather, max(ds, 0.0));
    shadow = pow(shadow, 2.4) * uStrength;

    // Accent bloom that only appears while the control is targeted
    float dg = sdRoundRect(vPos, uHalf, uRadius);
    float glow = exp(-max(dg, 0.0) / (uFeather * 0.55)) * uGlow;

    float a = clamp(shadow + glow, 0.0, 1.0);
    if (a < 0.004) discard;

    vec3 col = uAccent * (glow / max(a, 1e-4));
    gl_FragColor = vec4(col, a);
  }
`;

// Render order keeps the three layers stacked correctly without depth writes,
// and keeps the whole UI above generated content that sits at the default 0.
const ORDER = { shadow: 8, glass: 9, content: 10 };

// ---------------------------------------------------------------------------
// GlassSurface
// ---------------------------------------------------------------------------

/**
 * One Liquid Glass element: shadow + glass + canvas content, plus the springs
 * that drive its hover/press motion.
 */
export class GlassSurface {
  /**
   * @param {object} options
   *   width, height   - metres
   *   radius          - corner radius in metres (defaults to a capsule)
   *   tint, accent    - 0xRRGGBB
   *   opacity         - base glass density
   *   canvasWidth/Height - content texture resolution
   *   shadow          - contact shadow strength (0 = none; the hover bloom stays)
   *   hoverScale/pressScale - spring targets
   */
  constructor(options = {}) {
    const {
      width,
      height,
      radius = height / 2,
      tint = TINT.graphite,
      accent = TINT.white,
      opacity = 0.55,
      canvasWidth = 256,
      canvasHeight = 128,
      shadow = 0,
      hoverScale = 1.06,
      pressScale = 0.93,
      stiffness = 260,
      damping = 22
    } = options;

    this.width = width;
    this.height = height;
    this.radius = Math.min(radius, Math.min(width, height) / 2);
    this.hoverScale = hoverScale;
    this.pressScale = pressScale;

    this.group = new THREE.Group();

    this.scaleSpring = new Spring(1, stiffness, damping);
    this.hoverSpring = new Spring(0, 190, 26);
    this.pressSpring = new Spring(0, 420, 30);
    this.focusSpring = new Spring(0, 160, 24);
    this.sheenSpring = new Spring(0, 120, 22);

    this._isHovered = false;
    this._isPressed = false;
    this._time = 0;

    // --- halo ---------------------------------------------------------------
    // A padded quad sitting behind the glass. It carries two things that have
    // nowhere else to live, because the glass slab cannot draw outside its own
    // silhouette: the optional contact shadow, and the accent bloom on hover.
    // The quad is built even at shadow = 0, since the bloom still needs it.
    {
      const feather = Math.min(width, height) * 0.42;
      const pad = feather + height * 0.4;
      this.shadowMaterial = new THREE.ShaderMaterial({
        uniforms: {
          uHalf: { value: new THREE.Vector2(width / 2, height / 2) },
          uRadius: { value: this.radius },
          uFeather: { value: feather },
          uStrength: { value: shadow },
          uOffset: { value: new THREE.Vector2(0, -height * 0.3) },
          uAccent: { value: hexToVec3(accent) },
          uGlow: { value: 0 }
        },
        vertexShader: SHADOW_VERT,
        fragmentShader: SHADOW_FRAG,
        transparent: true,
        depthWrite: false,
        side: THREE.DoubleSide
      });
      this.shadowMesh = new THREE.Mesh(
        new THREE.PlaneGeometry(width + pad * 2, height + pad * 2),
        this.shadowMaterial
      );
      this.shadowMesh.position.z = -0.0009;
      this.shadowMesh.renderOrder = ORDER.shadow;
      // Never let the padded quad steal a pointer hit from the button itself
      this.shadowMesh.raycast = () => {};
      this.group.add(this.shadowMesh);
    }

    // --- glass --------------------------------------------------------------
    this.glassMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uHalf: { value: new THREE.Vector2(width / 2, height / 2) },
        uRadius: { value: this.radius },
        uTint: { value: hexToVec3(tint) },
        uAccent: { value: hexToVec3(accent) },
        uOpacity: { value: opacity },
        uHover: { value: 0 },
        uPress: { value: 0 },
        uFocus: { value: 0 },
        uSheen: { value: 0 },
        uTime: { value: 0 },
        uCamLocal: { value: new THREE.Vector3(0, 0, 1) }
      },
      vertexShader: GLASS_VERT,
      fragmentShader: GLASS_FRAG,
      transparent: true,
      depthWrite: false,
      side: THREE.DoubleSide
    });

    this.glassMesh = new THREE.Mesh(new THREE.PlaneGeometry(width, height), this.glassMaterial);
    this.glassMesh.renderOrder = ORDER.glass;

    // The rim highlight has to track the head, so the shader needs the eye
    // position expressed in the panel's own space every frame.
    const invMatrix = new THREE.Matrix4();
    const camLocal = this.glassMaterial.uniforms.uCamLocal.value;
    this.glassMesh.onBeforeRender = (renderer, scene, cam) => {
      invMatrix.copy(this.glassMesh.matrixWorld).invert();
      camLocal.setFromMatrixPosition(cam.matrixWorld).applyMatrix4(invMatrix);
    };
    this.group.add(this.glassMesh);

    // --- content ------------------------------------------------------------
    this.canvas = document.createElement('canvas');
    this.canvas.width = canvasWidth;
    this.canvas.height = canvasHeight;
    this.ctx = this.canvas.getContext('2d');

    this.texture = new THREE.CanvasTexture(this.canvas);
    this.texture.minFilter = THREE.LinearFilter;
    this.texture.magFilter = THREE.LinearFilter;
    this.texture.anisotropy = 4;

    this.contentMaterial = new THREE.MeshBasicMaterial({
      map: this.texture,
      transparent: true,
      depthWrite: false,
      side: THREE.DoubleSide
    });
    this.contentMesh = new THREE.Mesh(new THREE.PlaneGeometry(width, height), this.contentMaterial);
    this.contentMesh.position.z = 0.0009;
    this.contentMesh.renderOrder = ORDER.content;
    this.contentMesh.raycast = () => {};
    this.group.add(this.contentMesh);

    // Owner sets this to its own updateCanvas, so the label can be re-rendered
    // when the web font finishes loading
    this.onRedraw = null;
    liveSurfaces.add(this);
  }

  redraw() {
    if (this.onRedraw) this.onRedraw();
  }

  /** Raycast target — the glass slab itself. */
  get hitMesh() {
    return this.glassMesh;
  }

  get object3D() {
    return this.group;
  }

  setTint(hex) {
    setVec3(this.glassMaterial.uniforms.uTint.value, hex);
  }

  setAccent(hex) {
    setVec3(this.glassMaterial.uniforms.uAccent.value, hex);
    if (this.shadowMaterial) setVec3(this.shadowMaterial.uniforms.uAccent.value, hex);
  }

  setOpacity(value) {
    this.glassMaterial.uniforms.uOpacity.value = value;
  }

  setHovered(hovered) {
    if (this._isHovered === hovered) return;
    this._isHovered = hovered;
    this.hoverSpring.to(hovered ? 1 : 0);
    this._applyScaleTarget();
  }

  setPressed(pressed) {
    if (this._isPressed === pressed) return;
    this._isPressed = pressed;
    this.pressSpring.to(pressed ? 1 : 0);
    this._applyScaleTarget();
  }

  /** Accent rim: focused text field, pinned toggle, etc. */
  setFocus(value) {
    this.focusSpring.to(value);
  }

  /** Travelling sheen for busy/recording states. */
  setSheen(value) {
    this.sheenSpring.to(value);
  }

  _applyScaleTarget() {
    if (this._isPressed) this.scaleSpring.to(this.pressScale);
    else if (this._isHovered) this.scaleSpring.to(this.hoverScale);
    else this.scaleSpring.to(1);
  }

  markContentDirty() {
    this.texture.needsUpdate = true;
  }

  /** Clears the content canvas and returns its context, ready to draw. */
  beginContent() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.textAlign = 'left';
    this.ctx.textBaseline = 'alphabetic';
    return this.ctx;
  }

  update(deltaTime) {
    this._time += deltaTime;
    const u = this.glassMaterial.uniforms;
    u.uTime.value = this._time;
    u.uHover.value = this.hoverSpring.update(deltaTime);
    u.uPress.value = this.pressSpring.update(deltaTime);
    u.uFocus.value = this.focusSpring.update(deltaTime);
    u.uSheen.value = this.sheenSpring.update(deltaTime);
    this.group.scale.setScalar(this.scaleSpring.update(deltaTime));

    // The targeting bloom lives on the padded shadow quad, since the glass
    // slab itself has no room outside its own silhouette to draw into.
    if (this.shadowMaterial) {
      this.shadowMaterial.uniforms.uGlow.value = u.uHover.value * 0.3 + u.uFocus.value * 0.14;
    }
  }

  dispose() {
    liveSurfaces.delete(this);
    this.group.traverse((child) => {
      if (child.geometry) child.geometry.dispose();
      if (child.material) child.material.dispose();
    });
    this.texture.dispose();
    if (this.group.parent) this.group.parent.remove(this.group);
  }
}

// ---------------------------------------------------------------------------
// Canvas helpers
// ---------------------------------------------------------------------------

export function roundRectPath(ctx, x, y, w, h, r) {
  const radius = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.arcTo(x + w, y, x + w, y + h, radius);
  ctx.arcTo(x + w, y + h, x, y + h, radius);
  ctx.arcTo(x, y + h, x, y, radius);
  ctx.arcTo(x, y, x + w, y, radius);
  ctx.closePath();
}

/**
 * Label with the soft dark halo Apple uses to keep glass-borne text readable
 * against an unpredictable background. Approximates vibrancy, which we can't
 * compute without sampling behind the surface.
 */
export function drawLabel(ctx, text, x, y, options = {}) {
  const {
    size = 28,
    weight = 600,
    color = '#ffffff',
    align = 'center',
    baseline = 'middle',
    // Inter, like SF Display, wants tightening as it gets larger. Express it in
    // em so a label reads the same at any control size.
    tracking = size * -0.014,
    halo = 0.55
  } = options;

  ctx.save();
  ctx.font = `${weight} ${size}px ${GLASS_FONT}`;
  ctx.textAlign = align;
  ctx.textBaseline = baseline;
  if ('letterSpacing' in ctx) ctx.letterSpacing = `${tracking}px`;

  if (halo > 0) {
    ctx.shadowColor = `rgba(0, 0, 0, ${halo})`;
    ctx.shadowBlur = size * 0.42;
    ctx.shadowOffsetY = size * 0.045;
  }
  ctx.fillStyle = color;
  ctx.fillText(text, x, y);
  ctx.restore();
}

/** Measures with the same font and tracking drawLabel renders with. */
export function measureLabel(ctx, text, size = 28, weight = 600) {
  ctx.save();
  ctx.font = `${weight} ${size}px ${GLASS_FONT}`;
  if ('letterSpacing' in ctx) ctx.letterSpacing = `${size * -0.014}px`;
  const width = ctx.measureText(text).width;
  ctx.restore();
  return width;
}

// ---------------------------------------------------------------------------
// Icons — SF Symbols proportions, drawn as vectors so they stay crisp
// ---------------------------------------------------------------------------

function beginIcon(ctx, cx, cy, s, color, lineWidth) {
  ctx.save();
  ctx.translate(cx, cy);
  ctx.scale(s, s);
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.lineWidth = lineWidth;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
  ctx.shadowBlur = 0.35;
  ctx.shadowOffsetY = 0.04;
}

export const icons = {
  /** bolt.fill */
  bolt(ctx, cx, cy, s, color = '#ffffff') {
    beginIcon(ctx, cx, cy, s, color, 0.14);
    ctx.beginPath();
    ctx.moveTo(0.16, -1.0);
    ctx.lineTo(-0.52, 0.06);
    ctx.lineTo(-0.06, 0.06);
    ctx.lineTo(-0.16, 1.0);
    ctx.lineTo(0.52, -0.06);
    ctx.lineTo(0.06, -0.06);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  },

  /** arrow.clockwise */
  refresh(ctx, cx, cy, s, color = '#ffffff') {
    beginIcon(ctx, cx, cy, s, color, 0.2);
    ctx.beginPath();
    ctx.arc(0, 0, 0.72, -Math.PI * 0.62, Math.PI * 1.15, false);
    ctx.stroke();
    // arrowhead on the open end
    ctx.beginPath();
    ctx.moveTo(0.42, -0.82);
    ctx.lineTo(0.66, -0.34);
    ctx.lineTo(0.16, -0.30);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  },

  /** mic.fill */
  mic(ctx, cx, cy, s, color = '#ffffff') {
    beginIcon(ctx, cx, cy, s, color, 0.17);
    roundRectPath(ctx, -0.3, -0.98, 0.6, 1.14, 0.3);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(0, 0.06, 0.62, 0, Math.PI, false);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, 0.68);
    ctx.lineTo(0, 1.0);
    ctx.stroke();
    ctx.restore();
  },

  /** waveform — bars scaled by `phase` so it animates while recording */
  waveform(ctx, cx, cy, s, color = '#ffffff', phase = 0) {
    beginIcon(ctx, cx, cy, s, color, 0.2);
    const heights = [0.34, 0.66, 1.0, 0.72, 0.4];
    for (let i = 0; i < heights.length; i++) {
      const wobble = 0.55 + 0.45 * Math.abs(Math.sin(phase * 4 + i * 0.9));
      const h = heights[i] * wobble;
      const x = (i - 2) * 0.38;
      ctx.beginPath();
      ctx.moveTo(x, -h);
      ctx.lineTo(x, h);
      ctx.stroke();
    }
    ctx.restore();
  },

  /** xmark */
  xmark(ctx, cx, cy, s, color = '#ffffff') {
    beginIcon(ctx, cx, cy, s, color, 0.22);
    ctx.beginPath();
    ctx.moveTo(-0.62, -0.62);
    ctx.lineTo(0.62, 0.62);
    ctx.moveTo(0.62, -0.62);
    ctx.lineTo(-0.62, 0.62);
    ctx.stroke();
    ctx.restore();
  },

  /** trash */
  trash(ctx, cx, cy, s, color = '#ffffff') {
    beginIcon(ctx, cx, cy, s, color, 0.16);
    // lid
    ctx.beginPath();
    ctx.moveTo(-0.86, -0.6);
    ctx.lineTo(0.86, -0.6);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(-0.3, -0.6);
    ctx.lineTo(-0.26, -0.9);
    ctx.lineTo(0.26, -0.9);
    ctx.lineTo(0.3, -0.6);
    ctx.stroke();
    // can
    ctx.beginPath();
    ctx.moveTo(-0.68, -0.6);
    ctx.lineTo(-0.56, 0.86);
    ctx.quadraticCurveTo(-0.54, 1.0, -0.4, 1.0);
    ctx.lineTo(0.4, 1.0);
    ctx.quadraticCurveTo(0.54, 1.0, 0.56, 0.86);
    ctx.lineTo(0.68, -0.6);
    ctx.stroke();
    // slats
    ctx.lineWidth = 0.13;
    for (const x of [-0.24, 0.24]) {
      ctx.beginPath();
      ctx.moveTo(x, -0.28);
      ctx.lineTo(x, 0.66);
      ctx.stroke();
    }
    ctx.restore();
  },

  /** pin / pin.fill — upright when pinned, tilted when not */
  pin(ctx, cx, cy, s, color = '#ffffff', pinned = false) {
    beginIcon(ctx, cx, cy, s, color, 0.18);
    if (!pinned) ctx.rotate(Math.PI * 0.22);
    ctx.beginPath();
    ctx.moveTo(-0.44, -0.86);
    ctx.lineTo(0.44, -0.86);
    ctx.lineTo(0.3, -0.5);
    ctx.lineTo(0.3, -0.12);
    ctx.lineTo(0.62, 0.2);
    ctx.lineTo(-0.62, 0.2);
    ctx.lineTo(-0.3, -0.12);
    ctx.lineTo(-0.3, -0.5);
    ctx.closePath();
    if (pinned) ctx.fill();
    else ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, 0.24);
    ctx.lineTo(0, 0.92);
    ctx.stroke();
    ctx.restore();
  },

  /** sparkles — placeholder affordance on the empty text field */
  sparkle(ctx, cx, cy, s, color = '#ffffff') {
    beginIcon(ctx, cx, cy, s, color, 0.12);
    const star = (x, y, r) => {
      ctx.beginPath();
      ctx.moveTo(x, y - r);
      ctx.quadraticCurveTo(x + r * 0.16, y - r * 0.16, x + r, y);
      ctx.quadraticCurveTo(x + r * 0.16, y + r * 0.16, x, y + r);
      ctx.quadraticCurveTo(x - r * 0.16, y + r * 0.16, x - r, y);
      ctx.quadraticCurveTo(x - r * 0.16, y - r * 0.16, x, y - r);
      ctx.closePath();
      ctx.fill();
    };
    star(-0.1, -0.05, 0.78);
    star(0.62, 0.62, 0.34);
    star(0.58, -0.66, 0.26);
    ctx.restore();
  },

  /** Ring spinner. `t` in seconds. */
  spinner(ctx, cx, cy, s, color = '#ffffff', t = 0) {
    ctx.save();
    ctx.translate(cx, cy);
    ctx.scale(s, s);
    ctx.rotate(t * 5.2);
    ctx.lineCap = 'round';
    ctx.lineWidth = 0.24;
    // faint full ring so the gap reads as motion rather than a broken arc
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.22)';
    ctx.beginPath();
    ctx.arc(0, 0, 0.78, 0, Math.PI * 2);
    ctx.stroke();
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.arc(0, 0, 0.78, -Math.PI * 0.5, Math.PI * 0.62);
    ctx.stroke();
    ctx.restore();
  }
};
