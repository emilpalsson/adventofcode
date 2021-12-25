const { getInput } = require("../../utils");
const input = getInput(false).replace(/\r\n/g, "\n");

let [initialPoints, folds] = input.split("\n\n");
initialPoints = initialPoints
  .split("\n")
  .map((x) => x.split(","))
  .map(([x, y]) => ({ x: Number(x), y: Number(y) }));
folds = folds
  .split("\n")
  .map((x) => x.split(/[ =]/))
  .map(([_1, _2, direction, position]) => ({ direction, position }));

const getMaxX = (points) => Math.max(...points.map(({ x }) => x));
const getMaxY = (points) => Math.max(...points.map(({ y }) => y));
const hasDot = (points, x, y) => points.some((p) => p.x === x && p.y === y);

const fold = (points, direction, position) => {
  const belowTheFold = points.filter((p) => p[direction] > position);
  belowTheFold.forEach((p) => (p[direction] = position * 2 - p[direction]));
};

const countUnique = (points) => new Set(points.map(({ x, y }) => `${x},${y}`)).size;

const print = (points) => {
  const maxY = getMaxY(points);
  const maxX = getMaxX(points);

  const apa = [];
  for (let y = 0; y <= maxY; y++) {
    apa[y] = [];
    for (let x = 0; x <= maxX; x++) {
      apa[y][x] = hasDot(points, x, y) ? "#" : " ";
    }
  }

  console.log(apa.map((y) => y.join("")).join("\n"));
};

const part1 = () => {
  fold(initialPoints, folds[0].direction, folds[0].position);

  // print(initialPoints);
  // fold(initialPoints, "y", 7);
  // print(initialPoints);
  // fold(initialPoints, "x", 5);
  // print(initialPoints);

  return countUnique(initialPoints);
};

const part2 = () => {
  folds.forEach((x) => fold(initialPoints, x.direction, x.position));
  print(initialPoints);

  return 0;
};

// console.log("#1:", part1()); // 618
console.log("#2:", part2()); // ALREKFKU
