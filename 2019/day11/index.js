const { getInput } = require("../../utils");
const input = getInput(false, false)
  .split(",")
  .map(Number);

const PARAM_MODE = {
  POSITION: 0,
  IMMEDIATE: 1,
  RELATIVE_BASE: 2
};

const OPERATION = {
  ADD: 1,
  MULTIPLY: 2,
  INPUT: 3,
  OUTPUT: 4,
  JUMP_IF_TRUE: 5,
  JUMP_IF_FALSE: 6,
  LESS_THAN: 7,
  EQUALS: 8,
  ADJUSTS_RELATIVE_BASE: 9
};

const ROTATION = {
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
  COLOR: 0,
  TURN: 1
};

const parseOperation = str => {
  str = str.toString().padStart(5, "0");
  return {
    code: Number(str.substr(str.length - 2)),
    paramModes: str
      .substr(0, str.length - 2)
      .split("")
      .map(Number)
      .reverse()
  };
};

const run = (initialPanelState, part) => {
  const state = input.slice();
  let pointer = 0;
  let output;
  let relativeBase = 0;
  const panels = initialPanelState;
  const robotPos = { x: 0, y: 0 };
  let robotDirection = ROTATION.UP;
  let currentOutputMode = OUTPUT_MODE.COLOR;
  const paintedPanels = new Set();

  const getParamValue = (param, paramMode) => {
    switch (paramMode) {
      case PARAM_MODE.POSITION:
        return state[param] || 0;
      case PARAM_MODE.IMMEDIATE:
        return param;
      case PARAM_MODE.RELATIVE_BASE:
        return state[relativeBase + param] || 0;
    }
  };

  const getId = (pos = robotPos) => `${pos.x},${pos.y}`;

  const read = () => state[pointer++];

  const getWritePosition = (paramMode, value) =>
    paramMode === PARAM_MODE.RELATIVE_BASE ? relativeBase + value : value;

  while (state[pointer] !== 99) {
    const operation = parseOperation(read());

    if (operation.code === OPERATION.ADD) {
      const a = getParamValue(read(), operation.paramModes[0]);
      const b = getParamValue(read(), operation.paramModes[1]);
      const c = getParamValue(read(), PARAM_MODE.IMMEDIATE);
      state[getWritePosition(operation.paramModes[2], c)] = a + b;
    } else if (operation.code === OPERATION.MULTIPLY) {
      const a = getParamValue(read(), operation.paramModes[0]);
      const b = getParamValue(read(), operation.paramModes[1]);
      const c = getParamValue(read(), PARAM_MODE.IMMEDIATE);
      state[getWritePosition(operation.paramModes[2], c)] = a * b;
    } else if (operation.code === OPERATION.INPUT) {
      const a = read();
      const colorOfCurrentPanel = panels[getId()] || COLOR.BLACK;
      state[getWritePosition(operation.paramModes[0], a)] = colorOfCurrentPanel;
    } else if (operation.code === OPERATION.OUTPUT) {
      output = getParamValue(read(), operation.paramModes[0]);
      if (currentOutputMode === OUTPUT_MODE.COLOR) {
        panels[getId()] = output;
        currentOutputMode = OUTPUT_MODE.TURN;
        paintedPanels.add(getId());
      } else {
        const turnValue = output === TURN.LEFT ? 3 : 1;
        robotDirection = (robotDirection + turnValue) % 4;
        // prettier-ignore
        switch (robotDirection) {
          case ROTATION.UP: robotPos.y--; break;
          case ROTATION.DOWN: robotPos.y++; break;
          case ROTATION.LEFT: robotPos.x--; break;
          case ROTATION.RIGHT: robotPos.x++; break;
        }
        currentOutputMode = OUTPUT_MODE.COLOR;
      }
    } else if (operation.code === OPERATION.JUMP_IF_TRUE) {
      const a = getParamValue(read(), operation.paramModes[0]);
      const b = getParamValue(read(), operation.paramModes[1]);
      if (a !== 0) {
        pointer = b;
      }
    } else if (operation.code === OPERATION.JUMP_IF_FALSE) {
      const a = getParamValue(read(), operation.paramModes[0]);
      const b = getParamValue(read(), operation.paramModes[1]);
      if (a === 0) {
        pointer = b;
      }
    } else if (operation.code === OPERATION.LESS_THAN) {
      const a = getParamValue(read(), operation.paramModes[0]);
      const b = getParamValue(read(), operation.paramModes[1]);
      const c = getParamValue(read(), PARAM_MODE.IMMEDIATE);
      state[getWritePosition(operation.paramModes[2], c)] = a < b ? 1 : 0;
    } else if (operation.code === OPERATION.EQUALS) {
      const a = getParamValue(read(), operation.paramModes[0]);
      const b = getParamValue(read(), operation.paramModes[1]);
      const c = getParamValue(read(), PARAM_MODE.IMMEDIATE);
      state[getWritePosition(operation.paramModes[2], c)] = a === b ? 1 : 0;
    } else if (operation.code === OPERATION.ADJUSTS_RELATIVE_BASE) {
      const a = getParamValue(read(), operation.paramModes[0]);
      relativeBase += a;
    }
  }

  if (part === 1) {
    return paintedPanels.size;
  } else {
    const s = Array(50).fill(" ");
    const rows = [];
    for (let i = 0; i < 6; i++) {
      rows.push(s.slice());
    }
    Object.entries(panels).forEach(([pos, color]) => {
      const apa = pos.split(",").map(Number);
      rows[apa[1]][apa[0]] = color === COLOR.BLACK ? " " : "#";
    });
    return rows.map(r => r.join("")).join("\n");
  }
};

console.log("#1:", run({}, 1)); // 1885
console.log("#2:\n" + run({ "0,0": 1 }, 2));
