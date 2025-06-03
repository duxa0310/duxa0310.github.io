export function AB7_RndInit()
{
  conOut("Render starting");

  window.gl = canvas.getContext("webgl2");
  gl.viewportWidth = canvas.width;
  gl.viewportHeight = canvas.height;
}