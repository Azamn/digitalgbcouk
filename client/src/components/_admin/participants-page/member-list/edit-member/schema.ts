import { z } from "zod";

// Zod schema

export const editMemberSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  role: z.enum(["MEMBER", "COREMEMBER"]),
});

export type EditMemberType = z.infer<typeof editMemberSchema>;
