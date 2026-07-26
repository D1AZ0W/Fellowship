import { useParams } from '@tanstack/react-router'

import { useGroup } from '#/hooks/groups/useGroup'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { iconType } from '#/utils/iconType'

export const GroupIndv = () => {
  const params = useParams({
    from: '/_app/groups/$id',
  })

  const { data: group, isPending } = useGroup(Number(params.id))

  if (isPending || !group) {
    return <div>Loading...</div>
  }

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-6">
      <Card className="border-border">
        <CardContent className="flex flex-col gap-6 p-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-5">
            <Avatar className="h-16 w-16 rounded-2xl">
              <AvatarImage src={group.image ?? undefined} />
              <AvatarFallback className="bg-primary text-primary-foreground">
                {iconType(group.type)}
              </AvatarFallback>
            </Avatar>

            <div>
              <h1 className="text-3xl font-bold text-foreground">
                {group.name}
              </h1>

              <div className="mt-3 flex flex-wrap gap-2">
                <Badge className="p-5 text-xl">{group.type}</Badge>
              </div>
              <CardTitle className="p-5 text-xl text-accent-foreground">
                You are {group.role}
              </CardTitle>
            </div>
          </div>

          <Button>Invite Member</Button>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="border-border lg:col-span-2">
          <CardHeader>
            <CardTitle>Expenses</CardTitle>
          </CardHeader>

          <Separator />

          <CardContent className="max-h-144 overflow-y-auto p-4d">
            <div className="space-y-3">hi</div>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardHeader>
            <CardTitle>Members</CardTitle>
          </CardHeader>

          <Separator />

          <CardContent className="max-h-96 space-y-4 overflow-y-auto pt-4">
            {group.members.map((member) => (
              <div
                key={member.id}
                className="flex items-center justify-between rounded-lg border border-border p-3"
              >
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={member.profile_picture ?? undefined} />

                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {member.first_name[0]}
                    </AvatarFallback>
                  </Avatar>

                  <div>
                    <p className="font-medium text-foreground">
                      {member.first_name} {member.last_name}
                    </p>

                    <p className="text-sm text-muted-foreground">
                      @{member.username}
                    </p>
                  </div>
                </div>

                <Badge variant="secondary">{member.role}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
