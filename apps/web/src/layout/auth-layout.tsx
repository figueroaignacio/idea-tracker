// Components
import { Outlet } from 'react-router';

export function AuthLayout() {
  return (
    <div className="min-h-[80lvh] flex justify-center items-center">
      <Outlet />
    </div>
  );
}
