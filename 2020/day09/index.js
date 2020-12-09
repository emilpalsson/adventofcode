const { getInput } = require("../../utils");
const input = getInput(true).map((line) => Number(line));

const preambleLength = 25;

const part1 = () => {
  let invalidEntry;
  let preambles = [];

  const isSumOfAnyTwoPreambles = (value) => {
    return preambles.some((x) => {
      return preambles.some((y) => {
        return x + y === value;
      });
    });
  };

  input.some((num) => {
    if (preambles.length === preambleLength) {
      if (!isSumOfAnyTwoPreambles(num)) {
        invalidEntry = num;
        return true;
      }
    }
    preambles.push(num);
    if (preambles.length > preambleLength) {
      preambles.shift();
    }
  });

  return invalidEntry;
};

const part2 = () => {
  const invalidEntry = part1();

  const findContiguousSet = (value) => {
    let answer;
    input.some((x, xIndex) => {
      let sum = x;
      let yIndex = xIndex + 1;
      while (sum < value) {
        sum += input[yIndex++];
      }
      if (sum === value) {
        answer = {
          xIndex,
          yIndex: yIndex - 1,
        };
        return true;
      }
    });
    return input.slice(answer.xIndex, answer.yIndex + 1);
  };

  const contiguousSet = findContiguousSet(invalidEntry);

  return Math.min(...contiguousSet) + Math.max(...contiguousSet);
};

console.log("#1:", part1()); // 14144619
console.log("#2:", part2()); // 1766397
