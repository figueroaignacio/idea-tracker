import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { PageHeader } from "~/components/page-header";
import { buttonVarians } from "~/components/ui/button";
import { useAuth } from "~/hooks/use-auth";

type Field = {
  id: number;
  name: string;
  type: string;
};

type VaultData = {
  id: number;
  name: string;
  fields: Field[];
  records: any[];
};

export function meta() {
  return [
    { title: "Aegis - Vault" },
    { name: "description", content: "Manage your passwords." },
  ];
}

export default function Vault() {
  const [vaults, setVaults] = useState<VaultData[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchVaults = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/vaults/${user?.id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );
        const data = await response.json();
        setVaults(data);
      } catch (error) {
        console.error("Error al obtener los vaults:", error);
      }
    };

    fetchVaults();
  }, [user]);

  return (
    <>
      <PageHeader title="Password Vault" />
      <section className="page-container">
        <div>
          <Link
            to="/vault/create-vault"
            className={`${buttonVarians({
              variant: "primary",
              size: "md",
            })} space-x-3`}
          >
            <span>Create Vault</span>
            <Plus size={16} />
          </Link>
        </div>

        <div className="mt-8">
          {vaults.map((vault) => (
            <div key={vault.id} className="mb-8">
              <h3 className="text-lg font-semibold mb-4">{vault.name}</h3>
              <div className="overflow-x-auto rounded-lg border border-border dark:border-border shadow-sm">
                <table className="min-w-full divide-y divide-border dark:divide-border">
                  <thead className="bg-card">
                    <tr>
                      <th className="px-6 py-3.5 text-left text-xs font-medium text-muted-foreground dark:text-muted-foreground uppercase tracking-wider">
                        Vault ID
                      </th>
                      {vault.fields.map((field) => (
                        <th
                          key={field.id}
                          className="px-6 py-3.5 text-left text-xs font-medium text-muted-foreground dark:text-muted-foreground uppercase tracking-wider"
                        >
                          {field.name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-background divide-y divide-border dark:divide-border">
                    {vault.records.map((record, index) => (
                      <tr key={index} className="hover:bg-primary">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-foreground dark:text-foreground">
                          {vault.id}
                        </td>
                        {vault.fields.map((field) => (
                          <td
                            key={field.id}
                            className="px-6 py-4 whitespace-nowrap text-sm text-foreground"
                          >
                            {record[field.name] || "N/A"}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
