// Components
import { Navigate } from "react-router";
import { useAuth } from "~/modules/auth/context/auth-context";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/unauthorized-access" replace />;
  }

  return <>{children}</>;
}
