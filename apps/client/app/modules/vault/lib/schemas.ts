import { z } from "zod";

export const vaultSchema = z.object({
  name: z.string().min(1, "Vault name is required"),
  fields: z
    .array(
      z.object({
        name: z.string().min(1, "Field name is required"),
        type: z
          .enum(["text", "number", "date", "boolean", "password"])
          .refine((val) => val !== undefined, {
            message: "Invalid field type",
          }),
      })
    )
    .min(1, "At least one field must be added to the vault"),
});
