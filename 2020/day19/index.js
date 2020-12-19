const { getInput } = require("../../utils");
const input = getInput(false, false).replace(/\r/g, "");

const replaceMatch = (string, match, replacement) =>
  string.substr(0, match.index) + replacement + string.substr(match.index + match[0].length);

const part1 = () => {
  const [rulesSection, messages] = input.split("\n\n").map((x) => x.split("\n"));
  let rules = rulesSection.reduce((result, current) => {
    const parts = current.split(": ");
    result[Number(parts[0])] = parts[1].replace(/"/g, "");
    return result;
  }, []);

  let match;
  while ((match = /\d+/.exec(rules[0]))) {
    let toInject = rules[Number(match[0])];
    if (toInject.includes("|")) toInject = `(${toInject})`;
    rules[0] = replaceMatch(rules[0], match, toInject);
  }
  const re = new RegExp(`^(${rules[0].replace(/ /g, "")})$`);

  return messages.filter((message) => re.test(message)).length;
};

const part2 = () => {
  return 0;
};

console.log("#1:", part1()); // 111
// console.log("#2:", part2()); //
