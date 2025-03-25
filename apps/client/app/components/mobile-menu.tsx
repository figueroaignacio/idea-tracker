import { Menu, Shield, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import { BackgroundPattern } from "./background-pattern";
import { buttonVarians } from "./ui/button";

interface MobileMenuProps {
  user: { name: string; email: string } | null;
}

export function MobileMenu({ user }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="relative overflow-hidden bg-background border-b border-border z-30">
      <BackgroundPattern />
      <div className="container mx-auto px-4 py-6 relative z-10">
        <nav className="flex justify-between items-center">
          <div className="flex items-center">
            <Shield className="h-8 w-8 text-cyan-400 mr-2" />
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-emerald-400">
              AEGIS
            </span>
          </div>
          <button
            className="text-white focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </nav>
        {isOpen && (
          <div>
            <div
              className="fixed inset-0 backdrop-blur-sm bg-opacity-50 z-40"
              onClick={() => setIsOpen(false)}
            ></div>
            <div className="fixed top-0 right-0 h-full w-64 bg-card shadow-lg transform transition-transform translate-x-0 z-50 border-l border-border">
              <div className="p-4 flex justify-between items-center">
                <span className="text-white text-xl font-bold">Menu</span>
                <button onClick={() => setIsOpen(false)} className="text-white">
                  <X className="h-6 w-6" />
                </button>
              </div>
              <div className="p-4">
                <Link
                  to="auth/login"
                  className={buttonVarians({
                    variant: "primary",
                    className: "block w-full text-center",
                  })}
                >
                  {user ? "Go to Dashboard" : "Get Started"}
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
