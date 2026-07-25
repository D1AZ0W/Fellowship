import { useNavigate } from '@tanstack/react-router'
import { useAuth } from '#/hooks/auth/useAuth'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { toast } from 'sonner'
import { LogOut } from 'lucide-react'
import { Button } from '../ui/button'

export function Logout() {
  const auth = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    auth.logout()
    toast.success('Logged out successfully')
    navigate({ to: '/login' })
  }
  return (
    <AlertDialog>
      <AlertDialogTrigger
        className=" p-2 w-full rounded-lg cursor-pointer text-sm flex items-center justify-center gap-2 "
        render={
          <Button variant="destructive">
            <LogOut />
            Logout
          </Button>
        }
      ></AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure you want to logout?</AlertDialogTitle>
          <AlertDialogDescription>
            You will logout of the current logged in account.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction variant="destructive" onClick={handleLogout}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
