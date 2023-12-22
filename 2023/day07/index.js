const { getInput } = require("../../utils");

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

const isWinningTie = (playerHand, oponentHand) => {
  for (let i = 0; i < 5; i++) {
    if (playerHand.cardsWithJokers[i] > oponentHand.cardsWithJokers[i]) return true;
    if (playerHand.cardsWithJokers[i] < oponentHand.cardsWithJokers[i]) return false;
  }
  console.log("wtf mega tie?");
  return false;
};

const gameComparer = (enableTieSettler) => (game1, game2) => {
  const game1Type = getType(game1);
  const game2Type = getType(game2);
  if (game1Type !== game2Type) {
    return game1Type - game2Type;
  }
  if (!enableTieSettler) return 0;
  return isWinningTie(game1, game2) ? 1 : -1;
};

const part1 = () => {
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
    const [cardsString, bidString] = row.split(" ");
    const cards = cardsString.split("").map(getCardScore);
    return handFactory(cards, Number(bidString), cards);
  });

  const sortedGames = games.toSorted(gameComparer(true));
  const totalWinnings = sortedGames.reduce((aggr, game, index) => aggr + game.bid * (index + 1), 0);
  return totalWinnings;
};

const handFactory = (cards, bid, cardsWithJokers) => {
  const groupedCards = Object.groupBy(cards, (x) => x);
  const cardCount = Object.entries(groupedCards)
    .map(([card, cards]) => ({ card, count: cards.length }))
    .sort((a, b) => b.count - a.count);
  return { cards, cardCount, bid, cardsWithJokers };
};

const part2 = () => {
  const getCardScore = (card) => {
    switch (card) {
      case "A":
        return 13;
      case "K":
        return 12;
      case "Q":
        return 11;
      case "J":
        return 1;
      case "T":
        return 10;
      default:
        return Number(card);
    }
  };

  const hands = getInput(true).map((row) => {
    const [cardsString, bidString] = row.split(" ");
    const cards = cardsString.split("").map(getCardScore);
    return { cards, bid: Number(bidString) };
  });

  const getBestJokerHand = (hand) => {
    const cardOptions = hand.cards.map((card) =>
      card === 1 ? [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13] : [card]
    );

    const possibleCombinations = [];

    const recuse = (cardsSoFar, index) => {
      if (cardsSoFar.length === 5) {
        possibleCombinations.push(handFactory(cardsSoFar, hand.bid, hand.cards));
        return;
      }

      cardOptions[index].forEach((nextCardOption) => {
        recuse([...cardsSoFar, nextCardOption], index + 1);
      });
    };

    recuse([], 0);

    possibleCombinations.sort(gameComparer(false)).reverse();
    return possibleCombinations[0];
  };

  const handsWithoutJokers = hands.map((hand) => getBestJokerHand(hand));

  const sortedGames = handsWithoutJokers.toSorted(gameComparer(true));
  const totalWinnings = sortedGames.reduce((aggr, game, index) => aggr + game.bid * (index + 1), 0);
  return totalWinnings;
};

console.log("#1:", part1()); // 251029473
console.log("#2:", part2()); // 251003917
