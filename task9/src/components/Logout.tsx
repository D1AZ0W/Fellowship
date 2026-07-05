import { redirect } from "@tanstack/react-router";
import { useAuth } from "#/hooks/useAuth";
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
} from "@/components/ui/alert-dialog";
import { toast } from "react-toastify";

export function Logout() {
  const auth = useAuth();

  const handleLogout = () => {
    auth.logout();
    toast.success("Logged out successfully");
    redirect({ to: "/login" });
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger className="text-primary underline-offset-4 hover:underline text-smx">
        Logout
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure you want to logout?</AlertDialogTitle>
          <AlertDialogDescription>
            You will logout and have to log in before accesing cart and buying.
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
  );
}
