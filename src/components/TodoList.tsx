import { TodoListProps } from '../types/Todo';
import TodoItem from './TodoItem';
import './TodoList.css';

const TodoList = ({ todos, onToggleTodo, onEditTodo, onDeleteTodo }: TodoListProps) => {
  const completedCount = todos.filter(todo => todo.completed).length;
  const totalCount = todos.length;

  if (todos.length === 0) {
    return (
      <div className="empty-state" role="status" aria-live="polite">
        <p>No todos yet. Add one above to get started!</p>
      </div>
    );
  }

  return (
    <div>
      <div className="todo-stats" aria-live="polite">
        <span className="sr-only">
          {totalCount} total todos, {completedCount} completed, {totalCount - completedCount} remaining
        </span>
        <p className="stats-text">
          {totalCount - completedCount} of {totalCount} tasks remaining
        </p>
      </div>
      <ul 
        className="todo-list" 
        aria-label={`Todo list with ${totalCount} items`}
      >
        {todos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={onToggleTodo}
            onEdit={onEditTodo}
            onDelete={onDeleteTodo}
          />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;