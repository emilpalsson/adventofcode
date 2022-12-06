const { getInput } = require("../../utils");
const input = getInput();

const part1 = () => {
  let index = 4;
  while (index < input.length) {
    const sequence = input.slice(index - 4, index);

    if (new Set(sequence.split("")).size === 4) {
      break;
    }

    index++;
  }

  return index;
};

const part2 = () => {};

console.log("#1:", part1()); // 1175
// console.log("#2:", part2());
