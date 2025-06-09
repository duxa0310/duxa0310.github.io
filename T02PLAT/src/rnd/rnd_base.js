import * as mth from "../math/math.js"
import { ab7ResInit } from "./res/rnd_res.js"

export function ab7RndCamSet(loc, at, up) {
  ab7.camLoc = loc;
  ab7.camAt = at;
  ab7.matrView = mth.matrView(loc, at, up);
  ab7.camRight = mth.vec3Set(
    ab7.matrView[0][0],
    ab7.matrView[1][0],
    ab7.matrView[2][0]
  );
  ab7.camUp = mth.vec3Set(
    ab7.matrView[0][1],
    ab7.matrView[1][1],
    ab7.matrView[2][1]);
  ab7.camDir = mth.vec3Set(
    -ab7.matrView[0][2],
    -ab7.matrView[1][2],
    -ab7.matrView[2][2]);
}

export function ab7RndProjSet() {
  let rx, ry;
  rx = ry = ab7.projSize;

  ab7.frameW = document.documentElement.clientWidth;
  ab7.frameH = document.documentElement.clientHeight;

  if (ab7.frameW >= ab7.frameH) {
    rx *= ab7.frameW / ab7.frameH;
  }
  else {
    ry *= ab7.frameH / ab7.frameW;
  }
  ab7.matrProj = mth.matrFrustum(-rx / 2, rx / 2, -ry / 2, ry / 2, ab7.projDist, ab7.farClip);
  ab7.matrVP = mth.matrMulMatr(ab7.matrView, ab7.matrProj);
  gl.viewportWidth = ab7.frameW;
  gl.viewportHeight = ab7.frameH;
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

  ab7.projSize = 0.1;
  ab7.projDist = ab7.projSize;
  ab7.farClip = 1847;

  await ab7ResInit();

  ab7RndCamSet(mth.vec3Set1(18), mth.vec3Set1(0), mth.vec3Set(0, 1, 0));
  ab7RndProjSet();
}