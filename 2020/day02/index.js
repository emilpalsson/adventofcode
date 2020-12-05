const { getInput } = require("../../utils");
const input = getInput(true).map((line) => {
  const split = line.split(/[- :]/);
  return {
    n1: parseInt(split[0], 10),
    n2: parseInt(split[1], 10),
    char: split[2],
    password: split[4],
  };
});

const part1 = () => {
  return input.filter((item) => {
    const charCount = item.password.split(item.char).length - 1;
    return charCount >= item.n1 && charCount <= item.n2;
  }).length;
};

const part2 = () => {
  return input.filter((item) => {
    let matches = 0;
    if (item.password[item.n1 - 1] === item.char) matches++;
    if (item.password[item.n2 - 1] === item.char) matches++;
    return matches === 1;
  }).length;
};

console.log("#1:", part1()); // 493
console.log("#2:", part2()); // 593
