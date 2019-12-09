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

const run = inputValue => {
  const state = input.slice();
  let pointer = 0;
  let output;
  let relativeBase = 0;

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
      state[getWritePosition(operation.paramModes[0], a)] = inputValue;
    } else if (operation.code === OPERATION.OUTPUT) {
      output = getParamValue(read(), operation.paramModes[0]);
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

  return output;
};

console.log("#1:", run(1)); // 3380552333
console.log("#2:", run(2)); // 78831
