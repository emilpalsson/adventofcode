const { getInput } = require("../../utils");
const input = getInput(true).map((line) => {
  const [ingredients, allergens] = line.substr(0, line.length - 1).split(" (contains ");
  return {
    ingredients: ingredients.split(" "),
    allergens: allergens.split(", "),
  };
});

const part1 = () => {
  const allergenMap = {};

  input.forEach((food) => {
    food.allergens.forEach((allergen) => {
      if (!allergenMap[allergen]) {
        allergenMap[allergen] = [...food.ingredients];
      } else {
        allergenMap[allergen] = allergenMap[allergen].filter((x) => food.ingredients.includes(x));
      }
    });
  });

  const ingredientsPotentiallyContainingAllergens = new Set(Object.values(allergenMap).flat());

  const safeIngredients = [];
  input.forEach((food) => {
    safeIngredients.push(
      ...food.ingredients.filter((x) => !ingredientsPotentiallyContainingAllergens.has(x))
    );
  });
  return safeIngredients.length;
};

const part2 = () => {
  return 0;
};

console.log("#1:", part1()); // 2262
// console.log("#2:", part2()); //
