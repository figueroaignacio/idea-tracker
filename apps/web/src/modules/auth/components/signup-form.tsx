// Hooks
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { useAuth } from '../hooks/use-auth';

// Validation
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const signupSchema = z.object({
  firstName: z.string().min(2, 'Please enter a valid first name'),
  lastName: z.string().min(2, 'Please enter a valid last name'),
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type SignupFormType = z.infer<typeof signupSchema>;

export function SignupForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormType>({
    resolver: zodResolver(signupSchema),
  });
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data: SignupFormType) => {
    setIsSubmitting(true);
    try {
      await signup(data.firstName, data.lastName, data.email, data.password);
      navigate('/dashboard');
    } catch (err) {
      alert((err as Error).message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4 space-y-2">
        <legend className="fieldset-legend text-2xl">Sign Up</legend>

        <div className="flex gap-3">
          <div className="space-y-2">
            <label className="label">Firstname</label>
            <input
              {...register('firstName')}
              type="text"
              placeholder="First name"
              className="input"
            />
            {errors.firstName && (
              <p className="text-red-500 text-xss">{errors.firstName.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="label">Lastname</label>
            <input
              {...register('lastName')}
              type="text"
              placeholder="Last name"
              className="input"
            />
            {errors.lastName && <p className="text-red-500 text-xss">{errors.lastName.message}</p>}
          </div>
        </div>

        <label className="label">Email</label>
        <input {...register('email')} type="email" placeholder="Email" className="input" />
        {errors.email && <p className="text-red-500 text-xss">{errors.email.message}</p>}

        <label className="label">Password</label>
        <input {...register('password')} type="password" placeholder="Password" className="input" />
        {errors.password && <p className="text-red-500 text-xss">{errors.password.message}</p>}

        <button type="submit" className="btn btn-primary mt-4" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <span className="loading loading-spinner mr-2"></span>
              Signing Up
            </>
          ) : (
            'Sign Up'
          )}
        </button>
      </fieldset>
    </form>
  );
}
