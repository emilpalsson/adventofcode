var fs = require("fs");

const getInput = splitRows => {
  const input = fs.readFileSync("input.txt", "utf8");
  return splitRows ? input.split(/\r\n|\r|\n/) : input;
};

const range = size => [...Array(size).keys()];

const reverse = value => value.split('').reverse().join('') // prettier-ignore

module.exports = { getInput, range, reverse };
