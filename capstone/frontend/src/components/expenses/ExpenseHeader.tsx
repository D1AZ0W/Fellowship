import {
  CalendarDays,
  MoreVertical,
  Receipt,
  Settings,
  Tag,
  Trash,
  User,
} from 'lucide-react'
import { Badge } from '../ui/badge'
import { Card, CardContent } from '../ui/card'
import { Separator } from '../ui/separator'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { useState } from 'react'
import { EditExpenseDialog } from './EditExpenseDialog'
import { DeleteExpenseDialog } from './DeleteExpenseDialog'
import type { ExpenseDetails } from '#/types/expense'
import { format } from 'date-fns'

type HeaderProps = {
  expense: ExpenseDetails
}

export const ExpenseHeader = ({ expense }: HeaderProps) => {
  const formattedDate = format(new Date(expense.expense_date), 'MMM d')

  const [editOpen, setEditOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)

  return (
    <>
      <Card>
        <CardContent className="space-y-6 p-6">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <h1 className="truncate text-3xl font-bold">{expense.title}</h1>
              <p className="mt-2 text-4xl font-bold text-primary">
                Rs. {expense.amount}
              </p>
            </div>
            {expense.image && (
              <img
                src={`${import.meta.env.VITE_BASE_URL}${expense.image}`}
                alt={expense.title}
                className="h-34 w-50 shrink-0 rounded-xl border object-cover"
              />
            )}
          </div>
          <Separator />

          <div className="flex items-start gap-8">
            <div className="grid flex-1 gap-x-10 gap-y-5 md:grid-cols-2">
              <div className="flex items-center gap-3">
                <User className="h-5 w-5 shrink-0 text-primary" />
                <div className="min-w-0">
                  <p className="text-sm text-muted-foreground">Paid By</p>
                  <p className="truncate font-medium">
                    {expense.paid_by.username}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <CalendarDays className="h-5 w-5 shrink-0 text-primary" />
                <div className="min-w-0">
                  <p className="text-sm text-muted-foreground">Expense Date</p>
                  <p className="font-medium">{formattedDate}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Tag className="h-5 w-5 shrink-0 text-primary" />
                <div className="min-w-0">
                  <p className="text-sm text-muted-foreground">Category</p>
                  <Badge variant="secondary">{expense.category}</Badge>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Receipt className="h-5 w-5 shrink-0 text-primary" />
                <div className="min-w-0">
                  <p className="text-sm text-muted-foreground">Split Type</p>
                  <Badge>{expense.split_type}</Badge>
                </div>
              </div>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger>
                <MoreVertical className="h-5 w-5" />
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="min-w-44">
                <DropdownMenuItem onClick={() => setEditOpen(true)}>
                  <Settings className="mr-2 h-4 w-4" />
                  Edit Expense
                </DropdownMenuItem>

                <DropdownMenuItem
                  className="text-destructive focus:text-destructive"
                  onClick={() => setDeleteOpen(true)}
                >
                  <Trash className="mr-2 h-4 w-4" />
                  Delete Expense
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardContent>
      </Card>
      <EditExpenseDialog
        open={editOpen}
        onOpenChange={setEditOpen}
        expense={expense}
      />

      <DeleteExpenseDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        expenseId={expense.id}
      />
    </>
  )
}
