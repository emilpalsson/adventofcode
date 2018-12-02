var md5 = require("md5");
var { getInput, range } = require("../../utils");
const input = getInput();

const part1 = () => {
  let seed = 0;
  let password = "";
  while (password.length < 8) {
    const hash = md5(input + seed++);
    if (hash.startsWith("00000")) {
      password += hash.substr(5, 1);
    }
  }
  return password;
};

const part2 = () => {
  let seed = 0;
  let password = range(8).map(x => null);
  while (true) {
    const hash = md5(input + seed++);
    if (hash.startsWith("00000") && /[0-7]/.test(hash.substr(5, 1))) {
      const position = parseInt(hash.substr(5, 1), 10);
      if (password[position] === null) {
        password[position] = hash.substr(6, 1);
        if (!password.includes(null)) {
          return password.join("");
        }
      }
    }
  }
};

console.log("#1:", part1());
console.log("#2:", part2());
