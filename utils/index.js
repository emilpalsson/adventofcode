var fs = require("fs");

const getInput = (day, splitRows) => {
  const input = fs.readFileSync(
    "day" + day.toString().padStart(2, "0") + ".txt",
    "utf8"
  );
  return splitRows ? input.split(/\r\n|\r|\n/) : input;
};

const range = size => [...Array(size).keys()];

const reverse = value => value.split('').reverse().join('') // prettier-ignore

module.exports = { getInput, range, reverse };
