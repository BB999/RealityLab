import * as THREE from 'three';
import { Spring, TINT } from './liquidGlass.js';

/**
 * Connection between the selected module and the text panel.
 *
 * Not a single stroke: a train of short glass capsules that streams from the
 * panel toward the module, so the link reads as a direction ("this text drives
 * that object"), not just an association.
 *
 * The same rules the panels follow apply here — the capsule is a lens, so its
 * rim is denser and carries a hairline specular, and the whole train enters and
 * leaves on a spring rather than a cut.
 *
 * Every dash is one instance of a single quad. Placement happens entirely in
 * the vertex shader (billboarded around the segment axis), so a longer link
 * costs no extra CPU work — only a larger instance count.
 */

const MAX_DASHES = 64;

// Metres. Tuned for a link that is typically 0.4 - 2.5 m long in the room.
const DASH_LENGTH = 0.036;
const DASH_WIDTH = 0.011;
const DASH_PITCH = 0.072;   // centre-to-centre spacing; fixed, so the rhythm
                            // stays constant however far apart the ends are
const FLOW_SPEED = 0.42;    // metres per second, panel -> module

const VERT = /* glsl */ `
  attribute float aIndex;

  uniform vec3  uFrom;        // text panel — where the flow starts
  uniform vec3  uTo;          // module — where it lands
  uniform float uTime;
  uniform float uDashLength;
  uniform float uDashWidth;
  uniform float uPitch;
  uniform float uSpeed;

  varying vec2  vUv;
  varying float vT;

  void main() {
    vec3 delta = uTo - uFrom;
    float len = max(length(delta), 1e-4);
    vec3 dir = delta / len;

    // Wrapping the travelled distance (not the normalised parameter) is what
    // keeps the spacing metric: dashes never bunch up as the link stretches.
    float s = mod(aIndex * uPitch + uTime * uSpeed, len);
    float t = s / len;
    vec3 centre = uFrom + dir * s;

    // Billboard around the segment axis so the capsule always shows its face,
    // whichever way the user walks around the link.
    vec3 toCam = cameraPosition - centre;
    vec3 side = cross(dir, toCam);
    float sideLen = length(side);
    side = sideLen > 1e-4 ? side / sideLen : vec3(0.0, 1.0, 0.0);

    // A dash swells as it leaves the panel and contracts into the module, so
    // the train has a source and a sink instead of just scrolling.
    float grow = smoothstep(0.0, 0.12, t) * (1.0 - smoothstep(0.80, 1.0, t));
    float scale = mix(0.5, 1.0, grow);

    vec3 world = centre
      + dir  * (position.x * uDashLength * scale)
      + side * (position.y * uDashWidth  * scale);

    vUv = uv;
    vT = t;
    gl_Position = projectionMatrix * viewMatrix * vec4(world, 1.0);
  }
`;

const FRAG = /* glsl */ `
  precision highp float;

  uniform vec3  uCore;
  uniform vec3  uRim;
  uniform float uAspect;      // dash length / dash width
  uniform float uOpacity;

  varying vec2  vUv;
  varying float vT;

  void main() {
    // Capsule SDF in units of the half-width, so the rounding is always a true
    // semicircle whatever the aspect ratio.
    vec2 p = (vUv - 0.5) * 2.0;
    p.x *= uAspect;
    float d = length(vec2(max(abs(p.x) - (uAspect - 1.0), 0.0), p.y)) - 1.0;

    float aa = max(fwidth(d), 1e-4);
    float inside = 1.0 - smoothstep(-aa, aa * 1.5, d);
    if (inside < 0.004) discard;

    // Same two-falloff split the panels use: a wide one for how much material
    // the rim gathers, a narrow one for the hairline highlight itself.
    float lens = pow(clamp(1.0 + d / 0.85, 0.0, 1.0), 2.0);
    float edge = pow(clamp(1.0 + d / 0.22, 0.0, 1.0), 5.0);

    // Leading half runs brighter — that asymmetry is what makes a symmetric
    // capsule read as travelling rather than pulsing.
    float head = mix(0.55, 1.0, smoothstep(0.0, 1.0, vUv.x));

    vec3 colour = uCore * (0.30 + 0.55 * lens) + uRim * (edge * 1.35 + lens * 0.30);

    // Fade in off the panel, dissolve into the module.
    float travel = smoothstep(0.0, 0.10, vT) * (1.0 - smoothstep(0.82, 1.0, vT));

    float alpha = inside * head * travel * uOpacity * (0.34 + 0.66 * lens);
    if (alpha < 0.004) discard;

    gl_FragColor = vec4(colour, alpha);
  }
`;

