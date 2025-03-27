// Hooks
import { useState } from "react";

// Components
import { AuthenticationStatus } from "./authentication-status";
import { PasswordGeneratorForm } from "./password-generator-form";
import { PasswordGeneratorHeader } from "./password-generator-header";
import { PasswordSecurityTips } from "./password-security-tips";
import { StatusMessage } from "./status-message";

// Utils
import z from "zod";
import { passwordSchema } from "../lib/schemas";

// Api
import { generatePassword } from "../api/password";

export function PasswordGenerator() {
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handlePasswordGeneration = async () => {
    try {
      setIsSubmitting(true);
      const newPassword = await generatePassword(24);
      setPassword(newPassword);
      setError("");
    } catch (err) {
      console.error("Error generating password:", err);
      setError("Error generating the password");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = async (formData: z.infer<typeof passwordSchema>) => {
    setError("");
    setSuccess(false);
    setIsSubmitting(true);

    try {
      const response = await fetch("http://localhost:3000/api/passwords", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          ...formData,
        }),
      });

      console.log("Response status:", response.status);

      let data;
      try {
        data = await response.json();
      } catch (jsonError) {
        console.error("Error parsing JSON:", jsonError);
        throw new Error("The server's response is not valid JSON");
      }

      console.log("Response data:", data);

      if (!response.ok) {
        throw new Error(data?.message || "Error saving the password");
      }

      setSuccess(true);
      setPassword("");
    } catch (err) {
      console.error("Full error:", err);
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="max-w-md mx-auto bg-card rounded-xl shadow-lg overflow-hidden md:max-w-2xl border border-gray-200 dark:border-gray-700">
        <PasswordGeneratorHeader />
        <div className="p-6">
          <PasswordGeneratorForm
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
            password={password}
            generatePassword={handlePasswordGeneration}
          />
          <StatusMessage error={error} success={success} />
          <AuthenticationStatus />
        </div>
      </div>
      <PasswordSecurityTips />
    </>
  );
}
