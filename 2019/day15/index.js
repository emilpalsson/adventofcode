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
  DROID: 9,
  WALL: 1,
  OXYGEN_STATION: 2,
  FREE: 3,
  UNKNOWN: 4
};

const part1 = () => {
  const map = [];
  const startX = 21;
  const startY = 21;
  let x = startX;
  let y = startY;
  let stationX;
  let stationY;
  let moved = false;
  const lastTriedMovement = { direction: DIRECTION.NORTH, x, y };
  let lastMoveDirection = DIRECTION.NORTH;
  map[y] = [];
  map[y][x] = OBJECT.FREE;

  const getDirectionToTry = () => {
    map[y - 1] = map[y - 1] || [];
    map[y + 1] = map[y + 1] || [];
    if (lastMoveDirection === DIRECTION.NORTH) {
      if (map[y][x + 1] !== OBJECT.WALL) return DIRECTION.EAST;
      if (map[y - 1][x] !== OBJECT.WALL) return DIRECTION.NORTH;
      if (map[y][x - 1] !== OBJECT.WALL) return DIRECTION.WEST;
      return DIRECTION.SOUTH;
    }
    if (lastMoveDirection === DIRECTION.EAST) {
      if (map[y + 1][x] !== OBJECT.WALL) return DIRECTION.SOUTH;
      if (map[y][x + 1] !== OBJECT.WALL) return DIRECTION.EAST;
      if (map[y - 1][x] !== OBJECT.WALL) return DIRECTION.NORTH;
      return DIRECTION.WEST;
    }
    if (lastMoveDirection === DIRECTION.SOUTH) {
      if (map[y][x - 1] !== OBJECT.WALL) return DIRECTION.WEST;
      if (map[y + 1][x] !== OBJECT.WALL) return DIRECTION.SOUTH;
      if (map[y][x + 1] !== OBJECT.WALL) return DIRECTION.EAST;
      return DIRECTION.NORTH;
    }
    if (lastMoveDirection === DIRECTION.WEST) {
      if (map[y - 1][x] !== OBJECT.WALL) return DIRECTION.NORTH;
      if (map[y][x - 1] !== OBJECT.WALL) return DIRECTION.WEST;
      if (map[y + 1][x] !== OBJECT.WALL) return DIRECTION.SOUTH;
      return DIRECTION.EAST;
    }
  };

  const printMap = () => {
    let mapStr = "";
    for (let y = 0; y < map.length; y++) {
      for (let x = 0; x < (map[y] || []).length; x++) {
        const state = map[y][x];
        // console.log(x, y, state);
        if (y === startY && x === startX) {
          mapStr += "S";
        } else if (state === OBJECT.WALL) {
          mapStr += "#";
        } else if (state === OBJECT.FREE) {
          mapStr += " ";
        } else if (state === OBJECT.OXYGEN_STATION) {
          mapStr += "T";
        } else {
          mapStr += state || "?";
        }
      }
      mapStr += "\n";
    }

    console.log(mapStr);
  };

  const getLongestPathLength = () => {
    let maxLength = 0;
    for (let y = 0; y < map.length; y++) {
      for (let x = 0; x < (map[y] || []).length; x++) {
        const state = map[y][x];
        if (state === OBJECT.FREE) {
          const length = getShortestPathLength([stationX, stationY], [x, y]);
          maxLength = Math.max(maxLength, length);
        }
      }
    }
    console.log(maxLength);
  };

  const getShortestPathLength = (from, to) => {
    const isWall = ([x, y]) =>
      !map[y] || !map[y][x] || map[y][x] === OBJECT.WALL;

    const getNeighbors = xy =>
      [
        [xy[0], xy[1] - 1], // up
        [xy[0] + 1, xy[1]], // right
        [xy[0], xy[1] + 1], // down
        [xy[0] - 1, xy[1]] // left
      ].filter(xy => !isWall(xy));

    const result = astar(from, to, getNeighbors);
    return result;
  };

  const onInput = () => {
    lastTriedMovement.direction = getDirectionToTry();
    lastTriedMovement.x = x;
    lastTriedMovement.y = y;
    if (lastTriedMovement.direction === DIRECTION.NORTH) lastTriedMovement.y--;
    if (lastTriedMovement.direction === DIRECTION.SOUTH) lastTriedMovement.y++;
    if (lastTriedMovement.direction === DIRECTION.EAST) lastTriedMovement.x++;
    if (lastTriedMovement.direction === DIRECTION.WEST) lastTriedMovement.x--;
    // console.log("try go", lastTriedMovement);
    return lastTriedMovement.direction;
  };

  const onOutput = output => {
    if (output === MOVEMENT_RESULT.HIT_WALL) {
      map[lastTriedMovement.y][lastTriedMovement.x] = OBJECT.WALL;
    } else if (output === MOVEMENT_RESULT.MOVED) {
      map[lastTriedMovement.y][lastTriedMovement.x] = OBJECT.FREE;
      moved = true;
      x = lastTriedMovement.x;
      y = lastTriedMovement.y;
      lastMoveDirection = lastTriedMovement.direction;
    } else if (output === MOVEMENT_RESULT.MOVED_OXYGEN) {
      map[lastTriedMovement.y][lastTriedMovement.x] = OBJECT.OXYGEN_STATION;
      x = lastTriedMovement.x;
      y = lastTriedMovement.y;
      stationX = x;
      stationY = y;
      lastMoveDirection = lastTriedMovement.direction;
    }

    if (moved && x === startX && y === startY) {
      console.log(
        getShortestPathLength([startX, startY], [stationX, stationY])
      );
      getLongestPathLength();
      printMap();
      return { pause: true };
    }
  };

  const computer = intcodeComputer({ program: input, onInput, onOutput });
  computer.run();
};

console.log("#1:", part1()); // 270
// console.log("#2:", part2()); // 12535
