// Hooks
import { useState } from 'react';

// Components
import { X } from 'lucide-react';

// Types
import type React from 'react';
import { type Idea } from './dashboard';

interface AddIdeaDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddSuccess?: (idea: Idea) => void;
  onAddIdea: (idea: Omit<Idea, 'id' | 'createdAt'>) => void;
}

const categories = [
  'Development',
  'UI/UX',
  'Features',
  'Analytics',
  'Mobile',
  'Marketing',
  'Business',
  'Research',
];

export function AddIdeaDialog({ open, onOpenChange, onAddIdea }: AddIdeaDialogProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [priority, setPriority] = useState<Idea['priority']>('medium');
  const [status, setStatus] = useState<Idea['status']>('idea');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim() || !category) return;

    setLoading(true);
    setError(null);

    try {
      await onAddIdea({ title, description, category, priority, status, tags });
      setTitle('');
      setDescription('');
      setCategory('');
      setPriority('medium');
      setStatus('idea');
      setTags([]);
      setTagInput('');
      onOpenChange(false);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Ocurrió un error al agregar la idea.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      if (!tags.includes(tagInput.trim())) setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const removeTag = (tag: string) => setTags(tags.filter((t) => t !== tag));

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-base-200 w-full max-w-2xl rounded-xl shadow-lg p-6 relative">
        <button
          className="absolute top-4 right-4 btn btn-ghost btn-sm btn-circle"
          onClick={() => onOpenChange(false)}
        >
          <X className="w-5 h-5" />
        </button>
        <h3 className="text-2xl font-bold mb-4 text-center">Agregar Nueva Idea</h3>

        {error && <div className="alert alert-error mb-4">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-control">
            <label className="label font-medium">Título *</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Título de tu idea..."
              className="input input-bordered bg-base-100 border-base-300 focus:border-primary focus:ring focus:ring-primary/20"
              required
            />
          </div>

          <div className="form-control">
            <label className="label font-medium">Descripción *</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe tu idea..."
              rows={4}
              className="textarea textarea-bordered bg-base-100 border-base-300 focus:border-primary focus:ring focus:ring-primary/20 resize-none"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="form-control">
              <label className="label font-medium">Categoría *</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="select select-bordered bg-base-100 border-base-300 focus:border-primary focus:ring focus:ring-primary/20"
                required
              >
                <option value="">Selecciona categoría</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-control">
              <label className="label font-medium">Prioridad</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as Idea['priority'])}
                className="select select-bordered bg-base-100 border-base-300 focus:border-primary focus:ring focus:ring-primary/20"
              >
                <option value="low">Baja</option>
                <option value="medium">Media</option>
                <option value="high">Alta</option>
                <option value="urgent">Urgente</option>
              </select>
            </div>
          </div>

          <div className="form-control">
            <label className="label font-medium">Estado</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as Idea['status'])}
              className="select select-bordered bg-base-100 border-base-300 focus:border-primary focus:ring focus:ring-primary/20"
            >
              <option value="idea">Idea</option>
              <option value="in-progress">En progreso</option>
              <option value="completed">Completada</option>
              <option value="archived">Archivada</option>
            </select>
          </div>

          <div className="form-control">
            <label className="label font-medium">Tags</label>
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleAddTag}
              placeholder="Presiona Enter para agregar tag"
              className="input input-bordered bg-base-100 border-base-300 focus:border-primary focus:ring focus:ring-primary/20"
            />
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="badge badge-primary flex items-center gap-1 cursor-pointer"
                  >
                    {tag}
                    <X className="w-3 h-3 ml-1 hover:text-error" onClick={() => removeTag(tag)} />
                  </span>
                ))}
              </div>
            )}
          </div>
          <div className="flex items-center justify-end gap-3 mt-4">
            <button
              type="button"
              className="btn btn-outline"
              onClick={() => onOpenChange(false)}
              disabled={loading}
            >
              Cancelar
            </button>
            <button type="submit" className="btn btn-soft btn-info mt-4" disabled={loading}>
              {loading ? (
                <>
                  <span className="loading loading-spinner mr-2"></span>
                  Agregando idea
                </>
              ) : (
                'Agregar'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
