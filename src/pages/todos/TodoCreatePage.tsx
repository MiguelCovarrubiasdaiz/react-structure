import { useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/shared/components';
import { TodoForm } from '@/modules/todos';

export function TodoCreatePage() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={() => navigate('/todos')}>
          <FiArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Crear Tarea</h1>
          <p className="text-gray-600 mt-1">Agrega una nueva tarea</p>
        </div>
      </div>

      <Card className="max-w-lg">
        <CardHeader>
          <CardTitle>Información de la Tarea</CardTitle>
        </CardHeader>
        <CardContent>
          <TodoForm onSuccess={() => navigate('/todos')} />
        </CardContent>
      </Card>
    </div>
  );
}
