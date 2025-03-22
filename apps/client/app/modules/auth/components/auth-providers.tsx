// Hooks
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

// Components
import { Button } from "~/components/ui/button";
import { AuthButton } from "./auth-button";
import {
  GithubIconProvider,
  GoogleIconProvider,
  MicrosoftIconProvider,
} from "./auth-icons-providers";

const providersConfig = [
  {
    id: "github",
    name: "GitHub",
    icon: GithubIconProvider,
    url: "http://localhost:3000/api/auth/github",
  },
  {
    id: "google",
    name: "Google",
    icon: GoogleIconProvider,
    url: "http://localhost:3000/api/auth/google",
  },
];

export function AuthProviders() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [activeProvider, setActiveProvider] = useState<string | null>(null);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/auth/profile", {
          credentials: "include",
        });

        if (response.ok) {
          navigate("/dashboard");
        }
      } catch (error) {
        console.error("Error checking authentication status:", error);
      }
    };

    checkAuthStatus();
  }, [navigate]);

  const handleLogin = (providerId: string, url: string) => {
    setLoading(true);
    setActiveProvider(providerId);
    window.location.href = url;
  };

  return (
    <div className="space-y-4">
      {providersConfig.map(({ id, name, icon: Icon, url }) => (
        <AuthButton
          key={id}
          providerId={id}
          name={name}
          Icon={Icon}
          url={url}
          loading={loading}
          activeProvider={activeProvider}
          onLogin={handleLogin}
        />
      ))}

      {/* Microsoft (Deshabilitado) */}
      <Button
        className="relative flex items-center justify-center gap-3 w-full py-3 px-4 rounded-lg border border-gray-700 bg-gray-800/50 cursor-not-allowed opacity-60"
        disabled
      >
        <div className="absolute left-4 flex items-center justify-center">
          <MicrosoftIconProvider />
        </div>
        <span>Continue with Microsoft</span>
        <div className="absolute right-4 bg-gray-700 text-gray-300 text-xs px-2 py-0.5 rounded-full">
          Soon
        </div>
      </Button>
    </div>
  );
}
