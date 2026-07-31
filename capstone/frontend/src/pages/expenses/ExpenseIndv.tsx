import { useParams } from '@tanstack/react-router'

import { useExpense } from '#/hooks/expense/useExpense'

import { ExpenseHeader } from '#/components/expenses/ExpenseHeader'
import { ExpenseParticipants } from '#/components/expenses/ExpenseParticipants'
import { ExpenseNote } from '#/components/expenses/ExpenseNote'
import { AlertMessage } from '#/components/shared/AlertMessage'

export const ExpenseIndv = () => {
  const { id } = useParams({
    from: '/_app/expenses/$id',
  })

  const { data: expense, isPending, isError, error } = useExpense(Number(id))

  if (isPending) {
    return (
      <div className="flex h-64 items-center justify-center ">Loading...</div>
    )
  }
  if (isError) {
    return (
      <AlertMessage
        variant="destructive"
        title="Error occured"
        message={error}
      />
    )
  }

  return (
    <div className="flex w-full flex-col gap-6">
      <ExpenseHeader expense={expense} />
      <ExpenseParticipants participants={expense.participants} />
      {expense.note && <ExpenseNote note={expense.note} />}
    </div>
  )
}
