import React from 'react';
import Square from './Square';

export default function Board({ squares, onClick }) {
  const boardElement = squares.map((square, index) => (
    <Square key={index} value={square} onClick={() => onClick(index)} />
  ));

  return <div className="board">{boardElement}</div>;
}
