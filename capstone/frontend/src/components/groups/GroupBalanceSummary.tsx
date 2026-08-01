import { useAuth } from '#/hooks/auth/useAuth'
import { useGroupBalance } from '#/hooks/settlement/useGroupBalance'
import { useSuggestedTransactions } from '#/hooks/settlement/useSuggestedTransactions'
import { SettlementCard } from '#/components/dashboard/SettlementCard'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

type Props = {
  groupId: number
  onSettleUpClick: () => void
}

export const GroupBalanceSummary = ({ groupId, onSettleUpClick }: Props) => {
  const { user } = useAuth()
  const { data: balances } = useGroupBalance(groupId)
  const { data: suggestedTransactions } = useSuggestedTransactions(groupId)

  const userBalance =
    balances?.find((b: any) => b.user_id === user?.id)?.balance || 0

  const suggestions =
    suggestedTransactions?.filter(
      (t: any) => t.payer.id === user?.id || t.recipient.id === user?.id,
    ) || []

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-row items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Your Balance</p>
            <p className="text-2xl font-bold">
              {userBalance > 0
                ? `You are owed Rs. ${userBalance.toFixed(2)}`
                : userBalance < 0
                  ? `You owe Rs. ${Math.abs(userBalance).toFixed(2)}`
                  : 'Settled up'}
            </p>
          </div>
          {userBalance < 0 && (
            <Button onClick={onSettleUpClick}>Settle Up</Button>
          )}
        </div>

        {suggestions.length > 0 && (
          <div className="mt-4 border-t border-border pt-4">
            <p className="mb-3 text-sm font-semibold text-muted-foreground">
              Settlements To Perform:
            </p>
            <div className="space-y-2">
              {suggestions.map((t: any, index: number) => (
                <SettlementCard
                  key={index}
                  transaction={{
                    payer: t.payer.id,
                    payer_username: `${t.payer.first_name} ${t.payer.last_name}`,
                    recipient: t.recipient.id,
                    recipient_username: `${t.recipient.first_name} ${t.recipient.last_name}`,
                    amount: Number(t.amount),
                    group: { id: groupId, name: '' },
                  }}
                  currentUserId={user?.id ?? 0}
                />
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

