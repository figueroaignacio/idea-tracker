// Hooks
import { useState } from 'react';

// Components
import { Menu, X } from 'lucide-react';
import { RecentIdeas } from './recent-ideas';
import { SidebarHeader } from './sidebar-header';
import { Stats } from './stats';

// Types
import type { Idea } from '../types/idea';

interface MobileSidebarProps {
  ideas: Idea[];
}

export function MobileSidebar({ ideas }: MobileSidebarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const stats = {
    total: ideas.length,
    inProgress: ideas.filter((idea) => idea.status === 'in-progress').length,
    completed: ideas.filter((idea) => idea.status === 'completed').length,
    archived: ideas.filter((idea) => idea.status === 'archived').length,
    highPriority: ideas.filter((idea) => idea.priority === 'high' || idea.priority === 'urgent')
      .length,
  };

  const recentIdeas = ideas
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    .slice(0, 5);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-4 left-4 btn z-30 md:hidden shadow-lg"
        aria-label="Abrir menú"
      >
        <Menu className="w-5 h-5" />
      </button>
      {isOpen && (
        <div
          className="fixed inset-0 backdrop-blur-lg z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
      <aside
        className={`fixed top-0 left-0 h-full w-80 bg-base-200 border-r border-base-300 z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="pr-5 ">
            <div className="flex items-center justify-between">
              <SidebarHeader />
              <button
                onClick={() => setIsOpen(false)}
                className="btn btn-ghost btn-sm btn-circle"
                aria-label="Cerrar menú"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
          <div className="flex-1 overflow-auto p-6 space-y-6">
            <Stats
              total={stats.total}
              inProgress={stats.inProgress}
              completed={stats.completed}
              highPriority={stats.highPriority}
            />
            <RecentIdeas ideas={recentIdeas} />
          </div>
        </div>
      </aside>
    </>
  );
}
