import { ShieldIcon } from "lucide-react";

export function PasswordGeneratorHeader() {
  return (
    <div className="bg-background p-6">
      <div className="flex items-center justify-center">
        <ShieldIcon className="h-8 w-8 mr-3" />
        <h2 className="text-2xl font-bold">Password Generator</h2>
      </div>
      <p className="text-blue-100 text-center mt-2 text-sm">
        Create a secure password for your accounts
      </p>
    </div>
  );
}
