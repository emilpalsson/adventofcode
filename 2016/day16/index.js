var { getInput, reverse } = require("../../utils");
const input = getInput();

const generateData = (data, length) => {
  while (data.length < length) {
    const reversed = reverse(data)
      .replace(/0/g, "x")
      .replace(/1/g, "0")
      .replace(/x/g, "1");
    data = `${data}0${reversed}`;
  }
  return data.substr(0, length);
};

const calcChecksum = data => {
  while (data.length % 2 === 0) {
    data = data
      .match(/(..)/g)
      .map(pair => (pair[0] === pair[1] ? "1" : "0"))
      .join("");
  }
  return data;
};

console.log("#1:", calcChecksum(generateData(input, 272)));
console.log("#2:", calcChecksum(generateData(input, 35651584)));
