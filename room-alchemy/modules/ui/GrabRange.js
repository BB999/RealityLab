import * as THREE from 'three';
import { Spring, TINT } from './liquidGlass.js';

/**
 * The volume in which a generated object can be grabbed, shown as a thin glass
 * shell once a hand comes near it.
 *
 * Reach is the one thing about a grab the user cannot see. Without this the
 * hand either closes on nothing or snaps something up unexpectedly, and either
 * way the rule stays invisible. Drawing it turns the guess into a target.
 *
 * Built on the same read as the panels: the faces are nearly transparent and
 * all the material gathers at the edges, so the box reads as a volume without
 * hiding the object inside it. The edge is found from the local position
 * rather than from UVs — the median of the three face distances is small only
 * along an edge and smallest at a corner, which handles any box proportion
 * without an aspect-corrected rounding.
 */

const VERT = /* glsl */ `
  uniform vec3 uHalf;

  varying vec3 vLocal;
  varying float vFacing;

  void main() {
    // BoxGeometry spans -0.5 .. 0.5; scale it out to real metres so the edge
    // width below can be specified in metres too.
    vLocal = position * uHalf * 2.0;

    vec4 viewPos = modelViewMatrix * vec4(position, 1.0);
    vec3 n = normalize(normalMatrix * normal);
    vec3 v = normalize(-viewPos.xyz);
    // Grazing faces catch more light, the same way the panel glass firms up
    // when you look across it.
    vFacing = 1.0 - abs(dot(n, v));

    gl_Position = projectionMatrix * viewPos;
  }
`;

const FRAG = /* glsl */ `
  precision highp float;

  uniform vec3  uHalf;
  uniform vec3  uCore;
  uniform vec3  uRim;
  uniform float uEdge;
  uniform float uOpacity;

  varying vec3  vLocal;
  varying float vFacing;

  void main() {
    // Distance from this fragment to each of the three face pairs.
    vec3 e = uHalf - abs(vLocal);

    float lo = min(e.x, min(e.y, e.z));
    float hi = max(e.x, max(e.y, e.z));
    float mid = e.x + e.y + e.z - lo - hi;   // the median

    // Along an edge two of the three go to zero, so the median does too.
    float edge = 1.0 - smoothstep(0.0, uEdge, mid);
    // At a corner all three do, and the largest collapsing is what marks it.
    float corner = 1.0 - smoothstep(0.0, uEdge * 3.0, hi);

    float fresnel = pow(clamp(vFacing, 0.0, 1.0), 2.0);

    // The face stays barely there — enough to read as a surface, never enough
    // to fog up whatever is being reached for.
    float face = 0.05 + 0.16 * fresnel;

    vec3 colour = uCore * face + uRim * (edge * 0.85 + corner * 0.75);
    float alpha = (face + edge * 0.8 + corner * 0.7) * uOpacity;
    if (alpha < 0.003) discard;

    gl_FragColor = vec4(colour, alpha);
  }
`;

const EDGE_WIDTH = 0.018;   // metres of glow inward from each edge

class RangeShell {
  constructor(scene) {
    this.material = new THREE.ShaderMaterial({
      vertexShader: VERT,
      fragmentShader: FRAG,
      uniforms: {
        uHalf: { value: new THREE.Vector3(0.1, 0.1, 0.1) },
        uCore: { value: new THREE.Color(TINT.white) },
        uRim: { value: new THREE.Color(TINT.blue).lerp(new THREE.Color(TINT.white), 0.5) },
        uEdge: { value: EDGE_WIDTH },
        uOpacity: { value: 0 }
      },
      transparent: true,
      depthWrite: false,
      // Passthrough gives the renderer nothing to refract, so the shell can
      // only brighten what the room already puts behind it.
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide
    });

    this.mesh = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), this.material);
    this.mesh.renderOrder = 1;
    this.mesh.visible = false;
    scene.add(this.mesh);

    // Slower and softer than the button springs — this is ambient feedback
    // appearing beside the user's hand, and it should never snap into view.
    this.fade = new Spring(0, 120, 22);
    this.scene = scene;
  }

  setBounds(center, half) {
    this.mesh.position.copy(center);
    this.mesh.scale.set(half.x * 2, half.y * 2, half.z * 2);
    this.material.uniforms.uHalf.value.copy(half);
  }

  update(deltaTime) {
    this.fade.update(deltaTime);
    this.material.uniforms.uOpacity.value = Math.max(this.fade.value, 0);
    this.mesh.visible = this.fade.value > 0.004;
  }

  dispose() {
    this.scene.remove(this.mesh);
    this.mesh.geometry.dispose();
    this.material.dispose();
  }
}

export class GrabRange {
  constructor(scene) {
    this.scene = scene;
    this.shells = new Map();   // key -> RangeShell
    this.claimed = new Set();
  }

  /**
   * Show the range for one hand this frame. A key that goes unclaimed fades
   * out on its own, so callers only have to say what *is* in reach.
   * @param {string} key - which hand is asking ('left' / 'right')
   * @param {THREE.Vector3} center
   * @param {THREE.Vector3} half
   * @param {number} strength - 0..1; use less while merely near, full once grabbable
   */
  show(key, center, half, strength) {
    let shell = this.shells.get(key);
    if (!shell) {
      shell = new RangeShell(this.scene);
      this.shells.set(key, shell);
    }

    shell.setBounds(center, half);
    shell.fade.to(strength);
    this.claimed.add(key);
  }

  update(deltaTime) {
    for (const [key, shell] of this.shells) {
      if (!this.claimed.has(key)) shell.fade.to(0);
      shell.update(deltaTime);
    }
    this.claimed.clear();
  }

  dispose() {
    for (const shell of this.shells.values()) shell.dispose();
    this.shells.clear();
  }
}
