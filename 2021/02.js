exports.partOne = (data, _utils) => {
  const instructions = data
    .map(x => x.split(' '))
    .map(([a, b]) => [a, Number(b)]);
  let pos = 0;
  let depth = 0;
  for (const [instruction, value] of instructions) {
    switch (instruction) {
      case 'up':
        depth -= value;
        break;
      case 'down':
        depth += value;
        break;
      case 'forward':
        pos += value;
        break;
    }
  }

  console.log(`👀 >>>>> Final pos`, pos);
  console.log(`👀 >>>>> Final depth`, depth);
  console.log(`👀 >>>>> Result`, pos * depth);
};

exports.partTwo = (data, _utils) => {
  const instructions = data
    .map(x => x.split(' '))
    .map(([a, b]) => [a, Number(b)]);
  let pos = 0;
  let aim = 0;
  let depth = 0;
  for (const [instruction, value] of instructions) {
    switch (instruction) {
      case 'up':
        aim -= value;
        break;
      case 'down':
        aim += value;
        break;
      case 'forward':
        pos += value;
        depth += aim * value;
        break;
    }
  }

  console.log(`👀 >>>>> Final pos`, pos);
  console.log(`👀 >>>>> Final depth`, depth);
  console.log(`👀 >>>>> Result`, pos * depth);
};
