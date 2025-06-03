import {AB7_RndShdInit} from "./rnd_shaders.js"
import {AB7_BufInit} from "./rnd_buffers.js"

export function AB7_ResInit()
{
  AB7_RndShdInit();
  AB7_BufInit();
}