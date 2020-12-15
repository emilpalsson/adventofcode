const { getInput } = require("../../utils");
const input = getInput(true);

// getAllOptionsFromMultiDimentionalArray([0, [0, 1], 1, [0, 1]]);
// returns: [ [ 0, 0, 1, 0 ], [ 0, 0, 1, 1 ], [ 0, 1, 1, 0 ], [ 0, 1, 1, 1 ] ]
const getAllOptionsFromMultiDimentionalArray = (array) => {
  let options = [];
  const process = (arr) => {
    const subArrIndex = arr.findIndex((item) => Array.isArray(item));
    if (subArrIndex >= 0) {
      const subArr = arr[subArrIndex];
      subArr.forEach((subArrItem) => {
        process(arr.map((x, i) => (i === subArrIndex ? subArrItem : x)));
      });
    } else {
      options.push(arr);
    }
  };
  process(array);
  return options;
};

const parseAssignmentLine = (line) => {
  const [_, address, value] = /^mem\[(\d+)\] = (\d+)$/.exec(line);
  return {
    address: Number(address),
    value: Number(value),
  };
};

const to36BitBinaryStr = (num) => num.toString(2).padStart(36, "0");

const part1 = () => {
  let mask;
  let mem = [];

  const applyMask = (mask, num) => {
    const maskedBinaryStr = to36BitBinaryStr(num)
      .split("")
      .map((char, index) => {
        return mask[index] === "X" ? char : mask[index];
      })
      .join("");
    return parseInt(maskedBinaryStr, 2);
  };

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
  let mask;
  const mem = new Map();

  const applyMask = (num) => {
    return to36BitBinaryStr(num)
      .split("")
      .map((char, index) => {
        return mask[index] === "0" ? char : mask[index];
      })
      .join("");
  };

  const getAddressesAfterMask = (address) => {
    to36BitBinaryStr(address);
    const maskedAddress = applyMask(to36BitBinaryStr(address));
    const nestedOptionsArr = maskedAddress.split("").map((x) => (x === "X" ? [0, 1] : Number(x)));
    const addresses = getAllOptionsFromMultiDimentionalArray(nestedOptionsArr).map((x) =>
      parseInt(x.join(""), 2)
    );
    return addresses;
  };

  input.forEach((line) => {
    if (line.startsWith("mask")) {
      mask = line.split(" = ").pop();
    } else {
      const assignment = parseAssignmentLine(line);
      const addresses = getAddressesAfterMask(assignment.address);
      addresses.forEach((address) => {
        mem.set(address, assignment.value);
      });
    }
  });

  let sum = 0;
  mem.forEach((v) => (sum += v));
  return sum;
};

console.log("#1:", part1()); // 13496669152158
console.log("#2:", part2()); // 3278997609887
