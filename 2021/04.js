const checkWin = board => {
  // check rows
  for (let row = 0; row < board.length; row += 1) {
    if (board[row].every(x => x === '')) {
      return true;
    }
  }

  // check columns
  for (let col = 0; col < board[0].length; col += 1) {
    let winningColumn = true;
    for (let row = 0; row < board.length && winningColumn; row += 1) {
      if (board[row][col] !== '') winningColumn = false;
    }
    if (winningColumn) {
      return true;
    }
  }

  return false;
};

const getUnmarked = board => {
  const unmarked = [];
  for (const row of board) {
    for (const num of row) {
      if (typeof num === 'number') unmarked.push(num);
    }
  }
  return unmarked;
};

exports.partOne = (data, _utils) => {
  const draw = data.splice(0, 1)[0].split(',').map(Number);
  const boards = [];

  let currentDraw;
  let sumOfUnmarkedNumbers;

  while (data.length >= 6) {
    const boardData = data
      .splice(0, 6)
      .filter(x => x.length > 0)
      .map(x =>
        x
          .split(' ')
          .filter(x => x.length > 0)
          .map(Number)
      );
    boards.push(boardData);
  }

  let gameOver = false;
  do {
    currentDraw = draw.shift();
    for (const board of boards) {
      for (const row of board) {
        for (let col = 0; col < row.length; col++) {
          if (row[col] === currentDraw) row[col] = '';
        }
      }

      const hasWon = checkWin(board);
      if (hasWon) {
        const unmarked = getUnmarked(board);
        sumOfUnmarkedNumbers = unmarked.reduce((a, c) => a + c, 0);
        gameOver = true;
      }
    }

    if (draw.length === 0) gameOver = true;
  } while (!gameOver);

  console.log(`👀 >>>>> Sum of unmarked numbers`, sumOfUnmarkedNumbers);
  console.log(`👀 >>>>> Current draw`, currentDraw);
  console.log(`👀 >>>>> Score`, sumOfUnmarkedNumbers * currentDraw);
};

exports.partTwo = (data, _utils) => {
  const draw = data.splice(0, 1)[0].split(',').map(Number);
  const boards = [];

  let currentDraw;
  let sumOfUnmarkedNumbers;
  let latestWinningBoard;

  while (data.length >= 6) {
    const boardData = data
      .splice(0, 6)
      .filter(x => x.length > 0)
      .map(x =>
        x
          .split(' ')
          .filter(x => x.length > 0)
          .map(Number)
      );
    boards.push({ won: false, data: boardData });
  }

  let gameOver = false;
  do {
    currentDraw = draw.shift();

    for (let i = 0; i < boards.length; i++) {
      if (boards[i].won) continue;
      for (let row = 0; row < boards[i].data.length; row += 1) {
        for (let col = 0; col < boards[i].data[row].length; col++) {
          if (boards[i].data[row][col] === currentDraw)
            boards[i].data[row][col] = '';
        }
      }

      const hasWon = checkWin(boards[i].data);
      if (hasWon) {
        boards[i].won = true;
        latestWinningBoard = boards[i].data;
      }
    }

    if (boards.every(x => x.won)) {
      const unmarked = getUnmarked(latestWinningBoard);
      sumOfUnmarkedNumbers = unmarked.reduce((a, c) => a + c, 0);
      gameOver = true;
    }

    if (draw.length === 0) gameOver = true;
  } while (!gameOver);

  console.log(`👀 >>>>> Sum of unmarked numbers`, sumOfUnmarkedNumbers);
  console.log(`👀 >>>>> Current draw`, currentDraw);
  console.log(`👀 >>>>> Score`, sumOfUnmarkedNumbers * currentDraw);
};
