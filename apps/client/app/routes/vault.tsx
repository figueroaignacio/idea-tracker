// Hooks
import { useEffect, useState } from "react";
import { useAuth } from "~/modules/auth/context/auth-context";

// Components
import { Check, Clipboard, Eye, EyeOff, Trash2 } from "lucide-react";
import { PageHeader } from "~/components/page-header";
import { VaultActions } from "~/modules/vault/components/vault-actions";
import { VaultSecurityTips } from "~/modules/vault/components/vault-security-tips";

// Api
import { API } from "~/lib/api";

interface PasswordEntry {
  id: number;
  title: string;
  username: string;
  password: string;
  provider: string;
}

export default function Vault() {
  const { user, loading } = useAuth();
  const [passwords, setPasswords] = useState<PasswordEntry[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [visiblePasswords, setVisiblePasswords] = useState<{
    [key: number]: boolean;
  }>({});
  const [copiedField, setCopiedField] = useState<{
    id: number;
    field: string;
  } | null>(null);

  useEffect(() => {
    if (!user) return;

    async function getPasswords() {
      try {
        const response = await fetch(`${API}/passwords`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (!response.ok) throw new Error("Error al obtener los datos");

        const data = await response.json();
        setPasswords(data);
      } catch (err) {
        setError("No se pudieron cargar las contraseñas");
      }
    }

    getPasswords();
  }, [user]);

  async function deletePassword(id: number) {
    if (
      window.confirm("¿Estás seguro de que deseas eliminar esta contraseña?")
    ) {
      try {
        const response = await fetch(`${API}/passwords/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (!response.ok) throw new Error("Error al eliminar la contraseña");

        setPasswords((prevPasswords) =>
          prevPasswords.filter((password) => password.id !== id)
        );

        setSuccessMessage("Password successfully deleted.");

        setTimeout(() => {
          setSuccessMessage(null);
        }, 3000);
      } catch (error) {
        setError("The password could not be removed.");
      }
    }
  }

  const togglePasswordVisibility = (id: number) => {
    setVisiblePasswords((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const copyToClipboard = (text: string, id: number, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField({ id, field });

    setTimeout(() => {
      setCopiedField(null);
    }, 2000);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-8 w-64 bg-muted-secondary rounded mb-4"></div>
          <div className="h-64 w-full max-w-3xl bg-muted-secondary dark:bg-muted-secondary rounded"></div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="p-6 max-w-4xl mx-auto text-center">
        <div className="bg-secondary dark:bg-secondary border-border border rounded-lg p-4">
          <p className="text-foreground dark:text-foreground">
            Unauthorized. Sign in to see your passwords.{" "}
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <PageHeader title="Password Vault" />
      <div className="max-w-5xl mx-auto page-container">
        {error && (
          <div className="mb-6 bg-destructive/10 dark:bg-destructive/20 border-destructive/20 border rounded-lg p-4">
            <p className="text-destructive dark:text-destructive">{error}</p>
          </div>
        )}

        {successMessage && (
          <div className="mb-6 bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-100 border border-green-400 dark:border-green-500 rounded-lg p-4">
            <p>{successMessage}</p>
          </div>
        )}

        {passwords.length === 0 && !error ? (
          <div className="bg-card dark:bg-card border-border border rounded-lg p-8 text-center">
            <p className="text-muted-foreground dark:text-muted-foreground">
              There are no saved passwords.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-lg border border-border dark:border-border shadow-sm">
            <VaultActions />
            <table className="min-w-full divide-y divide-border dark:divide-border">
              <thead className="bg-card">
                <tr>
                  <th className="px-6 py-3.5 text-left text-xs font-medium text-muted-foreground dark:text-muted-foreground uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-3.5 text-left text-xs font-medium text-muted-foreground dark:text-muted-foreground uppercase tracking-wider">
                    Notes
                  </th>
                  <th className="px-6 py-3.5 text-left text-xs font-medium text-muted-foreground dark:text-muted-foreground uppercase tracking-wider">
                    Password
                  </th>
                  <th className="px-6 py-3.5 text-left text-xs font-medium text-muted-foreground dark:text-muted-foreground uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-background divide-y divide-border dark:divide-border">
                {passwords.map((entry, index) => (
                  <tr key={entry.id} className={`hover:bg-primary`}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-foreground dark:text-foreground">
                      {entry.title}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                      <div className="flex items-center space-x-2">
                        <span className="truncate max-w-[150px]">
                          {entry.username}
                        </span>
                        <button
                          onClick={() =>
                            copyToClipboard(
                              entry.username,
                              entry.id,
                              "username"
                            )
                          }
                          className="p-1 rounded-md hover:bg-muted-secondary transition-colors"
                          title="Copiar usuario"
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
                          {visiblePasswords[entry.id]
                            ? entry.password
                            : "••••••••"}
                        </span>
                        <div className="flex space-x-1">
                          <button
                            onClick={() => togglePasswordVisibility(entry.id)}
                            className="p-1 rounded-md  transition-colors"
                            title={
                              visiblePasswords[entry.id]
                                ? "Ocultar contraseña"
                                : "Mostrar contraseña"
                            }
                          >
                            {visiblePasswords[entry.id] ? (
                              <EyeOff className="w-4 h-4 text-muted-foreground hover:text-foreground dark:text-muted-foreground dark:hover:text-foreground" />
                            ) : (
                              <Eye className="w-4 h-4 text-muted-foreground hover:text-foreground dark:text-muted-foreground dark:hover:text-foreground" />
                            )}
                          </button>
                          {visiblePasswords[entry.id] && (
                            <button
                              onClick={() =>
                                copyToClipboard(
                                  entry.password,
                                  entry.id,
                                  "password"
                                )
                              }
                              className="p-1 rounded-md hover:bg-muted-secondary dark:hover:bg-muted-secondary transition-colors"
                              title="Copiar contraseña"
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
                      <button
                        onClick={() => deletePassword(entry.id)}
                        className=""
                        title="Delete password"
                      >
                        <Trash2 className="w-4 h-4 hover:text-destructive cursor-pointer" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <VaultSecurityTips />
      </div>
    </>
  );
}
