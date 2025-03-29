// Hooks
import { useAuth } from "~/hooks/use-auth";

// Components
import { AlertCircleIcon, CheckCircleIcon } from "lucide-react";

export function AuthenticationStatus() {
  const { user } = useAuth();

  return (
    <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
      <div className="flex items-center">
        <span className="text-xs font-medium text-gray-600 dark:text-gray-400 mr-2">
          Authentication Status:
        </span>
        {user ? (
          <div className="flex items-center text-green-600 dark:text-green-400 text-xs">
            <CheckCircleIcon className="h-4 w-4 mr-1" />
            <span>
              Authenticated as{" "}
              <span className="font-semibold">{user.email}</span>
            </span>
          </div>
        ) : (
          <div className="flex items-center text-sm text-red-600 dark:text-red-400">
            <AlertCircleIcon className="h-4 w-4 mr-1" />
            <span>Not authenticated</span>
          </div>
        )}
      </div>
    </div>
  );
}
