const { getInput } = require("../../utils");
const input = getInput(true, false);

const parseAssignmentLine = (line) => {
  const [_, address, value] = /^mem\[(\d+)\] = (\d+)$/.exec(line);
  return {
    address: Number(address),
    value: Number(value),
  };
};

const to36BitBinaryStr = (num) => num.toString(2).padStart(36, "0");
const applyMask = (mask, num) => {
  const maskedBinaryStr = to36BitBinaryStr(num)
    .split("")
    .map((char, index) => {
      return mask[index] === "X" ? char : mask[index];
    })
    .join("");
  return parseInt(maskedBinaryStr, 2);
};

const part1 = () => {
  let mask;
  let mem = [];

  input.forEach((line) => {
    if (line.startsWith("mask")) {
      mask = line.split(" = ").pop();
    } else {
      const assignment = parseAssignmentLine(line);
      mem[assignment.address] = applyMask(mask, assignment.value);
    }
  });

  return mem.reduce((sum, current) => sum + (current || 0), 0);
};

const part2 = () => {
  return 0;
};

console.log("#1:", part1()); // 13496669152158
// console.log("#2:", part2()); //
