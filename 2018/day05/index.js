const { getInput } = require("../../utils");
const input = getInput();

const getInvalidPairsRegex = () => {
  const invalidPairs = [];
  for (let i = 97; i < 123; i++) {
    const a = String.fromCharCode(i);
    const b = a.toUpperCase();
    invalidPairs.push(a + b);
    invalidPairs.push(b + a);
  }
  return new RegExp(invalidPairs.join("|"), "g");
};
const regex = getInvalidPairsRegex();

const getCleanedPolymerSize = polymer => {
  let size;
  do {
    size = polymer.length;
    polymer = polymer.replace(regex, "");
  } while (polymer.length < size);
  return size;
};

const getOptimizedPolymerSize = () => {
  let min = input.length;
  for (let i = 97; i < 123; i++) {
    const type = String.fromCharCode(i);
    const polymer = input.replace(new RegExp(type, "ig"), "");
    const size = getCleanedPolymerSize(polymer);
    if (size < min) {
      min = size;
    }
  }
  return min;
};

console.log("#1:", getCleanedPolymerSize(input)); // 9060
console.log("#2:", getOptimizedPolymerSize()); // 6310
