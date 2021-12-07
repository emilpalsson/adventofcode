const { getInput } = require("../../utils");
const input = getInput(false).split(",").map(Number);

const part1 = () => {
  const calculateFuelRequirement = (moveToPosition) => {
    return input.reduce((sum, crabPosition) => {
      return sum + Math.abs(moveToPosition - crabPosition);
    }, 0);
  };

  const minPos = Math.min(...input);
  const maxPos = Math.max(...input);

  let minFuelRequirement = Infinity;
  for (let i = minPos; i <= maxPos; i++) {
    minFuelRequirement = Math.min(minFuelRequirement, calculateFuelRequirement(i));
  }

  return minFuelRequirement;
};

const part2 = () => {
  const calculateSingleMoveFuel = (steps) => (Math.pow(steps, 2) + steps) / 2;

  const calculateFuelRequirement = (moveToPosition) => {
    return input.reduce((sum, crabPosition) => {
      const steps = Math.abs(moveToPosition - crabPosition);
      return sum + calculateSingleMoveFuel(steps);
    }, 0);
  };

  const minPos = Math.min(...input);
  const maxPos = Math.max(...input);

  let minFuelRequirement = Infinity;
  for (let i = minPos; i <= maxPos; i++) {
    minFuelRequirement = Math.min(minFuelRequirement, calculateFuelRequirement(i));
  }

  return minFuelRequirement;
};

// console.log("#1:", part1()); // 359648
console.log("#2:", part2()); // 0
