const { getInput } = require("../../utils");
const input = getInput(true).map(Number);

const part1 = () => {
  const cardPublicKey = input[0];
  const doorPublicKey = input[1];

  let value = 1;
  let loopSize;
  for (let i = 1; true; i++) {
    value = (value * 7) % 20201227;
    if (value === cardPublicKey) {
      loopSize = i;
      break;
    }
  }

  let result = 1;
  for (let i = 0; i < loopSize; i++) {
    result = (result * doorPublicKey) % 20201227;
  }

  return result;
};

const part2 = () => {
  return 0;
};

console.log("#1:", part1()); // 7936032
// console.log("#2:", part2()); //
