let shdTypes;

async function AB7_RndShdGetStringsByPath(shdFileName)
{
  let path = "bin/shaders/" + shdFileName + "/"

  let strings = [];
  for (let i = 0; i < shdTypes.length; i++)
  {
    const response = await fetch(path + shdTypes[i][1]);
    
    if (!(response).ok)
    {
      alert("Cant read shader");
      continue;
    }

    let sourceText = await response.text().then((t) => t);
    strings.push(sourceText);
  }
  return strings;
}

function AB7_RndShdCompile(shaderString, glType)
{
  const shader = gl.createShader(glType);

  gl.shaderSource(shader, shaderString);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) 
  {
    alert(gl.getShaderInfoLog(shader));
  }

  return shader;
}

export let shdList = [];

async function AB7_RndShdCreate(shdFileName)
{
  let strings = await AB7_RndShdGetStringsByPath(shdFileName);

  const program = gl.createProgram();
  let shaders = [];
  for (let i = 0; i < strings.length; i++)
  {
    let shader = AB7_RndShdCompile(strings[i], shdTypes[i][0]);
    shaders.push(shader);
    gl.attachShader(program, shader);
  }
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    alert("Program linkage error");
  }
  gl.useProgram(program);
  shdList.push(shaders);
}

export async function AB7_ShdInit()
{
  conOut("Shaders starting");
  shdTypes = 
  [
    [gl.VERTEX_SHADER, "vert.glsl"],
    [gl.FRAGMENT_SHADER, "frag.glsl"]
  ];
  AB7_RndShdCreate("default");
  conLog(shdList);
}