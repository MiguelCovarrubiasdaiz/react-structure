import { apiClient, API_ENDPOINTS } from '@/shared/lib';
import type { Todo, CreateTodo, UpdateTodo } from '../types/todo.types';
import type { TodoDTO } from '../types/todo.dto';
import { todoMapper } from '../mappers';

export const todoService = {
  getAll: async (): Promise<Todo[]> => {
    const { data } = await apiClient.get<TodoDTO[]>(API_ENDPOINTS.TODOS);
    return todoMapper.toDomainList(data);
  },

  getById: async (id: string): Promise<Todo> => {
    const { data } = await apiClient.get<TodoDTO>(
      `${API_ENDPOINTS.TODOS}/${id}`
    );
    return todoMapper.toDomain(data);
  },

  create: async (todo: CreateTodo): Promise<Todo> => {
    const dto = todoMapper.toCreateDTO(todo);
    const { data } = await apiClient.post<TodoDTO>(API_ENDPOINTS.TODOS, dto);
    return todoMapper.toDomain(data);
  },

  update: async (id: string, todo: UpdateTodo): Promise<Todo> => {
    const dto = todoMapper.toUpdateDTO(todo);
    const { data } = await apiClient.put<TodoDTO>(
      `${API_ENDPOINTS.TODOS}/${id}`,
      dto
    );
    return todoMapper.toDomain(data);
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`${API_ENDPOINTS.TODOS}/${id}`);
  },

  toggle: async (id: string, completed: boolean): Promise<Todo> => {
    const dto = todoMapper.toToggleDTO(completed);
    const { data } = await apiClient.patch<TodoDTO>(
      `${API_ENDPOINTS.TODOS}/${id}`,
      dto
    );
    return todoMapper.toDomain(data);
  },
};
