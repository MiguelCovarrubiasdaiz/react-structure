export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  createdAt: string;
}

export interface UserCardProps {
  user: User;
}

export interface UserFormProps {
  onSuccess?: () => void;
}
