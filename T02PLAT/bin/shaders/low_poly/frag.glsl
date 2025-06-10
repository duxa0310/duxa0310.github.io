layout(location = 0) out vec4 OutColor;

in vec3 DrawPos;
in vec2 DrawTexCoord;
in vec3 DrawNormal;
in vec4 DrawColor;

uniform vec3 CamDir;
uniform vec3 CamLoc;
uniform vec3 LightDir;
uniform vec3 LightColor;

uniform vec3 Ka;
uniform vec4 KdTrans;
uniform vec4 KsPh;

vec3 Shade( vec3 Pos, vec3 N, vec3 Kd, vec3 Ks, float Ph, vec3 L, vec3 LC ) {
  vec3 color = vec3(0), V = normalize(Pos - CamLoc);
 
  N = faceforward(N, V, N);

  /* Diffuse color */
  color += 0.47 * max(0.1, dot(N, L)) * Kd * LC;

  /* Specular color */
  vec3 R = reflect(V, N);
  color += 2.0 * pow(max(0.1, dot(R, L)), Ph) * Ks * LC;
  
  return color;
}

void main()
{
  OutColor = vec4((Ka * DrawColor.xyz + Shade(DrawPos, normalize(DrawNormal), 
    KdTrans.xyz, KsPh.xyz, KsPh.w, normalize(LightDir), LightColor)), 
      DrawColor.w); 
}