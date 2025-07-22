import { Todo } from '../types/Todo';

const TODOS_STORAGE_KEY = 'react-todo-app-todos';

export const loadTodosFromStorage = (): Todo[] => {
  try {
    const storedTodos = localStorage.getItem(TODOS_STORAGE_KEY);
    if (storedTodos) {
      const parsedTodos = JSON.parse(storedTodos);
      // Convert createdAt strings back to Date objects
      return parsedTodos.map((todo: any) => ({
        ...todo,
        createdAt: new Date(todo.createdAt)
      }));
    }
    return [];
  } catch (error) {
    console.error('Error loading todos from localStorage:', error);
    return [];
  }
};

export const saveTodosToStorage = (todos: Todo[]): void => {
  try {
    localStorage.setItem(TODOS_STORAGE_KEY, JSON.stringify(todos));
  } catch (error) {
    console.error('Error saving todos to localStorage:', error);
  }
};