import React from 'react';
import { getImageUrl } from './utils.tsx';

interface Person {
  name: string;
  imageId: string;
}

interface AvatarProps {
  person: Person;
  size: number;
}

export default function Avatar({ person, size }: AvatarProps) {
  return (
    <img
      className="avatar"
      src={getImageUrl(person)}
      alt={person.name}
      width={size}
      height={size}
    />
  );
}
