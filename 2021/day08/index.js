const { getInput } = require("../../utils");
const input = getInput(true)
  .map((line) => line.split(" | "))
  .map((lineArr) => lineArr.map((io) => io.split(" ")))
  .map(([input, output]) => ({ input, output }));

/*
0 - 6
1 - 2 (unique)
2 - 5
3 - 5
4 - 4 (unique)
5 - 5
6 - 6
7 - 3 (unique)
8 - 7 (unique)
9 - 6
*/

const part1 = () => {
  return input.reduce((sum, entry) => {
    return sum + entry.output.filter((x) => [2, 3, 4, 7].includes(x.length)).length;
  }, 0);
};

const part2 = () => {
  return 0;
};

console.log("#1:", part1()); // 512
// console.log("#2:", part2()); // 0
