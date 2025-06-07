/* Constants */

export const phi = (Math.sqrt(5) + 1) / 2;
export const phi_inv = (Math.sqrt(5) - 1) / 2;

/* Angles */

export function radiansToDegrees(a) {
  return a * 180 / Math.PI;
}

export function degreesToRadians(a) {
  return a * Math.PI / 180;
}

/* Vectors */

export function vec3Set(x, y, z) {
  return [x, y, z];
}

export function vec3Set1(i) {
  return [i, i, i];
}

export function vec3Len(v) {
  let len2 = vec3DotVec3(v, v);

  return Math.pow(len2, 0.5);
}

export function vec3MulNum(v, n) {
  return vec3Set(v[0] * n, v[1] * n, v[2] * n);
}

export function vec3DivNum(v, n) {
  return vec3Set(v[0] / n, v[1] / n, v[2] / n);
}

export function vec3AddVec3(v1, v2) {
  return vec3Set(
    v1[0] + v2[0],
    v1[1] + v2[1],
    v1[2] + v2[2]
  );
}

export function vec3SubVec3(v1, v2) {
  return vec3Set(
    v1[0] - v2[0],
    v1[1] - v2[1],
    v1[2] - v2[2]
  );
}

export function vec3DotVec3(v1, v2) {
  return v1[0] * v2[0] + v1[1] * v2[1] + v1[2] * v2[2];
}

export function vec3CrossVec3(v1, v2) {
  return vec3Set(
    v1[1] * v2[2] - v1[2] * v2[1],
    v1[2] * v2[0] - v1[0] * v2[2],
    v1[0] * v2[1] - v1[1] * v2[0]
  );
}

export function vec3Normalize(v) {
  let len2 = vec3DotVec3(v, v);

  if (len2 == 0)
    return vec3Set1(0);
  else
    return vec3DivNum(v, Math.pow(len2, 0.5));
}

export function pointTransform(v, m) {
  return vec3Set(
    v[0] * m[0][0] + v[1] * m[1][0] + v[2] * m[2][0] + m[3][0],
    v[0] * m[0][1] + v[1] * m[1][1] + v[2] * m[2][1] + m[3][1],
    v[0] * m[0][2] + v[1] * m[1][2] + v[2] * m[2][2] + m[3][2]
  );
}

/* Matrices */

export function matrSet(a00, a01, a02, a03,
  a10, a11, a12, a13,
  a20, a21, a22, a23,
  a30, a31, a32, a33) {
  return [[a00, a01, a02, a03], [a10, a11, a12, a13], [a20, a21, a22, a23], [a30, a31, a32, a33]];
}

export function matrIdentity() {
  return matrSet(
    1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1
  );
}

export function matrMulMatr(m1, m2) {
  return matrSet(
    m1[0][0] * m2[0][0] + m1[0][1] * m2[1][0] + m1[0][2] * m2[2][0] + m1[0][3] * m2[3][0],
    m1[0][0] * m2[0][1] + m1[0][1] * m2[1][1] + m1[0][2] * m2[2][1] + m1[0][3] * m2[3][1],
    m1[0][0] * m2[0][2] + m1[0][1] * m2[1][2] + m1[0][2] * m2[2][2] + m1[0][3] * m2[3][2],
    m1[0][0] * m2[0][3] + m1[0][1] * m2[1][3] + m1[0][2] * m2[2][3] + m1[0][3] * m2[3][3],
    m1[1][0] * m2[0][0] + m1[1][1] * m2[1][0] + m1[1][2] * m2[2][0] + m1[1][3] * m2[3][0],
    m1[1][0] * m2[0][1] + m1[1][1] * m2[1][1] + m1[1][2] * m2[2][1] + m1[1][3] * m2[3][1],
    m1[1][0] * m2[0][2] + m1[1][1] * m2[1][2] + m1[1][2] * m2[2][2] + m1[1][3] * m2[3][2],
    m1[1][0] * m2[0][3] + m1[1][1] * m2[1][3] + m1[1][2] * m2[2][3] + m1[1][3] * m2[3][3],
    m1[2][0] * m2[0][0] + m1[2][1] * m2[1][0] + m1[2][2] * m2[2][0] + m1[2][3] * m2[3][0],
    m1[2][0] * m2[0][1] + m1[2][1] * m2[1][1] + m1[2][2] * m2[2][1] + m1[2][3] * m2[3][1],
    m1[2][0] * m2[0][2] + m1[2][1] * m2[1][2] + m1[2][2] * m2[2][2] + m1[2][3] * m2[3][2],
    m1[2][0] * m2[0][3] + m1[2][1] * m2[1][3] + m1[2][2] * m2[2][3] + m1[2][3] * m2[3][3],
    m1[3][0] * m2[0][0] + m1[3][1] * m2[1][0] + m1[3][2] * m2[2][0] + m1[3][3] * m2[3][0],
    m1[3][0] * m2[0][1] + m1[3][1] * m2[1][1] + m1[3][2] * m2[2][1] + m1[3][3] * m2[3][1],
    m1[3][0] * m2[0][2] + m1[3][1] * m2[1][2] + m1[3][2] * m2[2][2] + m1[3][3] * m2[3][2],
    m1[3][0] * m2[0][3] + m1[3][1] * m2[1][3] + m1[3][2] * m2[2][3] + m1[3][3] * m2[3][3]
  );
}

