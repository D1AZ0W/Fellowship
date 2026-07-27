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
  expense_date: string
  paid_by: string
}
