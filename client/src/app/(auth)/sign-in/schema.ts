import { z } from "zod";

export const loginSchema = z.object({
  userName: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export type LoginType = z.infer<typeof loginSchema>;
