import z from 'zod'

export const editExpenseSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, 'Title is required')
    .max(255, 'Title is too long'),

  amount: z
    .number({
      error: 'Amount is required',
    })
    .positive('Amount must be greater than 0'),

  category: z.enum([
    '',
    'Entertainment',
    'Food',
    'Transportation',
    'Utilities',
    'Services',
    'General',
  ]),

  split_type: z.enum(['Equal', 'Exact', 'Percentage']),

  user_amounts: z
    .array(
      z.object({
        user_id: z.number(),
        amount: z.number(),
      }),
    )
    .optional(),

  expense_date: z.string().min(1, 'Expense date is required'),

  note: z.string().optional(),

  paid_by: z.number({
    error: 'Select who paid for expense',
  }),
})

export type EditExpenseForm = z.infer<typeof editExpenseSchema>
