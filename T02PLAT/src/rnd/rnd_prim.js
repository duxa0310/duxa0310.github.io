import { AB7_RndShdGetDef } from "./res/rnd_shaders.js";

let AB7_RndPrimitives = [];

/* vec3 Pos;
 * vec2 TexCoord;
 * vec3 Normal;
 * vec4 Color;
 */
const vertexSizeBytes = 48;

export function AB7_RndPrimCreate(type, vertices, indices)
{
  return new Primitive(type, vertices, indices);
} 

class Primitive
{
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
   */

  constructor(type, vertices, indices) 
  {
    this.type = type;
    /* Vertices data */
    if (vertices.length > 0)
    {
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
    if (indices.length > 0)
    {
      this.iBuf = gl.createBuffer();
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.iBuf);
      gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Int32Array(indices), gl.STATIC_DRAW);
      this.numOfElements = indices.length;
    }
    else
    {
      this.numOfElements = vertices.length;
    }
    outText("Created primitive: " + new String(4 * vertices.length / vertexSizeBytes) + " vertices, " + new String(indices.length) + " indices");
  }

  free() 
  {
    gl.bindVertexArray(this.vA);
    gl.deleteBuffer(this.vBuf);
    gl.deleteVertexArray(this.vA);
  }

  draw(worldMatrix)
  {
    let shd = AB7_RndShdGetDef();
    gl.useProgram(shd.program);
    console.log("View matrix: ");
    console.log(gl.matrView);
    console.log("Projection matrix: ");
    console.log(gl.matrProj);
    console.log("WVP matrix: ");
    console.log(gl.matrVP);
    gl.uniformMatrix4fv(gl.getUniformLocation(shd.program, "MatrWVP"), true, 
      new Float32Array(gl.matrVP[0].concat(gl.matrVP[1]).concat(gl.matrVP[2]).concat(gl.matrVP[3])));
    gl.bindVertexArray(this.vA);
    if (this.iBuf == undefined)
    {
      gl.drawArrays(this.type, 0, this.numOfElements);
    }
    else
    {
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.iBuf);
      gl.drawElements(this.type, this.numOfElements, gl.UNSIGNED_BYTE, 0);
    }
  }
}

export function AB7_RndPrimInit()
{
  outSys("Primitives initialized");
}