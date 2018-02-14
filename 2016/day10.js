const { getInput } = require("../utils");
const input = getInput(10, true).map(row => row.split(" "));

const instructions = {};
const bots = [];
const outputs = [];

const giveTo = {
  bot: (chip, id) => {
    if (!bots[id]) bots[id] = [];
    bots[id].push(chip);
  },
  output: (chip, id) => {
    if (!outputs[id]) outputs[id] = [];
    outputs[id].push(chip);
  }
};

input.forEach(row => {
  if (row[0] === "value") {
    giveTo.bot(parseInt(row[1], 10), parseInt(row[5], 10));
  } else {
    instructions[parseInt(row[1], 10)] = {
      low: { type: row[5], id: parseInt(row[6], 10) },
      high: { type: row[10], id: parseInt(row[11], 10) }
    };
  }
});

let part1Answer;
let botWith2Chips = bots.findIndex(bot => bot && bot.length === 2);
while (botWith2Chips >= 0) {
  const [low, high] = bots[botWith2Chips].sort((a, b) => a - b);
  if (low === 17 && high === 61) {
    part1Answer = botWith2Chips;
  }

  const instruction = instructions[botWith2Chips];
  giveTo[instruction.low.type](low, instruction.low.id);
  giveTo[instruction.high.type](high, instruction.high.id);
  bots[botWith2Chips].length = 0;

  botWith2Chips = bots.findIndex(bot => bot && bot.length === 2);
}

console.log("#1:", part1Answer);
console.log("#2:", outputs[0] * outputs[1] * outputs[2]);
