import { Link } from 'react-router-dom';
import { FiPlus } from 'react-icons/fi';
import { Button } from '@/shared/components';
import { TodoList } from '@/modules/todos';

export function TodosPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Todos</h1>
          <p className="text-muted-foreground mt-1">
            Lista de tareas desde JSONPlaceholder API
          </p>
        </div>
        <Link to="/todos/create">
          <Button leftIcon={<FiPlus className="h-4 w-4" />}>Nueva Tarea</Button>
        </Link>
      </div>
      <TodoList />
    </div>
  );
}
