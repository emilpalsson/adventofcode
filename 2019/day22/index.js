const { getInput } = require("../../utils");
const input = getInput(true);

const CARD_COUNT = 10007;
let position = 2019;

const dealIntoNewStack = () => {
  position = CARD_COUNT - position - 1;
};

const dealWithIncrement = increment => {
  position = increment * position;
};

const cut = num => {
  position = position - num;
};

input.forEach(step => {
  if (step === "deal into new stack") {
    dealIntoNewStack();
  } else if (step.startsWith("deal with")) {
    const increment = Number(step.substr(20));
    dealWithIncrement(increment);
  } else if (step.startsWith("cut ")) {
    const num = Number(step.substr(4));
    cut(num);
  }
  position = position % CARD_COUNT;
});

console.log(position); // 4775

// console.log("#1:", part1()); // 32526865
// console.log("#2:", part2()); // 2009
