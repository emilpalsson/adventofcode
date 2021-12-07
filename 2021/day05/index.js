const { getInput } = require("../../utils");
const input = getInput(true)
  .map((line) => line.split(/ -> |,/).map(Number))
  .map(([x1, y1, x2, y2]) => ({ x1, y1, x2, y2 }));

const isHorizontalOrVertical = (line) => line.x1 === line.x2 || line.y1 === line.y2;

const getPointsAlongLine = (line) => {
  let x = line.x1;
  let y = line.y1;
  const points = [`${x},${y}`];
  while (x !== line.x2 || y !== line.y2) {
    if (x < line.x2) x++;
    if (x > line.x2) x--;
    if (y < line.y2) y++;
    if (y > line.y2) y--;
    points.push(`${x},${y}`);
  }
  return points;
};

const countIntersections = (lines) => {
  const pointCounter = new Map();
  lines.forEach((line) => {
    getPointsAlongLine(line).forEach((point) => {
      pointCounter[point] = (pointCounter[point] || 0) + 1;
    });
  });
  return Object.values(pointCounter).filter((val) => val > 1).length;
};

const part1 = () => {
  return countIntersections(input.filter(isHorizontalOrVertical));
};

const part2 = () => {
  return countIntersections(input);
};

console.log("#1:", part1()); // 5280
console.log("#2:", part2()); // 16716
