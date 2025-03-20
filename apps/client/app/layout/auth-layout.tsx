import { Outlet } from "react-router";
import { BackButton } from "~/components/back-button";

export default function AuthLayout() {
  return (
    <div className="container">
      <BackButton />
      <Outlet />
    </div>
  );
}
