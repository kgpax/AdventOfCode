exports.partOne = (data, _utils) => {
  const messages = data.map(x => x.split(' | '));
  let numUniqueSegments = 0;
  for (const [, outputData] of messages) {
    const outputs = outputData.split(' ');
    numUniqueSegments += outputs.reduce(
      (a, c) => a + ([2, 3, 4, 7].includes(c.length) ? 1 : 0),
      0
    );
  }
  console.log(
    `👀 >>>>> Output digits with unique number of segments:`,
    numUniqueSegments
  );
};

exports.partTwo = (data, _utils) => {
  const messages = data.map(x => x.split(' | '));
  let total = 0;

  for (const [sequenceData, outputData] of messages) {
    const sequences = sequenceData.split(' ');

    const numbers = {
      0: '',
      1: '',
      2: '',
      3: '',
      4: '',
      5: '',
      6: '',
      7: '',
      8: '',
      9: '',
    };
    const segments = {
      t: '',
      tl: '',
      tr: '',
      m: '',
      bl: '',
      br: '',
      b: '',
    };

    const gerForSequenceLength = numSegments => {
      const filteredSequences = sequences
        .filter(x => x.length === numSegments)
        .map(x => x.split('').sort());
      return {
        take: predicate => {
          if (!predicate) return filteredSequences.splice(0, 1)[0];
          const idx = filteredSequences.findIndex(predicate);
          return filteredSequences.splice(idx, 1)[0];
        },
        read: () => [...filteredSequences],
      };
    };

    const sequenceOrNum = value =>
      typeof value === 'number' ? numbers[value] : value;

    const getSegmentsFor = val1 => ({
      notIn: val2 =>
        sequenceOrNum(val1).filter(x => !sequenceOrNum(val2).includes(x)),
      alsoIn: val2 =>
        sequenceOrNum(val1).filter(x => sequenceOrNum(val2).includes(x)),
      existIn: val2 =>
        sequenceOrNum(val2).every(x => sequenceOrNum(val1).includes(x)),
    });

    // find those with unique number of segments, as the numbers can be inferred
    // 2 segments => number 1
    // 3 segments => number 7
    // 4 segments => number 4
    // 7 segments => number 8
    numbers[1] = gerForSequenceLength(2).take();
    numbers[7] = gerForSequenceLength(3).take();
    numbers[4] = gerForSequenceLength(4).take();
    numbers[8] = gerForSequenceLength(7).take();

    // deternine letter in 7 not in 1 - that's the top segment
    segments.t = getSegmentsFor(7).notIn(1)[0];

    // find numbers with 6 segments
    const sixSegments = gerForSequenceLength(6);

    // determine on with without both segments of the number 1 - that's number 6
    numbers[6] = sixSegments.take(x => !numbers[1].every(y => x.includes(y)));

    // determine letter in 4 not in 6 - that's the top-right segment
    segments.tr = getSegmentsFor(4).notIn(6)[0];

    // find the numbers with 5 segments
    const fiveSegments = gerForSequenceLength(5);

    // find the one whose letters are all in 6 - that's number 5
    numbers[5] = fiveSegments.take(x => getSegmentsFor(6).existIn(x));

    // determine letter in 1 not already assigned - that's the bottom-right segment
    segments.br = numbers[1].filter(x => x !== segments.tr)[0];

    // find letter in 6 not in 5 - that's the bottom-left segment
    segments.bl = getSegmentsFor(6).notIn(5)[0];

    // get 6 segment number which doesn't include the bottom-left segment - that's number 9
    numbers[9] = sixSegments.take(x => !x.includes(segments.bl));

    // the final 6 segment number is 0
    numbers[0] = sixSegments.take();

    // determine letter in 9 not in 0 - that's the middle segment
    segments.m = getSegmentsFor(9).notIn(0)[0];

    // find the other 5 segment sequence with the bottom-left segment - that's number 2
    numbers[2] = fiveSegments.take(x => x.includes(segments.bl));

    // the remaining 5 segment number is 3
    numbers[3] = fiveSegments.take();

    //
    //
    //
    // === output ===
    const sequenceToNumber = Object.entries(numbers).reduce((a, [k, v]) => {
      a[v.join('')] = k;
      return a;
    }, {});

    const getNumberForSequences = input => {
      let result = '';
      for (const sequence of input) {
        const number = sequenceToNumber[sequence.join('')];
        result += number.toString();
      }
      return Number(result);
    };

    const output = outputData.split(' ').map(x => x.split('').sort());
    const number = getNumberForSequences(output);

    total += number;
  }

  console.log(`👀 >>>>> Sum of all 4-digit codes:`, total);
};
