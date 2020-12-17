const { getInput } = require("../../utils");
const input = getInput(true);

const part1 = () => {
  const state = [];

  const setupEnvironment = () => {
    const paddedInput = input.map((row) => "......." + row + ".......");
    const emptyRowStr = ".".repeat(paddedInput[0].length);

    const startPlane = [];
    for (let i = 0; i < 7; i++) startPlane.push(emptyRowStr.split(""));
    startPlane.push(...paddedInput.map((row) => row.split("")));
    for (let i = 0; i < 7; i++) startPlane.push(emptyRowStr.split(""));

    for (let i = 0; i < 7; i++) state.push(startPlane.map((_) => emptyRowStr.split("")));
    state.push(startPlane);
    for (let i = 0; i < 7; i++) state.push(startPlane.map((_) => emptyRowStr.split("")));
  };

  const countActiveNeighbors = (zi, yi, xi) => {
    let count = 0;
    for (let zi2 = zi - 1; zi2 <= zi + 1; zi2++) {
      for (let yi2 = yi - 1; yi2 <= yi + 1; yi2++) {
        for (let xi2 = xi - 1; xi2 <= xi + 1; xi2++) {
          if (zi2 === zi && yi2 === yi && xi2 === xi) continue; // Exclude self
          if (state[zi2][yi2][xi2] === "#") count++;
        }
      }
    }
    return count;
  };

  const getNextState = (currentState, activeNeighborCount) => {
    if (currentState === "#") {
      return activeNeighborCount === 2 || activeNeighborCount === 3 ? "#" : ".";
    } else {
      return activeNeighborCount === 3 ? "#" : ".";
    }
  };

  const getNextStateChanges = () => {
    const stateChanges = [];

    for (let zi = 1; zi < state.length - 1; zi++) {
      const z = state[zi];
      for (let yi = 1; yi < z.length - 1; yi++) {
        const y = z[yi];
        for (let xi = 1; xi < y.length - 1; xi++) {
          const x = y[xi];
          const activeNeighborCount = countActiveNeighbors(zi, yi, xi);
          const nextState = getNextState(x, activeNeighborCount);
          if (nextState !== x) {
            stateChanges.push({ zi, yi, xi, nextState });
          }
        }
      }
    }

    return stateChanges;
  };

  const modifyState = (stateChanges) => {
    stateChanges.forEach(({ zi, yi, xi, nextState }) => {
      state[zi][yi][xi] = nextState;
    });
  };

  const countActiveCubes = () => {
    let activeCount = 0;
    state.forEach((z) => {
      z.forEach((y) => {
        y.forEach((x) => {
          if (x === "#") {
            activeCount++;
          }
        });
      });
    });
    return activeCount;
  };

  setupEnvironment();

  for (let i = 0; i < 6; i++) {
    const stateChanges = getNextStateChanges();
    modifyState(stateChanges);
  }

  return countActiveCubes();
};

const part2 = () => {
  return 0;
};

console.log("#1:", part1()); // 263
// console.log("#2:", part2()); //
