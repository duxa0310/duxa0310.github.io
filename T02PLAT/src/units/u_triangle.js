import * as mth from "../math/math.js"
import { Unit } from "./units.js";
import {
  ab7RndPrimCreate,
  ab7RndCreateVertex
} from "../rnd/rnd_prim.js";
import { ab7RndMtlGetDef } from "../rnd/res/rnd_materials.js";

export class UnitTriangle extends Unit {
  constructor() {
    super();
    this.name = "Triangle";
  }

  init() {
    this.prim = ab7RndPrimCreate(gl.TRIANGLES, ab7RndMtlGetDef(),
      [].concat(
        ab7RndCreateVertex([0, 1, 0], [0, 0], [0, 0, 0], [0.96, 0.95, 0.41, 1]),
        ab7RndCreateVertex([1, 0, 0], [0, 0], [0, 0, 0], [0.36, 0.70, 0.44, 1]),
        ab7RndCreateVertex([0, 0, 1], [0, 0], [0, 0, 0], [0.78, 0.98, 0.84, 1])),
      []);
  }

  response() { }

  render() {
    this.prim.draw(mth.matrIdentity());
  }
}