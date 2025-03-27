"use client";

// Hooks
import { useEffect, useState } from "react";
import { useAuth } from "~/modules/auth/context/auth-context";

// Components
import { PageHeader } from "~/components/page-header";
import { EmptyState } from "~/modules/vault/components/empty-state";
import { LoadingState } from "~/modules/vault/components/loading-state";
import { StatusMessage } from "~/modules/vault/components/status-message";
import { UnauthorizedState } from "~/modules/vault/components/unauthorized-state";
import { VaultSecurityTips } from "~/modules/vault/components/vault-security-tips";
import { VaultTable } from "~/modules/vault/components/vault-table";

// Types
import { type PasswordEntry } from "~/modules/vault/lib/definitions";

// Api
import { API } from "~/lib/api";

export function meta() {
  return [
    { title: "Aegis - Vault" },
    { name: "description", content: "Manage your passwords." },
  ];
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
    return <LoadingState />;
  }

  if (!user) {
    return <UnauthorizedState />;
  }

  return (
    <>
      <PageHeader title="Password Vault" />
      <div className="max-w-5xl mx-auto page-container">
        <StatusMessage error={error} successMessage={successMessage} />

        {passwords.length === 0 && !error ? (
          <EmptyState />
        ) : (
          <VaultTable
            passwords={passwords}
            visiblePasswords={visiblePasswords}
            copiedField={copiedField}
            onToggleVisibility={togglePasswordVisibility}
            onCopyToClipboard={copyToClipboard}
            onDeletePassword={deletePassword}
          />
        )}
        <VaultSecurityTips />
      </div>
    </>
  );
}
