const { getInput } = require("../../utils");
const input = getInput().replace(/\r/g, "");

const parseInput = () => {
  const [rulesSection, messages] = input.split("\n\n").map((x) => x.split("\n"));
  let rules = rulesSection.reduce((result, current) => {
    const parts = current.split(": ");
    result[Number(parts[0])] = parts[1].replace(/"/g, "");
    return result;
  }, []);
  return { rules, messages };
};

const replaceMatch = (string, match, replacement) =>
  string.substr(0, match.index) + replacement + string.substr(match.index + match[0].length);

const solve = (rules, messages) => {
  const ruleToRegex = (rule) => {
    let match;
    while ((match = /\d+/.exec(rule))) {
      let toInject = rules[Number(match[0])];
      if (toInject.includes("|")) toInject = `(${toInject})`;
      rule = replaceMatch(rule, match, toInject);
    }
    return new RegExp(`^(${rule.replace(/ /g, "")})$`);
  };

  const re = ruleToRegex(rules[0]);
  return messages.filter((message) => re.test(message)).length;
};

const part1 = () => {
  const { rules, messages } = parseInput();
  return solve(rules, messages);
};

const part2 = () => {
  const { rules, messages } = parseInput();

  rules[8] = "42 | 42 8";
  rules[11] = "42 31 | 42 11 31";

  const expandLoopRuleThreeTimes = (index) => {
    for (let i = 0; i < 3; i++) rules[index] = rules[index].replace(index, `(${rules[index]})`);
    rules[index] = rules[index].replace(index, "hopefully-not-deeper-lol");
  };

  expandLoopRuleThreeTimes(8);
  expandLoopRuleThreeTimes(11);

  return solve(rules, messages);
};

console.log("#1:", part1()); // 111
console.log("#2:", part2()); // 343
