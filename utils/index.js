var fs = require("fs");

const getInput = (splitRows, test) => {
  const input = fs.readFileSync(test ? "testinput.txt" : "input.txt", "utf8");
  return splitRows ? input.split(/\r\n|\r|\n/) : input;
};

const range = size => [...Array(size).keys()];

const reverse = value => value.split('').reverse().join('') // prettier-ignore

const sum = array => array.reduce((sum, item) => sum + item, 0);

const multiply = array => array.reduce((sum, item) => sum * item);

const getLowestCommonDenominator = (...numbers) => {
  const lcm = (a, b) => {
    return Math.abs(a * b) / gcd(a, b);
  };

  const gcd = (a, b) => {
    a = Math.abs(a);
    b = Math.abs(b);

    if (a < b) {
      const tmp = a;
      a = b;
      b = tmp;
    }

    while (b != 0) {
      const c = a % b;
      a = b;
      b = c;
    }

    return a;
  };

  let result = numbers[0];
  for (let i = 1; i < numbers.length; ++i) {
    result = lcm(result, numbers[i]);
  }
  return result;
};

module.exports = {
  getInput,
  range,
  reverse,
  sum,
  multiply,
  getLowestCommonDenominator
};
