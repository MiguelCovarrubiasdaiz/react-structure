// Modelo de dominio - Usado en la aplicación

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  createdAt: Date;
}

export interface CreateUser {
  name: string;
  email: string;
  avatar?: string;
}

export interface UpdateUser {
  name?: string;
  email?: string;
  avatar?: string;
}

export interface UserCardProps {
  user: User;
}

export interface UserFormProps {
  onSuccess?: () => void;
}
