import * as mth from "../math/math.js"
import { Unit } from "./units.js";
import { ab7RndCamSet } from "../rnd/rnd_base.js";

function ab7KeyboardInputHandle(e, keyCode) {
  const key = String.fromCharCode(keyCode);
  const
    pressedAlt = e.altKey,
    pressedCtrl = e.ctrlKey,
    pressedShift = e.shiftKey;

  /* Reset camera position on Shift-F */
  if (pressedShift && key == 'F') {
    ab7RndCamSet(mth.vec3Set1(18), mth.vec3Set1(0), mth.vec3Set(0, 1, 0));
    return;
  }

  /* Azimuth-elevator camera movement handle */
  let dist = mth.vec3Len(mth.vec3SubVec3(ab7.camAt, ab7.camLoc));
  const
    cosT = (ab7.camLoc[1] - ab7.camAt[1]) / dist,
    sinT = Math.pow(1 - cosT * cosT, 0.5),
    plen = dist * sinT,
    cosP = (ab7.camLoc[2] - ab7.camAt[2]) / plen,
    sinP = (ab7.camLoc[0] - ab7.camAt[0]) / plen;
  let
    azimuth = mth.radiansToDegrees(Math.atan2(sinP, cosP)),
    elevator = mth.radiansToDegrees(Math.atan2(sinT, cosT));

  const
    distChange = 0.47 + pressedShift,
    angleChange = 8 + 10 * pressedShift;

  switch (key) {
    case 'Q':
      dist += distChange;
      break;
    case 'E':
      dist -= distChange;
      break;
    case 'A':
      azimuth -= angleChange;
      break;
    case 'D':
      azimuth += angleChange;
      break;
    case 'W':
      elevator += angleChange;
      break;
    case 'S':
      elevator -= angleChange;
      break;
  }
  dist += ab7.mdZ;
  ab7.mdZ = 0;
  if (elevator < 0.08) {
    elevator = 0.08;
  } else if (elevator > 178.90) {
    elevator = 178.90;
  }
  if (dist < 0.1) {
    dist = 0.1;
  }
  /* Setup result camera */
  ab7RndCamSet(
    mth.pointTransform(
      mth.vec3Set(0, dist, 0),
      mth.matrMulMatr3(mth.matrRotateX(elevator),
        mth.matrRotateY(azimuth), mth.matrTranslate(ab7.camAt))),
    ab7.camAt, mth.vec3Set(0, 1, 0));
}

function ab7MouseInputHandle(mX, mY, oldX, oldY) {
  if (oldX == undefined || oldY == undefined) {
    return;
  }
  ab7.mX = mX;
  ab7.mY = mY;
  ab7.mdX = mX - oldX;
  ab7.mdY = mY - oldY;

  /* Azimuth-elevator camera movement handle */
  let dist = mth.vec3Len(mth.vec3SubVec3(ab7.camAt, ab7.camLoc));
  const
    cosT = (ab7.camLoc[1] - ab7.camAt[1]) / dist,
    sinT = Math.pow(1 - cosT * cosT, 0.5),
    plen = dist * sinT,
    cosP = (ab7.camLoc[2] - ab7.camAt[2]) / plen,
    sinP = (ab7.camLoc[0] - ab7.camAt[0]) / plen;
  let
    azimuth = mth.radiansToDegrees(Math.atan2(sinP, cosP)),
    elevator = mth.radiansToDegrees(Math.atan2(sinT, cosT));

  dist += 0.30 * ab7.mdZ;
  ab7.mdZ = 0;
  if (ab7.mousePressed) {
    azimuth -= ab7.mdX;
    elevator -= ab7.mdY;
  }

  if (elevator < 0.08) {
    elevator = 0.08;
  } else if (elevator > 178.90) {
    elevator = 178.90;
  }
  if (dist < 0.1) {
    dist = 0.1;
  }

  /* Setup result camera */
  ab7RndCamSet(
    mth.pointTransform(
      mth.vec3Set(0, dist, 0),
      mth.matrMulMatr3(mth.matrRotateX(elevator),
        mth.matrRotateY(azimuth), mth.matrTranslate(ab7.camAt))),
    ab7.camAt, mth.vec3Set(0, 1, 0));
}

export class UnitControl extends Unit {
  constructor() {
    super();
    this.name = "Control";
  }

  init(ev) {
    ab7.mdZ = ev.deltaY;
    ab7MouseInputHandle(ab7.mX, ab7.mY, ab7.mX, ab7.mY);
  }

  response() {
    ab7KeyboardInputHandle(window.event, window.event.which);
  }

  render(ev) {
    ab7MouseInputHandle(ev.x, ev.y, this.lastX, this.lastY);
    this.lastX = ev.x;
    this.lastY = ev.y;
  }
}