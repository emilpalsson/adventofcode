const { getInput, range } = require("../utils");
const { astar } = require("../utils/astar");
const input = parseInt(getInput(13), 10);

const posId = ([x, y]) => `${x}x${y}`;

const isWall = ([x, y]) => {
  const id = posId([x, y]);
  if (x < 0 || y < 0) return true; // Outside room
  return ((x * x + 3 * x + 2 * x * y + y + y * y + input).toString(2).replace(/0/g, '').length % 2 === 1) // prettier-ignore
};

const getNeighbors = cords =>
  [
    [cords[0], cords[1] - 1], // up
    [cords[0] + 1, cords[1]], // right
    [cords[0], cords[1] + 1], // down
    [cords[0] - 1, cords[1]] // left
  ].filter(cords => !isWall(cords));

const part1 = () => astar([1, 1], [31, 39], getNeighbors);

const visited = {};
const part2 = () => {
  const move = (pos, moves) => {
    if (moves > 50) {
      return;
    }
    visited[posId(pos)] = moves;
    const neighbors = getNeighbors(pos).filter(
      n =>
        moves + 1 <
        (visited.hasOwnProperty(posId(n)) ? visited[posId(n)] : Infinity)
    );
    neighbors.forEach(neighbor => move(neighbor, moves + 1));
  };

  move([1, 1], 0);
  return Object.keys(visited).length;
};

console.log("#1:", part1());
console.log("#2:", part2());
