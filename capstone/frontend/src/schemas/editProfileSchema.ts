import z from 'zod'

export const editProfileSchema = z.object({
  first_name: z.string().trim().min(1, 'First name is required').max(150),
  last_name: z.string().trim().min(1, 'Last name is required').max(150),
  username: z.string().trim().min(1, 'Username is required').max(150),
  email: z.string().trim().email('Invalid email address').min(1, 'Email is required'),
})

export type EditProfileForm = z.infer<typeof editProfileSchema>
