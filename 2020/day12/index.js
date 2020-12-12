const { getInput } = require("../../utils");
const input = getInput(true, false).map((line) => ({
  action: line.substr(0, 1),
  value: Number(line.substr(1)),
}));

const part1 = () => {
  const Direction = {
    N: 0,
    E: 1,
    S: 2,
    W: 3,
  };

  const Action = {
    N: (pos, value) => (pos.y -= value),
    E: (pos, value) => (pos.x += value),
    S: (pos, value) => (pos.y += value),
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
      if (pos.direction === Direction.N) pos.y -= value;
      else if (pos.direction === Direction.E) pos.x += value;
      else if (pos.direction === Direction.S) pos.y += value;
      else if (pos.direction === Direction.W) pos.x -= value;
    },
  };

  let pos = { x: 0, y: 0, direction: Direction.E };

  input.forEach((instruction) => {
    Action[instruction.action](pos, instruction.value);
  });

  return Math.abs(pos.x) + Math.abs(pos.y);
};

const part2 = () => {
  let waypoint = { x: 10, y: -1 };
  let ship = { x: 0, y: 0 };

  const Action = {
    N: (value) => (waypoint.y -= value),
    E: (value) => (waypoint.x += value),
    S: (value) => (waypoint.y += value),
    W: (value) => (waypoint.x -= value),
    L: (value) => {
      let x;
      let y;
      if (value === 90) {
        x = waypoint.y;
        y = -waypoint.x;
      } else if (value === 180) {
        x = -waypoint.x;
        y = -waypoint.y;
      } else {
        x = -waypoint.y;
        y = waypoint.x;
      }
      waypoint.x = x;
      waypoint.y = y;
    },
    R: (value) => {
      let x = waypoint.y;
      let y = waypoint.x;
      if (value === 90) {
        x = -waypoint.y;
        y = waypoint.x;
      } else if (value === 180) {
        x = -waypoint.x;
        y = -waypoint.y;
      } else {
        x = waypoint.y;
        y = -waypoint.x;
      }
      waypoint.x = x;
      waypoint.y = y;
    },
    F: (value) => {
      ship.y += value * waypoint.y;
      ship.x += value * waypoint.x;
    },
  };

  input.forEach((instruction) => {
    Action[instruction.action](instruction.value);
  });

  return Math.abs(ship.x) + Math.abs(ship.y);
};

console.log("#1:", part1()); // 1533
console.log("#2:", part2()); // 8093 TOO LOW
