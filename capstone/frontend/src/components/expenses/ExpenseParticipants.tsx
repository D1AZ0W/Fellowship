import type { ExpenseParticpiant } from '#/types/expense'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

type ParticipantsProps = {
  participants: ExpenseParticpiant[]
}
export const ExpenseParticipants = ({ participants }: ParticipantsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Participants</CardTitle>
      </CardHeader>

      <Separator />

      <CardContent className="space-y-3 p-4">
        {participants.map((participant) => (
          <div
            key={participant.id}
            className="flex items-center justify-between rounded-lg border p-3"
          >
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src={participant.profile_picture ?? undefined} />

                <AvatarFallback>{participant.first_name[0]}</AvatarFallback>
              </Avatar>

              <div>
                <p className="font-medium">
                  {participant.first_name} {participant.last_name}
                </p>

                <p className="text-sm text-muted-foreground">
                  @{participant.username}
                </p>
              </div>
            </div>

            <Badge variant="outline">Owes Rs. {participant.amount_owed}</Badge>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
