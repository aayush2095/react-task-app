import { useState } from 'react';
import { TodoInputProps } from '../types/Todo';
import './TodoInput.css';

const TodoInput = ({ onAddTodo }: TodoInputProps) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onAddTodo(inputValue.trim());
      setInputValue('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="todo-input-form" aria-label="Add new todo">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="What needs to be done?"
        className="todo-input"
        autoFocus
        aria-label="New todo text"
        aria-describedby="todo-input-help"
        required
      />
      <button 
        type="submit" 
        className="todo-input-button"
        aria-label="Add new todo"
        disabled={!inputValue.trim()}
      >
        Add Todo
      </button>
      <div id="todo-input-help" className="sr-only">
        Enter your todo item and press Enter or click Add Todo to add it to your list
      </div>
    </form>
  );
};

export default TodoInput;