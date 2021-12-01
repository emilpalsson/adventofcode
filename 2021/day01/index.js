const { getInput } = require("../../utils");
const input = getInput(true).map(Number);

const part1 = () => {
  return input.filter((curr, index) => curr > input[index - 1]).length;
};

const part2 = () => {
  const windows = [];
  for (let i = 2; i < input.length; i++) {
    windows.push(input[i - 2] + input[i - 1] + input[i]);
  }
  return windows.filter((curr, index) => curr > windows[index - 1]).length;
};

console.log("#1:", part1()); // 1184
console.log("#2:", part2()); // 1158
