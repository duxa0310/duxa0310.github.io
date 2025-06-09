import * as mth from "./math/math.js"
import { ab7RndInit, ab7RndProjSet, ab7RndStart } from "./rnd/rnd_base.js"
import { ab7UnitAdd, ab7UnitsInit, ab7UnitsRender, ab7UnitsResponse } from "./units/units.js";
import { UnitAxis } from "./units/u_axis.js";
import { UnitControl } from "./units/u_ctrl.js";
import { UnitGeometry } from "./units/u_geometry.js";
import { Pane } from "tweakpane";

window.onload = ab7SystemInit;

let lastTime;

/* Main variables context */
export const ab7Context = {
  time: "00:00:00 AM 1.1.2000",
  fps: 60.0,
  showAxis: false,
  rotate: true,
  lightColor: "#FFFFFF",
  scene: "tetrahedron",
};

async function ab7SystemInit() {
  window.outSys = function (str) { console.log("%c[SYS]", 'background:rgb(0, 0, 0); color: #00ff00', str); }
  window.outLog = function (str) { console.log("%c[LOG]", 'background: #000000; color: #00ffff', str); }
  window.outText = function (str) { console.log(" :::  " + str); }

  const pane = new Pane({
    title: 'INFORMATION & CONTROL PANEL',
    expanded: true,
  });

  const tab = pane.addTab({
    pages: [
      { title: 'Statistics' },
      { title: 'Parameters' },
    ],
  });

  tab.pages[0].addBinding(ab7Context, 'fps', {
    readonly: true,
    view: 'graph',
    min: 0,
    max: 120,
  });

  tab.pages[0].addBinding(ab7Context, 'time', {
    readonly: true,
  });

  tab.pages[1].addBinding(ab7Context, 'showAxis');
  tab.pages[1].addBinding(ab7Context, 'rotate');
  tab.pages[1].addBinding(ab7Context, 'lightColor', {
    picker: 'inline'
  });
  tab.pages[1].addBinding(ab7Context, 'scene', {
    options: {
      tetrahedron: 'tetrahedron',
      hexahedron: 'hexahedron',
      octahedron: 'octahedron',
      icosahedron: 'icosahedron',
      dodecahedron: 'dodecahedron',
      chaos: 'chaos',
    },
  });

  const control = new UnitControl();

  document.onkeydown = () => { control.response() }
  window.onresize = () => {
    console.log(document.documentElement.clientWidth, document.documentElement.clientHeight);
    ab7RndProjSet();
  }

  window.ab7 = ab7Context;
  outLog("System start...");

  window.canvas = document.getElementById("webgl-canvas");
  await ab7RndInit();
  ab7.lightDir = mth.vec3Set(1.8, 0.8, 1.8);

  outSys("Units initializing");
  ab7UnitAdd(new UnitAxis());
  ab7UnitAdd(new UnitGeometry());
  await ab7UnitsInit();

  outLog("Render start...");
  lastTime = performance.now() / 1000;
  ab7SystemMainLoop();
}

function ab7SystemMainLoop() {
  ab7Context.time = new Date().toLocaleString().replaceAll("/", ".").split(", ").reverse().join(" ");
  ab7.globalTime = performance.now() / 1000;
  ab7.deltaTime = ab7.globalTime - lastTime;
  lastTime = ab7.globalTime;
  ab7.fps = 1 / ab7.deltaTime;

  ab7RndStart();

  ab7.matrView = mth.matrView(ab7.camLoc, ab7.camAt, ab7.camUp);
  ab7.matrVP = mth.matrMulMatr(ab7.matrView, ab7.matrProj);

  ab7.lightDir = mth.vec3MulMatr(ab7.lightDir, mth.matrRotateY(102 * ab7.deltaTime));

  ab7UnitsResponse();
  ab7UnitsRender();

  window.requestAnimationFrame(ab7SystemMainLoop);
}
