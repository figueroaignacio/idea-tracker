// Components
import { RecentIdeas } from './recent-ideas';
import { SidebarHeader } from './sidebar-header';
import { Stats } from './stats';

// Types
import type { Idea } from '../types/idea';

interface SidebarProps {
  ideas: Idea[];
}

export function Sidebar({ ideas }: SidebarProps) {
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
    <aside className="min-h-full bg-base-200 border-r border-base-300 md:flex flex-col hidden">
      <SidebarHeader />
      <div className="flex-1 overflow-auto p-6 space-y-6">
        <Stats
          total={stats.total}
          inProgress={stats.inProgress}
          completed={stats.completed}
          highPriority={stats.highPriority}
        />
        <RecentIdeas ideas={recentIdeas} />
      </div>
    </aside>
  );
}
