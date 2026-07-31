import { FiMail, FiUser } from 'react-icons/fi';
import { Card, CardContent } from '@/shared/components';
import type { UserCardProps } from '../types';

export function UserCard({ user }: UserCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent>
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
            <FiUser className="h-6 w-6" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-foreground">{user.name}</h3>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <FiMail className="h-4 w-4" />
              <span>{user.email}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
