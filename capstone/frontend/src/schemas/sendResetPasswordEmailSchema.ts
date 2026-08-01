import { z } from 'zod'

export const sendResetPasswordEmailSchema = z.object({
  email: z.string().email('Invalid email address'),
})

export type SendResetPasswordEmailFormData = z.infer<
  typeof sendResetPasswordEmailSchema
>
