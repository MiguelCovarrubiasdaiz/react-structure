import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/shared/lib';
import { userService } from '../services';
import type { User } from '../types';

export const useUsers = () => {
  return useQuery({
    queryKey: QUERY_KEYS.USERS,
    queryFn: userService.getAll,
  });
};

export const useUser = (id: string) => {
  return useQuery({
    queryKey: QUERY_KEYS.USER(id),
    queryFn: () => userService.getById(id),
    enabled: !!id,
  });
};

export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (user: Omit<User, 'id' | 'createdAt'>) =>
      userService.create(user),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.USERS });
    },
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, user }: { id: string; user: Partial<User> }) =>
      userService.update(id, user),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.USERS });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.USER(id) });
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => userService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.USERS });
    },
  });
};
