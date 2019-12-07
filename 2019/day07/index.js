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

const run = inputApa => {
  const state = input.slice();
  let pointer = 0;
  let diagnosticCode;
  let inputApaPointer = 0;

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
      state[a] = inputApa[inputApaPointer++];
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

const getCombinations = () => {
  const result = [];
  const nums = [0, 1, 2, 3, 4];

  const getNext = (prefix, availableNums) => {
    availableNums.forEach(num => {
      const remaining = availableNums.filter(x => x !== num);
      if (remaining.length === 0) {
        result.push(prefix + num);
      } else {
        getNext(prefix + num, remaining);
      }
    });
  };

  getNext("", nums);
  return result;
};
const combinations = getCombinations();

const runSequence = inputSequence => {
  let secondParam = 0;
  for (let i = 0; i < 5; i++) {
    secondParam = run([inputSequence[i], secondParam]);
  }
  return secondParam;
};

let highestResult = 0;
combinations.forEach(sequence => {
  const result = runSequence(sequence.split("").map(Number));
  highestResult = Math.max(highestResult, result);
});
console.log(highestResult); //116680

// console.log("#1:", run(1));
// console.log("#2:", run(5));
