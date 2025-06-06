layout(location = 0) out vec4 OutColor;

in vec3 DrawPos;
in vec2 DrawTexCoord;
in vec3 DrawNormal;
in vec4 DrawColor;

uniform vec3 CamDir;

void main()
{
  float nl = max(0.30, dot(normalize(DrawNormal), -CamDir));

  OutColor = vec4(DrawColor.xyz * nl, DrawColor.w);
}