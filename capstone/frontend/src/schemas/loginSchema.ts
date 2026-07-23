import { z } from 'zod'

export const loginSchema = z.object({
  username: z.string().trim().min(3, 'Username must be at least 3 characters'),
  password: z.string().min(8, 'Password should be at least 8 characters'),
})

export type LoginFormData = z.infer<typeof loginSchema>
