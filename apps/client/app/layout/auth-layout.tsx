// Components
import { ArrowLeft } from "lucide-react";
import { Link, Outlet } from "react-router";

// Utils
import { buttonVarians } from "~/components/ui/button";

export default function AuthLayout() {
  return (
    <div className="container">
      <Link
        to="/"
        className={`${buttonVarians({ variant: "ghost" })} space-x-3`}
      >
        <ArrowLeft size={16} />
        <span>Back</span>
      </Link>
      <Outlet />
    </div>
  );
}
