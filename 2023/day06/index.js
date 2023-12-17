const { getInput, multiply } = require("../../utils");

const getWinningAlternatives = (raceTime, recordDistance) => {
  let winningAlternatives = 0;
  for (let i = 1; i < raceTime; i++) {
    const speed = i;
    const movingTime = raceTime - i;
    const distance = movingTime * speed;
    const isWin = distance > recordDistance;
    if (isWin) {
      winningAlternatives++;
    }
  }
  return winningAlternatives;
};

const part1 = () => {
  const parseInput = () => {
    const input = getInput(true);

    const times = input[0].split(/:\s+/)[1].split(/\s+/).map(Number);
    const distances = input[1].split(/:\s+/)[1].split(/\s+/).map(Number);

    const races = times.map((time, index) => ({ time, recordDistance: distances[index] }));
    return races;
  };
  races = parseInput();

  const raceResults = races.map((race) => getWinningAlternatives(race.time, race.recordDistance));
  return multiply(raceResults);
};

const part2 = () => {
  const parseInput = () => {
    const input = getInput(true);

    const time = Number(input[0].substring(5).replaceAll(" ", ""));
    const distance = Number(input[1].substring(9).replaceAll(" ", ""));

    const race = { time, recordDistance: distance };
    return [race];
  };
  races = parseInput();

  const raceResults = races.map((race) => getWinningAlternatives(race.time, race.recordDistance));
  return multiply(raceResults);
};

console.log("#1:", part1()); // 128700
console.log("#2:", part2()); // 39594072
