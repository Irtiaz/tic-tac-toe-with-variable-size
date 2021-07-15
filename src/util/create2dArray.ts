export default function create2dArray<T>(
  numberOfRows: number,
  numberOfCols: number,
  filler: T
) {
  const arr: T[][] = [];
  for (let i = 0; i < numberOfRows; ++i) {
    const row: T[] = [];
    for (let j = 0; j < numberOfCols; ++j) {
      row.push(filler);
    }
    arr.push(row);
  }
  return arr;
}
