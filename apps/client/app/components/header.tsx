import { Shield } from "lucide-react";
import { Link } from "react-router";
import { useIsMobile } from "~/hooks/use-mobile";
import { useAuth } from "~/modules/auth/context/auth-context";
import { BackgroundPattern } from "./background-pattern";
import { MobileMenu } from "./mobile-menu";
import { buttonVarians } from "./ui/button";

export function Header() {
  const { user } = useAuth();
  const isMobile = useIsMobile();

  if (isMobile) return <MobileMenu user={user} />;

  return (
    <header className="relative overflow-hidden bg-background border-b border-border">
      <BackgroundPattern />
      <div className="container mx-auto px-4 py-6 relative z-10">
        <nav className="flex justify-between items-center">
          <div className="flex items-center">
            <Shield className="h-8 w-8 text-cyan-400 mr-2" />
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-emerald-400">
              AEGIS
            </span>
          </div>
          <div>
            {user ? (
              <Link
                to="auth/login"
                className={buttonVarians({ variant: "primary" })}
              >
                Go to Dashboard
              </Link>
            ) : (
              <Link
                to="auth/login"
                className={buttonVarians({ variant: "primary" })}
              >
                Get Started
              </Link>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
