const { getInput } = require("../../utils");
const input = getInput(true);

const part1 = () => {
  const threshold = input.length / 2;

  const gammaRateDigits = input[0].split("").map((_, i) => {
    return input.map((l) => l[i]).filter((b) => b === "1").length > threshold ? 1 : 0;
  });
  const epsilonRateDigits = gammaRateDigits.map((b) => (b === 1 ? 0 : 1));

  const gammaRate = parseInt(parseInt(gammaRateDigits.join(""), 10), 2);
  const epsilonRate = parseInt(parseInt(epsilonRateDigits.join(""), 10), 2);

  return gammaRate * epsilonRate;
};

const part2 = () => {
  const calculateRating = (useMostCommonBit) => {
    let lines = input;

    for (let i = 0; lines.length > 1; i++) {
      const threshold = lines.length / 2;
      const mostCommonBit =
        lines.map((l) => l[i]).filter((b) => b === "1").length >= threshold ? "1" : "0";
      lines = lines.filter((l) => (l[i] === mostCommonBit) === useMostCommonBit);
    }

    return parseInt(parseInt(lines[0], 10), 2);
  };

  const oxygenGeneratorRating = calculateRating(true);
  const co2ScrubberRating = calculateRating(false);

  return oxygenGeneratorRating * co2ScrubberRating;
};

console.log("#1:", part1()); // 841526
console.log("#2:", part2()); // 4790390
