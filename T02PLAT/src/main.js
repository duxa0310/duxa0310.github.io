import {AB7_RndInit} from "./rnd/rndbase.js"
import {AB7_ResInit} from "./rnd/res/rndres.js"

window.onload = AB7_SystemInit;

function AB7_SystemInit()
{
  window.conOut = function(str) { console.log("%c[SYS]", 'background: #000000; color: #00ff00', str); }
  window.conLog = function(str) { console.log("%c[LOG]", 'background: #000000; color: #00ffff', str); }

  conOut("System starting");

  window.canvas = document.getElementById("webgl-canvas");
  AB7_RndInit();
  AB7_ResInit();
  AB7_SystemMainLoop();
}

function AB7_SystemMainLoop()
{
  
}
