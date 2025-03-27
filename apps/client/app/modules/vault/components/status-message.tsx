import { AlertCircleIcon } from "lucide-react";

interface StatusMessageProps {
  error: string | null;
  successMessage: string | null;
}

export function StatusMessage({ error, successMessage }: StatusMessageProps) {
  if (!error && !successMessage) return null;

  return (
    <>
      {error && (
        <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 rounded-lg flex items-center shadow-sm animate-fadeIn">
          <AlertCircleIcon className="h-5 w-5 mr-2 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {successMessage && (
        <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-300 rounded-lg flex justify-between items-center shadow-sm animate-fadeIn">
          {successMessage}
        </div>
      )}
    </>
  );
}
