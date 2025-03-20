import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "aegis - Secure Password Generator and Manager" },
    {
      name: "description",
      content:
        "Aegis helps you manage and create secure passwords effortlessly.",
    },
  ];
}

export default function Home() {
  return (
    <section className="text-center min-h-[70dvh] flex flex-col justify-center gap-y-3">
      <h1 className="text-2xl font-bold">aegis.</h1>
      <p>Your best companion for managing and generating secure passwords.</p>
    </section>
  );
}
