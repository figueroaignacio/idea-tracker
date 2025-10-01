'use client';

// Hooks
import { useState } from 'react';

// Components
import { Plus, Sparkles, Tag, X } from 'lucide-react';

// Types
import type React from 'react';
import type { Idea } from '../types/idea';

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

  const handleSubmit = async () => {
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
        setError('An error occurred while adding the idea.');
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4  backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-base-100 w-full max-w-3xl rounded-3xl shadow-2xl relative animate-in zoom-in-95 duration-200 overflow-hidden">
        <div className="relative bg-gradient-to-br from-primary/20 via-secondary/10 to-accent/10 px-8 py-6 border-b border-base-300">
          <button
            type="button"
            className="absolute top-4 right-4 btn btn-sm btn-circle btn-ghost"
            onClick={() => onOpenChange(false)}
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-4">
            <div className="bg-primary text-primary-content p-3 rounded-2xl shadow-lg">
              <Sparkles className="w-7 h-7" />
            </div>
            <div>
              <h2 className="text-3xl font-bold">Add New Idea</h2>
              <p className="text-sm text-base-content/60 mt-1">Capture your brilliant thoughts</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="px-8 py-6 max-h-[60vh] overflow-y-auto">
          {error && (
            <div className="alert alert-error mb-6 shadow-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{error}</span>
            </div>
          )}

          <div className="space-y-6">
            {/* Title */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold text-base flex items-center gap-2">
                  Title
                  <span className="text-xs text-error">*</span>
                </span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="What's your idea?"
                className="input w-full focus:input-primary"
              />
            </div>

            {/* Description */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold text-base flex items-center gap-2">
                  Description
                  <span className="text-xs text-error">*</span>
                </span>
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe your idea in detail..."
                rows={5}
                className="textarea textarea-bordered w-full focus:textarea-primary resize-none leading-relaxed"
              />
            </div>

            {/* Category and Priority */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold text-base flex items-center gap-2">
                    Category
                    <span className="text-xs text-error">*</span>
                  </span>
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="select select-bordered w-full focus:select-primary"
                >
                  <option value="" disabled>
                    Choose a category
                  </option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold text-base">Priority Level</span>
                </label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value as Idea['priority'])}
                  className="select select-bordered  w-full focus:select-primary"
                >
                  <option value="low">Low Priority</option>
                  <option value="medium">Medium Priority</option>
                  <option value="high">High Priority</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>
            </div>

            {/* Status */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold text-base">Current Status</span>
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as Idea['status'])}
                className="select select-bordered  w-full focus:select-primary"
              >
                <option value="idea">💡 Idea</option>
                <option value="in-progress">🚧 In Progress</option>
                <option value="completed">✅ Completed</option>
                <option value="archived">📦 Archived</option>
              </select>
            </div>

            {/* Tags */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold text-base flex items-center gap-2">
                  <Tag className="w-4 h-4" />
                  Tags
                </span>
                <span className="label-text-alt text-base-content/60">Press Enter to add</span>
              </label>
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleAddTag}
                placeholder="Add tags to organize..."
                className="input input-bordered w-full focus:input-primary"
              />
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {tags.map((tag) => (
                    <div
                      key={tag}
                      className="badge badge-primary gap-2 px-4 py-4 cursor-pointer hover:scale-105 transition-transform"
                      onClick={() => removeTag(tag)}
                    >
                      <span>{tag}</span>
                      <X className="w-3.5 h-3.5" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-base-200 px-8 py-5 border-t border-base-300 flex items-center justify-between">
          <p className="text-sm text-base-content/50">
            <span className="text-error">*</span> Required fields
          </p>
          <div className="flex gap-3">
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => onOpenChange(false)}
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="btn btn-primary gap-2 shadow-lg hover:shadow-xl transition-all"
              disabled={loading || !title.trim() || !description.trim() || !category}
            >
              {loading ? (
                <>
                  <span className="loading loading-spinner loading-sm"></span>
                  Adding...
                </>
              ) : (
                <>
                  <Plus className="w-5 h-5" />
                  Add Idea
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
