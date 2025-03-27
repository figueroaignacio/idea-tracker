import { PageHeader } from "~/components/page-header";
import { PasswordGenerator } from "~/modules/password/components/password-generator";

export function meta() {
  return [
    { title: "Aegis - Password Generator" },
    { name: "description", content: "Generate strong passwords." },
  ];
}

export default function Generator() {
  return (
    <>
      <PageHeader title="Password Generator" />
      <section className="page-container">
        <PasswordGenerator />
      </section>
    </>
  );
}
