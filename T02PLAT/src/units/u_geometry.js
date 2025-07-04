import * as mth from "../math/math.js"
import { Unit } from "./units.js";
import {
  ab7RndPrimCreate,
  ab7RndPentagonFromIndicesCCW,
  ab7RndVerticesFromIndices,
  ab7RndPrimAutoNormals,
  ab7RndFloatListFromVertexList
} from "../rnd/rnd_prim.js";
import { ab7RndMtlGetByName, ab7RndMtlGetDef, matLib } from "../rnd/res/rnd_materials.js";

function ab7GeomGeneratePlaton(vertices, indices) {
  vertices = ab7RndVerticesFromIndices(vertices, indices);
  ab7RndPrimAutoNormals(vertices, Array.from(Array(vertices.length).keys()));
  return ab7RndPrimCreate(gl.TRIANGLES, ab7RndMtlGetDef(),
    ab7RndFloatListFromVertexList(vertices), []);
}

function ab7GeomPrimCreate(bodyName) {
  switch (bodyName) {
    case "tetrahedron":
      return ab7GeomGeneratePlaton(
        [
          [[1, 1, 1], [0, 0], [1, 1, 1], [1, 1, 1, 1]],
          [[-1, 1, -1], [0, 0], [-1, 1, -1], [1, 1, 1, 1]],
          [[1, -1, -1], [0, 0], [1, -1, -1], [1, 1, 1, 1]],
          [[-1, -1, 1], [0, 0], [-1, -1, 1], [1, 1, 1, 1]]
        ],
        [].concat(
          [0, 1, 2], [2, 0, 3], [3, 0, 1], [1, 2, 3]
        )
      );
    case "hexahedron":
      return ab7GeomGeneratePlaton(
        [
          [[-1, -1, -1], [0, 0], [-1, -1, -1], [1, 1, 1, 1]],
          [[-1, -1, 1], [0, 0], [-1, -1, 1], [1, 1, 1, 1]],
          [[-1, 1, -1], [0, 0], [-1, 1, -1], [1, 1, 1, 1]],
          [[-1, 1, 1], [0, 0], [-1, 1, 1], [1, 1, 1, 1]],
          [[1, -1, -1], [0, 0], [1, -1, -1], [1, 1, 1, 1]],
          [[1, -1, 1], [0, 0], [1, -1, 1], [1, 1, 1, 1]],
          [[1, 1, -1], [0, 0], [1, 1, -1], [1, 1, 1, 1]],
          [[1, 1, 1], [0, 0], [1, 1, 1], [1, 1, 1, 1]]
        ],
        [].concat(
          [0, 2, 3, 3, 0, 1], [1, 5, 7, 7, 3, 1], [1, 5, 4, 4, 1, 0],
          [0, 4, 6, 6, 0, 2], [2, 3, 6, 6, 3, 7], [7, 6, 5, 5, 4, 6]
        )
      );
    case "octahedron":
      return ab7GeomGeneratePlaton(
        [
          [[0, 1, 0], [0, 0], [0, 1, 0], [1, 1, 1, 1]],
          [[0, 0, -1], [0, 0], [0, 0, -1], [1, 1, 1, 1]],
          [[-1, 0, 0], [0, 0], [-1, 0, 0], [1, 1, 1, 1]],
          [[0, 0, 1], [0, 0], [0, 0, 1], [1, 1, 1, 1]],
          [[1, 0, 0], [0, 0], [1, 0, 0], [1, 1, 1, 1]],
          [[0, -1, 0], [0, 0], [0, -1, 0], [1, 1, 1, 1]]
        ],
        [].concat(
          [1, 0, 2], [2, 0, 3], [3, 0, 4],
          [4, 0, 1], [1, 5, 4], [4, 5, 3],
          [3, 5, 2], [2, 5, 1]
        )
      );
    case "icosahedron":
      return ab7GeomGeneratePlaton(
        [
          [[-1, mth.phi, 0], [0, 0], [-1, mth.phi, 0], [1, 1, 1, 1]],
          [[0, 1, -mth.phi], [0, 0], [0, 1, -mth.phi], [1, 1, 1, 1]],
          [[1, mth.phi, 0], [0, 0], [1, mth.phi, 0], [1, 1, 1, 1]],
          [[0, 1, mth.phi], [0, 0], [0, 1, mth.phi], [1, 1, 1, 1]],
          [[-mth.phi, 0, 1], [0, 0], [-mth.phi, 0, 1], [1, 1, 1, 1]],
          [[-mth.phi, 0, -1], [0, 0], [-mth.phi, 0, -1], [1, 1, 1, 1]],
          [[0, -1, -mth.phi], [0, 0], [0, -1, -mth.phi], [1, 1, 1, 1]],
          [[mth.phi, 0, -1], [0, 0], [mth.phi, 0, -1], [1, 1, 1, 1]],
          [[mth.phi, 0, 1], [0, 0], [mth.phi, 0, 1], [1, 1, 1, 1]],
          [[0, -1, mth.phi], [0, 0], [0, -1, mth.phi], [1, 1, 1, 1]],
          [[-1, -mth.phi, 0], [0, 0], [-1, -mth.phi, 0], [1, 1, 1, 1]],
          [[1, -mth.phi, 0], [0, 0], [1, -mth.phi, 0], [1, 1, 1, 1]]
        ],
        [].concat(
          [0, 1, 2], [0, 2, 3], [0, 3, 4], [0, 4, 5], [0, 5, 1],
          [1, 6, 7], [7, 1, 2], [2, 7, 8], [8, 2, 3], [3, 8, 9], [9, 3, 4], [4, 9, 10], [10, 4, 5], [5, 10, 6], [6, 5, 1],
          [7, 11, 8], [8, 11, 9], [9, 11, 10], [10, 11, 6], [6, 11, 7]
        )
      );
    case "dodecahedron":
      return ab7GeomGeneratePlaton(
        [
          [[mth.phi_inv, mth.phi, 0], [0, 0], [mth.phi_inv, mth.phi, 0], [1, 1, 1, 1]],
          [[-mth.phi_inv, mth.phi, 0], [0, 0], [-mth.phi_inv, mth.phi, 0], [1, 1, 1, 1]],
          [[-1, 1, -1], [0, 0], [-1, 1, -1], [1, 1, 1, 1]],
          [[0, mth.phi_inv, -mth.phi], [0, 0], [0, mth.phi_inv, -mth.phi], [1, 1, 1, 1]],
          [[1, 1, -1], [0, 0], [1, 1, -1], [1, 1, 1, 1]],
          [[1, 1, 1], [0, 0], [1, 1, 1], [1, 1, 1, 1]],
          [[0, mth.phi_inv, mth.phi], [0, 0], [0, mth.phi_inv, mth.phi], [1, 1, 1, 1]],
          [[-1, 1, 1], [0, 0], [-1, 1, 1], [1, 1, 1, 1]],
          [[-mth.phi, 0, mth.phi_inv], [0, 0], [-mth.phi, 0, mth.phi_inv], [1, 1, 1, 1]],
          [[-mth.phi, 0, -mth.phi_inv], [0, 0], [-mth.phi, 0, -mth.phi_inv], [1, 1, 1, 1]],
          [[-1, -1, -1], [0, 0], [-1, -1, -1], [1, 1, 1, 1]],
          [[0, -mth.phi_inv, -mth.phi], [0, 0], [0, -mth.phi_inv, -mth.phi], [1, 1, 1, 1]],
          [[1, -1, -1], [0, 0], [1, -1, -1], [1, 1, 1, 1]],
          [[mth.phi, 0, -mth.phi_inv], [0, 0], [mth.phi, 0, -mth.phi_inv], [1, 1, 1, 1]],
          [[mth.phi, 0, mth.phi_inv], [0, 0], [mth.phi, 0, mth.phi_inv], [1, 1, 1, 1]],
          [[1, -1, 1], [0, 0], [1, -1, 1], [1, 1, 1, 1]],
          [[mth.phi_inv, -mth.phi, 0], [0, 0], [mth.phi_inv, -mth.phi, 0], [1, 1, 1, 1]],
          [[-mth.phi_inv, -mth.phi, 0], [0, 0], [-mth.phi_inv, -mth.phi, 0], [1, 1, 1, 1]],
          [[-1, -1, 1], [0, 0], [-1, -1, 1], [1, 1, 1, 1]],
          [[0, -mth.phi_inv, mth.phi], [0, 0], [0, -mth.phi_inv, mth.phi], [1, 1, 1, 1]]
        ],
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
}

export class UnitGeometry extends Unit {
  constructor() {
    super();
    this.name = "Geometry";
    this.prims = [];
    this.matrs = [];
  }

  init() {
    this.tetrahedron = ab7GeomPrimCreate("tetrahedron");
    this.tetrahedron.mtl = ab7RndMtlGetByName("Ruby");
    this.hexahedron = ab7GeomPrimCreate("hexahedron");
    this.hexahedron.mtl = ab7RndMtlGetByName("Bronze");
    this.octahedron = ab7GeomPrimCreate("octahedron");
    this.octahedron.mtl = ab7RndMtlGetByName("Gold");
    this.icosahedron = ab7GeomPrimCreate("icosahedron");
    this.icosahedron.mtl = ab7RndMtlGetByName("Emerald");
    this.dodecahedron = ab7GeomPrimCreate("dodecahedron");
    this.dodecahedron.mtl = ab7RndMtlGetByName("Jade");

    let i = 1024;
    while (i-- > 0) {
      let prim, matr;
      switch ((Math.random() * 5) >> 0) {
        case 0:
          prim = ab7GeomPrimCreate("tetrahedron");
          break;
        case 1:
          prim = ab7GeomPrimCreate("hexahedron");
          break;
        case 2:
          prim = ab7GeomPrimCreate("octahedron");
          break;
        case 3:
          prim = ab7GeomPrimCreate("icosahedron")
          break;
        case 4:
          prim = ab7GeomPrimCreate("dodecahedron");
          break;
      }
      matr = mth.matrMulMatr(
        mth.matrTranslate(mth.vec3MulNum(
          mth.vec3Set(
            2 * Math.random() - 1,
            2 * Math.random() - 1,
            2 * Math.random() - 1
          ), 47 * (Math.random() + 0.5))),
        mth.matrRotate(
          30 * (2 * Math.random() - 1),
          mth.vec3Set(
            2 * Math.random() - 1,
            2 * Math.random() - 1,
            2 * Math.random() - 1
          )
        )
      );
      prim.mtl = ab7RndMtlGetByName(matLib[(Math.random() * matLib.length) >> 0][0]);
      this.prims.push(prim);
      this.matrs.push(matr);
    }
  }

  response() { }

  render() {
    const matrRotate = mth.matrMulMatr(mth.matrMulMatr(
      mth.matrRotateX(18 * ab7.time * (+ab7.rotate)),
      mth.matrRotateY(30 * ab7.time * (+ab7.rotate)),
    ), mth.matrRotateZ(47 * ab7.time * (+ab7.rotate)),
    );
    switch (ab7.scene) {
      case 'tetrahedron':
        this.tetrahedron.draw(
          mth.matrMulMatr(
            mth.matrMulMatr(
              mth.matrScale(mth.vec3Set1(5)),
              mth.matrRotateZ(-45)
            ),
            mth.matrMulMatr(
              mth.matrRotateX(35.4),
              matrRotate
            ),
          ));
        break;
      case 'hexahedron':
        this.hexahedron.draw(
          mth.matrMulMatr(
            mth.matrScale(mth.vec3Set1(6)),
            matrRotate
          )
        );
        break;
      case 'octahedron':
        this.octahedron.draw(
          mth.matrMulMatr(
            mth.matrScale(mth.vec3Set1(8)),
            matrRotate
          )
        );
        break;
      case 'icosahedron':
        this.icosahedron.draw(
          mth.matrMulMatr(
            mth.matrScale(mth.vec3Set1(4)),
            matrRotate
          )
        );
        break;
      case 'dodecahedron':
        this.dodecahedron.draw(
          mth.matrMulMatr(
            mth.matrScale(mth.vec3Set1(4)),
            matrRotate
          )
        );
        break;
      case 'chaos':
        for (let i = 0; i < this.prims.length; i++) {
          this.prims[i].draw(mth.matrMulMatr(matrRotate, this.matrs[i]));
        }
        break;
    }
  }
}