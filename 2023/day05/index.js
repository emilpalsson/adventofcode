const { getInput } = require("../../utils");
const input = getInput(false, true).replaceAll("\r", "").split("\n\n");

const seeds = input.shift().replace("seeds: ", "").split(" ").map(Number);

const parseMap = (inputString) => {
  const rows = inputString.split("\n");
  rows.shift();

  const map = new Map();

  rows.forEach((row) => {
    const [destinationRangeStart, sourceRangeStart, rangeLength] = row.split(" ").map(Number);
    for (let i = 0; i < rangeLength; i++) {
      map.set(sourceRangeStart + i, destinationRangeStart + i);
    }
  });

  return map;
};

const seedToLocation = (seed, maps) => {
  let value = seed;
  maps.forEach((map) => {
    value = map.get(value) || value;
  });
  return value;
};

const part1 = () => {
  const maps = input.map(parseMap);

  const locations = seeds.map((seed) => seedToLocation(seed, maps));

  return Math.min(...locations);
};

const part2 = () => {};

console.log("#1:", part1());
// console.log("#2:", part2());
