/* Vectors */

export function vec3Set(x, y, z) {
  return [x, y, z];
}

export function vec3Set1(i) {
  return [i, i, i];
}

export function vec3MulNum(v, n) {
  return vec3Set(v[0] * n, v[1] * n, v[2] * n);
}

export function vec3DivNum(v, n) {
  return vec3Set(v[0] / n, v[1] / n, v[2] / n);
}

export function vec3AddVec3(v1, v2) {
  return vec3Set(v1[0] + v2[0],
    v1[1] + v2[1],
    v1[2] + v2[2]);
}

export function vec3SubVec3(v1, v2) {
  return vec3Set(v1[0] - v2[0],
    v1[1] - v2[1],
    v1[2] - v2[2]);
}

export function vec3DotVec3(v1, v2) {
  return v1[0] * v2[0] + v1[1] * v2[1] + v1[2] * v2[2];
}

export function vec3CrossVec3(v1, v2) {
  return vec3Set(v1[1] * v2[2] - v1[2] * v2[1],
    v1[2] * v2[0] - v1[0] * v2[2],
    v1[0] * v2[1] - v1[1] * v2[0]);
}

export function vec3Normalize(v) {
  let len2 = vec3DotVec3(v, v);

  if (len2 == 0)
    return vec3Set1(0);
  else
    return vec3DivNum(v, Math.pow(len2, 0.5));
}

/* matrices */

export function matrSet(a00, a01, a02, a03,
  a10, a11, a12, a13,
  a20, a21, a22, a23,
  a30, a31, a32, a33) {
  return [[a00, a01, a02, a03], [a10, a11, a12, a13], [a20, a21, a22, a23], [a30, a31, a32, a33]];
}

export function matrIdentity() {
  return matrSet(1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1);
}

export function matrMulMatr(m1, m2) {
  return matrSet(m1[0][0] * m2[0][0] + m1[0][1] * m2[1][0] + m1[0][2] * m2[2][0] + m1[0][3] * m2[3][0],
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
    m1[3][0] * m2[0][3] + m1[3][1] * m2[1][3] + m1[3][2] * m2[2][3] + m1[3][3] * m2[3][3]);
}

export function matrView(loc, at, up1) {
  let dir = vec3Normalize(vec3SubVec3(at, loc));
  let right = vec3Normalize(vec3CrossVec3(dir, up1));
  let up = vec3Normalize(vec3CrossVec3(right, dir));

  return matrSet(right[0], up[0], -dir[0], 0,
    right[1], up[1], -dir[1], 0,
    right[2], up[2], -dir[2], 0,
    -vec3DotVec3(loc, right), -vec3DotVec3(loc, up), vec3DotVec3(loc, dir), 1);
}

export function matrFrustum(l, r, b, t, n, f) {
  return matrSet(2 * n / (r - l), 0, 0, 0,
    0, 2 * n / (t - b), 0, 0,
    (r + l) / (r - l), (t + b) / (t - b), -(f + n) / (f - n), -1,
    0, 0, -2 * n * f / (f - n), 0);
}