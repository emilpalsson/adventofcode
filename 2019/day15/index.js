const { getInput } = require("../../utils");
const { astar } = require("../../utils/astar");
const { intcodeComputer } = require("./intcode-computer");
const input = getInput(false, false)
  .split(",")
  .map(Number);

const DIRECTION = {
  NORTH: 1,
  SOUTH: 2,
  WEST: 3,
  EAST: 4
};

const MOVE_RESULT = {
  HIT_WALL: 0,
  MOVED: 1,
  MOVED_TO_OXYGEN_SYSTEM: 2
};

const MAPSTATE = {
  WALL: 1,
  HALLWAY: 2
};

const solve = () => {
  const getId = (x = position.x, y = position.y) => `${x},${y}`;

  const map = {};
  const startXY = [100, 100];
  let targetXY;
  let position = { direction: DIRECTION.NORTH, x: startXY[0], y: startXY[1] };
  let lastTriedMove = { ...position };
  map[getId()] = MAPSTATE.HALLWAY;

  const getRightTurnDirection = direction => {
    // prettier-ignore
    switch (direction) {
      case DIRECTION.NORTH: return DIRECTION.EAST;
      case DIRECTION.EAST: return DIRECTION.SOUTH;
      case DIRECTION.SOUTH: return DIRECTION.WEST;
      case DIRECTION.WEST: return DIRECTION.NORTH;
    }
  };

  const getLeftTurnDirection = direction => {
    // prettier-ignore
    switch (direction) {
      case DIRECTION.NORTH: return DIRECTION.WEST;
      case DIRECTION.WEST: return DIRECTION.SOUTH;
      case DIRECTION.SOUTH: return DIRECTION.EAST;
      case DIRECTION.EAST: return DIRECTION.NORTH;
    }
  };

  const getMoveByDirection = direction => {
    // prettier-ignore
    switch (direction) {
      case DIRECTION.NORTH: return { x: position.x, y: position.y - 1, direction }
      case DIRECTION.EAST: return { x: position.x + 1, y: position.y, direction }
      case DIRECTION.SOUTH: return { x: position.x, y: position.y + 1, direction }
      case DIRECTION.WEST: return { x: position.x - 1, y: position.y, direction }
    }
  };

  const isMovePossible = direction => {
    const move = getMoveByDirection(direction);
    return map[getId(move.x, move.y)] !== MAPSTATE.WALL;
  };

  const getMoveToTry = () => {
    let direction = getRightTurnDirection(position.direction);
    while (!isMovePossible(direction)) {
      direction = getLeftTurnDirection(direction);
    }
    return getMoveByDirection(direction);
  };

  const getLongestPathFromStationLength = () => {
    let maxLength = 0;
    for (let y = 0; y < startXY[1] * 2; y++) {
      for (let x = 0; x < startXY[0] * 2; x++) {
        if (map[getId(x, y)] === MAPSTATE.HALLWAY) {
          const pathLength = getShortestPathLength(targetXY, [x, y]);
          maxLength = Math.max(maxLength, pathLength);
        }
      }
    }
    return maxLength;
  };

  const getShortestPathLength = (fromXY, toXY) => {
    const isWall = ([x, y]) => map[getId(x, y)] === MAPSTATE.WALL;
    const getNeighbors = ([x, y]) =>
      [
        [x, y - 1], // up
        [x + 1, y], // right
        [x, y + 1], // down
        [x - 1, y] // left
      ].filter(xy => !isWall(xy));
    return astar(fromXY, toXY, getNeighbors);
  };

  const onInput = () => {
    lastTriedMove = getMoveToTry();
    return lastTriedMove.direction;
  };

  const onOutput = output => {
    if (output === MOVE_RESULT.HIT_WALL) {
      map[getId(lastTriedMove.x, lastTriedMove.y)] = MAPSTATE.WALL;
    } else {
      map[getId(lastTriedMove.x, lastTriedMove.y)] = MAPSTATE.HALLWAY;
      position = { ...lastTriedMove };

      if (output === MOVE_RESULT.MOVED_TO_OXYGEN_SYSTEM) {
        targetXY = [position.x, position.y];
      }

      if (position.x === startXY[0] && position.y === startXY[0]) {
        return { pause: true };
      }
    }
  };

  const computer = intcodeComputer({ program: input, onInput, onOutput });
  computer.run();

  return {
    part1: getShortestPathLength(startXY, targetXY),
    part2: getLongestPathFromStationLength()
  };
};

const answer = solve();
console.log("#1:", answer.part1); // 258
console.log("#2:", answer.part2); // 372
