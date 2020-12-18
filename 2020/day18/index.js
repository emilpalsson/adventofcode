const { getInput } = require("../../utils");
const input = getInput(true);

const innermostParenthesesExpressionRegex = /\([^()]+\)/;

const getFirstOperation = (expression) => {
  return expression.split(" ", 3).join(" ");
};

const calculateLeftToRight = (expression) => {
  while (expression.includes(" ")) {
    const operation = getFirstOperation(expression);
    const result = eval(operation);
    expression = result + expression.substr(operation.length);
  }
  return Number(expression);
};

const evaluate = (expression) => {
  let match;
  while ((match = innermostParenthesesExpressionRegex.exec(expression))) {
    const result = calculateLeftToRight(match[0].substr(1, match[0].length - 2));
    const beforeParentheses = expression.substr(0, match.index);
    const afterParentheses = expression.substr(match.index + match[0].length);
    expression = beforeParentheses + result + afterParentheses;
  }
  return calculateLeftToRight(expression);
};

const part1 = () => {
  return input.reduce((sum, current) => sum + evaluate(current), 0);
};

const part2 = () => {
  return 0;
};

console.log("#1:", part1()); // 13976444272545
// console.log("#2:", part2()); //
