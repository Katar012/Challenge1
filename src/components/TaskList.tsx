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
    return (
      <div className="text-center py-16">
        <p className="text-5xl mb-4">Empty</p>
        <p className="text-2xl font-bold text-white drop-shadow-lg">No hay tareas</p>
        <p className="text-white/80 text-lg mt-2">Crea una nueva tarea para empezar</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {tasks.map(t => (
        <TaskItem key={t.id} task={t} onToggle={onToggle} onDelete={onDelete} />
      ))}
    </div>
  );
};

export default TaskList;
