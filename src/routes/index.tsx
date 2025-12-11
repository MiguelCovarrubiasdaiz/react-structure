import { createBrowserRouter } from 'react-router-dom';
import { MainLayout } from '@/shared/components/layouts';
import { HomePage } from '@/pages/home';

import {
  UsersPage,
  UserCreatePage,
  UserEditPage,
  UserShowPage,
} from '@/pages/users';
import {
  TodosPage,
  TodoCreatePage,
  TodoEditPage,
  TodoShowPage,
} from '@/pages/todos';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      // Home
      {
        index: true,
        element: <HomePage />,
      },
      // Users
      {
        path: 'users',
        children: [
          {
            index: true,
            element: <UsersPage />,
          },
          {
            path: 'create',
            element: <UserCreatePage />,
          },
          {
            path: ':id',
            element: <UserShowPage />,
          },
          {
            path: ':id/edit',
            element: <UserEditPage />,
          },
        ],
      },
      // Todos
      {
        path: 'todos',
        children: [
          {
            index: true,
            element: <TodosPage />,
          },
          {
            path: 'create',
            element: <TodoCreatePage />,
          },
          {
            path: ':id',
            element: <TodoShowPage />,
          },
          {
            path: ':id/edit',
            element: <TodoEditPage />,
          },
        ],
      },
    ],
  },
]);

export { ROUTES } from '@/shared/config';
