import { Lightbulb } from 'lucide-react';

export function SidebarHeader() {
  return (
    <header className="p-6 border-b border-base-300">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
          <Lightbulb className="w-5 h-5 text-primary-content" />
        </div>
        <div>
          <h2 className="font-semibold text-base-content">Ideas Dashboard</h2>
          <p className="text-sm text-base-content/70">General Summary</p>
        </div>
      </div>
    </header>
  );
}
