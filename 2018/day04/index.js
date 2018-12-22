const { getInput, range } = require("../../utils");
const input = getInput(true, false).sort();

const countTotalAsleep = shift =>
  shift.sleeps.reduce((sum, sleep) => sum + sleep.minutes, 0);

const parseShifts = () => {
  const shifts = [];
  let shift;
  input.forEach(row => {
    const timestamp = new Date(row.substr(1, 16));
    const event = row.substr(19);
    if (event === "falls asleep") {
      shift.sleeps.push({
        fallsAsleep: timestamp
      });
    } else if (event === "wakes up") {
      const currentSleep = shift.sleeps[shift.sleeps.length - 1];
      currentSleep.wakesUp = timestamp;
      currentSleep.minutes = (timestamp - currentSleep.fallsAsleep) / 1000 / 60;
    } else {
      if (shift) {
        shift.totalAsleep = countTotalAsleep(shift);
        shift.end = timestamp;
        shifts.push(shift);
      }
      shift = {
        guard: event.split(" ")[1],
        start: timestamp,
        sleeps: []
      };
    }
  });
  return shifts;
};

const findMostSleepingGuard = shifts => {
  const guards = {};
  shifts.forEach(shift => {
    guards[shift.guard] = (guards[shift.guard] || 0) + shift.totalAsleep;
  });

  const mostSleepingGuard = Object.entries(guards).reduce(
    (max, guard) => (guard[1] > max[1] ? guard : max),
    ["", 0]
  );

  return { guard: mostSleepingGuard[0], minutes: mostSleepingGuard[1] };
};

const findMinuteWhenMostAsleep = (shifts, guard) => {
  const minutes = range(60).map(x => 0);
  shifts
    .filter(shift => shift.guard === guard)
    .forEach(shift => {
      shift.sleeps.forEach(sleep => {
        const fallsAsleep = sleep.fallsAsleep.getMinutes();
        const wakesUp = sleep.wakesUp.getMinutes();
        for (let m = fallsAsleep; m < wakesUp; m++) {
          minutes[m]++;
        }
      });
    });

  const mostLikelyToBeAsleepMinute = minutes.reduce(
    (result, daysWhenAsleepThisMinute, minute) => {
      if (daysWhenAsleepThisMinute > result.daysWhenAsleepThisMinute) {
        return {
          daysWhenAsleepThisMinute,
          minute
        };
      }
      return result;
    },
    { daysWhenAsleepThisMinute: 0 }
  );
  return mostLikelyToBeAsleepMinute;
};

const getAllGauards = shifts => [
  ...shifts.reduce((result, current) => result.add(current.guard), new Set())
];

const solve = () => {
  const shifts = parseShifts();

  // part 1
  const mostSleeping = findMostSleepingGuard(shifts);
  const minute = findMinuteWhenMostAsleep(shifts, mostSleeping.guard).minute;

  // part 2
  const guards = getAllGauards(shifts).map(guard => ({
    guard,
    ...findMinuteWhenMostAsleep(shifts, guard)
  }));
  guards.sort(
    (a, b) => b.daysWhenAsleepThisMinute - a.daysWhenAsleepThisMinute
  );
  const guardWithMostSleepsOnSameMinute = guards[0];

  return {
    part1: parseInt(mostSleeping.guard.substr(1)) * minute,
    part2:
      parseInt(guardWithMostSleepsOnSameMinute.guard.substr(1)) *
      guardWithMostSleepsOnSameMinute.minute
  };
};

const answer = solve();

console.log("#1:", answer.part1); // 87681
console.log("#2:", answer.part2); // 136461
