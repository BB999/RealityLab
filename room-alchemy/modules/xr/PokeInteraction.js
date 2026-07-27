import * as THREE from 'three';
import { getFingerCurl } from './HandGrab.js';

/**
 * Direct touch ("poke") for hand tracking.
 *
 * Meta's guidance is explicit on two points, and both shape this file:
 * reserve direct touch for the *index fingertip only* — the other fingers
 * suffer from self-occlusion and track worse — and keep pinch for ray
 * selection rather than doubling it up on the same target. So this only ever
 * looks at the index finger, and it runs alongside the existing laser path
 * instead of replacing it.
 *
 * The panel and its buttons copy the camera's rotation, so their local +Z
 * faces the user. A fingertip therefore approaches from positive local Z and
 * crosses zero as it presses through the face.
 *
 * Source: https://developers.meta.com/horizon/design/hands-interaction-types
 */

// All in metres, in the target's local space, and all measured from the
// *surface* of the fingertip rather than its centre — see faceDepth().
const HOVER_ENTER = 0.05;    // fingertip within 50 mm of the face -> hover on
const HOVER_EXIT = 0.07;     // must pull back to 70 mm to drop it again
const HOVER_RANGE = 0.09;    // beyond this the target isn't considered at all
const PRESS_DEPTH = 0.001;   // pushed 1 mm past contact -> press
const RELEASE_DEPTH = 0.012; // must come back out 12 mm before it can fire again
const EDGE_MARGIN = 0.008;   // the fingertip has width too; the face gets a little slack
const BACK_LIMIT = 0.06;     // a finger further behind the face than this has left

// Used when the runtime doesn't report a joint radius. Roughly an adult
// fingertip.
const DEFAULT_TIP_RADIUS = 0.008;

// What the user thinks of as "the tip" is not one point. Poke a panel with a
// finger held level and the pad of the last segment lands first, while the
// nail — which is where `index-finger-tip` sits — is still short of the face.
// Testing both joints and taking whichever is deeper makes the press fire when
// the finger *looks* like it made contact, at any approach angle.
const CONTACT_JOINTS = ['index-finger-tip', 'index-finger-phalanx-distal'];

// Curl scale runs 0 (straight) .. 2 (folded). Only a fairly extended finger
// may press, so a closed hand sweeping through a panel does not fire it — and
// so that grabbing, which needs the index curled, can never double as a poke.
const MAX_CURL = 0.6;

const local = new THREE.Vector3();
const half = new THREE.Vector2();

// Reused across hands: one hand is fully resolved before the next is read.
const contacts = CONTACT_JOINTS.map(() => ({ position: new THREE.Vector3(), radius: 0 }));

/**
 * Fill `contacts` with the index finger's touch points and return how many are
 * tracked this frame. Returns 0 for controllers, and for a finger too curled
 * to count as pointing.
 */
export function getIndexContacts(inputSource, frame, referenceSpace) {
  if (!inputSource.hand) return 0;

  // A press only counts when the finger is actually extended toward the target.
  const curl = getFingerCurl(inputSource, frame, referenceSpace, 'index');
  if (curl !== null && curl > MAX_CURL) return 0;

  let count = 0;

  for (const name of CONTACT_JOINTS) {
    const joint = inputSource.hand.get(name);
    if (!joint) continue;

    const pose = frame.getJointPose(joint, referenceSpace);
    if (!pose) continue;

    const contact = contacts[count++];
    const p = pose.transform.position;
    contact.position.set(p.x, p.y, p.z);
    contact.radius = pose.radius || DEFAULT_TIP_RADIUS;
  }

  return count;
}

function halfExtents(mesh) {
  if (!mesh.geometry.boundingBox) mesh.geometry.computeBoundingBox();
  const box = mesh.geometry.boundingBox;
  return half.set((box.max.x - box.min.x) / 2, (box.max.y - box.min.y) / 2);
}

/**
 * How far the *surface* of the fingertip sits in front of a target's face.
 * Positive = still in front, negative = pushed through. null = not over it.
 *
 * Subtracting the joint radius is what makes this feel right. The pose sits at
 * the centre of the fingertip, so measuring from it means the user has already
 * buried a whole finger-width into the button before contact even registers —
 * and with no haptics there is nothing to tell them that is happening.
 */
