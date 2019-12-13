const { getInput } = require("../../utils");
const { intcodeComputer } = require("./intcode-computer");
const input = getInput(false, false)
  .split(",")
  .map(Number);

const OUTPUT_MODE = {
  X_POS: 0,
  Y_POS: 1,
  TILE_ID: 2
};

const TILE_TYPE = {
  EMPTY: 0,
  WALL: 1,
  BLOCK: 2,
  PADDLE: 3,
  BALL: 4
};

const JOYSTICK_POS = {
  NEUTRAL: 0,
  LEFT: -1,
  RIGHT: 1
};

const part1 = () => {
  const tiles = {};
  let currentOutputMode = OUTPUT_MODE.X_POS;
  let x;
  let y;

  const getId = () => `${x},${y}`;

  const onOutput = output => {
    switch (currentOutputMode) {
      case OUTPUT_MODE.X_POS:
        x = output;
        break;
      case OUTPUT_MODE.Y_POS:
        y = output;
        break;
      case OUTPUT_MODE.TILE_ID:
        tiles[getId()] = output;
        break;
    }
    currentOutputMode = (currentOutputMode + 1) % 3;
  };

  const computer = intcodeComputer({ program: input, onOutput });
  computer.run();

  return Object.values(tiles).filter(x => x === TILE_TYPE.BLOCK).length;
};

const part2 = () => {
  const tiles = {};
  let currentOutputMode = OUTPUT_MODE.X_POS;
  let x;
  let y;
  let points = 0;
  let ballX;
  let paddleX;

  const getId = () => `${x},${y}`;

  const onInput = () => {
    if (ballX < paddleX) {
      return JOYSTICK_POS.LEFT;
    } else if (ballX > paddleX) {
      return JOYSTICK_POS.RIGHT;
    }
    return JOYSTICK_POS.NEUTRAL;
  };

  const onOutput = output => {
    if (currentOutputMode === OUTPUT_MODE.X_POS) {
      x = output;
    } else if (currentOutputMode === OUTPUT_MODE.Y_POS) {
      y = output;
    } else {
      if (x === -1 && y === 0) {
        points = output;
      } else {
        tiles[getId()] = output;
        if (output === TILE_TYPE.BALL) {
          ballX = x;
        } else if (output === TILE_TYPE.PADDLE) {
          paddleX = x;
        }
      }
    }
    currentOutputMode = (currentOutputMode + 1) % 3;
  };

  const program = input.slice();
  program[0] = 2;
  const computer = intcodeComputer({ program, onInput, onOutput });
  computer.run();

  return points;
};

console.log("#1:", part1()); // 270
console.log("#2:", part2()); // 12535
