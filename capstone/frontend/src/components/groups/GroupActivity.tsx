import { useGroupActivity } from '#/hooks/activity/useGroupActivity'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { AlertMessage } from '../shared/AlertMessage'
import { ActivityCard } from '../activity/ActivityCard'

type Props = {
    groupId: number
}

export const GroupActivity = ({ groupId }: Props) => {
    const { data: activities, isPending, isError, error } = useGroupActivity(groupId)

    if (isPending) {
        return (
            <Card className="lg:col-span-2">
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
                title="Error while fetching activities"
                message={error}
            />
        )
    }

    return (
        <Card className="lg:col-span-2">
            <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <Separator />
            <CardContent className="max-h-96 overflow-y-auto p-4">
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
    )
}
