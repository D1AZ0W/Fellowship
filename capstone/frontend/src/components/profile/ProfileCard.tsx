import { useState } from 'react'
import { useProfile } from '#/hooks/profile/useProfile'

import { AlertMessage } from '../shared/AlertMessage'
import { ChangePassword } from './ChangePassword'
import { EditProfile } from './EditProfile'
import { EditPhoto } from './EditPhoto'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Pencil, Mail, AtSign } from 'lucide-react'

export const ProfileCard = () => {
  const { data: user, error, isError } = useProfile()
  const [openPassword, setOpenPassword] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)
  const [openPhoto, setOpenPhoto] = useState(false)

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
    <div className="flex justify-center mt-8 px-4 w-full">
      <Card className="w-full max-w-3xl overflow-hidden p-0 border-none shadow-sm">
        <CardHeader className="bg-primary text-primary-foreground p-6 relative">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Avatar className="h-20 w-20 border-2 border-primary-foreground/30">
                {user.profile_picture && (
                  <AvatarImage
                    src={`${import.meta.env.VITE_BASE_URL}${user.profile_picture}`}
                    alt={user.username}
                    className="object-cover"
                  />
                )}
                <AvatarFallback className="bg-primary-foreground text-2xl ">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <Button
                onClick={() => setOpenPhoto(true)}
                className="absolute bottom-0 right-0 bg-primary-foreground text-primary rounded-full p-1.5 shadow-md hover:bg-primary-foreground/85 transition-colors cursor-pointer"
              >
                <Pencil className="w-3 h-3" />
              </Button>
            </div>
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">
                {user.first_name} {user.last_name}
              </h2>
              <p className="text-primary-foreground/70 text-sm">
                @{user.username}
              </p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-6 space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-1 border-b pb-3">
              <div className="flex items-center text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                <Mail className="w-3.5 h-3.5 mr-1.5" /> Email
              </div>
              <p className="font-medium">{user.email}</p>
            </div>

            <div className="space-y-1 border-b pb-3">
              <div className="flex items-center text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                <AtSign className="w-3.5 h-3.5 mr-1.5" /> Username
              </div>
              <p className="font-medium">{user.username}</p>
            </div>

            <div className="space-y-1 border-b pb-3">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                First Name
              </p>
              <p className="font-medium">{user.first_name}</p>
            </div>

            <div className="space-y-1 border-b pb-3">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                Last Name
              </p>
              <p className="font-medium">{user.last_name}</p>
            </div>
          </div>

          <div className="flex gap-4">
            <Button
              variant="outline"
              className="flex-1 py-6"
              onClick={() => setOpenPassword(true)}
            >
              Change Password
            </Button>
            <Button className="flex-1 py-6" onClick={() => setOpenEdit(true)}>
              Edit Profile
            </Button>
          </div>
        </CardContent>

        <ChangePassword open={openPassword} onOpenChange={setOpenPassword} />
        <EditProfile open={openEdit} onOpenChange={setOpenEdit} user={user} />
        <EditPhoto
          open={openPhoto}
          onOpenChange={setOpenPhoto}
          currentPhoto={user.profile_picture}
          initials={initials}
        />
      </Card>
    </div>
  )
}
