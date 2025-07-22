export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
}

export interface TodoInputProps {
  onAddTodo: (text: string) => void;
}

export interface TodoListProps {
  todos: Todo[];
  onToggleTodo: (id: string) => void;
  onEditTodo: (id: string, newText: string) => void;
  onDeleteTodo: (id: string) => void;
}

export interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onEdit: (id: string, newText: string) => void;
  onDelete: (id: string) => void;
}