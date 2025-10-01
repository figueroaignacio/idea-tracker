// Components
import { BarChart3, CheckCircle, Clock, TrendingUp } from 'lucide-react';
import { StatCard } from './stats-card';

interface StatsProps {
  total: number;
  inProgress: number;
  completed: number;
  highPriority: number;
}

const statItems = [
  { key: 'total', label: 'Total Ideas', icon: BarChart3, color: 'text-primary' },
  { key: 'inProgress', label: 'In Progress', icon: TrendingUp, color: 'text-warning' },
  { key: 'completed', label: 'Completed', icon: CheckCircle, color: 'text-success' },
  { key: 'highPriority', label: 'High Priority', icon: Clock, color: 'text-error' },
] as const;

export function Stats({ total, inProgress, completed, highPriority }: StatsProps) {
  const values: Record<string, number> = { total, inProgress, completed, highPriority };

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium text-base-content/70 uppercase tracking-wider">
        Statistics
      </h3>

      <div className="grid grid-cols-2 gap-3">
        {statItems.map(({ key, label, icon, color }) => (
          <StatCard key={key} icon={icon} label={label} value={values[key]} color={color} />
        ))}
      </div>
    </div>
  );
}
