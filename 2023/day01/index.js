const { getInput } = require("../../utils");
const input = getInput(true);

const part1 = () => {
  return input.reduce((sum, line) => {
    digits = line.replace(/[^1-9]/g, "");
    const combined = digits.at(0) + digits.at(-1);
    return sum + Number(combined);
  }, 0);
};

const part2 = () => {
  const preProcessInput = (line) =>
    line
      .replaceAll("one", "one1one")
      .replaceAll("two", "two2two")
      .replaceAll("three", "three3three")
      .replaceAll("four", "four4four")
      .replaceAll("five", "five5five")
      .replaceAll("six", "six6six")
      .replaceAll("seven", "seven7seven")
      .replaceAll("eight", "eight8eight")
      .replaceAll("nine", "nine9nine");

  return input.reduce((sum, line) => {
    digits = preProcessInput(line).replace(/[^0-9]/g, "");
    const combined = digits.at(0) + digits.at(-1);
    return sum + Number(combined);
  }, 0);
};

console.log("#1:", part1()); // 54916
console.log("#2:", part2()); // 54728
