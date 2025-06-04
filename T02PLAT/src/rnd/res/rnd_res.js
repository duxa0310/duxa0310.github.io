import { ab7RndShdInit } from "./rnd_shaders.js"
import { ab7BufInit } from "./rnd_buffers.js"

export function ab7ResInit() {
  ab7RndShdInit();
  ab7BufInit();
}