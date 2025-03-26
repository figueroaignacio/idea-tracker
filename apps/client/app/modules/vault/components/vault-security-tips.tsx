import { InfoIcon } from "lucide-react";

export function VaultSecurityTips() {
  return (
    <div className="mt-6 rounded-lg p-4 bg-secondary/30">
      <div className="flex">
        <InfoIcon className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
        <div>
          <h4 className="text-sm font-medium">Security Tips</h4>
          <ul className="mt-1 text-xs space-y-1 list-disc list-inside">
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
