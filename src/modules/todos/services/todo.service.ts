import { apiClient, API_ENDPOINTS } from '@/shared/lib';
import type { Todo } from '../types';

export const todoService = {
  getAll: async (): Promise<Todo[]> => {
    const { data } = await apiClient.get<Todo[]>(API_ENDPOINTS.TODOS);
    return data;
  },

  getById: async (id: string): Promise<Todo> => {
    const { data } = await apiClient.get<Todo>(`${API_ENDPOINTS.TODOS}/${id}`);
    return data;
  },

  create: async (todo: Omit<Todo, 'id'>): Promise<Todo> => {
    const { data } = await apiClient.post<Todo>(API_ENDPOINTS.TODOS, todo);
    return data;
  },

  update: async (id: string, todo: Partial<Todo>): Promise<Todo> => {
    const { data } = await apiClient.put<Todo>(
      `${API_ENDPOINTS.TODOS}/${id}`,
      todo
    );
    return data;
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`${API_ENDPOINTS.TODOS}/${id}`);
  },

  toggle: async (id: string, completed: boolean): Promise<Todo> => {
    const { data } = await apiClient.patch<Todo>(
      `${API_ENDPOINTS.TODOS}/${id}`,
      { completed }
    );

    return data;
  },
};
