const { getInput } = require("../../utils");
const input = getInput();

const run = (sequenceLength) => {
  let index = sequenceLength - 1;
  while (index++ < input.length) {
    const sequence = input.slice(index - sequenceLength, index);
    if (new Set(sequence.split("")).size === sequenceLength) {
      break;
    }
  }
  return index;
};

const part1 = () => {
  return run(4);
};

const part2 = () => {
  return run(14);
};

console.log("#1:", part1()); // 1175
console.log("#2:", part2()); // 3217
