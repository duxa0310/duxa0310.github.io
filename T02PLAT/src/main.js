import { AB7_RndInit } from "./rnd/rnd_base.js"
import { AB7_ResInit } from "./rnd/res/rnd_res.js"
import { AB7_RndPrimInit, AB7_RndPrimCreate } from "./rnd/rnd_prim.js";

window.onload = AB7_SystemInit;

function AB7_SystemInit()
{
  window.outSys = function(str) { console.log("%c[SYS]", 'background: #000000; color: #00ff00', str); }
  window.outLog = function(str) { console.log("%c[LOG]", 'background: #000000; color: #00ffff', str); }
  window.outText = function(str) { console.log(" :::: " +  str); }

  outLog("System start...");

  window.canvas = document.getElementById("webgl-canvas");
  AB7_RndInit();
  AB7_ResInit();
  AB7_RndPrimInit();
  AB7_SystemMainLoop();
}

function AB7_SystemMainLoop()
{
  let prim = AB7_RndPrimCreate(gl.TRIANGLES,
    [0, 0, 0,   0, 0,   0, 0, 0,  1, 1, 1, 1]
      .concat([1, 2, 3,   0, 0,   0, 0, 0,  1, 1, 1, 1])
      .concat([4, 5, 6,   0, 0,   0, 0, 0,  1, 1, 1, 1]), 
    []);
  prim.draw();
}
