const { getInput } = require("../../utils");
const { intcodeComputer } = require("./intcode-computer");
const input = getInput(false, false)
  .split(",")
  .map(Number);

const DIRECTION = {
  UP: 0,
  RIGHT: 1,
  DOWN: 2,
  LEFT: 3
};

const COLOR = {
  BLACK: 0,
  WHITE: 1
};

const TURN = {
  LEFT: 0,
  RIGHT: 1
};

const OUTPUT_MODE = {
  X_POS: 0,
  Y_POS: 1,
  TILE_ID: 2
};

const emergencyHullPaintingRobot = () => {
  const panels = {};
  let currentOutputMode = OUTPUT_MODE.X_POS;
  let x;
  let y;

  const getId = () => `${x},${y}`;

  const onInput = () => {
    return panels[getId()] || COLOR.BLACK;
  };

  const onOutput = output => {
    if (currentOutputMode === OUTPUT_MODE.X_POS) {
      // panels[getId()] = output;
      // console.log("x", output);
      x = output;
      currentOutputMode = OUTPUT_MODE.Y_POS;
    } else if (currentOutputMode === OUTPUT_MODE.Y_POS) {
      // console.log("y", output);
      y = output;
      // const turnValue = output === TURN.LEFT ? 3 : 1;
      // robotPos.direction = (robotPos.direction + turnValue) % 4;
      // // prettier-ignore
      // switch (robotPos.direction) {
      //   case DIRECTION.UP: robotPos.y--; break;
      //   case DIRECTION.DOWN: robotPos.y++; break;
      //   case DIRECTION.LEFT: robotPos.x--; break;
      //   case DIRECTION.RIGHT: robotPos.x++; break;
      // }
      currentOutputMode = OUTPUT_MODE.TILE_ID;
    } else {
      // console.log("tileid", output);
      panels[getId()] = output;
      currentOutputMode = OUTPUT_MODE.X_POS;
    }
  };

  const computer = intcodeComputer({ program: input, onInput, onOutput });
  computer.run();

  return panels;
};

const part1 = () => {
  const panels = emergencyHullPaintingRobot();
  // return Object.keys(panels).length;
  return Object.values(panels).filter(x => x === 2).length;
};

// const part2 = () => {
//   const panels = emergencyHullPaintingRobot(COLOR.WHITE);
//   const s = Array(50).fill(" ");
//   const rows = [];
//   for (let i = 0; i < 6; i++) {
//     rows.push(s.slice());
//   }
//   Object.entries(panels).forEach(([pos, color]) => {
//     const apa = pos.split(",").map(Number);
//     rows[apa[1]][apa[0]] = color === COLOR.BLACK ? " " : "#";
//   });
//   return rows.map(r => r.join("")).join("\n");
// };

console.log("#1:", part1()); // 1885
// console.log("#2:\n" + part2()); // BFEAGHAF
