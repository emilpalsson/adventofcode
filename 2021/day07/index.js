const { getInput } = require("../../utils");
const input = getInput(false, false).split(",").map(Number);

const calculateFuelRequirement = (crabPositions, moveToPosition) => {
  return crabPositions.reduce((sum, crabPosition) => {
    return sum + Math.abs(moveToPosition - crabPosition);
  }, 0);
};

const part1 = () => {
  const minPos = Math.min(...input);
  const maxPos = Math.max(...input);

  let minFuelRequirement = Infinity;
  for (let i = minPos; i <= maxPos; i++) {
    minFuelRequirement = Math.min(minFuelRequirement, calculateFuelRequirement(input, i));
  }

  return minFuelRequirement;
};

const part2 = () => {
  return 0;
};

console.log("#1:", part1()); // 0
// console.log("#2:", part2()); // 0
