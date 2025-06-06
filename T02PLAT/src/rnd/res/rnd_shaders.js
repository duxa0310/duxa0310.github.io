function ab7RndShdLoadTextFromFile(filePath) {
  if (filePath == "bin/shaders/default/vert.glsl") {
    return `layout(location = 0) in vec3 InPosition;
            layout(location = 1) in vec2 InTexCoord;
            layout(location = 2) in vec3 InNormal;
            layout(location = 3) in vec4 InColor;

            out vec3 DrawPos;
            out vec2 DrawTexCoord;
            out vec3 DrawNormal;
            out vec4 DrawColor;

            uniform mat4 MatrWVP;
            uniform mat4 MatrW;

            void main( void ) 
            {
              gl_Position = MatrWVP * vec4(InPosition, 1);
              mat4 MatrWInv = inverse(transpose(MatrW));

              DrawPos = (MatrW * vec4(InPosition, 1.0)).xyz;
              DrawTexCoord = InTexCoord;
              DrawNormal = mat3(MatrWInv) * InNormal;
              DrawColor = vec4(InColor);
            }`;
  }
  else if (filePath == "bin/shaders/default/frag.glsl") {
    return `layout(location = 0) out vec4 OutColor;
            in vec3 DrawPos;
            in vec2 DrawTexCoord;
            in vec3 DrawNormal;
            in vec4 DrawColor;

            uniform vec3 CamDir;

            void main()
            {
              float nl = max(0.30, dot(normalize(DrawNormal), -CamDir));

              OutColor = vec4(DrawColor.xyz * nl, DrawColor.w);
            }`;
  }
  /*
  const response = await fetch(filePath);
    
  if (!(response).ok)
  {
    alert("Cannot read shader file: " + filePath);
  }

  let sourceText = await response.text().then((text) => text);

  return sourceText;
  */
}

function ab7RndShdCreate(shdFileNamePrefix) {
  let program = gl.createProgram();
  const shdTypes =
    [
      ["vert", gl.VERTEX_SHADER, "#version 300 es\nprecision highp float;\n#define VERTEX_SHADER 1\n"],
      ["frag", gl.FRAGMENT_SHADER, "#version 300 es\nprecision highp float;\n#define FRAGMENT_SHADER 1\n"]
    ];

  for (let i = 0; i < shdTypes.length; i++) {
    let shdPath = "bin/shaders/" + shdFileNamePrefix + "/" + shdTypes[i][0] + ".glsl";
    let shdString = ab7RndShdLoadTextFromFile(shdPath);
    shdString = shdTypes[i][2] + shdString;

    const shader = gl.createShader(shdTypes[i][1]);
    gl.shaderSource(shader, shdString);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      alert(gl.getShaderInfoLog(shader));
    }
    else {
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
    this.program = ab7RndShdCreate(shdFileNamePrefix);
    ab7RndShaders.push(this);
  }

}

export function ab7RndShdGetDef() {
  return ab7RndShaders[0];
}

export function ab7RndShdInit() {
  new Shader("default");
  outSys("Shaders initialized");
}

export function ab7RndShdClose() {
  while (ab7RndShaders.length > 0) {
    ab7RndShaders.pop();
  }
}