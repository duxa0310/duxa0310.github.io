import { ab7RndInit, ab7RndProjSet } from "./rnd/rnd_base.js"
import * as mth from "./math/math.js"
import { ab7UnitAdd, ab7UnitsInit, ab7UnitsRender, ab7UnitsResponse } from "./units/units.js";
import { UnitTriangle } from "./units/u_triangle.js";
import { UnitAxis } from "./units/u_axis.js";
import { UnitControl } from "./units/u_ctrl.js";
import { UnitGeometry } from "./units/u_geometry.js";

window.onload = ab7SystemInit;

function ab7SystemInit() {
  window.outSys = function (str) { console.log("%c[SYS]", 'background: #000000; color: #00ff00', str); }
  window.outLog = function (str) { console.log("%c[LOG]", 'background: #000000; color: #00ffff', str); }
  window.outText = function (str) { console.log(" :::: " + str); }

  const control = new UnitControl();

  document.onkeydown = () => { control.response() }
  window.onresize = () => {
    console.log(document.documentElement.clientWidth, document.documentElement.clientHeight);
    ab7RndProjSet();
  }

  outLog("System start...");

  window.canvas = document.getElementById("webgl-canvas");
  ab7RndInit();

  ab7UnitAdd(new UnitAxis());
  //ab7UnitAdd(new UnitTriangle());
  ab7UnitAdd(new UnitGeometry());

  outLog("Units initializing");
  ab7UnitsInit();

  outLog("Render start...");
  ab7SystemMainLoop();
}

function ab7SystemMainLoop() {
  gl.clearColor(0.30, 0.47, 0.8, 1);
  gl.viewport(0, 0, 1920, 1080);
  gl.clear(gl.COLOR_BUFFER_BIT);

  gl.matrView = mth.matrView(gl.camLoc, gl.camAt, gl.camUp);
  gl.matrVP = mth.matrMulMatr(gl.matrView, gl.matrProj);

  ab7UnitsResponse();
  ab7UnitsRender();

  window.requestAnimationFrame(ab7SystemMainLoop);
}
