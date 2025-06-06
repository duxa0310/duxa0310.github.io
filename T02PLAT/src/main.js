import { ab7RndInit, ab7RndCamSet, ab7RndProjSet } from "./rnd/rnd_base.js"
import {
  ab7RndPrimCreate,
  ab7RndCreateVertex,
  ab7RndPentagonFromIndicesCCW
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
      ab7RndCreateVertex([0, 0, 0], [0, 0], [0, 0, 0], [1, 0, 0, 1]),
      ab7RndCreateVertex([1000, 0, 0], [0, 0], [0, 0, 0], [1, 0, 0, 1]),
      ab7RndCreateVertex([0, 0, 0], [0, 0], [0, 0, 0], [0, 1, 0, 1]),
      ab7RndCreateVertex([0, 1000, 0], [0, 0], [0, 0, 0], [0, 1, 0, 1]),
      ab7RndCreateVertex([0, 0, 0], [0, 0], [0, 0, 0], [0, 0, 1, 1]),
      ab7RndCreateVertex([0, 0, 1000], [0, 0], [0, 0, 0], [0, 0, 1, 1])),
    []);
  tetrahedron = ab7RndPrimCreate(gl.TRIANGLES,
    [].concat(
      ab7RndCreateVertex([1, 1, 1], [0, 0], [1, 1, 1], [1, 0, 0, 1]),
      ab7RndCreateVertex([-1, 1, -1], [0, 0], [-1, 1, -1], [1, 0, 0, 1]),
      ab7RndCreateVertex([1, -1, -1], [0, 0], [1, -1, -1], [1, 0, 0, 1]),
      ab7RndCreateVertex([-1, -1, 1], [0, 0], [-1, -1, 1], [1, 0, 0, 1])),
    [].concat(
      [0, 1, 2], [2, 0, 3], [3, 0, 1], [1, 2, 3])
  );
  hexahedron = ab7RndPrimCreate(gl.TRIANGLES,
    [].concat(
      ab7RndCreateVertex([-1, -1, -1], [0, 0], [-1, -1, -1], [1, 0, 0, 1]),
      ab7RndCreateVertex([-1, -1, 1], [0, 0], [-1, -1, 1], [1, 0.25, 0, 1]),
      ab7RndCreateVertex([-1, 1, -1], [0, 0], [-1, 1, -1], [1, 0.5, 0, 1]),
      ab7RndCreateVertex([-1, 1, 1], [0, 0], [-1, 1, 1], [1, 0.75, 0, 1]),
      ab7RndCreateVertex([1, -1, -1], [0, 0], [1, -1, -1], [0.75, 1, 0, 1]),
      ab7RndCreateVertex([1, -1, 1], [0, 0], [1, -1, 1], [0.5, 1, 0, 1]),
      ab7RndCreateVertex([1, 1, -1], [0, 0], [1, 1, -1], [0.25, 1, 0, 1]),
      ab7RndCreateVertex([1, 1, 1], [0, 0], [1, 1, 1], [0, 1, 0, 1])),
    [].concat(
      [0, 2, 3, 3, 0, 1], [1, 5, 7, 7, 3, 1], [1, 5, 4, 4, 1, 0], [0, 4, 6, 6, 0, 2], [2, 3, 6, 6, 3, 7], [7, 6, 5, 5, 4, 6])
  );
  octahedron = ab7RndPrimCreate(gl.TRIANGLES,
    [].concat(
      ab7RndCreateVertex([0, 1, 0], [0, 0], [0, 1, 0], [1, 0, 0, 1]),
      ab7RndCreateVertex([0, 0, -1], [0, 0], [0, 0, -1], [1, 0.5, 0, 1]),
      ab7RndCreateVertex([-1, 0, 0], [0, 0], [-1, 0, 0], [1, 1, 0, 1]),
      ab7RndCreateVertex([0, 0, 1], [0, 0], [0, 0, 1], [0.5, 1, 0, 1]),
      ab7RndCreateVertex([1, 0, 0], [0, 0], [1, 0, 0], [1, 1, 0, 1]),
      ab7RndCreateVertex([0, -1, 0], [0, 0], [0, -1, 0], [1, 1, 0.5, 1])),
    [].concat(
      [1, 0, 2], [2, 0, 3], [3, 0, 4], [4, 0, 1], [1, 5, 4], [4, 5, 3], [3, 5, 2], [2, 5, 1])
  );
  icosahedron = ab7RndPrimCreate(gl.TRIANGLES,
    [].concat(
      ab7RndCreateVertex([-1, mth.phi, 0], [0, 0], [-1, mth.phi, 0], [1, 0.25, 0, 1]),
      ab7RndCreateVertex([0, 1, -mth.phi], [0, 0], [0, 1, -mth.phi], [1, 0.5, 0, 1]),
      ab7RndCreateVertex([1, mth.phi, 0], [0, 0], [1, mth.phi, 0], [1, 0.75, 0, 1]),
      ab7RndCreateVertex([0, 1, mth.phi], [0, 0], [0, 1, mth.phi], [1, 1, 0, 1]),
      ab7RndCreateVertex([-mth.phi, 0, 1], [0, 0], [-mth.phi, 0, 1], [0.75, 1, 0, 1]),
      ab7RndCreateVertex([-mth.phi, 0, -1], [0, 0], [-mth.phi, 0, -1], [0.5, 1, 0, 1]),
      ab7RndCreateVertex([0, -1, -mth.phi], [0, 0], [0, -1, -mth.phi], [0.25, 1, 0, 1]),
      ab7RndCreateVertex([mth.phi, 0, -1], [0, 0], [mth.phi, 0, -1], [0, 1, 0, 1]),
      ab7RndCreateVertex([mth.phi, 0, 1], [0, 0], [mth.phi, 0, 1], [0, 1, 0.25, 1]),
      ab7RndCreateVertex([0, -1, mth.phi], [0, 0], [0, -1, mth.phi], [0, 1, 0.5, 1]),
      ab7RndCreateVertex([-1, -mth.phi, 0], [0, 0], [-1, -mth.phi, 0], [0, 0, 0.75, 1]),
      ab7RndCreateVertex([1, -mth.phi, 0], [0, 0], [1, -mth.phi, 0], [0, 1, 1, 1])),
    [].concat(
      [0, 1, 2], [0, 2, 3], [0, 3, 4], [0, 4, 5], [0, 5, 1],
      [1, 6, 7], [7, 1, 2], [2, 7, 8], [8, 2, 3], [3, 8, 9], [9, 3, 4], [4, 9, 10], [10, 4, 5], [5, 10, 6], [6, 5, 1],
      [7, 11, 8], [8, 11, 9], [9, 11, 10], [10, 11, 6], [6, 11, 7])
  );
  dodecahedron = ab7RndPrimCreate(gl.TRIANGLES,
    [].concat(
      ab7RndCreateVertex([mth.phi_inv, mth.phi, 0], [0, 0], [mth.phi_inv, mth.phi, 0], [1, 0, 0, 1]),
      ab7RndCreateVertex([-mth.phi_inv, mth.phi, 0], [0, 0], [-mth.phi_inv, mth.phi, 0], [1, 0, 0, 1]),
      ab7RndCreateVertex([-1, 1, -1], [0, 0], [-1, 1, -1], [1, 0, 0, 1]),
      ab7RndCreateVertex([0, mth.phi_inv, -mth.phi], [0, 0], [0, mth.phi_inv, -mth.phi], [1, 0, 0, 1]),
      ab7RndCreateVertex([1, 1, -1], [0, 0], [1, 1, -1], [1, 0, 0, 1]),
      ab7RndCreateVertex([1, 1, 1], [0, 0], [1, 1, 1], [1, 1, 0, 1]),
      ab7RndCreateVertex([0, mth.phi_inv, mth.phi], [0, 0], [0, mth.phi_inv, mth.phi], [1, 1, 0, 1]),
      ab7RndCreateVertex([-1, 1, 1], [0, 0], [-1, 1, 1], [1, 1, 0, 1]),
      ab7RndCreateVertex([-mth.phi, 0, mth.phi_inv], [0, 0], [-mth.phi, 0, mth.phi_inv], [1, 1, 0, 1]),
      ab7RndCreateVertex([-mth.phi, 0, -mth.phi_inv], [0, 0], [-mth.phi, 0, -mth.phi_inv], [1, 1, 0, 1]),
      ab7RndCreateVertex([-1, -1, -1], [0, 0], [-1, -1, -1], [0, 1, 0, 1]),
      ab7RndCreateVertex([0, -mth.phi_inv, -mth.phi], [0, 0], [0, -mth.phi_inv, -mth.phi], [0, 1, 0, 1]),
      ab7RndCreateVertex([1, -1, -1], [0, 0], [1, -1, -1], [0, 1, 0, 1]),
      ab7RndCreateVertex([mth.phi, 0, -mth.phi_inv], [0, 0], [mth.phi, 0, -mth.phi_inv], [0, 1, 0, 1]),
      ab7RndCreateVertex([mth.phi, 0, mth.phi_inv], [0, 0], [mth.phi, 0, mth.phi_inv], [0, 1, 0, 1]),
      ab7RndCreateVertex([1, -1, 1], [0, 0], [1, -1, 1], [0, 0, 1, 1]),
      ab7RndCreateVertex([mth.phi_inv, -mth.phi, 0], [0, 0], [mth.phi_inv, -mth.phi, 0], [0, 0, 1, 1]),
      ab7RndCreateVertex([-mth.phi_inv, -mth.phi, 0], [0, 0], [-mth.phi_inv, -mth.phi, 0], [0, 0, 1, 1]),
      ab7RndCreateVertex([-1, -1, 1], [0, 0], [-1, -1, 1], [0, 0, 1, 1]),
      ab7RndCreateVertex([0, -mth.phi_inv, mth.phi], [0, 0], [0, -mth.phi_inv, mth.phi], [0, 0, 1, 1])),
    [].concat(
      ab7RndPentagonFromIndicesCCW([0, 1, 2, 3, 4]),
      ab7RndPentagonFromIndicesCCW([0, 5, 6, 7, 1]),
      ab7RndPentagonFromIndicesCCW([1, 7, 8, 9, 2]),
      ab7RndPentagonFromIndicesCCW([2, 9, 10, 11, 3]),
      ab7RndPentagonFromIndicesCCW([3, 11, 12, 13, 4]),
      ab7RndPentagonFromIndicesCCW([0, 4, 13, 14, 5]),
      ab7RndPentagonFromIndicesCCW([6, 5, 14, 15, 19]),
      ab7RndPentagonFromIndicesCCW([8, 7, 6, 19, 18]),
      ab7RndPentagonFromIndicesCCW([18, 17, 10, 9, 8]),
      ab7RndPentagonFromIndicesCCW([12, 11, 10, 17, 16]),
      ab7RndPentagonFromIndicesCCW([16, 17, 18, 19, 15]),
      ab7RndPentagonFromIndicesCCW([16, 15, 14, 13, 12])
    )
  );
  outLog("Render start...");

  ab7SystemMainLoop();
}

let prim, axis;
let tetrahedron, hexahedron, octahedron, icosahedron, dodecahedron;

function ab7SystemMainLoop() {
  gl.clearColor(0.30, 0.47, 0.8, 1);
  gl.viewport(0, 0, 1920, 1080);
  gl.clear(gl.COLOR_BUFFER_BIT);

  gl.matrView = mth.matrView(gl.camLoc, gl.camAt, gl.camUp);
  gl.matrVP = mth.matrMulMatr(gl.matrView, gl.matrProj);

  axis.draw(mth.matrIdentity());
  //prim.draw(mth.matrIdentity());
  tetrahedron.draw(mth.matrTranslate(mth.vec3Set(0, 3.0, 0)));
  hexahedron.draw(mth.matrTranslate(mth.vec3Set(0, -3.0, 0)));
  octahedron.draw(mth.matrTranslate(mth.vec3Set(-1.8, 0, 1.8)));
  icosahedron.draw(mth.matrTranslate(mth.vec3Set(3.0, 0, -3.0)));
  dodecahedron.draw(mth.matrIdentity());

  window.requestAnimationFrame(ab7SystemMainLoop);
}
