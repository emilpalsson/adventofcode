const { getInput } = require("../../utils");
const input = getInput(true);

const part1 = () => {
  const earliestTimestamp = Number(input[0]);
  const busses = input[1]
    .split(",")
    .map(Number)
    .filter((x) => !Number.isNaN(x));

  const bestBussChoice = busses.reduce(
    (result, buss) => {
      const roundTrips = Math.ceil(earliestTimestamp / buss);
      const waitTime = roundTrips * buss - earliestTimestamp;
      if (waitTime < result.waitTime) {
        return { buss, waitTime };
      }
      return result;
    },
    { waitTime: Infinity }
  );

  return bestBussChoice.buss * bestBussChoice.waitTime;
};

const part2 = () => {
  return 0;
};

console.log("#1:", part1()); // 203
// console.log("#2:", part2());
