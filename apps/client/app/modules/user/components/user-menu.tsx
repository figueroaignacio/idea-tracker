import { EllipsisVertical } from "lucide-react";
import { Button } from "~/components/ui/button";
import { useAuth } from "~/modules/auth/context/auth-context";

export function UserMenu() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="w-full h-20 mt-auto relative">
      <div className="flex justify-between items-center px-5 h-full">
        <img src={user.avatar} className="size-7 rounded-full" />
        <div>
          <p className="font-semibold">{user.name}</p>
          <p className="text-xs">{user.email}</p>
        </div>
        <Button variant="ghost" className="rounded-full" size="sm">
          <EllipsisVertical size={20} />
        </Button>
      </div>
    </div>
  );
}
