import { ab7RndInit } from "./rnd/rnd_base.js"
import { ab7ResInit } from "./rnd/res/rnd_res.js"
import {
  ab7RndPrimInit, ab7RndPrimCreate,
  ab7RndCreateVertex
} from "./rnd/rnd_prim.js";
import * as mth from "./math/math.js"

window.onload = ab7SystemInit;

function ab7SystemKeyboardInputHandle(e, keyCode) {
  let key = String.fromCharCode(keyCode);
  let
    pressedAlt = e.altKey,
    pressedCtrl = e.ctrlKey,
    pressedShift = e.shiftKey;

  if (pressedShift && key === 'P') {
    console.log("You pressed Shift-P");
  }
}

function ab7SystemInit() {
  window.outSys = function (str) { console.log("%c[SYS]", 'background: #000000; color: #00ff00', str); }
  window.outLog = function (str) { console.log("%c[LOG]", 'background: #000000; color: #00ffff', str); }
  window.outText = function (str) { console.log(" :::: " + str); }

  document.onkeyup = () => { ab7SystemKeyboardInputHandle(window.event, window.event.which); }

  outLog("System start...");

  window.canvas = document.getElementById("webgl-canvas");
  ab7RndInit();
  window.onresize = (e) => {
    gl.viewportWidth = canvas.width;
    gl.viewportHeight = canvas.height;
    console.log(canvas.width, canvas.height);
  }
  ab7ResInit();
  ab7RndPrimInit();
  prim = ab7RndPrimCreate(gl.TRIANGLES,
    [].concat(
      ab7RndCreateVertex([0, 1, 0], [0, 0], [0, 0, 0], [0.96, 0.95, 0.41, 1]),
      ab7RndCreateVertex([-1, 0, 0], [0, 0], [0, 0, 0], [0.36, 0.70, 0.44, 1]),
      ab7RndCreateVertex([0, 0, -1], [0, 0], [0, 0, 0], [0.78, 0.98, 0.84, 1])),
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
  window.requestAnimationFrame(ab7SystemMainLoop);
}

let prim, axis;

function ab7SystemMainLoop() {
  gl.clearColor(0.30, 0.47, 0.8, 1);
  gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
  gl.clear(gl.COLOR_BUFFER_BIT);

  axis.draw(mth.matrIdentity());
  prim.draw(mth.matrIdentity());
}
