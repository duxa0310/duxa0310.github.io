import * as mth from "../math/math.js"
import { ab7ResInit } from "./res/rnd_res.js"

export function ab7RndResize() {
  let rx, ry;
  rx = ry = gl.projSize;

  gl.frameW = canvas.width;
  gl.frameH = canvas.height;

  if (gl.frameW >= gl.frameH) {
    rx *= gl.frameW / gl.frameH;
  }
  else {
    ry *= gl.frameH / gl.frameW;
  }
  gl.matrProj = mth.matrFrustum(-rx / 2, rx / 2, -ry / 2, ry / 2, gl.projDist, gl.farClip);
  gl.matrVP = mth.matrMulMatr(gl.matrView, gl.matrProj);
  gl.viewportWidth = gl.frameW;
  gl.viewportHeight = gl.frameH;
}

export function ab7RndInit() {
  window.gl = canvas.getContext("webgl2", { antialias: false });

  gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

  gl.projSize = 0.1;
  gl.projDist = gl.projSize;
  gl.farClip = 1847;

  ab7ResInit();

  gl.camLoc = mth.vec3Set1(5);
  gl.camAt = mth.vec3Set1(0);
  gl.camUp = mth.vec3Set(0, 1, 0);

  gl.matrView = mth.matrView(gl.camLoc, gl.camAt, gl.camUp);

  ab7RndResize();
  outSys("Render system initialized");
}