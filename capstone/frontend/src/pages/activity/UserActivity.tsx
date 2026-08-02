import { useUserActivity } from '#/hooks/activity/useUserActivity'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { AlertMessage } from '#/components/shared/AlertMessage'
import { ActivityCard } from '#/components/activity/ActivityCard'

export const UserActivity = () => {
  const { data: activities, isPending, isError, error } = useUserActivity()

  if (isPending) {
    return (
      <div className="w-full max-w-4xl mx-auto mt-6 px-4">
        <Card>
          <CardContent className="flex h-72 items-center justify-center">
            Loading...
          </CardContent>
        </Card>
      </div>
    )
  }
  if (isError) {
    return (
      <div className="w-full max-w-4xl mx-auto mt-6 px-4">
        <AlertMessage
          variant="destructive"
          title="Error while fetching activities"
          message={error}
        />
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <h1 className="text-4xl font-extrabold text-accent-foreground">
        Activity :
      </h1>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            Your Recent Activity
          </CardTitle>
        </CardHeader>
        <Separator />
        <CardContent>
          {activities.length === 0 ? (
            <div className="flex h-72 flex-col items-center justify-center text-center">
              <p className="text-lg font-medium">No activity yet</p>
            </div>
          ) : (
            <div className="space-y-4">
              {activities.map((activity) => (
                <ActivityCard key={activity.id} activity={activity} />
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
