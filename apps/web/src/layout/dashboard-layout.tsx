// Hooks
import { useAuth } from '../modules/auth/hooks/use-auth';

// Components
import { Outlet } from 'react-router';
import { ProtectedRoute } from '../components/protected-route';
import { LogoutButton } from '../modules/auth/components/logout-button';

export function DashboardLayout() {
  const { user } = useAuth();

  return (
    <ProtectedRoute>
      <Outlet />
      <pre>{JSON.stringify(user, null, 2)}</pre>
      <LogoutButton />
    </ProtectedRoute>
  );
}
