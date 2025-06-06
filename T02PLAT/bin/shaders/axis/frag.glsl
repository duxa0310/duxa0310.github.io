layout(location = 0) out vec4 OutColor;

in vec3 DrawPos;
in vec2 DrawTexCoord;
in vec3 DrawNormal;
in vec4 DrawColor;

void main()
{
  OutColor = vec4(DrawColor.xyz, 1.0);
}