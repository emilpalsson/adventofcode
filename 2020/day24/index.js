const { getInput } = require("../../utils");
const input = getInput(true).map((line) => {
  let pos = 0;
  let steps = [];
  while (pos < line.length) {
    if (line[pos] === "n" || line[pos] === "s") steps.push(line[pos++] + line[pos++]);
    else steps.push(line[pos++]);
  }
  return steps;
});

const direction = {
  e: [2, 0],
  se: [1, 1],
  sw: [-1, 1],
  w: [-2, 0],
  nw: [-1, -1],
  ne: [1, -1],
};

const getPosId = ([x, y]) => `${x},${y}`;

const part1 = () => {
  const blacks = new Set();

  const flipTile = (steps) => {
    const cords = [0, 0];
    steps.forEach((step) => {
      const move = direction[step];
      cords[0] += move[0];
      cords[1] += move[1];
    });
    const posId = getPosId(cords);
    if (blacks.has(posId)) blacks.delete(posId);
    else blacks.add(posId);
  };

  input.forEach(flipTile);

  return blacks.size;
};

const part2 = () => {
  return 0;
};

console.log("#1:", part1()); // 322
// console.log("#2:", part2()); //
