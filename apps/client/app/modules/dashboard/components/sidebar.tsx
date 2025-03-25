// Components
import { Link, useLocation } from "react-router";
import { Separator } from "~/components/ui/separator";
import { UserMenu } from "~/modules/user/components/user-menu";

// Lib
import { Logo2 } from "~/components/logo-2";
import { buttonVarians } from "~/components/ui/button";
import { sidebarLinks } from "../lib/navigation";

export function Sidebar() {
  const location = useLocation();

  return (
    <aside className="h-dvh lg:flex flex-col hidden">
      <div className="border-r border-border flex flex-col flex-1">
        <div className="container flex justify-center">
          <Logo2 />
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
