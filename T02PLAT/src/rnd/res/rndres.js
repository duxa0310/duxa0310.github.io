import {AB7_ShdInit} from "./rndshaders.js"
import {AB7_BufInit} from "./rndbuffers.js"

export function AB7_ResInit()
{
  conOut("Resources starting");
  AB7_ShdInit();
  AB7_BufInit();
}