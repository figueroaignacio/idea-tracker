import type { Idea } from '../types/idea';

interface RecentIdeaCardProps {
  idea: Idea;
}

export function RecentIdeaCard({ idea }: RecentIdeaCardProps) {
  return (
    <div className="card bg-base-300 border border-base-300 hover:bg-base-300/80 transition-colors cursor-pointer">
      <div className="card-body p-4">
        <div className="space-y-2">
          <div className="flex items-start justify-between gap-2">
            <h4 className="font-medium text-sm text-base-content line-clamp-2">{idea.title}</h4>
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
  );
}
