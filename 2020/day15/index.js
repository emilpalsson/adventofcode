const { getInput } = require("../../utils");
const input = getInput().split(",").map(Number);

const run = (rounds) => {
  const history = new Map();

  for (let i = 0; i < input.length - 1; i++) {
    history.set(input[i], i);
  }
  let nextNumber = input[input.length - 1];

  const getAge = (number, currentIndex) => {
    if (history.has(number)) {
      return currentIndex - history.get(number);
    }
    return 0;
  };

  for (let i = input.length - 1; i < rounds - 1; i++) {
    const currentNumber = nextNumber;
    nextNumber = getAge(nextNumber, i);
    history.set(currentNumber, i);
  }

  return nextNumber;
};

console.log("#1:", run(2020)); // 866
console.log("#2:", run(30000000)); // 1437692
