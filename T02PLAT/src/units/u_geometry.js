import * as mth from "../math/math.js"
import { Unit } from "./units.js";
import {
  ab7RndPrimCreate,
  ab7RndCreateVertex,
  ab7RndPentagonFromIndicesCCW
} from "../rnd/rnd_prim.js";
import { ab7RndMtlGetDef } from "../rnd/res/rnd_materials.js";

export class UnitGeometry extends Unit {
  constructor() {
    super();
    this.name = "Geometry";
  }

  init() {
    this.tetrahedron = ab7RndPrimCreate(gl.TRIANGLES, ab7RndMtlGetDef(),
      [].concat(
        ab7RndCreateVertex([1, 1, 1], [0, 0], [1, 1, 1], [1, 0, 0, 1]),
        ab7RndCreateVertex([-1, 1, -1], [0, 0], [-1, 1, -1], [1, 0, 0, 1]),
        ab7RndCreateVertex([1, -1, -1], [0, 0], [1, -1, -1], [1, 0, 0, 1]),
        ab7RndCreateVertex([-1, -1, 1], [0, 0], [-1, -1, 1], [1, 0, 0, 1])),
      [].concat(
        [0, 1, 2], [2, 0, 3], [3, 0, 1], [1, 2, 3])
    );
    this.hexahedron = ab7RndPrimCreate(gl.TRIANGLES, ab7RndMtlGetDef(),
      [].concat(
        ab7RndCreateVertex([-1, -1, -1], [0, 0], [-1, -1, -1], [1, 0, 0, 1]),
        ab7RndCreateVertex([-1, -1, 1], [0, 0], [-1, -1, 1], [1, 0.25, 0, 1]),
        ab7RndCreateVertex([-1, 1, -1], [0, 0], [-1, 1, -1], [1, 0.5, 0, 1]),
        ab7RndCreateVertex([-1, 1, 1], [0, 0], [-1, 1, 1], [1, 0.75, 0, 1]),
        ab7RndCreateVertex([1, -1, -1], [0, 0], [1, -1, -1], [0.75, 1, 0, 1]),
        ab7RndCreateVertex([1, -1, 1], [0, 0], [1, -1, 1], [0.5, 1, 0, 1]),
        ab7RndCreateVertex([1, 1, -1], [0, 0], [1, 1, -1], [0.25, 1, 0, 1]),
        ab7RndCreateVertex([1, 1, 1], [0, 0], [1, 1, 1], [0, 1, 0, 1])),
      [].concat(
        [0, 2, 3, 3, 0, 1], [1, 5, 7, 7, 3, 1], [1, 5, 4, 4, 1, 0], [0, 4, 6, 6, 0, 2], [2, 3, 6, 6, 3, 7], [7, 6, 5, 5, 4, 6])
    );
    this.octahedron = ab7RndPrimCreate(gl.TRIANGLES, ab7RndMtlGetDef(),
      [].concat(
        ab7RndCreateVertex([0, 1, 0], [0, 0], [0, 1, 0], [1, 0, 0, 1]),
        ab7RndCreateVertex([0, 0, -1], [0, 0], [0, 0, -1], [1, 0.5, 0, 1]),
        ab7RndCreateVertex([-1, 0, 0], [0, 0], [-1, 0, 0], [1, 1, 0, 1]),
        ab7RndCreateVertex([0, 0, 1], [0, 0], [0, 0, 1], [0.5, 1, 0, 1]),
        ab7RndCreateVertex([1, 0, 0], [0, 0], [1, 0, 0], [1, 1, 0, 1]),
        ab7RndCreateVertex([0, -1, 0], [0, 0], [0, -1, 0], [1, 1, 0.5, 1])),
      [].concat(
        [1, 0, 2], [2, 0, 3], [3, 0, 4], [4, 0, 1], [1, 5, 4], [4, 5, 3], [3, 5, 2], [2, 5, 1])
    );
    this.icosahedron = ab7RndPrimCreate(gl.TRIANGLES, ab7RndMtlGetDef(),
      [].concat(
        ab7RndCreateVertex([-1, mth.phi, 0], [0, 0], [-1, mth.phi, 0], [1, 0.25, 0, 1]),
        ab7RndCreateVertex([0, 1, -mth.phi], [0, 0], [0, 1, -mth.phi], [1, 0.5, 0, 1]),
        ab7RndCreateVertex([1, mth.phi, 0], [0, 0], [1, mth.phi, 0], [1, 0.75, 0, 1]),
        ab7RndCreateVertex([0, 1, mth.phi], [0, 0], [0, 1, mth.phi], [1, 1, 0, 1]),
        ab7RndCreateVertex([-mth.phi, 0, 1], [0, 0], [-mth.phi, 0, 1], [0.75, 1, 0, 1]),
        ab7RndCreateVertex([-mth.phi, 0, -1], [0, 0], [-mth.phi, 0, -1], [0.5, 1, 0, 1]),
        ab7RndCreateVertex([0, -1, -mth.phi], [0, 0], [0, -1, -mth.phi], [0.25, 1, 0, 1]),
        ab7RndCreateVertex([mth.phi, 0, -1], [0, 0], [mth.phi, 0, -1], [0, 1, 0, 1]),
        ab7RndCreateVertex([mth.phi, 0, 1], [0, 0], [mth.phi, 0, 1], [0, 1, 0.25, 1]),
        ab7RndCreateVertex([0, -1, mth.phi], [0, 0], [0, -1, mth.phi], [0, 1, 0.5, 1]),
        ab7RndCreateVertex([-1, -mth.phi, 0], [0, 0], [-1, -mth.phi, 0], [0, 0, 0.75, 1]),
        ab7RndCreateVertex([1, -mth.phi, 0], [0, 0], [1, -mth.phi, 0], [0, 1, 1, 1])),
      [].concat(
        [0, 1, 2], [0, 2, 3], [0, 3, 4], [0, 4, 5], [0, 5, 1],
        [1, 6, 7], [7, 1, 2], [2, 7, 8], [8, 2, 3], [3, 8, 9], [9, 3, 4], [4, 9, 10], [10, 4, 5], [5, 10, 6], [6, 5, 1],
        [7, 11, 8], [8, 11, 9], [9, 11, 10], [10, 11, 6], [6, 11, 7])
    );
    this.dodecahedron = ab7RndPrimCreate(gl.TRIANGLES, ab7RndMtlGetDef(),
      [].concat(
        ab7RndCreateVertex([mth.phi_inv, mth.phi, 0], [0, 0], [mth.phi_inv, mth.phi, 0], [1, 0, 0, 1]),
        ab7RndCreateVertex([-mth.phi_inv, mth.phi, 0], [0, 0], [-mth.phi_inv, mth.phi, 0], [1, 0, 0, 1]),
        ab7RndCreateVertex([-1, 1, -1], [0, 0], [-1, 1, -1], [1, 0, 0, 1]),
        ab7RndCreateVertex([0, mth.phi_inv, -mth.phi], [0, 0], [0, mth.phi_inv, -mth.phi], [1, 0, 0, 1]),
        ab7RndCreateVertex([1, 1, -1], [0, 0], [1, 1, -1], [1, 0, 0, 1]),
        ab7RndCreateVertex([1, 1, 1], [0, 0], [1, 1, 1], [1, 1, 0, 1]),
        ab7RndCreateVertex([0, mth.phi_inv, mth.phi], [0, 0], [0, mth.phi_inv, mth.phi], [1, 1, 0, 1]),
        ab7RndCreateVertex([-1, 1, 1], [0, 0], [-1, 1, 1], [1, 1, 0, 1]),
        ab7RndCreateVertex([-mth.phi, 0, mth.phi_inv], [0, 0], [-mth.phi, 0, mth.phi_inv], [1, 1, 0, 1]),
        ab7RndCreateVertex([-mth.phi, 0, -mth.phi_inv], [0, 0], [-mth.phi, 0, -mth.phi_inv], [1, 1, 0, 1]),
        ab7RndCreateVertex([-1, -1, -1], [0, 0], [-1, -1, -1], [0, 1, 0, 1]),
        ab7RndCreateVertex([0, -mth.phi_inv, -mth.phi], [0, 0], [0, -mth.phi_inv, -mth.phi], [0, 1, 0, 1]),
        ab7RndCreateVertex([1, -1, -1], [0, 0], [1, -1, -1], [0, 1, 0, 1]),
        ab7RndCreateVertex([mth.phi, 0, -mth.phi_inv], [0, 0], [mth.phi, 0, -mth.phi_inv], [0, 1, 0, 1]),
        ab7RndCreateVertex([mth.phi, 0, mth.phi_inv], [0, 0], [mth.phi, 0, mth.phi_inv], [0, 1, 0, 1]),
        ab7RndCreateVertex([1, -1, 1], [0, 0], [1, -1, 1], [0, 0, 1, 1]),
        ab7RndCreateVertex([mth.phi_inv, -mth.phi, 0], [0, 0], [mth.phi_inv, -mth.phi, 0], [0, 0, 1, 1]),
        ab7RndCreateVertex([-mth.phi_inv, -mth.phi, 0], [0, 0], [-mth.phi_inv, -mth.phi, 0], [0, 0, 1, 1]),
        ab7RndCreateVertex([-1, -1, 1], [0, 0], [-1, -1, 1], [0, 0, 1, 1]),
        ab7RndCreateVertex([0, -mth.phi_inv, mth.phi], [0, 0], [0, -mth.phi_inv, mth.phi], [0, 0, 1, 1])),
      [].concat(
        ab7RndPentagonFromIndicesCCW([0, 1, 2, 3, 4]),
        ab7RndPentagonFromIndicesCCW([0, 5, 6, 7, 1]),
        ab7RndPentagonFromIndicesCCW([1, 7, 8, 9, 2]),
        ab7RndPentagonFromIndicesCCW([2, 9, 10, 11, 3]),
        ab7RndPentagonFromIndicesCCW([3, 11, 12, 13, 4]),
        ab7RndPentagonFromIndicesCCW([0, 4, 13, 14, 5]),
        ab7RndPentagonFromIndicesCCW([6, 5, 14, 15, 19]),
        ab7RndPentagonFromIndicesCCW([8, 7, 6, 19, 18]),
        ab7RndPentagonFromIndicesCCW([18, 17, 10, 9, 8]),
        ab7RndPentagonFromIndicesCCW([12, 11, 10, 17, 16]),
        ab7RndPentagonFromIndicesCCW([16, 17, 18, 19, 15]),
        ab7RndPentagonFromIndicesCCW([16, 15, 14, 13, 12])
      )
    );
  }

  response() { }

  render() {
    this.tetrahedron.draw(mth.matrTranslate(mth.vec3Set(0, 3.0, 0)));
    this.hexahedron.draw(mth.matrTranslate(mth.vec3Set(0, -3.0, 0)));
    this.octahedron.draw(mth.matrTranslate(mth.vec3Set(-1.8, 0, 1.8)));
    this.icosahedron.draw(mth.matrTranslate(mth.vec3Set(3.0, 0, -3.0)));
    this.dodecahedron.draw(mth.matrIdentity());
  }
}