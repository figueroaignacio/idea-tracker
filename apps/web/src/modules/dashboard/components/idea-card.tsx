// Components
import { Archive, CheckCircle, MoreHorizontal, Play, Trash2 } from 'lucide-react';

// Lib
import { PRIORITY_COLORS, STATUS_COLORS, STATUS_ICONS } from '../lib/constants';

// Types
import type { Idea } from '../types/idea';

interface IdeaCardProps {
  idea: Idea;
  onUpdateIdea: (idea: Idea) => void;
  onDeleteIdea: (ideaId: number) => void;
}

export function IdeaCard({ idea, onUpdateIdea, onDeleteIdea }: IdeaCardProps) {
  const handleStatusChange = (newStatus: Idea['status']) => {
    onUpdateIdea({ ...idea, status: newStatus });
  };

  return (
    <div className="card bg-base-200 border border-base-300 hover:border-base-content/20 transition-all duration-200 shadow-sm">
      <div className="card-body p-6">
        <div className="space-y-4">
          <CardHeader idea={idea} onStatusChange={handleStatusChange} onDeleteIdea={onDeleteIdea} />
          <CardDescription description={idea.description} />
          <CardTags tags={idea.tags} />
          <CardFooter idea={idea} />
        </div>
      </div>
    </div>
  );
}

function CardHeader({
  idea,
  onStatusChange,
  onDeleteIdea,
}: {
  idea: Idea;
  onStatusChange: (status: Idea['status']) => void;
  onDeleteIdea: (ideaId: number) => void;
}) {
  return (
    <div className="flex items-start justify-between gap-3">
      <div className="flex-1 min-w-0">
        <h3 className="card-title text-base-content text-balance line-clamp-2">{idea.title}</h3>
        <div className="flex items-center gap-2 mt-2">
          <div className={`badge ${PRIORITY_COLORS[idea.priority]}`}>{idea.priority}</div>
          <div className="badge badge-outline text-xs">{idea.category}</div>
        </div>
      </div>
      <CardMenu onStatusChange={onStatusChange} onDelete={() => onDeleteIdea(idea.id)} />
    </div>
  );
}

function CardMenu({
  onStatusChange,
  onDelete,
}: {
  onStatusChange: (status: Idea['status']) => void;
  onDelete: () => void;
}) {
  const menuItems = [
    {
      label: 'Mark as In Progress',
      icon: Play,
      onClick: () => onStatusChange('in-progress'),
    },
    {
      label: 'Mark as Completed',
      icon: CheckCircle,
      onClick: () => onStatusChange('completed'),
    },
    {
      label: 'Archive',
      icon: Archive,
      onClick: () => onStatusChange('archived'),
    },
    {
      label: 'Delete',
      icon: Trash2,
      onClick: onDelete,
      className: 'text-error hover:text-error',
    },
  ];

  return (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-sm">
        <MoreHorizontal className="w-4 h-4" />
      </div>
      <ul className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow border border-base-300">
        {menuItems.map(({ label, icon: Icon, onClick, className }, index) => (
          <li key={index}>
            <button onClick={onClick} className={className}>
              <Icon className="w-4 h-4" />
              {label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function CardDescription({ description }: { description: string }) {
  return <p className="text-sm text-base-content/70 text-pretty">{description}</p>;
}

function CardTags({ tags }: { tags: string[] }) {
  if (tags.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-1">
      {tags.slice(0, 3).map((tag) => (
        <div key={tag} className="badge badge-secondary text-xs">
          {tag}
        </div>
      ))}
      {tags.length > 3 && <div className="badge badge-secondary text-xs">+{tags.length - 3}</div>}
    </div>
  );
}

function CardFooter({ idea }: { idea: Idea }) {
  const StatusIcon = STATUS_ICONS[idea.status];
  const statusText = {
    'in-progress': 'In progress',
    completed: 'Completed',
    archived: 'Archived',
    idea: 'Idea',
  }[idea.status];

  return (
    <div className="flex items-center justify-between pt-2 border-t border-base-300/50">
      <div className="flex items-center gap-2">
        <StatusIcon className="w-4 h-4 text-base-content/50" />
        <div className={`badge ${STATUS_COLORS[idea.status]}`}>{statusText}</div>
      </div>
      <span className="text-xs text-base-content/50">{idea.createdAt.toLocaleDateString()}</span>
    </div>
  );
}
