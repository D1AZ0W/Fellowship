import type { Members } from '#/types/group'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

type Props = {
  members: Members[]
}

export const GroupMembers = ({ members }: Props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Members</CardTitle>
      </CardHeader>

      <Separator />

      <CardContent className="max-h-96 space-y-4 overflow-y-auto p-4">
        {members.map((member) => (
          <div
            key={member.id}
            className="flex items-center justify-between rounded-lg border border-border p-3 transition-colors hover:bg-accent"
          >
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src={member.profile_picture ?? undefined} />

                <AvatarFallback className="bg-primary text-primary-foreground">
                  {member.first_name[0]}
                </AvatarFallback>
              </Avatar>

              <div>
                <p className="font-medium">
                  {member.first_name} {member.last_name}
                </p>

                <p className="text-sm text-muted-foreground">
                  @{member.username}
                </p>
              </div>
            </div>

            <Badge variant={member.role === 'Owner' ? 'default' : 'secondary'}>
              {member.role}
            </Badge>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
