const { getInput } = require("../../utils");
const input = getInput(false, false)
  .replace(/\r/g, "")
  .split("\n\n")
  .map((group) => {
    return group.split("\n");
  });

const countQuestionsWhereEveryoneAnsweredYes = (yesPerPerson) => {
  let answeredYes = [...yesPerPerson[0]];

  for (let i = yesPerPerson.length - 1; i > 0; i--) {
    answeredYes.forEach((question) => {
      if (!yesPerPerson[i].includes(question)) {
        answeredYes = answeredYes.filter((x) => x !== question);
      }
    });
  }

  return answeredYes.length;
};

const part2 = () => {
  const apa = input.map(countQuestionsWhereEveryoneAnsweredYes);
  return apa.reduce((sum, x) => sum + x, 0);
};

// console.log("#1:", part1()); // 6703
console.log("#2:", part2()); // 3430
