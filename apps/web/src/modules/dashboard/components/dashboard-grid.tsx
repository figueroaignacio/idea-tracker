// Components
import { EmptyState } from './empty-state';
import { IdeaCard } from './idea-card';

// Types
import type { Idea } from '../types/idea';

interface IdeaGridProps {
  ideas: Idea[];
  onUpdateIdea: (idea: Idea) => void;
  onDeleteIdea: (ideaId: number) => void;
}

export function IdeaGrid({ ideas, onUpdateIdea, onDeleteIdea }: IdeaGridProps) {
  if (ideas.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {ideas.map((idea) => (
        <IdeaCard
          key={idea.id}
          idea={idea}
          onUpdateIdea={onUpdateIdea}
          onDeleteIdea={onDeleteIdea}
        />
      ))}
    </div>
  );
}
