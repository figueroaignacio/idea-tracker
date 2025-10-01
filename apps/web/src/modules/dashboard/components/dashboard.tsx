import { Filter, Plus, Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import { config } from '../../../config/config';
import { useAuth } from '../../auth/hooks/use-auth';
import { AddIdeaDialog } from './add-idea-dialog';
import { IdeaGrid } from './dashboard-grid';
import { Sidebar } from './sidebar';

export interface Idea {
  id: number;
  title: string;
  description: string;
  category: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'idea' | 'in-progress' | 'completed' | 'archived';
  createdAt: Date;
  tags: string[];
}

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
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!authLoading && user) {
      fetchIdeas();
    }
  }, [authLoading, user]);

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
    } catch (err: any) {
      alert(err.message);
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
    } catch (err: any) {
      console.error('Error actualizando idea:', err);
      alert('Error: ' + err.message);
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
    } catch (err: any) {
      alert(err.message);
    }
  };

  if (authLoading) return <p className="p-6 text-center">Cargando sesión...</p>;
  if (!user)
    return <p className="p-6 text-center text-error">Debes iniciar sesión para ver tus ideas</p>;

  return (
    <div className="flex h-screen bg-base-100" data-theme="dark">
      <Sidebar ideas={ideas} />

      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="border-b border-base-300 bg-base-200/50 backdrop-blur-sm">
          <div className="flex items-center justify-between p-6">
            <div>
              <h1 className="text-3xl font-bold text-base-content">Idea Tracker</h1>
              <p className="text-base-content/70 mt-1">
                Gestiona y organiza todas tus ideas en un solo lugar
              </p>
            </div>
            <button
              onClick={() => setIsAddDialogOpen(true)}
              className="btn btn-primary gradient-btn text-primary-content"
            >
              <Plus className="w-4 h-4 mr-2" />
              Nueva Idea
            </button>
          </div>
        </header>

        {/* Filters */}
        <div className="border-b border-base-300 bg-base-200/30 backdrop-blur-sm">
          <div className="flex items-center gap-4 p-6">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-base-content/50 w-4 h-4" />
              <input
                type="text"
                placeholder="Buscar ideas, tags o descripción..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input input-bordered w-full pl-10 bg-base-100/50 border-base-300/50"
              />
            </div>

            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-base-content/50" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="select select-bordered w-40 bg-base-100/50 border-base-300/50"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'Todas las categorías' : category}
                  </option>
                ))}
              </select>

              <select
                value={selectedPriority}
                onChange={(e) => setSelectedPriority(e.target.value)}
                className="select select-bordered w-36 bg-base-100/50 border-base-300/50"
              >
                {priorities.map((priority) => (
                  <option key={priority} value={priority}>
                    {priority === 'all'
                      ? 'Todas'
                      : priority.charAt(0).toUpperCase() + priority.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Content */}
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
