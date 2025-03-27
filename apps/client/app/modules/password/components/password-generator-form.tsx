"use client";

// Hooks
import { useEffect } from "react";
import { useForm } from "react-hook-form";

// Components
import { AlertCircle, Edit, Globe, Key, Lock, User } from "lucide-react";

// Utils
import { zodResolver } from "@hookform/resolvers/zod";
import type z from "zod";
import { passwordSchema } from "../lib/schemas";

type PasswordFormData = z.infer<typeof passwordSchema>;

interface PasswordGeneratorFormProps {
  onSubmit: (data: PasswordFormData) => Promise<void>;
  isSubmitting: boolean;
  password: string;
  generatePassword: () => void;
}

export function PasswordGeneratorForm({
  onSubmit,
  isSubmitting,
  password,
  generatePassword,
}: PasswordGeneratorFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });

  useEffect(() => {
    if (password) {
      setValue("password", password);
    }
  }, [password, setValue]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="form-group">
        <label
          htmlFor="platform"
          className="block text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2"
        >
          Platform
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Key className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          </div>
          <input
            id="platform"
            type="text"
            placeholder="Facebook, Google, Twitter..."
            {...register("platform")}
            className="pl-10 w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 transition-colors duration-200"
            aria-invalid={errors.platform ? "true" : "false"}
          />
        </div>
        {errors.platform && (
          <p
            className="mt-1.5 text-sm text-red-600 dark:text-red-500 flex items-center"
            role="alert"
          >
            <AlertCircle className="h-4 w-4 mr-1.5 flex-shrink-0" />
            <span>{errors.platform.message}</span>
          </p>
        )}
      </div>

      <div className="form-group">
        <label
          htmlFor="username"
          className="block text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2"
        >
          Username
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <User className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          </div>
          <input
            id="username"
            type="text"
            placeholder="Username or email"
            {...register("username")}
            className="pl-10 w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 transition-colors duration-200"
            aria-invalid={errors.username ? "true" : "false"}
          />
        </div>
        {errors.username && (
          <p
            className="mt-1.5 text-sm text-red-600 dark:text-red-500 flex items-center"
            role="alert"
          >
            <AlertCircle className="h-4 w-4 mr-1.5 flex-shrink-0" />
            <span>{errors.username.message}</span>
          </p>
        )}
      </div>

      <div className="form-group">
        <label
          htmlFor="website"
          className="block text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2"
        >
          Website
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Globe className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          </div>
          <input
            id="website"
            type="url"
            placeholder="https://www.example.com"
            {...register("website")}
            className="pl-10 w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 transition-colors duration-200"
            aria-invalid={errors.website ? "true" : "false"}
          />
        </div>
        {errors.website && (
          <p
            className="mt-1.5 text-sm text-red-600 dark:text-red-500 flex items-center"
            role="alert"
          >
            <AlertCircle className="h-4 w-4 mr-1.5 flex-shrink-0" />
            <span>{errors.website.message}</span>
          </p>
        )}
      </div>

      <div className="form-group">
        <label
          htmlFor="note"
          className="block text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2"
        >
          Note
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex top-4 pointer-events-none">
            <Edit className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          </div>
          <textarea
            id="note"
            placeholder="Any additional notes"
            {...register("notes")}
            className="pl-10 w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 transition-colors duration-200"
            rows={4}
            aria-invalid={errors.notes ? "true" : "false"}
          />
        </div>
        {errors.notes && (
          <p
            className="mt-1.5 text-sm text-red-600 dark:text-red-500 flex items-center"
            role="alert"
          >
            <AlertCircle className="h-4 w-4 mr-1.5 flex-shrink-0" />
            <span>{errors.notes.message}</span>
          </p>
        )}
      </div>

      <div className="form-group">
        <label
          htmlFor="password"
          className="block text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2"
        >
          Password
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Lock className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          </div>
          <input
            id="password"
            type="text"
            readOnly
            {...register("password")}
            className="pl-10 w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 transition-colors duration-200"
            aria-invalid={errors.password ? "true" : "false"}
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-2">
            <button
              type="button"
              onClick={generatePassword}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1.5 rounded-md text-sm font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              aria-label="Generate password"
            >
              Generate
            </button>
          </div>
        </div>
        {errors.password && (
          <p
            className="mt-1.5 text-sm text-red-600 dark:text-red-500 flex items-center"
            role="alert"
          >
            <AlertCircle className="h-4 w-4 mr-1.5 flex-shrink-0" />
            <span>{errors.password.message}</span>
          </p>
        )}
      </div>

      <div className="pt-2">
        <button
          type="submit"
          disabled={isSubmitting || !password}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-md transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-indigo-600"
          aria-disabled={isSubmitting || !password}
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center">
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Saving...
            </span>
          ) : (
            "Save Password"
          )}
        </button>
      </div>
    </form>
  );
}
