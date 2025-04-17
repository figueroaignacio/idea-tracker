// Sections
import { HeroSection } from "~/sections/hero";

// Types
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "N3O Vaults - Secure Password Generator and Manager" },
    {
      name: "description",
      content:
        "N3O Vaults helps you manage and create secure passwords effortlessly.",
    },
  ];
}

export default function Home() {
  return (
    <div className="text-center min-h-[70dvh] flex flex-col justify-center gap-y-3">
      <HeroSection />
    </div>
  );
}
