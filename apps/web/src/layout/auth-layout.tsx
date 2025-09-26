// Components
import { Outlet } from 'react-router';

import { AuthProvider } from '../modules/auth/providers/auth-provider';

export function AuthLayout() {
  return (
    <AuthProvider>
      <div className="min-h-[80lvh] flex justify-center items-center">
        <Outlet />
      </div>
    </AuthProvider>
  );
}
