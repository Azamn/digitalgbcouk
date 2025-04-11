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
      const { content } = req.body;
      const { postId } = req.params;
      const user = await db.user.CheckUserId(req);
      const comment = await db.comment.create({
        data: {
          content,
          userId: user.id,
          postId,
        },
      });

      res.json(new ApiResponse(200, "Comment created successfully"));
    }
  );

  public static GetComments = AsyncHandler(
    async (req: Request, res: Response) => {
      const { postId } = req.params;
      const comments = await db.comment.findMany({
        where: {
          postId,
        },
        select: {
          id: true,
          content: true,
          createdAt: true,
          user: {
            select: {
              userName: true,
            },
          },
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

      await db.comment.delete({
        where: { id: commentId },
      });

      res.json(new ApiResponse(200, "Comment deleted successfully"));
    }
  );
}
