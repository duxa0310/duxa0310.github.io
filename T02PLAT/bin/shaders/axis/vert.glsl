layout(location = 0) in vec3 InPosition;
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
}