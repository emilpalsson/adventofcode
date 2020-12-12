const { getInput } = require("../../utils");
let state;

const SeatState = {
  Empty: "L",
  Occupied: "#",
  Floor: ".",
};

const getSeatState = (x, y) => {
  return state[y]?.[x];
};

const getStateHash = () => state.map((y) => y.join("")).join("");

const part1 = () => {
  state = getInput(true, false).map((line) => line.split(""));
  let stateHash = getStateHash();

  const getAdjacent = (x, y) => {
    return [
      getSeatState(x - 1, y - 1),
      getSeatState(x - 1, y),
      getSeatState(x - 1, y + 1),

      getSeatState(x, y - 1),
      getSeatState(x, y + 1),

      getSeatState(x + 1, y - 1),
      getSeatState(x + 1, y),
      getSeatState(x + 1, y + 1),
    ].filter((x) => x !== undefined);
  };

  const getNextSeatState = (x, y) => {
    const occupiedAdjacent = getAdjacent(x, y).filter((s) => s === SeatState.Occupied).length;

    if (state[y][x] === SeatState.Empty && occupiedAdjacent === 0) {
      return SeatState.Occupied;
    } else if (state[y][x] === SeatState.Occupied && occupiedAdjacent >= 4) {
      return SeatState.Empty;
    }

    return state[y][x];
  };

  const tick = () => {
    const nextState = state.map((y, yIndex) =>
      y.map((x, xIndex) => getNextSeatState(xIndex, yIndex))
    );
    state = nextState;

    const nextStateHash = getStateHash();
    const isUnchanged = stateHash === nextStateHash;
    stateHash = nextStateHash;
    return isUnchanged;
  };

  let isStabalized = false;
  while (!isStabalized) {
    isStabalized = tick();
  }

  return stateHash.split("").filter((s) => s === SeatState.Occupied).length;
};

const part2 = () => {
  state = getInput(true, false).map((line) => line.split(""));

  let stateHash = getStateHash();

  const getSeatInSight = (x, y, vx, vy) => {
    x += vx;
    y += vy;
    let positionValue = getSeatState(x, y);

    while (positionValue) {
      if (positionValue !== SeatState.Floor) {
        return positionValue;
      }
      x += vx;
      y += vy;
      positionValue = getSeatState(x, y);
    }

    return null;
  };

  const getSeatsInSight = (x, y) => {
    return [
      getSeatInSight(x, y, -1, -1),
      getSeatInSight(x, y, -1, 0),
      getSeatInSight(x, y, -1, +1),

      getSeatInSight(x, y, 0, -1),
      getSeatInSight(x, y, 0, +1),

      getSeatInSight(x, y, +1, -1),
      getSeatInSight(x, y, +1, 0),
      getSeatInSight(x, y, +1, +1),
    ].filter((x) => x !== null);
  };

  const getNextSeatState = (x, y) => {
    const occupiedInSight = getSeatsInSight(x, y).filter((s) => s === SeatState.Occupied).length;

    if (state[y][x] === SeatState.Empty && occupiedInSight === 0) {
      return SeatState.Occupied;
    } else if (state[y][x] === SeatState.Occupied && occupiedInSight >= 5) {
      return SeatState.Empty;
    }

    return state[y][x];
  };

  const tick = () => {
    const nextState = state.map((y, yIndex) =>
      y.map((x, xIndex) => getNextSeatState(xIndex, yIndex))
    );
    state = nextState;

    const nextStateHash = getStateHash();
    const isUnchanged = stateHash === nextStateHash;
    stateHash = nextStateHash;
    return isUnchanged;
  };

  let isStabalized = false;
  while (!isStabalized) {
    isStabalized = tick();
  }

  return stateHash.split("").filter((s) => s === SeatState.Occupied).length;
};

console.log("#1:", part1()); // 2310
console.log("#2:", part2()); // 2074
