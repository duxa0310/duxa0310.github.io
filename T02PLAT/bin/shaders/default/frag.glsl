layout(location = 0) out vec4 OutColor;

void main()
{
  float x = gl_FragCoord.x, y = gl_FragCoord.y;
  OutColor = vec4(0.30, 0.47, 0.8, 1.0);
}