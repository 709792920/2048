import './js/weapp-adapter.js';
const ctx = canvas.getContext('2d');

let data = [
  [0, 0, 0, 0],
  [0, 4, 0, 0],
  [0, 0, 2, 0],
  [0, 0, 8, 0]
];

import Render from './js/render.js';
var render = new Render(ctx, data);

render.drawBg();
render.drawSquare();
render.listen();