exports.partOne = (data, _utils) => {
  const paths = data.map(item => {
    const [, x1, y1, x2, y2] = /(\d*),(\d*) -> (\d*),(\d*)/.exec(item);
    return { x1: Number(x1), y1: Number(y1), x2: Number(x2), y2: Number(y2) };
  });
  const xMax = paths.reduce((a, { x1, x2 }) => {
    const max = Math.max(x1, x2);
    return max > a ? max : a;
  }, 0);
  const yMax = paths.reduce((a, { y1, y2 }) => {
    const max = Math.max(y1, y2);
    return max > a ? max : a;
  }, 0);
  const matrix = new Array(yMax + 1);
  for (let y = 0; y <= yMax; y++) {
    matrix[y] = new Array(xMax + 1).fill(0);
  }

  paths.forEach(({ x1, y1, x2, y2 }) => {
    const xLo = Math.min(x1, x2);
    const xHi = Math.max(x1, x2);
    const yLo = Math.min(y1, y2);
    const yHi = Math.max(y1, y2);
    // horizontal
    if (y1 === y2) {
      for (let x = xLo; x <= xHi; x += 1) {
        matrix[y1][x] += 1;
      }
    }
    // vertical
    else if (x1 === x2) {
      for (let y = yLo; y <= yHi; y += 1) {
        matrix[y][x1] += 1;
      }
    }
  });

  let largeOverlaps = 0;
  for (let y = 0; y <= yMax; y += 1) {
    for (let x = 0; x <= xMax; x += 1) {
      if (matrix[y][x] >= 2) largeOverlaps += 1;
    }
  }

  console.log(`👀 >>>>> Large overlaps:`, largeOverlaps);
};

exports.partTwo = (data, _utils) => {
  const range = (lo, hi) =>
    new Array(hi - lo).fill(0).map((_, idx) => idx + lo);
  const paths = data.map(item => {
    const [, x1, y1, x2, y2] = /(\d*),(\d*) -> (\d*),(\d*)/.exec(item);
    return { x1: Number(x1), y1: Number(y1), x2: Number(x2), y2: Number(y2) };
  });
  const xMax = paths.reduce((a, { x1, x2 }) => {
    const max = Math.max(x1, x2);
    return max > a ? max : a;
  }, 0);
  const yMax = paths.reduce((a, { y1, y2 }) => {
    const max = Math.max(y1, y2);
    return max > a ? max : a;
  }, 0);
  const matrix = new Array(yMax + 1);
  for (let y = 0; y <= yMax; y++) {
    matrix[y] = new Array(xMax + 1).fill(0);
  }

  paths.forEach(({ x1, y1, x2, y2 }) => {
    const xLo = Math.min(x1, x2);
    const xHi = Math.max(x1, x2);
    const yLo = Math.min(y1, y2);
    const yHi = Math.max(y1, y2);
    // horizontal
    if (y1 === y2) {
      for (let x = xLo; x <= xHi; x += 1) {
        matrix[y1][x] += 1;
      }
    }
    // vertical
    else if (x1 === x2) {
      for (let y = yLo; y <= yHi; y += 1) {
        matrix[y][x1] += 1;
      }
    }
    // diagonal
    else {
      const dist = Math.abs(x2 - x1);
      let x = x1;
      let y = y1;
      for (let i = 0; i <= dist; i += 1) {
        matrix[y][x] += 1;
        x += Math.sign(x2 - x1);
        y += Math.sign(y2 - y1);
      }
    }
  });

  let largeOverlaps = 0;
  for (let y = 0; y <= yMax; y += 1) {
    for (let x = 0; x <= xMax; x += 1) {
      if (matrix[y][x] >= 2) largeOverlaps += 1;
    }
  }

  console.log(`👀 >>>>> Large overlaps:`, largeOverlaps);
};
