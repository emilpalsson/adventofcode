const { getInput } = require("../../utils");
const input = getInput(true)
  .map((x) => x.split(" "))
  .map((x) => ({ command: x[0], value: Number(x[1]) }));

const part1 = () => {
  let horizontalPosition = 0;
  let depth = 0;

  input.forEach(({ command, value }) => {
    if (command === "up") depth -= value;
    else if (command === "down") depth += value;
    else horizontalPosition += value;
  });

  return horizontalPosition * depth;
};

const part2 = () => {
  let horizontalPosition = 0;
  let depth = 0;
  let aim = 0;

  input.forEach(({ command, value }) => {
    if (command === "up") aim -= value;
    else if (command === "down") aim += value;
    else {
      horizontalPosition += value;
      depth += aim * value;
    }
  });

  return horizontalPosition * depth;
};

console.log("#1:", part1()); // 1714680
console.log("#2:", part2()); // 1963088820
