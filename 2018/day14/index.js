const { getInput } = require("../../utils");
const input = getInput();

const part1 = () => {
  const inputInt = parseInt(input);
  const recipes = [3, 7];
  let elf1Current = 0;
  let elf2Current = 1;

  while (recipes.length <= inputInt + 10) {
    let newRecipes = (recipes[elf1Current] + recipes[elf2Current]).toString();
    newRecipes.split("").forEach(x => recipes.push(parseInt(x)));

    elf1Current = (elf1Current + 1 + recipes[elf1Current]) % recipes.length;
    elf2Current = (elf2Current + 1 + recipes[elf2Current]) % recipes.length;
  }

  return recipes.slice(inputInt, inputInt + 10).join("");
};

const part2 = () => {
  const recipes = [3, 7];
  let elf1Current = 0;
  let elf2Current = 1;
  let lastAdded = input;

  for (let i = 0; i < Infinity; i++) {
    let newRecipes = (recipes[elf1Current] + recipes[elf2Current]).toString();
    for (const newRecipe of newRecipes.split("")) {
      recipes.push(parseInt(newRecipe));
      lastAdded = `${lastAdded.substr(1)}${newRecipe}`;
      if (lastAdded === input) {
        return recipes.length - input.length;
      }
    }

    elf1Current = (elf1Current + 1 + recipes[elf1Current]) % recipes.length;
    elf2Current = (elf2Current + 1 + recipes[elf2Current]) % recipes.length;
  }
};

console.log("#1:", part1()); // 3410710325
console.log("#2:", part2()); // 20216138
