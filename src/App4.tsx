import { useState, useEffect } from 'react';
import Clock from './Clock.tsx';
import React from 'react';

function useTime(): Date {
  const [time, setTime] = useState<Date>(() => new Date());
  useEffect(() => {
    const id = setInterval(() => {
      // setInterval 1000 每秒更新一次
      setTime(new Date()); // set 更新最新的時間
    }, 1000);
    return () => clearInterval(id); // 清理id
  }, []);
  return time;
}

export default function App(): JSX.Element {
  const time = useTime();
  const [color, setColor] = useState<string>('lightcoral');
  return (
    <div>
      <p>
        選擇一個顏色:{' '}
        <select value={color} onChange={(e) => setColor(e.target.value)}>
          <option value="lightcoral">淺珊瑚色</option>
          <option value="midnightblue">午夜藍</option>
          <option value="rebeccapurple">雷貝卡紫</option>
        </select>
      </p>
      <Clock color={color} time={time.toLocaleTimeString()} />
    </div>
  );
}
