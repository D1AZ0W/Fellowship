import z from 'zod'

export const createSettlementSchema = z.object({
  recipient: z.number('Select recipient'),
  amount: z
    .number('Enter a valid amount')
    .positive('Amount must be greater than 0'),
  note: z.string().optional(),
  images: z.array(z.instanceof(File)).optional(),
})

export type CreateSettlementForm = z.infer<typeof createSettlementSchema>
