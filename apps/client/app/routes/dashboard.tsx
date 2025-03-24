// Hooks
import { useAuth } from "~/modules/auth/context/auth-context";

// Types
import type { Route } from "./+types/dashboard";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Aegis - Dashboard" },
    {
      name: "description",
      content: "Your Aegis dashboard",
    },
  ];
}

export default function Dashboard() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Dashboard</h1>
      </div>

      {user && (
        <div className="space-y-3 bg-card p-6 rounded-md border-border border">
          <h2 className="text-3xl font-bold">Welcome {user.name}</h2>
          <p className="text-sm text-foreground">
            You are currently connected with {user.provider} provider
          </p>
        </div>
      )}
    </>
  );
}
