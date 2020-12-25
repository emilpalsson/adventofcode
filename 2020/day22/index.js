const { getInput } = require("../../utils");
const input = getInput().replace(/\r/g, "");

const parseDecks = () => input.split("\n\n").map((x) => x.split("\n").slice(1).map(Number));

const part1 = () => {
  const [player1, player2] = parseDecks();

  const play = () => {
    const p1 = player1.shift();
    const p2 = player2.shift();
    if (p1 > p2) {
      player1.push(p1);
      player1.push(p2);
    } else {
      player2.push(p2);
      player2.push(p1);
    }
  };

  const calculateScore = (deck) => {
    return deck.reverse().reduce((result, card, index) => {
      return result + card * (index + 1);
    }, 0);
  };

  while (player1.length > 0 && player2.length > 0) {
    play();
  }

  return calculateScore(player1) || calculateScore(player2);
};

const part2 = () => {
  return 0;
};

console.log("#1:", part1()); // 34566
// console.log("#2:", part2()); //
