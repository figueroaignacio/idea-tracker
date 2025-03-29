// Components
import { PageHeader } from "~/components/page-header";
import { CreateVaultForm } from "~/modules/vault/components/create-vault-form";

export default function CreateVault() {
  return (
    <>
      <PageHeader title="Create New Vault" />
      <section className="page-container">
        <CreateVaultForm />
      </section>
    </>
  );
}
