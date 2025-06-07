import * as mth from "../math/math.js"
import { ab7ResInit } from "./res/rnd_res.js"

export function ab7RndCamSet(loc, at, up) {
  gl.camLoc = loc;
  gl.camAt = at;
  gl.matrView = mth.matrView(loc, at, up);
  gl.camRight = mth.vec3Set(
    gl.matrView[0][0],
    gl.matrView[1][0],
    gl.matrView[2][0]
  );
  gl.camUp = mth.vec3Set(
    gl.matrView[0][1],
    gl.matrView[1][1],
    gl.matrView[2][1]);
  gl.camDir = mth.vec3Set(
    -gl.matrView[0][2],
    -gl.matrView[1][2],
    -gl.matrView[2][2]);
  //gl.matrVP = mth.matrMulMatr(gl.matrView, gl.matrProj);
}

export function ab7RndProjSet() {
  let rx, ry;
  rx = ry = gl.projSize;

  gl.frameW = document.documentElement.clientWidth;
  gl.frameH = document.documentElement.clientHeight;

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

export function ab7RndStart() {
  gl.clearColor(0.30, 0.47, 0.8, 1);
  gl.viewport(0, 0, 1920, 1080);
  gl.clear(gl.COLOR_BUFFER_BIT);
}

export async function ab7RndInit() {
  outSys("Render system initializing");
  window.gl = canvas.getContext("webgl2", { antialias: false });

  gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
  gl.enable(gl.DEPTH_TEST);

  gl.projSize = 0.1;
  gl.projDist = gl.projSize;
  gl.farClip = 1847;

  await ab7ResInit();

  ab7RndCamSet(mth.vec3Set1(8), mth.vec3Set1(0), mth.vec3Set(0, 1, 0));
  ab7RndProjSet();
}