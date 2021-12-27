const { getInput } = require("../../utils");
const { astar } = require("./astar");
const input = getInput(true).map((line) => line.split("").map(Number));

const bottomRight = [input[0].length - 1, input.length - 1];

const part1 = () => {
  const getNeighbors = ([x, y]) => {
    return [
      [x, y - 1], // up
      [x + 1, y], // right
      [x, y + 1], // down
      [x - 1, y], // left
    ]
      .map(([x, y]) => ({
        position: [x, y],
        cost: input[y]?.[x],
      }))
      .filter((x) => x.cost);
  };

  return astar([0, 0], bottomRight, getNeighbors);
};

const part2 = () => {
  return 0;
};

console.log("#1:", part1()); // 527
// console.log("#2:", part2()); // 0
