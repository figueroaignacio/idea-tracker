import type { Route } from "./+types/home";

// Sections
import { HeroSection } from "~/sections/hero";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Aegis - Secure Password Generator and Manager" },
    {
      name: "description",
      content:
        "Aegis helps you manage and create secure passwords effortlessly.",
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
