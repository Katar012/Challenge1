import React, { useState, FormEvent } from 'react';
import { IonItem, IonInput, IonButton } from '@ionic/react';

interface TaskInputProps {
  onAdd: (text: string) => void;
  placeholder?: string;
}

const TaskInput: React.FC<TaskInputProps> = ({ onAdd, placeholder }) => {
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
          placeholder={placeholder || "Añadir nueva tarea"}
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
