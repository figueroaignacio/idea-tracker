import z from "zod";

export const passwordSchema = z.object({
  platform: z.string().min(1, { message: "Platform is required" }),
  username: z.string().min(1, { message: "Username is required" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
  website: z.string().url({ message: "Please enter a valid URL" }).optional(),
  notes: z
    .string()
    .max(500, { message: "Note must be less than 500 characters" })
    .optional(),
});
