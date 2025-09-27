'use client';

import { Filter, Plus, Search } from 'lucide-react';
import { useState } from 'react';
import { AddIdeaDialog } from './add-idea-dialog';
import { IdeaGrid } from './dashboard-grid';
import { Sidebar } from './sidebar';

export interface Idea {
  id: string;
  title: string;
  description: string;
  category: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'idea' | 'in-progress' | 'completed' | 'archived';
  createdAt: Date;
  tags: string[];
}

const mockIdeas: Idea[] = [
  {
    id: '1',
    title: 'AI-Powered Code Review',
    description:
      'Implement an AI system that automatically reviews code and suggests improvements based on best practices and security vulnerabilities.',
    category: 'Development',
    priority: 'high',
    status: 'in-progress',
    createdAt: new Date('2024-01-15'),
    tags: ['AI', 'Code Quality', 'Automation'],
  },
  {
    id: '2',
    title: 'Dark Mode Theme System',
    description:
      'Create a comprehensive dark mode theme system with automatic switching based on user preferences and time of day.',
    category: 'UI/UX',
    priority: 'medium',
    status: 'idea',
    createdAt: new Date('2024-01-20'),
    tags: ['Design', 'Accessibility', 'User Experience'],
  },
  {
    id: '3',
    title: 'Real-time Collaboration',
    description:
      'Add real-time collaboration features allowing multiple users to work on projects simultaneously with live cursors and changes.',
    category: 'Features',
    priority: 'urgent',
    status: 'idea',
    createdAt: new Date('2024-01-25'),
    tags: ['Collaboration', 'Real-time', 'WebSocket'],
  },
  {
    id: '4',
    title: 'Performance Analytics Dashboard',
    description:
      'Build a comprehensive analytics dashboard to track application performance, user engagement, and system metrics.',
    category: 'Analytics',
    priority: 'medium',
    status: 'completed',
    createdAt: new Date('2024-01-10'),
    tags: ['Analytics', 'Performance', 'Monitoring'],
  },
  {
    id: '5',
    title: 'Mobile App Companion',
    description:
      'Develop a mobile companion app that syncs with the web platform and provides offline capabilities.',
    category: 'Mobile',
    priority: 'low',
    status: 'idea',
    createdAt: new Date('2024-01-30'),
    tags: ['Mobile', 'Sync', 'Offline'],
  },
  {
    id: '6',
    title: 'Advanced Search Engine',
    description:
      'Implement a powerful search engine with filters, sorting, and AI-powered semantic search capabilities.',
    category: 'Features',
    priority: 'high',
    status: 'in-progress',
    createdAt: new Date('2024-02-01'),
    tags: ['Search', 'AI', 'Filters'],
  },
];

export function Dashboard() {
  const [ideas, setIdeas] = useState<Idea[]>(mockIdeas);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedPriority, setSelectedPriority] = useState<string>('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

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

  const handleAddIdea = (newIdea: Omit<Idea, 'id' | 'createdAt'>) => {
    const idea: Idea = {
      ...newIdea,
      id: Date.now().toString(),
      createdAt: new Date(),
    };
    setIdeas([idea, ...ideas]);
    setIsAddDialogOpen(false);
  };

  const handleUpdateIdea = (updatedIdea: Idea) => {
    setIdeas(ideas.map((idea) => (idea.id === updatedIdea.id ? updatedIdea : idea)));
  };

  const handleDeleteIdea = (ideaId: string) => {
    setIdeas(ideas.filter((idea) => idea.id !== ideaId));
  };

  return (
    <div className="flex h-screen bg-base-100" data-theme="dark">
      <Sidebar ideas={ideas} />

      <main className="flex-1 flex flex-col overflow-hidden">
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
          <IdeaGrid
            ideas={filteredIdeas}
            onUpdateIdea={handleUpdateIdea}
            onDeleteIdea={handleDeleteIdea}
          />
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
