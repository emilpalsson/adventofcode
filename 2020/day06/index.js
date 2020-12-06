const { getInput } = require("../../utils");
const input = getInput()
  .replace(/\r/g, "")
  .split("\n\n")
  .map((group) => {
    return [...new Set(group.replace(/\n/g, "").split(""))].length;
  });

const part1 = () => {
  return input.reduce((sum, x) => sum + x, 0);
};

const part2 = () => {
  return 0;
};

console.log("#1:", part1()); // 6703
// console.log("#2:", part2());
