import * as mth from "./math/math.js"
import { ab7RndInit, ab7RndProjSet, ab7RndStart } from "./rnd/rnd_base.js"
import { ab7UnitAdd, ab7UnitsInit, ab7UnitsRender, ab7UnitsResponse } from "./units/units.js";
import { UnitAxis } from "./units/u_axis.js";
import { UnitControl } from "./units/u_ctrl.js";
import { UnitGeometry } from "./units/u_geometry.js";

window.onload = ab7SystemInit;

async function ab7SystemInit() {
  window.outSys = function (str) { console.log("%c[SYS]", 'background:rgb(0, 0, 0); color: #00ff00', str); }
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
  await ab7RndInit();
  gl.lightDir = mth.vec3Set(0.8, 1.02, 0.8);

  outSys("Units initializing");
  ab7UnitAdd(new UnitAxis());
  ab7UnitAdd(new UnitGeometry());
  await ab7UnitsInit();

  outLog("Render start...");
  ab7SystemMainLoop();
}

function ab7SystemMainLoop() {
  ab7RndStart();

  gl.matrView = mth.matrView(gl.camLoc, gl.camAt, gl.camUp);
  gl.matrVP = mth.matrMulMatr(gl.matrView, gl.matrProj);

  gl.lightDir = mth.vec3MulMatr(gl.lightDir, mth.matrRotateY(1.8));

  ab7UnitsResponse();
  ab7UnitsRender();

  window.requestAnimationFrame(ab7SystemMainLoop);
}
