import { useProfile } from '#/hooks/profileHook/useProfile'

import { AlertMessage } from '../sharedComponents/AlertMessage'

import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { useState } from 'react'
import { ChangePassword } from './ChangePassword'

export const ProfileCard = () => {
  const { data: user, error, isError } = useProfile()
  const [open, setOpen] = useState(false)

  if (isError || !user) {
    return (
      <AlertMessage
        title="Error while loading profile"
        message={error?.message || 'Unable to load profile.'}
        variant="destructive"
      />
    )
  }

  const initials = `${user.first_name[0]}${user.last_name[0]}`

  return (
    <div className="mx-10 mt-8 px-5">
      <Card className=" max-w-screen w-full">
        <CardHeader className="items-center text-center">
          <Avatar className="h-24 w-24">
            {user.profile_picture != null && (
              <AvatarImage src={user.profile_picture} />
            )}
            {user.profile_picture == null && (
              <AvatarImage className="text-2xl">{initials}</AvatarImage>
            )}
          </Avatar>

          <CardTitle className="mt-4">
            {user.first_name} {user.last_name}
          </CardTitle>

          <CardDescription>@{user.username}</CardDescription>
        </CardHeader>

        <Separator />

        <CardContent className="space-y-4 pt-6">
          <div className="text-sm">
            <p className=" text-muted-foreground">Email</p>
            <p>{user.email}</p>
          </div>

          <div className="text-sm">
            <p className="text-muted-foreground">Username</p>
            <p>{user.username}</p>
          </div>

          <div className="text-sm">
            <p className="text-sm text-muted-foreground">First Name</p>
            <p>{user.first_name}</p>
          </div>

          <div className="text-sm">
            <p className="text-sm text-muted-foreground">Last Name</p>
            <p>{user.last_name}</p>
          </div>
        </CardContent>
        <Button variant={'outline'} onClick={() => setOpen(true)}>
          Change Password
        </Button>
        <ChangePassword open={open} onOpenChange={setOpen} />
      </Card>
    </div>
  )
}
