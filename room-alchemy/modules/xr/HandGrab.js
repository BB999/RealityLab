import * as THREE from 'three';

/**
 * Palm grab detection for hand tracking.
 *
 * Meta lists two supported grab gestures — pinch, and palm grab ("fingers
 * curled or touching the palm"). Pinch is already spoken for: it arrives as
 * the hand's emulated gamepad button and drives ray selection. Doubling it up
 * on grab would make every button press also try to pick up whatever the ray
 * happened to cross. So grabbing is palm-grab only.
 *
 * Curl is measured as an *angle*, not a distance. Comparing fingertip-to-palm
 * distance would need a per-user hand size to normalise against; the angle
 * between the two halves of a finger is the same whether the hand is a
 * child's or an adult's.
 *
 * Source: https://developers.meta.com/horizon/design/hands-interaction-types
 */

// Curl runs 0 (straight) .. 2 (folded back on itself). ~1.0 is a right angle.
const GRAB_CURL = 1.05;     // average curl at or above this -> grabbing
const RELEASE_CURL = 0.75;  // must open back past this to let go

// The thumb is deliberately absent: it stays out to the side during a fist and
// would only dilute the average.
const FINGERS = ['index', 'middle', 'ring', 'pinky'];

const proximal = new THREE.Vector3();
const intermediate = new THREE.Vector3();
const distal = new THREE.Vector3();
const tip = new THREE.Vector3();
const lower = new THREE.Vector3();
const upper = new THREE.Vector3();

function jointPosition(hand, frame, referenceSpace, name, out) {
  const joint = hand.get(name);
  if (!joint) return false;

  const pose = frame.getJointPose(joint, referenceSpace);
  if (!pose) return false;

  out.set(pose.transform.position.x, pose.transform.position.y, pose.transform.position.z);
  return true;
}

/**
 * How bent one finger is: 0 when straight, ~1 at a right angle, 2 when folded
 * right back. Returns null when the joints aren't tracked this frame.
 */
function fingerCurl(hand, frame, referenceSpace, finger) {
  if (!jointPosition(hand, frame, referenceSpace, `${finger}-finger-phalanx-proximal`, proximal)) return null;
  if (!jointPosition(hand, frame, referenceSpace, `${finger}-finger-phalanx-intermediate`, intermediate)) return null;
  if (!jointPosition(hand, frame, referenceSpace, `${finger}-finger-phalanx-distal`, distal)) return null;
  if (!jointPosition(hand, frame, referenceSpace, `${finger}-finger-tip`, tip)) return null;

  lower.subVectors(intermediate, proximal);
  upper.subVectors(tip, distal);

  const lowerLength = lower.length();
  const upperLength = upper.length();
  if (lowerLength < 1e-5 || upperLength < 1e-5) return null;

  lower.divideScalar(lowerLength);
  upper.divideScalar(upperLength);

  return 1 - lower.dot(upper);
}

/** Curl of one named finger, for callers that need to tell poses apart. */
export function getFingerCurl(inputSource, frame, referenceSpace, finger) {
  if (!inputSource || !inputSource.hand) return null;
  return fingerCurl(inputSource.hand, frame, referenceSpace, finger);
}

/**
 * How closed the hand is, or null if it isn't tracked.
 *
 * Mostly an average: Meta's guidance is that not every finger has to curl to
 * hold something, so averaging tolerates one finger reading badly through
 * self-occlusion, which requiring all four would not.
 *
 * The index finger is the exception, and gets a veto. Pointing — index
 * extended, the other three folded — averages out identical to a fist, so an
 * average alone would treat every poke at a button as a grab.
 */
export function handCurl(inputSource, frame, referenceSpace) {
  const hand = inputSource.hand;
  if (!hand) return null;

  let total = 0;
  let counted = 0;
  let index = null;

  for (const finger of FINGERS) {
    const curl = fingerCurl(hand, frame, referenceSpace, finger);
    if (curl === null) continue;
    if (finger === 'index') index = curl;
    total += curl;
    counted++;
  }

  if (counted === 0) return null;

  const average = total / counted;
  return index === null ? average : Math.min(index, average);
}

/**
 * Per-hand grab state with hysteresis, so a hand hovering right at the
 * threshold doesn't chatter between held and dropped.
 *
 * Call update() once per frame, then read isGrabbing() as many times as
 * needed — the existing grab code queries the same input source several times
 * within a frame.
 */
export class HandGrabTracker {
  constructor() {
    this.grabbing = new Map(); // handedness -> boolean
  }

  update(xrSession, frame, referenceSpace) {
    if (!xrSession || !frame || !referenceSpace || !xrSession.inputSources) return;

    for (const inputSource of xrSession.inputSources) {
      if (!inputSource.hand) continue;

      const hand = inputSource.handedness || 'none';
      const curl = handCurl(inputSource, frame, referenceSpace);

      // Tracking loss shouldn't drop what the user is holding — an occluded
      // hand reads as no data, not as an open hand.
      if (curl === null) continue;

      const held = this.grabbing.get(hand) === true;
      if (!held && curl >= GRAB_CURL) {
        this.grabbing.set(hand, true);
      } else if (held && curl <= RELEASE_CURL) {
        this.grabbing.set(hand, false);
      }
    }
  }

  isGrabbing(inputSource) {
    if (!inputSource || !inputSource.hand) return false;
    return this.grabbing.get(inputSource.handedness || 'none') === true;
  }
}