function faceDepth(mesh, fingertip, radius) {
  local.copy(fingertip);
  // worldToLocal also undoes the hover/press scale springs, so the half-extents
  // stay the authored size however the button is currently animating.
  mesh.worldToLocal(local);

  const extents = halfExtents(mesh);
  if (Math.abs(local.x) > extents.x + EDGE_MARGIN) return null;
  if (Math.abs(local.y) > extents.y + EDGE_MARGIN) return null;

  const depth = local.z - radius;
  if (depth > HOVER_RANGE || depth < -BACK_LIMIT) return null;

  return depth;
}

export class PokeTracker {
  constructor() {
    // "<handedness>:<key>" -> true while that finger is still pushed in.
    // Keyed per hand so one hand releasing cannot re-arm the other.
    this.pressed = new Map();
    // handedness -> the key this hand's hover is latched onto, if any. Keyed
    // by hand rather than by pair, so moving to another button releases the
    // previous one without having to sweep the whole map.
    this.hovering = new Map();
  }

  /**
   * @param {Array} targets - { key, getObject(), isVisible(), onPress() }
   * @returns {Set<string>} keys currently hovered
   */
  update(xrSession, frame, referenceSpace, targets) {
    const hovered = new Set();
    if (!xrSession || !frame || !referenceSpace || !xrSession.inputSources) return hovered;

    for (const inputSource of xrSession.inputSources) {
      const contactCount = getIndexContacts(inputSource, frame, referenceSpace);
      if (contactCount === 0) continue;

      const hand = inputSource.handedness || 'none';

      // The buttons sit close together, so one fingertip can be over several
      // faces at once. Only one may react — otherwise reaching for Generate
      // also fires Delete sitting 60 mm below it.
      let claim = null;

      for (const target of targets) {
        if (!target.isVisible()) continue;

        // Needs the face itself — a Group has no geometry to measure against
        const mesh = target.getObject();
        if (!mesh || !mesh.geometry) continue;

        // Whichever part of the finger has gone furthest in decides.
        let depth = null;
        for (let i = 0; i < contactCount; i++) {
          const reach = faceDepth(mesh, contacts[i].position, contacts[i].radius);
          if (reach !== null && (depth === null || reach < depth)) depth = reach;
        }
        if (depth === null) continue;

        // A target this finger is already inside keeps it until the finger
        // comes back out. Without this, pressing deeper hands the press to a
        // neighbour whose face happens to be nearer.
        if (this.pressed.get(`${hand}:${target.key}`) === true) {
          claim = { target, depth };
          break;
        }

        if (!claim || Math.abs(depth) < Math.abs(claim.depth)) {
          claim = { target, depth };
        }
      }

      if (!claim) {
        this.hovering.set(hand, null);
        continue;
      }

      const stateKey = `${hand}:${claim.target.key}`;
      const isPressed = this.pressed.get(stateKey) === true;

      if (claim.depth <= -PRESS_DEPTH) {
        if (!isPressed) {
          this.pressed.set(stateKey, true);
          claim.target.onPress();
        }
      } else if (claim.depth > RELEASE_DEPTH) {
        this.pressed.set(stateKey, false);
      }

      // Hover latches at a threshold rather than fading in with distance. A
      // gradual fade puts the button in a visible in-between state before it
      // is actually hoverable, which reads as the colour drifting on its own.
      // The gap between the two thresholds keeps a hand held near the edge
      // from flickering.
      const wasHovering = this.hovering.get(hand) === claim.target.key;
      const isHovering = claim.depth <= (wasHovering ? HOVER_EXIT : HOVER_ENTER);
      this.hovering.set(hand, isHovering ? claim.target.key : null);

      if (isHovering) hovered.add(claim.target.key);
    }

    return hovered;
  }

  /** Drop every press latch — call when the UI it was tracking goes away. */
  reset() {
    this.pressed.clear();
    this.hovering.clear();
  }
}
