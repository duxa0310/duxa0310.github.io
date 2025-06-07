import { ab7RndShdInit } from "./rnd_shaders.js"
import { ab7RndMtlInit } from "./rnd_materials.js";

export function ab7ResInit() {
  ab7RndShdInit();
  ab7RndMtlInit();
}