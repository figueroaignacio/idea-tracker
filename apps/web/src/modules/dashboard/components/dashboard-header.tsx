// Components
import { Plus } from 'lucide-react';
import { LogoutButton } from '../../auth/components/logout-button';

interface DashboardHeaderProps {
  onAddIdea: () => void;
}

export function DashboardHeader({ onAddIdea }: DashboardHeaderProps) {
  return (
    <>
      <header className="border-b border-base-300 bg-base-200/50 backdrop-blur-sm mt-10 md:mt-0">
        <div className="flex items-center justify-between flex-wrap gap-2 p-6">
          <div>
            <h1 className="text-3xl font-bold text-base-content">Idea Tracker</h1>
            <p className="text-base-content/70 mt-1">
              Manage and organize all your ideas in one place.
            </p>
          </div>
          <div className="space-x-4">
            <button onClick={onAddIdea} className="btn btn-primary shadow-none btn-sm">
              <Plus className="w-4 h-4 mr-2" />
              New Idea
            </button>
            <div className="hidden md:inline-block">
              <LogoutButton />
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
