import React from 'react';
import { useState } from 'react';

interface SquareProps {
  value: string | null;
  onSquareClick: () => void;
}

function Square({ value, onSquareClick }: SquareProps) {
  // 從 Board 組件，接收 value onSquareClick 的 props
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

// 由 props 控制
function Board({ xIsNext, squares, onPlay }) {
  // Array 建立長度為9的空陣列 ; fill 用來填充陣列的方法
  // squares = [null, null, null, null, null, null, null, null, null]
  // const [squares, setSquares] = useState(Array(9).fill(null));
  // const [xIsNext, setXIsNext] = useState(true); // 預設 X = true

  function handleClick(i: number) {
    // 判斷是否已經有值 ( X or O) or 檢查是否已經達成一直線
    if (squares[i] || calculateWinner(squares)) {
      return;
    }

    const nextSquares = squares.slice(); // 建立副本，可與之前紀錄做比較（返回上一步）
    // setSquares(nextSquares); // 更新 squares 狀態

    // 用來判斷是否為下個玩家
    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }
    // setXIsNext(!xIsNext); // 更新 xIsNext 為下一個玩家
    onPlay(nextSquares); // 更新 squares xIsNext
  }

  const winner = calculateWinner(squares);
  let status: string;
  if (winner) {
    status = '贏家是：' + winner + ' ！';
  } else if (!squares.includes(null)) {
    status = '平手～';
  } else {
    status = '下一位是：' + (xIsNext ? 'X' : 'O') + ' ～';
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        {/* 將 value onSquareClick props 傳遞給 Square 組件 */}
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares: (string | null)[]) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    // 更新 squares 改為用 history 儲存 （每個步驟的每個格子的值）
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove: number) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description: string;
    if (move > 0) {
      description = '回到第 ' + move + ' 步驟';
    } else {
      description = '回到開始遊戲';
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

function calculateWinner(squares: (string | null)[]) {
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

// 定義方塊組件
// 透過 props 將 value 從父組件傳送到子組件
// function Square({ value }) {
//   function handleClick() {
//     console.log('按下去～');
//   }
//   // 從 JSX 轉到 JS 用 { }
//   return (
//     <button className="square" onClick={handleClick}>
//       {value}
//     </button>
//   );
// }

// function Square() {
//   // const [value, setValue] = useState(null); // 初始值為 null

//   function handleClick() {
//     setValue('X'); // 更新 value 狀態
//   }

//   return (
//     <button className="square" onClick={handleClick}>
//       {value}
//     </button>
//   );
// }

// export default function Board() {
//   return (
//     <>
//       <div className="board-row">
//         {/* 將 value props 傳遞給 Square 組件 */}
//         <Square value={1} />
//         <Square value={2} />
//         <Square value={3} />
//       </div>
//       <div className="board-row">
//         <Square value={4} />
//         <Square value={5} />
//         <Square value={6} />
//       </div>
//       <div className="board-row">
//         <Square value={7} />
//         <Square value={8} />
//         <Square value={9} />
//       </div>
//     </>
//   );
// }
