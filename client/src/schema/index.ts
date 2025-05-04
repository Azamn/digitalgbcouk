import { z } from "zod";

export const inviteMembersSchema = z.object({
  emails: z
    .array(
      z.string().email({ message: "Invalid email address" }), // validate each email
    )
    .min(1, { message: "At least one valid email is required" }),
  role: z.string().min(1, "Role is required").optional(),
});

export type InviteMembersType = z.infer<typeof inviteMembersSchema>;

export const PostEditSchema = z.object({
  title: z.string().min(1, "Title is required"),
  subtitle: z.string().optional(),
  hashtags: z.string().min(1, "Hashtags are required"),
  description: z.string().optional(),
  additional: z.string().optional(),
  mediaUrl: z.string().optional(),
  postId: z.string().optional(),
  postEventId: z.string().optional(),
});

export type PostEditType = z.infer<typeof PostEditSchema>;

export const SearchSchema = z.object({
  text: z.string().min(1, "Search term is required"),
  role: z.enum(["MEMBER", "ADMIN", "CLIENT"]),
});
export type SearchType = z.infer<typeof SearchSchema>;

export const CreateCommentSchema = z.object({
  content: z.string().min(1, "Content is required"),
  postEventId: z.string().optional(),
});
export type CreateCommentType = z.infer<typeof CreateCommentSchema>;

export const changePasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
  oldPassword: z.string().min(8, "Old password must be at least 8 characters"),
  newPassword: z.string().min(8, "New password must be at least 8 characters"),
});

export type ChangePasswordType = z.infer<typeof changePasswordSchema>;

