const { getInput, sum } = require("../../utils");
const input = getInput()
  .replaceAll("\r", "")
  .split("\n\n")
  .map((x) => sum(x.split("\n").map(Number)));

const part1 = () => {
  return Math.max(...input);
};

const part2 = () => {
  return sum(input.sort((a, b) => b - a).slice(0, 3));
};

console.log("#1:", part1()); // 71300
console.log("#2:", part2()); // 209691
