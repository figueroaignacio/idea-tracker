// Components
import { EnterIcon, PlusIcon } from '@radix-ui/react-icons';
import { Lightbulb } from 'lucide-react';
import { Link } from 'react-router';

export function Header() {
  const actions = [
    {
      label: 'Get Started',
      to: '/signup',
      icon: PlusIcon,
      variant: 'btn btn-soft btn-info',
    },
    {
      label: 'Login',
      to: '/login',
      icon: EnterIcon,
      variant: 'btn btn-ghost',
    },
  ];

  return (
    <header className="sticky top-0 backdrop-blur-lg z-50">
      <div className="navbar border-b border-base-300 px-4 lg:px-8">
        <div className="navbar-start">
          <div className="flex items-center gap-2">
            <Lightbulb className="w-8 h-8 text-accent" />
            <span className="text-xl font-bold">IdeaTracker</span>
          </div>
        </div>
        <div className="navbar-end gap-2">
          {actions.map((action) => (
            <Link
              className={`${action.variant} flex items-center gap-x-3 shadow-none btn-md`}
              to={action.to}
            >
              {action.label} <action.icon />
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
