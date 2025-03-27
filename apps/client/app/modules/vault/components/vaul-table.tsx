// Components
import { VaultActions } from "./vault-actions";
import { VaultTableRow } from "./vault-table-row";

// Definitions
import { type PasswordEntry } from "~/modules/vault/lib/definitions";

interface PasswordTableProps {
  passwords: PasswordEntry[];
  visiblePasswords: { [key: number]: boolean };
  copiedField: { id: number; field: string } | null;
  onToggleVisibility: (id: number) => void;
  onCopyToClipboard: (text: string, id: number, field: string) => void;
  onDeletePassword: (id: number) => void;
}

export function VaultTable({
  passwords,
  visiblePasswords,
  copiedField,
  onToggleVisibility,
  onCopyToClipboard,
  onDeletePassword,
}: PasswordTableProps) {
  return (
    <div className="overflow-x-auto rounded-lg border border-border dark:border-border shadow-sm">
      <VaultActions />
      <table className="min-w-full divide-y divide-border dark:divide-border">
        <thead className="bg-card">
          <tr>
            <th className="px-6 py-3.5 text-left text-xs font-medium text-muted-foreground dark:text-muted-foreground uppercase tracking-wider">
              Platform
            </th>
            <th className="px-6 py-3.5 text-left text-xs font-medium text-muted-foreground dark:text-muted-foreground uppercase tracking-wider">
              Website
            </th>
            <th className="px-6 py-3.5 text-left text-xs font-medium text-muted-foreground dark:text-muted-foreground uppercase tracking-wider">
              Username
            </th>
            <th className="px-6 py-3.5 text-left text-xs font-medium text-muted-foreground dark:text-muted-foreground uppercase tracking-wider">
              Password
            </th>
            <th className="px-6 py-3.5 text-left text-xs font-medium text-muted-foreground dark:text-muted-foreground uppercase tracking-wider">
              Note
            </th>
            <th className="px-6 py-3.5 text-left text-xs font-medium text-muted-foreground dark:text-muted-foreground uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-background divide-y divide-border dark:divide-border">
          {passwords.map((entry) => (
            <VaultTableRow
              key={entry.id}
              entry={entry}
              isVisible={visiblePasswords[entry.id] || false}
              copiedField={copiedField}
              onToggleVisibility={onToggleVisibility}
              onCopyToClipboard={onCopyToClipboard}
              onDeletePassword={onDeletePassword}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
