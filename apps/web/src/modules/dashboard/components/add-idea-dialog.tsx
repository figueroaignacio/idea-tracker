'use client';

import { X } from 'lucide-react';
import type React from 'react';
import { useState } from 'react';
import { type Idea } from './dashboard';

interface AddIdeaDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !description.trim() || !category) {
      return;
    }

    onAddIdea({
      title: title.trim(),
      description: description.trim(),
      category,
      priority,
      status,
      tags,
    });

    // Reset form
    setTitle('');
    setDescription('');
    setCategory('');
    setPriority('medium');
    setStatus('idea');
    setTags([]);
    setTagInput('');
  };

  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      if (!tags.includes(tagInput.trim())) {
        setTags([...tags, tagInput.trim()]);
      }
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  if (!open) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box w-11/12 max-w-2xl bg-base-200 border border-base-300">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-bold text-lg text-base-content">Agregar Nueva Idea</h3>
          <button className="btn btn-sm btn-circle btn-ghost" onClick={() => onOpenChange(false)}>
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Título *</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Título de tu idea..."
              className="input input-bordered bg-base-100/50 border-base-300/50"
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Descripción *</span>
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe tu idea en detalle..."
              rows={4}
              className="textarea textarea-bordered bg-base-100/50 border-base-300/50 resize-none"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Categoría *</span>
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="select select-bordered bg-base-100/50 border-base-300/50"
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
              <label className="label">
                <span className="label-text font-medium">Prioridad</span>
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as Idea['priority'])}
                className="select select-bordered bg-base-100/50 border-base-300/50"
              >
                <option value="low">Baja</option>
                <option value="medium">Media</option>
                <option value="high">Alta</option>
                <option value="urgent">Urgente</option>
              </select>
            </div>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Estado</span>
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as Idea['status'])}
              className="select select-bordered bg-base-100/50 border-base-300/50"
            >
              <option value="idea">Idea</option>
              <option value="in-progress">En progreso</option>
              <option value="completed">Completada</option>
              <option value="archived">Archivada</option>
            </select>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Tags</span>
            </label>
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleAddTag}
              placeholder="Escribe un tag y presiona Enter..."
              className="input input-bordered bg-base-100/50 border-base-300/50"
            />
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {tags.map((tag) => (
                  <div key={tag} className="badge badge-secondary flex items-center gap-1">
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="ml-1 hover:text-error"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="modal-action">
            <button type="button" className="btn btn-outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </button>
            <button type="submit" className="btn btn-primary gradient-btn">
              Agregar Idea
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
