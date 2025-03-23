// Hooks
import { useAuth } from "~/modules/auth/context/auth-context";

// Components
import { Link, useLocation } from "react-router";
import { Logo } from "~/components/logo";
import { Separator } from "~/components/ui/separator";
import { UserMenu } from "~/modules/user/components/user-menu";

// Lib
import { buttonVarians } from "~/components/ui/button";
import { sidebarLinks } from "../lib/navigation";

export function Sidebar() {
  const location = useLocation();
  const { user } = useAuth();

  return (
    <aside className="h-dvh flex flex-col">
      <div className="border-r border-border flex flex-col flex-1">
        <div className="container">
          <Logo />
        </div>
        <Separator />
        <nav className="container flex-1">
          <ul className="space-y-5">
            {sidebarLinks.map((item, index) => (
              <Link
                key={index}
                to={item.to}
                className={`${buttonVarians({
                  variant: "ghost",
                })} w-full justify-start space-x-4 ${
                  location.pathname === item.to ? "bg-primary" : ""
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            ))}
          </ul>
        </nav>
        <Separator />
        <UserMenu />
      </div>
    </aside>
  );
}
