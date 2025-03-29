// Components
import { Outlet } from "react-router";
import { AuthProvider } from "~/providers/auth-provider";

export default function Layout() {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  );
}
