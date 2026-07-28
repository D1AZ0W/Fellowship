import { UserExpense } from '#/pages/expenses/UserExpenses'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/expenses/')({
  component: UserExpense,
})
