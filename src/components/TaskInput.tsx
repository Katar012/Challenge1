import React, { useState, FormEvent } from 'react';
import { IonItem, IonInput, IonButton } from '@ionic/react';

interface TaskInputProps {
  onAdd: (text: string) => void;
}

const TaskInput: React.FC<TaskInputProps> = ({ onAdd }) => {
  const [value, setValue] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = value.trim();
    if (trimmed) {
      onAdd(trimmed);
      setValue('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <IonItem>
        <IonInput
          value={value}
          placeholder="Añadir nueva tarea"
          onIonChange={e => setValue(e.detail.value!)}
        />
        <IonButton type="submit" slot="end">
            Añadir
        </IonButton>
      </IonItem>
    </form>
  );
};

export default TaskInput;
