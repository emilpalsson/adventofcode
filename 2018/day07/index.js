const { getInput, range } = require("../../utils");
const input = getInput(true);

const parseDependencies = () =>
  input.reduce((result, row) => {
    const split = row.split(" ");
    const dependentOn = split[1];
    const step = split[7];
    if (!result[step]) {
      result[step] = [dependentOn];
    } else {
      result[step].push(dependentOn);
    }
    return result;
  }, {});

const getAllSteps = dependencies => {
  const stepsWithDependencies = Object.keys(dependencies);
  const allSteps = new Set(stepsWithDependencies);
  stepsWithDependencies.forEach(step => {
    dependencies[step].forEach(dependency => allSteps.add(dependency));
  });
  return allSteps;
};

const getNextStep = (dependencies, stepsNotStarted) => {
  if (
    stepsNotStarted &&
    stepsNotStarted.size === 1 &&
    Object.keys(dependencies).length === 0
  ) {
    return [...stepsNotStarted][0];
  }
  const stepsWithDependencies = Object.keys(dependencies);
  let availableSteps = [
    ...stepsWithDependencies.reduce((result, step) => {
      dependencies[step].forEach(dependency => {
        if (!stepsWithDependencies.includes(dependency)) {
          result.add(dependency);
        }
      });
      return result;
    }, new Set())
  ];
  if (stepsNotStarted) {
    availableSteps = availableSteps.filter(s => stepsNotStarted.has(s));
  }
  availableSteps.sort();
  return availableSteps[0];
};

const removeStepFromDependencies = (dependencies, step) => {
  Object.keys(dependencies).forEach(key => {
    dependencies[key] = dependencies[key].filter(x => x !== step);
    if (dependencies[key].length === 0) {
      delete dependencies[key];
    }
  });
};

const part1 = () => {
  const runStep = step => {
    removeStepFromDependencies(dependencies, step);
    stepsToRun.delete(step);
  };

  const getStepOrder = () => {
    let stepOrder = "";
    while ((nextStep = getNextStep(dependencies))) {
      stepOrder += nextStep;
      runStep(nextStep);
    }
    stepOrder += [...stepsToRun][0];
    return stepOrder;
  };

  const dependencies = parseDependencies();
  const stepsToRun = getAllSteps(dependencies);
  return getStepOrder();
};

const part2 = () => {
  const NUMBER_OF_WORKERS = 5; // 2 for test case, 5 for actual
  const STEP_DURATION_BASE = 60; // 0 for test case, 60 for actual

  const workers = range(NUMBER_OF_WORKERS).map(() => ({ available: true }));
  let ticks = 0;

  const getStepDuration = step => step.charCodeAt() - 64 + STEP_DURATION_BASE;
  const getAvailableWorker = () => workers.find(worker => worker.available);

  const putIdlingWorkersToWork = () => {
    while (true) {
      const worker = getAvailableWorker();
      const nextStep = getNextStep(dependencies, stepsNotStarted);
      if (!worker || !nextStep) break;
      worker.available = false;
      worker.step = nextStep;
      worker.timeRemaining = getStepDuration(nextStep);
      stepsNotStarted.delete(nextStep);
    }
  };

  const decreaseTimeRemaining = () =>
    workers.filter(w => !w.available).forEach(w => w.timeRemaining--);

  const handleFinishedWorkers = () => {
    workers
      .filter(worker => !worker.available && worker.timeRemaining === 0)
      .forEach(worker => {
        removeStepFromDependencies(dependencies, worker.step);
        worker.available = true;
      });
  };

  const isEverythingDone = () =>
    stepsNotStarted.size === 0 && !workers.some(w => !w.available);

  const tick = () => {
    putIdlingWorkersToWork();
    decreaseTimeRemaining();
    handleFinishedWorkers();
    ticks++;
  };

  const dependencies = parseDependencies();
  const stepsNotStarted = getAllSteps(dependencies);
  while (!isEverythingDone()) {
    tick();
  }
  return ticks;
};

console.log("#1:", part1()); // OKBNLPHCSVWAIRDGUZEFMXYTJQ
console.log("#2:", part2()); // 982
