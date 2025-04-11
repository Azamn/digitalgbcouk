import { Router } from "express";
import { requireAuth } from "@src/middleware/auth.middleware";
import { CommentController } from "@src/controller/comments.controller";
const commentRouter = Router();

commentRouter
  .post("/:postId", requireAuth(), CommentController.CreateComment)
  .get("/:postId", requireAuth(), CommentController.GetComments)
  .delete("/:commentId", requireAuth(), CommentController.DeleteComment);

export default commentRouter;
