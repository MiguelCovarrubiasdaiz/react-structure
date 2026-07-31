import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input, Label } from '@/shared/components';
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
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="name">Nombre</Label>
        <Input
          id="name"
          placeholder="John Doe"
          aria-invalid={!!errors.name}
          {...register('name')}
        />
        {errors.name && (
          <span className="text-sm text-destructive">
            {errors.name.message}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="john@example.com"
          aria-invalid={!!errors.email}
          {...register('email')}
        />
        {errors.email && (
          <span className="text-sm text-destructive">
            {errors.email.message}
          </span>
        )}
      </div>

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
