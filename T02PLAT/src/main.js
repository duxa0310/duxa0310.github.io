import { ab7RndInit, ab7RndCamSet, ab7RndProjSet } from "./rnd/rnd_base.js"
import {
  ab7RndPrimCreate,
  ab7RndCreateVertex
} from "./rnd/rnd_prim.js";
import * as mth from "./math/math.js"

window.onload = ab7SystemInit;

function ab7SystemKeyboardInputHandle(e, keyCode) {
  const key = String.fromCharCode(keyCode);
  const
    pressedAlt = e.altKey,
    pressedCtrl = e.ctrlKey,
    pressedShift = e.shiftKey;

  /* Reset camera position on Shift-F */
  if (pressedShift && key == 'F') {
    ab7RndCamSet(mth.vec3Set1(8), mth.vec3Set1(0), mth.vec3Set(0, 1, 0));
    return;
  }

  /* Azimuth-elevator camera movement handle */
  let dist = mth.vec3Len(mth.vec3SubVec3(gl.camAt, gl.camLoc));
  const
    cosT = (gl.camLoc[1] - gl.camAt[1]) / dist,
    sinT = Math.pow(1 - cosT * cosT, 0.5),
    plen = dist * sinT,
    cosP = (gl.camLoc[2] - gl.camAt[2]) / plen,
    sinP = (gl.camLoc[0] - gl.camAt[0]) / plen;
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
  if (elevator < 0.08) {
    elevator = 0.08;
  }
  else if (elevator > 178.90) {
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
        mth.matrRotateY(azimuth), mth.matrTranslate(gl.camAt))),
    gl.camAt, mth.vec3Set(0, 1, 0));
}

function ab7SystemInit() {
  window.outSys = function (str) { console.log("%c[SYS]", 'background: #000000; color: #00ff00', str); }
  window.outLog = function (str) { console.log("%c[LOG]", 'background: #000000; color: #00ffff', str); }
  window.outText = function (str) { console.log(" :::: " + str); }

  document.onkeydown = () => { ab7SystemKeyboardInputHandle(window.event, window.event.which); }
  window.onresize = () => {
    console.log(document.documentElement.clientWidth, document.documentElement.clientHeight);
    ab7RndProjSet();
  }

  outLog("System start...");

  window.canvas = document.getElementById("webgl-canvas");
  ab7RndInit();
  prim = ab7RndPrimCreate(gl.TRIANGLES,
    [].concat(
      ab7RndCreateVertex([0, 1, 0], [0, 0], [0, 0, 0], [0.96, 0.95, 0.41, 1]),
      ab7RndCreateVertex([1, 0, 0], [0, 0], [0, 0, 0], [0.36, 0.70, 0.44, 1]),
      ab7RndCreateVertex([0, 0, 1], [0, 0], [0, 0, 0], [0.78, 0.98, 0.84, 1])),
    []);
  axis = ab7RndPrimCreate(gl.LINES,
    [].concat(
      ab7RndCreateVertex([0, 0, 0], [0, 0], [0, 0, 1], [1, 0, 0, 1]),
      ab7RndCreateVertex([1000, 0, 0], [0, 0], [0, 0, 1], [1, 0, 0, 1]),
      ab7RndCreateVertex([0, 0, 0], [0, 0], [0, 0, 1], [0, 1, 0, 1]),
      ab7RndCreateVertex([0, 1000, 0], [0, 0], [0, 0, 1], [0, 1, 0, 1]),
      ab7RndCreateVertex([0, 0, 0], [0, 0], [0, 0, 1], [0, 0, 1, 1]),
      ab7RndCreateVertex([0, 0, 1000], [0, 0], [0, 0, 1], [0, 0, 1, 1])),
    []);
  outLog("Render start...");

  ab7SystemMainLoop();
}

let prim, axis;

function ab7SystemMainLoop() {
  gl.clearColor(0.30, 0.47, 0.8, 1);
  gl.viewport(0, 0, 1920, 1080);
  gl.clear(gl.COLOR_BUFFER_BIT);

  gl.matrView = mth.matrView(gl.camLoc, gl.camAt, gl.camUp);
  gl.matrVP = mth.matrMulMatr(gl.matrView, gl.matrProj);

  axis.draw(mth.matrIdentity());
  prim.draw(mth.matrIdentity());

  window.requestAnimationFrame(ab7SystemMainLoop);
}
