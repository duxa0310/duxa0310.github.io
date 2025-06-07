import { ab7RndShdInit } from "./rnd_shaders.js"
import { ab7RndMtlInit } from "./rnd_materials.js";

export async function ab7ResInit() {
  await ab7RndShdInit();
  ab7RndMtlInit();
}