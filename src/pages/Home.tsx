import './Home.css';
import React, { useState, useEffect } from 'react';
import TaskInput from '../components/TaskInput';
import TaskList, { Task } from '../components/TaskList';

const STORAGE_KEY = 'todos';

const Home: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  
  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        setTasks(JSON.parse(raw));
      } catch {
        
      }
    }
  }, []);

 
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (text: string) => {
    const newTask: Task = {
      id: Date.now(),
      text,
      completed: false,
    };
    setTasks(prev => [newTask, ...prev]);
  };

  const toggleTask = (id: number) => {
    setTasks(prev =>
      prev.map(t =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  const deleteTask = (id: number) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-500 to-pink-400">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-700 to-purple-700 shadow-2xl">
        <div className="max-w-3xl mx-auto px-6 py-10">
          <h1 className="text-5xl font-black text-white drop-shadow-lg mb-2">Lista de Tareas</h1>
          <p className="text-indigo-100 text-lg font-medium">Organiza tus tareas de forma eficiente</p>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="max-w-3xl mx-auto px-6 py-12">
        <TaskInput onAdd={addTask} />
        <div className="relative">
          {/* Animated background decoration */}
          <div className="absolute inset-0 bg-white/10 rounded-3xl blur-2xl -z-10 animate-pulse"></div>
          <TaskList tasks={tasks} onToggle={toggleTask} onDelete={deleteTask} />
        </div>
      </div>
    </div>
  );
};

export default Home;
