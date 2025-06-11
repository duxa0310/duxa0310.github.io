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

  async addTex(id, url) {

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

export const matLib = [
  ["Void", [0.0, 0.0, 0.0], [0.0, 0.0, 0.0], [0.0, 0.0, 0.0], 0],
  ["Black Plastic", [0.0, 0.0, 0.0], [0.01, 0.01, 0.01], [0.5, 0.5, 0.5], 32],
  ["Brass", [0.329412, 0.223529, 0.027451], [0.780392, 0.568627, 0.113725], [0.992157, 0.941176, 0.807843], 27.8974],
  ["Bronze", [0.2125, 0.1275, 0.054], [0.714, 0.4284, 0.18144], [0.393548, 0.271906, 0.166721], 25.6],
  ["Chrome", [0.25, 0.25, 0.25], [0.4, 0.4, 0.4], [0.774597, 0.774597, 0.774597], 76.8],
  ["Copper", [0.19125, 0.0735, 0.0225], [0.7038, 0.27048, 0.0828], [0.256777, 0.137622, 0.086014], 12.8],
  ["Gold", [0.24725, 0.1995, 0.0745], [0.75164, 0.60648, 0.22648], [0.628281, 0.555802, 0.366065], 51.2],
  ["Peweter", [0.10588, 0.058824, 0.113725], [0.427451, 0.470588, 0.541176], [0.3333, 0.3333, 0.521569], 9.84615],
  ["Silver", [0.19225, 0.19225, 0.19225], [0.50754, 0.50754, 0.50754], [0.508273, 0.508273, 0.508273], 51.2],
  ["Polished Silver", [0.23125, 0.23125, 0.23125], [0.2775, 0.2775, 0.2775], [0.773911, 0.773911, 0.773911], 89.6],
  ["Turquoise", [0.1, 0.18725, 0.1745], [0.396, 0.74151, 0.69102], [0.297254, 0.30829, 0.306678], 12.8],
  ["Ruby", [0.1745, 0.01175, 0.01175], [0.61424, 0.04136, 0.04136], [0.727811, 0.626959, 0.626959], 76.8],
  ["Polished Gold", [0.24725, 0.2245, 0.0645], [0.34615, 0.3143, 0.0903], [0.797357, 0.723991, 0.208006], 83.2],
  ["Polished Bronze", [0.25, 0.148, 0.06475], [0.4, 0.2368, 0.1036], [0.774597, 0.458561, 0.200621], 76.8],
  ["Polished Copper", [0.2295, 0.08825, 0.0275], [0.5508, 0.2118, 0.066], [0.580594, 0.223257, 0.0695701], 51.2],
  ["Jade", [0.135, 0.2225, 0.1575], [0.135, 0.2225, 0.1575], [0.316228, 0.316228, 0.316228], 12.8],
  ["Obsidian", [0.05375, 0.05, 0.06625], [0.18275, 0.17, 0.22525], [0.332741, 0.328634, 0.346435], 38.4],
  ["Pearl", [0.25, 0.20725, 0.20725], [1.0, 0.829, 0.829], [0.296648, 0.296648, 0.296648], 11.264],
  ["Emerald", [0.0215, 0.1745, 0.0215], [0.07568, 0.61424, 0.07568], [0.633, 0.727811, 0.633], 76.8],
  ["Black Plastic", [0.0, 0.0, 0.0], [0.01, 0.01, 0.01], [0.5, 0.5, 0.5], 32.0],
  ["Black Rubber", [0.02, 0.02, 0.02], [0.01, 0.01, 0.01], [0.4, 0.4, 0.4], 10.0],
];


function ab7RndMtlLoadDict() {
  for (let i = 0; i < matLib.length; i++) {
    new Material(matLib[i][0], matLib[i][1], matLib[i][2], matLib[i][3], matLib[i][4], 1.0, ab7RndShdGetDef());
  }
}

export async function ab7RndMtlInit() {
  outSys("Materials initializing");
  new Material("default",
    mth.vec3Set1(0.7), mth.vec3Set1(0.8), mth.vec3Set1(0.3), 30, 1.0,
    ab7RndShdGetDef());
  new Material("axis-material",
    mth.vec3Set1(0.1), mth.vec3Set1(0.9), mth.vec3Set1(0.3), 30, 1.0,
    ab7RndShdGetByName("axis"));
  new Material("cow-material",
    mth.vec3Set(0.8, 0.47, 0.30), mth.vec3Set1(0.5), mth.vec3Set1(0),
    8, 1.0, ab7RndShdGetByName("low_poly"));
  ab7RndMtlLoadDict();
}