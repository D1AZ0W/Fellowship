import { useParams } from '@tanstack/react-router'

import { useExpense } from '#/hooks/expense/useExpense'

import { ExpenseHeader } from '#/components/expenses/ExpenseHeader'
import { ExpenseParticipants } from '#/components/expenses/ExpenseParticipants'
import { ExpenseNote } from '#/components/expenses/ExpenseNote'

export const ExpenseIndv = () => {
  const { id } = useParams({
    from: '/_app/expenses/$id',
  })

  const { data: expense, isPending } = useExpense(Number(id))

  if (isPending || !expense) {
    return (
      <div className="flex h-64 items-center justify-center">Loading...</div>
    )
  }

  return (
    <div className="flex w-full flex-col gap-6">
      <ExpenseHeader
        title={expense.title}
        amount={expense.amount}
        category={expense.category}
        expense_date={expense.expense_date}
        image={expense.image}
        paid_by={expense.paid_by}
        split_type={expense.split_type}
      />
      <ExpenseParticipants participants={expense.participants} />
      {expense.note && <ExpenseNote note={expense.note} />}
    </div>
  )
}
