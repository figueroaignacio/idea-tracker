import z from "zod";

export const passwordSchema = z.object({
  provider: z.string().min(1, { message: "Provider is required" }),
  username: z.string().min(1, { message: "Username is required" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});
