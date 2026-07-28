import { CalendarDays, Receipt, Tag, User } from 'lucide-react'
import { Badge } from '../ui/badge'
import { Card, CardContent } from '../ui/card'
import { Separator } from '../ui/separator'

type HeaderProps = {
  title: string
  amount: string
  image?: string | null
  paid_by: string
  expense_date: string
  category: string
  split_type: string
}

export const ExpenseHeader = ({
  title,
  amount,
  image,
  paid_by,
  expense_date,
  category,
  split_type,
}: HeaderProps) => {
  const formattedDate = new Date(expense_date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })

  return (
    <Card>
      <CardContent className="space-y-6 p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h1 className="truncate text-3xl font-bold">{title}</h1>
            <p className="mt-2 text-4xl font-bold text-primary">Rs. {amount}</p>
          </div>
          {image && (
            <img
              src={`${import.meta.env.VITE_BASE_URL}${image}`}
              alt={title}
              className="h-28 w-28 shrink-0 rounded-xl border object-cover"
            />
          )}
        </div>
        <Separator />
        <div className="grid gap-5 md:grid-cols-2">
          <div className="flex items-center gap-3">
            <User className="h-5 w-5 shrink-0 text-primary" />
            <div className="min-w-0">
              <p className="text-sm text-muted-foreground">Paid By</p>
              <p className="truncate font-medium">{paid_by}</p>
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
              <Badge variant="secondary">{category}</Badge>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Receipt className="h-5 w-5 shrink-0 text-primary" />
            <div className="min-w-0">
              <p className="text-sm text-muted-foreground">Split Type</p>
              <Badge>{split_type}</Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
