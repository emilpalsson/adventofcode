const { getInput } = require("../../utils");
const input = getInput().replaceAll("\r", "").split("\n\n");

const seeds = input.shift().replace("seeds: ", "").split(" ").map(Number);

const parseSeedRanges = () => {
  let seedRange;
  const seedRanges = seeds.reduce((result, current, i) => {
    if (i % 2 == 0) {
      seedRange = { start: current };
    } else {
      seedRange.end = seedRange.start + current - 1;
      result.push(seedRange);
    }
    return result;
  }, []);
  return seedRanges;
};
const seedRanges = parseSeedRanges();

const parseMappings = (inputString) => {
  const rows = inputString.split("\n");
  rows.shift();

  return rows.map((row) => {
    const [destinationRangeStart, sourceRangeStart, rangeLength] = row.split(" ").map(Number);
    return {
      sourceRangeStart,
      sourceRangeEnd: sourceRangeStart + rangeLength - 1,
      translationDiff: destinationRangeStart - sourceRangeStart,
      destinationRangeStart,
      destinationRangeEnd: destinationRangeStart + rangeLength - 1,
    };
  });
};

const mappings = input.map(parseMappings);
const mappingsReversed = mappings.reverse();

const part1 = () => {
  const seedToLocation = (seed) => {
    let value = seed;
    mappings.forEach((mapping) => {
      value = translateValue(value, mapping);
    });
    return value;
  };

  const translateValue = (value, mapping) => {
    const mappingRange = mapping.find(
      (m) => value >= m.sourceRangeStart && value <= m.sourceRangeEnd
    );
    if (mappingRange) {
      return value + mappingRange.translationDiff;
    }
    return value;
  };

  const locations = seeds.map((seed) => seedToLocation(seed));

  return Math.min(...locations);
};

const part2 = () => {
  const locationToSeed = (location) => {
    let value = location;
    mappingsReversed.forEach((mapping) => {
      const before = value;
      value = reverseValue(value, mapping);
    });
    return value;
  };

  const reverseValue = (value, mapping) => {
    const mappingRow = mapping.find(
      (m) => value >= m.destinationRangeStart && value <= m.destinationRangeEnd
    );
    if (mappingRow) {
      return value - mappingRow.translationDiff;
    }
    return value;
  };

  const isValidSeed = (seed) => {
    return seedRanges.some((sr) => seed >= sr.start && seed <= sr.end);
  };

  var humidityToLocationMap = mappings.at(-1);

  humidityToLocationMap.sort((a, b) => a.destinationRangeStart - b.destinationRangeStart);

  for (let location = 1; location <= 1000000000; location++) {
    const seed = locationToSeed(location);
    if (isValidSeed(seed)) {
      console.log({ location, seed });
      return location;
    }
  }
};

console.log("#1:", part1()); // 107430936
console.log("#2:", part2()); // 23738616
