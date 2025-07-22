import { useState, useEffect } from 'react';
import { Todo } from './types/Todo';
import { loadTodosFromStorage, saveTodosToStorage } from './utils/localStorage';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';
import './App.css';

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);

  // Load todos from localStorage on component mount
  useEffect(() => {
    const loadedTodos = loadTodosFromStorage();
    setTodos(loadedTodos);
  }, []);

  // Save todos to localStorage whenever todos change
  useEffect(() => {
    saveTodosToStorage(todos);
  }, [todos]);

  // Generate unique ID for new todos
  const generateId = (): string => {
    return Date.now().toString() + Math.random().toString(36).substring(2, 11);
  };

  // Add new todo
  const addTodo = (text: string): void => {
    if (text.trim() === '') return;
    
    const newTodo: Todo = {
      id: generateId(),
      text: text.trim(),
      completed: false,
      createdAt: new Date()
    };
    
    setTodos(prevTodos => [...prevTodos, newTodo]);
  };

  // Toggle todo completion status
  const toggleTodo = (id: string): void => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // Edit todo text
  const editTodo = (id: string, newText: string): void => {
    if (newText.trim() === '') {
      // If text is empty, delete the todo
      deleteTodo(id);
      return;
    }
    
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, text: newText.trim() } : todo
      )
    );
  };

  // Delete todo
  const deleteTodo = (id: string): void => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Todo App</h1>
        <p>Manage your tasks efficiently</p>
      </header>
      <main>
        <div className="todo-container">
          <TodoInput onAddTodo={addTodo} />
          <TodoList
            todos={todos}
            onToggleTodo={toggleTodo}
            onEditTodo={editTodo}
            onDeleteTodo={deleteTodo}
          />
        </div>
      </main>
    </div>
  );
}

export default App;
