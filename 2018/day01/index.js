const { getInput } = require("../../utils");
const input = getInput(true).map(x => parseInt(x));

const part1 = () => input.reduce((sum, value) => sum + value);

const part2 = () => {
  let frequency = 0;
  const frequencies = {};

  while (true) {
    for (let i in input) {
      frequency += input[i];
      if (frequencies[frequency]) {
        return frequency;
      }
      frequencies[frequency] = true;
    }
  }
};

console.log("#1:", part1()); // 472
console.log("#2:", part2()); // 66932
