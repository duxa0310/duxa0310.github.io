async function AB7_RndShdLoadTextFromFile(filePath)
{
  const response = await fetch(filePath);
    
  if (!(response).ok)
  {
    alert("Cannot read shader file: " + filePath);
  }

  let sourceText = await response.text().then((text) => text);

  return sourceText;
}

async function AB7_RndShdCreate(shdFileNamePrefix)
{
  const program = gl.createProgram();
  const shdTypes =
  [
    ["vert", gl.VERTEX_SHADER, "#version 300 es\nprecision highp float;\n#define VERTEX_SHADER 1\n"],
    ["frag", gl.FRAGMENT_SHADER, "#version 300 es\nprecision highp float;\n#define FRAGMENT_SHADER 1\n"]
  ];

  for (let i = 0; i < shdTypes.length; i++)
  {
    let shdPath = "bin/shaders/" + shdFileNamePrefix + "/" + shdTypes[i][0] + ".glsl";
    let shdString = await AB7_RndShdLoadTextFromFile(shdPath);
    shdString = shdTypes[i][2] + shdString;

    const shader = gl.createShader(shdTypes[i][1]);
    gl.shaderSource(shader, shdString);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) 
    {
      alert(gl.getShaderInfoLog(shader));
    }
    else
    {
      outText("Loaded shader: " + shdPath);
    }
    gl.attachShader(program, shader);
  }
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) 
  {
    alert("Program linkage error");
  }
  else
  {
    outText("Created shader pack: " + shdFileNamePrefix);
  }
  return await program;
}

let AB7_RndShaders = [];

class Shader
{
  /* ATTRIBUTES:
   *   - shader prefix name:
   *       let name;
   *   - shader program object:
   *       let program;
   */

  constructor(shdFileNamePrefix) 
  {
    this.name = shdFileNamePrefix;
    this.program = AB7_RndShdCreate(shdFileNamePrefix).value;
    AB7_RndShaders.push(this);
  }

}

export function AB7_RndShdGetDef()
{
  return AB7_RndShaders[0];
}

export function AB7_RndShdInit()
{
  new Shader("default");
  outSys("Shaders initialized");
}

export function AB7_RndShdClose()
{
  while (AB7_RndShaders.length > 0) 
  {
    AB7_RndShaders.pop();
  }
}