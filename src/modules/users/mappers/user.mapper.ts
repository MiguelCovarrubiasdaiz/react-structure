import type { User, CreateUser, UpdateUser } from '../types/user.types';
import type { UserDTO, CreateUserDTO, UpdateUserDTO } from '../types/user.dto';

export const userMapper = {
  toDomain: (dto: UserDTO): User => ({
    id: dto.id,
    name: dto.name,
    email: dto.email,
    avatar: dto.avatar,
    createdAt: new Date(dto.createdAt),
  }),

  toDomainList: (dtos: UserDTO[]): User[] => dtos.map(userMapper.toDomain),

  toCreateDTO: (user: CreateUser): CreateUserDTO => ({
    name: user.name,
    email: user.email,
    avatar: user.avatar,
  }),

  toUpdateDTO: (user: UpdateUser): UpdateUserDTO => ({
    ...(user.name !== undefined && { name: user.name }),
    ...(user.email !== undefined && { email: user.email }),

    ...(user.avatar !== undefined && { avatar: user.avatar }),
  }),
};
