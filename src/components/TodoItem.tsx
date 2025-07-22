import { useState } from 'react';
import { TodoItemProps } from '../types/Todo';
import './TodoItem.css';

const TodoItem = ({ todo, onToggle, onEdit, onDelete }: TodoItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(todo.text);

  const handleDoubleClick = () => {
    setIsEditing(true);
    setEditValue(todo.text);
  };

  const handleEditSubmit = () => {
    if (editValue.trim()) {
      onEdit(todo.id, editValue.trim());
    } else {
      onDelete(todo.id);
    }
    setIsEditing(false);
  };

  const handleEditCancel = () => {
    setEditValue(todo.text);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleEditSubmit();
    } else if (e.key === 'Escape') {
      handleEditCancel();
    }
  };

  const handleEditBlur = () => {
    handleEditSubmit();
  };

  const handleTextKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleDoubleClick();
    }
  };

  return (
    <li 
      className={`todo-item ${todo.completed ? 'completed' : ''}`}
      aria-label={`Todo: ${todo.text}, ${todo.completed ? 'completed' : 'not completed'}`}
    >
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        className="todo-checkbox"
        aria-label={`Mark "${todo.text}" as ${todo.completed ? 'not completed' : 'completed'}`}
        id={`todo-checkbox-${todo.id}`}
      />
      
      {isEditing ? (
        <input
          type="text"
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={handleEditBlur}
          className="todo-edit-input"
          autoFocus
          aria-label="Edit todo text"
          aria-describedby={`edit-help-${todo.id}`}
        />
      ) : (
        <span
          className="todo-text"
          onDoubleClick={handleDoubleClick}
          onKeyDown={handleTextKeyDown}
          tabIndex={0}
          role="button"
          aria-label={`Edit todo: ${todo.text}. Double-click or press Enter to edit.`}
        >
          {todo.text}
        </span>
      )}
      
      <button
        onClick={() => onDelete(todo.id)}
        className="todo-delete-button"
        aria-label={`Delete todo: ${todo.text}`}
        title="Delete todo"
      >
        ×
      </button>
      
      {isEditing && (
        <div id={`edit-help-${todo.id}`} className="sr-only">
          Press Enter to save changes, Escape to cancel
        </div>
      )}
    </li>
  );
};

export default TodoItem;