import React from 'react';
import Avatar from './Avatar.tsx';

interface CardProps {
  children: React.ReactNode;
}

// Avatar 傳給 Card 渲染到 Card 的 div
function Card({ children }: CardProps) {
  return <div className="card">{children}</div>;
}

interface Person {
  name: string;
  imageId: string;
}

export default function Profile() {
  return (
    <Card>
      <Avatar
        size={100}
        person={
          {
            name: 'Katsuko Saruhashi',
            imageId: 'YfeOqp2',
          } as Person
        }
      />
    </Card>
  );
}
