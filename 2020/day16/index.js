const { getInput } = require("../../utils");
const input = getInput().replace(/\r/g, "");

const parseInput = () => {
  const [rulesSection, yourTicketSection, nearbyTicketsSection] = input.split("\n\n");

  const rules = rulesSection.split("\n").map((line, index) => {
    const [_, property, f1, t1, f2, t2] = /^([^:]+): (\d+)-(\d+) or (\d+)-(\d+)$/.exec(line);
    return {
      index,
      property,
      range1: [Number(f1), Number(t1)],
      range2: [Number(f2), Number(t2)],
    };
  });

  const yourTicket = yourTicketSection.split("\n")[1].split(",").map(Number);

  const nearbyTickets = nearbyTicketsSection
    .split("\n")
    .slice(1)
    .map((line) => line.split(",").map(Number));

  return {
    rules,
    yourTicket,
    nearbyTickets,
  };
};

const isInRange = (value, range) => value >= range[0] && value <= range[1];

const main = () => {
  const { rules, yourTicket, nearbyTickets } = parseInput();

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
  const validTickets = nearbyTickets.filter((ticket) => {
    const invalid = getInvalidValues(ticket);
    invalidValues.push(...invalid);
    return invalid.length === 0;
  });
  validTickets.push(yourTicket);

  const findMatchingRulesForValues = (values) => {
    return rules.filter((rule) => {
      if (rule.hasOwnProperty("propertyIndex")) return false;

      for (value of values) {
        if (!isInRange(value, rule.range1) && !isInRange(value, rule.range2)) {
          return false;
        }
      }

      return true;
    });
  };

  const findNextPropertyRuleMatch = () => {
    for (propertyIndex in yourTicket) {
      const currentPropertyValues = validTickets.map((ticket) => ticket[propertyIndex]);
      const matchingRules = findMatchingRulesForValues(currentPropertyValues);
      if (matchingRules.length === 1) {
        return { propertyIndex, ruleIndex: matchingRules[0].index };
      }
    }
    throw new Error("No single match found");
  };

  while (rules.some((rule) => !rule.hasOwnProperty("propertyIndex"))) {
    const match = findNextPropertyRuleMatch();
    rules[match.ruleIndex].propertyIndex = match.propertyIndex;
  }

  const departureValuesMultiplied = rules
    .filter((rule) => rule.property.startsWith("departure "))
    .map((rule) => yourTicket[rule.propertyIndex])
    .reduce((sum, current) => sum * current);

  return {
    ticketScanningErrorRate: invalidValues.reduce((sum, current) => sum + current),
    departureValuesMultiplied,
  };
};

const answer = main();
console.log("#1:", answer.ticketScanningErrorRate); // 18142
console.log("#2:", answer.departureValuesMultiplied); // 1069784384303
