import React, { useState, FormEvent } from 'react';

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
    <form onSubmit={handleSubmit} className="mb-8">
      <div className="flex gap-3 p-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow">
        <input
          type="text"
          value={value}
          placeholder="Escribir nueva tarea..."
          onChange={e => setValue(e.target.value)}
          className="flex-1 px-5 py-3 border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-white bg-white/95 text-gray-800 placeholder-gray-500 font-medium transition-all"
        />
        <button
          type="submit"
          className="px-8 py-3 bg-white text-purple-600 font-bold rounded-xl hover:bg-yellow-300 transition-all transform hover:scale-105 shadow-md active:scale-95"
        >
          Añadir
        </button>
      </div>
    </form>
  );
};

export default TaskInput;
