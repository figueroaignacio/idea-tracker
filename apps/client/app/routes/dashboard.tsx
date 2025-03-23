// Hooks
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

// Components
import { Button } from "~/components/ui/button";

// Types
import { type User } from "~/modules/user/lib/definitions";
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
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/auth/profile", {
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
        } else {
          navigate("/auth/login");
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
        navigate("/auth/login");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:3000/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      navigate("/auth/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

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
        <Button variant="destructive" onClick={handleLogout}>
          Log out
        </Button>
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
