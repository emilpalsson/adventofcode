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
  const lineLength = input[0].length;

  let filteredLines = input;
  for (let i = 0; i < lineLength; i++) {
    const threshold = filteredLines.length / 2;
    const mostCommonBit =
      filteredLines.map((l) => l[i]).filter((b) => b === "1").length >= threshold ? "1" : "0";
    filteredLines = filteredLines.filter((l) => l[i] === mostCommonBit);
  }
  const oxygenGeneratorRating = parseInt(parseInt(filteredLines[0], 10), 2);

  filteredLines = input;
  for (let i = 0; i < lineLength; i++) {
    const threshold = filteredLines.length / 2;
    const mostCommonBit =
      filteredLines.map((l) => l[i]).filter((b) => b === "1").length >= threshold ? "1" : "0";
    filteredLines = filteredLines.filter((l) => l[i] !== mostCommonBit);
    if (filteredLines.length === 1) break;
  }
  const co2ScrubberRating = parseInt(parseInt(filteredLines[0], 10), 2);

  return oxygenGeneratorRating * co2ScrubberRating;
};

console.log("#1:", part1()); // 841526
console.log("#2:", part2()); // 4790390
