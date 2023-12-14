const { getInput, sum } = require("../../utils");
const cards = getInput(true).map((row) => {
  const [, winningNumbersString, yourNumbersString] = row.split(/[:|]/);
  const winningNumbers = winningNumbersString
    .split(" ")
    .map((x) => x.trim())
    .filter(Boolean)
    .map(Number);
  const yourNumbers = yourNumbersString
    .split(" ")
    .map((x) => x.trim())
    .filter(Boolean)
    .map(Number);
  return { winningNumbers, yourNumbers };
});

const part1 = () => {
  const points = cards.map((card) => {
    const wins = card.yourNumbers.filter((x) => card.winningNumbers.includes(x)).length;
    return wins > 0 ? Math.pow(2, wins - 1) : 0;
  });
  return sum(points);
};

const part2 = () => {};

console.log("#1:", part1()); // 22674
// console.log("#2:", part2());
