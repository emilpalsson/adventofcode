const { getInput } = require("../../utils");
const input = getInput(true)
  .map((line) => line.split("-"))
  .reduce((result, [cave1, cave2]) => {
    result[cave1] = result[cave1] || [];
    result[cave1].push(cave2);
    result[cave2] = result[cave2] || [];
    result[cave2].push(cave1);
    return result;
  }, {});

const isSmallCave = (caveId) => caveId === caveId.toLowerCase();

const hasRevisitedSmallCave = (path) =>
  path.some((x) => isSmallCave(x) && path.filter((y) => y === x).length > 1);

const solve = (illegalMoveFn) => {
  let pathCount = 0;

  const move = (caveId, path = []) => {
    if (caveId === "start" && path.length > 0) return;

    if (illegalMoveFn(caveId, path)) return;

    if (caveId === "end") {
      pathCount++;
      return;
    }

    input[caveId].forEach((nextCaveId) => {
      move(nextCaveId, [...path, caveId]);
    });
  };
  move("start");

  return pathCount;
};

const part1 = () => {
  const illegalMoveFn = (caveId, path) => isSmallCave(caveId) && path.includes(caveId);
  return solve(illegalMoveFn);
};

const part2 = () => {
  const illegalMoveFn = (caveId, path) =>
    isSmallCave(caveId) && path.includes(caveId) && hasRevisitedSmallCave(path);
  return solve(illegalMoveFn);
};

console.log("#1:", part1()); // 4011
console.log("#2:", part2()); // 108035
