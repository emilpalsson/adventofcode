const { getInput, sum } = require("../../utils");
const input = getInput(true);

const getItemPriority = (item) => {
  const code = item.charCodeAt(0);
  const isLowercase = code > 90;
  return isLowercase ? code - 96 : code - 38;
};

const part1 = () => {
  const priorities = input.map((rucksack) => {
    const compartment1 = rucksack.slice(0, rucksack.length / 2).split("");
    const compartment2 = rucksack.slice(rucksack.length / 2).split("");

    const failedItemType = new Set(compartment1.filter((a) => compartment2.includes(a)))
      .values()
      .next().value;
    return getItemPriority(failedItemType);
  });

  return sum(priorities);
};

const part2 = () => {};

console.log("#1:", part1()); // 7826
// console.log("#2:", part2());
