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

const ASCII_CODE = {
  SCAFFOLD: 35,
  OPEN_SPACE: 46,
  LINE_FEED: 10
};

const getAlignmentParameter = (x, y) => x * y;

const solve = () => {
  const getId = (x = position.x, y = position.y) => `${x},${y}`;

  const map = {};
  const position = { x: 0, y: 0 };
  let maxX = 0;
  let maxY = 0;
  // const startXY = [100, 100];
  // let targetXY;
  // let position = { direction: DIRECTION.NORTH, x: startXY[0], y: startXY[1] };
  // let lastTriedMove = { ...position };
  // map[getId()] = MAPSTATE.HALLWAY;

  const onInput = () => {
    console.log("input?");
    // lastTriedMove = getMoveToTry();
    // return lastTriedMove.direction;
  };

  const onOutput = output => {
    // console.log(output);
    if (output === ASCII_CODE.LINE_FEED) {
      position.y++;
      maxX = Math.max(position.x, maxX);
      position.x = 0;
      return;
    }

    map[getId()] = output;
    position.x++;

    // if (output === MOVE_RESULT.HIT_WALL) {
    //   map[getId(lastTriedMove.x, lastTriedMove.y)] = MAPSTATE.WALL;
    // } else {
    //   map[getId(lastTriedMove.x, lastTriedMove.y)] = MAPSTATE.HALLWAY;
    //   position = { ...lastTriedMove };

    //   if (output === MOVE_RESULT.MOVED_TO_OXYGEN_SYSTEM) {
    //     targetXY = [position.x, position.y];
    //   }

    //   if (position.x === startXY[0] && position.y === startXY[0]) {
    //     return { pause: true };
    //   }
    // }
  };

  const findIntersections = () => {
    // maxX;
    // maxY;

    let val = 0;
    for (let x = 1; x < maxX; x++) {
      for (let y = 1; y < maxY; y++) {
        if (
          map[getId(x, y)] === ASCII_CODE.SCAFFOLD &&
          map[getId(x - 1, y)] === ASCII_CODE.SCAFFOLD &&
          map[getId(x + 1, y)] === ASCII_CODE.SCAFFOLD &&
          map[getId(x, y - 1)] === ASCII_CODE.SCAFFOLD &&
          map[getId(x, y + 1)] === ASCII_CODE.SCAFFOLD
        ) {
          val += getAlignmentParameter(x, y);
        }
      }
    }
    val;
  };

  const computer = intcodeComputer({ program: input, onInput, onOutput });
  computer.run();
  maxY = position.y;

  // console.log(map);
  findIntersections();

  // return {
  //   part1: getShortestPathLength(startXY, targetXY),
  //   part2: getLongestPathFromStationLength()
  // };
};

const answer = solve();
// console.log("#1:", answer.part1); // 258
// console.log("#2:", answer.part2); // 372
