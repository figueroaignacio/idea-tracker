// Hooks
import { useAuth } from '../modules/auth/hooks/use-auth';

// Utils
import { Navigate } from 'react-router';

// Components
import { LoadingDots } from './loading-dots';

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading)
    return (
      <div className="min-h-dvh  w-full flex justify-center items-center">
        <LoadingDots />
      </div>
    );

  if (!user) return <Navigate to="/login" />;

  return <>{children}</>;
}
