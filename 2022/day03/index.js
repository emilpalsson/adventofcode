const { getInput, sum } = require("../../utils");
const input = getInput(true).map((x) => x.split(""));

const getItemPriority = (item) => {
  const code = item.charCodeAt(0);
  const isLowercase = code > 90;
  return isLowercase ? code - 96 : code - 38;
};

const part1 = () => {
  const priorities = input.map((rucksack) => {
    const compartment1 = rucksack.slice(0, rucksack.length / 2);
    const compartment2 = rucksack.slice(rucksack.length / 2);

    const failedItemType = compartment1.find((a) => compartment2.includes(a));
    return getItemPriority(failedItemType);
  });

  return sum(priorities);
};

const part2 = () => {
  const groups = [];
  for (let i = 0; i < input.length; i += 3) {
    groups.push([input[i], input[i + 1], input[i + 2]]);
  }

  const priorities = groups.map((group) => {
    const badge = group[0].find((x) => group[1].includes(x) && group[2].includes(x));
    return getItemPriority(badge);
  });

  return sum(priorities);
};

console.log("#1:", part1()); // 7826
console.log("#2:", part2()); // 2577
