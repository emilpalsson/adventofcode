const { getInput } = require("../../utils");
const input = getInput(true).map((line) => line.split(""));

const mapHeight = input.length;
const mapWidth = input[0].length;

const testSlope = (vx, vy) => {
  let x = 0;
  let y = 0;
  let hits = 0;

  const move = () => {
    x = (x + vx) % mapWidth;
    y += vy;
    if (input[y][x] === "#") {
      hits++;
    }
  };

  while (y < mapHeight - 1) {
    move();
  }

  return hits;
};

const part1 = () => {
  return testSlope(3, 1);
};

const part2 = () => {
  return testSlope(1, 1) * testSlope(3, 1) * testSlope(5, 1) * testSlope(7, 1) * testSlope(1, 2);
};

console.log("#1:", part1()); // 252
console.log("#2:", part2()); // 2608962048
