const { getInput } = require("../../utils");
const input = getInput(true);

// const dealIntoNewStack = (currentPos, cardCount) => cardCount - currentPos - 1;
// const dealWithIncrement = (currentPos, cardCount, x) => x * currentPos;
// const cut = (currentPos, cardCount, x) => currentPos - x;

// const dealIntoNewStack = () => (currentPos, cardCount) => cardCount - currentPos - 1;
// const dealWithIncrement = increment => (currentPos) => increment * currentPos;
// const cut = num => (currentPos) => currentPos - num;

const steps = input.map(step => {
  if (step === "deal into new stack") {
    return (currentPos, cardCount) => cardCount - currentPos - 1;
  } else if (step.startsWith("deal with")) {
    return currentPos => Number(step.substr(20)) * currentPos;
  }
  return currentPos => currentPos - Number(step.substr(4));
});

const part1 = () => {
  const CARD_COUNT = 10007;
  let position = 2019;
  steps.forEach(step => {
    position = step(position, CARD_COUNT) % CARD_COUNT;
  });
  return position;
};

console.log("#1:", part1()); // 4775
// console.log("#2:", part2());
