// DTOs - Representan la estructura de datos de la API

export interface TodoDTO {
  id: string;
  title: string;
  completed: boolean;
  userId: string;
}

export interface CreateTodoDTO {
  title: string;
  completed: boolean;
  userId: string;
}

export interface UpdateTodoDTO {
  title?: string;

  completed?: boolean;
  userId?: string;
}

export interface ToggleTodoDTO {
  completed: boolean;
}
