
import './App.css';

import * as React from 'react';

function Board() {
  const [squares, setSquares] = React.useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = React.useState(true);
  const [winner, setWinner] = React.useState(null);

  function selectSquare(square) {
    if (squares[square] || winner) {
      return; 
    }

    const newSquares = squares.slice();
    newSquares[square] = xIsNext ? 'X' : 'O';
    setSquares(newSquares);

    
    const newWinner = calculateWinner(newSquares);
    setWinner(newWinner);

    
    setXIsNext(!xIsNext);
  }

  function restart() {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
    setWinner(null);
  }

  function renderSquare(i) {
    return (
      <button className="square" onClick={() => selectSquare(i)}>
        {squares[i]}
      </button>
    );
  }

  const status = winner
    ? `Winner: ${winner}`
    : squares.every(Boolean)
    ? "Scratch: Cat's game"
    : `Next player: ${xIsNext ? 'X' : 'O'}`;

  return (
    <div>
      <div>STATUS: {status}</div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
      <button onClick={restart}>Restart</button>
    </div>
  );
}

function Game() {
  return (
    <div>
      <div>
        <Board />
      </div>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function App() {
  return <Game />;
}

export default App;
