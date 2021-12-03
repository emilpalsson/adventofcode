const { getInput } = require("../../utils");
const input = getInput(true);

const threshold = input.length / 2;

const part1 = () => {
  const gammaRateDigits = input[0].split("").map((_, index) => {
    return input.map((line) => line[index]).filter((bit) => bit === "1").length > threshold ? 1 : 0;
  });
  const epsilonRateDigits = gammaRateDigits.map((bit) => (bit === 1 ? 0 : 1));

  const gammaRate = parseInt(parseInt(gammaRateDigits.join(""), 10), 2);
  const epsilonRate = parseInt(parseInt(epsilonRateDigits.join(""), 10), 2);

  return gammaRate * epsilonRate;
};

const part2 = () => {
  return 0;
};

console.log("#1:", part1()); // 841526
// console.log("#2:", part2());
