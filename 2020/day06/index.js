const { getInput } = require("../../utils");
const input = getInput()
  .replace(/\r/g, "")
  .split("\n\n")
  .map((group) => group.split("\n"));

const part1 = () => {
  return input.reduce((sum, group) => {
    const yesByAnyInGroup = new Set(group.join("").split("")).size;
    return sum + yesByAnyInGroup;
  }, 0);
};

const part2 = () => {
  return input.reduce((sum, group) => {
    let yesByAllInGroup = [...group[0]];
    for (let i = group.length - 1; i > 0; i--) {
      yesByAllInGroup = yesByAllInGroup.filter((q) => group[i].includes(q));
    }
    return sum + yesByAllInGroup.length;
  }, 0);
};

console.log("#1:", part1()); // 6703
console.log("#2:", part2()); // 3430
