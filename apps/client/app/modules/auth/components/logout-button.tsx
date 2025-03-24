import { LogOut } from "lucide-react";
import { Button } from "~/components/ui/button";
import { useAuth } from "../context/auth-context";

export function LogoutButton() {
  const { logout } = useAuth();

  return (
    <Button variant="destructive" className="space-x-3" onClick={logout}>
      <span>Log Out</span>
      <LogOut size={16} />
    </Button>
  );
}
