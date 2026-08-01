import { useAuth } from '#/hooks/auth/useAuth'
import { useGroupBalance } from '#/hooks/settlement/useGroupBalance'
import { useSuggestedTransactions } from '#/hooks/settlement/useSuggestedTransactions'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'

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
            <p className="mb-2 text-sm font-semibold text-muted-foreground">
              Settlements To Perform:
            </p>
            <div className="space-y-1">
              {suggestions.map((t: any, index: number) => {
                const isPayer = t.payer.id === user?.id
                if (isPayer) {
                  return (
                    <div
                      key={index}
                      className="flex items-center gap-2 text-sm text-red-500"
                    >
                      <Avatar className="h-6 w-6">
                        <AvatarImage
                          src={t.recipient.profile_picture ?? undefined}
                        />
                        <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                          {t.recipient.first_name[0]}
                        </AvatarFallback>
                      </Avatar>
                      <span>You owe</span>
                      <span className="text-foreground">
                        {t.recipient.first_name} {t.recipient.last_name}
                      </span>
                      <span>Rs. {Number(t.amount).toFixed(2)}</span>
                    </div>
                  )
                } else {
                  return (
                    <p key={index} className="text-sm text-emerald-600">
                      <span className="font-semibold text-foreground">
                        {t.payer.first_name} {t.payer.last_name}
                      </span>{' '}
                      owes you Rs. {Number(t.amount).toFixed(2)}
                    </p>
                  )
                }
              })}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
