import { Material } from "./res/rnd_materials.js";
import * as mth from "../math/math.js"

export function ab7RndCreateVertex(p, t, n, c) {
  return p.concat(t, n, c);
}

export function ab7RndPentagonFromIndicesCCW(indices) {
  return [].concat(
    [indices[0], indices[1], indices[2]],
    [indices[2], indices[0], indices[3]],
    [indices[3], indices[4], indices[0]]
  );
}

/* vec3 Pos;
 * vec2 TexCoord;
 * vec3 Normal;
 * vec4 Color;
 */
const vertexSizeBytes = 48;

export function ab7RndPrimCreate(type, mtl, vertices, indices) {
  return new Primitive(type, mtl, vertices, indices);
}

export class Primitive {
  /* ATTRIBUTES:
   *   - primitive type:
   *       let type;
   *   - vertex array:
   *       let vA;
   *   - vertex buffer:
   *       let vBuf;
   *   - index buffer:
   *       let iBuf;
   *   - number of elements:
   *       len numOfElements;
   *   - material:
   *       len mtl;
   */

  constructor(type, mtl, vertices, indices) {
    this.type = type;
    this.mtl = mtl;
    /* Vertices data */
    if (vertices.length > 0) {
      this.vBuf = gl.createBuffer();
      this.vA = gl.createVertexArray();

      gl.bindVertexArray(this.vA);
      gl.bindBuffer(gl.ARRAY_BUFFER, this.vBuf);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
      gl.bindBuffer(gl.ARRAY_BUFFER, this.vBuf);

      gl.enableVertexAttribArray(0);
      gl.enableVertexAttribArray(1);
      gl.enableVertexAttribArray(2);
      gl.enableVertexAttribArray(3);

      gl.vertexAttribPointer(0, 3, gl.FLOAT, false, vertexSizeBytes, 0);  /* p */
      gl.vertexAttribPointer(1, 2, gl.FLOAT, false, vertexSizeBytes, 12); /* t */
      gl.vertexAttribPointer(2, 3, gl.FLOAT, false, vertexSizeBytes, 20); /* n */
      gl.vertexAttribPointer(3, 4, gl.FLOAT, false, vertexSizeBytes, 32); /* c */
    }
    /* Indices data */
    if (indices.length > 0) {
      this.iBuf = gl.createBuffer();
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.iBuf);
      gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Int32Array(indices), gl.STATIC_DRAW);
      this.numOfElements = indices.length;
    }
    else {
      this.numOfElements = vertices.length;
    }
    outText("Created primitive: " + new String(4 * vertices.length / vertexSizeBytes) + " vertices");
  }

  draw(worldmatrix) {
    this.mtl.apply();

    gl.uniform3fv(gl.getUniformLocation(this.mtl.shd.program, "CamDir"), new Float32Array(gl.camDir), 0, 0);
    gl.uniform3fv(gl.getUniformLocation(this.mtl.shd.program, "CamLoc"), new Float32Array(gl.camLoc), 0, 0);

    gl.uniform3fv(gl.getUniformLocation(this.mtl.shd.program, "LightDir"), new Float32Array(gl.lightDir), 0, 0);

    gl.uniformMatrix4fv(gl.getUniformLocation(this.mtl.shd.program, "MatrW"), false,
      new Float32Array(worldmatrix[0].concat(worldmatrix[1]).concat(worldmatrix[2]).concat(worldmatrix[3])));

    gl.matrWVP = mth.matrMulMatr(worldmatrix, gl.matrVP);
    gl.uniformMatrix4fv(gl.getUniformLocation(this.mtl.shd.program, "MatrWVP"), false,
      new Float32Array(gl.matrWVP[0].concat(gl.matrWVP[1]).concat(gl.matrWVP[2]).concat(gl.matrWVP[3])));

    gl.bindVertexArray(this.vA);

    if (this.iBuf == undefined) {
      gl.drawArrays(this.type, 0, this.numOfElements);
    }
    else {
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.iBuf);
      gl.drawElements(this.type, this.numOfElements, gl.UNSIGNED_INT, 0);
    }
  }
}

export function ab7RndPrimInit() {
  outSys("Primitives initializing");
}