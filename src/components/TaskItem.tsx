import React from 'react';

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
    <div className={`flex items-center gap-4 p-5 rounded-xl shadow-md transition-all transform hover:shadow-xl ${
      task.completed
        ? 'bg-gradient-to-r from-green-100 to-emerald-50 border-2 border-green-300'
        : 'bg-gradient-to-r from-white to-blue-50 border-2 border-blue-200'
    }`}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
        className="w-6 h-6 text-green-500 rounded-lg focus:ring-4 focus:ring-green-300 cursor-pointer transition-all"
      />
      <span
        className={`flex-1 text-lg font-medium transition-all ${
          task.completed
            ? 'line-through text-gray-400'
            : 'text-gray-800'
        }`}
      >
        {task.text}
      </span>
      <button
        onClick={() => onDelete(task.id)}
        className="px-4 py-2 bg-red-500 text-white font-bold rounded-lg hover:bg-red-600 hover:shadow-lg transition-all transform hover:scale-110 active:scale-95"
      >
        X
      </button>
    </div>
  );
};

export default TaskItem;
