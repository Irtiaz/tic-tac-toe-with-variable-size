import { nanoid } from 'nanoid';
import React, { useEffect, useState } from 'react';

import create2dArray from './util/create2dArray';
import boardFilled from './util/boardFilled';
import getWinner from './util/getWinner';

import './Board.css';

interface DimensionForm extends HTMLFormElement {
  dimensionInput: HTMLInputElement;
}

enum CellState {
  EMPTY,
  X,
  O,
}

enum Turn {
  X,
  O,
}

const player1 = Turn.X as Turn;

const TicTacToeBoard: React.FC<{}> = () => {
  const [dimension, setDiemnsion] = useState(3);

  const [board, setBoard] = useState<CellState[][]>(() =>
    create2dArray<CellState>(3, 3, CellState.EMPTY)
  );

  const [turn, setTurn] = useState(player1);
  const [winner, setWinner] = useState<CellState | 'tie' | null>(null);

  useEffect(() => {
    const computedWinner: CellState | null = getWinner<CellState>(
      board,
      CellState.X,
      CellState.O,
      dimension
    );
    if (computedWinner) {
      setWinner(computedWinner);
    } else {
      const filled: boolean = boardFilled<CellState>(
        board,
        CellState.EMPTY,
        dimension
      );
      if (filled) setWinner('tie');
    }
  }, [board, dimension]);

  function handleClick(i: number, j: number) {
    if (board[i][j] === CellState.EMPTY) {
      const val = turn === Turn.X ? CellState.X : CellState.O;

      const boardCopy: number[][] = [];
      for (let i = 0; i < dimension; ++i) {
        boardCopy[i] = board[i].slice();
      }
      boardCopy[i][j] = val;

      setBoard(boardCopy);

      const newTurn = turn === Turn.X ? Turn.O : Turn.X;
      setTurn(newTurn);
    }
  }

  let Rows: JSX.Element[] = [];
  for (let i = 0; i < dimension; ++i) {
    let Row: JSX.Element[] = [];
    for (let j = 0; j < dimension; ++j) {
      let tabIndex: 0 | undefined = undefined;
      const classes: string[] = [];

      if (board[i][j] === CellState.X) classes.push('player-x');
      else if (board[i][j] === CellState.O) classes.push('player-o');

      if (i !== dimension - 1) classes.push('border-bottom');
      if (j !== dimension - 1) classes.push('border-right');

      if (!winner && board[i][j] === CellState.EMPTY) {
        classes.push('clickable');
        tabIndex = 0;
      }

      const classNameStr: string | undefined =
        classes.length === 0 ? undefined : classes.join(' ');

      const Cell: JSX.Element = (
        <td
          className={classNameStr}
          onClick={!winner ? () => handleClick(i, j) : undefined}
          tabIndex={tabIndex}
          onKeyDown={
            !winner
              ? (event) => {
                  if (event.key === 'Enter') handleClick(i, j);
                }
              : undefined
          }
        ></td>
      );

      Row.push(<React.Fragment key={nanoid()}>{Cell}</React.Fragment>);
    }
    Rows.push(
      <React.Fragment key={nanoid()}>
        <tr>{Row}</tr>
      </React.Fragment>
    );
  }

  let Board = (
    <table>
      <tbody>{Rows}</tbody>
    </table>
  );

  const turnStr: string = turn === player1 ? 'Player 1' : 'Player 2';
  const colorClass: string = turn === Turn.X ? 'player-x' : 'player-o';
  let turnInstuctionOrNull: JSX.Element | null = null;
  if (!winner) {
    turnInstuctionOrNull = (
      <div className={`turn ${colorClass}`}>Turn for {turnStr}</div>
    );
  }

  let WinnerOrNull: JSX.Element | null = null;
  if (winner) {
    if (winner === CellState.X || winner === CellState.O) {
      let name: 'Player 1' | 'Player 2';
      if (winner === CellState.X) {
        if (Turn.X === player1) name = 'Player 1';
        else name = 'Player 2';
      } else {
        if (Turn.O === player1) name = 'Player 1';
        else name = 'Player 2';
      }

      const colorClass = winner === CellState.X ? 'player-x' : 'player-o';

      WinnerOrNull = <h2 className={`result ${colorClass}`}>{name} won!</h2>;
    } else {
      WinnerOrNull = <h2 className='result'>It's a Tie!</h2>;
    }
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form: DimensionForm = event.target as DimensionForm;
    const n = parseInt(form.dimensionInput.value);

    const arr: CellState[][] = create2dArray(n, n, CellState.EMPTY);
    setBoard(arr);
    setDiemnsion(n);
    setWinner(null);
    setTurn(Turn.X);
  }

  return (
    <div className='board-container'>
      <form onSubmit={(event) => handleSubmit(event)}>
        Enter dimension:
        <input
          type='number'
          defaultValue={3}
          min={3}
          step={2}
          name='dimensionInput'
          onInvalid={(event) =>
            (event.target as HTMLInputElement).setCustomValidity(
              'Dimension must be an odd number and greater than 2'
            )
          }
          onInput={(event) => {
            (event.target as HTMLInputElement).setCustomValidity('');
          }}
        />
        <button type='submit'>Create Board</button>
      </form>
      {WinnerOrNull}
      {turnInstuctionOrNull}
      {Board}
    </div>
  );
};

export default TicTacToeBoard;
