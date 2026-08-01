import { useState } from 'react'
import { useEditPhoto } from '#/hooks/profile/useEditPhoto'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentPhoto: string | null
  initials: string
}

export const EditPhoto = ({
  open,
  onOpenChange,
  currentPhoto,
  initials,
}: Props) => {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const editPhotoMutation = useEditPhoto()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0]
    if (selected) {
      setFile(selected)
      setPreview(URL.createObjectURL(selected))
    }
  }

  const handleSave = () => {
    if (!file) return
    editPhotoMutation.mutate(file, {
      onSuccess: () => {
        setFile(null)
        setPreview(null)
        onOpenChange(false)
      },
    })
  }

  const displayPhoto =
    preview ||
    (currentPhoto
      ? `${import.meta.env.VITE_BASE_URL}${currentPhoto}`
      : null)

  return (
    <Dialog
      open={open}
      onOpenChange={(val) => {
        if (!val) {
          setFile(null)
          setPreview(null)
        }
        onOpenChange(val)
      }}
    >
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>Change Profile Photo</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col items-center gap-4 py-4">
          <Avatar className="h-32 w-32 border">
            {displayPhoto && (
              <AvatarImage
                src={displayPhoto}
                alt="Profile"
                className="object-cover"
              />
            )}
            <AvatarFallback className="text-3xl">{initials}</AvatarFallback>
          </Avatar>

          <div className="w-full space-y-2">
            <Label>Upload New Photo</Label>
            <Input type="file" accept="image/*" onChange={handleFileChange} />
          </div>
        </div>

        <DialogFooter>
          <Button
            onClick={handleSave}
            disabled={!file || editPhotoMutation.isPending}
            className="w-full"
          >
            {editPhotoMutation.isPending ? 'Saving...' : 'Save Photo'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
