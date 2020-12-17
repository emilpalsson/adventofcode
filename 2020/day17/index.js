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
  const state = [];

  const setupEnvironment = () => {
    const padding = 7;
    const width = input[0].length + padding * 2;

    for (let wi = 0; wi < width; wi++) {
      const w = [];
      for (let zi = 0; zi < width; zi++) {
        const z = [];
        for (let yi = 0; yi < width; yi++) {
          const y = [];
          for (let xi = 0; xi < width; xi++) {
            y.push(".");
          }
          z.push(y);
        }
        w.push(z);
      }
      state.push(w);
    }

    const centerIndex = Math.floor(width / 2);

    input.forEach((y, yi) => {
      y.split("").forEach((x, xi) => {
        if (x === "#") {
          state[centerIndex][centerIndex][yi + padding][xi + padding] = "#";
        }
      });
    });
  };

  const countActiveNeighbors = (wi, zi, yi, xi) => {
    let count = 0;
    for (let wi2 = wi - 1; wi2 <= wi + 1; wi2++) {
      for (let zi2 = zi - 1; zi2 <= zi + 1; zi2++) {
        for (let yi2 = yi - 1; yi2 <= yi + 1; yi2++) {
          for (let xi2 = xi - 1; xi2 <= xi + 1; xi2++) {
            if (wi2 === wi && zi2 === zi && yi2 === yi && xi2 === xi) continue; // Exclude self
            if (state[wi2][zi2][yi2][xi2] === "#") count++;
          }
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

    for (let wi = 1; wi < state.length - 1; wi++) {
      const w = state[wi];
      for (let zi = 1; zi < w.length - 1; zi++) {
        const z = w[zi];
        for (let yi = 1; yi < z.length - 1; yi++) {
          const y = z[yi];
          for (let xi = 1; xi < y.length - 1; xi++) {
            const x = y[xi];
            const activeNeighborCount = countActiveNeighbors(wi, zi, yi, xi);
            const nextState = getNextState(x, activeNeighborCount);
            if (nextState !== x) {
              stateChanges.push({ wi, zi, yi, xi, nextState });
            }
          }
        }
      }
    }

    return stateChanges;
  };

  const modifyState = (stateChanges) => {
    stateChanges.forEach(({ wi, zi, yi, xi, nextState }) => {
      state[wi][zi][yi][xi] = nextState;
    });
  };

  const countActiveCubes = () => {
    let activeCount = 0;
    state.forEach((w) => {
      w.forEach((z) => {
        z.forEach((y) => {
          y.forEach((x) => {
            if (x === "#") {
              activeCount++;
            }
          });
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

console.log("#1:", part1()); // 263
console.log("#2:", part2()); // 1680
