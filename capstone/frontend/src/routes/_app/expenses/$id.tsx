import { ExpenseIndv } from '#/pages/expenses/ExpenseIndv'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/expenses/$id')({
  component: ExpenseIndv,
})
