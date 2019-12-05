const { getInput } = require("../../utils");
const input = getInput()
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
  OUTPUT: 4
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

const run = () => {
  const state = input.slice();
  let pointer = 0;

  const getParamValue = (param, paramMode) =>
    paramMode === PARAM_MODE.IMMEDIATE ? param : state[param];

  const read = () => state[pointer++];

  while (state[pointer] !== 99) {
    const operation = parseOperation(read());

    if (operation.code === OPERATION.ADD) {
      const a = getParamValue(read(), operation.paramModes[0]);
      const b = getParamValue(read(), operation.paramModes[1]);
      const resultIndex = getParamValue(read(), PARAM_MODE.IMMEDIATE);
      state[resultIndex] = a + b;
    } else if (operation.code === OPERATION.MULTIPLY) {
      const a = getParamValue(read(), operation.paramModes[0]);
      const b = getParamValue(read(), operation.paramModes[1]);
      const resultIndex = getParamValue(read(), PARAM_MODE.IMMEDIATE);
      state[resultIndex] = a * b;
    } else if (operation.code === OPERATION.INPUT) {
      const a = read();
      state[a] = 1;
    } else if (operation.code === OPERATION.OUTPUT) {
      const a = getParamValue(read(), operation.paramModes[0]);
      console.log(a); // 7265618
    }
  }
};

run();

// console.log("#1:", part1()); // 3562672
// console.log("#2:", part2()); // 8250
