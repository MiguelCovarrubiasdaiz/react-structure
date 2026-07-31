import { Link } from 'react-router-dom';
import { FiPlus } from 'react-icons/fi';
import { Button } from '@/shared/components';
import { UserList } from '@/modules/users';

export function UsersPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Users</h1>
          <p className="text-muted-foreground mt-1">
            Lista de usuarios desde JSONPlaceholder API
          </p>
        </div>
        <Link to="/users/create">
          <Button leftIcon={<FiPlus className="h-4 w-4" />}>
            Nuevo Usuario
          </Button>
        </Link>
      </div>
      <UserList />
    </div>
  );
}
