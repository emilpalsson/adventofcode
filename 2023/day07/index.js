const { getInput } = require("../../utils");

const getCardScore = (card) => {
  switch (card) {
    case "A":
      return 14;
    case "K":
      return 13;
    case "Q":
      return 12;
    case "J":
      return 11;
    case "T":
      return 10;
    default:
      return Number(card);
  }
};

const games = getInput(true).map((row) => {
  const [handString, bidString] = row.split(" ");
  const hand = handString.split("").map(getCardScore);
  const groupedCards = Object.groupBy(hand, (x) => x);
  const cardCount = Object.entries(groupedCards)
    .map(([card, cards]) => ({
      card,
      count: cards.length,
    }))
    .sort((a, b) => b.count - a.count);
  return { handString, hand, cardCount, bid: Number(bidString) };
});

const HandType = {
  FiveOfAKind: 7,
  FourOfAKind: 6,
  FullHouse: 5,
  ThreeOfAKind: 4,
  TwoPair: 3,
  OnePair: 2,
  HighCard: 1,
};

const getType = (game) => {
  if (game.cardCount[0].count === 5) return HandType.FiveOfAKind;
  if (game.cardCount[0].count === 4) return HandType.FourOfAKind;
  if (game.cardCount[0].count === 3 && game.cardCount[1].count === 2) return HandType.FullHouse;
  if (game.cardCount[0].count === 3) return HandType.ThreeOfAKind;
  if (game.cardCount[0].count === 2 && game.cardCount[1].count === 2) return HandType.TwoPair;
  if (game.cardCount[0].count === 2) return HandType.OnePair;
  return HandType.HighCard;
};

const isWinningTie = (playerGame, oponentGame) => {
  for (let i = 0; i < 5; i++) {
    if (playerGame.hand[i] > oponentGame.hand[i]) return true;
    if (playerGame.hand[i] < oponentGame.hand[i]) return false;
  }
  console.log("wtf mega tie?");
  return false;
};

const gameComparer = (game1, game2) => {
  const game1Type = getType(game1);
  const game2Type = getType(game2);
  if (game1Type !== game2Type) {
    return game1Type - game2Type;
  }
  return isWinningTie(game1, game2) ? 1 : -1;
};

const part1 = () => {
  const sortedGames = games.toSorted(gameComparer);
  const totalWinnings = sortedGames.reduce((aggr, game, index) => aggr + game.bid * (index + 1), 0);
  return totalWinnings;
};

const part2 = () => {};

console.log("#1:", part1()); // 251029473
// console.log("#2:", part2());
