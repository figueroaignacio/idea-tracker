// Hooks
import { useEffect, useState } from 'react';
import { config } from '../../../config/config';
import { useAuth } from '../../auth/hooks/use-auth';

// Components
import { AddIdeaDialog } from './add-idea-dialog';
import { DashboardFilters } from './dashboard-filters';
import { IdeaGrid } from './dashboard-grid';
import { DashboardHeader } from './dashboard-header';

// Types
import type { Idea } from '../types/idea';

export function Dashboard() {
  const { user, loading: authLoading } = useAuth();
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedPriority, setSelectedPriority] = useState<string>('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchIdeas = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${config.apiUrl}/api/ideas`, {
        credentials: 'include',
      });
      if (!res.ok) throw new Error('No se pudieron cargar las ideas');
      const data: Idea[] = await res.json();
      setIdeas(data.map((idea) => ({ ...idea, createdAt: new Date(idea.createdAt) })));
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Ocurrió un error desconocido');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!authLoading && user) {
      fetchIdeas();
    }
  }, [authLoading, user]);

  const handleAddIdea = async (newIdea: Omit<Idea, 'id' | 'createdAt'>) => {
    try {
      const res = await fetch(`${config.apiUrl}/api/ideas`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(newIdea),
      });
      if (!res.ok) throw new Error('No se pudo crear la idea');
      const created: Idea = await res.json();
      setIdeas([{ ...created, createdAt: new Date(created.createdAt) }, ...ideas]);
      setIsAddDialogOpen(false);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Ocurrió un error desconocido');
      }
    }
  };

  const handleUpdateIdea = async (updatedIdea: Idea) => {
    try {
      const res = await fetch(`${config.apiUrl}/api/ideas/${updatedIdea.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          title: updatedIdea.title,
          description: updatedIdea.description,
          category: updatedIdea.category,
          priority: updatedIdea.priority,
          status: updatedIdea.status,
          tags: updatedIdea.tags ?? [],
        }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({ error: 'Unknown error' }));
        throw new Error(errorData.error || 'No se pudo actualizar la idea');
      }

      const updated: Idea = await res.json();
      setIdeas((prev) =>
        prev.map((i) =>
          i.id === updated.id ? { ...updated, createdAt: new Date(updated.createdAt) } : i,
        ),
      );
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Ocurrió un error desconocido');
      }
    }
  };

  const handleDeleteIdea = async (ideaId: number) => {
    try {
      const res = await fetch(`${config.apiUrl}/api/ideas/${ideaId}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      if (!res.ok) throw new Error('No se pudo eliminar la idea');
      setIdeas(ideas.filter((idea) => idea.id !== Number(ideaId)));
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Ocurrió un error desconocido');
      }
    }
  };

  const categories = ['all', ...Array.from(new Set(ideas.map((idea) => idea.category)))];
  const priorities = ['all', 'low', 'medium', 'high', 'urgent'];

  const filteredIdeas = ideas.filter((idea) => {
    const matchesSearch =
      idea.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      idea.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      idea.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || idea.category === selectedCategory;
    const matchesPriority = selectedPriority === 'all' || idea.priority === selectedPriority;
    return matchesSearch && matchesCategory && matchesPriority;
  });

  if (authLoading) return <p className="p-6 text-center">Cargando sesión...</p>;
  if (!user)
    return <p className="p-6 text-center text-error">Debes iniciar sesión para ver tus ideas</p>;

  return (
    <div className="flex h-screen">
      <main className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader onAddIdea={() => setIsAddDialogOpen(true)} />
        <DashboardFilters
          searchTerm={searchTerm}
          selectedCategory={selectedCategory}
          selectedPriority={selectedPriority}
          categories={categories}
          priorities={priorities}
          onSearchChange={setSearchTerm}
          onCategoryChange={setSelectedCategory}
          onPriorityChange={setSelectedPriority}
        />
        <div className="flex-1 overflow-auto p-6">
          {loading ? (
            <p className="text-center text-base-content/50">Cargando ideas...</p>
          ) : error ? (
            <p className="text-center text-error">{error}</p>
          ) : (
            <IdeaGrid
              ideas={filteredIdeas}
              onUpdateIdea={handleUpdateIdea}
              onDeleteIdea={handleDeleteIdea}
            />
          )}
        </div>
      </main>
      <AddIdeaDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        onAddIdea={handleAddIdea}
      />
    </div>
  );
}
