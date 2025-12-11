import { useParams, useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Loading,
} from '@/shared/components';
import { useTodo } from '@/modules/todos';

export function TodoEditPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: todo, isLoading } = useTodo(id || '');

  if (isLoading) {
    return <Loading text="Cargando tarea..." />;
  }

  if (!todo) {
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
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={() => navigate('/todos')}>
          <FiArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Editar Tarea</h1>
          <p className="text-gray-600 mt-1">Modificar: {todo.title}</p>
        </div>
      </div>

      <Card className="max-w-lg">
        <CardHeader>
          <CardTitle>Información de la Tarea</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500">Formulario de edición (próximamente)</p>
        </CardContent>
      </Card>
    </div>
  );
}
