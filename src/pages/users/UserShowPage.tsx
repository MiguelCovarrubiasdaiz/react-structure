import { useParams, useNavigate, Link } from 'react-router-dom';
import { FiArrowLeft, FiEdit, FiMail, FiUser } from 'react-icons/fi';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Loading,
} from '@/shared/components';
import { useUser } from '@/modules/users';

export function UserShowPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: user, isLoading, error } = useUser(id || '');

  if (isLoading) {
    return <Loading text="Cargando usuario..." />;
  }

  if (error || !user) {
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
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => navigate('/users')}>
            <FiArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{user.name}</h1>
            <p className="text-gray-600 mt-1">Detalles del usuario</p>
          </div>
        </div>
        <Link to={`/users/${id}/edit`}>
          <Button variant="outline" leftIcon={<FiEdit className="h-4 w-4" />}>
            Editar
          </Button>
        </Link>
      </div>

      <Card className="max-w-lg">
        <CardHeader>
          <CardTitle>Información del Usuario</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600">
              <FiUser className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Nombre</p>
              <p className="font-medium text-gray-900">{user.name}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-600">
              <FiMail className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-medium text-gray-900">{user.email}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
