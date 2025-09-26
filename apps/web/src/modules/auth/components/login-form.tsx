// Hooks
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { useAuth } from '../hooks/use-auth';

interface LoginForm {
  email: string;
  password: string;
}

export function LoginForm() {
  const { register, handleSubmit } = useForm<LoginForm>();
  const { login } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data: LoginForm) => {
    try {
      await login(data.email, data.password);
      navigate('/dashboard');
    } catch (err) {
      alert((err as Error).message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <legend className="fieldset-legend text-2xl">Login</legend>
        <label className="label">Email</label>

        <input {...register('email')} type="email" placeholder="Email " className="input" />
        <label className="label">Password</label>

        <input {...register('password')} type="password" placeholder="Password" className="input" />
        <button type="submit" className="btn btn-primary mt-4">
          Login
        </button>
      </fieldset>
    </form>
  );
}
