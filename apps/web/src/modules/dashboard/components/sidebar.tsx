'use client';

import { BarChart3, CheckCircle, Clock, Lightbulb, TrendingUp } from 'lucide-react';
import { type Idea } from './dashboard';

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
    <aside className="w-80 bg-base-200 border-r border-base-300 flex flex-col">
      <div className="p-6 border-b border-base-300">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
            <Lightbulb className="w-5 h-5 text-primary-content" />
          </div>
          <div>
            <h2 className="font-semibold text-base-content">Ideas Dashboard</h2>
            <p className="text-sm text-base-content/70">Resumen general</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-6 space-y-6">
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-base-content/70 uppercase tracking-wider">
            Estadísticas
          </h3>

          <div className="grid grid-cols-2 gap-3">
            <div className="card bg-base-300 border border-base-300">
              <div className="card-body p-4">
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-primary" />
                  <div>
                    <p className="text-2xl font-bold text-base-content">{stats.total}</p>
                    <p className="text-xs text-base-content/70">Total Ideas</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="card bg-base-300 border border-base-300">
              <div className="card-body p-4">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-warning" />
                  <div>
                    <p className="text-2xl font-bold text-base-content">{stats.inProgress}</p>
                    <p className="text-xs text-base-content/70">En Progreso</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="card bg-base-300 border border-base-300">
              <div className="card-body p-4">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-success" />
                  <div>
                    <p className="text-2xl font-bold text-base-content">{stats.completed}</p>
                    <p className="text-xs text-base-content/70">Completadas</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="card bg-base-300 border border-base-300">
              <div className="card-body p-4">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-error" />
                  <div>
                    <p className="text-2xl font-bold text-base-content">{stats.highPriority}</p>
                    <p className="text-xs text-base-content/70">Alta Prioridad</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-medium text-base-content/70 uppercase tracking-wider">
            Ideas Recientes
          </h3>

          <div className="space-y-3">
            {recentIdeas.map((idea) => (
              <div
                key={idea.id}
                className="card bg-base-300 border border-base-300 hover:bg-base-300/80 transition-colors cursor-pointer"
              >
                <div className="card-body p-4">
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-medium text-sm text-base-content line-clamp-2">
                        {idea.title}
                      </h4>
                      <div
                        className={`badge ${
                          idea.priority === 'urgent'
                            ? 'badge-error'
                            : idea.priority === 'high'
                              ? 'badge-warning'
                              : 'badge-neutral'
                        } text-xs shrink-0`}
                      >
                        {idea.priority}
                      </div>
                    </div>
                    <p className="text-xs text-base-content/70 line-clamp-2">{idea.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="badge badge-outline text-xs">{idea.category}</div>
                      <span className="text-xs text-base-content/50">
                        {idea.createdAt.toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
