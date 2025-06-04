/* Vectors */

export function Vec3Set(x, y, z)
{
  return [x, y, z];
}

export function Vec3Set1(i)
{
  return [i, i, i];
}

export function Vec3MulNum(v, n)
{
  return Vec3Set(v[0] * n, v[1] * n, v[2] * n);
}

export function Vec3DivNum(v, n)
{
  return Vec3Set(v[0] / n, v[1] / n, v[2] / n);
}

export function Vec3AddVec3(v1, v2)
{
  return Vec3Set(v1[0] + v2[0], 
                 v1[1] + v2[1], 
                 v1[2] + v2[2]);
}

export function Vec3SubVec3(v1, v2)
{
  return Vec3Set(v1[0] - v2[0], 
                 v1[1] - v2[1], 
                 v1[2] - v2[2]);
}

export function Vec3DotVec3(v1, v2)
{
  return v1[0] * v2[0] + v1[1] * v2[1] + v1[2] * v2[2];
}

export function Vec3CrossVec3(v1, v2)
{
  return Vec3Set(v1[1] * v2[2] - v1[2] * v2[1], 
                 v1[2] * v2[0] - v1[0] * v2[2], 
                 v1[0] * v2[1] - v1[1] * v2[0]);
}

export function Vec3Normalize(v)
{
  let len2 = Vec3DotVec3(v, v);

  if (len2 == 0)
    return Vec3Set1(0);
  else
    return Vec3DivNum(v, Math.pow(len2, 0.5));
}

/* Matrices */

export function MatrSet(a00, a01, a02, a03,
                        a10, a11, a12, a13,
                        a20, a21, a22, a23,
                        a30, a31, a32, a33)
{
  return [[a00, a01, a02, a03], [a10, a11, a12, a13], [a20, a21, a22, a23], [a30, a31, a32, a33]];
}

export function MatrMulMatr(m1, m2)
{
  return MatrSet(m1[0][0] * m2[0][0] + m1[0][1] * m2[1][0] + m1[0][2] * m2[2][0] + m1[0][3] * m2[3][0],
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

export function MatrView(loc, at, up1)
{
  let dir = Vec3Normalize(Vec3SubVec3(at, loc));
  let right = Vec3Normalize(Vec3CrossVec3(dir, up1));
  let up = Vec3Normalize(Vec3CrossVec3(right, dir));

  return MatrSet(right[0], up[0], -dir[0], 0,
                 right[1], up[1], -dir[1], 0,
                 right[2], up[2], -dir[2], 0,
                 -Vec3DotVec3(loc, right), -Vec3DotVec3(loc, up), Vec3DotVec3(loc, dir), 1);
}

export function MatrFrustum(l, r, b, t, n, f)
{
  return MatrSet(2 * n / (r - l),   0,                 0,                    0,
                 0,                 2 * n / (t - b),   0,                    0,
                 (r + l) / (r - l), (t + b) / (t - b), -(f + n) / (f - n),   -1,
                 0,                 0,                 -2 * n * f / (f - n), 0);
}