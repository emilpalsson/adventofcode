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

// const debug = console.log;
const debug = () => {};

const run = systemId => {
  const state = input.slice();
  let pointer = 0;
  let diagnosticCode;
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

  const relativeBaseCrap = (paramMode, value) =>
    paramMode === PARAM_MODE.RELATIVE_BASE ? relativeBase + value : value;

  while (state[pointer] !== 99) {
    // if (state[pointer] === 21108) {
    //   console.log(21108);
    // }
    const operation = parseOperation(read());
    // console.log(operation);

    if (operation.code === OPERATION.ADD) {
      const a = getParamValue(read(), operation.paramModes[0]);
      const b = getParamValue(read(), operation.paramModes[1]);
      const c = getParamValue(read(), PARAM_MODE.IMMEDIATE);
      state[relativeBaseCrap(operation.paramModes[2], c)] = a + b;
      debug("ADD", a, b, c);
    } else if (operation.code === OPERATION.MULTIPLY) {
      const a = getParamValue(read(), operation.paramModes[0]);
      const b = getParamValue(read(), operation.paramModes[1]);
      const c = getParamValue(read(), PARAM_MODE.IMMEDIATE);
      // state[c] = a * b;
      state[relativeBaseCrap(operation.paramModes[2], c)] = a * b;
      debug("MULTIPLY", a, b, c);
    } else if (operation.code === OPERATION.INPUT) {
      const a = read();
      if (operation.paramModes[0] === PARAM_MODE.RELATIVE_BASE) {
        state[relativeBase + a] = systemId;
      } else {
        state[a] = systemId;
      }
      // console.log("input", systemId);
      debug("INPUT", a, systemId);
    } else if (operation.code === OPERATION.OUTPUT) {
      diagnosticCode = getParamValue(read(), operation.paramModes[0]);
      console.log(diagnosticCode);
      debug("OUTPUT", diagnosticCode);
    } else if (operation.code === OPERATION.JUMP_IF_TRUE) {
      const a = getParamValue(read(), operation.paramModes[0]);
      const b = getParamValue(read(), operation.paramModes[1]);
      if (a !== 0) {
        pointer = b;
      }
      debug("JUMP_IF_TRUE", a !== 0);
    } else if (operation.code === OPERATION.JUMP_IF_FALSE) {
      const a = getParamValue(read(), operation.paramModes[0]);
      const b = getParamValue(read(), operation.paramModes[1]);
      if (a === 0) {
        pointer = b;
      }
      debug("JUMP_IF_FALSE", a === 0);
    } else if (operation.code === OPERATION.LESS_THAN) {
      const a = getParamValue(read(), operation.paramModes[0]);
      const b = getParamValue(read(), operation.paramModes[1]);
      const c = getParamValue(read(), PARAM_MODE.IMMEDIATE);
      // state[c] = a < b ? 1 : 0;

      if (operation.paramModes[2] === PARAM_MODE.RELATIVE_BASE) {
        state[relativeBase + c] = a < b ? 1 : 0;
      } else {
        state[c] = a < b ? 1 : 0;
      }

      debug("LESS_THAN", a, b, c, a < b);
    } else if (operation.code === OPERATION.EQUALS) {
      const a = getParamValue(read(), operation.paramModes[0]);
      const b = getParamValue(read(), operation.paramModes[1]);
      const c = getParamValue(read(), PARAM_MODE.IMMEDIATE);
      // state[c] = a === b ? 1 : 0;

      if (operation.paramModes[2] === PARAM_MODE.RELATIVE_BASE) {
        state[relativeBase + c] = a === b ? 1 : 0;
      } else {
        state[c] = a === b ? 1 : 0;
      }

      debug("EQUALS", a, b, c, a === b);
    } else if (operation.code === OPERATION.ADJUSTS_RELATIVE_BASE) {
      const a = getParamValue(read(), operation.paramModes[0]);
      relativeBase += a;
      debug("ADJUSTS_RELATIVE_BASE", a);
    } else {
      console.log("AAAAHHHHHHHHHHHHHHHH WTF");
    }
  }

  return diagnosticCode;
};

console.log(run(1)); // 3375309317 too low

// console.log("#1:", run(1)); // 7265618
// console.log("#2:", run(5)); // 7731427
