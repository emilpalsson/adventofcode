const { getInput } = require("../../utils");
const input = getInput();

const replaceAt = (value, index, length, newString = "") =>
  value.slice(0, index - 0) + newString + value.slice(index + length);

const parseMatch = (value, match) => ({
  rule: match[0].length, // '(3x5)'.length
  multiplier: parseInt(match[2], 10), // 5
  str: value.substr(match.index + match[0].length, parseInt(match[1], 10)), // 'ASD'
  chunkLength: match[0].length + parseInt(match[1], 10) // '(3x5)ASD'.length
});

const regex = /\((\d+)x(\d+)\)/;

const part1 = () => {
  let result = input;
  let match = regex.exec(result);
  while (match !== null) {
    const m = parseMatch(result, match);
    const decompressed = m.str.replace(/[\(\)]/g, "|").repeat(m.multiplier);
    result = replaceAt(result, match.index, m.chunkLength, decompressed);
    match = regex.exec(result);
  }
  return result.length;
};

const part2 = () => {
  const process = (value, multiplier) => {
    let sum = 0;
    let match = regex.exec(value);
    while (match !== null) {
      const m = parseMatch(value, match);
      sum += match.index * multiplier; // Add leading regular chars
      sum += process(m.str, m.multiplier * multiplier); // Process and add the next chunk
      value = value.slice(match.index + m.chunkLength); // Remove the processed chunk from the value
      match = regex.exec(value);
    }
    sum += value.length * multiplier; // Add last trailing regular chars
    return sum;
  };
  return process(input, 1);
};

console.log("#1:", part1());
console.log("#2:", part2());
