import { useState, useEffect } from 'react';
import { TodoTask } from '../types/todo';
import { LocalStore } from '../services/storage/localStore';

export const useTodos = () => {
  const [todos, setTodos] = useState<TodoTask[]>([]);
  const [loaded, setLoaded] = useState(false);

  // Load persistence
  useEffect(() => {
    const loadData = async () => {
      const stored = await LocalStore.loadTodos();
      if (stored && stored.length > 0) {
        setTodos(stored);
      } else {
        // First time load default
        setTodos([
          {
            id: '1',
            title: 'Buy groceries',
            isCompleted: false,
            createdAt: new Date(),
          },
        ]);
      }
      setLoaded(true);
    };
    loadData();
  }, []);

  // Save on changes
  useEffect(() => {
    if (loaded) {
      LocalStore.saveTodos(todos);
    }
  }, [todos, loaded]);

  const addTodo = (title: string) => {
    const newTask: TodoTask = {
      id: Math.random().toString(36).substr(2, 9),
      title,
      isCompleted: false,
      createdAt: new Date(),
    };
    setTodos([...todos, newTask]);
  };

  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
    ));
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return { todos, addTodo, toggleTodo, deleteTodo };
};
