import * as mth from "../math/math.js" 

export function AB7_RndResize()
{
  let rx, ry;
  rx = ry = gl.projSize;

  gl.frameW = canvas.width;
  gl.frameH = canvas.height;

  if (gl.frameW >= gl.frameH)
  {
    rx *= gl.frameW / gl.frameH;
  }
  else
  {
    ry *= gl.frameH / gl.frameW;
  }
  gl.matrProj = mth.MatrFrustum(-rx / 2, rx / 2, -ry / 2, ry / 2, gl.projDist, gl.farClip);
  gl.matrVP = mth.MatrMulMatr(gl.matrView, gl.matrProj);
  gl.viewportWidth = gl.frameW;
  gl.viewportHeight = gl.frameH;
}

export function AB7_RndInit()
{
  window.gl = canvas.getContext("webgl2", { antialias: false });

  gl.projSize = 0.1;
  gl.projDist = gl.projSize;
  gl.farClip = 1847;

  gl.camLoc = mth.Vec3Set1(4.7);
  gl.camAt = mth.Vec3Set1(0);
  gl.camUp = mth.Vec3Set(0, 1, 0);

  gl.matrView = mth.MatrView(gl.camLoc, gl.camAt, gl.camUp);

  AB7_RndResize();
  outSys("Render system initialized");
}