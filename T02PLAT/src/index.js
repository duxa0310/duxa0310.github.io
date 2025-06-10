import { Pane } from "tweakpane";

export async function ab7LoadTextFromFile(filePath) {
  const sourceText = fetch(filePath)
    .then((response) => response.text())
    .then((text) => text)
    .catch((err) => console.err(err));
  return sourceText;
}

export function ab7HtmlInit() {
  const pane = new Pane({
    title: 'INFORMATION & CONTROL PANEL',
    expanded: true,
  });

  const tab = pane.addTab({
    pages: [
      { title: 'Statistics' },
      { title: 'Parameters' },
    ],
  });

  tab.pages[0].addBinding(ab7, 'fps', {
    readonly: true,
    view: 'graph',
    min: 0,
    max: 120,
  });

  tab.pages[0].addBinding(ab7, 'timeDate', {
    readonly: true,
  });

  tab.pages[0].addBinding(ab7, 'globalTime', {
    readonly: true,
  });

  tab.pages[1].addBinding(ab7, 'showAxis');

  tab.pages[1].addBinding(ab7, 'rotate');

  tab.pages[1].addBinding(ab7, 'pause');

  tab.pages[1].addBinding(ab7, 'lightColor', {
    picker: 'inline'
  });

  tab.pages[1].addBinding(ab7, 'scene', {
    options: {
      tetrahedron: 'tetrahedron',
      hexahedron: 'hexahedron',
      octahedron: 'octahedron',
      icosahedron: 'icosahedron',
      dodecahedron: 'dodecahedron',
      chaos: 'chaos',
      cow: 'cow',
    },
  });
}

export function ab7HtmlResponse() {
  ab7.timeDate = new Date().toLocaleString().replaceAll("/", ".").split(", ").reverse().join(" ");
}