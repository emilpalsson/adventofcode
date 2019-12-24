const { getInput, range } = require("../../utils");
const input = getInput(true);

let deck = range(10007);

const dealIntoNewStack = () => {
  deck.reverse();
};

const dealWithIncrement = increment => {
  let pointer = 0;
  const newDeck = [];
  deck.forEach(card => {
    newDeck[pointer] = card;
    pointer = (pointer + increment) % deck.length;
  });
  deck = newDeck;
};

const cut = num => {
  if (num > 0) {
    deck = [...deck.slice(num), ...deck.slice(0, num)];
  } else {
    deck = [...deck.slice(num), ...deck.slice(0, num)];
  }
};

input.forEach(step => {
  if (step === "deal into new stack") {
    console.log("deal into new stack");
    dealIntoNewStack();
  } else if (step.startsWith("deal with increment ")) {
    const increment = Number(step.substr(20));
    console.log("deal with increment", increment);
    dealWithIncrement(increment);
  } else if (step.startsWith("cut ")) {
    const num = Number(step.substr(4));
    console.log("cut", num);
    cut(num);
  }
});

console.log(deck.indexOf(2019));

// console.log("#1:", part1()); // 32526865
// console.log("#2:", part2()); // 2009
