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
    // If cargo contains enough of required chemical
    cargo[chemical] = cargo[chemical] || 0;
    if (cargo[chemical] >= quantity) {
      cargo[chemical] -= quantity;
      return;
    }

    // First take from cargo (if any)
    quantity -= cargo[chemical];
    cargo[chemical] = 0;

    // Produce what's still needed
    const reaction = reactions[chemical];
    const batches = Math.ceil(quantity / reaction.quantity);
    reaction.ingredients.forEach(ingredient => {
      if (ingredient.chemical === "ORE") {
        oreNeeded += ingredient.quantity * batches;
      } else {
        produceChemical(ingredient.chemical, ingredient.quantity * batches);
      }
    });
    cargo[chemical] += batches * reaction.quantity - quantity;
  };
  produceChemical("FUEL", fuelCount);

  return oreNeeded;
};

const getProducibleFuelCount = oreCount => {
  let rangeFrom = 0;
  let rangeTo = oreCount;

  let answer;
  while (!answer) {
    const quantity = Math.ceil((rangeFrom + rangeTo) / 2);
    if (calculateOreNeeded(quantity) > oreCount) {
      rangeTo = quantity;
    } else {
      rangeFrom = quantity;
    }

    if (rangeTo - rangeFrom === 1) {
      answer = rangeFrom;
    }
  }
  return answer;
};

console.log("#1", calculateOreNeeded(1)); // 892207
console.log("#2", getProducibleFuelCount(1000000000000)); // 1935265
