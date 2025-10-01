import { Archive, CheckCircle, Lightbulb, Play } from 'lucide-react';

export const PRIORITY_COLORS = {
  low: 'badge-neutral',
  medium: 'badge-warning',
  high: 'badge-error',
  urgent: 'badge-error',
} as const;

export const STATUS_COLORS = {
  idea: 'badge-neutral',
  'in-progress': 'badge-warning',
  completed: 'badge-success',
  archived: 'badge-ghost',
} as const;

export const STATUS_ICONS = {
  idea: Lightbulb,
  'in-progress': Play,
  completed: CheckCircle,
  archived: Archive,
} as const;
