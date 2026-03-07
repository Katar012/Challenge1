import React from 'react';
import { IonText } from '@ionic/react';
import { Task } from './TaskItem';
import TaskItem from './TaskItem';

export type { Task };

interface TaskListProps {
  tasks: Task[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onToggle, onDelete }) => {
  if (tasks.length === 0) {
    return (
      <div style={{ padding: '1rem' }}>
        <IonText color="medium">Aun no hay tareas.</IonText>
      </div>
    );
  }

  return (
    <div>
      {tasks.map(t => (
        <TaskItem key={t.id} task={t} onToggle={onToggle} onDelete={onDelete} />
      ))}
    </div>
  );
};

export default TaskList;
