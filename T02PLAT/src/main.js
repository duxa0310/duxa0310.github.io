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
  window.onresize = (e) => 
  { 
    gl.viewportWidth = canvas.width;
    gl.viewportHeight = canvas.height; 
    console.log(canvas.width, canvas.height);
  }
  AB7_ResInit();
  AB7_RndPrimInit();
  prim = AB7_RndPrimCreate(gl.TRIANGLES,
            [0, 0, 0,      0, 0,  0, 0, 0,  0.96, 0.95, 0.41, 1]
    .concat([0.5, 0.5, 0,  0, 0,  0, 0, 0,  0.36, 0.70, 0.44, 1])
    .concat([0, 0.5, 0,    0, 0,  0, 0, 0,  0.78, 0.98, 0.84, 1]), 
  []);
  window.requestAnimationFrame(AB7_SystemMainLoop);
}

let prim;

function AB7_SystemMainLoop()
{
  gl.clearColor(0.30, 0.47, 0.8, 1);
  gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
  gl.clear(gl.COLOR_BUFFER_BIT);

  prim.draw();
}
