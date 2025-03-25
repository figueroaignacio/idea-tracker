// Components
import { Shield } from "lucide-react";

export function HeroSection() {
  return (
    <div className="relative overflow-hidden">
      <div className="container px-4 py-24 sm:py-32 relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <div className="mb-6 flex items-center justify-center">
            <div className="relative">
              <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400 opacity-75 blur-sm animate-pulse"></div>
              <Shield className="relative h-16 w-16 text-white" />
            </div>
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-emerald-400">
              AEGIS
            </span>
          </h1>

          <p className="text-xl md:text-2xl font-medium mb-6">
            Password Management System
          </p>

          <div className="h-8 mb-8">
            <p className="text-lg text-cyan-300 font-mono">
              Secure. Reliable. Impenetrable.
              <span className="animate-pulse">|</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
