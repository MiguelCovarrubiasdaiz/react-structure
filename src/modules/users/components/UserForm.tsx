import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input } from '@/shared/components';
import { createUserSchema, type CreateUserFormData } from '../schemas';
import { useCreateUser } from '../hooks';
import type { UserFormProps } from '../types';

export function UserForm({ onSuccess }: UserFormProps) {
  const createUser = useCreateUser();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateUserFormData>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      name: '',
      email: '',
    },
  });

  const onSubmit = async (data: CreateUserFormData) => {
    try {
      await createUser.mutateAsync(data);
      reset();
      onSuccess?.();
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        label="Nombre"
        placeholder="John Doe"
        error={errors.name?.message}
        {...register('name')}
      />

      <Input
        label="Email"
        type="email"
        placeholder="john@example.com"
        error={errors.email?.message}
        {...register('email')}
      />

      <Button
        type="submit"
        isLoading={isSubmitting || createUser.isPending}
        className="w-full"
      >
        Crear Usuario
      </Button>
    </form>
  );
}
