import { Loading } from '@/components';
import { useTodos } from '../hooks';
import { TodoItem } from './TodoItem';

export function TodoList() {
  const { data: todos, isLoading, error } = useTodos();

  if (isLoading) {
    return <Loading text="Loading todos..." />;
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500">Error loading todos: {error.message}</p>
      </div>
    );
  }

  if (!todos?.length) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No todos found</p>
      </div>
    );
  }

  // Limit to first 20 todos for demo
  const limitedTodos = todos.slice(0, 20);

  return (
    <div className="flex flex-col gap-2">
      {limitedTodos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  );
}
