import { z } from "zod";

export const createClientSchema = z.object({
  userName: z.string().min(1, "Username is required"),
  instagramId: z.string().min(1, "Instagram ID is required"),
  instagramPassword: z.string().min(1, "Instagram password is required"),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[a-z]/, "Password must include a lowercase letter")
    .regex(/[A-Z]/, "Password must include an uppercase letter")
    .regex(/[0-9]/, "Password must include a number")
    .regex(/[^a-zA-Z0-9]/, "Password must include a special character"),
  memberId: z
    .array(z.string().min(1, "Each member ID must be a non-empty string"))
    .min(1, "At least one Member is required"),
});

export type CreateClientType = z.infer<typeof createClientSchema>;
