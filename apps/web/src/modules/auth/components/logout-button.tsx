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

  return (
    <>
      <button
        className="btn btn-error"
        onClick={() => {
          const modal = document.getElementById('my_modal_1') as HTMLDialogElement | null;
          if (modal) {
            modal.showModal();
          }
        }}
      >
        Log Out
      </button>
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Are you sure?</h3>
          <p className="py-4">You are about to log out your account.</p>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn" onClick={onLogout}>
                Log Out
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
  // return <button onClick={onLogout}>Logout</button>;
}
