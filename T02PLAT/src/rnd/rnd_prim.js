import { ab7LoadTextFromFile } from "../index.js";
import * as mth from "../math/math.js"
import { ab7RndMtlGetByName, ab7RndMtlGetDef } from "./res/rnd_materials.js";

export function ab7RndPrimAutoNormals(vertices, indices) {
  for (let i = 0; i < vertices.length; i++) {
    vertices[i][2] = mth.vec3Set1(0);
  }
  for (let i = 0; i < indices.length; i += 3) {
    const n0 = indices[i], n1 = indices[i + 1], n2 = indices[i + 2];
    const p0 = vertices[n0][0], p1 = vertices[n1][0], p2 = vertices[n2][0];
    const n = mth.vec3Normalize(
      mth.vec3CrossVec3(mth.vec3SubVec3(p1, p0), mth.vec3SubVec3(p2, p0))
    );
    vertices[n0][2] = mth.vec3AddVec3(vertices[n0][2], n);
    vertices[n1][2] = mth.vec3AddVec3(vertices[n1][2], n);
    vertices[n2][2] = mth.vec3AddVec3(vertices[n2][2], n);
  }
  for (let i = 0; i < vertices.length; i++) {
    vertices[i][2] = mth.vec3Normalize(vertices[i][2]);
  }
}

export function ab7RndVerticesFromIndices(vertices, indices) {
  const vertexList = [];
  for (let i = 0; i < indices.length; i++) {
    vertexList.push(structuredClone(vertices[indices[i]]));
  }
  return vertexList;
}

export function ab7RndCreateVertex(p, t, n, c) {
  return p.concat(t, n, c);
}

export function ab7RndFloatListFromVertexList(vertices) {
  let list = [];
  for (let i = 0; i < vertices.length; i++) {
    list = list.concat(ab7RndCreateVertex(vertices[i][0], vertices[i][1], vertices[i][2], vertices[i][3]));
  }
  return list;
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

function ab7HexStringToVec3(str) {
  const n1 = parseInt(str.substring(1, 3), 16) / 255;
  const n2 = parseInt(str.substring(3, 5), 16) / 255;
  const n3 = parseInt(str.substring(5, 7), 16) / 255;
  return [n1, n2, n3];
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

  draw(matrWorld) {
    this.mtl.apply();

    gl.uniform3fv(gl.getUniformLocation(this.mtl.shd.program, "CamDir"), new Float32Array(ab7.camDir), 0, 0);
    gl.uniform3fv(gl.getUniformLocation(this.mtl.shd.program, "CamLoc"), new Float32Array(ab7.camLoc), 0, 0);

    gl.uniform3fv(gl.getUniformLocation(this.mtl.shd.program, "LightDir"), new Float32Array(ab7.lightDir), 0, 0);
    gl.uniform3fv(gl.getUniformLocation(this.mtl.shd.program, "LightColor"), new Float32Array(ab7HexStringToVec3(ab7.lightColor)), 0, 0);

    gl.uniformMatrix4fv(gl.getUniformLocation(this.mtl.shd.program, "MatrW"), false,
      new Float32Array(matrWorld[0].concat(matrWorld[1]).concat(matrWorld[2]).concat(matrWorld[3])));

    ab7.matrWVP = mth.matrMulMatr(matrWorld, ab7.matrVP);
    gl.uniformMatrix4fv(gl.getUniformLocation(this.mtl.shd.program, "MatrWVP"), false,
      new Float32Array(ab7.matrWVP[0].concat(ab7.matrWVP[1]).concat(ab7.matrWVP[2]).concat(ab7.matrWVP[3])));

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

export async function ab7PrimCreateOBJ(url) {
  const modelSrc = await ab7LoadTextFromFile(url);
  const lines = modelSrc.split("\n");
  const isSpace = function (c) { return c == ' ' || c == '\n' || c == '\t'; }
  let nV = 0, nF = 0, nI = 0;
  let v = 0, f = 0, vn = 0;
  /* Count vertices and facets */
  for (let j = 0; j < lines.length; j++) {
    const line = lines[j];
    if (line[0] == 'v' && line[1] == ' ') {
      nV++;
    } else if (line[0] == 'f' && line[1] == ' ') {
      let n = 0;
      for (let i = 2; i < line.length; i++) {
        if (!isSpace(line[i]) && isSpace(line[i - 1])) {
          n++;
        }
      }
      nF += n - 2;
    }
  }
  nI = nF * 3;
  const vertices = new Array(nV), indices = new Array(nI);
  /* Set vertices and indices */
  for (let j = 0; j < lines.length; j++) {
    const line = lines[j];
    if (line[0] == 'v' && line[1] == ' ') {
      if (vertices[v] == undefined) {
        vertices[v] = [[0, 0, 0], [0, 0], [0, 0, 0], [1, 1, 1, 1]];
      }
      vertices[v++][0] = line.substring(2).split(' ').map((c) => parseFloat(c));
    } else if (line[0] == 'v' && line[1] == 'n' && line[2] == ' ') {
      if (vertices[vn] == undefined) {
        vertices[vn] = [[0, 0, 0], [0, 0], [0, 0, 0], [1, 1, 1, 1]];
      }
      vertices[vn++][2] = line.substring(3).split(' ').map((c) => parseFloat(c));
    } else if (line[0] == 'f' && line[1] == ' ') {
      let n = 0, c = 0, c0 = 0, c1 = 0;
      for (let i = 2; i < line.length; i++) {
        if (!isSpace(line[i]) && isSpace(line[i - 1])) {
          c = parseInt(line.substring(i).split("(\s|\\\\)")[0]);
          if (c < 0) {
            c += v;
          } else {
            c--;
          }
          if (n == 0) {
            c0 = c;
          } else if (n == 1) {
            c1 = c;
          } else {
            indices[f++] = c0;
            indices[f++] = c1;
            indices[f++] = c;
            c1 = c;
          }
          n++;
        }
      }
    }
  }
  return new Primitive(gl.TRIANGLES, ab7RndMtlGetDef(),
    ab7RndFloatListFromVertexList(vertices), indices);
}