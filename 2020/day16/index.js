const { getInput } = require("../../utils");
const input = getInput(false, false).replace(/\r/g, "");

const parseInput = () => {
  const [rulesSection, yourTicket, nearbyTicketsSection] = input.split("\n\n");

  const rules = rulesSection.split("\n").map((line) => {
    const [_, property, f1, t1, f2, t2] = /^([^:]+): (\d+)-(\d+) or (\d+)-(\d+)$/.exec(line);
    return {
      property,
      range1: [Number(f1), Number(t1)],
      range2: [Number(f2), Number(t2)],
    };
  });

  const nearbyTickets = nearbyTicketsSection
    .split("\n")
    .slice(1)
    .map((line) => line.split(",").map(Number));

  return {
    rules,
    nearbyTickets,
  };
};

const isInRange = (value, range) => value >= range[0] && value <= range[1];

const part1 = () => {
  const { rules, nearbyTickets } = parseInput();

  const getInvalidValues = (ticket) => {
    let result = [];
    ticket.forEach((value) => {
      for (rule of rules) {
        if (isInRange(value, rule.range1) || isInRange(value, rule.range2)) {
          return;
        }
      }
      result.push(value);
    });
    return result;
  };

  const invalidValues = [];
  nearbyTickets.forEach((ticket) => {
    invalidValues.push(...getInvalidValues(ticket));
  });
  return invalidValues.reduce((sum, current) => sum + current);
};

const part2 = () => {
  return 0;
};

console.log("#1:", part1()); // 18142
// console.log("#2:", part2()); //
