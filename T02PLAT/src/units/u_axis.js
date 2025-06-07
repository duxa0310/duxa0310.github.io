import * as mth from "../math/math.js"
import { Unit } from "./units.js";
import {
  ab7RndPrimCreate,
  ab7RndCreateVertex
} from "../rnd/rnd_prim.js";
import { ab7RndMtlGetDef } from "../rnd/res/rnd_materials.js";

export class UnitAxis extends Unit {
  constructor() {
    super();
    this.name = "Axis";
  }

  init() {
    this.prim = ab7RndPrimCreate(gl.LINES, ab7RndMtlGetDef(),
      [].concat(
        ab7RndCreateVertex([0, 0, 0], [0, 0], [0, 0, 0], [1, 0, 0, 1]),
        ab7RndCreateVertex([1847, 0, 0], [0, 0], [0, 0, 0], [1, 0, 0, 1]),
        ab7RndCreateVertex([0, 0, 0], [0, 0], [0, 0, 0], [0, 1, 0, 1]),
        ab7RndCreateVertex([0, 1847, 0], [0, 0], [0, 0, 0], [0, 1, 0, 1]),
        ab7RndCreateVertex([0, 0, 0], [0, 0], [0, 0, 0], [0, 0, 1, 1]),
        ab7RndCreateVertex([0, 0, 1847], [0, 0], [0, 0, 0], [0, 0, 1, 1])),
      []);
  }

  response() { }

  render() {
    this.prim.draw(mth.matrIdentity());
  }
}