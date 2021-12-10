const { getInput } = require("../../utils");
const input = getInput(true).map((line) => line.split("").map(Number));

const mapWidth = input[0].length;
const mapHeight = input.length;

const hasLowerNeighbour = (x, y) => {
  const height = input[y][x];
  if (y > 0 && input[y - 1][x] <= height) return true;
  if (y < mapHeight - 1 && input[y + 1][x] <= height) return true;
  if (x > 0 && input[y][x - 1] <= height) return true;
  if (x < mapWidth - 1 && input[y][x + 1] <= height) return true;
  return false;
};

const part1 = () => {
  let riskLevel = 0;

  for (let x = 0; x < mapWidth; x++) {
    for (let y = 0; y < mapHeight; y++) {
      if (!hasLowerNeighbour(x, y)) {
        riskLevel += input[y][x] + 1;
      }
    }
  }

  return riskLevel;
};

const part2 = () => {
  return 0;
};

console.log("#1:", part1()); // 452
// console.log("#2:", part2()); // 0
