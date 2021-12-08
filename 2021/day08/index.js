const { getInput } = require("../../utils");
const input = getInput(true)
  .map((line) => line.split(" | "))
  .map((lineArr) => lineArr.map((io) => io.split(" ")))
  .map(([input, output]) => ({ input, output }));

/*
0 - 6
1 - 2 (unique)
2 - 5
3 - 5
4 - 4 (unique)
5 - 5
6 - 6
7 - 3 (unique)
8 - 7 (unique)
9 - 6
*/

const part1 = () => {
  return input.reduce((sum, entry) => {
    return sum + entry.output.filter((x) => [2, 3, 4, 7].includes(x.length)).length;
  }, 0);
};

const part2 = () => {
  const decodeLine = (line) => {
    const patterns = line.input.map((x) => ({
      // sequence: x,
      sequenceArr: x.split(""),
    }));

    /*
       aaaa 
      b    c
      b    c
       dddd 
      e    f
      e    f
       gggg 
    */
    const segments = {};

    patterns.find((x) => x.sequenceArr.length === 2).digit = 1;
    patterns.find((x) => x.sequenceArr.length === 3).digit = 7;
    patterns.find((x) => x.sequenceArr.length === 4).digit = 4;
    patterns.find((x) => x.sequenceArr.length === 7).digit = 8;

    const digitSegments_1 = patterns.find((x) => x.digit === 1).sequenceArr;
    const digitSegments_4 = patterns.find((x) => x.digit === 4).sequenceArr;
    const digitSegments_7 = patterns.find((x) => x.digit === 7).sequenceArr;

    // Identify real segment A (the only segment in digit 7 thats not enabled on digit 1)
    segments.a = digitSegments_7.find((x) => !digitSegments_1.includes(x));

    // Identify digit 3 (the only pattern with a length of 5 that also uses all segments as digit 1)
    const digit3Pattern = patterns.find(
      (x) => x.sequenceArr.length === 5 && digitSegments_1.every((s) => x.sequenceArr.includes(s))
    );
    digit3Pattern.digit = 3;
    const digitSegments_3 = digit3Pattern.sequenceArr;

    // Identify real segment B (the only segment left in digit 4 when removing segments used by digit 1 and digit 3)
    segments.b = digitSegments_4.find(
      (x) => !digitSegments_1.includes(x) && !digitSegments_3.includes(x)
    );

    // Identify real segment D (the only segment used by both digit 3 and 4, but not digit 1)
    segments.d = digitSegments_4.find(
      (x) => digitSegments_3.includes(x) && !digitSegments_1.includes(x)
    );

    // Identify real digit 5 (the only pattern with a length of 5 that uses real segment b)
    const digit5Pattern = patterns.find(
      (x) => x.sequenceArr.length === 5 && x.sequenceArr.includes(segments.b)
    );
    digit5Pattern.digit = 5;

    // Identify real digit 2 (the only unidentified pattern with a length of 5)
    const digit2Pattern = patterns.find(
      (x) => x.sequenceArr.length === 5 && typeof x.digit === "undefined"
    );
    digit2Pattern.digit = 2;

    // Identify real digit 0 (the only unidentified pattern that's not using real segment d)
    const digit0Pattern = patterns.find(
      (x) => typeof x.digit === "undefined" && !x.sequenceArr.includes(segments.d)
    );
    digit0Pattern.digit = 0;

    // Identify real digit 9 (the only unidentified pattern that is using all segments of digit 1)
    const digit9Pattern = patterns.find(
      (x) =>
        typeof x.digit === "undefined" && digitSegments_1.every((s) => x.sequenceArr.includes(s))
    );
    digit9Pattern.digit = 9;

    // Identify real digit 6 (the only unidentified pattern)
    const digit6Pattern = patterns.find((x) => typeof x.digit === "undefined");
    digit6Pattern.digit = 6;

    const patternToDigitMap = patterns.reduce((result, pattern) => {
      return { ...result, [pattern.sequenceArr.sort().join("")]: pattern.digit };
    }, {});

    const decodedOutput = line.output
      .map((sequence) => patternToDigitMap[sequence.split("").sort().join("")])
      .join("");

    return Number(decodedOutput);
  };

  const decodedOutput = input.map(decodeLine);
  const sumDecodedOutput = decodedOutput.reduce((sum, x) => sum + x, 0);

  return sumDecodedOutput;
};

console.log("#1:", part1()); // 512
console.log("#2:", part2()); // 1091165
