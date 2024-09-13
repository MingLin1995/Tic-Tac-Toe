import React from 'react';
import { useState } from 'react';

interface SquareProps {
  value: string | null;
  onSquareClick: () => void;
  highlight: boolean;
}

// Square 組件，顯示單個方塊
function Square({ value, onSquareClick, highlight }: SquareProps) {
  // 根據 highlight 狀態決定是否增加黃色背景
  const className = highlight ? 'square highlight' : 'square';

  // 回傳一個按鈕，顯示方塊的值並綁定點擊事件
  return (
    <button className={className} onClick={onSquareClick}>
      {value}
    </button>
  );
}

// Board 組件，控制整個3*3遊戲的方塊
function Board({ xIsNext, squares, onPlay }) {
  // 處理方塊的點擊事件
  function handleClick(i: number) {
    // 判斷該方塊是否已經被使用或遊戲是否已經結束
    if (squares[i] || calculateWinner(squares)?.winner) {
      return;
    }

    const nextSquares = squares.slice(); // 建立副本(方便回歷史紀錄)

    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }

    const row = Math.floor(i / 3); // 計算行數
    const col = i % 3; // 計算列數
    onPlay(nextSquares, row, col); // 更新遊戲狀態給父組件（Game）
  }

  const winnerInfo = calculateWinner(squares); // 判斷是否有贏家
  const winner = winnerInfo?.winner; // 取得贏家資訊
  const winningSquares = winnerInfo?.winningSquares || []; // 取得獲勝的方塊資訊

  let status: string;
  if (winner) {
    status = '贏家是：' + winner + ' ！';
  } else if (!squares.includes(null)) {
    status = '平手～';
  } else {
    status = '下一位是：' + (xIsNext ? 'X' : 'O') + ' ～';
  }

  // 將 方塊的值、點擊事件和黃色背景 屬性 傳遞給 Square 組件
  const renderSquare = (i: number) => (
    <Square
      value={squares[i]}
      onSquareClick={() => handleClick(i)}
      highlight={winningSquares.includes(i)} // 判斷是否應該為黃色方塊
    />
  );

  return (
    <>
      <div className="status">{status}</div> {/* 顯示當前狀態 */}
      {Array(3) // 總共3行
        .fill(null)
        .map((_, row) => (
          <div className="board-row" key={row}>
            {Array(3) // 每行3個方塊
              .fill(null)
              .map((_, col) => renderSquare(row * 3 + col))}
          </div>
        ))}
    </>
  );
}

// Game 組件，控制整個遊戲的邏輯（當前步驟、歷史步驟、排序）
export default function Game() {
  const [currentMove, setCurrentMove] = useState(0); // 當前步驟
  const [history, setHistory] = useState<
    {
      squares: (string | null)[];
      location: { row: number; col: number } | null;
    }[]
  >([
    { squares: Array(9).fill(null), location: null }, // 歷史步驟
  ]);
  const [isAscending, setIsAscending] = useState(true); // 排序

  const xIsNext = currentMove % 2 === 0; // 判斷當前玩家換誰

  const currentSquares = history[currentMove].squares; // 取得當前步數的方塊狀態

  // 處理遊戲狀態的更新（接收新的 squares 以及 被點擊的座標）
  function handlePlay(
    nextSquares: (string | null)[],
    row: number,
    col: number,
  ) {
    const nextHistory = [
      ...history.slice(0, currentMove + 1), // 取得前一步的歷史紀錄
      { squares: nextSquares, location: { row, col } }, // 新增目前步驟的紀錄
    ];
    // 更新歷史紀錄
    setHistory(nextHistory);
    // 更新目前步數為最新步數
    setCurrentMove(nextHistory.length - 1);
  }

  // 跳轉到指定步數
  function jumpTo(nextMove: number) {
    setCurrentMove(nextMove);
  }

  // 生成每一步的座標
  const moves = history.map((step, move) => {
    let description: string;
    if (move > 0 && step.location) {
      const { row, col } = step.location!; // 該步驟的座標
      description = `回到第 ${move} 步 (row: ${row + 1}, col: ${col + 1})`; // 顯示步驟及座標
    } else {
      description = '回到開始遊戲時';
    }
    return (
      <ul key={move}>
        {move === currentMove ? (
          `目前是第 ${move} 步`
        ) : (
          <button onClick={() => jumpTo(move)}>{description}</button> // 點擊跳轉到指定步驟
        )}
      </ul>
    );
  });

  // 根據狀態排序
  const sortedMoves = isAscending ? moves : [...moves].reverse();

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <button onClick={() => setIsAscending(!isAscending)}>
          切換排序 {isAscending ? '降序' : '升序'}
        </button>
        <ol>{sortedMoves}</ol>
      </div>
    </div>
  );
}

// 計算贏家的函數
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
    const [a, b, c] = lines[i]; // 取得每一行的index
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], winningSquares: [a, b, c] }; // 回傳贏家及獲勝的方塊
    }
  }
  return null;
}
