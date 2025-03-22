import { AlertCircle, LockKeyhole, Shield } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { Logo } from "~/components/logo";
import { AuthProviders } from "~/modules/auth/components/auth-providers";
import type { Route } from "./+types/login";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "AEGIS - Secure Login" },
    {
      name: "description",
      content:
        "Access your secure AEGIS password vault with trusted authentication providers.",
    },
  ];
}

export default function Login() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [error, setError] = useState<string | null>(null);
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

  return (
    <div className="min-h-[60dvh] flex flex-col">
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md relative z-10">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <Logo />
            </div>
            <h1 className="text-3xl font-bold mb-2">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-emerald-400">
                AEGIS
              </span>
              Secure Login
            </h1>
            <p className="text-gray-400 max-w-sm mx-auto">
              Access your encrypted password vault with trusted authentication
              providers
            </p>
          </div>

          {error && (
            <div className="mb-6 bg-red-900/30 border border-red-500/50 rounded-lg p-4 flex items-start">
              <AlertCircle className="w-5 h-5 text-red-400 mr-3 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-medium text-red-400">
                  Authentication Error
                </h3>
                <p className="text-sm text-gray-300">{error}</p>
              </div>
            </div>
          )}

          <div className="bg-card backdrop-blur-sm rounded-xl border border-border p-6 shadow-xl">
            <div className="flex items-center justify-center mb-6">
              <div className="w-10 h-10 rounded-full flex items-center justify-center">
                <LockKeyhole className="w-5 h-5 text-cyan-400" />
              </div>
              <div className="h-0.5 w-16 bg-gradient-to-r from-gray-700/0 via-gray-700 to-gray-700/0"></div>
              <div className="w-10 h-10 rounded-full flex items-center justify-center">
                <Shield className="w-5 h-5 text-emerald-400" />
              </div>
            </div>
            <AuthProviders />
            <div className="mt-6 text-center">
              <p className="text-xs text-gray-500">
                By continuing, you agree to our{" "}
                <a
                  href="/terms"
                  className="text-cyan-400 hover:text-cyan-300 hover:underline"
                >
                  Terms of Service
                </a>{" "}
                and{" "}
                <a
                  href="/privacy"
                  className="text-cyan-400 hover:text-cyan-300 hover:underline"
                >
                  Privacy Policy
                </a>
              </p>
            </div>
          </div>

          <div className="mt-8 text-center">
            <div className="inline-flex items-center justify-center p-1 rounded-full bg-gray-800/30 backdrop-blur-sm border border-gray-700/50">
              <div className="flex items-center space-x-1 text-xs px-3 py-1">
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-500"></span>
                <span className="text-gray-400">Secure Authentication</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
