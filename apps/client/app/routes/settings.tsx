import { useNavigate } from "react-router";
import { PageHeader } from "~/components/page-header";
import { useAuth } from "~/modules/auth/context/auth-context";

export function meta() {
  return [
    { title: "Aegis - Settings" },
    { name: "description", content: "Set your preferences." },
  ];
}

export default function Settings() {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    navigate("/");
  }

  return (
    <>
      <PageHeader title="Settings" />
      <section className="page-container">Settings page</section>
    </>
  );
}
