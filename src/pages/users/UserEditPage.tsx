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
import { useUser } from '@/modules/users';

export function UserEditPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: user, isLoading } = useUser(id || '');

  if (isLoading) {
    return <Loading text="Cargando usuario..." />;
  }

  if (!user) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500">Usuario no encontrado</p>
        <Button
          variant="ghost"
          className="mt-4"
          onClick={() => navigate('/users')}
        >
          Volver a usuarios
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={() => navigate('/users')}>
          <FiArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Editar Usuario</h1>
          <p className="text-gray-600 mt-1">
            Modificar información de {user.name}
          </p>
        </div>
      </div>

      <Card className="max-w-lg">
        <CardHeader>
          <CardTitle>Información del Usuario</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500">Formulario de edición (próximamente)</p>
        </CardContent>
      </Card>
    </div>
  );
}
