import { useState } from 'react';

function Square({ value, onSquareClick }) {
  // 從 Board 組件，接收 value onSquareClick 的 props
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

export default function Board() {
  // Array 建立長度為9的空陣列 ; fill 用來填充陣列的方法
  // squares = [null, null, null, null, null, null, null, null, null]
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true); // 預設 X = true

  function handleClick(i) {
    // 判斷是否已經有值 ( X or O)

    if (squares[i]) {
      return;
    }

    const nextSquares = squares.slice(); // 建立副本，可與之前紀錄做比較（返回上一步）
    nextSquares[i] = 'X';
    setSquares(nextSquares); // 更新 squares 狀態

    // 用來判斷是否為下個玩家
    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }
    setXIsNext(!xIsNext); // 更新 xIsNext 為下一個玩家
  }

  return (
    <>
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
