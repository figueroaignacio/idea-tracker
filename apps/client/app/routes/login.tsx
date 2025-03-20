import type { Route } from "./+types/login";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Start your experience with aegis" },
    {
      name: "description",
      content: "Login to aegis.",
    },
  ];
}

export default function Login() {
  return (
    <section className="text-center min-h-[70dvh] flex flex-col justify-center gap-y-3">
      <h1 className="text-2xl font-bold">Login</h1>
      <p></p>
    </section>
  );
}
