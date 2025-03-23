// Components
import { Outlet } from "react-router";
import { AuthProvider } from "~/modules/auth/context/auth-context";

export default function Layout() {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  );
}
