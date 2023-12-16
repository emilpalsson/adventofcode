const { getInput } = require("../../utils");
const input = getInput().replaceAll("\r", "").split("\n\n");

const seeds = input.shift().replace("seeds: ", "").split(" ").map(Number);

const parseMappings = (inputString) => {
  const rows = inputString.split("\n");
  rows.shift();

  return rows.map((row) => {
    const [destinationRangeStart, sourceRangeStart, rangeLength] = row.split(" ").map(Number);
    return {
      sourceRangeStart,
      sourceRangeEnd: sourceRangeStart + rangeLength,
      translationDiff: destinationRangeStart - sourceRangeStart,
    };
  });
};

const translateValue = (value, mapping) => {
  const mappingRow = mapping.find((m) => value >= m.sourceRangeStart && value <= m.sourceRangeEnd);
  if (mappingRow) {
    return value + mappingRow.translationDiff;
  }
  return value;
};

const seedToLocation = (seed, mappings) => {
  let value = seed;
  mappings.forEach((mapping) => {
    value = translateValue(value, mapping);
  });
  return value;
};

const part1 = () => {
  const mappings = input.map(parseMappings);

  const locations = seeds.map((seed) => seedToLocation(seed, mappings));

  return Math.min(...locations);
};

const part2 = () => {};

console.log("#1:", part1());
// console.log("#2:", part2());
