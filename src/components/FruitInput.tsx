import React, { useState, FormEvent } from 'react';
import { IonItem, IonInput, IonButton } from '@ionic/react';

interface FruitInputProps {
  onAdd: (name: string, color: string) => void;
  disabled?: boolean;
}

const FruitInput: React.FC<FruitInputProps> = ({ onAdd, disabled = false }) => {
  const [name, setName] = useState('');
  const [color, setColor] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (name.trim() && color.trim()) {
      onAdd(name.trim(), color.trim());
      setName('');
      setColor('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <IonItem>
        <IonInput
          placeholder="Nombre de fruta"
          value={name}
          onIonChange={e => setName(e.detail.value!)}
          disabled={disabled}
        />
      </IonItem>
      <IonItem>
        <IonInput
          placeholder="Color"
          value={color}
          onIonChange={e => setColor(e.detail.value!)}
          disabled={disabled}
        />
      </IonItem>
      <IonButton type="submit" expand="block" disabled={disabled}>
        Añadir Fruta
      </IonButton>
    </form>
  );
};

export default FruitInput;
