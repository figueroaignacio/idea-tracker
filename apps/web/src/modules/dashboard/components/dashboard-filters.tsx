import { Filter, Search } from 'lucide-react';

interface DashboardFiltersProps {
  searchTerm: string;
  selectedCategory: string;
  selectedPriority: string;
  categories: string[];
  priorities: string[];
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onPriorityChange: (value: string) => void;
}

export function DashboardFilters({
  searchTerm,
  selectedCategory,
  selectedPriority,
  categories,
  priorities,
  onSearchChange,
  onCategoryChange,
  onPriorityChange,
}: DashboardFiltersProps) {
  return (
    <div className="border-b border-base-300 bg-base-200/30 backdrop-blur-sm">
      <div className="flex items-center gap-4 p-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-base-content/50 w-4 h-4" />
          <input
            type="text"
            placeholder="Search ideas..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="input input-bordered w-full pl-10 bg-base-100/50 border-base-300/50"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-base-content/50" />
          <select
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="select select-bordered w-40 bg-base-100/50 border-base-300/50"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category === 'all' ? 'All Categories' : category}
              </option>
            ))}
          </select>

          <select
            value={selectedPriority}
            onChange={(e) => onPriorityChange(e.target.value)}
            className="select select-bordered w-36 bg-base-100/50 border-base-300/50"
          >
            {priorities.map((priority) => (
              <option key={priority} value={priority}>
                {priority === 'all' ? 'All' : priority.charAt(0).toUpperCase() + priority.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
