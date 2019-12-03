const { getInput } = require("../../utils");
const input = getInput(true).map(wire =>
  wire.split(",").map(line => ({
    direction: line.substr(0, 1),
    length: Number(line.substr(1))
  }))
);

const step = (state, direction) => {
  state.steps++;
  if (direction === "R") state.x++;
  else if (direction === "L") state.x--;
  else if (direction === "D") state.y++;
  else if (direction === "U") state.y--;
  return `${state.x};${state.y}`;
};

const plotWire1 = () => {
  const map = {};
  const state = { x: 0, y: 0, steps: 0 };

  input[0].forEach(line => {
    for (let i = 0; i < line.length; i++) {
      const coords = step(state, line.direction);
      map[coords] = map[coords] || state.steps;
    }
  });
  return map;
};
const wire1 = plotWire1();

const findClosestIntersections = () => {
  let distance = Infinity;
  let steps = Infinity;
  const state = { x: 0, y: 0, steps: 0 };

  input[1].forEach(line => {
    for (let i = 0; i < line.length; i++) {
      const coords = step(state, line.direction);
      if (wire1[coords]) {
        distance = Math.min(distance, Math.abs(state.x) + Math.abs(state.y));
        steps = Math.min(steps, wire1[coords] + state.steps);
      }
    }
  });

  return { distance, steps };
};
const result = findClosestIntersections();

console.log("#1:", result.distance); // 5357
console.log("#2:", result.steps); // 101956
