import React from 'react';
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
    return <p style={{ padding: '1rem' }}>Aun no hay tareas.</p>;
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
