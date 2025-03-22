import { Shield } from "lucide-react";
import { Link } from "react-router";

export function Logo() {
  return (
    <Link to="/">
      <div className="relative">
        <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400 opacity-75 blur-sm animate-pulse"></div>
        <div className="relative bg-gray-900 rounded-full p-3 justify-center flex items-center">
          <Shield className="h-10 w-10 text-cyan-400" />
        </div>
      </div>
    </Link>
  );
}
