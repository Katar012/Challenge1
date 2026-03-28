import React from 'react';
import { Fruit } from '../firebase/dexie';
import FruitItem from './FruitItem';

interface FruitListProps {
  fruits: Fruit[];
  onDelete: (id: number) => void;
}

const FruitList: React.FC<FruitListProps> = ({ fruits, onDelete }) => {
  if (fruits.length === 0) {
    return <p style={{ padding: '1rem' }}>No hay frutas.</p>;
  }

  return (
    <div>
      {fruits.map(f => (
        <FruitItem key={f.id} fruit={f} onDelete={onDelete} />
      ))}
    </div>
  );
};

export default FruitList;
