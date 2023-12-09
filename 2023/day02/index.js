const { getInput, sum } = require("../../utils");

const emptySet = { red: 0, green: 0, blue: 0 };

const getGames = () => {
  const input = getInput(true);
  return input.map((row) => {
    const [gameIdString, setsString] = row.split(": ");
    const sets = setsString.split("; ").map((setString) => {
      return setString.split(", ").reduce(
        (game, hand) => {
          const [num, color] = hand.split(" ");
          game[color] = Number(num);
          return game;
        },
        { ...emptySet }
      );
    });

    return { gameId: Number(gameIdString.substring(5)), sets };
  });
};

const games = getGames();

const part1 = () => {
  const isPossibleSet = (set) => set.red <= 12 && set.green <= 13 && set.blue <= 14;
  const isPossibleGame = (game) => game.sets.every(isPossibleSet);

  const possibleGames = games.filter(isPossibleGame);
  return possibleGames.reduce((sum, game) => sum + game.gameId, 0);
};

const part2 = () => {
  return sum(
    games.map((game) => {
      const minimumNumberOfCubes = { ...emptySet };
      game.sets.forEach((set) => {
        minimumNumberOfCubes.red = Math.max(minimumNumberOfCubes.red, set.red);
        minimumNumberOfCubes.green = Math.max(minimumNumberOfCubes.green, set.green);
        minimumNumberOfCubes.blue = Math.max(minimumNumberOfCubes.blue, set.blue);
      });
      return minimumNumberOfCubes.red * minimumNumberOfCubes.green * minimumNumberOfCubes.blue;
    })
  );
};

console.log("#1:", part1()); // 2476
console.log("#2:", part2()); // 54911
