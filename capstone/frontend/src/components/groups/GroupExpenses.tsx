import { useState } from 'react'

import { useGroupExpense } from '#/hooks/expense/useGroupExpense'
import { CreateExpenseDialog } from '../expenses/CreateExpenseDialog'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import type { Members } from '#/types/group'
import { Link } from '@tanstack/react-router'
import { ExpenseCard } from '../expenses/ExpenseCard'

type Props = {
  groupId: number
  members: Members[]
}

export const GroupExpenses = ({ groupId, members }: Props) => {
  const [open, setOpen] = useState(false)
  const { data: expenses, isPending } = useGroupExpense(groupId)

  if (isPending) {
    return (
      <Card className="lg:col-span-2">
        <CardContent className="flex h-72 items-center justify-center">
          Loading...
        </CardContent>
      </Card>
    )
  }

  return (
    <>
      <Card className="lg:col-span-2">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Expenses</CardTitle>
          {expenses?.length !== 0 && (
            <Button onClick={() => setOpen(true)}>Add Expense</Button>
          )}
        </CardHeader>

        <Separator />

        <CardContent className="max-h-96 overflow-y-auto p-4">
          {expenses?.length === 0 ? (
            <div className="flex h-72 flex-col items-center justify-center text-center">
              <p className="text-lg font-medium">No expenses yet</p>

              <p className="mt-1 text-sm text-muted-foreground">
                Add your first expense to start splitting bills.
              </p>

              <Button className="mt-5" onClick={() => setOpen(true)}>
                Add Expense
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              {expenses?.map((expense) => (
                <Link
                  key={expense.id}
                  to="/expenses/$id"
                  params={{ id: expense.id.toString() }}
                >
                  <ExpenseCard
                    title={expense.title}
                    paid_by={expense.paid_by}
                    amount={expense.amount}
                    category={expense.category}
                    date={expense.expense_date}
                    image={expense.image}
                  />
                </Link>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <CreateExpenseDialog
        groupId={groupId}
        open={open}
        members={members}
        onOpenChange={setOpen}
      />
    </>
  )
}
