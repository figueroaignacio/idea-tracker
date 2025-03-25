import { Sidebar, X } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router";
import { Logo2 } from "~/components/logo-2";
import { buttonVarians } from "~/components/ui/button";
import { Separator } from "~/components/ui/separator";
import { UserMenu } from "~/modules/user/components/user-menu";
import { sidebarLinks } from "../lib/navigation";

export function MobileSidebar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="block lg:hidden w-full sticky top-0 backdrop-blur-md border-b border-border z-30 py-3 max-w-6xl mx-auto px-3">
      <button
        className="p-2 top-4 left-4 z-50 bg-background rounded-md"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Sidebar size={24} />
      </button>

      <div
        className={`fixed inset-y-0 left-0 w-80 bg-card shadow-md transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 flex flex-col h-dvh`}
      >
        <div className="p-4 flex justify-between items-center">
          <Logo2 />
          <button onClick={() => setIsOpen(!isOpen)}>
            <X size={24} />
          </button>
        </div>
        <Separator />
        <nav className="p-4 flex-1">
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
                onClick={() => setIsOpen(false)}
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
    </header>
  );
}
