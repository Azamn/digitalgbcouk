import { z } from "zod";

export const signUpSchema = z.object({
    userName: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .regex(/^[a-zA-Z][a-zA-Z0-9@]*$/, "Username must start with a letter"),
  email: z.string().email("Please enter a valid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
});

export type SignUpType = z.infer<typeof signUpSchema>;
