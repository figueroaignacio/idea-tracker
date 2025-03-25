import { InfoIcon } from "lucide-react";

export function VaultSecurityTips() {
  return (
    <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-100 dark:border-blue-800">
      <div className="flex">
        <InfoIcon className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5" />
        <div>
          <h4 className="text-sm font-medium text-blue-800 dark:text-blue-300">
            Security Tips
          </h4>
          <ul className="mt-1 text-xs text-blue-700 dark:text-blue-400 space-y-1 list-disc list-inside">
            <li>
              Avoid using passwords with common words or easily guessable
              sequences.
            </li>
            <li>
              Create long passwords (at least 12 characters) with a mix of
              random characters.
            </li>
            <li>
              Use two-factor authentication (2FA) to protect your most important
              accounts.
            </li>
            <li>Review your account privacy settings for added security.</li>
            <li>
              Use a password manager to generate and store secure passwords.
            </li>
            <li>
              Avoid sharing your passwords or storing them in insecure places.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
