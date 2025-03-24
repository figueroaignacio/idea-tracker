// Hooks
import { useAuth } from "~/modules/auth/context/auth-context";

// Components
import { EllipsisVertical } from "lucide-react";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

export function UserMenu() {
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
    <div className="w-full h-20 mt-auto relative">
      <div className="flex justify-between items-center px-5 h-full">
        <img src={user.avatar} className="size-7 rounded-full" />
        <div>
          <p className="font-semibold">{user.name}</p>
          <p className="text-xs">{user.email}</p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <EllipsisVertical size={20} />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <Button variant="destructive" onClick={logout} className="w-full">
              Log out
            </Button>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
