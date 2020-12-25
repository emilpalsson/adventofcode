const { getInput } = require("../../utils");
const input = getInput().replace(/\r/g, "");

const parseDecks = () => input.split("\n\n").map((x) => x.split("\n").slice(1).map(Number));

const calculateScore = (deck) => {
  return deck.reverse().reduce((result, card, index) => {
    return result + card * (index + 1);
  }, 0);
};

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

  while (player1.length > 0 && player2.length > 0) {
    play();
  }

  return calculateScore(player1) || calculateScore(player2);
};

const part2 = () => {
  let winningDeck;

  const play = (deck1, deck2) => {
    const player1 = [...deck1];
    const player2 = [...deck2];

    const player1History = new Set();
    const player2History = new Set();

    while (true) {
      // Check history
      const player1State = player1.join("");
      const player2State = player2.join("");
      if (player2History.has(player2State)) {
        // State already seen, player 1 wins
        return 1;
      }
      player1History.add(player1State);
      player2History.add(player2State);

      // Draw cards
      const p1 = player1.shift();
      const p2 = player2.shift();

      let winner;
      if (player1.length >= p1 && player2.length >= p2) {
        // Recurse (if enough cards)
        winner = play(player1.slice(0, p1), player2.slice(0, p2));
      } else {
        // Highest card wins (if not enough cards to recurse)
        winner = p1 > p2 ? 1 : 2;
      }

      // Apply result
      if (winner === 1) {
        player1.push(p1, p2);
      } else {
        player2.push(p2, p1);
      }

      // Check for winner
      if (player1.length === 0) {
        winningDeck = player2;
        return 2;
      } else if (player2.length === 0) {
        winningDeck = player1;
        return 1;
      }
    }
  };

  play(...parseDecks());
  return calculateScore(winningDeck);
};

console.log("#1:", part1()); // 34566
console.log("#2:", part2()); // 31854
