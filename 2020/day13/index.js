const { getInput } = require("../../utils");
const input = getInput(true);

const part1 = () => {
  const earliestTimestamp = Number(input[0]);
  const buses = input[1]
    .split(",")
    .map(Number)
    .filter((x) => !Number.isNaN(x));

  const bestBusChoice = buses.reduce(
    (result, bus) => {
      const roundTrips = Math.ceil(earliestTimestamp / bus);
      const waitTime = roundTrips * bus - earliestTimestamp;
      if (waitTime < result.waitTime) {
        return { bus, waitTime };
      }
      return result;
    },
    { waitTime: Infinity }
  );

  return bestBusChoice.bus * bestBusChoice.waitTime;
};

const part2 = () => {
  const buses = input[1]
    .split(",")
    .map((x, i) => ({ id: Number(x), offset: i }))
    .filter((x) => !Number.isNaN(x.id));

  const busWithLongestRoute = buses.reduce((result, bus) => {
    return bus.id > result.id ? bus : result;
  }, buses[0]);

  const otherBuses = buses.filter((bus) => bus.id !== busWithLongestRoute.id);

  let timestamp = busWithLongestRoute.id - busWithLongestRoute.offset;

  const testTimestamp = () => {
    return !otherBuses.some((bus) => !Number.isInteger((timestamp + bus.offset) / bus.id));
  };

  while (true) {
    if (testTimestamp()) {
      break;
    }
    timestamp += busWithLongestRoute.id;
  }

  return timestamp;
};

console.log("#1:", part1()); // 203
console.log("#2:", part2()); // 905694340256752 (lol took several hours)
