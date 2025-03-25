import { AlertCircleIcon, CheckCircleIcon } from "lucide-react";

interface StatusMessageProps {
  success: boolean;
  error: string;
}

export function StatusMessage({ error, success }: StatusMessageProps) {
  if (success) {
    return (
      <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-300 rounded-lg flex items-center shadow-sm animate-fadeIn">
        <CheckCircleIcon className="h-5 w-5 mr-2 flex-shrink-0" />
        <span>Password saved successfully!</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 rounded-lg flex items-center shadow-sm animate-fadeIn">
        <AlertCircleIcon className="h-5 w-5 mr-2 flex-shrink-0" />
        <span>{error}</span>
      </div>
    );
  }

  return null;
}
