import { Plus } from 'lucide-react';

interface DashboardHeaderProps {
  onAddIdea: () => void;
}

export function DashboardHeader({ onAddIdea }: DashboardHeaderProps) {
  return (
    <header className="border-b border-base-300 bg-base-200/50 backdrop-blur-sm">
      <div className="flex items-center justify-between p-6">
        <div>
          <h1 className="text-3xl font-bold text-base-content">Idea Tracker</h1>
          <p className="text-base-content/70 mt-1">
            Gestiona y organiza todas tus ideas en un solo lugar
          </p>
        </div>
        <button onClick={onAddIdea} className="btn btn-primary gradient-btn text-primary-content">
          <Plus className="w-4 h-4 mr-2" />
          Nueva Idea
        </button>
      </div>
    </header>
  );
}
