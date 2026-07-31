import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input, Label } from '@/shared/components';
import { createTodoSchema, type CreateTodoFormData } from '../schemas';
import { useCreateTodo } from '../hooks';
import type { TodoFormProps } from '../types';

export function TodoForm({ userId = '1', onSuccess }: TodoFormProps) {
  const createTodo = useCreateTodo();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateTodoFormData>({
    resolver: zodResolver(createTodoSchema),
    defaultValues: {
      title: '',
      userId,
    },
  });

  const onSubmit = async (data: CreateTodoFormData) => {
    try {
      await createTodo.mutateAsync({ ...data, completed: false });
      reset();
      onSuccess?.();
    } catch (error) {
      console.error('Error creating todo:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="title">Título</Label>
        <Input
          id="title"
          placeholder="Ej: Comprar leche"
          aria-invalid={!!errors.title}
          {...register('title')}
        />
        {errors.title && (
          <span className="text-sm text-destructive">
            {errors.title.message}
          </span>
        )}
      </div>

      <input type="hidden" {...register('userId')} />

      <Button
        type="submit"
        isLoading={isSubmitting || createTodo.isPending}
        className="w-full"
      >
        Agregar Tarea
      </Button>
    </form>
  );
}
