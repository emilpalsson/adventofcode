var fs = require("fs");

const getInput = (day, splitRows) => {
  const input = fs.readFileSync(
    "day" + day.toString().padStart(2, "0") + ".txt",
    "utf8"
  );
  return splitRows ? input.split("\n") : input;
};

const range = size => [...Array(size).keys()];

module.exports = { getInput, range };
