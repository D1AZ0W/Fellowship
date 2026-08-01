import { Card, CardContent } from '@/components/ui/card'
import { Link } from '@tanstack/react-router'

type DashboardGroupCardProps = {
  id: number
  name: string
  members: number
  balance: number
}

export const DashboardGroupCard = ({
  id,
  name,
  members,
  balance,
}: DashboardGroupCardProps) => {
  const isOwed = balance > 0
  const isOwe = balance < 0
  const isSettled = balance === 0

  return (
    <Link to="/groups/$id" params={{ id: String(id) }}>
      <Card className="cursor-pointer border-border transition-all hover:bg-accent h-full">
        <CardContent className="flex items-start gap-4 p-2">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground font-semibold text-lg uppercase">
            {name.charAt(0)}
          </div>

          <div className="min-w-0 flex-1 space-y-1">
            <h3 className="truncate text-base font-semibold text-foreground">
              {name}
            </h3>
            <p className="text-sm text-muted-foreground">
              {members} {members === 1 ? 'member' : 'members'}
            </p>
            <div className="mt-2 text-sm font-medium">
              {isSettled && (
                <span className="text-muted-foreground">Settled up</span>
              )}
              {isOwed && (
                <span className="text-emerald-600">
                  You are owed Rs. {Math.abs(balance).toLocaleString()}
                </span>
              )}
              {isOwe && (
                <span className="text-red-500">
                  You owe Rs. {Math.abs(balance).toLocaleString()}
                </span>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
