const { getInput } = require("../../utils");
const { astar } = require("./astar");
const input = getInput(true).map((line) => line.split("").map(Number));

const part1 = () => {
  const map = input;
  const bottomRight = [map[0].length - 1, map.length - 1];

  const getNeighbors = ([x, y]) => {
    return [
      [x, y - 1], // up
      [x + 1, y], // right
      [x, y + 1], // down
      [x - 1, y], // left
    ]
      .map(([x, y]) => ({
        position: [x, y],
        cost: map[y]?.[x],
      }))
      .filter((x) => x.cost);
  };

  return astar([0, 0], bottomRight, getNeighbors);
};

const part2 = () => {
  const increase = (riskLevel, add) => {
    let result = riskLevel + add;
    while (result > 9) {
      result -= 9;
    }
    return result;
  };

  let map = input.map((line) => [
    ...line,
    ...line.map((x) => increase(x, 1)),
    ...line.map((x) => increase(x, 2)),
    ...line.map((x) => increase(x, 3)),
    ...line.map((x) => increase(x, 4)),
  ]);

  map = [
    ...map,
    ...map.map((line) => line.map((x) => increase(x, 1))),
    ...map.map((line) => line.map((x) => increase(x, 2))),
    ...map.map((line) => line.map((x) => increase(x, 3))),
    ...map.map((line) => line.map((x) => increase(x, 4))),
  ];

  const bottomRight = [map[0].length - 1, map.length - 1];

  const getNeighbors = ([x, y]) => {
    return [
      [x, y - 1], // up
      [x + 1, y], // right
      [x, y + 1], // down
      [x - 1, y], // left
    ]
      .map(([x, y]) => ({
        position: [x, y],
        cost: map[y]?.[x],
      }))
      .filter((x) => x.cost);
  };

  return astar([0, 0], bottomRight, getNeighbors);
};

console.log("#1:", part1()); // 527
console.log("#2:", part2()); // 2887
