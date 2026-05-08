import { FiCheck, FiCircle, FiTrash2 } from 'react-icons/fi';
import { Button, cn } from '@/shared/lib';
import { useToggleTodo, useDeleteTodo } from '../hooks';
import type { TodoItemProps } from '../types';

export function TodoItem({ todo }: TodoItemProps) {
  const toggleMutation = useToggleTodo();
  const deleteMutation = useDeleteTodo();

  const handleToggle = () => {
    toggleMutation.mutate({ id: todo.id, completed: !todo.completed });
  };

  const handleDelete = () => {
    deleteMutation.mutate(todo.id);
  };

  return (
    <div className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white p-4 transition-shadow hover:shadow-sm">
      <button
        onClick={handleToggle}
        className={cn(
          'flex h-6 w-6 items-center justify-center rounded-full border-2 transition-colors',
          todo.completed
            ? 'border-green-500 bg-green-500 text-white'
            : 'border-gray-300 hover:border-blue-500'
        )}
        disabled={toggleMutation.isPending}
      >
        {todo.completed && <FiCheck className="h-4 w-4" />}
        {!todo.completed && <FiCircle className="h-4 w-4 text-transparent" />}
      </button>

      <span
        className={cn(
          'flex-1 text-gray-900',
          todo.completed && 'text-gray-400 line-through'
        )}
      >
        {todo.title}
      </span>

      <Button
        variant="ghost"
        size="sm"
        onClick={handleDelete}
        disabled={deleteMutation.isPending}
        aria-label="Delete todo"
      >
        <FiTrash2 className="h-4 w-4 text-red-500" />
      </Button>
    </div>
  );
}
