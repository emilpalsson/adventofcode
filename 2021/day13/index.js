const { getInput } = require("../../utils");
const input = getInput(false).replace(/\r\n/g, "\n");

const parseInput = () => {
  let [points, folds] = input.split("\n\n");
  points = points
    .split("\n")
    .map((p) => p.split(","))
    .map((p) => ({ x: Number(p[0]), y: Number(p[1]) }));
  folds = folds
    .split("\n")
    .map((f) => f.split(/[ =]/))
    .map((f) => ({ direction: f[2], position: f[3] }));
  return { points, folds };
};

const hasDot = (points, x, y) => points.some((p) => p.x === x && p.y === y);

const fold = (points, direction, position) => {
  const belowTheFold = points.filter((p) => p[direction] > position);
  belowTheFold.forEach((p) => (p[direction] = position * 2 - p[direction]));
};

const part1 = () => {
  const { points, folds } = parseInput();
  fold(points, folds[0].direction, folds[0].position);
  const uniqueDots = new Set(points.map(({ x, y }) => `${x},${y}`));
  return uniqueDots.size;
};

const part2 = () => {
  const { points, folds } = parseInput();
  folds.forEach((x) => fold(points, x.direction, x.position));

  const sizeY = Math.max(...points.map(({ y }) => y));
  const sizeX = Math.max(...points.map(({ x }) => x));

  const code = [];
  for (let y = 0; y <= sizeY; y++) {
    code[y] = [];
    for (let x = 0; x <= sizeX; x++) {
      code[y][x] = hasDot(points, x, y) ? "#" : " ";
    }
  }

  return code.map((y) => y.join("")).join("\n");
};

console.log("#1:", part1()); // 618
console.log(`#2:\n${part2()}`); // ALREKFKU
