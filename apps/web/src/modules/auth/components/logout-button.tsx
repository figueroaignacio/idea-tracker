// Hooks
import { useNavigate } from 'react-router';
import { useAuth } from '../hooks/use-auth';

export function LogoutButton() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  function onLogout() {
    logout();
    navigate('/login');
  }

  return <button onClick={onLogout}>Logout</button>;
}
