import * as mth from "../math/math.js"
import { Unit } from "./units.js";

export class UnitTimer extends Unit {
  constructor() {
    super();
    this.name = "Timer";
  }

  init() {
    this.pauseTime = 0;
    this.oldTime = performance.now() / 1000;
    this.oldTimeFPS = 0;
    this.frameCounter = 0;
    this.timePerFPS = 1.0;
  }

  response() {
    ab7.globalTime = performance.now() / 1000;
    ab7.globalDeltaTime = ab7.globalTime - this.oldTime;
    if (ab7.pause) {
      ab7.deltaTime = 0;
      this.pauseTime += ab7.globalDeltaTime;
    } else {
      ab7.deltaTime = ab7.globalDeltaTime;
      ab7.time = ab7.globalTime - this.pauseTime;
    }
    this.frameCounter++;
    if (ab7.globalTime - this.oldTimeFPS > this.timePerFPS) {
      ab7.fps = this.frameCounter * this.timePerFPS / (ab7.globalTime - this.oldTimeFPS);
      this.oldTimeFPS = ab7.globalTime;
      this.frameCounter = 0;
    }
    this.oldTime = ab7.globalTime;
  }

  render() { }
}