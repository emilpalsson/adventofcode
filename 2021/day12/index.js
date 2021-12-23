const { getInput } = require("../../utils");
const input = getInput(true).map((line) => line.split("-"));

const buildMap = () => {
  return input.reduce((result, curr) => {
    result[curr[0]] = result[curr[0]] || [];
    result[curr[0]].push(curr[1]);

    result[curr[1]] = result[curr[1]] || [];
    result[curr[1]].push(curr[0]);
    return result;
  }, {});
};
const map = buildMap();

const part1 = () => {
  let pathCount = 0;

  const move = (caveId, path = [], noRevisitCaves = []) => {
    if (caveId === "end") {
      pathCount++;
      return;
    }

    if (caveId === caveId.toLowerCase()) {
      noRevisitCaves = [...noRevisitCaves, caveId];
    }

    map[caveId]
      .filter((nextCaveId) => !noRevisitCaves.includes(nextCaveId))
      .forEach((nextCaveId) => {
        move(nextCaveId, [...path, caveId], noRevisitCaves);
      });
  };
  move("start");

  return pathCount;
};

const part2 = () => {
  return 0;
};

console.log("#1:", part1()); // 4011
// console.log("#2:", part2()); // 0
