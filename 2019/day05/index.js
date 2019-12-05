const { getInput } = require("../../utils");
const input = getInput(false, false)
  .split(",")
  .map(Number);

const PARAM_MODE = {
  POSITION: 0,
  IMMEDIATE: 1
};

const OPERATION = {
  ADD: 1,
  MULTIPLY: 2,
  INPUT: 3,
  OUTPUT: 4,
  JUMP_IF_TRUE: 5,
  JUMP_IF_FALSE: 6,
  LESS_THAN: 7,
  EQUALS: 8
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

const run = systemId => {
  const state = input.slice();
  let pointer = 0;
  let diagnosticCode;

  const getParamValue = (param, paramMode) =>
    paramMode === PARAM_MODE.IMMEDIATE ? param : state[param];

  const read = () => state[pointer++];

  while (state[pointer] !== 99) {
    const operation = parseOperation(read());

    if (operation.code === OPERATION.ADD) {
      const a = getParamValue(read(), operation.paramModes[0]);
      const b = getParamValue(read(), operation.paramModes[1]);
      const c = getParamValue(read(), PARAM_MODE.IMMEDIATE);
      state[c] = a + b;
    } else if (operation.code === OPERATION.MULTIPLY) {
      const a = getParamValue(read(), operation.paramModes[0]);
      const b = getParamValue(read(), operation.paramModes[1]);
      const c = getParamValue(read(), PARAM_MODE.IMMEDIATE);
      state[c] = a * b;
    } else if (operation.code === OPERATION.INPUT) {
      const a = read();
      state[a] = systemId;
    } else if (operation.code === OPERATION.OUTPUT) {
      diagnosticCode = getParamValue(read(), operation.paramModes[0]);
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
      state[c] = a < b ? 1 : 0;
    } else if (operation.code === OPERATION.EQUALS) {
      const a = getParamValue(read(), operation.paramModes[0]);
      const b = getParamValue(read(), operation.paramModes[1]);
      const c = getParamValue(read(), PARAM_MODE.IMMEDIATE);
      state[c] = a === b ? 1 : 0;
    }
  }

  return diagnosticCode;
};

console.log("#1:", run(1)); // 7265618
console.log("#2:", run(5)); // 7731427
