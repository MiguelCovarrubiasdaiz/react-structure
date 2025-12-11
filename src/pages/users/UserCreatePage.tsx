import { useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { Button, Card, CardContent, CardHeader, CardTitle } from '@/components';
import { UserForm } from '@/modules/users';

export function UserCreatePage() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={() => navigate('/users')}>
          <FiArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Crear Usuario</h1>
          <p className="text-gray-600 mt-1">
            Agrega un nuevo usuario al sistema
          </p>
        </div>
      </div>

      <Card className="max-w-lg">
        <CardHeader>
          <CardTitle>Información del Usuario</CardTitle>
        </CardHeader>
        <CardContent>
          <UserForm onSuccess={() => navigate('/users')} />
        </CardContent>
      </Card>
    </div>
  );
}
