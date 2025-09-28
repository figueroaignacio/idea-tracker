import { Archive, CheckCircle, Lightbulb, MoreHorizontal, Play, Trash2 } from 'lucide-react';
import { type Idea } from './dashboard';

interface IdeaGridProps {
  ideas: Idea[];
  onUpdateIdea: (idea: Idea) => void;
  onDeleteIdea: (ideaId: string) => void;
}

const priorityColors = {
  low: 'badge-neutral',
  medium: 'badge-warning',
  high: 'badge-error',
  urgent: 'badge-error',
};

const statusColors = {
  idea: 'badge-neutral',
  'in-progress': 'badge-warning',
  completed: 'badge-success',
  archived: 'badge-ghost',
};

const statusIcons = {
  idea: Lightbulb,
  'in-progress': Play,
  completed: CheckCircle,
  archived: Archive,
};

export function IdeaGrid({ ideas, onUpdateIdea, onDeleteIdea }: IdeaGridProps) {
  const handleStatusChange = (idea: Idea, newStatus: Idea['status']) => {
    onUpdateIdea({ ...idea, status: newStatus });
  };

  if (ideas.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-base-300 flex items-center justify-center">
            <Lightbulb className="w-8 h-8 text-base-content/50" />
          </div>
          <h3 className="text-lg font-medium text-base-content mb-2">No hay ideas</h3>
          <p className="text-base-content/70">
            Comienza agregando tu primera idea para hacer seguimiento de tus proyectos.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {ideas.map((idea) => {
        const StatusIcon = statusIcons[idea.status];

        return (
          <div
            key={idea.id}
            className="card bg-base-200 border border-base-300 hover:border-base-content/20 transition-all duration-200 shadow-sm"
          >
            <div className="card-body p-6">
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <h3 className="card-title text-base-content text-balance line-clamp-2">
                      {idea.title}
                    </h3>
                    <div className="flex items-center gap-2 mt-2">
                      <div className={`badge ${priorityColors[idea.priority]}`}>
                        {idea.priority}
                      </div>
                      <div className="badge badge-outline text-xs">{idea.category}</div>
                    </div>
                  </div>

                  <div className="dropdown dropdown-end ">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-sm">
                      <MoreHorizontal className="w-4 h-4" />
                    </div>
                    <ul
                      tabIndex={0}
                      className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow border border-base-300"
                    >
                      <li>
                        <button onClick={() => handleStatusChange(idea, 'in-progress')}>
                          <Play className="w-4 h-4" />
                          Marcar en progreso
                        </button>
                      </li>

                      <li>
                        <button onClick={() => handleStatusChange(idea, 'completed')}>
                          <CheckCircle className="w-4 h-4" />
                          Marcar completada
                        </button>
                      </li>
                      <li>
                        <button onClick={() => handleStatusChange(idea, 'archived')}>
                          <Archive className="w-4 h-4" />
                          Archivar
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => onDeleteIdea(String(idea.id))}
                          className="text-error hover:text-error"
                        >
                          <Trash2 className="w-4 h-4" />
                          Eliminar
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-base-content/70 line-clamp-3 text-pretty">
                  {idea.description}
                </p>

                {/* Tags */}
                {idea.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {idea.tags.slice(0, 3).map((tag) => (
                      <div key={tag} className="badge badge-secondary text-xs">
                        {tag}
                      </div>
                    ))}
                    {idea.tags.length > 3 && (
                      <div className="badge badge-secondary text-xs">+{idea.tags.length - 3}</div>
                    )}
                  </div>
                )}

                {/* Footer */}
                <div className="flex items-center justify-between pt-2 border-t border-base-300/50">
                  <div className="flex items-center gap-2">
                    <StatusIcon className="w-4 h-4 text-base-content/50" />
                    <div className={`badge ${statusColors[idea.status]}`}>
                      {idea.status === 'in-progress'
                        ? 'En progreso'
                        : idea.status === 'completed'
                          ? 'Completada'
                          : idea.status === 'archived'
                            ? 'Archivada'
                            : 'Idea'}
                    </div>
                  </div>
                  <span className="text-xs text-base-content/50">
                    {idea.createdAt.toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
