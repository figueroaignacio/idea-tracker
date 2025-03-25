import { PageHeader } from "~/components/page-header";
import { PasswordGenerator } from "~/modules/password/components/password-generator";

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
