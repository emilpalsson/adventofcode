const { getInput } = require("../../utils");
const input = getInput(true).map((line) => line.split("").map(Number));

const mapWidth = input[0].length;
const mapHeight = input.length;

const getNeighbours = (x, y) => {
  const neighbours = [];
  if (y > 0) neighbours.push({ x, y: y - 1 });
  if (y < mapHeight - 1) neighbours.push({ x, y: y + 1 });
  if (x > 0) neighbours.push({ x: x - 1, y });
  if (x < mapWidth - 1) neighbours.push({ x: x + 1, y });
  return neighbours;
};

const hasLowerNeighbour = (x, y) => {
  return getNeighbours(x, y).some((point) => input[point.y][point.x] <= input[y][x]);
};

const findLowestPoints = () => {
  const lowestPoints = [];
  for (let x = 0; x < mapWidth; x++) {
    for (let y = 0; y < mapHeight; y++) {
      if (!hasLowerNeighbour(x, y)) {
        lowestPoints.push({ x, y });
      }
    }
  }
  return lowestPoints;
};

const getPointId = ({ x, y }) => `${x},${y}`;

const countBasinSize = (lowestPoint) => {
  const seenPoints = new Set();

  const traverse = (x, y) => {
    seenPoints.add(getPointId({ x, y }));
    getNeighbours(x, y)
      .filter((point) => input[point.y][point.x] < 9)
      .filter((point) => !seenPoints.has(getPointId(point)))
      .forEach((point) => {
        traverse(point.x, point.y);
      });
  };
  traverse(lowestPoint.x, lowestPoint.y);

  return seenPoints.size;
};

const part1 = () => {
  return findLowestPoints().reduce((sum, point) => sum + input[point.y][point.x] + 1, 0);
};

const part2 = () => {
  const biggestBasinSizes = findLowestPoints()
    .map(countBasinSize)
    .sort((a, b) => b - a)
    .slice(0, 3);

  return biggestBasinSizes[0] * biggestBasinSizes[1] * biggestBasinSizes[2];
};

console.log("#1:", part1()); // 452
console.log("#2:", part2()); // 1263735
