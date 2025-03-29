import { PageHeader } from "~/components/page-header";

export function meta() {
  return [
    { title: "Aegis - Settings" },
    { name: "description", content: "Set your preferences." },
  ];
}

export default function Settings() {
  return (
    <>
      <PageHeader title="Settings" />
      <section className="page-container">Settings page</section>
    </>
  );
}
