import { z } from 'zod';

export const userSchema = z.object({
  name: z
    .string()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(50, 'El nombre no puede exceder 50 caracteres'),

  email: z.email({ error: 'Email inválido' }),
});

export const createUserSchema = userSchema;

export const updateUserSchema = userSchema.partial();

export type UserFormData = z.infer<typeof userSchema>;
export type CreateUserFormData = z.infer<typeof createUserSchema>;
export type UpdateUserFormData = z.infer<typeof updateUserSchema>;
