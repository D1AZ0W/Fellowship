import { z } from 'zod'

export const registerSchema = z
  .object({
    username: z.string().min(3),
    email: z.email(),
    first_name: z.string().min(1),
    last_name: z.string().min(1),
    password: z.string().min(8),
    confirm_password: z.string(),
  })
  .refine((data) => data.password === data.confirm_password, {
    path: ['confirm_password'],
    message: 'Passwords do not match',
  })

export type RegisterFormData = z.infer<typeof registerSchema>
