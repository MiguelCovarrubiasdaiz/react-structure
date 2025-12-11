import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input } from '@/components';
import { createTodoSchema, type CreateTodoFormData } from '../schemas';
import { useCreateTodo } from '../hooks';

interface TodoFormProps {
  userId?: string;
  onSuccess?: () => void;
}

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
      <Input
        label="Título"
        placeholder="Ej: Comprar leche"
        error={errors.title?.message}
        {...register('title')}
      />

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
