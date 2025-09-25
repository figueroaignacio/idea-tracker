// Hooks
import { useAuth } from '../modules/auth/hooks/use-auth';

// Components
import { Outlet } from 'react-router';
import { LogoutButton } from '../modules/auth/components/logout-button';

export function DashboardLayout() {
  const { user } = useAuth();
  return (
    <div>
      <Outlet />
      <p>Welcome, {user?.firstName}</p>
      <LogoutButton />
    </div>
  );
}
