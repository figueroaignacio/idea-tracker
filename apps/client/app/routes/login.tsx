"use client";

import type { Route } from "./+types/login";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "aegis - Login" },
    {
      name: "description",
      content: "Start your experience with aegis today, right now!",
    },
  ];
}

export default function Login() {
  return (
    <section className="text-center min-h-[70dvh] flex flex-col justify-center gap-y-3">
      <h1 className="text-2xl font-bold">Login</h1>
      <p className="text-gray-600 mb-6">Sign in with your preferred provider</p>

      <div className="max-w-sm mx-auto w-full space-y-4">
        <button
          className="flex items-center justify-center gap-2 w-full py-2 px-4 rounded-xl border-[1px] border-white/15 cursor-pointer"
          onClick={() => console.log("GitHub login")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
          Continue with GitHub
        </button>

        <button
          className="flex items-center justify-center gap-2 w-full py-2 px-4 rounded-xl border-[1px] border-white/15 cursor-pointer"
          onClick={() => console.log("Google login")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z" />
          </svg>
          Continue with Google
        </button>

        <button
          className="flex items-center justify-center gap-2 w-full py-2 px-4 rounded-xl border-[1px] border-white/15 cursor-pointer"
          onClick={() => console.log("Microsoft login")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M11.4 24H0V12.6h11.4V24zM24 24H12.6V12.6H24V24zM11.4 11.4H0V0h11.4v11.4zM24 11.4H12.6V0H24v11.4z" />
          </svg>
          Continue with Microsoft
        </button>
      </div>

      <p className="text-sm text-gray-500 mt-6">
        By continuing, you agree to our Terms of Service and Privacy Policy
      </p>
    </section>
  );
}
