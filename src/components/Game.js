import React, { useState, useEffect, useRef } from 'react';
import Board from './Board';
import { calculateWinner } from '../utils/utils';

export default function Game() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXisNext] = useState(true);
  const [winner, setWinner] = useState(null);

  const appRef = useRef(null);
  const winnerRef = useRef(null);
  const nextMoveRef = useRef(null);

  useEffect(() => {
    const getWinner = calculateWinner(board);
    if (getWinner) {
      appRef.current.classList.add('longer');
      nextMoveRef.current.classList.add('fadeOut');
      setTimeout(() => {
        setWinner(getWinner);
      }, 1000);
    }
  }, [board]);

  const handleClick = (index) => {
    const newBoard = [...board];

    if (newBoard[index] !== null || winner !== null) {
      return;
    }

    newBoard[index] = xIsNext ? 'X' : 'O';
    setBoard(newBoard);
    setXisNext((prevState) => !prevState);
  };

  const restartGame = () => {
    appRef.current.classList.remove('longer');
    winnerRef.current.classList.remove('fadeIn');
    winnerRef.current.classList.add('fadeOut');
    appRef.current.classList.add('shorter');
    setTimeout(() => {
      setBoard(Array(9).fill(null));
      setWinner(null);
      setXisNext(true);
      appRef.current.classList.remove('shorter');
    }, 1000);
  };

  const jumpTo = () => {};

  const renderMoves = () => {
    return (
      <button className="game__restart" onClick={restartGame}>
        Restart Game
      </button>
    );
  };

  return (
    <div ref={appRef} className="game__container">
      <h1 className="game__title fadeIn">Tic Tac Toe</h1>
      <Board squares={board} onClick={handleClick} />

      {winner !== null ? (
        <div ref={winnerRef} className="game__winner fadeIn">
          <h3>{`${winner} is the winner!`}</h3>
          {renderMoves()}
        </div>
      ) : (
        <div ref={nextMoveRef} className="game__next-move fadeIn">
          <h3>{xIsNext ? 'X' : 'O'} is next</h3>
        </div>
      )}
    </div>
  );
}
