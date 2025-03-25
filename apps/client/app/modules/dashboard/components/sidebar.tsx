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
    <aside className="h-screen lg:flex flex-col hidden sticky top-0">
      <div className="border-r border-border flex flex-col flex-1">
        <div className="flex justify-center py-5">
          <Logo2 />
        </div>
        <Separator className="mb-5" />
        <nav className=" flex-1">
          <ul className="space-y-5 px-5">
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
