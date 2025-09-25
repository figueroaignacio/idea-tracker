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
      <h2>Signup</h2>
      <input {...register('firstName')} type="text" placeholder="First name" />
      <input {...register('lastName')} type="text" placeholder="Last name" />
      <input {...register('email')} type="email" placeholder="Email" />
      <input {...register('password')} type="password" placeholder="Password" />
      <button type="submit">Signup</button>
    </form>
  );
}
