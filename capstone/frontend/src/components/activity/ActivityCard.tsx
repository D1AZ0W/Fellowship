import { formatDistanceToNow } from 'date-fns'

import type { Activity } from '#/types/activity'
import { Card, CardContent } from '@/components/ui/card'
import { getActivityIcon } from '#/utils/iconActivity'

type Props = {
  activity: Activity
}

export const ActivityCard = ({ activity }: Props) => {
  return (
    <Card className="border-border shadow-sm transition-all hover:bg-accent">
      <CardContent className="flex gap-4 items-start p-4">
        <div className="mt-0.5 rounded-full bg-muted p-2">
          {getActivityIcon(activity.activity_type)}
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-sm font-medium leading-none">
            <span className="font-semibold">{activity.done_by.username}</span>{' '}
            {activity.description}
          </p>
          <p className="text-xs text-muted-foreground">
            {formatDistanceToNow(new Date(activity.created_at), {
              addSuffix: true,
            })}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
