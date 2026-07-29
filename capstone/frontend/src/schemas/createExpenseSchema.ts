import z from 'zod'

export const createExpenseSchema = z
  .object({
    title: z
      .string()
      .trim()
      .min(1, 'Title is required')
      .max(255, 'Title is too long'),

    image: z.instanceof(File).optional().or(z.null()),
    amount: z
      .number({
        error: 'Amount is required',
      })
      .positive('Amount must be greater than 0'),

    category: z.enum([
      'Entertainment',
      'Food',
      'Transportation',
      'Utilities',
      'Services',
      'General',
      '',
    ]),

    split_type: z.enum(['Equal', 'Exact', 'Percentage']),

    user_amounts: z
      .array(
        z.object({
          user_id: z.number(),
          amount: z.number({
            error: 'Amount is required',
          }),
        }),
      )
      .optional(),

    expense_date: z.string().min(1, 'Expense date is required'),
    note: z.string().optional(),
    paid_by: z.number({
      error: 'Select who paid for expense',
    }),

    group: z.number().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.split_type !== 'Equal') {
      if (!data.user_amounts || data.user_amounts.length === 0) {
        ctx.addIssue({
          code: 'custom',
          path: ['user_amounts'],
          message: 'Enter amounts for each participant.',
        })
        return
      }

      if (data.split_type === 'Percentage') {
        const total = data.user_amounts.reduce((sum, u) => sum + u.amount, 0)
        if (total !== 100) {
          ctx.addIssue({
            code: 'custom',
            path: ['user_amounts'],
            message: 'Percentages must add up to 100.',
          })
        }
      }

      if (data.split_type === 'Exact') {
        const total = data.user_amounts.reduce((sum, u) => sum + u.amount, 0)
        if (total - data.amount !== 0) {
          ctx.addIssue({
            code: 'custom',
            path: ['user_amounts'],
            message: 'Amounts must add up to the total expense amount.',
          })
        }
      }
    }
  })

export type CreateExpenseForm = z.infer<typeof createExpenseSchema>
