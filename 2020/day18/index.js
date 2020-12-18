const { getInput } = require("../../utils");
const input = getInput(true);

const innermostParenthesesExpressionRegex = /\([^()]+\)/;
const additionOperationRegex = /\d+ \+ \d+/;

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

const calculateWithPrecedence = (expression) => {
  let match;
  while ((match = additionOperationRegex.exec(expression))) {
    const result = eval(match[0]);
    const beforeOperation = expression.substr(0, match.index);
    const afterOperation = expression.substr(match.index + match[0].length);
    expression = beforeOperation + result + afterOperation;
  }
  return Number(eval(expression));
};

const evaluate = (expression, calculate) => {
  let match;
  while ((match = innermostParenthesesExpressionRegex.exec(expression))) {
    const result = calculate(match[0].substr(1, match[0].length - 2));
    const beforeParentheses = expression.substr(0, match.index);
    const afterParentheses = expression.substr(match.index + match[0].length);
    expression = beforeParentheses + result + afterParentheses;
  }
  return calculate(expression);
};

const part1 = () => {
  return input.reduce((sum, current) => sum + evaluate(current, calculateLeftToRight), 0);
};

const part2 = () => {
  return input.reduce((sum, current) => sum + evaluate(current, calculateWithPrecedence), 0);
};

console.log("#1:", part1()); // 13976444272545
console.log("#2:", part2()); // 88500956630893
