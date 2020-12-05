const { getInput } = require("../../utils");
const input = getInput(true);

const seatCodeToSeatId = (seatCode) => {
  const binaryStr = seatCode.replace(/[FL]/g, "0").replace(/[BR]/g, "1");
  const row = parseInt(binaryStr.substr(0, 7), 2);
  const col = parseInt(binaryStr.substr(7), 2);
  return row * 8 + col;
};

const main = () => {
  const seatIds = input.map(seatCodeToSeatId).sort((a, b) => a - b);
  return {
    part1: seatIds[seatIds.length - 1],
    part2: seatIds.find((seatId, index) => seatIds[index + 1] !== seatId + 1) + 1,
  };
};

const answer = main();
console.log("#1:", answer.part1); // 980
console.log("#2:", answer.part2); // 607
