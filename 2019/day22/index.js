const { getInput } = require("../../utils");
const input = getInput(true);

const steps = input.map(step => {
  if (step === "deal into new stack") {
    return (currentPos, cardCount) => cardCount - currentPos - 1n;
  } else if (step.startsWith("deal with")) {
    return currentPos => BigInt(step.substr(20)) * currentPos;
  }
  return currentPos => currentPos - BigInt(step.substr(4));
});

const part1 = () => {
  const CARD_COUNT = 10007n;
  let position = 2019n;
  steps.forEach(step => {
    position = step(position, CARD_COUNT) % CARD_COUNT;
  });
  return position;
};

console.log("#1:", part1()); // 4775
// console.log("#2:", part2());
