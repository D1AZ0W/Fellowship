import z from 'zod'

export const createGroupSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'Group name is required')
    .max(255, 'Group name is too long'),

  type: z.enum(['', 'Trip', 'Home', 'Couple', 'Other']),
  image: z.instanceof(File).optional().or(z.null()),
})

export type createGroupForm = z.infer<typeof createGroupSchema>
