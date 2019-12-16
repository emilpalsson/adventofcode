const { getInput } = require("../../utils");
const input = getInput()
  .split("")
  .map(Number);

const basePattern = [0, 1, 0, -1];

input;

let values = input.slice();

const getPattern = index => {
  const pattern = [];
  basePattern.forEach(multiplier => {
    for (let i = 0; i <= index; i++) {
      pattern.push(multiplier);
    }
  });
  return pattern;
  // return pattern.slice(1);
};

// getPattern(1);
// console.log(getPattern(1));

const performPhase = () => {
  values = values.map((value1, index1) => {
    const pattern = getPattern(index1);
    let newValue = 0;
    values.forEach((value2, index2) => {
      // if (index1 === 0) {
      const multiplier = pattern[(index2 + 1) % pattern.length];
      // console.log(value2, multiplier);
      newValue += value2 * multiplier;
      // 1*1  + 2*0  + 3*-1 + 4*0  + 5*1  + 6*0  + 7*-1 + 8*0
      // 1*0  + 2*1  + 3*1  + 4*0  + 5*0  + 6*-1 + 7*-1 + 8*0
      // }
    });
    const newValueStr = Math.abs(newValue).toString();
    return Number(newValueStr.substr(newValueStr.length - 1));
  });
};

for (let i = 0; i < 100; i++) {
  performPhase();
}
console.log(values.join("").substr(0, 8));

// console.log("#1:", answer.part1); // 258
// console.log("#2:", answer.part2); // 372
