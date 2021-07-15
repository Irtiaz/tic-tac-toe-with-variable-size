export default function getWinner<CellType>(
  board: CellType[][],
  player1: CellType,
  player2: CellType,
  dimension: number
): CellType | null {
  let matched: boolean;

  //Check primary diagonal
  const board00 = board[0][0];
  if (board00 === player1 || board00 === player2) {
    matched = true;
    for (let i = 1; i < dimension; ++i) {
      if (board[i][i] !== board00) {
        matched = false;
        break;
      }
    }
    if (matched) return board00;
  }

  //Check secondary diagonal
  const boardEnd0 = board[dimension - 1][0];
  if (boardEnd0 === player1 || boardEnd0 === player2) {
    matched = true;
    for (let i = 1; i < dimension; ++i) {
      if (board[dimension - 1 - i][i] !== boardEnd0) {
        matched = false;
        break;
      }
    }
    if (matched) return boardEnd0;
  }

  //Check all rows
  for (let i = 0; i < dimension; ++i) {
    const boardI0 = board[i][0];
    if (boardI0 === player1 || boardI0 === player2) {
      matched = true;
      for (let j = 1; j < dimension; ++j) {
        if (board[i][j] !== boardI0) {
          matched = false;
          break;
        }
      }
      if (matched) return boardI0;
    }
  }

  //Check all columns
  for (let j = 0; j < dimension; ++j) {
    const boardJ0 = board[0][j];
    if (boardJ0 === player1 || boardJ0 === player2) {
      matched = true;
      for (let i = 1; i < dimension; ++i) {
        if (board[i][j] !== boardJ0) {
          matched = false;
          break;
        }
      }
      if (matched) return boardJ0;
    }
  }

  return null;
}
