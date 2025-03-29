import { db } from "@src/db";
import {
  ApiError,
  ApiResponse,
  AsyncHandler,
} from "@src/utils/server-functions";
import { Request, Response } from "express";

export class CommentController {
  public static CreateComment = AsyncHandler(
    async (req: Request, res: Response) => {
      const user = await db.user.CheckUserId(req);
      console.log("🚀 ~ CommentController ~ user:", user)
      const { postEventId } = req.params;
      const { content } = req.body;

      const allowedRoles = ["ADMIN", "CLIENT"] as const;
      type AllowedRole = (typeof allowedRoles)[number];

      if (!allowedRoles.includes(user.role as AllowedRole)) 
        throw new ApiError(403, "Only ADMIN and USER can comment");

      const event = await db.event.findUnique({
        where: { id: postEventId },
      });

      if (!event) {
        throw new ApiError(404, "Event not found");
      }

      const userRole = user.role as AllowedRole;
       console.log(userRole)
      const comment = await db.comment.create({
        data: {
          content,
          eventId: event.id,
          userId: user.id,
          commentedBy: userRole,
        },
        select: {
          id: true,
          content: true,
          createdAt: true,
          user: {
            select: { id: true, firstName: true },
          },
          commentedBy: true,
        },
      });

      res.json(new ApiResponse(200, "Comment created successfully", comment));
    }
  );

  public static GetCommentsByEvent = AsyncHandler(
    async (req: Request, res: Response) => {
      const { postEventId } = req.params;
      const event = await db.event.findUnique({
        where: { id: postEventId },
        include: {
          post: {
            select: { id: true },
          },
        },
      });

      if (!event) {
        throw new ApiError(404, "Event not found");
      }

      if (!event.post) {
        throw new ApiError(404, "No posts found for this event");
      }

      const comments = await db.comment.findMany({
        where: { eventId: postEventId },
        select: {
          id: true,
          content: true,
          createdAt: true,
          user: {
            select: { id: true, firstName: true },
          },
          commentedBy: true,
        },
      });

      res.json(new ApiResponse(200, "Comments fetched successfully", comments));
    }
  );

  public static DeleteComment = AsyncHandler(
    async (req: Request, res: Response) => {
      const user = await db.user.CheckUserId(req);
      const { commentId } = req.params;

      const comment = await db.comment.findUnique({
        where: { id: commentId },
      });

      if (!comment) {
        throw new ApiError(404, "Comment not found");
      }

      if (comment.userId !== user.id && user.role !== "ADMIN") {
        throw new ApiError(403, "You are not allowed to delete this comment");
      }

      await db.comment.delete({
        where: { id: commentId },
      });

      res.json(new ApiResponse(200, "Comment deleted successfully"));
    }
  );
}
