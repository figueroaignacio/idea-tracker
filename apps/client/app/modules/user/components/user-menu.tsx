"use client";

// Hooks
import { useAuth } from "~/modules/auth/context/auth-context";

// Components
import { EllipsisVertical, LogOut } from "lucide-react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~/components/ui/alert-dialog";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { LogoutButton } from "~/modules/auth/components/logout-button";

export function UserMenu() {
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
    <div className="w-full h-20 mt-auto relative">
      <div className="flex justify-between items-center px-5 h-full">
        <img
          src={user.avatar || "/placeholder.svg"}
          className="size-7 rounded-full"
          alt="User avatar"
        />
        <div>
          <p className="font-semibold">{user.name}</p>
          <p className="text-xs">{user.email}</p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <EllipsisVertical size={20} />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" className="space-x-3">
                  <span>Log out</span>
                  <LogOut size={16} />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Confirm Logout</AlertDialogTitle>
                  <AlertDialogDescription>
                    You will be logged out of your account and will need to sign
                    in again to access your data.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <LogoutButton />
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
