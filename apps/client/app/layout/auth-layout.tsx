import { Link, Outlet } from "react-router";
import { buttonVarians } from "~/components/ui/button";

export default function AuthLayout() {
  return (
    <div className="container">
      <Link to="/" className={buttonVarians({ variant: "ghost" })}>
        👈🏽 Back
      </Link>
      <Outlet />
    </div>
  );
}