export function matrMulMatr3(m1, m2, m3) {
  return matrMulMatr(matrMulMatr(m1, m2), m3);
}

export function matrView(loc, at, up1) {
  let dir = vec3Normalize(vec3SubVec3(at, loc));
  let right = vec3Normalize(vec3CrossVec3(dir, up1));
  let up = vec3Normalize(vec3CrossVec3(right, dir));

  return matrSet(
    right[0], up[0], -dir[0], 0,
    right[1], up[1], -dir[1], 0,
    right[2], up[2], -dir[2], 0,
    -vec3DotVec3(loc, right), -vec3DotVec3(loc, up), vec3DotVec3(loc, dir), 1
  );
}

export function matrOrtho(l, r, b, t, n, f) {
  return matrSet(
    2 / (r - l), 0, 0, 0,
    0, 2 / (t - b), 0, 0,
    0, 0, -2 / (f - n), 0,
    -(r + l) / (r - l), -(t + b) / (t - b), -(f + n) / (f - n), 1
  );
}

export function matrFrustum(l, r, b, t, n, f) {
  return matrSet(
    2 * n / (r - l), 0, 0, 0,
    0, 2 * n / (t - b), 0, 0,
    (r + l) / (r - l), (t + b) / (t - b), -(f + n) / (f - n), -1,
    0, 0, -2 * n * f / (f - n), 0
  );
}

export function matrTranslate(t) {
  return matrSet(
    1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    t[0], t[1], t[2], 1
  );
}

export function matrScale(s) {
  return matrSet(
    s[0], 0, 0, 0,
    0, s[1], 0, 0,
    0, 0, s[2], 0,
    0, 0, 0, 1
  );
}

export function matrRotateX(angleInDegrees) {
  const
    s = Math.sin(degreesToRadians(angleInDegrees)),
    c = Math.cos(degreesToRadians(angleInDegrees));

  return matrSet(
    1, 0, 0, 0,
    0, c, s, 0,
    0, -s, c, 0,
    0, 0, 0, 1
  );
}

export function matrRotateY(angleInDegrees) {
  const
    s = Math.sin(degreesToRadians(angleInDegrees)),
    c = Math.cos(degreesToRadians(angleInDegrees));

  return matrSet(
    c, 0, -s, 0,
    0, 1, 0, 0,
    s, -0, c, 0,
    0, 0, 0, 1
  );
}
export function matrRotateZ(angleInDegrees) {
  const
    s = Math.sin(degreesToRadians(angleInDegrees)),
    c = Math.cos(degreesToRadians(angleInDegrees));

  return matrSet(
    c, s, 0, 0,
    -s, c, s, 0,
    0, -s, c, 0,
    0, 0, 0, 1
  );
}

export function matrRotate(angleInDegrees, r) {
  const
    s = Math.sin(degreesToRadians(angleInDegrees)),
    c = Math.cos(degreesToRadians(angleInDegrees)),
    x = r[0], y = r[1], z = r[2];

  return matrSet(
    x * x * (1 - c) + c, x * y * (1 - c) + z * s, x * z * (1 - c) - y * s, 0,
    x * y * (1 - c) - z * s, y * y * (1 - c) + c, y * z * (1 - c) + x * s, 0,
    x * z * (1 - c) + y * s, y * z * (1 - c) - x * s, z * z * (1 - c) + c, 0,
    0, 0, 0, 1
  );
}

export function vec3MulMatr(v, m) {
  const w = v[0] * m[0][3] + v[1] * m[1][3] + v[2] * m[2][3] + m[3][3];

  return vec3Set(
    (v[0] * m[0][0] + v[1] * m[1][0] + v[2] * m[2][0] + m[3][0]) / w,
    (v[0] * m[0][1] + v[1] * m[1][1] + v[2] * m[2][1] + m[3][1]) / w,
    (v[0] * m[0][2] + v[1] * m[1][2] + v[2] * m[2][2] + m[3][2]) / w
  );
}
