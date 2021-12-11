const increasingFuelBurn = num => (num * (num + 1)) / 2;

const calculateFuelConsumption = (
  positions,
  targetPos,
  fuelCoefficientFn = x => x
) =>
  positions.reduce((a, c) => a + fuelCoefficientFn(Math.abs(c - targetPos)), 0);

const calculateWithFuelCoeficient = (positions, fuelCoefficientFn) => {
  const posMin = Math.min(...positions);
  const posMax = Math.max(...positions);
  const range = posMax - posMin;
  let lowestFuelConsumption = Number.MAX_SAFE_INTEGER;
  let targetPos;
  for (let i = posMin; i < range; i += 1) {
    const fuel = calculateFuelConsumption(positions, i, fuelCoefficientFn);
    if (fuel < lowestFuelConsumption) {
      lowestFuelConsumption = fuel;
      targetPos = i;
    }
  }
  return { lowestFuelConsumption, targetPos };
};

exports.partOne = (data, _utils) => {
  const positions = data[0].split(',').map(Number);
  const { lowestFuelConsumption, targetPos } =
    calculateWithFuelCoeficient(positions);

  console.log(
    `👀 >>>>> Lowest fuel consumption`,
    lowestFuelConsumption,
    `to reach position`,
    targetPos
  );
};

exports.partTwo = (data, _utils) => {
  const positions = data[0].split(',').map(Number);
  const { lowestFuelConsumption, targetPos } = calculateWithFuelCoeficient(
    positions,
    increasingFuelBurn
  );

  console.log(
    `👀 >>>>> Lowest fuel consumption`,
    lowestFuelConsumption,
    `to reach position`,
    targetPos
  );
};
