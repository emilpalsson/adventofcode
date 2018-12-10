const { getInput } = require("../../utils");
const _input = getInput(true);

const parseInput = () => {
  const regex = /< *(-?\d+), *(-?\d+)> velocity=< *(-?\d+), *(-?\d+)/;
  return _input.map(row => {
    const match = regex.exec(row);
    return {
      positionX: parseInt(match[1]),
      positionY: parseInt(match[2]),
      velocityX: parseInt(match[3]),
      velocityY: parseInt(match[4])
    };
  });
};

const tick = () => {
  _points.forEach(point => {
    point.positionX += point.velocityX;
    point.positionY += point.velocityY;
  });
};

const tickBack = () => {
  _points.forEach(point => {
    point.positionX -= point.velocityX;
    point.positionY -= point.velocityY;
  });
};

const getSpread = () => {
  const xs = _points.map(p => p.positionX);
  const ys = _points.map(p => p.positionY);
  const maxX = Math.max(...xs);
  const minX = Math.min(...xs);
  const maxY = Math.max(...ys);
  const minY = Math.min(...ys);
  const distanceX = maxX - minX;
  const distanceY = maxY - minY;
  return distanceX * distanceY;
};

const getVisualization = () => {
  let sky = [];
  _points.forEach(point => {
    if (!sky[point.positionY]) {
      sky[point.positionY] = [];
    }
    sky[point.positionY][point.positionX] = true;
  });

  let rows = [];
  let paddingLeft = Infinity;
  for (let y = 0; y < sky.length; y++) {
    let row = "";
    if (sky[y]) {
      for (let x = 0; x < sky[y].length; x++) {
        row += sky[y][x] ? "#" : " ";
        if (sky[y][x]) {
          if (x < paddingLeft) paddingLeft = x;
        }
      }
      rows.push(row);
    }
  }
  rows = rows.map(row => row.substr(paddingLeft));
  return rows.join("\n");
};

const solve = () => {
  let lastSpread = Infinity;
  let seconds = 0;

  while (true) {
    seconds++;
    tick();
    const spread = getSpread();
    if (spread > lastSpread) {
      seconds--;
      tickBack();
      break;
    }
    lastSpread = spread;
  }

  return seconds;
};

const _points = parseInput();
const _seconds = solve();

console.log("#1:", "\n" + getVisualization()); // ZZCBGGCJ
console.log("#2:", _seconds); // 10886
