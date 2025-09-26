// Components
import { Outlet } from 'react-router';

import { AuthProvider } from '../modules/auth/providers/auth-provider';

export function AuthLayout() {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  );
}
