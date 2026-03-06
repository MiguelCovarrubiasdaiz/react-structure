// DTOs - Representan la estructura de datos de la API

export interface UserDTO {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  createdAt: string;
}

export interface CreateUserDTO {
  name: string;
  email: string;
  avatar?: string;
}

export interface UpdateUserDTO {
  name?: string;
  email?: string;
  avatar?: string;
}
