const { getInput } = require("../../utils");
const input = getInput()
  .split("")
  .map(Number);

const pattern = [0, 1, 0, -1];
const patternLength = pattern.length;

let values = input.slice();

const valuesLength = values.length;

const performPhase = () => {
  for (let i = 0; i < valuesLength; i++) {
    let newValue = 0;
    values.forEach((value, i2) => {
      const multiplier =
        pattern[Math.floor((i2 + 1) / (i + 1)) % patternLength];
      newValue += value * multiplier;
    });
    values[i] = Math.abs(newValue) % 10;
  }
};

for (let i = 0; i < 100; i++) {
  performPhase();
}

const answer = values.join("").substr(0, 8);
console.log(answer, answer === "42205986"); // 42205986

// console.log("#1:", answer.part1); // 258
// console.log("#2:", answer.part2); // 372
