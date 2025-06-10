import * as mth from "../math/math.js"
import { Unit } from "./units.js";
import { ab7PrimCreateOBJ } from "../rnd/rnd_prim.js";
import { ab7RndMtlGetByName } from "../rnd/res/rnd_materials.js";

export class UnitCow extends Unit {
  constructor() {
    super();
    this.name = "Cow";
  }

  async init() {
    this.prim = await ab7PrimCreateOBJ("bin/models/cow.obj");
    this.prim.mtl = ab7RndMtlGetByName("cow-material");
  }

  response() { }

  render() {
    if (ab7.scene == 'cow') {
      this.prim.draw(mth.matrIdentity());
    }
  }
}