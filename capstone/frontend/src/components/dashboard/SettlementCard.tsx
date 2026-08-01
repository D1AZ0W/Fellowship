import { Card, CardContent } from '@/components/ui/card'
import type { SettlementTransaction } from '#/types/dashboard'
import { Avatar, AvatarFallback } from '../ui/avatar'

type SettlementCardProps = {
  transaction: SettlementTransaction
  currentUserId: number
}

export const SettlementCard = ({
  transaction,
  currentUserId,
}: SettlementCardProps) => {
  const isPayer = transaction.payer === currentUserId

  const otherUser = isPayer
    ? transaction.recipient_username
    : transaction.payer_username
  const message = isPayer ? `You owe ${otherUser}` : `${otherUser} owes you`

  const colorClass = isPayer
    ? 'border-l-4 border-l-red-500 text-red-500'
    : 'border-l-4 border-l-emerald-500 text-emerald-600'
  const amountColor = isPayer ? 'text-red-500' : 'text-emerald-600'

  return (
    <Card
      className={`border-border transition-all hover:bg-accent ${colorClass}`}
    >
      <CardContent className="flex items-center justify-between p-1 pl-3">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarFallback>{otherUser.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>

          <span className="text-sm font-medium text-foreground">{message}</span>
        </div>

        <span className={`text-sm font-semibold ${amountColor}`}>
          Rs. {transaction.amount.toLocaleString()}
        </span>
      </CardContent>
    </Card>
  )
}