export class ConnectionLine {
  constructor(scene) {
    this.scene = scene;
    this.mesh = null;
    this.geometry = null;
    this.material = null;
    this.time = 0;
    // Springs the train in and out, so selecting an object doesn't snap a line
    // into existence.
    this.fade = new Spring(0, 190, 26);
  }

  create() {
    // One unit quad, spanning -0.5 .. 0.5 on both axes. The vertex shader
    // scales and orients it per instance.
    const geometry = new THREE.InstancedBufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array([
      -0.5, -0.5, 0,
       0.5, -0.5, 0,
       0.5,  0.5, 0,
      -0.5,  0.5, 0
    ]), 3));
    geometry.setAttribute('uv', new THREE.BufferAttribute(new Float32Array([
      0, 0,
      1, 0,
      1, 1,
      0, 1
    ]), 2));
    geometry.setIndex([0, 1, 2, 0, 2, 3]);

    const indices = new Float32Array(MAX_DASHES);
    for (let i = 0; i < MAX_DASHES; i++) indices[i] = i;
    geometry.setAttribute('aIndex', new THREE.InstancedBufferAttribute(indices, 1));
    geometry.instanceCount = 0;

    this.material = new THREE.ShaderMaterial({
      vertexShader: VERT,
      fragmentShader: FRAG,
      uniforms: {
        uFrom: { value: new THREE.Vector3() },
        uTo: { value: new THREE.Vector3() },
        uTime: { value: 0 },
        uDashLength: { value: DASH_LENGTH },
        uDashWidth: { value: DASH_WIDTH },
        uPitch: { value: DASH_PITCH },
        uSpeed: { value: FLOW_SPEED },
        uAspect: { value: DASH_LENGTH / DASH_WIDTH },
        uCore: { value: new THREE.Color(TINT.white) },
        uRim: { value: new THREE.Color(TINT.blue).lerp(new THREE.Color(TINT.white), 0.45) },
        uOpacity: { value: 0 }
      },
      transparent: true,
      depthWrite: false,
      // Passthrough hands the renderer no camera feed, so the glass can only be
      // additive: it brightens whatever the room puts behind it.
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide
    });

    this.geometry = geometry;
    this.mesh = new THREE.Mesh(geometry, this.material);
    // Positions are computed in world space, so the usual model-matrix bounds
    // would cull the mesh the moment the link leaves the origin.
    this.mesh.frustumCulled = false;
    this.mesh.renderOrder = 2;
    this.mesh.visible = false;
    this.scene.add(this.mesh);

    return this.mesh;
  }

  /**
   * Place the two ends of the link.
   * @param {THREE.Vector3} modulePoint - the generated object (flow lands here)
   * @param {THREE.Vector3} panelPoint - the text panel (flow starts here)
   */
  setEndpoints(modulePoint, panelPoint) {
    if (!this.mesh || !modulePoint || !panelPoint) return;

    this.material.uniforms.uFrom.value.copy(panelPoint);
    this.material.uniforms.uTo.value.copy(modulePoint);

    // Fill the span at the fixed pitch, so short links get few dashes and long
    // ones get more — never a stretched-out version of the same count.
    const length = panelPoint.distanceTo(modulePoint);
    const count = Math.min(MAX_DASHES, Math.max(1, Math.floor(length / DASH_PITCH) + 1));
    this.geometry.instanceCount = count;
  }

  update(deltaTime) {
    if (!this.mesh) return;

    this.fade.update(deltaTime);
    this.material.uniforms.uOpacity.value = this.fade.value;

    // Only advance the flow while it is on screen, so a hidden link doesn't
    // reappear mid-stride.
    const shown = this.fade.value > 0.004;
    if (shown) {
      this.time += deltaTime;
      this.material.uniforms.uTime.value = this.time;
    }
    this.mesh.visible = shown;
  }

  show() {
    this.fade.to(1);
  }

  hide() {
    this.fade.to(0);
  }

  isVisible() {
    return this.fade.target > 0;
  }

  dispose() {
    if (this.mesh) {
      this.scene.remove(this.mesh);
    }
    if (this.geometry) {
      this.geometry.dispose();
    }
    if (this.material) {
      this.material.dispose();
    }
  }
}
