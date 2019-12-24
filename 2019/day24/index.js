const { getInput } = require("../../utils");
const input = getInput(true)
  .map(x => x.split(""))
  .flat()
  .map(x => x === "#");

const getBitwiseValue = arr =>
  arr.reduce((aggr, value, index) => {
    aggr |= value << index;
    return aggr;
  }, 0);

const bitIsSet = (num, bit) => (num >> bit) % 2 != 0;

const part1 = () => {
  const countAdjacentBugs = tile => {
    let adjacentBugs = 0;
    if (tile >= 5 && bitIsSet(state, tile - 5)) {
      adjacentBugs++;
    }
    if (tile % 5 !== 0 && bitIsSet(state, tile - 1)) {
      adjacentBugs++;
    }
    if (tile % 5 !== 4 && bitIsSet(state, tile + 1)) {
      adjacentBugs++;
    }
    if (tile <= 19 && bitIsSet(state, tile + 5)) {
      adjacentBugs++;
    }
    return adjacentBugs;
  };

  const tick = () => {
    let nextState = 0;
    for (let i = 0; i < 25; i++) {
      const infested = bitIsSet(state, i);
      const adjacentBugs = countAdjacentBugs(i);
      let willBeInfested = infested;

      if (infested && adjacentBugs !== 1) {
        willBeInfested = false;
      } else if (!infested && (adjacentBugs === 1 || adjacentBugs === 2)) {
        willBeInfested = true;
      }

      if (willBeInfested) {
        nextState |= 1 << i;
      }
    }
    state = nextState;
  };

  let state = getBitwiseValue(input);
  const seenStates = new Set();

  while (true) {
    if (seenStates.has(state)) {
      return state;
    }
    seenStates.add(state);
    tick();
  }
};

const part2 = () => {
  let levels = [0, getBitwiseValue(input), 0];

  const getBugCountLeft = (level, levelAbove, levelBelow, tile) => {
    if (tile % 5 === 0) {
      return bitIsSet(levelAbove, 11) ? 1 : 0;
    }
    if (tile === 13) {
      return (
        (bitIsSet(levelBelow, 4) ? 1 : 0) +
        (bitIsSet(levelBelow, 9) ? 1 : 0) +
        (bitIsSet(levelBelow, 14) ? 1 : 0) +
        (bitIsSet(levelBelow, 19) ? 1 : 0) +
        (bitIsSet(levelBelow, 24) ? 1 : 0)
      );
    }
    return bitIsSet(level, tile - 1) ? 1 : 0;
  };

  const getBugCountRight = (level, levelAbove, levelBelow, tile) => {
    if (tile % 5 === 4) {
      return bitIsSet(levelAbove, 13) ? 1 : 0;
    }
    if (tile === 11) {
      return (
        (bitIsSet(levelBelow, 0) ? 1 : 0) +
        (bitIsSet(levelBelow, 5) ? 1 : 0) +
        (bitIsSet(levelBelow, 10) ? 1 : 0) +
        (bitIsSet(levelBelow, 15) ? 1 : 0) +
        (bitIsSet(levelBelow, 20) ? 1 : 0)
      );
    }
    return bitIsSet(level, tile + 1) ? 1 : 0;
  };

  const getBugCountOver = (level, levelAbove, levelBelow, tile) => {
    if (tile < 5) {
      return bitIsSet(levelAbove, 7) ? 1 : 0;
    }
    if (tile === 17) {
      return (
        (bitIsSet(levelBelow, 20) ? 1 : 0) +
        (bitIsSet(levelBelow, 21) ? 1 : 0) +
        (bitIsSet(levelBelow, 22) ? 1 : 0) +
        (bitIsSet(levelBelow, 23) ? 1 : 0) +
        (bitIsSet(levelBelow, 24) ? 1 : 0)
      );
    }
    return bitIsSet(level, tile - 5) ? 1 : 0;
  };

  const getBugCountUnder = (level, levelAbove, levelBelow, tile) => {
    if (tile > 19) {
      return bitIsSet(levelAbove, 17) ? 1 : 0;
    }
    if (tile === 7) {
      return (
        (bitIsSet(levelBelow, 0) ? 1 : 0) +
        (bitIsSet(levelBelow, 1) ? 1 : 0) +
        (bitIsSet(levelBelow, 2) ? 1 : 0) +
        (bitIsSet(levelBelow, 3) ? 1 : 0) +
        (bitIsSet(levelBelow, 4) ? 1 : 0)
      );
    }
    return bitIsSet(level, tile + 5) ? 1 : 0;
  };

  const countAdjacentBugs = (level, levelAbove, levelBelow, tile) => {
    return (
      getBugCountLeft(level, levelAbove, levelBelow, tile) +
      getBugCountRight(level, levelAbove, levelBelow, tile) +
      getBugCountOver(level, levelAbove, levelBelow, tile) +
      getBugCountUnder(level, levelAbove, levelBelow, tile)
    );
  };

  const tick = () => {
    let nextLevels = levels.map((level, levelIndex) => {
      let nextLevel = 0;
      for (let i = 0; i < 25; i++) {
        if (i === 12) continue;

        const infested = bitIsSet(level, i);
        const adjacentBugs = countAdjacentBugs(
          level,
          levels[levelIndex - 1],
          levels[levelIndex + 1],
          i
        );
        let willBeInfested = infested;

        if (infested && adjacentBugs !== 1) {
          willBeInfested = false;
        } else if (!infested && (adjacentBugs === 1 || adjacentBugs === 2)) {
          willBeInfested = true;
        }

        if (willBeInfested) {
          nextLevel |= 1 << i;
        }
      }
      return nextLevel;
    });

    if (nextLevels[0] > 0) {
      nextLevels.unshift(0);
    }
    if (nextLevels[nextLevels.length - 1] > 0) {
      nextLevels.push(0);
    }

    levels = nextLevels;
  };

  const getBugCountAfter200Minutes = () => {
    for (let i = 0; i < 200; i++) {
      tick();
    }

    let totalBugCount = levels.reduce((aggr, level) => {
      let bugsOnLevel = 0;
      for (let i = 0; i < 25; i++) {
        if (bitIsSet(level, i)) {
          bugsOnLevel++;
        }
      }
      return aggr + bugsOnLevel;
    }, 0);

    return totalBugCount;
  };

  return getBugCountAfter200Minutes();
};

console.log("#1:", part1()); // 32526865
console.log("#2:", part2()); // 2009
