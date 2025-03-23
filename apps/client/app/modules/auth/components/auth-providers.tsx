// Hooks
import { useState } from "react";
import { useAuth } from "../context/auth-context";

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
    method: "github",
  },
  {
    id: "google",
    name: "Google",
    icon: GoogleIconProvider,
    method: "google",
  },
];

export function AuthProviders() {
  const { loginWithGitHub, loginWithGoogle } = useAuth();
  const [loading, setLoading] = useState(false);
  const [activeProvider, setActiveProvider] = useState<string | null>(null);

  const handleLogin = (method: string) => {
    setLoading(true);
    setActiveProvider(method);

    if (method === "github") loginWithGitHub();
    if (method === "google") loginWithGoogle();

    setTimeout(() => {
      setLoading(false);
      setActiveProvider(null);
    }, 3000);
  };

  return (
    <div className="space-y-4">
      {providersConfig.map(({ id, name, icon: Icon, method }) => (
        <AuthButton
          key={id}
          providerId={id}
          name={name}
          Icon={Icon}
          onLogin={() => handleLogin(method)}
          loading={loading}
          activeProvider={activeProvider}
        />
      ))}

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
