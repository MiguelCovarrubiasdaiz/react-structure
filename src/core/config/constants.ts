export const APP_NAME = 'Structure React';

export const ROUTES = {
  HOME: '/',
  USERS: '/users',
  TODOS: '/todos',
} as const;

export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
} as const;

export const API_ENDPOINTS = {
  USERS: '/users',
  TODOS: '/todos',
  POSTS: '/posts',
} as const;

export const QUERY_KEYS = {
  USERS: ['users'] as const,
  USER: (id: string) => ['users', id] as const,
  TODOS: ['todos'] as const,
  TODO: (id: string) => ['todos', id] as const,
} as const;
