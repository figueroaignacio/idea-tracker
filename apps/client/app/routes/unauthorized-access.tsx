// Hooks
import { useAuth } from "~/modules/auth/context/auth-context";

// Components
import { ExternalLink } from "lucide-react";
import { Link, Navigate } from "react-router";
import { Sidebar } from "~/modules/dashboard/components/sidebar";

// Utils
import { buttonVarians } from "~/components/ui/button";

export default function UnauthorizedAccess() {
  const { user } = useAuth();

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="w-full h-full">
      <div className="grid grid-cols-1 lg:grid-cols-6 pointer-events-none">
        <div className="hidden lg:block lg:col-span-1">
          <Sidebar />
        </div>
        <div className="lg:col-span-5 container">
          <div className="space-y-3 bg-card p-6 rounded-md border-border border">
            <h2 className="text-3xl font-bold">Welcome hacker 👾</h2>
            <p className="text-sm text-foreground">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Error,
              odio.
            </p>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 flex items-center justify-center backdrop-blur-sm">
        <div className="bg-card p-6 rounded-md border border-border text-center space-y-4 max-w-sm">
          <h1 className="font-bold text-2xl text-destructive">
            Access Restricted
          </h1>
          <p className="text-sm text-foreground">
            You need to log in to continue using AEDIS as your password manager.
          </p>
          <Link
            to="/auth/login"
            className={`${buttonVarians({ variant: "primary" })} space-x-2`}
          >
            <span>Login</span>
            <ExternalLink size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}
