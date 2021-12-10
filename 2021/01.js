exports.partOne = (data, _utils) => {
  const depths = data.map(Number);
  let increments = 0;
  let prevDepth = Number.MAX_SAFE_INTEGER;
  for (const depth of depths) {
    if (depth > prevDepth) increments += 1;
    prevDepth = depth;
  }

  console.log(`👀 >>>>> Increments:`, increments);
};

exports.partTwo = (data, _utils) => {
  const depths = data.map(Number);
  let increments = 0;
  for (let i = 3; i < depths.length; i++) {
    const prevSum = depths[i - 3] + depths[i - 2] + depths[i - 1];
    const currSum = depths[i - 2] + depths[i - 1] + depths[i - 0];
    if (currSum > prevSum) increments += 1;
  }

  console.log(`👀 >>>>> Increments:`, increments);
};
