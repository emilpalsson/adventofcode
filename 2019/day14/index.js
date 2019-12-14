const { getInput } = require("../../utils");
const input = getInput(true).map(row => row.split(" => "));

const reactions = {};
input.forEach(row => {
  const ingredients = row[0].split(", ");
  const outputChemical = row[1].split(" ")[1];
  const outputQuantity = Number(row[1].split(" ")[0]);

  reactions[outputChemical] = {
    quantity: outputQuantity,
    ingredients: ingredients.map(ingredient => {
      const chemical = ingredient.split(" ")[1];
      const quantity = Number(ingredient.split(" ")[0]);
      return { chemical, quantity };
    })
  };
});

const calculateOreNeeded = fuelCount => {
  const cargo = {};
  let oreNeeded = 0;

  const produceChemical = (chemical, quantity) => {
    if (chemical === "ORE") {
      oreNeeded += quantity;
      return;
    }

    if (!cargo[chemical]) {
      cargo[chemical] = 0;
    }

    // Cargo has all
    if (cargo[chemical] >= quantity) {
      cargo[chemical] -= quantity;
      return;
    }

    // First take from cargo
    quantity -= cargo[chemical];
    cargo[chemical] = 0;

    // Produce what's still needed
    const reaction = reactions[chemical];
    const batches = Math.ceil(quantity / reaction.quantity);
    reaction.ingredients.forEach(ingredient => {
      produceChemical(ingredient.chemical, ingredient.quantity * batches);
    });
    cargo[chemical] += batches * reaction.quantity - quantity;
  };
  produceChemical("FUEL", fuelCount);

  return oreNeeded;
};

const getProducibleFuelCountFromMaxOre = () => {
  const MAX_FUEL = 1000000000000;

  let rangeFrom = 0;
  let rangeTo = MAX_FUEL;

  let answer;
  while (!answer) {
    const testQuantity = Math.ceil((rangeFrom + rangeTo) / 2);
    if (calculateOreNeeded(testQuantity) > MAX_FUEL) {
      rangeTo = testQuantity;
    } else {
      rangeFrom = testQuantity;
    }
    if (rangeFrom + 1 === rangeTo) {
      answer = rangeFrom;
    }
  }
  return answer;
};

console.log("#1", calculateOreNeeded(1)); // 892207
console.log("#2", getProducibleFuelCountFromMaxOre()); // 1935265
