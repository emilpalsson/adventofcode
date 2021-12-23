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
  let pathCount = 0;

  const move = (caveId, path = []) => {
    if (caveId === "start" && path.length > 0) return;

    if (
      caveId === caveId.toLowerCase() &&
      path.includes(caveId) &&
      path.some((x) => x === x.toLowerCase() && path.filter((y) => y === x).length > 1)
    )
      return;

    if (caveId === "end") {
      pathCount++;
      return;
    }

    map[caveId].forEach((nextCaveId) => {
      move(nextCaveId, [...path, caveId]);
    });
  };
  move("start");

  return pathCount;
};

console.log("#1:", part1()); // 4011
console.log("#2:", part2()); // 108035
