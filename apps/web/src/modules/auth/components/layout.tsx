import { Outlet } from 'react-router';
import { AuthProvider } from '../providers/auth-provider';

export function Layout() {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  );
}
