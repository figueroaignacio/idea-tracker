import { Link } from 'react-router';

export function Header() {
  const actions = [
    {
      label: 'Sign Up',
      to: '/signup',
      icon: '',
      variant: 'btn btn-active btn-primary',
    },
    {
      label: 'Login',
      to: '/login',
      icon: '',
      variant: 'btn btn-ghost',
    },
  ];

  return (
    <header className="border-b border-neutral py-4 backdrop-blur-lg sticky top-0">
      <div className="container flex justify-between items-center">
        <p>Logo</p>
        <div className="space-x-5">
          {actions.map((action) => (
            <Link to={action.to} className={`${action.variant} rounded-xl`}>
              {action.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
