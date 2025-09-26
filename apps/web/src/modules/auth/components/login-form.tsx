// Hooks
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { useAuth } from '../hooks/use-auth';

// Components
import { CrossCircledIcon } from '@radix-ui/react-icons';

// Validation
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormType = z.infer<typeof loginSchema>;

export function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormType>({
    resolver: zodResolver(loginSchema),
  });

  const { login } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const onSubmit = async (data: LoginFormType) => {
    setIsSubmitting(true);
    setServerError(null);
    try {
      await login(data.email, data.password);
      navigate('/dashboard');
    } catch (err) {
      setServerError((err as Error).message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-sm border p-4 space-y-2">
        <legend className="fieldset-legend text-2xl">Login</legend>
        <label className="label">Email</label>
        <input {...register('email')} type="email" placeholder="Email" className="input w-full" />
        {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
        <label className="label">Password</label>
        <input
          {...register('password')}
          type="password"
          placeholder="Password"
          className="input w-full"
        />
        {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
        <button type="submit" className="btn btn-primary mt-4" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <span className="loading loading-spinner mr-2"></span>
              Loading
            </>
          ) : (
            'Login'
          )}
        </button>
        {serverError && (
          <div role="alert" className="alert alert-error alert-soft mt-4">
            <CrossCircledIcon />
            <span>{serverError}</span>
          </div>
        )}
      </fieldset>
    </form>
  );
}
