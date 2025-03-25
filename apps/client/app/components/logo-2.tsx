import { Shield } from "lucide-react";

export function Logo2() {
  return (
    <div className="flex items-center">
      <Shield className="h-8 w-8 text-cyan-400 mr-2" />
      <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-emerald-400">
        AEGIS
      </span>
    </div>
  );
}
