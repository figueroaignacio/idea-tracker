import { Lightbulb } from 'lucide-react';

export function EmptyState() {
  return (
    <div className="flex items-center justify-center h-64">
      <div className="text-center">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-base-300 flex items-center justify-center">
          <Lightbulb className="w-8 h-8 text-base-content/50" />
        </div>
        <h3 className="text-lg font-medium text-base-content mb-2">No hay ideas</h3>
        <p className="text-base-content/70">
          Comienza agregando tu primera idea para hacer seguimiento de tus proyectos.
        </p>
      </div>
    </div>
  );
}
