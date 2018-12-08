var fs = require("fs");

const getInput = (splitRows, test) => {
  const input = fs.readFileSync(test ? "testinput.txt" : "input.txt", "utf8");
  return splitRows ? input.split(/\r\n|\r|\n/) : input;
};

const range = size => [...Array(size).keys()];

const reverse = value => value.split('').reverse().join('') // prettier-ignore

const sum = array => array.reduce((sum, item) => sum + item, 0);

module.exports = { getInput, range, reverse, sum };
