const { getInput } = require("../../utils");
const input = getInput(true).map((line) =>
  line.split(",").map((sections) => sections.split("-").map(Number))
);

const isFullyOverlapping = (sections1, sections2) => {
  return sections1[0] <= sections2[0] && sections1[1] >= sections2[1];
};

const part1 = () => {
  return input.filter(([elf1, elf2]) => {
    return isFullyOverlapping(elf1, elf2) || isFullyOverlapping(elf2, elf1);
  }).length;
};

const part2 = () => {};

console.log("#1:", part1()); // 511
// console.log("#2:", part2());
