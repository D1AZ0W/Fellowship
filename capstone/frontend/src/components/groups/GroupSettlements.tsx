import { useBalance } from '#/hooks/settlement/useShowBalance'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { AlertMessage } from '../shared/AlertMessage'
import { format } from 'date-fns'
import { CheckCircle2 } from 'lucide-react'

type Props = {
  groupId: number
}

export const GroupSettlements = ({ groupId }: Props) => {
  const { data: settlements, isPending, isError, error } = useBalance(groupId)

  if (isPending) {
    return (
      <Card>
        <CardContent className="flex h-72 items-center justify-center">
          Loading...
        </CardContent>
      </Card>
    )
  }

  if (isError) {
    return (
      <AlertMessage
        variant="destructive"
        title="Error while fetching settlements"
        message={error}
      />
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Settlements</CardTitle>
      </CardHeader>

      <Separator />

      <CardContent className="max-h-96 overflow-y-auto p-4">
        {!settlements || settlements.length === 0 ? (
          <div className="flex h-72 flex-col items-center justify-center text-center">
            <p className="text-lg font-medium">No settlements yet</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Any settle up payments will show up here.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {settlements.map((settlement: any) => {
              const formattedDate = format(
                new Date(settlement.created_at),
                'MMM d, yyyy',
              )
              return (
                <Card key={settlement.id} className="border-border">
                  <CardContent className="p-4 space-y-3">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                          <CheckCircle2 className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold sm:text-base">
                            {settlement.payer.first_name}{' '}
                            {settlement.payer.last_name}
                            <span className="font-normal text-muted-foreground">
                              {' '}
                              paid{' '}
                            </span>
                            {settlement.recipient.first_name}{' '}
                            {settlement.recipient.last_name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {formattedDate}
                          </p>
                        </div>
                      </div>
                      <div className="shrink-0 text-right">
                        <p className="text-sm font-bold text-emerald-600 sm:text-lg">
                          Rs. {Number(settlement.amount).toFixed(2)}
                        </p>
                      </div>
                    </div>

                    {settlement.note && (
                      <p className="rounded-md bg-muted/50 p-2 text-sm italic text-muted-foreground">
                        "{settlement.note}"
                      </p>
                    )}

                    {settlement.images && settlement.images.length > 0 && (
                      <div className="flex flex-wrap gap-2 pt-1">
                        {settlement.images.map((img: any) => (
                          <a
                            key={img.id}
                            href={`${import.meta.env.VITE_BASE_URL}${img.image}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block h-16 w-16 overflow-hidden rounded-md border border-border transition-opacity hover:opacity-85"
                          >
                            <img
                              src={`${import.meta.env.VITE_BASE_URL}${img.image}`}
                              alt="Receipt"
                              className="h-full w-full object-cover"
                            />
                          </a>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
