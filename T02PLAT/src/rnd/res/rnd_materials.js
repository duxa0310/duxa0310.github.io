import * as mth from "../../math/math.js"
import { ab7RndShdGetByName, ab7RndShdGetDef } from "./rnd_shaders.js";

let ab7RndMaterials = [];

export class Material {
  /* ATTRIBUTES:
   *   - material name:
   *       let name;
   *   - llumination coefficients:
   *       let ka, kd, ks;
   *   - phong power coefficient:
   *       let ph;
   *   - transparency factor:
   *       let trans;
   *   - base shader pack:
   *       let shd;
   */

  constructor(name, ka, kd, ks, ph, trans, shd) {
    this.name = name;
    this.ka = ka;
    this.kd = kd;
    this.ks = ks;
    this.ph = ph;
    this.trans = trans;
    this.shd = shd;
    ab7RndMaterials.push(this);
    outText("Created material: " + name);
  }

  apply() {
    gl.useProgram(this.shd.program);

    gl.uniform3fv(gl.getUniformLocation(this.shd.program, "Ka"),
      new Float32Array(this.ka), 0, 0);
    gl.uniform4fv(gl.getUniformLocation(this.shd.program, "KdTrans"),
      new Float32Array(this.kd.concat(this.trans)), 0, 0);
    gl.uniform4fv(gl.getUniformLocation(this.shd.program, "KsPh"),
      new Float32Array(this.ks.concat(this.trans)), 0, 0);
  }
}

export function ab7RndMtlGetDef() {
  return ab7RndMaterials[0];
}

export function ab7RndMtlGetByName(mtlName) {
  for (let i = 1; i < ab7RndMaterials.length; i++) {
    if (ab7RndMaterials[i].name == mtlName)
      return ab7RndMaterials[i];
  }
  return ab7RndMtlGetDef();
}

export function ab7RndMtlInit() {
  outSys("Materials initializing");
  new Material("default",
    mth.vec3Set(0.8, 0.47, 0.3), mth.vec3Set1(0.5), mth.vec3Set1(0.3), 30, 1.0,
    ab7RndShdGetDef());
  new Material("axis-material",
    mth.vec3Set1(0.1), mth.vec3Set1(0.9), mth.vec3Set1(0.3), 30, 1.0,
    ab7RndShdGetByName("axis"));
}