// 定義方塊組件
// 透過 props 將 value 從父組件傳送到子組件
function Square({ value }) {
  // 從 JSX 轉到 JS 用 { }
  return <button className="square">{value}</button>;
}

export default function Board() {
  return (
    <>
      <div className="board-row">
        {/* 將 value props 傳遞給 Square 組件 */}
        <Square value={1} />
        <Square value={2} />
        <Square value={3} />
      </div>
      <div className="board-row">
        <Square value={4} />
        <Square value={5} />
        <Square value={6} />
      </div>
      <div className="board-row">
        <Square value={7} />
        <Square value={8} />
        <Square value={9} />
      </div>
    </>
  );
}
