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

const program = phase => {
  const state = input.slice();
  let pointer = 0;
  let output;
  let phaseInitiated = false;

  const getParamValue = (param, paramMode) =>
    paramMode === PARAM_MODE.IMMEDIATE ? param : state[param];

  const read = () => state[pointer++];

  const run = inputValue => {
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
        state[a] = phaseInitiated ? inputValue : phase;
        phaseInitiated = true;
      } else if (operation.code === OPERATION.OUTPUT) {
        output = getParamValue(read(), operation.paramModes[0]);
        return { reason: "OUTPUT", output };
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

    return { reason: "HALT", output };
  };

  return { run };
};

const getCombinations = nums => {
  const result = [];

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

const runAllCombinationsAndGetHighestResult = (runner, phases) => {
  const combinations = getCombinations(phases);
  let highestResult = 0;
  combinations.forEach(sequence => {
    const result = runner(sequence.split("").map(Number));
    highestResult = Math.max(highestResult, result);
  });
  return highestResult;
};

const part1 = () => {
  const run = inputSequence => {
    let lastOutput = 0;
    for (let i = 0; i < 5; i++) {
      lastOutput = program(inputSequence[i]).run(lastOutput).output;
    }
    return lastOutput;
  };
  return runAllCombinationsAndGetHighestResult(run, [0, 1, 2, 3, 4]);
};

const part2 = () => {
  const run = inputSequence => {
    const amplifiers = inputSequence.map(phase => program(phase));
    let lastResult = { output: 0 };
    let currentAmp = 0;
    while (true) {
      lastResult = amplifiers[currentAmp].run(lastResult.output);
      if (lastResult.reason === "HALT" && currentAmp === 4) {
        return lastResult.output;
      }
      currentAmp = (currentAmp + 1) % 5;
    }
  };
  return runAllCombinationsAndGetHighestResult(run, [5, 6, 7, 8, 9]);
};

console.log("#1:", part1()); // 116680
console.log("#2:", part2()); // 89603079
