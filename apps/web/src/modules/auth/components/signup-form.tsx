// Hooks
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { useAuth } from '../hooks/use-auth';

interface SignupForm {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export function SignupForm() {
  const { register, handleSubmit } = useForm<SignupForm>();
  const { signup } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data: SignupForm) => {
    try {
      await signup(data.firstName, data.lastName, data.email, data.password);
      navigate('/dashboard');
    } catch (err) {
      alert((err as Error).message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <legend className="fieldset-legend text-2xl">Sign Up</legend>
        <div className="flex gap-3">
          <div>
            <label className="label">Firstname</label>
            <input
              {...register('firstName')}
              type="text"
              placeholder="First name"
              className="input"
            />
          </div>
          <div>
            <label className="label">Lastname</label>
            <input
              {...register('lastName')}
              type="text"
              placeholder="Last name"
              className="input"
            />
          </div>
        </div>

        <label className="label">Email</label>
        <input {...register('email')} type="email" placeholder="Email" className="input" />

        <label className="label">Password</label>
        <input {...register('password')} type="password" placeholder="Password" className="input" />

        <button type="submit" className="btn btn-primary mt-4">
          Signup
        </button>
      </fieldset>
    </form>
  );
}
