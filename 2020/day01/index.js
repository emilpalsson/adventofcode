const { getInput } = require("../../utils");
const input = getInput(true).map((x) => parseInt(x));

const part1 = () => {
  for (const a of input) {
    for (const b of input) {
      if (a + b === 2020) {
        return a * b;
      }
    }
  }
};

const part2 = () => {
  for (const a of input) {
    for (const b of input) {
      for (const c of input) {
        if (a + b + c === 2020) {
          return a * b * c;
        }
      }
    }
  }
};

console.log("#1:", part1()); // 786811
console.log("#2:", part2()); // 199068980
