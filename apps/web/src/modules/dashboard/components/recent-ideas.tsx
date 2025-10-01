// Components
import { RecentIdeaCard } from './recent-idea-card';

// Types
import type { Idea } from '../types/idea';

interface RecentIdeasProps {
  ideas: Idea[];
}

export function RecentIdeas({ ideas }: RecentIdeasProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium text-base-content/70 uppercase tracking-wider">
        Recent Ideas
      </h3>

      <div className="space-y-3">
        {ideas.map((idea) => (
          <RecentIdeaCard key={idea.id} idea={idea} />
        ))}
      </div>
    </div>
  );
}
