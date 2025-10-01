import type { LucideIcon } from 'lucide-react';

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: number;
  color: string;
}

export function StatCard({ icon: Icon, label, value, color }: StatCardProps) {
  return (
    <div className="card bg-base-300 border border-base-300">
      <div className="card-body p-4">
        <div className="flex items-center gap-2">
          <Icon className={`w-4 h-4 ${color}`} />
          <div>
            <p className="text-2xl font-bold text-base-content">{value}</p>
            <p className="text-xs text-base-content/70">{label}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
