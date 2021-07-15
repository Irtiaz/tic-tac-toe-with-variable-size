export default function boardFilled<CellType>(
  board: CellType[][],
  empty: CellType,
  dimension: number
): boolean {
  for (let i = 0; i < dimension; ++i) {
    for (let j = 0; j < dimension; ++j) {
      if (board[i][j] === empty) return false;
    }
  }
  return true;
}
