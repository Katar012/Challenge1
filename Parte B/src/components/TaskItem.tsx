import React from 'react';
import { Link } from 'react-router-dom';
import { IonItem, IonLabel, IonCheckbox, IonButton } from '@ionic/react';

export interface Task {
  id: number;
  text: string;
  completed: boolean;
}

interface TaskItemProps {
  task: Task;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle, onDelete }) => {
  return (
    <IonItem>
      <IonCheckbox
        slot="start"
        checked={task.completed}
        onIonChange={() => onToggle(task.id)}
      />
      <IonLabel
        style={{
          textDecoration: task.completed ? 'line-through' : 'none',
          color: task.completed ? 'var(--ion-color-medium)' : 'inherit',
        }}
      >
        <Link to={`/tabs/visitas/${task.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          {task.text}
        </Link>
      </IonLabel>
      <IonButton slot="end" color="danger" onClick={() => onDelete(task.id)}>
        Borrar
      </IonButton>
    </IonItem>
  );
};

export default TaskItem;
