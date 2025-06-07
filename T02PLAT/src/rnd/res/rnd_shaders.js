async function ab7RndShdLoadTextFromFile(filePath) {
  const sourceText = fetch(filePath)
    .then((response) => response.text())
    .then((text) => text)
    .catch((err) => console.err(err));
  return sourceText;
}

async function ab7RndShdCreate(shdFileNamePrefix) {
  let program = gl.createProgram();
  const shdTypes =
    [
      ["vert", gl.VERTEX_SHADER, "#version 300 es\nprecision highp float;\n#define VERTEX_SHADER 1\n"],
      ["frag", gl.FRAGMENT_SHADER, "#version 300 es\nprecision highp float;\n#define FRAGMENT_SHADER 1\n"]
    ];

  for (let i = 0; i < shdTypes.length; i++) {
    let shdPath = "bin/shaders/" + shdFileNamePrefix + "/" + shdTypes[i][0] + ".glsl";
    let shdString = await ab7RndShdLoadTextFromFile(shdPath);
    shdString = shdTypes[i][2] + shdString;

    const shader = gl.createShader(shdTypes[i][1]);
    gl.shaderSource(shader, shdString);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      alert(gl.getShaderInfoLog(shader));
    } else {
      outText("Loaded shader: " + shdPath);
    }
    gl.attachShader(program, shader);
  }
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    alert("Program linkage error");
  }
  else {
    outText("Created shader pack: " + shdFileNamePrefix);
  }
  return program;
}

let ab7RndShaders = [];

class Shader {
  /* ATTRIBUTES:
   *   - shader prefix name:
   *       let name;
   *   - shader program object:
   *       let program;
   */

  constructor(shdFileNamePrefix) {
    this.name = shdFileNamePrefix;
  }

  async init() {
    this.program = await ab7RndShdCreate(this.name);
    ab7RndShaders.push(this);
  }

}

export function ab7RndShdGetDef() {
  return ab7RndShaders[0];
}

export function ab7RndShdGetByName(name) {
  for (let i = 1; i < ab7RndShaders.length; i++) {
    if (ab7RndShaders[i].name == name)
      return ab7RndShaders[i];
  }
  return ab7RndShdGetDef();
}

export async function ab7RndShdInit() {
  outSys("Shaders initializing");
  await new Shader("default").init();
  await new Shader("axis").init();
}

export function ab7RndShdClose() {
  while (ab7RndShaders.length > 0) {
    ab7RndShaders.pop();
  }
}