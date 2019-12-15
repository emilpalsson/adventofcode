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
  const lastTriedMovement = { direction: DIRECTION.NORTH, x, y };
  let lastMoveDirection = DIRECTION.NORTH;
  // map[y - 1] = [];
  map[y] = [];
  // map[y + 1] = [];
  map[y][x] = OBJECT.FREE;
  // let currentDirection = DIRECTION.NORTH;
  // map[y][x + 1] = OBJECT.UNKNOWN;
  // map[y][x - 1] = OBJECT.UNKNOWN;
  // map[y + 1][x] = OBJECT.UNKNOWN;
  // map[y - 1][x] = OBJECT.UNKNOWN;

  // let lastMovementCommand;
  // const lastMovementTo = { x, y };

  // const getId = () => `${x},${y}`;

  // const addPosToMap = (x, y) => {
  //   if (!map[y]) {
  //     map[y] = [];
  //   }
  // };
  const getDirectionToTry = () => {
    map[y - 1] = map[y - 1] || [];
    map[y + 1] = map[y + 1] || [];
    // addPosToMap(y + 1);
    // addPosToMap(y - 1);
    // console.log(d(lastMoveDirection));
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

    // if (!map[y][x + 1]) {
    //   lastMovementTo.x++;
    //   lastMovementCommand = DIRECTION.EAST;
    //   return DIRECTION.EAST;
    // }
    // if (!map[y][x - 1]) {
    //   lastMovementTo.x--;
    //   lastMovementCommand = DIRECTION.WEST;
    //   return DIRECTION.WEST;
    // }
    // if (!map[y + 1][x]) {
    //   lastMovementTo.y++;
    //   lastMovementCommand = DIRECTION.SOUTH;
    //   return DIRECTION.SOUTH;
    // }
    // if (!map[y - 1][x]) {
    //   lastMovementTo.y--;
    //   lastMovementCommand = DIRECTION.NORTH;
    //   return DIRECTION.NORTH;
    // }
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

    // map.forEach((row, y) => {
    //   row.forEach((cell, x) => {
    //     // console.log(y, x, cell);
    //     if (y === startY && x === startX) {
    //       mapStr += "S";
    //     } else if (cell === OBJECT.FREE) {
    //       mapStr = "#";
    //     } else if (cell === OBJECT.OXYGEN_STATION) {
    //       mapStr = "T";
    //     }
    //   });
    //   mapStr += "\n";
    // });
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

  const d = direction => {
    if (direction === DIRECTION.NORTH) return "NORTH";
    if (direction === DIRECTION.EAST) return "EAST";
    if (direction === DIRECTION.SOUTH) return "SOUTH";
    if (direction === DIRECTION.WEST) return "WEST";
  };

  let count = 0;
  const onOutput = output => {
    count++;
    // if (count++ > 1000) {
    //   return { pause: true };
    // }

    if (output === MOVEMENT_RESULT.HIT_WALL) {
      // console.log(
      //   { ...lastTriedMovement, direction: d(lastTriedMovement.direction) },
      //   "HIT_WALL"
      // );
      map[lastTriedMovement.y][lastTriedMovement.x] = OBJECT.WALL;
      // return { pause: true };
      // map;
      // return;
    } else if (output === MOVEMENT_RESULT.MOVED) {
      // console.log(
      //   { ...lastTriedMovement, direction: d(lastTriedMovement.direction) },
      //   "MOVED"
      // );
      map[lastTriedMovement.y][lastTriedMovement.x] = OBJECT.FREE;
      // forcedMovement = getGoBackCommand();
      x = lastTriedMovement.x;
      y = lastTriedMovement.y;
      lastMoveDirection = lastTriedMovement.direction;
      // return;
    } else if (output === MOVEMENT_RESULT.MOVED_OXYGEN) {
      // console.log(
      //   { ...lastTriedMovement, direction: d(lastTriedMovement.direction) },
      //   "MOVED_OXYGEN"
      // );
      map[lastTriedMovement.y][lastTriedMovement.x] = OBJECT.OXYGEN_STATION;
      x = lastTriedMovement.x;
      y = lastTriedMovement.y;
      stationX = x;
      stationY = y;
      lastMoveDirection = lastTriedMovement.direction;
      // printMap();
      // getShortestPathLength();
      // console.log(map);
      // return
      // return { pause: true };
    }

    if (count > 100 && x === startX && y === startY) {
      console.log(
        getShortestPathLength([startX, startY], [stationX, stationY])
      );
      getLongestPathLength();
      printMap();
      return { pause: true };
    }

    // map;

    // console.log(lastTriedMovement, output);

    // if (currentOutputMode === OUTPUT_MODE.X_POS) {
    //   x = output;
    // } else if (currentOutputMode === OUTPUT_MODE.Y_POS) {
    //   y = output;
    // } else {
    //   if (x === -1 && y === 0) {
    //     points = output;
    //   } else {
    //     map[getId()] = output;
    //     if (output === TILE_TYPE.BALL) {
    //       ballX = x;
    //     } else if (output === TILE_TYPE.PADDLE) {
    //       paddleX = x;
    //     }
    //   }
    // }
    // currentOutputMode = (currentOutputMode + 1) % 3;
  };

  const computer = intcodeComputer({ program: input, onInput, onOutput });
  computer.run();
};

console.log("#1:", part1()); // 270
// console.log("#2:", part2()); // 12535
