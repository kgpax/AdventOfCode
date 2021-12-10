const getMostCommonValue = (data, pos) => {
  let acc = 0;
  for (const entry of data) {
    const bit = entry[pos] === '1' ? 1 : 0;
    acc += bit;
  }

  return acc >= data.length / 2 ? 0b1 : 0b0;
};

const getValues = data => {
  const entryLength = data[0].length;

  let gamma = 0b0;
  for (let pos = 0; pos < entryLength; pos++) {
    gamma <<= 1;
    gamma += getMostCommonValue(data, pos);
  }

  const mask = parseInt('1'.repeat(entryLength), 2);
  const epsilon = gamma ^ mask;

  return { gamma, epsilon };
};

const filter = (data, pos, type) => {
  if (!data?.length || pos > data[0]?.length) return null;
  const mask = getValues(data)[type].toString(2).padStart(data[0].length, '0');
  const filtered = data.filter(entry => entry[pos] === mask[pos]);
  if (filtered.length === 1) return parseInt(filtered[0], 2);
  return filter(filtered, pos + 1, type);
};

exports.partOne = (data, _utils) => {
  const { gamma, epsilon } = getValues(data);
  console.log(`👀 >>>>> Gamma`, gamma);
  console.log(`👀 >>>>> Epsilon`, epsilon);
  console.log(`👀 >>>>> Power consumption`, gamma * epsilon);
};

exports.partTwo = (data, _utils) => {
  const entryLength = data[0].length;
  const oxygen = filter(data, 0, 'gamma');
  const co2 = filter(data, 0, 'epsilon');
  console.log(`👀 >>>>> Oxygen`, oxygen, oxygen.toString(2));
  console.log(`👀 >>>>> CO2`, co2, co2.toString(2));
  console.log(`👀 >>>>> Life support`, oxygen * co2);
};
