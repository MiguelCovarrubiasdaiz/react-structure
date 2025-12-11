import { z } from 'zod';

export const todoSchema = z.object({
  title: z
    .string()
    .min(1, 'El título es requerido')
    .max(100, 'El título no puede exceder 100 caracteres'),
  completed: z.boolean().default(false),
  userId: z.string().min(1, 'El usuario es requerido'),
});

export const createTodoSchema = todoSchema.omit({ completed: true });

export const updateTodoSchema = todoSchema.partial();

export type TodoFormData = z.infer<typeof todoSchema>;
export type CreateTodoFormData = z.infer<typeof createTodoSchema>;
export type UpdateTodoFormData = z.infer<typeof updateTodoSchema>;
