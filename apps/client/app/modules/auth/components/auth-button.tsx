import { ExternalLink, Loader2 } from "lucide-react";

interface AuthButtonProps {
  providerId: string;
  name: string;
  Icon: React.FC;
  url: string;
  loading: boolean;
  activeProvider: string | null;
  onLogin: (providerId: string, url: string) => void;
}

export function AuthButton({
  providerId,
  name,
  Icon,
  url,
  loading,
  activeProvider,
  onLogin,
}: AuthButtonProps) {
  const isLoading = loading && activeProvider === providerId;

  return (
    <button
      className={`relative flex items-center justify-center gap-3 w-full py-3 px-4 rounded-lg border border-border bg-primary hover:bg-gray-750 transition-all ${
        isLoading ? "opacity-80" : "hover:border-cyan-500/50"
      }`}
      onClick={() => onLogin(providerId, url)}
      disabled={loading}
    >
      <div className="absolute left-4 flex items-center justify-center">
        {isLoading ? (
          <Loader2 className="w-5 h-5 animate-spin text-gray-400" />
        ) : (
          <Icon />
        )}
      </div>
      <span>Continue with {name}</span>
      <ExternalLink className="w-4 h-4 text-gray-500 absolute right-4" />
    </button>
  );
}
