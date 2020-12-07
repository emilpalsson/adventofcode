const { getInput } = require("../../utils");
const bagsSpec = {};
getInput(true, false).map((x) => {
  const lineSplit = x.split(" bags contain ");
  lineSplit[1] = lineSplit[1].replace(".", "");
  lineSplit[1].split(", ").forEach((y) => {
    const [amount, style, color] = y.split(" ");
    if (amount !== "no") {
      bagsSpec[lineSplit[0]] = bagsSpec[lineSplit[0]] || [];
      bagsSpec[lineSplit[0]].push({
        bag: `${style} ${color}`,
        amount: parseInt(amount, 10),
      });
    }
  });
});

const bagsSpecArr = Object.entries(bagsSpec);

const canCarry = (color) => {
  return bagsSpecArr.filter(([bagColor, bagSpec]) => bagSpec.some((x) => x.bag === color));
};

const part1 = () => {
  let count = 0;
  const alreadySeen = [];
  const traverse = (color) => {
    const parentBags = canCarry(color);
    // console.log(color, "=>", parentBags.map((x) => x[0]).join(", "), `(${parentBags.length})`);
    parentBags.forEach(([parentColor]) => {
      if (alreadySeen.includes(parentColor)) {
        return;
      }
      alreadySeen.push(parentColor);
      count++;
      traverse(parentColor);
    });
  };
  traverse("shiny gold");
  return count;
};

const part2 = () => {
  let count = 0;
  const traverse = (color, multiplier = 1) => {
    const childBags = bagsSpec[color] || [];
    childBags.forEach((childBag) => {
      count += childBag.amount * multiplier;
      traverse(childBag.bag, multiplier * childBag.amount);
    });
  };
  traverse("shiny gold");
  return count;
};

console.log("#1:", part1()); // 213
console.log("#2:", part2()); // 38426
