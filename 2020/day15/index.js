const { getInput } = require("../../utils");
const input = getInput().split(",").map(Number);

const part1 = () => {
  const history = new Map();

  const sayNumber = (myIndex, number) => {
    history.set(number, myIndex);
    // console.log(myIndex + 1, number);
  };

  input.slice(0, input.length - 1).forEach((number, turn) => {
    sayNumber(turn, number);
  });
  let nextNumber = input[input.length - 1];

  const getAgeOfNextNumber = (currentIndex) => {
    if (history.has(nextNumber)) {
      return currentIndex - history.get(nextNumber);
    }
    return 0;
  };

  for (let i = input.length - 1; i < 30000000 - 1; i++) {
    const numberToSay = nextNumber;
    nextNumber = getAgeOfNextNumber(i);
    sayNumber(i, numberToSay);
  }

  return nextNumber;
};

const part2 = () => {
  return 0;
};

console.log("#1:", part1()); // 866
// console.log("#2:", part2()); //
