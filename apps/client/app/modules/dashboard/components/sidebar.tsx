// Components
import { Link, useLocation } from "react-router";
import { Logo } from "~/components/logo";
import { buttonVarians } from "~/components/ui/button";
import { Separator } from "~/components/ui/separator";

// Lib
import { sidebarLinks } from "../lib/navigation";

export function Sidebar() {
  const location = useLocation();

  return (
    <aside>
      <div className="border-r border-border min-h-dvh">
        <div className="container">
          <Logo />
        </div>
        <Separator />
        <nav className="container">
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
      </div>
    </aside>
  );
}
