const getBounds = matrix => [matrix[0].length, matrix.length];

const getNeighbours = (matrix, [x, y]) => {
  const [xMax, yMax] = getBounds(matrix);
  const neighbours = [];
  if (x > 0) neighbours.push({ coords: [x - 1, y], value: matrix[y][x - 1] });
  if (y > 0) neighbours.push({ coords: [x, y - 1], value: matrix[y - 1][x] });
  if (x < xMax - 1)
    neighbours.push({ coords: [x + 1, y], value: matrix[y][x + 1] });
  if (y < yMax - 1)
    neighbours.push({ coords: [x, y + 1], value: matrix[y + 1][x] });
  return neighbours;
};

const getBasin = (matrix, { coords, value }, basin) => {
  if (!basin.some(x => x.coords.join(',') === coords.join(','))) {
    basin.push({ coords, value });
  }

  const neighbours = getNeighbours(matrix, coords).filter(
    x => x.value > value && x.value < 9
  );

  for (const neighbour of neighbours) {
    getBasin(matrix, neighbour, basin);
  }
};

exports.partOne = (data, _utils) => {
  const matrix = data.map(x => x.split('').map(Number));
  const [xMax, yMax] = getBounds(matrix);
  const lowPoints = [];
  for (let y = 0; y < yMax; y += 1) {
    for (let x = 0; x < xMax; x += 1) {
      const value = matrix[y][x];
      const neighbours = getNeighbours(matrix, [x, y]);
      const isLowPoint = neighbours.every(x => x.value > value);
      if (isLowPoint) {
        lowPoints.push(value);
      }
    }
  }
  const riskFactor = lowPoints.reduce((a, c) => a + (c + 1), 0);

  console.log(`👀 >>>>> Risk factor:`, riskFactor);
};

exports.partTwo = (data, _utils) => {
  const matrix = data.map(x => x.split('').map(Number));
  const [xMax, yMax] = getBounds(matrix);
  const lowPoints = [];
  for (let y = 0; y < yMax; y += 1) {
    for (let x = 0; x < xMax; x += 1) {
      const value = matrix[y][x];
      const neighbours = getNeighbours(matrix, [x, y]);
      const isLowPoint = neighbours.every(x => x.value > value);
      if (isLowPoint) {
        lowPoints.push({ coords: [x, y], value });
      }
    }
  }

  let basins = [];
  for (let i = 0; i < lowPoints.length; i++) {
    basins[i] = [];
  }

  for (let i = 0; i < lowPoints.length; i += 1) {
    getBasin(matrix, lowPoints[i], basins[i]);
  }

  basins.sort((a, b) => b.length - a.length);
  const threeLargest = basins.splice(0, 3);

  const riskFactor = threeLargest.reduce((a, c) => a * c.length, 1);

  console.log(`👀 >>>>> Risk factor:`, riskFactor);
};
