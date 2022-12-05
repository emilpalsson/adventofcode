const { getInput } = require("../../utils");
const input = getInput(true).map((line) =>
  line.split(",").map((sections) => sections.split("-").map(Number))
);

const part1 = () => {
  const isFullyOverlapping = (sections1, sections2) => {
    return sections1[0] <= sections2[0] && sections1[1] >= sections2[1];
  };

  return input.filter(([elf1, elf2]) => {
    return isFullyOverlapping(elf1, elf2) || isFullyOverlapping(elf2, elf1);
  }).length;
};

const part2 = () => {
  const isPartiallyOverlapping = (sections1, sections2) => {
    return sections1[0] <= sections2[1] && sections1[1] >= sections2[0];
  };

  return input.filter(([elf1, elf2]) => {
    return isPartiallyOverlapping(elf1, elf2) || isPartiallyOverlapping(elf2, elf1);
  }).length;
};

console.log("#1:", part1()); // 511
console.log("#2:", part2()); // 821
