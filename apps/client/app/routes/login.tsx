import {
  AlertCircle,
  ExternalLink,
  Github,
  Loader2,
  LockKeyhole,
  Shield,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { Logo } from "~/components/logo";
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

  const handleGitHubLogin = () => {
    setLoading(true);
    setActiveProvider("github");
    window.location.href = "http://localhost:3000/api/auth/github";
  };

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
              </span>{" "}
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

            <div className="space-y-4">
              <button
                className={`relative flex items-center justify-center gap-3 w-full py-3 px-4 rounded-lg border border-gray-700 bg-gray-800 hover:bg-gray-750 transition-all ${
                  loading && activeProvider === "github"
                    ? "opacity-80"
                    : "hover:border-cyan-500/50"
                }`}
                onClick={handleGitHubLogin}
                disabled={loading}
              >
                <div className="absolute left-4 flex items-center justify-center">
                  {loading && activeProvider === "github" ? (
                    <Loader2 className="w-5 h-5 animate-spin text-gray-400" />
                  ) : (
                    <Github className="w-5 h-5 text-white" />
                  )}
                </div>
                <span
                  className={
                    loading && activeProvider === "github"
                      ? "text-gray-400"
                      : ""
                  }
                >
                  Continue with GitHub
                </span>
                <ExternalLink className="w-4 h-4 text-gray-500 absolute right-4" />
              </button>

              <button
                className="relative flex items-center justify-center gap-3 w-full py-3 px-4 rounded-lg border border-gray-700 bg-gray-800/50 cursor-not-allowed opacity-60"
                disabled
              >
                <div className="absolute left-4 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5 text-white"
                  >
                    <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z" />
                  </svg>
                </div>
                <span>Continue with Google</span>
                <div className="absolute right-4 bg-gray-700 text-gray-300 text-xs px-2 py-0.5 rounded-full">
                  Soon
                </div>
              </button>

              <button
                className="relative flex items-center justify-center gap-3 w-full py-3 px-4 rounded-lg border border-gray-700 bg-gray-800/50 cursor-not-allowed opacity-60"
                disabled
              >
                <div className="absolute left-4 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5 text-white"
                  >
                    <path d="M11.4 24H0V12.6h11.4V24zM24 24H12.6V12.6H24V24zM11.4 11.4H0V0h11.4v11.4zM24 11.4H12.6V0H24v11.4z" />
                  </svg>
                </div>
                <span>Continue with Microsoft</span>
                <div className="absolute right-4 bg-gray-700 text-gray-300 text-xs px-2 py-0.5 rounded-full">
                  Soon
                </div>
              </button>
            </div>

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
