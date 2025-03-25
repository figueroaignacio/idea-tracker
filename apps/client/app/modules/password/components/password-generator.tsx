"use client";

import {
  AlertCircleIcon,
  CheckCircleIcon,
  CopyIcon,
  EyeIcon,
  EyeOffIcon,
  InfoIcon,
  KeyIcon,
  LockIcon,
  RefreshCwIcon,
  ShieldIcon,
  UserIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "~/modules/auth/context/auth-context";

export function PasswordGenerator() {
  const { user } = useAuth();
  const [provider, setProvider] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Calcular la fortaleza de la contraseña
    if (password) {
      let strength = 0;
      // Longitud
      if (password.length >= 8) strength += 1;
      if (password.length >= 12) strength += 1;
      // Complejidad
      if (/[A-Z]/.test(password)) strength += 1;
      if (/[0-9]/.test(password)) strength += 1;
      if (/[^A-Za-z0-9]/.test(password)) strength += 1;

      setPasswordStrength(Math.min(strength, 5));
    } else {
      setPasswordStrength(0);
    }
  }, [password]);

  const generatePassword = async () => {
    try {
      setIsSubmitting(true);
      const response = await fetch(
        "http://localhost:3000/api/passwords/generate",
        {
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Error al generar la contraseña");
      }

      const data = await response.json();
      setPassword(data.password);
      setError("");
    } catch (err) {
      console.error("Error generando contraseña:", err);
      setError("Error al generar la contraseña");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    setIsSubmitting(true);

    // Log full payload
    console.log("Request Payload:", {
      title: provider,
      username,
      password,
      provider,
      website: "",
      notes: "",
    });

    try {
      const response = await fetch("http://localhost:3000/api/passwords", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Ensure cookies are sent for authentication
        body: JSON.stringify({
          title: provider,
          username,
          password,
          provider,
          website: "",
          notes: "",
        }),
      });

      // Log full response
      console.log("Response status:", response.status);
      const data = await response.json();
      console.log("Response data:", data);

      if (!response.ok) {
        throw new Error(data.message || "Error al guardar la contraseña");
      }

      // Rest of your existing code...
    } catch (err) {
      console.error("Full error:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Error desconocido al guardar la contraseña"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getStrengthColor = () => {
    if (passwordStrength <= 1) return "bg-red-500";
    if (passwordStrength <= 3) return "bg-yellow-500";
    return "bg-green-500";
  };

  const getStrengthText = () => {
    if (passwordStrength <= 1) return "Débil";
    if (passwordStrength <= 3) return "Moderada";
    return "Fuerte";
  };

  return (
    <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden md:max-w-2xl border border-gray-200 dark:border-gray-700">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white">
        <div className="flex items-center justify-center">
          <ShieldIcon className="h-8 w-8 mr-3" />
          <h2 className="text-2xl font-bold">Password Generator</h2>
        </div>
        <p className="text-blue-100 text-center mt-2 text-sm">
          Create a store secure password for your accounts
        </p>
      </div>

      <div className="p-6">
        {success && (
          <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-300 rounded-lg flex items-center shadow-sm animate-fadeIn">
            <CheckCircleIcon className="h-5 w-5 mr-2 flex-shrink-0" />
            <span>¡Contraseña guardada con éxito!</span>
          </div>
        )}

        {error && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 rounded-lg flex items-center shadow-sm animate-fadeIn">
            <AlertCircleIcon className="h-5 w-5 mr-2 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
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
                value={provider}
                onChange={(e) => setProvider(e.target.value)}
                required
                className="pl-10 w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-colors duration-200"
              />
            </div>
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
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="pl-10 w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-colors duration-200"
              />
            </div>
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
                type={showPassword ? "text" : "password"}
                placeholder="Contraseña segura"
                value={password}
                readOnly
                required
                className="pl-10 pr-20 w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-colors duration-200"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-2">
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none"
                  aria-label={
                    showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
                  }
                >
                  {showPassword ? (
                    <EyeOffIcon className="h-5 w-5" />
                  ) : (
                    <EyeIcon className="h-5 w-5" />
                  )}
                </button>
                <button
                  type="button"
                  onClick={copyToClipboard}
                  disabled={!password}
                  className={`p-1 ${
                    copied
                      ? "text-green-500"
                      : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  } focus:outline-none transition-colors duration-200`}
                  aria-label="Copiar contraseña"
                >
                  <CopyIcon className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Indicador de fortaleza */}
            {password && (
              <div className="mt-2">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                    Fortaleza:
                  </span>
                  <span
                    className={`text-xs font-medium ${
                      passwordStrength <= 1
                        ? "text-red-500"
                        : passwordStrength <= 3
                        ? "text-yellow-500"
                        : "text-green-500"
                    }`}
                  >
                    {getStrengthText()}
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                  <div
                    className={`h-1.5 rounded-full ${getStrengthColor()}`}
                    style={{ width: `${(passwordStrength / 5) * 100}%` }}
                  ></div>
                </div>
              </div>
            )}
          </div>

          <div className="pt-2">
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={generatePassword}
                disabled={isSubmitting}
                className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium py-3 px-4 rounded-lg transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center shadow-md hover:shadow-lg"
              >
                {isSubmitting ? (
                  <svg
                    className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
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
                ) : (
                  <RefreshCwIcon className="h-5 w-5 mr-2" />
                )}
                Generar Contraseña
              </button>

              <button
                type="submit"
                disabled={isSubmitting || !password}
                className="flex-1 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-medium py-3 px-4 rounded-lg transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center shadow-md hover:shadow-lg"
              >
                {isSubmitting ? (
                  <svg
                    className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
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
                ) : (
                  <CheckCircleIcon className="h-5 w-5 mr-2" />
                )}
                {isSubmitting ? "Guardando..." : "Guardar"}
              </button>
            </div>
          </div>
        </form>

        {/* Consejos de seguridad */}
        <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-100 dark:border-blue-800">
          <div className="flex">
            <InfoIcon className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-medium text-blue-800 dark:text-blue-300">
                Consejos de seguridad
              </h4>
              <ul className="mt-1 text-xs text-blue-700 dark:text-blue-400 space-y-1 list-disc list-inside">
                <li>Usa contraseñas únicas para cada servicio</li>
                <li>Combina letras, números y símbolos</li>
                <li>Evita información personal fácil de adivinar</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Estado de autenticación */}
        <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400 mr-2">
              Estado de autenticación:
            </span>
            {user ? (
              <div className="flex items-center text-sm text-green-600 dark:text-green-400">
                <CheckCircleIcon className="h-4 w-4 mr-1" />
                <span>
                  Autenticado como{" "}
                  <span className="font-semibold">{user.email}</span>
                </span>
              </div>
            ) : (
              <div className="flex items-center text-sm text-red-600 dark:text-red-400">
                <AlertCircleIcon className="h-4 w-4 mr-1" />
                <span>No autenticado</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
