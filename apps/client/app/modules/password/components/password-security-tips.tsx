import { InfoIcon } from "lucide-react";

export function PasswordSecurityTips() {
  return (
    <div className="mt-6 rounded-lg p-4 bg-secondary/30">
      <div className="flex">
        <InfoIcon className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
        <div>
          <h4 className="text-sm font-medium ">Security Tips</h4>
          <ul className="mt-1 text-xs space-y-1 list-disc list-inside">
            <li>Use unique passwords for each service</li>
            <li>Combine letters, numbers, and symbols</li>
            <li>Use at least 12 characters in your passwords</li>
            <li>Avoid easily guessable personal information</li>
            <li>Don't reuse passwords across different accounts</li>
            <li>
              Be cautious with public Wi-Fi when entering sensitive information
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
