import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "~/components/ui/button";
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

interface User {
  id: number;
  name: string;
  email: string;
  avatar: string;
  provider: string;
  providerId: string;
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
    <div className="container">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <Button variant="destructive" onClick={handleLogout}>
          Cerrar sesión
        </Button>
      </div>

      {user && (
        <div className="bg-card shadow rounded-lg p-6">
          <div className="flex items-center space-x-4">
            {user.avatar && (
              <img
                src={user.avatar}
                alt={`${user.name}'s avatar`}
                className="w-16 h-16 rounded-full"
              />
            )}
            <div>
              <h2 className="text-xl font-bold">{user.name}</h2>
              <p className="text-gray-500">{user.email}</p>
              <p className="text-sm text-gray-400">
                Conectado con {user.provider}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
