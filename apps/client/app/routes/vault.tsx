"use client";

import { Check, Clipboard, Eye, EyeOff } from "lucide-react";
import { useEffect, useState } from "react";
import { API } from "~/lib/api";
import { useAuth } from "~/modules/auth/context/auth-context";

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

  // Alternar visibilidad de la contraseña
  const togglePasswordVisibility = (id: number) => {
    setVisiblePasswords((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Copiar al portapapeles con feedback visual
  const copyToClipboard = (text: string, id: number, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField({ id, field });

    // Reset copied status after 2 seconds
    setTimeout(() => {
      setCopiedField(null);
    }, 2000);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-8 w-64 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
          <div className="h-64 w-full max-w-3xl bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="p-6 max-w-4xl mx-auto text-center">
        <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
          <p className="text-amber-800 dark:text-amber-200">
            No autorizado. Inicia sesión para ver tus contraseñas.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
          Vault de Contraseñas
        </h1>
      </div>

      {error && (
        <div className="mb-6 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <p className="text-red-700 dark:text-red-300">{error}</p>
        </div>
      )}

      {passwords.length === 0 && !error ? (
        <div className="bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-lg p-8 text-center">
          <p className="text-gray-600 dark:text-gray-300">
            No hay contraseñas guardadas.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-800 shadow-sm">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="px-6 py-3.5 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Título
                </th>
                <th className="px-6 py-3.5 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Usuario
                </th>
                <th className="px-6 py-3.5 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Contraseña
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
              {passwords.map((entry, index) => (
                <tr
                  key={entry.id}
                  className={`${
                    index % 2 === 0
                      ? "bg-white dark:bg-gray-900"
                      : "bg-gray-50 dark:bg-gray-800/50"
                  } hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors`}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                    {entry.title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                    <div className="flex items-center space-x-2">
                      <span className="truncate max-w-[150px]">
                        {entry.username}
                      </span>
                      <button
                        onClick={() =>
                          copyToClipboard(entry.username, entry.id, "username")
                        }
                        className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        title="Copiar usuario"
                      >
                        {copiedField?.id === entry.id &&
                        copiedField?.field === "username" ? (
                          <Check className="w-4 h-4 text-green-500" />
                        ) : (
                          <Clipboard className="w-4 h-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200" />
                        )}
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                    <div className="flex items-center space-x-2">
                      <span className="font-mono text-xs">
                        {visiblePasswords[entry.id]
                          ? entry.password
                          : "••••••••"}
                      </span>
                      <div className="flex space-x-1">
                        <button
                          onClick={() => togglePasswordVisibility(entry.id)}
                          className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                          title={
                            visiblePasswords[entry.id]
                              ? "Ocultar contraseña"
                              : "Mostrar contraseña"
                          }
                        >
                          {visiblePasswords[entry.id] ? (
                            <EyeOff className="w-4 h-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200" />
                          ) : (
                            <Eye className="w-4 h-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200" />
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
                            className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                            title="Copiar contraseña"
                          >
                            {copiedField?.id === entry.id &&
                            copiedField?.field === "password" ? (
                              <Check className="w-4 h-4 text-green-500" />
                            ) : (
                              <Clipboard className="w-4 h-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200" />
                            )}
                          </button>
                        )}
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
