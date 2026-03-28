import React from 'react';
import { IonItem, IonLabel, IonButton } from '@ionic/react';
import { Fruit } from '../firebase/dexie';

interface FruitItemProps {
  fruit: Fruit;
  onDelete: (id: number) => void;
}

const FruitItem: React.FC<FruitItemProps> = ({ fruit, onDelete }) => {
  return (
    <IonItem>
      <IonLabel>
        <h2>{fruit.name}</h2>
        <p>Color: {fruit.color}</p>
      </IonLabel>
      <IonButton slot="end" color="danger" onClick={() => onDelete(fruit.id!)}>
        Borrar
      </IonButton>
    </IonItem>
  );
};

export default FruitItem;
