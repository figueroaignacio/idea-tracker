// Hooks
import { useEffect, useState } from 'react';
import { useAuth } from '../modules/auth/hooks/use-auth';

// Components
import { Outlet } from 'react-router';
import { ProtectedRoute } from '../components/protected-route';
import { config } from '../config/config';
import { MobileSidebar } from '../modules/dashboard/components/mobile-sidebar';
import { Sidebar } from '../modules/dashboard/components/sidebar';

// Types
import type { Idea } from '../modules/dashboard/types/idea';

export function DashboardLayout() {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const { user, loading: authLoading } = useAuth();

  const fetchIdeas = async () => {
    const res = await fetch(`${config.apiUrl}/api/ideas`, {
      credentials: 'include',
    });
    if (!res.ok) throw new Error('No se pudieron cargar las ideas');
    const data: Idea[] = await res.json();
    setIdeas(data.map((idea) => ({ ...idea, createdAt: new Date(idea.createdAt) })));
  };

  useEffect(() => {
    if (!authLoading && user) {
      fetchIdeas();
    }
  }, [authLoading, user]);

  return (
    <ProtectedRoute>
      <div className="grid grid-cols-6 bg-base-100">
        <MobileSidebar ideas={ideas} />
        <div className="col-span-0 md:col-span-2">
          <Sidebar ideas={ideas} />
        </div>
        <div className="col-span-6 md:col-span-4 flex flex-col overflow-hidden">
          <Outlet />
        </div>
      </div>
    </ProtectedRoute>
  );
}
