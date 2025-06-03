export function AB7_RndInit()
{
  window.gl = canvas.getContext("webgl2");
  gl.viewportWidth = canvas.width;
  gl.viewportHeight = canvas.height;
  outSys("Render system initialized");
}