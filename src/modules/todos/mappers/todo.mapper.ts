import type { Todo, CreateTodo, UpdateTodo } from '../types/todo.types';
import type {
  TodoDTO,
  CreateTodoDTO,
  UpdateTodoDTO,
  ToggleTodoDTO,
} from '../types/todo.dto';

export const todoMapper = {
  toDomain: (dto: TodoDTO): Todo => ({
    id: dto.id,
    title: dto.title,
    completed: dto.completed,
    userId: dto.userId,
  }),

  toDomainList: (dtos: TodoDTO[]): Todo[] => dtos.map(todoMapper.toDomain),

  toCreateDTO: (todo: CreateTodo): CreateTodoDTO => ({
    title: todo.title,
    completed: todo.completed ?? false,
    userId: todo.userId,
  }),

  toUpdateDTO: (todo: UpdateTodo): UpdateTodoDTO => ({
    ...(todo.title !== undefined && { title: todo.title }),

    ...(todo.completed !== undefined && { completed: todo.completed }),
    ...(todo.userId !== undefined && { userId: todo.userId }),
  }),

  toToggleDTO: (completed: boolean): ToggleTodoDTO => ({
    completed,
  }),
};
