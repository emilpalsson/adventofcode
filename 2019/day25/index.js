const readline = require("readline");
const { getInput } = require("../../utils");
const { intcodeComputer } = require("./intcode-computer");
const input = getInput(false, false)
  .split(",")
  .map(Number);

const initialCommands = [
  "north",
  "take dark matter",
  "north",
  "north",
  "take manifold",
  "west",
  "take jam",
  "east",
  "east",
  "take candy cane",
  "west",
  "south",
  "east",
  "south",
  "take antenna",
  "west",
  "take hypercube",
  "east",
  "north",
  "west",
  "south",
  "east",
  "east",
  "take bowl of rice",
  "west",
  "south",
  "take dehydrated water",
  "north",
  "west",
  "south",
  "west",
  "south",
  "west",
  "drop jam",
  "drop bowl of rice",
  "drop antenna",
  "drop manifold",
  "drop hypercube",
  "drop dehydrated water",
  "drop candy cane",
  "drop dark matter"
];

const items = [
  "jam",
  "bowl of rice",
  "antenna",
  "manifold",
  "hypercube",
  "dehydrated water",
  "candy cane",
  "dark matter"
];

function getCombinations(list) {
  var set = [],
    listSize = list.length,
    combinationsCount = 1 << listSize,
    combination;

  for (var i = 1; i < combinationsCount; i++) {
    var combination = [];
    for (var j = 0; j < listSize; j++) {
      if (i & (1 << j)) {
        combination.push(list[j]);
      }
    }
    set.push(combination);
  }
  return set;
}

tests = getCombinations(items);
// console.log(tests);
// return;

const addTestToCommandList = test => {
  test.forEach(item => initialCommands.push(`take ${item}`));
  initialCommands.push("west");
  test.forEach(item => initialCommands.push(`drop ${item}`));
};

const ask = question =>
  new Promise(resolve => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    rl.question(question, input => {
      resolve(input);
      rl.close();
    });
  });

const solve = () => {
  let command = "";
  let commandPointer = 0;
  let outputLine = "";

  const onInput = async () => {
    while (command.length === 0) {
      command = initialCommands.shift();

      if (!command) {
        command = "";
        const testCommands = tests.shift();
        // console.log("testcommands", testCommands);
        if (testCommands) {
          addTestToCommandList(testCommands);
          continue;
        }

        command = await ask("");
      }
      commandPointer = 0;
    }

    if (commandPointer === command.length) {
      command = "";
      return 10;
    }

    return command.charCodeAt(commandPointer++);
  };

  const identifyResult = msg => {
    if (
      msg.startsWith(
        'A loud, robotic voice says "Alert! Droids on this ship are heavier'
      )
    ) {
      return "TOO_LIGHT";
    }
    if (
      msg.startsWith(
        'A loud, robotic voice says "Alert! Droids on this ship are lighter'
      )
    ) {
      return "TOO_HEAVY";
    }
    return "UNKNOWN - " + msg;
  };

  let testResultPointer = null;
  const checkResult = () => {
    if (testResultPointer !== null) {
      testResultPointer++;
      if (testResultPointer === 6) {
        const result = identifyResult(outputLine);
        console.log(result);
        testResultPointer = null;
      }
    } else if (outputLine === "== Pressure-Sensitive Floor ==") {
      testResultPointer = 0;
    }
  };

  const onOutput = output => {
    if (output === 10) {
      checkResult();

      console.log(outputLine);
      outputLine = "";
      return;
    }
    outputLine += String.fromCharCode(output);
  };

  const computer = intcodeComputer({ program: input, onInput, onOutput });
  computer.run();
};
solve();

// console.log("#1:", answer.part1); // 258
// console.log("#2:", answer.part2); // 372
