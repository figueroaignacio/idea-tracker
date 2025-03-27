// Components
import { Check, Clipboard, Eye, EyeOff, Trash2 } from "lucide-react";

// Definitions
import { type PasswordEntry } from "~/modules/vault/lib/definitions";

interface PasswordTableRowProps {
  entry: PasswordEntry;
  isVisible: boolean;
  copiedField: { id: number; field: string } | null;
  onToggleVisibility: (id: number) => void;
  onCopyToClipboard: (text: string, id: number, field: string) => void;
  onDeletePassword: (id: number) => void;
}

export function VaultTableRow({
  entry,
  isVisible,
  copiedField,
  onToggleVisibility,
  onCopyToClipboard,
  onDeletePassword,
}: PasswordTableRowProps) {
  return (
    <tr className={`hover:bg-primary`}>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-foreground dark:text-foreground">
        {entry.platform}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
        <div className="flex items-center space-x-2">
          <span className="truncate max-w-[150px]">{entry.website}</span>
          <button
            onClick={() =>
              onCopyToClipboard(entry.website, entry.id, "website")
            }
            className="p-1 rounded-md hover:bg-muted-secondary transition-colors"
            title="Copy website"
          >
            {copiedField?.id === entry.id &&
            copiedField?.field === "website" ? (
              <Check className="w-4 h-4 text-primary" />
            ) : (
              <Clipboard className="w-4 h-4 text-muted-foreground hover:text-foreground dark:text-muted-foreground" />
            )}
          </button>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
        <div className="flex items-center space-x-2">
          <span className="truncate max-w-[150px]">{entry.username}</span>
          <button
            onClick={() =>
              onCopyToClipboard(entry.username, entry.id, "username")
            }
            className="p-1 rounded-md hover:bg-muted-secondary transition-colors"
            title="Copy username"
          >
            {copiedField?.id === entry.id &&
            copiedField?.field === "username" ? (
              <Check className="w-4 h-4 text-primary" />
            ) : (
              <Clipboard className="w-4 h-4 text-muted-foreground hover:text-foreground dark:text-muted-foreground" />
            )}
          </button>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
        <div className="flex items-center space-x-2">
          <span className="font-mono text-xs">
            {isVisible ? entry.password : "••••••••"}
          </span>
          <div className="flex space-x-1">
            <button
              onClick={() => onToggleVisibility(entry.id)}
              className="p-1 rounded-md transition-colors"
              title={isVisible ? "Ocultar contraseña" : "Mostrar contraseña"}
            >
              {isVisible ? (
                <EyeOff className="w-4 h-4 text-muted-foreground hover:text-foreground dark:text-muted-foreground dark:hover:text-foreground" />
              ) : (
                <Eye className="w-4 h-4 text-muted-foreground hover:text-foreground dark:text-muted-foreground dark:hover:text-foreground" />
              )}
            </button>
            {isVisible && (
              <button
                onClick={() =>
                  onCopyToClipboard(entry.password, entry.id, "password")
                }
                className="p-1 rounded-md hover:bg-muted-secondary dark:hover:bg-muted-secondary transition-colors"
                title="Copy password"
              >
                {copiedField?.id === entry.id &&
                copiedField?.field === "password" ? (
                  <Check className="w-4 h-4 text-primary" />
                ) : (
                  <Clipboard className="w-4 h-4 text-muted-foreground hover:text-foreground dark:text-muted-foreground dark:hover:text-foreground" />
                )}
              </button>
            )}
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
        {entry.notes}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
        <button
          onClick={() => onDeletePassword(entry.id)}
          className="p-1 rounded-md text-destructive hover:bg-destructive/10 transition-colors"
          title="Delete password"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </td>
    </tr>
  );
}
