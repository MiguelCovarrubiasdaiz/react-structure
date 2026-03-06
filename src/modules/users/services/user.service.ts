import { apiClient, API_ENDPOINTS } from '@/shared/lib';
import type { User, CreateUser, UpdateUser } from '../types/user.types';
import type { UserDTO } from '../types/user.dto';
import { userMapper } from '../mappers';

export const userService = {
  getAll: async (): Promise<User[]> => {
    const { data } = await apiClient.get<UserDTO[]>(API_ENDPOINTS.USERS);
    return userMapper.toDomainList(data);
  },

  getById: async (id: string): Promise<User> => {
    const { data } = await apiClient.get<UserDTO>(
      `${API_ENDPOINTS.USERS}/${id}`
    );
    return userMapper.toDomain(data);
  },

  create: async (user: CreateUser): Promise<User> => {
    const dto = userMapper.toCreateDTO(user);
    const { data } = await apiClient.post<UserDTO>(API_ENDPOINTS.USERS, dto);
    return userMapper.toDomain(data);
  },

  update: async (id: string, user: UpdateUser): Promise<User> => {
    const dto = userMapper.toUpdateDTO(user);
    const { data } = await apiClient.put<UserDTO>(
      `${API_ENDPOINTS.USERS}/${id}`,
      dto
    );
    return userMapper.toDomain(data);
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`${API_ENDPOINTS.USERS}/${id}`);
  },
};
