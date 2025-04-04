import { z } from "zod";

export const createMemberSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(["CLIENT", "MEMBER"], {
    required_error: "Role is required",
  }),
});

export type CreateMemberType = z.infer<typeof createMemberSchema>;
// =============================================================================

export const inviteMembersSchema = z.object({
  emails: z
    .array(
      z.string().email({ message: "Invalid email address" }), // validate each email
    )
    .min(1, { message: "At least one valid email is required" }),
  role: z.string().min(1, "Role is required").optional(),
});

export type InviteMembersType = z.infer<typeof inviteMembersSchema>;

export const acceptEventSchema = z.object({
  instagramId: z.string(),
  instagramIdPassword: z.string(),
  orgId: z.string().optional(),
  eventId: z.string().optional(),
});

export type AcceptEventType = z.infer<typeof acceptEventSchema>;

export const createEventSchema = z
  .object({
    title: z.string().min(2, {
      message: "Title must be at least 2 characters.",
    }),
    description: z.string().min(10, {
      message: "Description must be at least 10 characters.",
    }),
    additional: z.string().optional(),
    startTime: z.string().min(1, {
      message: "Start time is required.",
    }),
    endTime: z.string().min(1, {
      message: "End time is required.",
    }),
  })
  .refine((data) => new Date(data.endTime) > new Date(data.startTime), {
    message: "End time must be later than start time.",
    path: ["endTime"],
  });

export type CreateEventType = z.infer<typeof createEventSchema>;

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
