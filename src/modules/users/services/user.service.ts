import { apiClient, API_ENDPOINTS } from '@/core';
import type { User } from '../types';

export const userService = {
  getAll: async (): Promise<User[]> => {
    const { data } = await apiClient.get<User[]>(API_ENDPOINTS.USERS);
    return data;
  },

  getById: async (id: string): Promise<User> => {
    const { data } = await apiClient.get<User>(`${API_ENDPOINTS.USERS}/${id}`);
    return data;
  },

  create: async (user: Omit<User, 'id' | 'createdAt'>): Promise<User> => {
    const { data } = await apiClient.post<User>(API_ENDPOINTS.USERS, user);
    return data;
  },

  update: async (id: string, user: Partial<User>): Promise<User> => {
    const { data } = await apiClient.put<User>(
      `${API_ENDPOINTS.USERS}/${id}`,
      user
    );

    return data;
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`${API_ENDPOINTS.USERS}/${id}`);
  },
};
