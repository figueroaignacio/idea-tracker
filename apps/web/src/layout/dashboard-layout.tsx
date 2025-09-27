// Components
import { Outlet } from 'react-router';
import { ProtectedRoute } from '../components/protected-route';

export function DashboardLayout() {
  return (
    <ProtectedRoute>
      <Outlet />
    </ProtectedRoute>
  );
}
