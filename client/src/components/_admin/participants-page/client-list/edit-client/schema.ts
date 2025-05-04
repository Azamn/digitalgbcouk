import { z } from "zod";

// Zod schema
export const editClientSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  instagramId: z.string().optional(),
  instagramPassword: z.string().optional(),
});

export type EditClientType = z.infer<typeof editClientSchema>;
