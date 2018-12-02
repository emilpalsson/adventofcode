var { getInput, range } = require("../../utils");
const input = getInput(true);
const message = range(input[0].length).map(() => []);
input.forEach(row => {
  row.split("").forEach((char, index) => message[index].push(char));
});

const mode = (chars, mostCommon = true) => {
  const modeMap = {};
  chars.forEach(c => (modeMap[c] = !modeMap[c] ? 1 : modeMap[c] + 1));
  const arr = Object.keys(modeMap).map(c => ({ char: c, count: modeMap[c] }));
  arr.sort((a, b) => b.count - a.count);
  return mostCommon ? arr[0].char : arr[arr.length - 1].char;
};

const part1 = () => message.map(chars => mode(chars)).join("");
const part2 = () => message.map(chars => mode(chars, false)).join("");

console.log("#1:", part1());
console.log("#2:", part2());
