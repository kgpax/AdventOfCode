const calculateTotalLength = map =>
  Object.values(map).reduce((a, c) => a + c, 0);

const calculateLanterfishAfter = (lanternfish, days) => {
  const map = {
    0: lanternfish.filter(x => x === 0).length,
    1: lanternfish.filter(x => x === 1).length,
    2: lanternfish.filter(x => x === 2).length,
    3: lanternfish.filter(x => x === 3).length,
    4: lanternfish.filter(x => x === 4).length,
    5: lanternfish.filter(x => x === 5).length,
    6: lanternfish.filter(x => x === 6).length,
    7: 0,
    8: 0,
  };

  for (let day = 0; day < days; day += 1) {
    const spawns = map[0];
    map[0] = map[1];
    map[1] = map[2];
    map[2] = map[3];
    map[3] = map[4];
    map[4] = map[5];
    map[5] = map[6];
    map[6] = map[7] + spawns;
    map[7] = map[8];
    map[8] = spawns;
  }

  return calculateTotalLength(map);
};

exports.partOne = (data, _utils) => {
  const input = data[0].split(',').map(Number);
  const days = 80;
  const result = calculateLanterfishAfter(input, days);
  console.log(`👀 >>>>> Total lanternfish after ${days} days:`, result);
};

exports.partTwo = (data, _utils) => {
  const input = data[0].split(',').map(Number);
  const days = 256;
  const result = calculateLanterfishAfter(input, days);

  console.log(`👀 >>>>> Total lanternfish after ${days} days:`, result);
};
