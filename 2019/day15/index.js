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

const MOVEMENT_RESULT = {
  HIT_WALL: 0,
  MOVED: 1,
  MOVED_OXYGEN: 2
};

const OBJECT = {
  WALL: 1,
  OXYGEN_SYSTEM: 2,
  FREE: 3
};

const solve = () => {
  const getId = (posX = x, posY = y) => `${posX},${posY}`;

  const map = {};
  const startX = 100;
  const startY = 100;
  let x = startX;
  let y = startY;
  let stationXY;
  let lastTriedMovement = { direction: DIRECTION.NORTH, x, y };
  let lastMoveDirection = DIRECTION.NORTH;
  map[getId()] = OBJECT.FREE;

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

  const getMovementByDirection = direction => {
    // prettier-ignore
    switch (direction) {
      case DIRECTION.NORTH: return { x, y: y - 1, direction }
      case DIRECTION.EAST: return { x: x + 1, y, direction }
      case DIRECTION.SOUTH: return {x, y: y + 1, direction}
      case DIRECTION.WEST: return {x: x - 1, y, direction }
    }
  };

  const isMovePossible = direction => {
    const movement = getMovementByDirection(direction);
    return map[getId(movement.x, movement.y)] !== OBJECT.WALL;
  };

  const getMovementToTry = () => {
    let direction = getRightTurnDirection(lastMoveDirection);
    while (!isMovePossible(direction)) {
      direction = getLeftTurnDirection(direction);
    }
    return getMovementByDirection(direction);
  };

  const getLongestPathFromStationLength = () => {
    let maxLength = 0;
    for (let y = 0; y < startY * 2; y++) {
      for (let x = 0; x < startX * 2; x++) {
        if (map[getId(x, y)] === OBJECT.FREE) {
          const pathLength = getShortestPathLength(stationXY, [x, y]);
          maxLength = Math.max(maxLength, pathLength);
        }
      }
    }
    return maxLength;
  };

  const getShortestPathLength = (from, to) => {
    const isWall = ([x, y]) => map[getId(x, y)] === OBJECT.WALL;
    const getNeighbors = ([x, y]) =>
      [
        [x, y - 1], // up
        [x + 1, y], // right
        [x, y + 1], // down
        [x - 1, y] // left
      ].filter(xy => !isWall(xy));
    return astar(from, to, getNeighbors);
  };

  const onInput = () => {
    lastTriedMovement = getMovementToTry();
    return lastTriedMovement.direction;
  };

  const onOutput = output => {
    const positionId = getId(lastTriedMovement.x, lastTriedMovement.y);

    if (output === MOVEMENT_RESULT.HIT_WALL) {
      map[positionId] = OBJECT.WALL;
    } else {
      map[positionId] = OBJECT.FREE;
      x = lastTriedMovement.x;
      y = lastTriedMovement.y;
      lastMoveDirection = lastTriedMovement.direction;

      if (output === MOVEMENT_RESULT.MOVED_OXYGEN) {
        map[positionId] = OBJECT.OXYGEN_SYSTEM;
        stationXY = [x, y];
      }

      if (x === startX && y === startY) {
        return { pause: true };
      }
    }
  };

  const computer = intcodeComputer({ program: input, onInput, onOutput });
  computer.run();

  return {
    part1: getShortestPathLength([startX, startY], stationXY),
    part2: getLongestPathFromStationLength()
  };
};

const answer = solve();
console.log(new Date());
console.log("#1:", answer.part1); // 258
console.log("#2:", answer.part2); // 372
