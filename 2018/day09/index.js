const { getInput, range } = require("../../utils");
const CircularLinkedList = require("../../utils/circular-linked-list");

const play = (players, endingMarble) => {
  const scores = range(players).map(() => 0);
  let currentPlayer = -1;
  let currentMarble = new CircularLinkedList(0);

  for (let marbleValue = 1; marbleValue <= endingMarble * 1; marbleValue++) {
    currentPlayer = (currentPlayer + 1) % players;
    if (marbleValue % 23 === 0) {
      currentMarble = currentMarble.prev.prev.prev.prev.prev.prev.prev;
      scores[currentPlayer] += marbleValue + currentMarble.value;
      currentMarble = currentMarble.remove();
    } else {
      currentMarble = currentMarble.next.insert(marbleValue);
    }
  }

  return Math.max(...scores);
};

const solve = () => {
  const input = getInput().split(" ");
  const players = parseInt(input[0]);
  const endingMarble = parseInt(input[6]);

  return {
    part1: play(players, endingMarble),
    part2: play(players, endingMarble * 100)
  };
};

const answer = solve();

console.log("#1:", answer.part1); // 436720
console.log("#2:", answer.part2); // 3527845091
