const unitList = [];

export class Unit {
  constructor() { }

  init() { }
  response() { }
  render() { }
}

export function ab7UnitAdd(u) {
  outText("Unit created: " + u.name);
  unitList.push(u);
}

export function ab7UnitsInit() {
  for (let i = 0; i < unitList.length; i++) {
    unitList[i].init();
  }
}

export function ab7UnitsResponse() {
  for (let i = 0; i < unitList.length; i++) {
    unitList[i].response();
  }
}

export function ab7UnitsRender() {
  for (let i = 0; i < unitList.length; i++) {
    unitList[i].render();
  }
}