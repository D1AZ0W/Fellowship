import { Card, CardContent } from '@/components/ui/card'
import { iconCategory } from '#/utils/iconCategory'

type ExpenseCardProps = {
  title: string
  paid_by: string
  amount: string
  category: string
  date: string
  image?: string | null
}

export const ExpenseCard = ({
  title,
  paid_by,
  amount,
  category,
  date,
  image,
}: ExpenseCardProps) => {
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  })

  return (
    <Card>
      <CardContent className="flex items-center gap-4 p-3">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-primary text-primary-foreground">
          {image ? (
            <img
              src={`${import.meta.env.VITE_BASE_URL}${image}`}
              alt={category}
              className="h-full w-full object-cover"
            />
          ) : (
            iconCategory(category)
          )}
        </div>

        <div className="min-w-0 flex-1">
          <p className="truncate font-semibold">{title}</p>
          <p className="text-sm text-muted-foreground">Paid by {paid_by}</p>
        </div>

        <div className="shrink-0 text-right">
          <p className="font-semibold">Rs. {amount}</p>
          <p className="text-sm text-muted-foreground">
            {category} · {formattedDate}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
