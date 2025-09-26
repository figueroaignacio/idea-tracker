// Components
import { EnterIcon, PlusIcon } from '@radix-ui/react-icons';
import { Link } from 'react-router';

export function Header() {
  const actions = [
    {
      label: 'Sign Up',
      to: '/signup',
      icon: PlusIcon,
      variant: 'btn btn-active btn-primary',
    },
    {
      label: 'Login',
      to: '/login',
      icon: EnterIcon,
      variant: 'btn btn-ghost',
    },
  ];

  return (
    <header className="py-4 backdrop-blur-lg sticky top-0">
      <div className="container flex justify-between items-center">
        <p>Logo</p>
        <div className="space-x-5">
          {actions.map((action) => (
            <Link to={action.to} className={`${action.variant} rounded-xl`} key={action.to}>
              {action.label}
              <action.icon />
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
