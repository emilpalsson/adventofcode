const { getInput } = require("../../utils");
const input = getInput(true).map(row => row.split(" => "));

const rootMaterials = {};
const recepies = {};
input.forEach(row => {
  const ingredients = row[0].split(", ");
  const outputParts = row[1].split(" ");
  const outputMaterial = outputParts[1];
  const outputQuantity = Number(outputParts[0]);

  recepies[outputMaterial] = {
    quantity: outputQuantity,
    ingredients: ingredients.map(ingredient => {
      const ingredientParts = ingredient.split(" ");
      const material = ingredientParts[1];
      const quantity = Number(ingredientParts[0]);
      return { material, quantity };
    })
  };

  if (recepies[outputMaterial].ingredients[0].material === "ORE") {
    rootMaterials[outputMaterial] = {
      input: recepies[outputMaterial].ingredients[0].quantity,
      output: outputQuantity
    };
  }
});

const calc = fuelCount => {
  const inventory = {};
  let totalOre = 0;

  const consume = (material, quantity) => {
    if (material === "ORE") {
      totalOre += quantity;
      return;
    }

    if (!inventory[material]) {
      inventory[material] = 0;
    }

    // Inventory has all
    if (inventory[material] >= quantity) {
      inventory[material] -= quantity;
      return;
    }

    // First take from inventory
    quantity -= inventory[material];
    inventory[material] = 0;

    // Produce what's still needed
    const recepie = recepies[material];
    const satser = Math.ceil(quantity / recepie.quantity);
    recepie.ingredients.forEach(ingredient => {
      consume(ingredient.material, ingredient.quantity * satser);
    });
    inventory[material] += satser * recepie.quantity - quantity;
  };
  consume("FUEL", fuelCount);

  return totalOre;
};

const getFuelFromMaxOreCapacity = () => {
  const MAX_FUEL = 1000000000000;

  let from = 0;
  let to = MAX_FUEL;

  let answer;
  while (!answer) {
    const testQuantity = Math.ceil((from + to) / 2);
    if (calc(testQuantity) > MAX_FUEL) {
      to = testQuantity;
    } else {
      from = testQuantity;
    }
    if (from + 1 === to) {
      answer = from;
    }
  }
  return answer;
};

console.log("#1", calc(1)); // 892207
console.log("#2", getFuelFromMaxOreCapacity()); // 1935265
