import { Loading } from '@/shared/components';
import { useUsers } from '../hooks';
import { UserCard } from './UserCard';

export function UserList() {
  const { data: users, isLoading, error } = useUsers();

  if (isLoading) {
    return <Loading text="Loading users..." />;
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500">Error loading users: {error.message}</p>
      </div>
    );
  }

  if (!users?.length) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No users found</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {users.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
}
