import type { User } from '#/types/auth'

export type Expense = {
  id: number
  title: string
  image: string | null
  amount: string
  category:
    | 'Entertainment'
    | 'Food'
    | 'Transportation'
    | 'Utlities'
    | 'Services'
    | 'General'
  split_type: 'Equal' | 'Exact' | 'Percentage'
  note: string
  expense_date: string
  paid_by: User
}

export type ExpenseParticpiant = User & {
  amount_owed: number | null
}

export type ExpenseDetails = {
  id: number
  title: string
  image: string | null
  amount: string
  category:
    | 'Entertainment'
    | 'Food'
    | 'Transportation'
    | 'Utilities'
    | 'Services'
    | 'General'
  split_type: 'Equal' | 'Exact' | 'Percentage'
  note: string | null
  expense_date: string
  paid_by: User
  participants: ExpenseParticpiant[]
}

export type PaginatedExpense = {
  count: number
  next: string | null
  previous: string | null
  results: Expense[]
}
