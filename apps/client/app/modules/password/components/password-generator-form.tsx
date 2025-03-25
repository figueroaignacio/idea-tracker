// Hooks
import { useEffect } from "react";
import { useForm } from "react-hook-form";

// Components
import { AlertCircleIcon, KeyIcon, LockIcon, UserIcon } from "lucide-react";

// Utils
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <label
          htmlFor="provider"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          Provider
        </label>
        <div className="relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <KeyIcon className="h-5 w-5 text-gray-400" />
          </div>
          <input
            id="provider"
            type="text"
            placeholder="Facebook, Google, Twitter..."
            {...register("provider")}
            className="pl-10 w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-colors duration-200"
          />
        </div>
        {errors.provider && (
          <p className="mt-1 text-sm text-red-500 dark:text-red-400 flex items-center">
            <AlertCircleIcon className="h-4 w-4 mr-1" />
            {errors.provider.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="username"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          User
        </label>
        <div className="relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <UserIcon className="h-5 w-5 text-gray-400" />
          </div>
          <input
            id="username"
            type="text"
            placeholder="Nombre de usuario o email"
            {...register("username")}
            className="pl-10 w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-colors duration-200"
          />
        </div>
        {errors.username && (
          <p className="mt-1 text-sm text-red-500 dark:text-red-400 flex items-center">
            <AlertCircleIcon className="h-4 w-4 mr-1" />
            {errors.username.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          Password
        </label>
        <div className="relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <LockIcon className="h-5 w-5 text-gray-400" />
          </div>
          <input
            id="password"
            type="text"
            readOnly
            {...register("password")}
            className="pl-10 w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-colors duration-200"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-2">
            <button
              type="button"
              onClick={generatePassword}
              className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded text-xs"
            >
              Generate
            </button>
          </div>
        </div>
        {errors.password && (
          <p className="mt-1 text-sm text-red-500 dark:text-red-400 flex items-center">
            <AlertCircleIcon className="h-4 w-4 mr-1" />
            {errors.password.message}
          </p>
        )}
      </div>

      <div className="pt-2">
        <button
          type="submit"
          disabled={isSubmitting || !password}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Saving..." : "Save Password"}
        </button>
      </div>
    </form>
  );
}
