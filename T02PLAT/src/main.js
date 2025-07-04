import * as mth from "./math/math.js"
import { ab7HtmlInit, ab7HtmlResponse } from "./index.js";
import { ab7RndInit, ab7RndStart, ab7RndProjSet } from "./rnd/rnd_base.js"
import { ab7UnitsInit, ab7UnitAdd, ab7UnitsResponse, ab7UnitsRender } from "./units/units.js";
import { UnitAxis } from "./units/u_axis.js";
import { UnitControl } from "./units/u_ctrl.js";
import { UnitGeometry } from "./units/u_geometry.js";
import { UnitTimer } from "./units/u_timer.js";
import { UnitTriangle } from "./units/u_triangle.js";
import { UnitCow } from "./units/u_cow.js";

/* Main variables context */
export const ab7Context = {
  timeDate: "00:00:00 AM 1.1.2000",
  globalTime: 0, globalDeltaTime: 0,
  time: 0, deltaTime: 0,
  fps: 60.0,
  mX: 0, mY: 0, mdX: 0, mdY: 0, mdZ: 0,
  mousePressed: false,
  showAxis: false,
  rotate: true,
  pause: false,
  lightColor: "#FFFFFF",
  scene: "tetrahedron",
};

/* Make ab7Init function call on page load */
window.onload = ab7Init;

async function ab7Init() {
  window.ab7 = ab7Context;
  window.outSys = function (str) { console.log("%c[SYS]", 'background:rgb(0, 0, 0); color: #00ff00', str); }
  window.outLog = function (str) { console.log("%c[LOG]", 'background: #000000; color: #00ffff', str); }
  window.outText = function (str) { console.log(" :::  " + str); }

  outLog("Html script start...");
  ab7HtmlInit();

  const control = new UnitControl();
  document.onkeydown = () => { control.response() }
  document.onmousedown = (ev) => { ab7.mousePressed = true; }
  document.onmouseup = (ev) => { ab7.mousePressed = false; }
  document.onmousemove = (ev) => { control.render(ev) }
  document.onwheel = (ev) => { control.init(ev) }
  window.onresize = () => {
    ab7RndProjSet(document.documentElement.clientWidth,
      document.documentElement.clientHeight);
  }

  outLog("System start...");
  await ab7RndInit();

  outSys("Units initializing");
  ab7UnitAdd(new UnitTimer());
  ab7UnitAdd(new UnitAxis());
  ab7UnitAdd(new UnitGeometry());
  ab7UnitAdd(new UnitCow());
  await ab7UnitsInit();

  outLog("Render start...");
  ab7Response();
}

function ab7Response() {
  ab7HtmlResponse();
  ab7UnitsResponse();
  ab7.lightDir = mth.vec3MulMatr(ab7.lightDir, mth.matrRotateY(-102 * ab7.deltaTime));

  ab7RndStart();
  ab7UnitsRender();

  window.requestAnimationFrame(ab7Response);
}
