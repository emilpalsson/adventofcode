const { getInput } = require("../../utils");
const input = getInput(true, false).map((line) => ({
  action: line.substr(0, 1),
  value: Number(line.substr(1)),
}));

const Direction = {
  N: 0,
  E: 1,
  S: 2,
  W: 3,
};

// const Movement = {
//   N: { x: 0, y: 1 },
//   E: { x: 1, y: 0 },
//   S: { x: 0, y: -1 },
//   W: { x: -1, y: 0 },
// };

const Action = {
  N: (pos, value) => (pos.y += value),
  E: (pos, value) => (pos.x += value),
  S: (pos, value) => (pos.y -= value),
  W: (pos, value) => (pos.x -= value),
  L: (pos, value) => {
    const turns = value / 90;
    pos.direction = (pos.direction + 4 - turns) % 4;
  },
  R: (pos, value) => {
    const turns = value / 90;
    pos.direction = (pos.direction + turns) % 4;
  },
  F: (pos, value) => {
    if (pos.direction === Direction.N) pos.y += value;
    else if (pos.direction === Direction.E) pos.x += value;
    else if (pos.direction === Direction.S) pos.y -= value;
    else if (pos.direction === Direction.W) pos.x -= value;
    // pos.x += Movement[pos.direction].x * value;
    // pos.y += Movement[pos.direction].y * value;
  },
};

const part1 = () => {
  let pos = { x: 0, y: 0, direction: Direction.E };

  input.forEach((instruction) => {
    Action[instruction.action](pos, instruction.value);
  });

  return Math.abs(pos.x) + Math.abs(pos.y);
};

const part2 = () => {
  return 0;
};

console.log("#1:", part1()); // 1533
// console.log("#2:", part2());
