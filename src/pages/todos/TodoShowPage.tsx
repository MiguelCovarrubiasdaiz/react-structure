import { useParams, useNavigate, Link } from 'react-router-dom';
import { FiArrowLeft, FiEdit, FiCheckSquare } from 'react-icons/fi';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Loading,
} from '@/shared/components';
import { useTodo } from '@/modules/todos';
import { cn } from '@/shared/utils';

export function TodoShowPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: todo, isLoading, error } = useTodo(id || '');

  if (isLoading) {
    return <Loading text="Cargando tarea..." />;
  }

  if (error || !todo) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500">Tarea no encontrada</p>
        <Button
          variant="ghost"
          className="mt-4"
          onClick={() => navigate('/todos')}
        >
          Volver a tareas
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => navigate('/todos')}>
            <FiArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Detalle de Tarea
            </h1>
            <p className="text-muted-foreground mt-1">Información completa</p>
          </div>
        </div>
        <Link to={`/todos/${id}/edit`}>
          <Button variant="outline" leftIcon={<FiEdit className="h-4 w-4" />}>
            Editar
          </Button>
        </Link>
      </div>

      <Card className="max-w-lg">
        <CardHeader>
          <CardTitle>Información de la Tarea</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3">
            <div
              className={cn(
                'flex h-10 w-10 items-center justify-center rounded-full',
                todo.completed
                  ? 'bg-green-100 text-green-600'
                  : 'bg-muted text-muted-foreground'
              )}
            >
              <FiCheckSquare className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Título</p>
              <p
                className={cn(
                  'font-medium',
                  todo.completed
                    ? 'text-muted-foreground line-through'
                    : 'text-foreground'
                )}
              >
                {todo.title}
              </p>
            </div>
          </div>

          <div className="pt-2 border-t">
            <p className="text-sm text-muted-foreground">Estado</p>
            <span
              className={cn(
                'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mt-1',

                todo.completed
                  ? 'bg-green-100 text-green-800'
                  : 'bg-yellow-100 text-yellow-800'
              )}
            >
              {todo.completed ? 'Completada' : 'Pendiente'}
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
